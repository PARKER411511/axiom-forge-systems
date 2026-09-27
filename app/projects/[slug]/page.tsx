import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, projects } from "@/lib/data";
import { pageMetadata } from "@/lib/site-metadata";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? pageMetadata({ title: project.title, description: project.summary, path: `/projects/${project.slug}`, image: project.image }) : { title: "Project not found" };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const relatedProduct = products.find((product) => product.slug === project.relatedProduct);
  return <>
    <section className="detail-hero"><div className="container detail-layout"><div className="detail-media"><Image src={project.image} alt={`${project.title} facility`} fill priority sizes="(max-width: 680px) 100vw, (max-width: 980px) 92vw, 55vw" /></div><div className="detail-content"><div className="eyebrow">{project.industry} · {project.location}</div><h1 className="display">{project.title}</h1><p>{project.summary}</p><div className="detail-buttons"><Link className="button button-primary" href={`/request-quote?project=${project.slug}`}>Discuss a similar project</Link><Link className="button button-outline" href="/projects">All projects</Link></div><div className="detail-meta"><div><span>System</span><strong>{project.system}</strong></div><div><span>Result</span><strong>{project.result}</strong></div></div></div></div></section>
    <section className="detail-section section-light"><div className="container narrow"><div className="eyebrow">Engineering breakdown</div><h2 className="display">{project.slug === "rotterdam-processing-facility" ? "Hydraulic balance restored for continuous production." : "The operating reality set the brief."}</h2><div className="case-study-method"><article><span>Constraints</span><p>{project.challenge}</p></article><article><span>Engineering decisions</span><p>{project.response}</p></article><article><span>Commissioning approach</span><p>{project.technicalDetail}</p></article><article><span>Measures</span><p>{project.metrics.map((metric) => `${metric.value} ${metric.label.toLowerCase()}`).join(" · ")}</p></article></div><div className="application-list"><span>Application analysis</span><span>System engineering</span><span>Factory testing</span><span>Lifecycle support</span></div><div className="case-study-grid">{project.metrics.map((metric) => <div className="case-study-card" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></div></section>
    <section className="section"><div className="container"><div className="project-feature"><div className="project-feature-media case-study-image"><Image src={relatedProduct?.image ?? project.image} alt={`${project.system} equipment`} fill sizes="(max-width: 980px) 100vw, 55vw" /></div><div className="project-feature-content"><div className="eyebrow">System delivered</div><h2 className="display">{project.system}</h2><p>Performance outcomes are tracked against the operating goals established during design. This case study is an illustrative portfolio scenario, not a customer claim.</p><Link className="text-link" href={`/products/${project.relatedProduct}`}>View related system <span aria-hidden="true">→</span></Link></div></div></div></section>
  </>;
}
