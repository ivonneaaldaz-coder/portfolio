import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("AI-Assisted Lead Engine", "A lightweight pipeline for turning messy inbound information into structured records, priorities, and next steps.", "/work/ai-assisted-lead-engine");

import CaseStudyTemplate from "@/components/CaseStudyTemplate";

export default function AIAssistedLeadEnginePage(){
  return <CaseStudyTemplate
    eyebrow="AI + AUTOMATION / 2026"
    title="AI-Assisted Lead Engine"
    dek="A lightweight pipeline for turning messy inbound information into structured records, priorities, and next steps."
    meta={[
      {label:"Role",value:"Workflow design / prototyping / implementation"},
      {label:"Scope",value:"Inbox / extraction / CRM / summaries"},
      {label:"Principle",value:"Automate the sorting, keep judgment human"},
    ]}
    sections={[
      {eyebrow:"THE QUESTION",title:"What if the team never had to manually organize a lead again?",copy:"The workflow was designed around a simple reality: useful opportunities often arrive in inconsistent formats. The system needed to capture them without forcing everyone into a new behavior."},
      {eyebrow:"THE WORKFLOW",title:"Keep the front door familiar. Automate what happens after.",copy:"Leads could be forwarded into a shared intake point, parsed into structured fields, added to the CRM, checked for duplicates, and surfaced in a daily action summary. The system focused on reducing administrative drag rather than replacing decision-making."},
      {eyebrow:"WHY IT MATTERS",title:"Small operational systems can create disproportionate leverage.",copy:"The value was not the presence of AI. It was the removal of repetitive sorting and the creation of a clearer daily operating rhythm."},
    ]}
    visualClass="case-visual-engine"
    visual={<><span>INBOX</span><span>EXTRACT</span><span>STRUCTURE</span><span>PRIORITIZE</span><span>ACT</span></>}
    facts={[
      {title:"Low-friction intake",copy:"The workflow works with existing email behavior instead of demanding a new tool first."},
      {title:"Structured automatically",copy:"Unstructured information becomes consistent fields that can be filtered and acted on."},
      {title:"Human review retained",copy:"AI supports extraction and prioritization while final judgment stays with the team."},
    ]}
  />;
}
