"use client";

import { useMemo, useState } from "react";
import type { Resource } from "@/lib/data";

const categoryDescriptions: Record<string, string> = {
  "Product datasheets": "Platform-level specifications for early selection and application conversations.",
  "Engineering guides": "Short technical primers for framing the operating problem before detailed design.",
  "Installation & application references": "Practical reference material for installation planning, layout, and handoff.",
};

export function ResourcesExplorer({ resources, categories }: { resources: Resource[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const visible = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return resources.filter((resource) => {
      const searchable = [resource.title, resource.type, resource.description, resource.purpose, resource.category].join(" ").toLowerCase();
      return (!category || resource.category === category) && terms.every((term) => searchable.includes(term));
    });
  }, [category, query, resources]);

  return <>
    <div className="resource-filters" role="search">
      <div><label className="sr-only" htmlFor="resource-search">Search technical resources</label><input id="resource-search" className="filter-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guides, datasheets, applications" /></div>
      <div><label className="sr-only" htmlFor="resource-category">Filter resources by category</label><select id="resource-category" className="field" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All resource categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
      <div className="resource-result-count" aria-live="polite">Showing <strong>{visible.length}</strong> of {resources.length} references</div>
    </div>
    {visible.length === 0 ? <div className="empty-state" role="status"><strong>No resources match that search.</strong><p>Try a product family, application, or phrase such as “commissioning”.</p><button className="button button-outline" type="button" onClick={() => { setQuery(""); setCategory(""); }}>Clear search</button></div> : <div className="resource-catalog">{categories.filter((item) => !category || item === category).map((item) => { const categoryResources = visible.filter((resource) => resource.category === item); if (!categoryResources.length) return null; const id = item.toLowerCase().replace(/[^a-z]+/g, "-"); return <section className="resource-category" key={item} aria-labelledby={`resource-category-${id}`}><div className="section-heading resource-category-heading"><div><div className="eyebrow">Reference library</div><h2 className="display" id={`resource-category-${id}`}>{item}</h2></div><p>{categoryDescriptions[item]}</p></div><div className="resource-grid">{categoryResources.map((resource) => <article className="resource-card" key={resource.slug}><div className="resource-icon" aria-hidden="true">↘</div><div className="eyebrow">{resource.type}</div><h3>{resource.title}</h3><p>{resource.description}</p><div className="resource-purpose"><strong>Use it for</strong><span>{resource.purpose}</span></div><div className="resource-meta">{resource.meta}</div><div className="resource-actions"><a className="resource-action resource-action-preview" href={resource.href} target="_blank" rel="noopener noreferrer" aria-label={`Preview PDF: ${resource.title}`}>Preview PDF <span aria-hidden="true">↗</span></a><a className="resource-action resource-action-download" href={resource.href} download aria-label={`Download PDF: ${resource.title}`}>Download PDF <span aria-hidden="true">↓</span></a></div></article>)}</div></section>; })}</div>}
  </>;
}
