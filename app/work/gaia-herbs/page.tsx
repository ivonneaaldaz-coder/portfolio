import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { driveImageUrl } from "@/lib/googleDrive";

const gaiaImages = [
  "16mjSfMlpsDrGLJ6h1cNZ3fMwK9GlfaXl",
  "1QLrFSRDFIVd2fpibjbWxpr6xEq_17k9V",
  "1M1KbcLpnB3YohXSESKK-VZ6qpCW21eyM",
  "1sSmiyx43xkV3hzP9K86dKsWa7E4XHHRA",
];

export default function GaiaHerbsPage(){
  return <CaseStudyTemplate
    eyebrow="BRAND + CONSUMER INSIGHTS"
    title="Gaia Herbs"
    dek="Consumer and category insight work designed to connect audience needs, brand perceptions, and product context to clearer strategic decisions."
    meta={[
      {label:"Role",value:"Consumer insights / synthesis / strategic recommendations"},
      {label:"Focus",value:"Audience needs / perceptions / category context"},
      {label:"Brand",value:"Gaia Herbs"},
    ]}
    sections={[
      {eyebrow:"THE QUESTION",title:"What should the brand understand before making the next decision?",copy:"The work focused on surfacing the audience signals that mattered most: how people thought about the category, what needs and associations shaped consideration, and where the brand had room to sharpen its story."},
      {eyebrow:"THE WORK",title:"Translate consumer evidence into something teams can actually use.",copy:"I synthesized research findings into clear implications and recommendations, connecting qualitative and quantitative signals back to brand, messaging, and marketing decisions rather than leaving the work as a research readout."},
      {eyebrow:"THE VALUE",title:"Research became a strategic input, not a presentation artifact.",copy:"The result was a clearer view of the consumer and category context, giving stakeholders a stronger foundation for decisions about positioning, communication, and product storytelling."},
    ]}
    visualClass="case-product-lineup"
    visual={<div className="case-product-lineup-inner">{gaiaImages.map((id,index)=><img key={id} src={driveImageUrl(id)} alt={"Gaia Herbs product "+(index+1)} />)}</div>}
    facts={[
      {title:"Consumer lens",copy:"Centered the work on the language, needs, associations, and perceptions shaping audience behavior."},
      {title:"Strategic synthesis",copy:"Moved from findings to implications so teams could see what the research meant for the brand."},
      {title:"Decision support",copy:"Created a clearer evidence base for positioning, communication, and marketing choices."},
    ]}
    next={{href:"/work/veggies-made-great",label:"Veggies Made Great"}}
  />;
}
