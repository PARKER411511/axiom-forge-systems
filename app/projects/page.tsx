import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({ title: "Projects", description: "Selected Axiom Forge Systems industrial engineering projects and illustrative field outcomes.", path: "/projects", image: "/images/facility.webp" });

export default function ProjectsPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Selected project scenarios</div><h1 className="display">Engineering stories, made specific.</h1><p>Illustrative scenarios that show how constraints, system decisions, and outcomes can connect without pretending to be verified customer claims.</p></div></section>
    <section className="section"><div className="container"><h2 className="sr-only">Selected project case studies</h2><div className="project-grid">{projects.map((project, index) => <ProjectCard project={project} featured={index === 0} key={project.slug} />)}</div><p className="concept-note concept-note-inline">Project outcomes are illustrative portfolio scenarios, not verified customer or business claims.</p></div></section>
  </>;
}
