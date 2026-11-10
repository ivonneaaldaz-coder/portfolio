import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Sir Kensington’s — Brand & Consumer Insights",
  "Competitor, household penetration, and brand purpose research supporting recommendations for NPS, purchase, and loyalty.",
  "/work/sir-kensingtons-brand-insights"
);

export default function Page() {
  return <CaseStudyTemplate
    eyebrow="CONSUMER RESEARCH / BRAND STRATEGY"
    title="Sir Kensington’s — Brand & Consumer Insights"
    dek="Research across the competitive landscape, household penetration, and brand purpose to inform strategies for stronger advocacy, purchase, and loyalty."
    meta={[
      {label:"Brand",value:"Sir Kensington’s (Unilever portfolio)"},
      {label:"Role",value:"Brand Insights / Consumer Research"},
      {label:"Focus",value:"NPS / Purchase / Loyalty"}
    ]}
    sections={[
      {
        eyebrow:"THE CHALLENGE",
        title:"Understand what makes people choose the brand.",
        copy:"For Sir Kensington’s, the opportunity was to understand how consumers saw the brand in its category, where it could reach more households, and what would make people recommend, purchase, and return to it."
      },
      {
        eyebrow:"THE RESEARCH",
        title:"Connect competitive context with consumer behavior.",
        copy:"I led competitor insights, household penetration, and brand purpose studies, examining the brand’s position in the market, opportunities to broaden household reach, and the values and perceptions that influence consumer relationships."
      },
      {
        eyebrow:"THE APPLICATION",
        title:"Turn research into recommendations for growth.",
        copy:"I worked with the Sir Kensington’s team to translate the findings into brand and consumer recommendations focused on improving Net Promoter Score (NPS), encouraging purchase, and strengthening loyalty. Results and specific performance changes are not publicly disclosed."
      }
    ]}
    visualClass="case-sir-kensingtons"
    visual={<div style={{display:"flex",alignItems:"center",justifyContent:"center",background:"#000",padding:"clamp(16px,4vw,48px)"}}>
      <img src="https://d2ol7oe51mr4n9.cloudfront.net/user_34E7x1pZCpFDLBfl6swtuelaS3A/5032032a-d441-46e8-8827-c39d32f4ff4d.jpg" alt="Sir Kensington’s Chile Lime Crema Everything Sauce product" style={{display:"block",width:"auto",maxWidth:"100%",maxHeight:"590px",objectFit:"contain"}} />
    </div>}
    facts={[
      {title:"Competitive insights",copy:"Category dynamics, competitors, and brand differentiation."},
      {title:"Household penetration",copy:"Understanding reach and opportunities for broader household adoption."},
      {title:"Brand purpose",copy:"How perceptions and values inform advocacy and loyalty."}
    ]}
    next={{href:"/work/future-of-marketing",label:"Future of Marketing"}}
  />;
}
