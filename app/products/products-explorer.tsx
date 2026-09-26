"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
export function ProductsExplorer({products,initialIndustry}:{products:Product[];initialIndustry?:string}){
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query,setQuery]=useState(searchParams.get("q") || "");
  const [industry,setIndustry]=useState(initialIndustry || "All industries");
  const [application,setApplication]=useState(searchParams.get("application") || "All applications");
  const industries=useMemo(()=>["All industries",...Array.from(new Set(products.flatMap(p=>p.industries))).sort()],[products]);
  const applications=useMemo(()=>["All applications",...Array.from(new Set(products.flatMap(p=>p.applications))).sort()],[products]);
  const visible=useMemo(()=>products.filter(p=>{
    const searchable = `${p.name} ${p.category} ${p.shortDescription} ${p.specs.map((spec)=>`${spec.label} ${spec.value}`).join(" ")}`.toLowerCase();
    return (!query || searchable.includes(query.toLowerCase())) && (industry==="All industries" || p.industries.includes(industry)) && (application==="All applications" || p.applications.includes(application));
  }),[products,query,industry,application]);
  useEffect(()=>{
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (industry !== "All industries") { const match = industries.find((item)=>item===industry); if (match) params.set("industry", match.toLowerCase().replaceAll(" ","-")); }
    if (application !== "All applications") params.set("application", application);
    const next = params.toString() ? `${pathname}?${params}` : pathname;
    window.history.replaceState(window.history.state,"",next);
  },[query,industry,application,pathname,industries]);
  useEffect(()=>{
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("industry");
      setQuery(params.get("q") || "");
      setApplication(params.get("application") || "All applications");
      setIndustry(slug ? industries.find((item)=>item.toLowerCase().replaceAll(" ","-") === slug) || "All industries" : initialIndustry || "All industries");
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  },[industries,initialIndustry]);
  function navigateFilter(key:string,value:string){
    const params = new URLSearchParams();
    if (query) params.set("q",query);
    if (key === "industry") { if (value !== "All industries") params.set("industry",value.toLowerCase().replaceAll(" ","-")); }
    else if (industry !== "All industries") params.set("industry",industry.toLowerCase().replaceAll(" ","-"));
    if (key === "application") { if (value !== "All applications") params.set("application",value); }
    else if (application !== "All applications") params.set("application",application);
    router.push(params.toString() ? `${pathname}?${params}` : pathname,{scroll:false});
  }
  function reset(){ setQuery(""); setIndustry("All industries"); setApplication("All applications"); router.replace(pathname,{scroll:false}); }
  return <>
    <div className="filter-bar">
      <input className="filter-input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products, models, or specifications" aria-label="Search products"/>
      <select className="field" value={industry} onChange={e=>{setIndustry(e.target.value);navigateFilter("industry",e.target.value)}} aria-label="Filter by industry">{industries.map(v=><option key={v}>{v}</option>)}</select>
      <select className="field" value={application} onChange={e=>{setApplication(e.target.value);navigateFilter("application",e.target.value)}} aria-label="Filter by application">{applications.map(v=><option key={v}>{v}</option>)}</select>
    </div>
    <div className="filter-toolbar"><div className="filter-count" aria-live="polite">Showing <strong>{visible.length}</strong> of {products.length} engineered systems</div>{(query || industry !== "All industries" || application !== "All applications") && <button className="filter-reset" type="button" onClick={reset}>Reset filters</button>}</div>
    {visible.length?<div className="product-grid">{visible.map((p,i)=><ProductCard product={p} featured={i===0 && visible.length > 2} key={p.slug}/>)}</div>:<div className="empty-state"><strong>No systems match those filters.</strong><p>Try an application, product family, or specification such as “40 bar”.</p><button className="button button-outline" type="button" onClick={reset}>Clear filters</button></div>}
  </>
}
