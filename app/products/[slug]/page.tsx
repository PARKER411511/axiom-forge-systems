import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { pageMetadata } from "@/lib/site-metadata";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product ? pageMetadata({ title: product.name, description: product.shortDescription, path: `/products/${product.slug}`, image: product.image }) : { title: "Product not found" };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 2);
  return <>
    <section className="detail-hero"><div className="container detail-layout"><div className="detail-media"><Image src={product.image} alt={`${product.name} industrial equipment`} fill priority sizes="(max-width: 680px) 100vw, (max-width: 980px) 92vw, 55vw" /></div><div className="detail-content"><div className="eyebrow">{product.category} · AXIOM PLATFORM</div><h1 className="display">{product.name}</h1><p>{product.overview}</p><div className="detail-buttons"><Link className="button button-primary" href={`/request-quote?product=${product.slug}`}>Request a Quote</Link><a className="button button-outline" href={`/${product.slug}.pdf`} download>Download Datasheet <span aria-hidden="true">↓</span></a></div><div className="detail-meta"><div><span>{product.specs[0].label}</span><strong>{product.specs[0].value}</strong></div><div><span>{product.specs[1].label}</span><strong>{product.specs[1].value}</strong></div></div></div></div></section>
    <section className="detail-section section-light"><div className="container specs-layout"><div className="specs-intro"><div className="eyebrow">Technical specifications</div><h2 className="display">Specified for the actual operating envelope.</h2><p className="light-copy">Configuration is confirmed against the application, access constraints, materials, utilities, and maintenance plan before release for manufacture.</p></div><dl className="spec-table">{product.specs.map((spec) => <div className="spec-row" key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl></div></section>
    <section className="detail-section"><div className="container"><div className="eyebrow">Applications</div><h2 className="display">Ready for the hard part.</h2><p>Every configuration is reviewed against the process, environment, maintenance strategy, and compliance requirements it will face in the field.</p><div className="application-list">{product.applications.map((application) => <span key={application}>{application}</span>)}</div></div></section>
    <section id="downloads" className="detail-section section-surface"><div className="container"><div className="eyebrow">Downloads</div><h2 className="display">Technical resources.</h2><a className="download-row" href={`/${product.slug}.pdf`} download><div><strong>{product.name} — Product Datasheet</strong><small> · PDF · 2 pages</small></div><span className="text-link">Download <span aria-hidden="true">↓</span></span></a><a className="download-row" href="/installation-commissioning-guide.pdf" download><div><strong>Installation and commissioning guide</strong><small> · PDF · 2 pages</small></div><span className="text-link">Download <span aria-hidden="true">↓</span></span></a><p className="form-note">Reference documents are prepared for early-stage engineering conversations. Confirm final specifications against the project duty.</p></div></section>
    {related.length > 0 && <section className="section"><div className="container"><div className="section-heading"><div><div className="eyebrow">Related systems</div><h2 className="display">Continue the specification.</h2></div></div><div className="product-grid">{related.map((item) => <div key={item.slug} className="product-feature"><article className="product-card"><Link href={`/products/${item.slug}`} className="product-card-media"><Image src={item.image} alt={item.name} fill sizes="(max-width: 680px) 100vw, 50vw" /></Link><div className="product-card-body"><div className="product-card-category">{item.category}</div><h3>{item.name}</h3><p>{item.shortDescription}</p><Link className="text-link" href={`/products/${item.slug}`}>View details <span aria-hidden="true">→</span></Link></div></article></div>)}</div></div></section>}
  </>;
}
