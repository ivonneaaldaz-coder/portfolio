import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Future of Marketing", "Built and grew TINT’s owned-media platform from roughly 7,000 to more than 50,000 subscribers — using editorial programming to build audience, authority, and recurring demand-generation opportunities.", "/work/future-of-marketing");

import CaseStudyTemplate from "@/components/CaseStudyTemplate";

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
      {eyebrow:"THE IDEA",title:"Build an audience around the category, not just the product.",copy:"Future of Marketing was TINT’s media brand — a place for marketers to find useful ideas and expert voices, with TINT as the host."},
      {eyebrow:"THE SYSTEM",title:"One media brand, many recurring reasons to come back.",copy:"I set the editorial direction and built the programming: newsletter, webinars, podcast, events, and speaking. Each format fed the same audience."},
      {eyebrow:"IMPACT",title:"A content program became an audience asset.",copy:"TINT gained a platform that kept marketers coming back between campaigns. It also fed lead generation and nurture, though attribution wasn’t clean enough to report revenue."},
    ]}
    visualClass="case-visual-podcast"
    visual={<div className="case-podcast">
      <iframe
        data-testid="embed-iframe"
        src="https://open.spotify.com/embed/episode/1WMm5zjxrXPsT0vdNICw2B?utm_source=generator&theme=0&t=30&si=a9b86b8fafde4ddd"
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Future of Marketing podcast episode on Spotify"
      />
      <p className="case-video-note">Listen: an episode of the Future of Marketing podcast.</p>
    </div>}
    facts={[
      {title:"Audience growth",copy:"From ~7,000 to 50,000+ subscribers."},
      {title:"Integrated programming",copy:"Newsletter, webinars, podcast, events, and speaking under one brand."},
      {title:"Business role",copy:"Steady reasons to engage prospects — without selling."},
    ]}
    next={{href:"/work/research-led-content-engine",label:"Research-Led Content Engine"}}
  />;
}
