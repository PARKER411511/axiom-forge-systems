"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/data";
export function SiteHeader() {
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>12);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);
  return <header className={`site-header ${scrolled?"scrolled":""}`}><div className="container nav-wrap"><Link href="/" className="brand" aria-label="Axiom Forge Systems home" onClick={()=>setOpen(false)}><span className="brand-mark" aria-hidden="true"/><span className="brand-wordmark"><span>AXIOM</span><span>FORGE SYSTEMS</span></span></Link><nav className="nav-links" aria-label="Primary navigation">{navItems.map(item=><Link href={item.href} key={item.href}>{item.label}</Link>)}</nav><div className="nav-actions"><Link className="nav-contact" href="/contact">Contact</Link><Link className="button button-primary" href="/request-quote">Request a Quote</Link><button className="mobile-toggle" type="button" aria-expanded={open} aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}>{open?"×":"☰"}</button></div></div>{open&&<nav className="mobile-panel" aria-label="Mobile navigation">{navItems.map(item=><Link href={item.href} key={item.href} onClick={()=>setOpen(false)}>{item.label}</Link>)}<Link className="button button-primary" href="/contact" onClick={()=>setOpen(false)}>Contact</Link><Link className="button button-outline" href="/request-quote" onClick={()=>setOpen(false)}>Request a Quote</Link></nav>}</header>;
}
