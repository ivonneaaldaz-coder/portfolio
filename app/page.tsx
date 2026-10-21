import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata("I make things — art, brands, experiences", "I make things — art, brands, experiences. Explore Ivonne Aldaz’s work, case studies, writing, and experiments.", "/"),
  title: { absolute: "Ivonne Aldaz — I make things: art, brands, experiences" },
};

import Link from "next/link";
import ExperimentLoop from "@/components/ExperimentLoop";
import WatercolorStudio from "@/components/WatercolorStudio";
import SelectedWorkExplorer from "@/components/SelectedWorkExplorer";
import { getPinterestPins } from "@/lib/pinterest";
import { driveImageUrl, listDriveFolder, normalizeDriveName } from "@/lib/googleDrive";

const PROJECT_FOLDER = "1hpdPGeKX8nISrESD0EAzdCeAoVCnnnl7";

const features = [
  { title: "Whitespace", meta: "Strategy / Brand / AI", className: "feature", href: "https://www.bywhitespace.com/", external: true, driveKey:"whitespace" },
  { title: "Art Practice", meta: "Painting / Ceramics / Design", className: "feature", href: "/art", driveKey:"art practice" },
  { title: "Good World Living", meta: "Experiences / Places / Objects", className: "feature", href: "https://www.goodworldliving.com/", external: true, driveKey:"good world living" },
];

const studies = [
  { title:"Future of Marketing", tag:"7K → 50K+ subscribers", desc:"Built and grew TINT’s owned-media platform across newsletters, webinars, podcasts, events, and industry programming.", href:"/work/future-of-marketing" },
  { title:"Purina — The Role of Video Reviews", tag:"Findings → an executive’s pitch to leadership", desc:"Explored how video reviews influence pet-care purchase decisions, comparing general market consumers with Purina brand fans.", href:"/work/purina-video-reviews" },
  { title:"Partner CRM for a Hospitality Network", tag:"Scattered contacts → active pipeline", desc:"Turned fragmented contacts and follow-ups into an actionable relationship pipeline for a small team.", href:"/work/relationship-operating-system" },
];

const moreStudies = [
  { title:"Gaia Herbs — Concept Validation", tag:"Research → stopped spending on what wasn’t selling", desc:"Evaluated multivitamin concepts before further development to help prioritize opportunities and refine messaging, claims, and positioning.", href:"/work/gaia-herbs-concept-validation" },
  { title:"Veggies Made Great — Omelette Rounds", tag:"Research → relaunched as Omelette Rounds", desc:"Consumer research helped support a breakfast product’s transition from Egg Patties to Omelette Rounds, aligning its name with how people understood it.", href:"/work/veggies-made-great" },
  { title:"ARM & HAMMER — Placement + Pricing", tag:"Research → launched at Walmart", desc:"Consumer research clarified where shoppers expected to find a new product and what they were willing to pay for it.", href:"/work/arm-hammer-retail-strategy" },
  { title:"Research-Led Content Engine", tag:"One report → a year of campaigns", desc:"Turned original research and expert interviews into a report, press, blogs, social, newsletters, nurture, and demand-generation campaigns.", href:"/work/research-led-content-engine" },
  { title:"Brand + Digital Repositioning", tag:"Dead list → inbound calls", desc:"Connected positioning, message, website, sales materials, and campaigns into one clearer customer journey.", href:"/work/brand-digital-repositioning" },
];

const experiments = [
  { title:"The Lab", meta:"Retro Portfolio", loop:"lab", href:"/experiments/the-lab" },
  { title:"Ask Eve", meta:"Conversational CV", loop:"eve", href:"/experiments/ask-eve" },
  { title:"Chatroom", meta:"Public chat", loop:"chat", href:"/experiments/chatroom" },
  { title:"Snake", meta:"Global leaderboard", loop:"snake", href:"/experiments/snake" },
];

const moreExperiments = [
  { title:"Moodboard", meta:"Pinterest → carousel", loop:null, href:"/experiments/moodboard-agent" },
];

const library = [
  { title:"Books + Quotes", meta:"Books, passages, and ideas.", href:"/books" },
  { title:"Music", meta:"Playlists, records, and whatever I’m listening to lately.", href:"/music" },
  { title:"Visual References", meta:"Images, type, color, and things worth saving.", href:"/visual-references" },
  { title:"Travel", meta:"Photos from places I’ve been.", href:"/travel" },
];

function CaseRow({study}:{study:typeof studies[number] | typeof moreStudies[number]}) {
  const body = <>
    <div><h3>{study.title}</h3><span className="home-case-tag">{study.tag}</span></div>
    <span>{study.href ? "→" : "—"}</span>
  </>;
  return study.href
    ? <Link className="home-case" href={study.href} key={study.title}>{body}</Link>
    : <div className="home-case" key={study.title}>{body}</div>;
}

export default async function OverviewPage() {
  const [projectFiles, pinterestPins] = await Promise.all([
    listDriveFolder(PROJECT_FOLDER),
    getPinterestPins(8),
  ]);
  const projectImages = new Map(projectFiles.map(file => [normalizeDriveName(file.name), driveImageUrl(file.id)]));
  const visualWorldPins = pinterestPins.slice(0,6);

  return (
    <div className="overview-page">
      <section className="hero-compact section-pad" id="overview">
        <div className="hero-row">
          <h1><span style={{display:"block"}}>I make things —</span><span style={{display:"block"}}>art, brands, experiences.</span></h1>
          <div className="hero-introduction"><p>I’ve built brands and audiences and led insights and strategy for companies including Nestlé, Hero Cosmetics, and ARM &amp; HAMMER. Now I run Whitespace, teach across marketing and entrepreneurship, and make art.</p><a className="hero-contact" href="mailto:hello@ivonnealdaz.com">Get in touch →<span>hello@ivonnealdaz.com</span></a></div>
        </div>
      </section>

      <section className="hybrid-watercolor-section section-pad"><WatercolorStudio /></section>

      {visualWorldPins.length ? (
        <section className="overview-visual-world section-pad overview-anchor" id="visual-world">
          <div className="overview-visual-world-head">
            <h2 className="section-title small-title">Visual References</h2>
          </div>

          <div className="overview-visual-world-grid">
            {visualWorldPins.map((pin, index) => (
              <Link
                className={`overview-visual-world-item item-${index + 1}`}
                href="/visual-references"
                key={pin.id}
                aria-label="Explore visual references"
              >
                <img src={pin.imageUrl} alt={pin.altText} loading="lazy" decoding="async" />
              </Link>
            ))}
          </div>

          <div className="overview-visual-world-links">
            <Link href="/visual-references">Visual references →</Link>
            <Link href="/travel">Travel →</Link>
          </div>
        </section>
      ) : null}


      <section className="overview-library section-pad overview-anchor" id="library">
        <div className="section-heading"><h2 className="section-title small-title">Library</h2></div>
        <div className="overview-library-grid">
          {library.map(item => <Link href={item.href} className="overview-library-item" key={item.title}>
            <div><h3>{item.title}</h3></div><span>→</span>
          </Link>)}
        </div>
      </section>




    </div>
  );
}
