import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Partner CRM for a Hospitality Network", "Turning a fragmented network of contacts, introductions, and follow-ups into a system a small team could actually use every day.", "/work/relationship-operating-system");

import CaseStudyTemplate from "@/components/CaseStudyTemplate";

export default function RelationshipOperatingSystemPage(){
  return <CaseStudyTemplate
    eyebrow="SYSTEMS + CRM / 2026"
    title="Partner CRM for a Hospitality Network"
    dek="Turning a fragmented network of contacts, introductions, and follow-ups into a system a small team could actually use every day."
    meta={[
      {label:"Role",value:"Strategy / systems design / implementation"},
      {label:"Scope",value:"CRM / workflows / automation / AI"},
      {label:"Context",value:"Hospitality + investment network"},
    ]}
    sections={[
      {eyebrow:"THE SITUATION",title:"Valuable relationships were living everywhere except in one usable place.",copy:"Contacts came in through inboxes, business cards, referrals, and forms. The team didn’t need more data — they needed what they had to be usable."},
      {eyebrow:"THE SYSTEM",title:"A lightweight operating layer around the relationship pipeline.",copy:"I designed the structure, pipeline views, intake, and follow-up logic. Automations keep records clean and surface what needs attention each day."},
      {eyebrow:"OUTCOME",title:"A relationship database became an operating system.",copy:"The team sees its whole network, spends less time organizing, and knows who to follow up with next."},
    ]}
    visualClass="case-visual-video"
    visual={<div className="case-video-stack"><video
      src="/case-studies/relationship-operating-system.mp4"
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label="Partner CRM for a Hospitality Network walkthrough"
    /><p className="case-video-note"><strong>Note:</strong> This video uses mock data and illustrative results created for presentation purposes. No real client or survey data is shown.</p></div>}
    facts={[
      {title:"One source of truth",copy:"Contacts, status, last touch, and next step in one place."},
      {title:"Action over storage",copy:"Built around what to do next."},
      {title:"AI where useful",copy:"Automation for triage and summaries, not for show."},
    ]}
    next={{href:"/work/brand-digital-repositioning",label:"Brand + Digital Repositioning"}}
  />;
}
