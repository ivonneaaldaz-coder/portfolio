import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Research-Led Content Engine", "Turned one original research initiative into a report, earned-media story, editorial calendar, social program, newsletter narrative, nurture sequence, and months of campaign material.", "/work/research-led-content-engine");

import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import DemoVideo from "@/components/DemoVideo";

export default function ResearchLedContentEnginePage(){
  return <CaseStudyTemplate
    eyebrow="RESEARCH + CONTENT SYSTEMS"
    title="Research-Led Content Engine"
    dek="Turned one original research initiative into a report, earned-media story, editorial calendar, social program, newsletter narrative, nurture sequence, and months of campaign material."
    meta={[
      {label:"Role",value:"Research / insights / interviews / writing / design / distribution"},
      {label:"Inputs",value:"Survey data / expert interviews / podcast conversations"},
      {label:"Outputs",value:"Report / PR / blog / social / newsletter / drip campaigns"},
    ]}
    sections={[
      {eyebrow:"THE OPPORTUNITY",title:"Make the research do more than launch once.",copy:"An annual report usually launches once and fades. I built this one so every finding, quote, and interview could become its own campaign."},
      {eyebrow:"THE BUILD",title:"Research, editorial, design, and distribution became one system.",copy:"I wrote the survey, analyzed the results, interviewed industry leaders, and pulled in podcast conversations. Then I wrote and designed the report."},
      {eyebrow:"THE RETURN",title:"One foundational asset drove a year’s worth of marketing.",copy:"A year of campaign material, plus coverage in Forbes and Digiday. It supported lead generation too, though attribution doesn’t allow a reliable revenue figure."},
    ]}
    visualClass="case-visual-video"
    visual={<DemoVideo src="/case-studies/research-led-content-engine.mp4" poster="/case-studies/research-led-content-engine.webp" label="How one research report became a year of campaigns" />}
    facts={[
      {title:"Original insight",copy:"Survey design and analysis created proprietary material the brand could own rather than simply comment on."},
      {title:"Expert layer",copy:"Leader interviews and podcast conversations added outside perspective, credibility, and reusable quotes."},
      {title:"Compounding distribution",copy:"Findings became press angles, blog posts, social content, newsletter campaigns, drip sequences, and demand-generation assets."},
    ]}
    next={{href:"/work/relationship-operating-system",label:"Relationship Operating System"}}
  />;
}
