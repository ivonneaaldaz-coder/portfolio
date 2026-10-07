import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import DemoVideo from "@/components/DemoVideo";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Purina — The Role of Video Reviews", "Explored how video reviews influence pet-care purchase decisions, comparing general market consumers with Purina brand fans.", "/work/purina-video-reviews");

// Adapted from the existing Lab archive: /entry-purina.
export default function Page() {
  return <CaseStudyTemplate
    eyebrow="RESEARCH / CONSUMER INSIGHTS"
    title="Purina — The Role of Video Reviews"
    dek="Explored how video reviews influence pet-care purchase decisions, comparing general market consumers with Purina brand fans."
    meta={[{"label": "Client", "value": "Purina"}, {"label": "Year", "value": "2024"}, {"label": "Focus", "value": "Video reviews / content strategy"}]}
    sections={[{"eyebrow": "THE QUESTION", "title": "Where do video reviews create value?", "copy": "Purina wanted to know how much video reviews matter in pet care — and whose reviews people trust."}, {"eyebrow": "THE APPROACH", "title": "Compare brand fans with the broader market.", "copy": "We surveyed general-market pet owners and Purina fans on trust, purchase influence, and the formats they prefer."}, {"eyebrow": "THE OUTCOME", "title": "A clearer basis for content investment.", "copy": "A clear read on where video reviews move people — and where to invest in content next."}]}
    visualClass="case-visual-video"
    visual={<div className="case-video-stack"><DemoVideo src="/case-studies/purina-video-reviews.mp4" poster="/case-studies/purina-video-reviews.webp" label="Purina video reviews study walkthrough (demo data)" /><p className="case-video-note"><strong>Note:</strong> This video uses mock data and illustrative results created for presentation purposes. No real client or survey data is shown.</p></div>}
    facts={[{"title": "Trust", "copy": "Explored how consumers evaluate credibility and authenticity."}, {"title": "Purchase decisions", "copy": "Investigated the influence of video reviews on purchase decisions."}, {"title": "Audience differences", "copy": "Compared loyal customers with the broader market."}]}
    next={{"href": "/work/gaia-herbs-concept-validation", "label": "Gaia Herbs — Concept Validation"}}
  />;
}
