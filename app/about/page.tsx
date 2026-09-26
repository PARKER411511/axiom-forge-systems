import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Axiom",
  description: "Four decades of industrial systems engineering, manufacturing, quality assurance, and global lifecycle support.",
};

const capabilities = ["Process equipment fabrication", "Flow and thermal testing", "Controls integration", "Field commissioning"];
const leaders = [
  { name: "Eleanor Hayes", role: "Chief Executive Officer", focus: "Industrial strategy and global operations" },
  { name: "Marcus Chen", role: "Chief Engineering Officer", focus: "Systems engineering and product development" },
  { name: "Amara Okafor", role: "VP, Manufacturing & Quality", focus: "Manufacturing systems and quality assurance" },
];

export default function AboutPage() {
  return <>
    <section className="page-hero">
      <div className="container">
        <div className="eyebrow">About Axiom Forge Systems</div>
        <h1 className="display about-hero-title">Engineering industrial systems that keep the world&apos;s critical infrastructure moving.</h1>
        <p>A fictional industrial manufacturer concept built around forty years of application-led engineering and accountable production.</p>
      </div>
    </section>

    <section className="section section-light">
      <div className="container about-grid">
        <div>
          <div className="eyebrow">Company story</div>
          <h2 className="display">40 years of engineering discipline.</h2>
          <p>Founded in Houston in 1984, Axiom Forge Systems grew from a process equipment workshop into a global engineering partner for pumps, flow control, material handling, thermal systems, and custom engineered packages.</p>
          <p>Our work is shaped by the people who operate, maintain, and depend on the equipment. That perspective drives designs that are clear to service, resilient in the field, and accountable to measurable outcomes.</p>
          <Link className="button button-dark" href="/request-quote" style={{ marginTop: 24 }}>Work with Axiom</Link>
        </div>
        <div className="media-frame about-image"><Image src={images.factory} alt="Heavy equipment manufacturing and assembly floor" fill sizes="(max-width: 980px) 100vw, 50vw" /></div>
      </div>
    </section>

    <section id="quality" className="section">
      <div className="container about-grid">
        <div className="media-frame about-image"><Image src={images.engineer} alt="Engineer working with manufacturing equipment" fill sizes="(max-width: 980px) 100vw, 50vw" /></div>
        <div>
          <div className="eyebrow">Manufacturing & quality assurance</div>
          <h2 className="display">Built to hold a standard.</h2>
          <p>Design reviews, controlled fabrication, documented inspection, and performance testing connect the engineering brief to repeatable field results.</p>
          <div className="capability-list">{capabilities.map((capability, index) => <div key={capability}><span>{String(index + 1).padStart(2, "0")}</span><strong>{capability}</strong></div>)}</div>
        </div>
      </div>
    </section>

    <section className="section section-surface section-border">
      <div className="container about-grid">
        <div>
          <div className="eyebrow">Global presence</div>
          <h2 className="display">Engineered in Houston. Supported around the world.</h2>
        </div>
        <div>
          <p>Project teams, manufacturing partners, and field specialists coordinate across 32 countries. Regional support keeps commissioning and lifecycle service close to the operating site.</p>
          <div className="about-metrics"><div><strong>32</strong><span>Countries served</span></div><div><strong>2,400+</strong><span>Systems installed</span></div></div>
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div className="section-heading"><div><div className="eyebrow">Leadership</div><h2 className="display">Accountability starts at the top.</h2></div><p className="light-copy">Fictional leadership profiles for this portfolio concept.</p></div>
        <div className="leadership-grid">{leaders.map((leader) => <article className="leader" key={leader.name}><h3>{leader.name}</h3><strong>{leader.role}</strong><p>{leader.focus}</p></article>)}</div>
      </div>
    </section>

    <div className="cert-strip"><div className="container certs">{["ISO 9001", "ISO 14001", "CE", "API", "ATEX"].map((certification) => <div className="cert" key={certification}>{certification}<small>PORTFOLIO CONCEPT</small></div>)}</div></div>
  </>;
}
