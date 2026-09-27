import Link from "next/link";

const columns = [
  { title: "Products", links: [["Industrial Pumps", "/products?family=Industrial%20Pumps"], ["Flow Control", "/products?family=Flow%20Control"], ["Conveyor Systems", "/products?family=Conveyor%20Systems"], ["Thermal Systems", "/products?family=Thermal%20Systems"]] },
  { title: "Industries", links: [["Energy", "/industries#energy"], ["Manufacturing", "/industries#manufacturing"], ["Mining", "/industries#mining"], ["Water Treatment", "/industries#water-treatment"]] },
  { title: "Company", links: [["About Axiom", "/about"], ["Projects", "/projects"], ["Contact", "/contact"], ["Request a Quote", "/request-quote"]] },
  { title: "Resources", links: [["Technical resources", "/resources"], ["Engineering", "/#engineering"], ["Service support", "/contact#service"], ["Quality framework", "/about#quality"]] },
] as const;

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-top">
      <div className="footer-brand">
        <Link href="/" className="brand">
          <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27 14.3 5h3.4L27 27h-5.3l-2-5.1h-7.9L9.8 27H5Zm8.2-9.4h5l-2.5-6.6-2.5 6.6Z" fill="currentColor"/><path d="M17.1 5h4.3l5.4 6.4-2.4 3.2L17.1 5Z" fill="var(--orange)"/></svg>
          <span className="brand-wordmark"><span>AXIOM</span><span>FORGE SYSTEMS</span></span>
        </Link>
        <p>Engineering-led industrial systems for a fictional portfolio concept. Every page is designed to make the next specification conversation clearer.</p>
      </div>
      <div className="footer-columns">
        {columns.map((column) => <div className="footer-column" key={column.title}><h3>{column.title}</h3>{column.links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</div>)}
      </div>
    </div>
    <div className="container footer-bottom"><span>Houston, TX · Concept studio for portfolio demonstration</span><span>© 2026 Axiom Forge Systems · <em>Fictional manufacturer concept; no backend or certification claims.</em></span></div>
  </footer>;
}
