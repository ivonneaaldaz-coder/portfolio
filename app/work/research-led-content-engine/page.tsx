import CaseStudyTemplate from "@/components/CaseStudyTemplate";

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
    visualClass="case-visual-content-engine"
    visual={<><span>RESEARCH</span><span>→</span><span>REPORT</span><span>→</span><span>PRESS</span><span>·</span><span>BLOG</span><span>·</span><span>SOCIAL</span><span>·</span><span>EMAIL</span></>}
    facts={[
      {title:"Original insight",copy:"Survey design and analysis created proprietary material the brand could own rather than simply comment on."},
      {title:"Expert layer",copy:"Leader interviews and podcast conversations added outside perspective, credibility, and reusable quotes."},
      {title:"Compounding distribution",copy:"Findings became press angles, blog posts, social content, newsletter campaigns, drip sequences, and demand-generation assets."},
    ]}
    next={{href:"/work/relationship-operating-system",label:"Relationship Operating System"}}
  />;
}
