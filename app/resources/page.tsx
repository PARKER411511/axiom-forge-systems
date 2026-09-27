import type { Metadata } from "next";
import { resources } from "@/lib/data";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({ title: "Resources", description: "Product datasheets, engineering guides, installation references, and technical articles from Axiom Forge Systems.", path: "/resources", image: "/images/engineer.jpg" });

const resourceCategories = ["Product datasheets", "Engineering guides", "Installation & application references"];

export default function ResourcesPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Resources</div><h1 className="display">Useful information for the next decision.</h1><p>Technical reference concepts for sizing, specifying, installing, and maintaining industrial systems.</p><div className="page-hero-meta"><div><span>13</span> Reference PDFs</div><div><span>03</span> Resource categories</div><div><span>02</span> Pages each</div></div></div></section>
    <section className="section"><div className="container resource-catalog">{resourceCategories.map((category) => <section className="resource-category" key={category} aria-labelledby={`resource-category-${category.toLowerCase().replace(/[^a-z]+/g, "-")}`}><div className="section-heading resource-category-heading"><div><div className="eyebrow">Reference library</div><h2 className="display" id={`resource-category-${category.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{category}</h2></div><p>{category === "Product datasheets" ? "Platform-level specifications for early selection and application conversations." : category === "Engineering guides" ? "Short technical primers for framing the operating problem before detailed design." : "Practical reference material for installation planning, layout, and handoff."}</p></div><div className="resource-grid">{resources.filter((resource) => resource.category === category).map((resource) => <article className="resource-card" key={resource.slug}><div className="resource-icon" aria-hidden="true">↘</div><div className="eyebrow">{resource.type}</div><h3>{resource.title}</h3><p>{resource.description}</p><div className="resource-purpose"><strong>Use it for</strong><span>{resource.purpose}</span></div><div className="resource-meta">{resource.meta}</div><a className="resource-preview" href={resource.href} download aria-label={`${resource.action}: ${resource.title}`}>{resource.action}<span aria-hidden="true">↓</span></a></article>)}</div></section>)}</div></section>
    <section className="section-tight section-surface"><div className="container"><p className="form-note">Reference materials are prepared for early-stage engineering conversations. Confirm final specifications against the project duty, applicable standards, and responsible manufacturer documentation.</p></div></section>
  </>;
}
