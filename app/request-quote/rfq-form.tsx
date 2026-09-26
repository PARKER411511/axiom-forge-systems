"use client";

import { useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";

const steps = ["Contact information", "Project details", "Technical information", "Attachments", "Review and submit"];
const fields = [
  [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "company", label: "Company", type: "text", required: true },
    { key: "email", label: "Work email", type: "email", required: true },
    { key: "phone", label: "Phone", type: "tel", required: false },
    { key: "country", label: "Country", type: "text", required: true },
  ],
  [
    { key: "industry", label: "Industry", type: "text", required: true },
    { key: "application", label: "Application", type: "text", required: true },
    { key: "category", label: "Product category", type: "text", required: true },
    { key: "quantity", label: "Required quantity", type: "number", required: true },
    { key: "timeline", label: "Project timeline", type: "text", required: true },
  ],
  [
    { key: "flow", label: "Flow rate", type: "text", required: false },
    { key: "pressure", label: "Pressure", type: "text", required: false },
    { key: "temperature", label: "Temperature", type: "text", required: false },
    { key: "material", label: "Material", type: "text", required: false },
    { key: "requirements", label: "Additional requirements", type: "textarea", required: false },
  ],
] as const;

const allowedExtensions = ["pdf", "dwg", "dxf", "xlsx", "xls", "doc", "docx"];
const maxFileSize = 10 * 1024 * 1024;

export function RFQForm() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [data, setData] = useState<Record<string, string>>({});
  const currentFields = step < 3 ? fields[step] : [];
  const progress = <div className="stepper" aria-label="Quote request progress">{steps.map((label,index)=><div className={`stepper-item ${index===step?"active":""} ${index<step?"complete":""}`} key={label}><span>{String(index+1).padStart(2,"0")}</span>{label}</div>)}</div>;

  const set = (key: string, value: string) => setData((previous) => ({ ...previous, [key]: value }));

  function addFiles(incoming: FileList | File[]) {
    const selected = Array.from(incoming);
    const invalid = selected.find((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      return !extension || !allowedExtensions.includes(extension) || file.size > maxFileSize;
    });
    if (invalid) {
      setError(`${invalid.name} is not a supported file or exceeds 10 MB.`);
      return;
    }
    setFiles((previous) => [...previous, ...selected]);
    setError("");
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) addFiles(event.target.files);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  }

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 2 && currentFields.some((field) => field.required && !data[field.key]?.trim())) {
      setError("Complete the required fields before continuing.");
      return;
    }
    setError("");
    if (step === 4) setSent(true);
    else setStep((previous) => previous + 1);
  }

  if (sent) return (
    <div className="rfq-layout"><div className="rfq-intro"><div className="eyebrow">Project intake</div><h1 className="display">Start with the operating reality.</h1><p>Give our engineering team enough context to understand the application, constraints, and success criteria. The more specific the brief, the better the first response.</p>{progress}</div><div className="rfq-panel">
      <div className="success-state" role="status">
        <span className="success-mark">✓</span>
        <h2 className="display">Brief prepared.</h2>
        <p>Your request is ready for handoff. Details and files remain in this browser until the intake endpoint is connected.</p>
        <button className="button button-outline" type="button" onClick={() => { setSent(false); setStep(0); setData({}); setFiles([]); }}>
          Start another request
        </button>
      </div>
    </div></div>
  );

  return (
    <div className="rfq-layout"><div className="rfq-intro"><div className="eyebrow">Project intake</div><h1 className="display">Start with the operating reality.</h1><p>Give our engineering team enough context to understand the application, constraints, and success criteria. The more specific the brief, the better the first response.</p>{progress}</div><div className="rfq-panel">
      <div className="rfq-panel-header">
        <h2>{steps[step]}</h2>
        <span>Step {String(step + 1).padStart(2, "0")} / 05</span>
      </div>
      <form className="rfq-panel-body" onSubmit={advance}>
        {step < 3 && <>
          <p>{step === 2 ? "Add the operating conditions you know. Technical fields can be left blank." : "Fields marked * are required."}</p>
          <div className="form-grid">
            {currentFields.map(({ key, label, type, required }) => (
              <div className={`form-field ${type === "textarea" ? "full" : ""}`} key={key}>
                <label htmlFor={`rfq-${key}`}>{label}{required ? " *" : ""}</label>
                {type === "textarea" ? (
                  <textarea id={`rfq-${key}`} className="field" value={data[key] || ""} onChange={(event) => set(key, event.target.value)} placeholder="Describe the process, constraints, or service conditions." />
                ) : (
                  <input id={`rfq-${key}`} className="field" type={type} min={type === "number" ? 1 : undefined} required={required} value={data[key] || ""} onChange={(event) => set(key, event.target.value)} placeholder={`Enter ${label.toLowerCase()}`} />
                )}
              </div>
            ))}
          </div>
        </>}

        {step === 3 && <>
          <p>Attach drawings, CAD files, PDFs, or specifications. Files remain in this browser session only.</p>
          <label className="file-drop" htmlFor="rfq-files" role="button" tabIndex={0} aria-describedby="rfq-file-help" onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); document.getElementById("rfq-files")?.click(); } }} onDragOver={(event) => event.preventDefault()} onDrop={onDrop}>
            <span><strong>Drop files here or browse</strong><small id="rfq-file-help">PDF, DWG, DXF, XLSX, XLS, DOC, DOCX · up to 10 MB each</small></span>
          </label>
          <input id="rfq-files" type="file" multiple hidden accept=".pdf,.dwg,.dxf,.xlsx,.xls,.doc,.docx" onChange={onFileChange} />
          {files.length > 0 && <div className="file-list">{files.map((file, index) => <div key={`${file.name}-${index}`}><span>{file.name}</span><button type="button" onClick={() => setFiles((previous) => previous.filter((_, fileIndex) => fileIndex !== index))} aria-label={`Remove ${file.name}`}>Remove</button></div>)}</div>}
        </>}

        {step === 4 && <>
          <p>Review your brief before preparing the request. Details stay in this browser until the intake endpoint is connected.</p>
          <div className="review-list">
            {fields.flat().map(({ key, label }) => data[key] ? <div key={key}><span>{label}</span><strong>{data[key]}</strong></div> : null)}
            <div><span>Attachments</span><strong>{files.length ? files.map((file) => file.name).join(", ") : "None added"}</strong></div>
          </div>
        </>}

        {error && <div className="error-message" role="alert">{error}</div>}
        <div className="rfq-actions">
          {step > 0 && <button className="button button-outline" type="button" onClick={() => { setError(""); setStep((previous) => previous - 1); }}>Back</button>}
          <button className="button button-primary" type="submit">{step === 4 ? "Prepare request" : "Continue"} <span aria-hidden="true">→</span></button>
        </div>
      </form>
    </div></div>
  );
}
