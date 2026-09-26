import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL("https://axiom-forge-systems.example"), title: { default: "Axiom Forge Systems | Industrial Engineering & Equipment", template: "%s | Axiom Forge Systems" }, description: "Industrial pumps, flow control, material handling and custom engineered systems for demanding global industries.", openGraph: { title: "Axiom Forge Systems | Industrial Engineering & Equipment", description: "Industrial systems engineered for demanding environments and continuous operation.", type: "website" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteHeader /><main className="site-shell">{children}</main><SiteFooter /></body></html>; }
