import type { Metadata } from "next";
import { resources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resources",
  description: "Product datasheets, engineering guides, installation manuals, and technical articles from Axiom Forge Systems.",
};

export default function ResourcesPage() {
  return <>
    <section className="page-hero">
      <div className="container">
        <div className="eyebrow">Resources</div>
        <h1 className="display">Useful information for the next decision.</h1>
        <p>Technical reference concepts for sizing, specifying, installing, and maintaining industrial systems.</p>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="resource-grid">
          {resources.map((resource) => <article className="resource-card" key={resource.title}>
            <div className="resource-icon" aria-hidden="true">↘</div>
            <div className="eyebrow">{resource.type}</div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <span className="resource-preview">Concept preview</span>
          </article>)}
        </div>
        <p className="form-note">These resources are fictional portfolio content. Technical files are not available for download.</p>
      </div>
    </section>
  </>;
}
