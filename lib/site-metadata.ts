import type { Metadata } from "next";

export const siteUrl = "https://axiom-forge-systems.vercel.app";
export const siteName = "Axiom Forge Systems";
export const defaultOgImage = "/images/hero.webp";

export function pageMetadata({ title, description, path, image = defaultOgImage }: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = `${siteUrl}${path}`;
  const imageUrl = new URL(image, siteUrl).toString();
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${siteName}`, description, url, siteName, type: "website", images: [{ url: imageUrl, width: 1200, height: 800, alt: title }] },
    twitter: { card: "summary_large_image", title: `${title} | ${siteName}`, description, images: [imageUrl] },
  };
}
