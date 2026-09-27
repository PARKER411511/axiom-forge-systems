import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><div className="container"><div className="eyebrow">Axiom / 404</div><h1 className="display">This system is out of range.</h1><p>The page you requested is not part of this concept site. Return to the catalogue or prepare a project brief.</p><div className="hero-buttons"><Link className="button button-primary" href="/products">Explore systems <span aria-hidden="true">→</span></Link><Link className="button button-outline" href="/">Back to home</Link></div></div></section>;
}
