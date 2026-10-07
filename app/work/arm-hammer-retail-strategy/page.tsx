import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import DemoVideo from "@/components/DemoVideo";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("ARM & HAMMER — Placement + Pricing", "Consumer research clarified where shoppers expected to find a new product and what they were willing to pay for it.", "/work/arm-hammer-retail-strategy");

// Adapted from the existing Lab archive: /entry-armhammer.
export default function Page() {
  return <CaseStudyTemplate
    eyebrow="RESEARCH / RETAIL / PRICING"
    title="ARM & HAMMER — Placement + Pricing"
    dek="Consumer research clarified where shoppers expected to find a new product and what they were willing to pay for it."
    meta={[{"label": "Client", "value": "ARM & HAMMER"}, {"label": "Year", "value": "2024"}, {"label": "Focus", "value": "Shelf placement / pricing strategy"}]}
    sections={[{"eyebrow": "THE QUESTION", "title": "Where does the product belong?", "copy": "ARM & HAMMER had a new product and two open questions: where shoppers expected to find it, and what they’d pay for it."}, {"eyebrow": "THE APPROACH", "title": "Study the shelf and the price together.", "copy": "We tested where shoppers would look for it — cooking, cleaning, or somewhere else — and how that context changed their read of it. Then we measured willingness to pay across sizes and price points."}, {"eyebrow": "THE OUTCOME", "title": "Enough confidence to launch at Walmart.", "copy": "Clear answers on aisle, shelf position, and price — enough data to launch the product at Walmart."}]}
    visualClass="case-visual-video"
    visual={<div className="case-video-stack"><DemoVideo src="/case-studies/arm-hammer-placement-pricing.mp4" poster="/case-studies/arm-hammer-placement-pricing.webp" label="ARM & HAMMER placement and pricing study walkthrough (demo data)" /><p className="case-video-note"><strong>Note:</strong> This video uses mock data and illustrative results created for presentation purposes. No real client or survey data is shown.</p></div>}
    facts={[{"title": "Placement", "copy": "Which aisle shoppers expected."}, {"title": "Pricing", "copy": "What they’d pay, by size."}, {"title": "Context", "copy": "How the aisle changed perception."}]}
    next={{"href": "/work/future-of-marketing", "label": "Future of Marketing"}}
  />;
}
