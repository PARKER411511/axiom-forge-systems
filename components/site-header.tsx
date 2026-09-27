"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a, button, [tabindex]:not([tabindex='-1'])"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const closeOnNavigation = window.setTimeout(() => {
      setOpen((wasOpen) => {
        if (wasOpen) toggleRef.current?.focus();
        return false;
      });
    }, 0);
    return () => window.clearTimeout(closeOnNavigation);
  }, [pathname]);

  const isActive = (href: string) => href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);
  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return <header className={`site-header ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}>
    <div className="container nav-wrap">
      <Link href="/" className="brand" aria-label="Axiom Forge Systems home" onClick={() => setOpen(false)}>
        <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27 14.3 5h3.4L27 27h-5.3l-2-5.1h-7.9L9.8 27H5Zm8.2-9.4h5l-2.5-6.6-2.5 6.6Z" fill="currentColor"/><path d="M17.1 5h4.3l5.4 6.4-2.4 3.2L17.1 5Z" fill="var(--orange)"/></svg>
        <span className="brand-wordmark"><span>AXIOM</span><span>FORGE SYSTEMS</span></span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => <Link href={item.href} key={item.href} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
      </nav>
      <div className="nav-actions">
        <Link className="nav-contact" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Contact</Link>
        <Link className="button button-primary" href="/request-quote">Request a Quote</Link>
        <button ref={toggleRef} className="mobile-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>{open ? "×" : "☰"}</button>
      </div>
    </div>
    {open && <nav ref={panelRef} id="mobile-navigation" className="mobile-panel" aria-label="Mobile navigation">
      {navItems.map((item) => <Link href={item.href} key={item.href} aria-current={isActive(item.href) ? "page" : undefined} onClick={closeMenu}>{item.label}</Link>)}
      <Link className="button button-outline" href="/contact" onClick={closeMenu}>Contact</Link>
      <Link className="button button-primary" href="/request-quote" onClick={closeMenu}>Request a Quote</Link>
    </nav>}
  </header>;
}
