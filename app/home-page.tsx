import Image from "next/image";
import Link from "next/link";
import { images, industries, products, projects } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

const stats = [["08", "Product platforms"], ["07", "Operating sectors"], ["06", "Illustrative scenarios"], ["13", "Technical references"]];
const process = [
  ["Application analysis", "Define duty, constraints, access, and the actual operating envelope."],
  ["System engineering", "Model equipment, materials, controls, and serviceability together."],
  ["Build & verify", "Connect controlled fabrication with documented inspection and test plans."],
  ["Commission & support", "Carry the engineering narrative through startup and lifecycle service."],
] as const;
const featuredProducts = [products[0], products[2], products[4], products[6]];
const principles = [
  ["01", "Context before catalogue", "The duty cycle and the people around the equipment set the brief."],
  ["02", "Decisions you can trace", "System choices stay connected to the constraints that shaped them."],
  ["03", "Service in the design", "Access, inspection, and handoff are considered before release."],
  ["04", "A useful next step", "Every page leaves a clear route from an idea to an engineering conversation."],
] as const;

export default function HomePage() {
  const project = projects[0];

  return <>
    <section className="hero hero--precision">
      <div className="hero-media"><Image src={images.hero} alt="Precision process equipment in an industrial setting" fill priority sizes="100vw" /></div>
      <div className="hero-content">
        <div className="eyebrow">Axiom Forge Systems / industrial engineering</div>
        <h1 className="display">Systems that hold their line.</h1>
        <p className="hero-intro">Application-led equipment for process, flow, handling, and thermal environments where the operating reality is the specification.</p>
        <div className="hero-buttons"><Link className="button button-primary" href="/products">Explore systems <span aria-hidden="true">↗</span></Link><Link className="button button-outline" href="/request-quote">Prepare a brief</Link></div>
        <div className="hero-specs" aria-label="Axiom Forge Systems focus areas"><div><span>01</span><strong>Specify</strong><small>around the duty</small></div><div><span>02</span><strong>Integrate</strong><small>across the system</small></div><div><span>03</span><strong>Support</strong><small>through the lifecycle</small></div></div>
      </div>
      <div className="hero-caption"><span>AXIOM / 001</span><span>PRECISION EQUIPMENT · APPLICATION-LED DESIGN</span></div>
    </section>

    <section className="stats-strip"><div className="container stats-grid">{stats.map(([number, label]) => <div className="stat-item" key={label}><span className="stat-number">{number}</span><span className="stat-label">{label}</span></div>)}</div></section>

    <section className="section section-surface product-rail-section"><div className="container"><SectionHeading eyebrow="Featured product systems" title="Four places to start the specification." description="Compact, configurable platforms for the questions that usually arrive first: move it, control it, handle it, or heat it." /><div className="product-grid product-rail">{featuredProducts.map((product) => <ProductCard product={product} compact key={product.slug} />)}</div><div className="section-followup"><span className="muted">All figures are illustrative configuration references.</span><Link className="text-link" href="/products">Open the product index <span aria-hidden="true">→</span></Link></div></div></section>

    <section className="section section-surface case-study-section"><div className="container"><SectionHeading eyebrow="Featured project / illustrative" title="Rotterdam: restoring hydraulic balance." description="A scenario built around a live-process constraint, with the reasoning shown instead of a generic success story." /><div className="project-feature"><div className="project-feature-media"><Image src={project.image} alt="Illustrative Rotterdam processing facility" fill sizes="(max-width: 980px) 100vw, 55vw" /></div><div className="project-feature-content"><div className="eyebrow">Rotterdam, Netherlands · chemical processing</div><h2 className="display">28% lower energy consumption.</h2><p>{project.summary}</p><div className="project-facts"><div className="project-fact"><strong>01</strong><span>Challenge / hydraulic imbalance</span></div><div className="project-fact"><strong>02</strong><span>Decision / tuned pump train + VFD</span></div><div className="project-fact"><strong>03</strong><span>Outcome / illustrative energy change</span></div></div><Link className="text-link" href={`/projects/${project.slug}`}>Read the case study <span aria-hidden="true">→</span></Link></div></div><p className="concept-note concept-note-inline"><strong>Portfolio disclosure.</strong> This is an illustrative scenario. The figures are not verified customer, test, or business outcomes.</p></div></section>

    <section className="section section-light"><div className="container intro-grid"><div className="intro-copy"><div className="eyebrow">The brief</div><h2 className="display">Built around the environments where assumptions get expensive.</h2><p>Axiom Forge Systems is a fictional industrial engineering studio concept. The catalogue is a starting point; the useful work begins with duty, materials, access, utilities, and the people who keep a site moving.</p><div className="intro-meta"><div><strong>04</strong><span>Core system families</span></div><div><strong>01</strong><span>Clear engineering path</span></div></div><Link className="text-link" href="/about" style={{ marginTop: 32 }}>Read the approach <span aria-hidden="true">→</span></Link></div><div className="media-frame intro-media"><Image src={images.factory} alt="Industrial assembly floor and process equipment" fill sizes="(max-width: 980px) 100vw, 50vw" /><div className="media-caption">Operating context / Houston concept studio</div></div></div></section>

    <section id="engineering" className="section section-border engineering-section"><div className="container process-layout"><div className="process-intro"><div className="eyebrow">Engineering delivery</div><h2 className="display">One line from first question to first run.</h2><p>Equipment only earns its place when the surrounding system, operating team, and service plan are understood. Our delivery model keeps those decisions visible.</p><Link className="text-link" href="/about#quality" style={{ marginTop: 30 }}>See how we work <span aria-hidden="true">→</span></Link></div><div className="timeline">{process.map(([item, description], index) => <div className="timeline-step" key={item}><span className="timeline-step-number">0{index + 1}</span><div><h3>{item}</h3><p>{description}</p></div><span className="timeline-arrow" aria-hidden="true">↗</span></div>)}</div></div></section>

    <section className="section industries-section"><div className="container"><SectionHeading eyebrow="Operating sectors" title="Specified for the world as it is." description="The context changes from site to site. The engineering standard stays clear." /><div className="image-grid">{industries.slice(0, 3).map((industry, index) => <Link className="image-card" href={`/industries#${industry.slug}`} key={industry.slug}><Image src={industry.image} alt={`${industry.name} industrial environment`} fill sizes="(max-width: 680px) 100vw, 33vw" /><div className="image-card-content"><div className="eyebrow">0{index + 1}</div><h3>{industry.name}</h3><p>{industry.description}</p></div></Link>)}</div><Link className="text-link" href="/industries" style={{ marginTop: 40 }}>Explore all sectors <span aria-hidden="true">→</span></Link></div></section>

    <section className="section section-surface section-border"><div className="container"><SectionHeading eyebrow="Working principles" title="Make the next decision clearer." /><div className="principles">{principles.map(([number, title, description]) => <div className="principle" key={number}><div className="principle-index">{number}</div><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>

    <section className="section cta-band"><div className="container cta-band-inner"><div><div className="eyebrow">Start with the operating reality</div><h2 className="display">Bring the hard part.</h2><p>Share the application, conditions, timing, and constraints. The next step is a structured brief, not a sales pitch.</p></div><div className="hero-buttons"><Link className="button button-primary" href="/request-quote">Prepare a project brief <span aria-hidden="true">→</span></Link><Link className="button button-outline" href="/contact">Contact the studio</Link></div></div></section>
  </>;
}
