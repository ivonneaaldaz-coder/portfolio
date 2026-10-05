import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Purina — The Role of Video Reviews", "Explored how video reviews influence pet-care purchase decisions, comparing general market consumers with Purina brand fans.", "/work/purina-video-reviews");

// Adapted from the existing Lab archive: /entry-purina.
export default function Page() {
  return <CaseStudyTemplate
    eyebrow="RESEARCH / CONSUMER INSIGHTS"
    title="Purina — The Role of Video Reviews"
    dek="Explored how video reviews influence pet-care purchase decisions, comparing general market consumers with Purina brand fans."
    meta={[{"label": "Client", "value": "Purina"}, {"label": "Year", "value": "2024"}, {"label": "Focus", "value": "Video reviews / content strategy"}]}
    sections={[{"eyebrow": "THE QUESTION", "title": "Where do video reviews create value?", "copy": "Purina wanted to better understand the role of creator and consumer-generated video content within the pet care category."}, {"eyebrow": "THE APPROACH", "title": "Compare brand fans with the broader market.", "copy": "We surveyed general market consumers and Purina brand fans, exploring trust and credibility, influence on purchase decisions, preferred review formats, and differences between loyal customers and the broader market."}, {"eyebrow": "THE OUTCOME", "title": "A clearer basis for content investment.", "copy": "The study helped quantify where video reviews create value, how consumers evaluate authenticity, and where brands should invest when building content strategies."}]}
    facts={[{"title": "Trust", "copy": "Explored how consumers evaluate credibility and authenticity."}, {"title": "Purchase decisions", "copy": "Investigated the influence of video reviews on purchase decisions."}, {"title": "Audience differences", "copy": "Compared loyal customers with the broader market."}]}
    next={{"href": "/work/gaia-herbs-concept-validation", "label": "Gaia Herbs — Concept Validation"}}
  />;
}
