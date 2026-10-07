import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { pageMetadata } from "@/lib/metadata";
import { driveImageUrl } from "@/lib/googleDrive";

export const metadata = pageMetadata("Gaia Herbs — Concept Validation", "Evaluated multivitamin concepts before further development to help prioritize opportunities and refine messaging, claims, and positioning.", "/work/gaia-herbs-concept-validation");

// Adapted from the existing Lab archive: /entry-gaia.
export default function Page() {
  return <CaseStudyTemplate
    eyebrow="RESEARCH / CONCEPT VALIDATION"
    title="Gaia Herbs — Concept Validation"
    dek="Evaluated multivitamin concepts before further development to help prioritize opportunities and refine messaging, claims, and positioning."
    meta={[{"label": "Client", "value": "Gaia Herbs"}, {"label": "Year", "value": "2024"}, {"label": "Focus", "value": "Multivitamin concepts / positioning"}]}
    sections={[{"eyebrow": "THE QUESTION", "title": "Which concepts best meet consumer needs?", "copy": "Gaia Herbs had several multivitamin concepts and needed to know which ones consumers actually wanted."}, {"eyebrow": "THE APPROACH", "title": "Evaluate relevance and differentiation together.", "copy": "We tested each concept for purchase intent, believability, uniqueness, and price expectations."}, {"eyebrow": "THE OUTCOME", "title": "Stop funding what people won’t buy.", "copy": "A ranked shortlist and sharper messaging — and Gaia stopped spending on products people weren’t buying."}]}
    visualClass="case-product-lineup"
    visual={<div className="case-product-lineup-inner">
      {[
        "16mjSfMlpsDrGLJ6h1cNZ3fMwK9GlfaXl",
        "1QLrFSRDFIVd2fpibjbWxpr6xEq_17k9V",
        "1M1KbcLpnB3YohXSESKK-VZ6qpCW21eyM",
        "1sSmiyx43xkV3hzP9K86dKsWa7E4XHHRA",
      ].map((id,index)=><img key={id} src={driveImageUrl(id)} alt={"Gaia Herbs product "+(index+1)} />)}
    </div>}
    facts={[{"title": "Relevance", "copy": "How well each concept met real needs."}, {"title": "Differentiation", "copy": "Uniqueness, believability, and purchase intent."}, {"title": "Pricing", "copy": "What people expected to pay."}]}
    next={{"href": "/work/arm-hammer-retail-strategy", "label": "ARM & HAMMER — Placement + Pricing"}}
  />;
}
