import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "./contact-form";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({ title: "Contact", description: "Connect with Axiom Forge Systems engineering, application, and service teams through a structured local brief.", path: "/contact", image: "/images/facility.webp" });

export default function ContactPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Contact the team</div><h1 className="display">Bring us the operating reality.</h1><p>Tell us what the system has to do, where it has to do it, and what success looks like. We&apos;ll shape the right engineering conversation.</p><div className="concept-note" role="note"><strong>Portfolio demo.</strong> The form prepares a local summary only; it does not send an email or create a backend enquiry.</div></div></section>
    <section className="section"><div className="container contact-grid"><div className="contact-info"><div className="eyebrow">Global headquarters</div><h2 className="display">Houston, Texas.</h2><p>Axiom Forge Systems<br />Industrial engineering and lifecycle support across demanding operating environments.</p><div className="contact-list"><div><span>Sales intake</span><strong><Link href="/request-quote">Prepare an enquiry brief</Link></strong></div><div><span>Engineering support</span><strong><Link href="/request-quote">Share technical context</Link></strong></div><div id="service"><span>Service department</span><strong><Link href="/request-quote">Start a service brief</Link></strong></div></div></div><div className="form-shell"><ContactForm /></div></div></section>
    <section className="section section-surface"><div className="container"><div className="project-feature"><div className="project-feature-media location-map" role="img" aria-label="Illustrative Houston engineering office location"><div className="location-pin"><span>29.7604° N / 95.3698° W</span><strong>AXIOM HOUSTON</strong></div></div><div className="project-feature-content"><div className="eyebrow">Visit the team</div><h2 className="display">A useful conversation starts with context.</h2><p>Houston is the visual anchor for this industrial studio. Share the application, operating conditions, and project timing so the prepared brief has somewhere to begin.</p><Link className="text-link" href="/request-quote">Prepare a project brief <span aria-hidden="true">→</span></Link></div></div></div></section>
  </>;
}
