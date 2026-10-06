import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Research-Led Content Engine", "Turned one original research initiative into a report, earned-media story, editorial calendar, social program, newsletter narrative, nurture sequence, and months of campaign material.", "/work/research-led-content-engine");

import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { driveImageUrl } from "@/lib/googleDrive";

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
      {eyebrow:"THE OPPORTUNITY",title:"Make the research do more than launch once.",copy:"Instead of treating an eBook or annual report as a single gated asset, I built the work so every insight, interview, quote, and finding could become raw material for additional campaigns and editorial formats."},
      {eyebrow:"THE BUILD",title:"Research, editorial, design, and distribution became one system.",copy:"I drafted the survey questions, analyzed the findings, interviewed industry leaders, and repurposed relevant conversations from the Future of Marketing podcast. I then shaped the narrative and designed the final eBook/report so the research could move cleanly across channels."},
      {eyebrow:"THE RETURN",title:"One foundational asset drove a year’s worth of marketing.",copy:"The research generated recurring campaign material and contributed to earned-media mentions in outlets including Forbes and Digiday. It also supported lead-generation activity, though historical attribution does not allow me to report a reliable revenue figure."},
    ]}
    visualClass="case-visual-report-cover"
    visual={<img src={driveImageUrl("1_7nj-IPN0WgbvNsGQ577Hg-ZBHTPugrg")} alt="State of Social and User-Generated Content report cover" />}
    secondaryVisualClass="case-visual-report-pages"
    secondaryVisual={<img src={driveImageUrl("1PTknVIQaRFGuhy7ufNu_8XM5odlyUU5X")} alt="Pages from the State of Social and User-Generated Content report" />}
    evidence={[{src:"/case-studies/research-blog.webp",alt:"TINT blog artwork for UGC-Powered Commerce",caption:"Editorial example: UGC-Powered Commerce — how social commerce brands can repurpose user-generated content."}]}
    facts={[
      {title:"Original insight",copy:"Survey design and analysis created proprietary material the brand could own rather than simply comment on."},
      {title:"Expert layer",copy:"Leader interviews and podcast conversations added outside perspective, credibility, and reusable quotes."},
      {title:"Compounding distribution",copy:"Findings became press angles, blog posts, social content, newsletter campaigns, drip sequences, and demand-generation assets."},
    ]}
    next={{href:"/work/relationship-operating-system",label:"Relationship Operating System"}}
  />;
}
