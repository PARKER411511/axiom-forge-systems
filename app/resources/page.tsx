import type { Metadata } from "next";
import Link from "next/link";
import { resources } from "@/lib/data";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({title:"Resources",description:"Product datasheets, engineering guides, installation manuals, and technical articles from Axiom Forge Systems.",path:"/resources",image:"/images/engineer.jpg"});

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
            <div className="resource-meta">{resource.meta}</div>
            {resource.download ? <a className="resource-preview" href={resource.href} download>{resource.action}<span>↓</span></a> : <Link className="resource-preview" href={resource.href}>{resource.action}<span>→</span></Link>}
          </article>)}
        </div>
        <p className="form-note">Reference materials are prepared for early-stage engineering conversations. Confirm final specifications against the project duty and applicable standards.</p>
      </div>
    </section>
  </>;
}
