import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Veggies Made Great — Omelette Rounds", "Consumer research helped support a breakfast product’s transition from Egg Patties to Omelette Rounds, aligning its name with how people understood it.", "/work/veggies-made-great");

// Adapted from the existing Lab archive: /entry-omelette.
export default function Page() {
  return <CaseStudyTemplate
    eyebrow="RESEARCH / NAMING / POSITIONING"
    title="Veggies Made Great — Omelette Rounds"
    dek="Consumer research helped support a breakfast product’s transition from Egg Patties to Omelette Rounds, aligning its name with how people understood it."
    meta={[{"label": "Client", "value": "Veggies Made Great"}, {"label": "Year", "value": "2024"}, {"label": "Focus", "value": "Product naming / positioning"}]}
    sections={[{"eyebrow": "THE QUESTION", "title": "Was the name getting in the way?", "copy": "Veggies Made Great wanted to better understand how consumers perceived one of its breakfast products, previously called Egg Patties. The question was whether the name was getting in the way of the product."}, {"eyebrow": "THE APPROACH", "title": "Start with how consumers understand the product.", "copy": "I led consumer research exploring product understanding, purchase intent, naming associations, key benefits, and positioning opportunities."}, {"eyebrow": "THE OUTCOME", "title": "A name that better reflected consumer understanding.", "copy": "The findings helped support the transition from Egg Patties to Omelette Rounds — giving the product language that more accurately reflected how consumers thought about and described it."}]}
    facts={[{"title": "Understanding", "copy": "Explored how consumers interpreted the product and its name."}, {"title": "Purchase intent", "copy": "Evaluated purchase intent alongside naming associations and key benefits."}, {"title": "Positioning", "copy": "Identified opportunities to make the product’s language clearer."}]}
    next={{"href": "/work/purina-video-reviews", "label": "Purina — The Role of Video Reviews"}}
  />;
}
