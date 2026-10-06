import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Overview", "Strategy, technology, art. Explore Ivonne Aldaz’s work, case studies, writing, and experiments.", "/overview");

import Link from "next/link";
import { driveImageUrl, listDriveFolder, normalizeDriveName } from "@/lib/googleDrive";

const PROJECT_FOLDER = "1hpdPGeKX8nISrESD0EAzdCeAoVCnnnl7";

const features = [
  { title: "Whitespace", meta: "Strategy / Brand / AI", className: "feature", href: "https://www.bywhitespace.com/", external: true, driveKey:"whitespace" },
  { title: "Art Practice", meta: "Painting / Ceramics / Design", className: "feature", href: "/art", driveKey:"art practice" },
  { title: "Good World Living", meta: "Experiences / Places / Objects", className: "feature", href: "https://www.goodworldliving.com/", external: true, driveKey:"good world living" },
];

const studies = [
  { title:"Future of Marketing", tag:"7K → 50K+ subscribers · at TINT", desc:"Built and grew TINT’s owned-media platform across newsletters, webinars, podcasts, events, and industry programming.", href:"/work/future-of-marketing" },
  { title:"Purina — The Role of Video Reviews", tag:"Consumer insight → clearer purchase drivers · via TrueLoyal", desc:"Explored how video reviews influence pet-care purchase decisions, comparing general market consumers with Purina brand fans.", href:"/work/purina-video-reviews" },
  { title:"Relationship Operating System", tag:"Fragmented contacts → actionable pipeline", desc:"Turned fragmented contacts and follow-ups into an actionable relationship pipeline for a small team.", href:"/work/relationship-operating-system" },
];

const moreStudies = [
  { title:"Gaia Herbs — Concept Validation", tag:"Concepts → prioritized opportunities · via TrueLoyal", desc:"Evaluated multivitamin concepts before further development to help prioritize opportunities and refine messaging, claims, and positioning.", href:"/work/gaia-herbs-concept-validation" },
  { title:"Veggies Made Great — Omelette Rounds", tag:"Research → clearer naming · via TrueLoyal", desc:"Consumer research helped support a breakfast product’s transition from Egg Patties to Omelette Rounds, aligning its name with how people understood it.", href:"/work/veggies-made-great" },
  { title:"ARM & HAMMER — Placement + Pricing", tag:"Research → retail + pricing clarity · via TrueLoyal", desc:"Consumer research clarified where shoppers expected to find a new product and what they were willing to pay for it.", href:"/work/arm-hammer-retail-strategy" },
  { title:"Research-Led Content Engine", tag:"Research → year of campaigns · at TINT", desc:"Turned original research and expert interviews into a report, press, blogs, social, newsletters, nurture, and demand-generation campaigns.", href:"/work/research-led-content-engine" },
  { title:"Brand + Digital Repositioning", tag:"Positioning → launch-ready system", desc:"Connected positioning, message, website, sales materials, and campaigns into one clearer customer journey.", href:"/work/brand-digital-repositioning" },
  { title:"AI-Assisted Lead Engine", tag:"Messy inbound → structured next actions", desc:"Designed a lightweight workflow for turning messy inbound information into structured records, priorities, and next actions.", href:"/work/ai-assisted-lead-engine" },
];

const experiments = [
  { title:"The Lab", meta:"Portfolio OS / experiments", href:"/experiments/the-lab", external:false },
  { title:"Ask Eve", meta:"Conversational CV", href:"/experiments/ask-eve", external:false },
  { title:"Chatroom", meta:"Public internet experiment", href:"/experiments/chatroom", external:false },
  { title:"Snake", meta:"Game + global leaderboard", href:"/experiments/snake", external:false },
];

const library = [
  { title:"Books + Quotes", meta:"Reading, passages, and ideas worth returning to.", href:"/books" },
  { title:"Music", meta:"Playlists, records, and a running soundtrack.", href:"/music" },
  { title:"Visual References", meta:"Images, type, color, and things worth saving.", href:"/visual-references" },
  { title:"Travel", meta:"Photographs from places I’ve passed through.", href:"/travel" },
];

const writing = [
  { title:"When the Universe Hands You a Yes", source:"Good World Living · 2025", href:"https://www.goodworldliving.com/articles/when-the-universe-hands-you-a-yes" },
  { title:"From Brand to Atmosphere: Designing Experiences That Feel Like Worlds", source:"Whitespace · 2026", href:"https://www.bywhitespace.com/blog/designing-experiences-that-feel-like-worlds" },
  { title:"How an Art Residency in Provence Transformed My Creative Path", source:"Good World Living · 2024", href:"https://www.goodworldliving.com/articles/how-an-art-residency-in-provence-transformed-my-creative-path" },
];

const moreWriting = [
  { title:"The Shift Toward Intentional Branding: Designing with Meaning in a Noisy World", source:"Whitespace · 2025", href:"https://www.bywhitespace.com/blog/intentional-branding-designing-with-meaning-in-a-noisy-world" },
  { title:"Art Retreat in France: Unveiling Creative Wonders in St. Antonin-Noble Val", source:"Good World Living · 2023", href:"https://www.goodworldliving.com/articles/france-art-retreat" },
  { title:"Strategy Without Execution Is Just Expensive Advice", source:"Whitespace · 2026", href:"https://www.bywhitespace.com/blog/strategy-without-execution-expensive-advice" },
];

const pressPreview = [
  { org:"Forbes", title:"Why Retailers Should Utilize TikTok to Grow Their Business", year:"2021", href:"https://www.forbes.com/sites/jiawertz/2021/09/24/why-retailers-should-utilize-tiktok-to-grow-their-business/" },
  { org:"Adweek", title:"How Micro and Nano Influencers Drive Big Change", year:"2021", href:"https://www.adweek.com/brand-marketing/how-micro-and-nano-influencers-drive-big-change/" },
  { org:"Digiday", title:"In the Metaverse, Brands’ FOMO Is Competing With Consumers’ Burnout", year:"2024", href:"https://digiday.com/marketing/in-the-metaverse-brands-fomo-is-competing-with-consumers-burnout/" },
];

const morePress = [
  { org:"Social Pros Podcast", title:"How to Capture UGC’s Untapped Potential", year:"2022", href:"https://socialpros.libsyn.com/how-to-capture-ugcs-untapped-potential-with-tint" },
  { org:"B2B Better", title:"Writing a Newsletter Worth Reading", year:"2021", href:"https://b2bbite.substack.com/p/writing-a-newsletter-worth-reading" },
];

const talksPreview = [
  { org:"Adweek Social Media Week", title:"The Power of Community-Created Content", year:"2022", href:"https://www.linkedin.com/posts/ivonnealdaz_smw-tintlove-activity-6930008317020819456-GIqE" },
  { org:"San Antonio Startup Week", title:"Future of Marketing Live Podcast — Spurs Director of Content Strategy", year:"2023", href:"https://vimeo.com/876034599" },
  { org:"Hootsuite", title:"State of UGC — Virtual Panel", year:"2023" },
];

const moreTalks = [
  { org:"St. Mary’s University", title:"How to Make the Most of Your MBA", year:"2025" },
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

function WritingRow({item}:{item:typeof writing[number] | typeof moreWriting[number]}) {
  return <a href={item.href} target="_blank" rel="noreferrer" className="overview-writing-row">
    <h4>{item.title}</h4><p>{item.source}</p><span>↗︎</span>
  </a>;
}

function PressRow({item}:{item:{org:string;title:string;year:string;href?:string}}) {
  const body = <><span>{item.year}</span><div><p>{item.org}</p><h3>{item.title}</h3></div></>;
  return item.href
    ? <a className="overview-press-row" href={item.href} target="_blank" rel="noreferrer">{body}</a>
    : <div className="overview-press-row">{body}</div>;
}

export default async function OverviewPage() {
  const projectFiles = await listDriveFolder(PROJECT_FOLDER);
  const projectImages = new Map(projectFiles.map(file => [normalizeDriveName(file.name), driveImageUrl(file.id)]));

  return (
    <div className="overview-page">
      <section className="hero-compact section-pad" id="overview">
        <div className="hero-row">
          <h1>Strategy, technology, art.</h1>
          <div className="hero-introduction"><p>I grew a B2B audience from 7K to 50K+ and led consumer research for Purina and ARM & HAMMER. <span className="hero-intro-break">Now I run Whitespace and a few creative ventures, and I paint and teach.</span></p><a className="hero-contact" href="mailto:hello@ivonnealdaz.com">Get in touch →<span>hello@ivonnealdaz.com</span></a></div>
        </div>
      </section>

      <section className="home-cases section-pad">
        <div className="section-heading"><h2 className="section-title small-title">Selected Case Studies</h2></div>
        <div className="home-case-list">{studies.map(study => <CaseRow study={study} key={study.title} />)}</div>
        <details className="overview-inline-expand more-case-studies">
          <summary><span>More case studies</span><span aria-hidden="true">＋</span></summary>
          <div className="home-case-list overview-expanded-list">{moreStudies.map(study => <CaseRow study={study} key={study.title} />)}</div>
        </details>
      </section>

      <section className="selected section-pad overview-anchor" id="work">
        <div className="section-heading">
          <h2 className="section-title">Current Work</h2>
        </div>
        <div className="feature-grid">
          {features.map((item) => {
            const image = item.driveKey ? projectImages.get(item.driveKey) : null;
            const content = <>
              <div className="feature-media">{image ? <img className="project-photo" src={image} alt="" /> : null}</div>
              <div className="feature-copy"><div><h3>{item.title}</h3><p>{item.meta}</p></div><span className="circle-arrow">→</span></div>
            </>;
            return item.external
              ? <a className={item.className} key={item.title} href={item.href} target="_blank" rel="noreferrer">{content}</a>
              : <Link className={item.className} key={item.title} href={item.href}>{content}</Link>;
          })}
        </div>
      </section>

      <section className="overview-press section-pad overview-anchor" id="press">
        <div className="section-heading"><h2 className="section-title small-title">Press + Speaking</h2></div>
        <div className="overview-press-grid">
          <div>
            <p className="eyebrow">SELECTED PRESS</p>
            {pressPreview.map(item => <PressRow item={item} key={item.org+item.title} />)}
          </div>
          <div>
            <p className="eyebrow">SELECTED TALKS</p>
            {talksPreview.map(item => <PressRow item={item} key={item.org+item.title} />)}
          </div>
        </div>
        <details className="overview-inline-expand overview-press-expand">
          <summary><span>More press + speaking</span><span aria-hidden="true">＋</span></summary>
          <div className="overview-press-grid overview-expanded-list">
            <div>{morePress.map(item => <PressRow item={item} key={item.org+item.title} />)}</div>
            <div>{moreTalks.map(item => <PressRow item={item} key={item.org+item.title} />)}</div>
          </div>
        </details>
      </section>
      <section className="experiments section-pad">
        <div className="section-heading"><h2 className="section-title small-title">Experiments</h2></div>
        <div className="experiment-grid experiment-grid-four overview-experiment-grid">
          {experiments.map((item, index) => {
            if (index === 0) {
              return <Link className="experiment-card experiment-link overview-lab-card" href={item.href} key={item.title}>
                <div className="experiment-thumb exp-0">
                  <div className="lab-mini"><div className="lab-mini-bar">LAB.exe</div><div className="lab-mini-window"><span>IVONNE_OS</span><p>A more interesting internet.</p></div></div>
                </div>
                <div className="experiment-meta"><div><h3>{item.title}</h3><p>{item.meta}</p></div></div>
              </Link>;
            }

            const visualIndex = index - 1;
            return <Link href={item.href} className="lab-experiment-card overview-lab-experiment-card" key={item.title}>
              <div className={"lab-experiment-visual lab-experiment-visual-"+visualIndex}>
                <span>{visualIndex === 0 ? "EVE.exe" : visualIndex === 1 ? "CHAT.exe" : "SNAKE.exe"}</span>
                {visualIndex===0 ? <div className="lab-eve-prompt">ask me about<br/>the work_</div> : null}
                {visualIndex===1 ? <div className="lab-chat-lines"><i/><i/><i/></div> : null}
                {visualIndex===2 ? <div className="lab-snake-path">■ ■ ■ ■<br/>　　　■<br/>　　● ■</div> : null}
              </div>
              <div className="lab-experiment-copy overview-lab-experiment-copy">
                <span>{item.meta}</span>
                <h3>{item.title}</h3>
                <strong>View experiment →</strong>
              </div>
            </Link>;
          })}
        </div>
      </section>

      <section className="overview-library section-pad overview-anchor" id="library">
        <div className="section-heading"><h2 className="section-title small-title">Library</h2></div>
        <div className="overview-library-grid">
          {library.map(item => <Link href={item.href} className="overview-library-item" key={item.title}>
            <div><h3>{item.title}</h3></div><span>→</span>
          </Link>)}
        </div>
      </section>

      <section className="overview-writing-section section-pad">
        <div className="overview-writing">
          <div className="overview-writing-head"><h2 className="section-title small-title">Writing</h2></div>
          {writing.map(item => <WritingRow item={item} key={item.title} />)}
          <details className="overview-inline-expand">
            <summary><span>More writing</span><span aria-hidden="true">＋</span></summary>
            <div className="overview-expanded-list">{moreWriting.map(item => <WritingRow item={item} key={item.title} />)}</div>
          </details>
        </div>
      </section>

    </div>
  );
}
