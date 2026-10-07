import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { pageMetadata } from "@/lib/metadata";
import { driveImageUrl } from "@/lib/googleDrive";

export const metadata = pageMetadata("Veggies Made Great — Omelette Rounds", "Consumer research helped support a breakfast product’s transition from Egg Patties to Omelette Rounds, aligning its name with how people understood it.", "/work/veggies-made-great");

// Adapted from the existing Lab archive: /entry-omelette.
export default function Page() {
  return <CaseStudyTemplate
    eyebrow="RESEARCH / NAMING / POSITIONING"
    title="Veggies Made Great — Omelette Rounds"
    dek="Consumer research helped support a breakfast product’s transition from Egg Patties to Omelette Rounds, aligning its name with how people understood it."
    meta={[{"label": "Client", "value": "Veggies Made Great"}, {"label": "Year", "value": "2024"}, {"label": "Focus", "value": "Product naming / positioning"}]}
    sections={[{"eyebrow": "THE QUESTION", "title": "Was the name getting in the way?", "copy": "Veggies Made Great suspected its breakfast product’s name — Egg Patties — was holding it back."}, {"eyebrow": "THE APPROACH", "title": "Start with how consumers understand the product.", "copy": "I led research on how consumers understood the product, what the name suggested, and what would make them buy."}, {"eyebrow": "THE OUTCOME", "title": "A name that better reflected consumer understanding.", "copy": "The findings supported the rename to Omelette Rounds — closer to how people actually described it."}]}
    visualClass="case-product-pair"
    visual={<div className="case-product-pair-inner">
      <figure>
        <img src={driveImageUrl("1bYhcCqq2BzTqyXeepck17toZ6uT-D3Xj")} alt="Veggies Made Great Egg Patties package" />
        <figcaption>Before</figcaption>
      </figure>
      <figure>
        <img src={driveImageUrl("187YzQdMDaTMuU1Ir2yBpSNP1P9MMcjUa")} alt="Veggies Made Great Omelette Rounds package" />
        <figcaption>After</figcaption>
      </figure>
    </div>}
    facts={[{"title": "Understanding", "copy": "Explored how consumers interpreted the product and its name."}, {"title": "Purchase intent", "copy": "Evaluated purchase intent alongside naming associations and key benefits."}, {"title": "Positioning", "copy": "Identified opportunities to make the product’s language clearer."}]}
    next={{"href": "/work/purina-video-reviews", "label": "Purina — The Role of Video Reviews"}}
  />;
}
