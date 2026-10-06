import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Relationship Operating System", "Turning a fragmented network of contacts, introductions, and follow-ups into a system a small team could actually use every day.", "/work/relationship-operating-system");

import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { driveVideoUrl } from "@/lib/googleDrive";

export default function RelationshipOperatingSystemPage(){
  return <CaseStudyTemplate
    eyebrow="SYSTEMS + CRM / 2026"
    title="Relationship Operating System"
    dek="Turning a fragmented network of contacts, introductions, and follow-ups into a system a small team could actually use every day."
    meta={[
      {label:"Role",value:"Strategy / systems design / implementation"},
      {label:"Scope",value:"CRM / workflows / automation / AI"},
      {label:"Context",value:"Hospitality + investment network"},
    ]}
    sections={[
      {eyebrow:"THE SITUATION",title:"Valuable relationships were living everywhere except in one usable place.",copy:"Contacts arrived through inboxes, business cards, referrals, forms, and individual team members. The challenge was less about collecting more data and more about turning what already existed into something structured, current, and actionable."},
      {eyebrow:"THE SYSTEM",title:"A lightweight operating layer around the relationship pipeline.",copy:"I designed the database structure, partner categories, pipeline views, follow-up logic, intake flow, and daily action layer. Automations kept records cleaner and surfaced what needed attention without requiring the team to manually scan the base."},
      {eyebrow:"OUTCOME",title:"A relationship database became an operating system.",copy:"The finished system gave the team a clearer view of its network, reduced manual organization, and created a repeatable way to move relationships forward."},
    ]}
    visualClass="case-visual-video"
    visual={<video
      src={driveVideoUrl("1aZaxk-9wxmUnB72PDPP22zHrmj01Y62V")}
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label="Relationship Operating System walkthrough"
    />}
    facts={[
      {title:"One source of truth",copy:"Contacts, categories, status, last touch, and next steps in a shared system."},
      {title:"Action over storage",copy:"Views and summaries were designed around what the team should do next."},
      {title:"AI where useful",copy:"Automation supported triage and summaries instead of becoming the product itself."},
    ]}
    next={{href:"/work/brand-digital-repositioning",label:"Brand + Digital Repositioning"}}
  />;
}
