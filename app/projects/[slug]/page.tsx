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

function SystemCurveDiagram() {
  return <div className="system-curve" aria-labelledby="system-curve-heading">
    <div className="system-curve-heading"><div><div className="eyebrow">Conceptual data view</div><h3 id="system-curve-heading">System curve / pump curve</h3></div><span>Not to scale</span></div>
    <svg viewBox="0 0 760 300" role="img" aria-labelledby="system-curve-title system-curve-description">
      <title id="system-curve-title">Conceptual pump and system curve intersection</title>
      <desc id="system-curve-description">Two illustrative curves intersect at a duty point. No measured project data is represented.</desc>
      <line x1="78" y1="30" x2="78" y2="245" className="curve-axis" />
      <line x1="78" y1="245" x2="710" y2="245" className="curve-axis" />
      <line x1="78" y1="193" x2="710" y2="193" className="curve-grid" />
      <line x1="78" y1="141" x2="710" y2="141" className="curve-grid" />
      <line x1="78" y1="89" x2="710" y2="89" className="curve-grid" />
      <path d="M94 224 C211 221 331 196 442 141 C552 84 623 58 698 50" className="curve-system-line" />
      <path d="M94 60 C220 74 340 112 442 141 C545 171 636 209 698 228" className="curve-pump-line" />
      <circle cx="442" cy="141" r="6" className="curve-point" />
      <line x1="442" y1="141" x2="442" y2="245" className="curve-guide" />
      <line x1="78" y1="141" x2="442" y2="141" className="curve-guide" />
      <text x="452" y="128" className="curve-label curve-label-point">Illustrative duty point</text>
      <text x="535" y="78" className="curve-label curve-label-system">System curve (concept)</text>
      <text x="174" y="73" className="curve-label curve-label-pump">Pump curve (concept)</text>
      <text x="20" y="43" className="curve-axis-label" transform="rotate(-90 20 43)">Head / ΔP</text>
      <text x="646" y="274" className="curve-axis-label">Flow / Q</text>
      <text x="70" y="263" className="curve-tick">0</text><text x="430" y="263" className="curve-tick">Q*</text><text x="696" y="263" className="curve-tick">max</text>
    </svg>
    <p>Conceptual only: the intersection illustrates how duty, pump selection, and control intent are reviewed together. It is not a measured performance curve.</p>
  </div>;
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const relatedProduct = products.find((product) => product.slug === project.relatedProduct);
  return <>
    <section className="detail-hero detail-hero--project"><div className="container detail-layout"><div className="detail-media detail-media--project"><Image src={project.image} alt={`${project.title} facility`} fill priority sizes="(max-width: 680px) 400px, (max-width: 980px) 92vw, min(58vw, 680px)" /></div><div className="detail-content"><div className="eyebrow">{project.industry} · {project.location}</div><h1 className="display">{project.title}</h1><p>{project.summary}</p><div className="detail-buttons"><Link className="button button-primary" href={`/request-quote?project=${project.slug}`}>Discuss a similar project</Link><Link className="button button-outline" href="/projects">All projects</Link></div><div className="detail-meta"><div><span>System</span><strong>{project.system}</strong></div><div><span>Illustrative result</span><strong>{project.result}</strong></div></div></div></div></section>
    <section className="detail-section section-light"><div className="container narrow"><div className="eyebrow">Engineering breakdown</div><h2 className="display">{project.slug === "rotterdam-processing-facility" ? "Hydraulic balance restored for continuous production." : "The operating constraint set the brief."}</h2><div className="case-study-method"><article><span>Constraints</span><p>{project.challenge}</p></article><article><span>Engineering decisions</span><p>{project.response}</p></article><article><span>Commissioning approach</span><p>{project.technicalDetail}</p></article><article><span>Measures</span><p>{project.metrics.map((metric) => `${metric.value} ${metric.label.toLowerCase()}`).join(" · ")}</p></article></div><div className="case-study-grid">{project.metrics.map((metric) => <div className="case-study-card" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><p className="concept-note concept-note-inline"><strong>Portfolio disclosure.</strong> The outcomes above are illustrative scenario references, not verified customer or business results.</p></div></section>
    {project.slug === "rotterdam-processing-facility" && relatedProduct && <section className="section rotterdam-technical-section" aria-labelledby="rotterdam-technical-heading"><div className="container"><div className="section-heading"><div><div className="eyebrow">System visual / illustrative</div><h2 className="display" id="rotterdam-technical-heading">Three decisions held the upgrade together.</h2></div><p>The duty cycle, system curve, and commissioning window shaped the pump-train decision around live production.</p></div><div className="rotterdam-technical-visual"><div className="rotterdam-stage"><Image src={relatedProduct.cardImage ?? relatedProduct.image} alt="AF-P900 process pump cutout used to illustrate the Rotterdam system" fill sizes="(max-width: 980px) 100vw, 58vw" /><span className="rotterdam-stage-label">AF-P900 / SYSTEM VIEW</span></div><ol className="rotterdam-callouts"><li><span className="rotterdam-callout-number">01</span><div><h3>Map the duty and system curve</h3><p>Map the operating envelope before selecting the pump train so the equipment decision stays tied to the process.</p></div></li><li><span className="rotterdam-callout-number">02</span><div><h3>Integrate variable-speed control</h3><p>Evaluate VFD control against the operating profile and the response the process actually needs.</p></div></li><li><span className="rotterdam-callout-number">03</span><div><h3>Commission in stages around live production</h3><p>Use staged checks, readings, and handoff records to keep the intervention aligned with live production windows.</p></div></li></ol></div><SystemCurveDiagram /><div className="rotterdam-technical-followup"><Link className="text-link" href={`/products/${relatedProduct.slug}`}>View the AF-P900 platform <span aria-hidden="true">→</span></Link></div><p className="concept-note concept-note-inline"><strong>Visual note.</strong> The system path and curve are conceptual and not to scale; use approved project data for any real selection.</p></div></section>}
    {project.slug !== "rotterdam-processing-facility" && <section className="section"><div className="container"><div className="project-feature"><div className="project-feature-media case-study-image"><Image src={relatedProduct?.cardImage ?? relatedProduct?.image ?? project.image} alt={`${project.system} equipment`} fill sizes="(max-width: 680px) 480px, (max-width: 980px) 100vw, 55vw" /></div><div className="project-feature-content"><div className="eyebrow">System delivered</div><h2 className="display">{project.system}</h2><p>Performance outcomes are tracked against the operating goals established during design. This case study is an illustrative portfolio scenario, not a customer claim.</p><div className="detail-buttons"><Link className="button button-primary" href={`/products/${project.relatedProduct}`}>View related system</Link><Link className="button button-outline" href={`/request-quote?project=${project.slug}&product=${project.relatedProduct}`}>Discuss a similar brief</Link></div></div></div></div></section>}
  </>;
}
