"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { industries, products, projects } from "@/lib/data";

const steps = ["Contact information", "Project details", "Technical information", "Attachments", "Review and prepare"];
const draftKey = "axiom-rfq-draft-v2";
const completionKey = "axiom-rfq-completion-v2";
const allowedExtensions = ["pdf", "dwg", "dxf", "xlsx", "xls", "doc", "docx"];
const maxFileSize = 10 * 1024 * 1024;
const maxFiles = 8;
const maxTotalFileSize = 40 * 1024 * 1024;
type FormData = Record<string, string>;
type Completion = { data: FormData; fileNames: string[]; recoveredFileNames?: string[]; preparedAt: string };

const technicalFields = [
  ["flow", "Flow rate", "text"],
  ["pressure", "Pressure", "text"],
  ["temperature", "Temperature", "text"],
  ["material", "Material", "text"],
] as const;

const fieldLabels: Record<string, string> = {
  name: "Name", company: "Company", email: "Work email", phone: "Phone", country: "Country", industry: "Industry", application: "Application", category: "Product family", productModel: "Model or platform", quantity: "Required quantity", timeline: "Project timeline", flow: "Flow rate", pressure: "Pressure", temperature: "Temperature", material: "Material", requirements: "Additional requirements",
};

function getSummary(data: FormData, fileNames: string[]) {
  return [
    "Axiom Forge Systems — project brief (prepared locally)",
    "",
    ...Object.entries(fieldLabels).filter(([key]) => data[key]).map(([key, label]) => `${label}: ${data[key]}`),
    `Attachments: ${fileNames.length ? fileNames.join(", ") : "None added"}`,
    "",
    "No request was transmitted. This is a fictional portfolio concept without an intake backend.",
  ].join("\n");
}

export function RFQForm() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [recoveredFiles, setRecoveredFiles] = useState<string[]>([]);
  const [data, setData] = useState<FormData>({});
  const [completion, setCompletion] = useState<Completion | null>(null);
  const [ready, setReady] = useState(false);
  const hasMountedStepRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const industryOptions = useMemo(() => industries.map((industry) => industry.name), []);
  const applicationOptions = useMemo(() => Array.from(new Set(products.flatMap((product) => product.applications))).sort(), []);
  const categoryOptions = useMemo(() => Array.from(new Set(products.map((product) => product.category))).sort(), []);
  const modelOptions = useMemo(() => products.filter((product) => !data.category || product.category === data.category), [data.category]);

  useEffect(() => {
    const loadSession = window.setTimeout(() => {
      try {
        const draft = sessionStorage.getItem(draftKey);
        const savedCompletion = sessionStorage.getItem(completionKey);
        const params = new URLSearchParams(window.location.search);
        const productSlug = params.get("product");
        const projectSlug = params.get("project");
        const product = products.find((item) => item.slug === productSlug);
        const project = projects.find((item) => item.slug === projectSlug);
        if (product || project) {
          sessionStorage.removeItem(completionKey);
          sessionStorage.removeItem(draftKey);
          setCompletion(null);
          setSent(false);
          setRecoveredFiles([]);
          const referredProduct = product || products.find((item) => item.slug === project?.relatedProduct);
          setData(referredProduct ? { category: referredProduct.category, productModel: referredProduct.name, industry: project?.industry || referredProduct.industries[0], application: referredProduct.applications[0], ...(project ? { requirements: `Related project: ${project.title}. ${project.system}.` } : {}) } : { industry: project?.industry || "", requirements: project ? `Related project: ${project.title}. ${project.system}.` : "" });
        } else if (draft) {
          const parsed = JSON.parse(draft) as { data?: FormData; fileNames?: string[] };
          if (parsed.data) setData(parsed.data);
          if (parsed.fileNames?.length) setRecoveredFiles(parsed.fileNames);
        } else if (savedCompletion) {
          const parsed = JSON.parse(savedCompletion) as Completion;
          setCompletion(parsed);
          setData(parsed.data);
          setRecoveredFiles(parsed.fileNames);
          setSent(true);
        }
      } catch {
        // A private browsing session can deny storage. The form remains usable in memory.
      } finally {
        setReady(true);
      }
    }, 0);
    return () => window.clearTimeout(loadSession);
  }, []);

  useEffect(() => {
    if (!ready || sent) return;
    try { sessionStorage.setItem(draftKey, JSON.stringify({ data, fileNames: [...recoveredFiles, ...files.map((file) => file.name)] })); } catch { /* storage is optional */ }
  }, [data, files, recoveredFiles, ready, sent]);

  useEffect(() => {
    if (!ready) return;
    if (!hasMountedStepRef.current) {
      hasMountedStepRef.current = true;
      return;
    }
    headingRef.current?.focus();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    const announce = window.setTimeout(() => setAnnouncement(`${steps[step]} opened. Step ${step + 1} of ${steps.length}.`), 0);
    return () => window.clearTimeout(announce);
  }, [ready, step]);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const set = (key: string, value: string) => setData((previous) => ({ ...previous, [key]: value }));
  const currentStepFields: string[] = step === 0 ? ["name", "company", "email", "phone", "country"] : step === 2 ? [...technicalFields.map(([key]) => key), "requirements"] : [];

  function addFiles(incoming: FileList | File[]) {
    const selected = Array.from(incoming);
    const unique = selected.filter((file, index, list) => list.findIndex((candidate) => candidate.name === file.name && candidate.size === file.size && candidate.lastModified === file.lastModified) === index);
    if (unique.length !== selected.length) {
      setError("Duplicate attachments were removed. Each file can be added once.");
    }
    const existingKeys = new Set(files.map((file) => `${file.name}:${file.size}:${file.lastModified}`));
    const newFiles = unique.filter((file) => !existingKeys.has(`${file.name}:${file.size}:${file.lastModified}`));
    if (newFiles.length !== unique.length) {
      setError("One or more files are already attached. Each file can be added once.");
    }
    if (!newFiles.length) return;
    const invalid = newFiles.find((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      return !extension || !allowedExtensions.includes(extension) || file.size > maxFileSize;
    });
    if (invalid) {
      setError(`${invalid.name} is not supported or exceeds 10 MB. Choose PDF, CAD, spreadsheet, or document files up to 10 MB.`);
      return;
    }
    const replacingRecovered = new Set(newFiles.map((file) => file.name));
    const remainingRecovered = recoveredFiles.filter((name) => !replacingRecovered.has(name));
    if (newFiles.length + remainingRecovered.length + files.length > maxFiles) {
      setError(`Choose no more than ${maxFiles} attachments.`);
      return;
    }
    const totalSize = files.reduce((total, file) => total + file.size, 0) + newFiles.reduce((total, file) => total + file.size, 0);
    if (totalSize > maxTotalFileSize) {
      setError("Attachments must stay under 40 MB total.");
      return;
    }
    setFiles((previous) => [...previous, ...newFiles]);
    if (replacingRecovered.size) setRecoveredFiles(remainingRecovered);
    setError("");
    setAnnouncement(`${selected.length} attachment${selected.length === 1 ? "" : "s"} added.`);
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) addFiles(event.target.files);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  }

  function validateStep() {
    if (step === 1) {
      const required = ["industry", "application", "category", "productModel", "quantity", "timeline"];
      if (required.some((key) => !data[key]?.trim())) return "Choose the required project details before continuing.";
      if (Number(data.quantity) < 1) return "Required quantity must be at least 1.";
    }
    if (currentStepFields.some((key) => !data[key]?.trim() && ["name", "company", "email", "country"].includes(key))) return "Complete the required fields before continuing.";
    if (step === 0 && data.email && !/^\S+@\S+\.\S+$/.test(data.email)) return "Enter a valid work email address.";
    return "";
  }

  function goToStep(nextStep: number) {
    setError("");
    setStep(nextStep);
  }

  function prepare() {
    const fileNames = [...recoveredFiles, ...files.map((file) => file.name)];
    const next = { data, fileNames, recoveredFileNames: recoveredFiles, preparedAt: new Date().toISOString() };
    setCompletion(next);
    setSent(true);
    try { sessionStorage.setItem(completionKey, JSON.stringify(next)); sessionStorage.removeItem(draftKey); } catch { /* storage is optional */ }
    setAnnouncement("Project brief prepared locally. No request was sent.");
  }

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (step === steps.length - 1) prepare();
    else setStep((previous) => previous + 1);
  }

  function startAgain() {
    setSent(false); setCompletion(null); setStep(0); setData({}); setFiles([]); setRecoveredFiles([]); setCopied(false);
    try { sessionStorage.removeItem(completionKey); sessionStorage.removeItem(draftKey); } catch { /* storage is optional */ }
  }

  async function copySummary() {
    if (!completion) return;
    const summary = getSummary(completion.data, completion.fileNames);
    try { await navigator.clipboard.writeText(summary); setCopied(true); setAnnouncement("Prepared brief copied to the clipboard."); } catch { setAnnouncement("Copy is unavailable in this browser. Use Download brief instead."); }
  }

  function downloadSummary() {
    if (!completion) return;
    const blob = new Blob([getSummary(completion.data, completion.fileNames)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = "axiom-project-brief.txt"; link.click(); URL.revokeObjectURL(url);
  }

  const progress = <div className="stepper" aria-label="Quote request progress">{steps.map((label, index) => <div className={`stepper-item ${index === step ? "active" : ""} ${index < step ? "complete" : ""}`} key={label}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{label}</div>)}</div>;

  if (sent) return <div className="rfq-layout"><div className="rfq-intro"><div className="eyebrow">Project intake</div><h1 className="display">Start with the operating reality.</h1><p>Give the engineering team enough context to understand the application, constraints, and success criteria. This concept flow keeps the prepared brief in your browser.</p>{progress}</div><div className="rfq-panel" ref={panelRef}><div className="success-state" role="status" aria-live="polite"><span className="success-mark" aria-hidden="true">✓</span><h2 className="display" tabIndex={-1} ref={headingRef}>Brief prepared.</h2><p>No request was submitted. Your locally prepared brief is retained for this browser session.</p>{completion && <dl className="completion-summary">{["name", "company", "email", "industry", "application", "category", "productModel", "quantity", "timeline"].filter((key) => completion.data[key]).map((key) => <div key={key}><dt>{fieldLabels[key]}</dt><dd>{completion.data[key]}</dd></div>)}<div><dt>Attachments</dt><dd>{completion.fileNames.length ? completion.fileNames.join(", ") : "None added"}{completion.recoveredFileNames?.length ? <small className="recovery-note">Saved filenames only — reattach these files before handoff.</small> : null}</dd></div></dl>}<div className="completion-actions"><button className="button button-primary" type="button" onClick={copySummary}>{copied ? "Copied" : "Copy brief"}</button><button className="button button-outline" type="button" onClick={downloadSummary}>Download brief</button><button className="button button-light-outline" type="button" onClick={() => { setSent(false); setStep(4); setAnnouncement("Review mode opened. Edit any section before preparing again."); }}>Edit brief</button></div><button className="text-link completion-reset" type="button" onClick={startAgain}>Start another request <span aria-hidden="true">↗</span></button></div></div><div className="sr-only" aria-live="polite">{announcement}</div></div>;

  return <div className="rfq-layout"><div className="rfq-intro"><div className="eyebrow">Project intake</div><h1 className="display">Start with the operating reality.</h1><p>Give the engineering team enough context to understand the application, constraints, and success criteria. The more specific the brief, the better the first conversation.</p>{progress}</div><div className="rfq-panel" ref={panelRef}><div className="rfq-panel-header"><h2 tabIndex={-1} ref={headingRef}>{steps[step]}</h2><span>Step {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span></div><form className="rfq-panel-body" onSubmit={advance} noValidate>
    {step === 0 && <><p>Fields marked * are required. We use this only to shape the project brief in this browser.</p><div className="form-grid">{[["name", "Name", "text", true], ["company", "Company", "text", true], ["email", "Work email", "email", true], ["phone", "Phone", "tel", false], ["country", "Country", "text", true]].map(([key, label, type, required]) => <div className="form-field" key={String(key)}><label htmlFor={`rfq-${key}`}>{label}{required ? " *" : ""}</label><input id={`rfq-${key}`} className="field" type={String(type)} required={Boolean(required)} value={data[String(key)] || ""} onChange={(event) => set(String(key), event.target.value)} placeholder={`Enter ${String(label).toLowerCase()}`} autoComplete={({ name: "name", company: "organization", email: "email", phone: "tel", country: "country-name" } as Record<string, string>)[String(key)]} /></div>)}</div></>}
    {step === 1 && <>
      <p>Choose the closest brief so the next engineering conversation starts with useful context.</p>
      <div className="form-grid">
        {[
          ["industry", "Industry", industryOptions],
          ["application", "Application", applicationOptions],
          ["category", "Product family", categoryOptions],
          ["productModel", "Model or platform", modelOptions.map((product) => product.name)],
          ["timeline", "Project timeline", ["Exploring options", "0–3 months", "3–6 months", "6–12 months", "12+ months"]],
        ].map(([key, label, options]) => <div className="form-field" key={String(key)}>
          <label htmlFor={`rfq-${key}`}>{label} *</label>
          <select id={`rfq-${key}`} className="field" required value={data[String(key)] || ""} onChange={(event) => { set(String(key), event.target.value); if (key === "category") set("productModel", ""); }}>
            <option value="">Select {String(label).toLowerCase()}</option>
            {(options as string[]).map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>)}
        <div className="form-field"><label htmlFor="rfq-quantity">Required quantity *</label><input id="rfq-quantity" className="field" type="number" min="1" step="1" required value={data.quantity || ""} onChange={(event) => set("quantity", event.target.value)} placeholder="e.g. 2" /></div>
      </div>
    </>}
    {step === 2 && <><p>Add the operating conditions you know. Technical fields can be left blank while the application is being shaped.</p><div className="form-grid">{technicalFields.map(([key, label, type]) => <div className="form-field" key={key}><label htmlFor={`rfq-${key}`}>{label}</label><input id={`rfq-${key}`} className="field" type={type} value={data[key] || ""} onChange={(event) => set(key, event.target.value)} placeholder={`Enter ${label.toLowerCase()}`} /></div>)}<div className="form-field full"><label htmlFor="rfq-requirements">Additional requirements</label><textarea id="rfq-requirements" className="field" value={data.requirements || ""} onChange={(event) => set("requirements", event.target.value)} placeholder="Describe process constraints, access, service conditions, or standards to consider." /></div></div></>}
    {step === 3 && <><p>Attach drawings, CAD files, PDFs, or specifications. Files remain in this browser session only. A recovered draft keeps filenames only, so those files must be reattached after refresh.</p><label className="file-drop" htmlFor="rfq-files" role="button" tabIndex={0} aria-describedby="rfq-file-help" onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); document.getElementById("rfq-files")?.click(); } }} onDragOver={(event) => event.preventDefault()} onDrop={onDrop}><span><strong>Drop files here or browse</strong><small id="rfq-file-help">PDF, DWG, DXF, XLSX, XLS, DOC, DOCX · up to 10 MB each · 8 files / 40 MB total</small></span></label><input id="rfq-files" type="file" multiple hidden accept=".pdf,.dwg,.dxf,.xlsx,.xls,.doc,.docx" onChange={onFileChange} />{(recoveredFiles.length > 0 || files.length > 0) && <div className="file-list">{recoveredFiles.map((name) => <div className="file-recovered" key={`recovered-${name}`}><span>{name}<small>Saved filename only — reattach required</small></span><button type="button" onClick={() => setRecoveredFiles((previous) => previous.filter((fileName) => fileName !== name))} aria-label={`Remove recovered ${name}`}>Remove</button></div>)}{files.map((file, index) => <div key={`${file.name}-${index}`}><span>{file.name}</span><button type="button" onClick={() => setFiles((previous) => previous.filter((_, fileIndex) => fileIndex !== index))} aria-label={`Remove ${file.name}`}>Remove</button></div>)}</div>}</>}
    {step === 4 && <><p>Review the locally prepared brief. Use Edit to return to any step before preparing it.</p><div className="review-list">{[["Contact information", 0, ["name", "company", "email", "phone", "country"]], ["Project details", 1, ["industry", "application", "category", "productModel", "quantity", "timeline"]], ["Technical information", 2, ["flow", "pressure", "temperature", "material", "requirements"]]].map(([title, index, keys]) => <section className="review-group" key={String(title)}><div className="review-group-header"><h3>{title}</h3><button type="button" onClick={() => goToStep(Number(index))}>Edit</button></div>{(keys as string[]).map((key) => data[key] ? <div key={key}><span>{fieldLabels[key]}</span><strong>{data[key]}</strong></div> : null)}</section>)}<section className="review-group"><div className="review-group-header"><h3>Attachments</h3><button type="button" onClick={() => goToStep(3)}>Edit</button></div><div><span>Files</span><strong>{[...recoveredFiles, ...files.map((file) => file.name)].length ? [...recoveredFiles, ...files.map((file) => file.name)].join(", ") : "None added"}</strong></div></section></div></>}
    {error && <div className="error-message" role="alert" tabIndex={-1} ref={errorRef}>{error}</div>}<div className="rfq-actions">{step > 0 && <button className="button button-outline" type="button" onClick={() => goToStep(step - 1)}>Back</button>}<button className="button button-primary" type="submit">{step === steps.length - 1 ? "Prepare brief" : "Continue"} <span aria-hidden="true">→</span></button></div>
  </form></div><div className="sr-only" aria-live="polite">{announcement}</div></div>;
}
