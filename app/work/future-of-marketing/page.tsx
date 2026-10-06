import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Future of Marketing", "Built and grew TINT’s owned-media platform from roughly 7,000 to more than 50,000 subscribers — using editorial programming to build audience, authority, and recurring demand-generation opportunities.", "/work/future-of-marketing");

import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { driveImageUrl } from "@/lib/googleDrive";

export default function FutureOfMarketingPage(){
  return <CaseStudyTemplate
    eyebrow="AUDIENCE GROWTH + OWNED MEDIA"
    title="Future of Marketing"
    dek="Built and grew TINT’s owned-media platform from roughly 7,000 to more than 50,000 subscribers — using editorial programming to build audience, authority, and recurring demand-generation opportunities."
    meta={[
      {label:"Growth",value:"~7K → 50K+ subscribers"},
      {label:"Role",value:"Editorial strategy / audience growth / programming / execution"},
      {label:"Formats",value:"Newsletter / webinars / podcast / events / speaking"},
    ]}
    sections={[
      {eyebrow:"THE IDEA",title:"Build an audience around the category, not just the product.",copy:"Future of Marketing operated as TINT’s media brand: an owned platform designed to keep marketers engaged with useful ideas, expert perspectives, and emerging industry conversations while strengthening TINT’s position as a thought leader."},
      {eyebrow:"THE SYSTEM",title:"One media brand, many recurring reasons to come back.",copy:"I shaped the editorial direction and built programming across newsletters, webinars, podcast conversations, live and virtual events, public appearances, and expert participation. Each format extended the same audience relationship rather than behaving like an isolated campaign."},
      {eyebrow:"IMPACT",title:"A content program became an audience asset.",copy:"Future of Marketing gave TINT a persistent industry-facing platform instead of relying only on campaign-by-campaign attention. It supported lead-generation and nurture activity as well, although historical attribution was not clean enough to report a reliable sourced-revenue figure."},
    ]}
    visualClass="case-visual-report-cover"
    visual={<img src={driveImageUrl("1_7nj-IPN0WgbvNsGQ577Hg-ZBHTPugrg")} alt="State of Social and User-Generated Content report cover" />}
    secondaryVisualClass="case-visual-report-pages"
    secondaryVisual={<img src={driveImageUrl("1PTknVIQaRFGuhy7ufNu_8XM5odlyUU5X")} alt="Pages from the State of Social and User-Generated Content report" />}
    facts={[
      {title:"Audience growth",copy:"Expanded the subscriber base from roughly 7,000 to more than 50,000."},
      {title:"Integrated programming",copy:"Connected editorial, webinars, podcasting, events, and speaking into one recognizable media ecosystem."},
      {title:"Business role",copy:"Created recurring opportunities to engage prospects and support lead generation without turning the platform into product marketing."},
    ]}
    next={{href:"/work/research-led-content-engine",label:"Research-Led Content Engine"}}
  />;
}
