import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { driveImageUrl } from "@/lib/googleDrive";

export default function VeggiesMadeGreatPage(){
  return <CaseStudyTemplate
    eyebrow="NAMING + CONSUMER INSIGHTS"
    title="Veggies Made Great"
    dek="Consumer research used to evaluate product naming, language, associations, clarity, and purchase appeal for an evolving breakfast product."
    meta={[
      {label:"Role",value:"Consumer research / naming evaluation / insights"},
      {label:"Focus",value:"Clarity / associations / purchase appeal"},
      {label:"Brand",value:"Veggies Made Great"},
    ]}
    sections={[
      {eyebrow:"THE QUESTION",title:"Does the name help people understand and want the product?",copy:"The research looked at how different naming and positioning cues shaped comprehension, expectations, associations, and overall appeal — especially where small wording choices could materially change what consumers thought they were buying."},
      {eyebrow:"THE WORK",title:"Use consumer language to pressure-test the product story.",copy:"I evaluated how people interpreted the product, what terminology felt clearest, where confusion surfaced, and which cues were most likely to support consideration and purchase."},
      {eyebrow:"THE VALUE",title:"A naming decision grounded in how people actually understood the offer.",copy:"The research created a stronger basis for refining the product’s naming and positioning, helping move the decision beyond internal preference toward consumer evidence."},
    ]}
    visualClass="case-product-pair"
    visual={<div className="case-product-pair-inner">
      <figure><img src={driveImageUrl("1bYhcCqq2BzTqyXeepck17toZ6uT-D3Xj")} alt="Veggies Made Great Garden Vegetable Egg Patties package" /><figcaption>Before</figcaption></figure>
      <figure><img src={driveImageUrl("187YzQdMDaTMuU1Ir2yBpSNP1P9MMcjUa")} alt="Veggies Made Great Garden Veggie Omelette Rounds package" /><figcaption>After</figcaption></figure>
    </div>}
    facts={[
      {title:"Naming clarity",copy:"Tested whether the language made the product easy to understand at a glance."},
      {title:"Consumer associations",copy:"Explored what different words signaled about format, taste, health, and usage occasions."},
      {title:"Purchase appeal",copy:"Connected naming and positioning cues back to consideration and preference."},
    ]}
    next={{href:"/work/brand-digital-repositioning",label:"Brand + Digital Repositioning"}}
  />;
}
