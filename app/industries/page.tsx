import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { industries, projects } from "@/lib/data";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({ title: "Industries", description: "Industrial engineering systems for energy, manufacturing, mining, water, marine, and process industries.", path: "/industries", image: "/images/industry-energy.webp" });

const operatingFramework = [
  ["01", "Duty envelope", "Flow, load, temperature, and process variability establish the operating window before a system is selected."],
  ["02", "Site interface", "Access, tie-ins, utilities, safety zones, and maintenance routes decide what can be installed and serviced."],
  ["03", "Operating handoff", "Controls, commissioning windows, spares, and records keep the final system useful after startup."],
] as const;

export default function IndustriesPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Industries</div><h1 className="display">Specified for the world as it is.</h1><p>Every site has a different operating envelope. We bring the process, environment, and people into the engineering brief from day one.</p></div></section>
    <section className="section"><div className="container"><nav className="industry-index" aria-label="Jump to industry"><span className="eyebrow">Jump to sector</span><ol>{industries.map((industry, index) => <li key={industry.slug}><a href={`#${industry.slug}`}><span>{String(index + 1).padStart(2, "0")}</span>{industry.name}</a></li>)}</ol></nav><div className="industry-list">{industries.map((industry, index) => { const relatedProjects = projects.filter((project) => project.industry === industry.name); return <article className="industry-row" id={industry.slug} key={industry.slug}><div className="industry-row-media"><Image src={industry.image} alt={`${industry.name} industrial environment`} fill sizes="(max-width: 680px) 480px, (max-width: 980px) 100vw, 550px" /></div><div className="industry-row-content"><div className="eyebrow">{String(index + 1).padStart(2, "0")} · INDUSTRY SYSTEMS</div><h2 className="display">{industry.name}</h2><p>{industry.description}</p><div className="industry-applications">{industry.applications.map((application) => <span key={application}>{application}</span>)}</div><div className="industry-links"><Link className="text-link" href={`/products?industry=${industry.slug}`}>Explore systems <span aria-hidden="true">→</span></Link>{relatedProjects.length > 0 && <div className="industry-project-links"><span>Related project</span>{relatedProjects.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}>{project.title} <span aria-hidden="true">↗</span></Link>)}</div>}</div></div></article>; })}</div></div></section>
    <section className="section section-light industry-framework-section"><div className="container"><div className="industry-framework-heading"><div><div className="eyebrow">The Axiom approach / field brief</div><h2 className="display">Context before catalogue.</h2></div><p>Every sector changes the duty and the site. These three checks keep the first engineering conversation grounded in what the operation can actually support.</p></div><div className="industry-framework-list">{operatingFramework.map(([number, title, description]) => <article className="industry-framework-card" key={number}><div className="industry-framework-index">{number}</div><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
  </>;
}
