import Image from "next/image";
import Link from "next/link";
import { engineeringPhases, images, industries, products, projects } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

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
      <div className="hero-media"><Image src={images.hero} alt="Precision process equipment in an industrial setting" fill priority sizes="(max-width: 680px) 1600px, 100vw" /></div>
      <div className="hero-content">
        <div className="eyebrow">Axiom Forge Systems / industrial engineering</div>
        <h1 className="display">Systems that hold their line.</h1>
        <p className="hero-intro">Application-led equipment for process, flow, handling, and thermal environments where the operating reality is the specification.</p>
        <div className="hero-buttons"><Link className="button button-primary" href="/products">Explore systems <span aria-hidden="true">↗</span></Link><Link className="button button-outline" href="/request-quote">Prepare a brief</Link></div>
        <div className="hero-specs" aria-label="Axiom Forge Systems focus areas"><div><span>01</span><strong>Specify</strong><small>around the duty</small></div><div><span>02</span><strong>Integrate</strong><small>across the system</small></div><div><span>03</span><strong>Support</strong><small>through the lifecycle</small></div></div>
      </div>
      <div className="hero-caption"><span>AXIOM / 001</span><span>PRECISION EQUIPMENT · APPLICATION-LED DESIGN</span></div>
    </section>

    <section className="section section-surface product-rail-section"><div className="container"><SectionHeading eyebrow="Featured product systems" title="Four places to start the specification." description="Compact, configurable platforms for the questions that usually arrive first: move it, control it, handle it, or heat it." /><div className="product-grid product-rail">{featuredProducts.map((product) => <ProductCard product={product} compact key={product.slug} />)}</div><div className="section-followup"><span className="muted">All figures are illustrative configuration references.</span><Link className="text-link" href="/products">Open the product index <span aria-hidden="true">→</span></Link></div></div></section>

    <section className="section section-surface case-study-section"><div className="container"><SectionHeading eyebrow="Featured project / illustrative scenario" title="Rotterdam: a system curve, made visible." description="A live-process constraint shaped the system curve, pump-train choice, and commissioning window." /><div className="project-feature project-feature--rotterdam"><div className="project-feature-media"><Image src={project.image} alt="Illustrative Rotterdam processing facility" fill sizes="(max-width: 680px) 640px, (max-width: 980px) 100vw, min(1240px, calc(100vw - 48px))" /><span className="project-feature-label">ILLUSTRATIVE SCENARIO / ROTTERDAM</span><div className="project-feature-outcome"><span>Illustrative outcome</span><strong>28%</strong><small>Lower energy consumption</small><em>Concept only · not verified</em></div></div><div className="project-feature-content"><div className="eyebrow">Rotterdam, Netherlands · chemical processing</div><h2 className="display">A clearer route through hydraulic imbalance.</h2><p>{project.summary}</p><ol className="project-facts" aria-label="Illustrative project logic"><li className="project-fact"><strong>01</strong><span><b>Challenge</b> / hydraulic imbalance</span></li><li className="project-fact"><strong>02</strong><span><b>Decision</b> / tuned pump train + VFD</span></li><li className="project-fact"><strong>03</strong><span><b>Outcome</b> / illustrative energy reduction</span></li></ol><Link className="text-link" href={`/projects/${project.slug}`}>Read the scenario <span aria-hidden="true">→</span></Link></div></div><p className="concept-note concept-note-inline"><strong>Portfolio disclosure.</strong> This is an illustrative scenario, not a verified customer, test, or business outcome. The 28% figure is a concept reference only.</p></div></section>

    <section className="section section-light"><div className="container intro-grid"><div className="intro-copy"><div className="eyebrow">The brief</div><h2 className="display">Built around the environments where assumptions get expensive.</h2><p>Axiom Forge Systems is a fictional industrial engineering studio concept. The catalogue is a starting point; the useful work begins with duty, materials, access, utilities, and the people who keep a site moving.</p><div className="intro-dimensions" aria-label="Application review dimensions"><span><b>01</b>Duty</span><span><b>02</b>Materials</span><span><b>03</b>Access</span><span><b>04</b>Service</span></div><Link className="text-link" href="/about" style={{ marginTop: 32 }}>Read the approach <span aria-hidden="true">→</span></Link></div><div className="media-frame intro-media"><Image src={images.factory} alt="Industrial assembly floor and process equipment" fill sizes="(max-width: 680px) 900px, (max-width: 980px) 100vw, 1104px" /><div className="media-caption">Operating context / Houston concept studio</div></div></div></section>

    <section id="engineering" className="section section-border engineering-section"><div className="container engineering-sequence"><div className="engineering-sequence-header"><div><div className="eyebrow">Engineering delivery / six phases</div><h2 className="display">A technical sequence from first question to first run.</h2></div><div className="engineering-sequence-intro"><p>Equipment earns its place when the surrounding system, operating team, and service plan are understood. This ordered path keeps decisions visible from brief to lifecycle support.</p><Link className="text-link" href="/about#quality">See how we work <span aria-hidden="true">→</span></Link></div></div><ol className="engineering-sequence-list">{engineeringPhases.map(([item, description], index) => <li className="engineering-sequence-row" key={item}><span className="engineering-sequence-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><p>{description}</p></li>)}</ol></div></section>

    <section className="section industries-section"><div className="container"><SectionHeading eyebrow="Operating sectors" title="Specified for the world as it is." description="The context changes from site to site. The engineering standard stays clear." /><div className="image-grid">{industries.slice(0, 3).map((industry, index) => <Link className="image-card" href={`/industries#${industry.slug}`} key={industry.slug}><Image src={industry.image} alt={`${industry.name} industrial environment`} fill sizes="(max-width: 680px) 500px, 700px" /><div className="image-card-content"><div className="eyebrow">0{index + 1}</div><h3>{industry.name}</h3><p>{industry.description}</p></div></Link>)}</div><Link className="text-link" href="/industries" style={{ marginTop: 40 }}>Explore all sectors <span aria-hidden="true">→</span></Link></div></section>

    <section className="section section-surface section-border"><div className="container"><SectionHeading eyebrow="Working principles" title="Make the next decision clearer." /><div className="principles">{principles.map(([number, title, description]) => <div className="principle" key={number}><div className="principle-index">{number}</div><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>

    <section className="section cta-band"><div className="container cta-band-inner"><div><div className="eyebrow">Start with the operating reality</div><h2 className="display">Bring the hard part.</h2><p>Share the application, conditions, timing, and constraints. The next step is a structured brief, not a sales pitch.</p></div><div className="hero-buttons"><Link className="button button-primary" href="/request-quote">Prepare a project brief <span aria-hidden="true">→</span></Link><Link className="button button-outline" href="/contact">Contact the studio</Link></div></div></section>
  </>;
}
