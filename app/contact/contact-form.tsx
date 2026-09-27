"use client";

import { useState, type FormEvent } from "react";

type ContactDetails = { name: string; email: string; company: string; message: string };

function summary(details: ContactDetails) {
  return ["Axiom Forge Systems — enquiry brief (prepared locally)", "", `Name: ${details.name}`, `Work email: ${details.email}`, `Company: ${details.company || "Not provided"}`, `Message: ${details.message}`, "", "No message was transmitted. This is a fictional portfolio concept without a contact backend."].join("\n");
}

export function ContactForm() {
  const [details, setDetails] = useState<ContactDetails>({ name: "", email: "", company: "", message: "" });
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (key: keyof ContactDetails, value: string) => setDetails((previous) => ({ ...previous, [key]: value }));
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setPrepared(true); }
  async function copy() { try { await navigator.clipboard.writeText(summary(details)); setCopied(true); } catch { setCopied(false); } }
  function download() { const url = URL.createObjectURL(new Blob([summary(details)], { type: "text/plain;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = "axiom-enquiry-brief.txt"; link.click(); URL.revokeObjectURL(url); }

  if (prepared) return <div className="success-state" role="status" aria-live="polite"><span className="success-mark" aria-hidden="true">✓</span><h2 className="display">Enquiry prepared.</h2><p>No message was sent. Your summary is ready to copy or download from this browser.</p><dl className="completion-summary contact-summary"><div><dt>Name</dt><dd>{details.name}</dd></div><div><dt>Work email</dt><dd>{details.email}</dd></div>{details.company && <div><dt>Company</dt><dd>{details.company}</dd></div>}<div><dt>Brief</dt><dd>{details.message}</dd></div></dl><div className="completion-actions"><button className="button button-primary" type="button" onClick={copy}>{copied ? "Copied" : "Copy summary"}</button><button className="button button-outline" type="button" onClick={download}>Download summary</button></div><button className="text-link completion-reset" type="button" onClick={() => { setPrepared(false); setCopied(false); }}>Edit enquiry <span aria-hidden="true">↗</span></button></div>;

  return <form onSubmit={submit}><div className="form-grid"><div className="form-field"><label htmlFor="contact-name">Name *</label><input required id="contact-name" className="field" value={details.name} onChange={(event) => set("name", event.target.value)} placeholder="Your name" autoComplete="name" /></div><div className="form-field"><label htmlFor="contact-email">Work email *</label><input required type="email" id="contact-email" className="field" value={details.email} onChange={(event) => set("email", event.target.value)} placeholder="name@company.com" autoComplete="email" /></div><div className="form-field full"><label htmlFor="contact-company">Company</label><input id="contact-company" className="field" value={details.company} onChange={(event) => set("company", event.target.value)} placeholder="Company name" autoComplete="organization" /></div><div className="form-field full"><label htmlFor="contact-message">How can we help? *</label><textarea required id="contact-message" className="field" value={details.message} onChange={(event) => set("message", event.target.value)} placeholder="Tell us about your application, equipment, or service need." /></div></div><p className="form-note">This concept form does not transmit data. Prepare a summary here, then copy or download it for your own handoff.</p><div className="form-actions"><button className="button button-primary" type="submit">Prepare enquiry <span aria-hidden="true">→</span></button></div></form>;
}
