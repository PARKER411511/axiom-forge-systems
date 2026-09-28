import type { Metadata } from "next";

export const siteUrl = "https://axiom-forge-systems.vercel.app";
export const siteName = "Axiom Forge Systems";
export const defaultOgImage = "/images/hero-precision.webp";

export function pageMetadata({ title, description, path, image = defaultOgImage, imageWidth, imageHeight }: { title: string; description: string; path: string; image?: string; imageWidth?: number; imageHeight?: number }): Metadata {
  const url = `${siteUrl}${path}`;
  const imageUrl = new URL(image, siteUrl).toString();
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${siteName}`, description, url, siteName, type: "website", images: [{ url: imageUrl, ...(imageWidth && imageHeight ? { width: imageWidth, height: imageHeight } : {}), alt: `${title} — ${siteName}` }] },
    twitter: { card: "summary_large_image", title: `${title} — ${siteName}`, description, images: [{ url: imageUrl, alt: `${title} — ${siteName}` }] },
  };
}
