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
      {eyebrow:"THE SITUATION",title:"The offer was stronger than the way it was being explained.",copy:"The business needed a clearer digital presence and sharper sales narrative: what made the product useful, why a broker should care, and how the experience differed from alternatives."},
      {eyebrow:"THE APPROACH",title:"Make every touchpoint reinforce the same strategic idea.",copy:"I aligned the website refresh, sales one-pager, product tearsheet, newsletter, LinkedIn direction, and broker activation campaign around a more consistent value proposition and customer journey."},
      {eyebrow:"OUTCOME",title:"A more coherent brand system built for actual use.",copy:"The work created a clearer path from positioning to execution, giving the team a more consistent story across the website, sales process, and marketing."},
    ]}
    visualClass="case-visual-brand"
    visual={<><span>POSITIONING</span><span>MESSAGE</span><span>EXPERIENCE</span><span>CONVERSION</span></>}
    facts={[
      {title:"Sharper hierarchy",copy:"Clarified what mattered most and reduced competing messages."},
      {title:"Connected assets",copy:"Website, sales collateral, and campaigns worked as one system rather than isolated deliverables."},
      {title:"Execution included",copy:"Strategy moved directly into copy, campaign structure, and launch-ready materials."},
    ]}
    next={{href:"/work/ai-assisted-lead-engine",label:"AI-Assisted Lead Engine"}}
  />;
}
