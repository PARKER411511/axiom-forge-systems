"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function readFilters(searchParams: URLSearchParams | ReadonlyURLSearchParams, initialIndustry?: string) {
  const industrySlug = searchParams.get("industry");
  return {
    query: searchParams.get("q") || "",
    industry: industrySlug || initialIndustry || "",
    application: searchParams.get("application") || searchParams.get("app") || "",
    family: searchParams.get("family") || "",
  };
}

type ReadonlyURLSearchParams = { get(name: string): string | null };
type FilterState = { query: string; industry: string; application: string; family: string };

export function ProductsExplorer({ products, initialIndustry }: { products: Product[]; initialIndustry?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const industries = useMemo(() => Array.from(new Set(products.flatMap((product) => product.industries))).sort(), [products]);
  const applications = useMemo(() => Array.from(new Set(products.flatMap((product) => product.applications))).sort(), [products]);
  const families = useMemo(() => Array.from(new Set(products.map((product) => product.category))).sort(), [products]);
  const filters = useMemo(() => {
    const fromUrl = readFilters(searchParams, initialIndustry);
    return { ...fromUrl, industry: industries.find((item) => slugify(item) === fromUrl.industry) || fromUrl.industry };
  }, [initialIndustry, industries, searchParams]);

  const visible = useMemo(() => {
    const terms = filters.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return products.filter((product) => {
      const searchable = [product.name, product.slug, product.category, product.shortDescription, product.overview, ...product.industries, ...product.applications, ...product.specs.flatMap((spec) => [spec.label, spec.value])].join(" ").toLowerCase();
      const matchesQuery = terms.every((term) => searchable.includes(term));
      return matchesQuery && (!filters.industry || product.industries.includes(filters.industry)) && (!filters.application || product.applications.includes(filters.application)) && (!filters.family || product.category === filters.family);
    });
  }, [filters, products]);

  function makeQuery(next: FilterState) {
    const params = new URLSearchParams();
    if (next.query.trim()) params.set("q", next.query.trim());
    if (next.industry) params.set("industry", slugify(next.industry));
    if (next.application) params.set("application", next.application);
    if (next.family) params.set("family", next.family);
    return params.toString() ? `${pathname}?${params.toString()}` : pathname;
  }

  function updateFilter(key: keyof FilterState, value: string, mode: "push" | "replace" = "push") {
    const next = { ...filters, [key]: value };
    router[mode](makeQuery(next), { scroll: false });
  }

  function reset() {
    router.replace(pathname, { scroll: false });
  }

  const hasFilters = Object.values(filters).some(Boolean);
  return <>
    <div className="filter-bar" role="search">
      <label className="sr-only" htmlFor="product-search">Search products</label>
      <input id="product-search" className="filter-input" value={filters.query} onChange={(event) => updateFilter("query", event.target.value, "replace")} placeholder="Search model, family, application, or specification" autoComplete="off" />
      <label className="sr-only" htmlFor="product-family">Filter by product family</label>
      <select id="product-family" className="field" value={filters.family} onChange={(event) => updateFilter("family", event.target.value)}><option value="">All product families</option>{families.map((family) => <option key={family} value={family}>{family}</option>)}</select>
      <label className="sr-only" htmlFor="product-industry">Filter by industry</label>
      <select id="product-industry" className="field" value={filters.industry} onChange={(event) => updateFilter("industry", event.target.value)}><option value="">All industries</option>{industries.map((industry) => <option key={industry} value={industry}>{industry}</option>)}</select>
      <label className="sr-only" htmlFor="product-application">Filter by application</label>
      <select id="product-application" className="field" value={filters.application} onChange={(event) => updateFilter("application", event.target.value)}><option value="">All applications</option>{applications.map((application) => <option key={application} value={application}>{application}</option>)}</select>
    </div>
    <div className="filter-toolbar"><div className="filter-count" aria-live="polite">Showing <strong>{visible.length}</strong> of {products.length} engineered systems</div>{hasFilters && <button className="filter-reset" type="button" onClick={reset}>Reset filters</button>}</div>
    {visible.length ? <div className="product-grid">{visible.map((product, index) => <ProductCard product={product} featured={index === 0 && visible.length > 2} key={product.slug} />)}</div> : <div className="empty-state" role="status"><strong>No systems match those filters.</strong><p>Try an application, product family, model name, or specification such as “40 bar”.</p><button className="button button-outline" type="button" onClick={reset}>Clear filters</button></div>}
  </>;
}
