import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "./contact-form";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({ title: "Contact", description: "Connect with Axiom Forge Systems engineering, application, and service teams through a structured local brief.", path: "/contact", image: "/images/facility.webp" });

export default function ContactPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Contact the team</div><h1 className="display">Bring us the operating reality.</h1><p>Tell us what the system has to do, where it has to do it, and what success looks like. We&apos;ll shape the right engineering conversation.</p><div className="concept-note" role="note"><strong>Portfolio demo.</strong> The form prepares a local summary only; it does not send an email or create a backend enquiry.</div></div></section>
    <section className="section"><div className="container contact-grid"><div className="contact-info"><div className="eyebrow">Concept studio / Houston anchor</div><h2 className="display">Bring the right question.</h2><p>Use the route that best matches the conversation you want to prepare.</p><div className="contact-list"><div><span>Sales intake</span><strong><Link href="/request-quote?reason=sales">Prepare a sales brief</Link></strong></div><div><span>Engineering support</span><strong><Link href="/request-quote?reason=engineering">Share technical context</Link></strong></div><div id="service"><span>Service department</span><strong><Link href="/request-quote?reason=service">Start a service brief</Link></strong></div></div></div><div className="form-shell"><ContactForm /></div></div></section>
    <section className="section section-surface"><div className="container"><div className="project-feature"><div className="project-feature-media location-map" role="img" aria-label="Illustrative Houston concept-studio map graphic"><div className="location-pin"><span>HOUSTON / CONCEPT STUDIO</span><strong>NO PUBLIC ADDRESS</strong></div></div><div className="project-feature-content"><div className="eyebrow">Studio context / illustrative</div><h2 className="display">A useful conversation starts with context.</h2><p>Houston is a visual anchor for this portfolio concept, not a published office or visit address. Share the application, operating conditions, and project timing so the prepared brief has somewhere to begin.</p><Link className="text-link" href="/request-quote">Prepare a project brief <span aria-hidden="true">→</span></Link></div></div></div></section>
  </>;
}
