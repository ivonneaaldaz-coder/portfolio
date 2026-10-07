import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Brand + Digital Repositioning", "Reworking a lending brand so its positioning, website, sales materials, and ongoing marketing told one clearer story.", "/work/brand-digital-repositioning");

import CaseStudyTemplate from "@/components/CaseStudyTemplate";

export default function BrandDigitalRepositioningPage(){
  return <CaseStudyTemplate
    eyebrow="BRAND + DIGITAL / 2026"
    title="Brand + Digital Repositioning"
    dek="Reworking a lending brand so its positioning, website, sales materials, and ongoing marketing told one clearer story."
    meta={[
      {label:"Role",value:"Strategy / messaging / creative direction"},
      {label:"Scope",value:"Website / sales tools / campaign / content"},
      {label:"Context",value:"Financial services"},
    ]}
    sections={[
      {eyebrow:"THE SITUATION",title:"The offer was stronger than the way it was being explained.",copy:"The product was useful. The story wasn’t clear: why a broker should care, and what made it different."},
      {eyebrow:"THE APPROACH",title:"Make every touchpoint reinforce the same strategic idea.",copy:"I rebuilt the website, sales one-pager, tearsheet, newsletter, LinkedIn, and broker campaign around one value proposition."},
      {eyebrow:"OUTCOME",title:"A more coherent brand system built for actual use.",copy:"One story, told the same way on the site, in sales conversations, and in marketing."},
    ]}
    visualClass="case-visual-brand"
    visual={<><span>POSITIONING</span><span>MESSAGE</span><span>EXPERIENCE</span><span>CONVERSION</span></>}
    facts={[
      {title:"Sharper hierarchy",copy:"Clarified what mattered most and reduced competing messages."},
      {title:"Connected assets",copy:"Website, sales collateral, and campaigns worked as one system rather than isolated deliverables."},
      {title:"Execution included",copy:"Strategy moved directly into copy, campaign structure, and launch-ready materials."},
    ]}
    next={{href:"/work/veggies-made-great",label:"Veggies Made Great — Omelette Rounds"}}
  />;
}
