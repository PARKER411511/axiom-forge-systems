import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article className={`project-card ${featured ? "project-card-featured" : ""}`}>
    <Link href={`/projects/${project.slug}`} className="project-card-media" aria-label={`View ${project.title} case study`}><Image src={project.image} alt={`${project.title} industrial facility`} fill sizes="(max-width: 680px) 100vw, (max-width: 980px) 42vw, 30vw" /></Link>
    <div className="project-card-content"><div className="eyebrow">{project.industry}</div><h2>{project.title}</h2><p>{project.summary}</p><div className="project-details"><div><span>System</span><strong>{project.system}</strong></div><div><span>Result</span><strong>{project.result}</strong></div></div><Link className="text-link" href={`/projects/${project.slug}`}>View case study <span aria-hidden="true">→</span></Link></div>
  </article>;
}
