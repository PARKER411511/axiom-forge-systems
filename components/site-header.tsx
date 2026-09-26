"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";
export function SiteHeader() {
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
  const pathname = usePathname();
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>12);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);
  const isActive = (href:string) => href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);
  return <header className={`site-header ${scrolled?"scrolled":""} ${open?"menu-open":""}`}><div className="container nav-wrap"><Link href="/" className="brand" aria-label="Axiom Forge Systems home" onClick={()=>setOpen(false)}><svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27 14.3 5h3.4L27 27h-5.3l-2-5.1h-7.9L9.8 27H5Zm8.2-9.4h5l-2.5-6.6-2.5 6.6Z" fill="currentColor"/><path d="M17.1 5h4.3l5.4 6.4-2.4 3.2L17.1 5Z" fill="var(--orange)"/></svg><span className="brand-wordmark"><span>AXIOM</span><span>FORGE SYSTEMS</span></span></Link><nav className="nav-links" aria-label="Primary navigation">{navItems.map(item=><Link href={item.href} key={item.href} aria-current={isActive(item.href)?"page":undefined}>{item.label}</Link>)}</nav><div className="nav-actions"><Link className="nav-contact" href="/contact" aria-current={pathname === "/contact"?"page":undefined}>Contact</Link><Link className="button button-primary" href="/request-quote">Request a Quote</Link><button className="mobile-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}>{open?"×":"☰"}</button></div></div>{open&&<nav id="mobile-navigation" className="mobile-panel" aria-label="Mobile navigation">{navItems.map(item=><Link href={item.href} key={item.href} aria-current={isActive(item.href)?"page":undefined} onClick={()=>setOpen(false)}>{item.label}</Link>)}<Link className="button button-outline" href="/contact" onClick={()=>setOpen(false)}>Contact</Link><Link className="button button-primary" href="/request-quote" onClick={()=>setOpen(false)}>Request a Quote</Link></nav>}</header>;
}
