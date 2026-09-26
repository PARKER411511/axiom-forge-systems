import type { Metadata } from "next"; import { RFQForm } from "./rfq-form"; import { pageMetadata } from "@/lib/site-metadata";
export const metadata:Metadata=pageMetadata({title:"Request a Quote",description:"Prepare a structured industrial equipment request for Axiom Forge Systems engineering review.",path:"/request-quote",image:"/images/engineer.jpg"});
export default function RequestQuotePage(){return <section className="section rfq-section" style={{paddingTop:138}}><div className="container"><RFQForm/></div></section>}
