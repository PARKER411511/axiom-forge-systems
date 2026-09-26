import type { MetadataRoute } from "next";
import { products, projects } from "@/lib/data";
import { siteUrl } from "@/lib/site-metadata";

const routes = ["", "/products", "/industries", "/projects", "/resources", "/about", "/contact", "/request-quote", ...products.map((product) => `/products/${product.slug}`), ...projects.map((project) => `/projects/${project.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route.includes("/") && route.split("/").length === 3 ? 0.6 : 0.7,
  }));
}
