import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("ARM & HAMMER — Placement + Pricing", "Consumer research clarified where shoppers expected to find a new product and what they were willing to pay for it.", "/work/arm-hammer-retail-strategy");

// Adapted from the existing Lab archive: /entry-armhammer.
export default function Page() {
  return <CaseStudyTemplate
    eyebrow="RESEARCH / RETAIL / PRICING"
    title="ARM & HAMMER — Placement + Pricing"
    dek="Consumer research clarified where shoppers expected to find a new product and what they were willing to pay for it."
    meta={[{"label": "Client", "value": "ARM & HAMMER"}, {"label": "Year", "value": "2024"}, {"label": "Focus", "value": "Shelf placement / pricing strategy"}]}
    sections={[{"eyebrow": "THE QUESTION", "title": "Where does the product belong?", "copy": "ARM & HAMMER wanted to understand where a new product should live within the retail environment and how consumers would evaluate it once they found it. The challenge was understanding where they expected to find it and what they were willing to pay."}, {"eyebrow": "THE APPROACH", "title": "Study the shelf and the price together.", "copy": "The research explored expected retail aisles, whether the product belonged in cooking, cleaning, or adjacent categories, and how category context influenced perception. It also examined willingness to pay, pricing thresholds, value perception, and purchase intent across price points."}, {"eyebrow": "THE OUTCOME", "title": "Reduce uncertainty around market introduction.", "copy": "The research provided actionable guidance around retail category placement, shelf positioning, consumer expectations, pricing strategy, and purchase barriers. The findings helped reduce uncertainty around how the product should be introduced to market and encountered in-store."}]}
    visualClass="case-visual-video"
    visual={<div className="case-video-stack"><video
      src="/case-studies/arm-hammer-placement-pricing.mp4"
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label="ARM & HAMMER placement and pricing research walkthrough"
    /><p className="case-video-note"><strong>Note:</strong> This video uses mock data and illustrative interface states created for presentation purposes. No real customer data is shown or used.</p></div>}
    facts={[{"title": "Placement", "copy": "Explored which aisle consumers expected to find the product in."}, {"title": "Pricing", "copy": "Examined willingness to pay, thresholds, and perceived value."}, {"title": "Context", "copy": "Investigated how category context influenced product perception."}]}
    next={{"href": "/work/future-of-marketing", "label": "Future of Marketing"}}
  />;
}
