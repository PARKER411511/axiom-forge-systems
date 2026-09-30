"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Select } from "@/components/select";

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
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
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
  const comparedProducts = products.filter((product) => compareSlugs.includes(product.slug));
  const comparedFamilies = new Set(comparedProducts.map((product) => product.category));
  const sharedSpecs = comparedProducts.length ? comparedProducts[0].specs.filter((spec) => comparedProducts.every((product) => product.specs.some((candidate) => candidate.label === spec.label))) : [];
  const comparisonNote = comparedFamilies.size === 1 ? "Shared fields are shown for this product family." : sharedSpecs.length ? "Different families selected. Only shared fields are shown; open a detail page for family-specific specifications." : "Different families use different specification vocabularies. The primary reference for each system is shown; open a detail page for the full specification.";
  function toggleCompare(slug: string) {
    setCompareSlugs((current) => current.includes(slug) ? current.filter((item) => item !== slug) : current.length < 3 ? [...current, slug] : current);
  }
  function clearCompare() { setCompareSlugs([]); }
  return <>
    <div className="filter-bar" role="search">
      <label className="sr-only" htmlFor="product-search">Search products</label>
      <input id="product-search" className="filter-input" value={filters.query} onChange={(event) => updateFilter("query", event.target.value, "replace")} placeholder="Search products or specs" autoComplete="off" />
      <label className="sr-only" htmlFor="product-family">Filter by product family</label>
      <Select id="product-family" value={filters.family} onValueChange={(value) => updateFilter("family", value)} options={[{ value: "", label: "All product families" }, ...families.map((family) => ({ value: family, label: family }))]} placeholder="All product families" />
      <label className="sr-only" htmlFor="product-industry">Filter by industry</label>
      <Select id="product-industry" value={filters.industry} onValueChange={(value) => updateFilter("industry", value)} options={[{ value: "", label: "All industries" }, ...industries.map((industry) => ({ value: industry, label: industry }))]} placeholder="All industries" />
      <label className="sr-only" htmlFor="product-application">Filter by application</label>
      <Select id="product-application" value={filters.application} onValueChange={(value) => updateFilter("application", value)} options={[{ value: "", label: "All applications" }, ...applications.map((application) => ({ value: application, label: application }))]} placeholder="All applications" />
    </div>
    <div className="filter-toolbar"><div className="filter-count" aria-live="polite">Showing <strong>{visible.length}</strong> of {products.length} engineered systems</div>{hasFilters && <button className="filter-reset" type="button" onClick={reset}>Reset filters</button>}</div>
    {visible.length ? <div className="product-grid">{visible.map((product, index) => <ProductCard product={product} featured={index === 0 && visible.length > 2} compared={compareSlugs.includes(product.slug)} compareDisabled={compareSlugs.length >= 3 && !compareSlugs.includes(product.slug)} onCompare={() => toggleCompare(product.slug)} key={product.slug} />)}</div> : <div className="empty-state" role="status"><strong>No systems match those filters.</strong><p>Try an application, product family, model name, or specification such as “40 bar”.</p><button className="button button-outline" type="button" onClick={reset}>Clear filters</button></div>}
    {comparedProducts.length > 1 && <section className="product-compare" aria-labelledby="compare-heading"><div className="product-compare-header"><div><h2 id="compare-heading">Compare selected systems</h2><p className="compare-note">{comparisonNote}</p></div><button className="product-compare-close" type="button" onClick={clearCompare}>Clear comparison</button></div><div className="product-compare-scroll-hint" aria-hidden="true"><span>Swipe to compare</span><span>→</span></div><div className="product-compare-table-wrap" tabIndex={0} role="region" aria-label="Selected system comparison table"><table className="product-compare-table"><thead><tr><th scope="col">Specification</th>{comparedProducts.map((product) => <th scope="col" key={product.slug}><Link href={`/products/${product.slug}`}>{product.name}</Link></th>)}</tr></thead><tbody><tr><td>System family</td>{comparedProducts.map((product) => <td key={product.slug}>{product.category}</td>)}</tr>{sharedSpecs.length ? sharedSpecs.map((spec) => <tr key={spec.label}><td>{spec.label}</td>{comparedProducts.map((product) => <td key={`${product.slug}-${spec.label}`}>{product.specs.find((candidate) => candidate.label === spec.label)?.value}</td>)}</tr>) : <tr><td>Primary reference</td>{comparedProducts.map((product) => <td key={product.slug}>{product.specLabel}: {product.specValue}</td>)}</tr>}</tbody></table></div></section>}
  </>;
}
