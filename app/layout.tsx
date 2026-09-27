import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defaultOgImage, siteName, siteUrl } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Axiom Forge Systems | Industrial Engineering & Equipment", template: "%s | Axiom Forge Systems" },
  description: "A fictional industrial systems concept exploring pumps, flow control, material handling, and engineering-led service.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Axiom Forge Systems | Industrial Engineering & Equipment",
    description: "A fictional industrial systems concept engineered around demanding environments and continuous operation.",
    url: siteUrl,
    siteName,
    type: "website",
    images: [{ url: new URL(defaultOgImage, siteUrl).toString(), width: 1200, height: 800, alt: "Industrial process equipment" }],
  },
  twitter: { card: "summary_large_image", title: "Axiom Forge Systems — Industrial concept", description: "A fictional industrial systems concept engineered around demanding environments and continuous operation.", images: [{ url: new URL(defaultOgImage, siteUrl).toString(), alt: "Axiom Forge Systems industrial concept" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content" className="site-shell">{children}</main><SiteFooter /></body></html>; }
