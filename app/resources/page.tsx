import type { Metadata } from "next";
import { resources } from "@/lib/data";
import { pageMetadata } from "@/lib/site-metadata";
import { ResourcesExplorer } from "./resources-explorer";

export const metadata: Metadata = pageMetadata({ title: "Resources", description: "Product datasheets, engineering guides, installation references, and technical articles from Axiom Forge Systems.", path: "/resources", image: "/images/engineer.jpg" });

const resourceCategories = ["Product datasheets", "Engineering guides", "Installation & application references"];

export default function ResourcesPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Resources</div><h1 className="display">Useful information for the next decision.</h1><p>Technical reference concepts for sizing, specifying, installing, and maintaining industrial systems.</p><div className="page-hero-meta"><div><span>13</span> Reference PDFs</div><div><span>03</span> Resource categories</div><div><span>02</span> Pages each</div></div></div></section>
    <section className="section"><div className="container"><ResourcesExplorer resources={resources} categories={resourceCategories} /></div></section>
    <section className="section-tight section-surface"><div className="container"><p className="form-note">Reference materials are prepared for early-stage engineering conversations. Confirm final specifications against the project duty, applicable standards, and responsible manufacturer documentation.</p></div></section>
  </>;
}
