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
      {eyebrow:"OUTCOME",title:"A dead list started calling back.",copy:"One story, told the same way everywhere. We retargeted a dead list with it — and got calls."},
    ]}
    visualClass="case-visual-brand"
    visual={<><span>POSITIONING</span><span>MESSAGE</span><span>EXPERIENCE</span><span>CONVERSION</span></>}
    facts={[
      {title:"Sharper hierarchy",copy:"One clear message, fewer competing ones."},
      {title:"Connected assets",copy:"Site, sales materials, and campaigns working together."},
      {title:"Execution included",copy:"Strategy carried through to copy and launch-ready assets."},
    ]}
    next={{href:"/work/veggies-made-great",label:"Veggies Made Great — Omelette Rounds"}}
  />;
}
