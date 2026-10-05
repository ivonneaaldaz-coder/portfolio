import Link from "next/link";
import { driveImageUrl, listDriveFolder, normalizeDriveName } from "@/lib/googleDrive";

const PROJECT_FOLDER = "1hpdPGeKX8nISrESD0EAzdCeAoVCnnnl7";

const features = [
  { title: "Whitespace", meta: "Strategy / Brand / AI", className: "feature", href: "https://www.bywhitespace.com/", external: true, driveKey:"whitespace" },
  { title: "Art Practice", meta: "Painting / Ceramics / Design", className: "feature", href: "/art", driveKey:"art practice" },
  { title: "Good World Living", meta: "Experiences / Places / Objects", className: "feature", href: "https://www.goodworldliving.com/", external: true, driveKey:"good world living" },
  { title: "Travel", meta: "Places / Photography / Reflections", className: "feature", href: "/travel", driveKey:"travel" },
];

const studies = [
  ["Future of Marketing", "7K → 50K+ subscribers", "Built and grew TINT’s owned-media platform across newsletters, webinars, podcasts, events, and industry programming.", "/work/future-of-marketing"],
  ["Research-Led Content Engine", "Research → year of campaigns", "Turned original research and expert interviews into a report, press, blogs, social, newsletters, nurture, and demand-generation campaigns.", "/work/research-led-content-engine"],
  ["Relationship Operating System", "Systems + CRM", "Turned fragmented contacts and follow-ups into an actionable relationship pipeline for a small team.", "/work/relationship-operating-system"],
];

const experiments = [
  { title:"The Lab", meta:"Ideas / systems / experiments", href:"https://lab.ivonnealdaz.com", external:true },
  { title:"Ask Eve", meta:"Conversational CV", href:"/experiments/ask-eve" },
  { title:"Chatroom", meta:"Public internet experiment", href:"/experiments/chatroom" },
  { title:"Snake", meta:"Game + global leaderboard", href:"/experiments/snake" },
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

const pressPreview = [
  ["Forbes", "Why Retailers Should Utilize TikTok to Grow Their Business", "2021"],
  ["Adweek", "How Micro and Nano Influencers Drive Big Change", "2021"],
  ["Digiday", "In the Metaverse, Brands’ FOMO Is Competing With Consumers’ Burnout", "2024"],
];

const talksPreview = [
  ["Adweek Social Media Week", "The Power of Community-Created Content", "2022"],
  ["San Antonio Startup Week", "Future of Marketing Live Podcast — Spurs Director of Content Strategy", "2023"],
  ["Hootsuite", "State of UGC — Virtual Panel", "2023"],
];

export default async function OverviewPage() {
  const projectFiles = await listDriveFolder(PROJECT_FOLDER);
  const projectImages = new Map(projectFiles.map(file => [normalizeDriveName(file.name), driveImageUrl(file.id)]));

  return (
    <div className="overview-page">
      <section className="hero-compact section-pad" id="overview">
        <div className="hero-row">
          <h1>Strategy, technology, art.</h1>
          <p>I work across brand, systems, and creative practice — building digital tools, visual worlds, and experiences.</p>
        </div>
      </section>

      <section className="selected section-pad overview-anchor" id="work">
        <div className="section-heading">
          <h2 className="section-title">Current Work</h2>
          <Link href="/work">View all work →</Link>
        </div>

        <div className="feature-grid">
          {features.map((item, index) => {
            const image = item.driveKey ? projectImages.get(item.driveKey) : null;
            const content = (
              <>
                <div className="feature-media">
                  {image ? <img className="project-photo" src={image} alt="" /> : null}
                </div>
                <div className="feature-copy">
                  <div><h3>{item.title}</h3><p>{item.meta}</p></div>
                  <span className="circle-arrow">→</span>
                </div>
              </>
            );

            return item.external ? (
              <a className={item.className} key={item.title} href={item.href} target="_blank" rel="noreferrer">{content}</a>
            ) : (
              <Link className={item.className} key={item.title} href={item.href}>{content}</Link>
            );
          })}
        </div>
      </section>

      <section className="home-cases section-pad">
        <div className="section-heading">
          <h2 className="section-title small-title">Selected Case Studies</h2>
          <Link href="/work#case-studies">View all →</Link>
        </div>
        <div className="home-case-list">
          {studies.map(([title,tag,desc,href]) => (
            <Link className="home-case" href={href} key={title}>
              <div><h3>{title}</h3><span className="home-case-tag">{tag}</span></div>
              <p>{desc}</p><span>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="experiments section-pad">
        <div className="section-heading">
          <h2 className="section-title small-title">Experiments</h2>
          <Link href="/work#experiments">View all →</Link>
        </div>
        <div className="experiment-grid experiment-grid-four">
          {experiments.map((item, index) => {
            const card = (
              <>
                <div className={"experiment-thumb exp-" + index}>
                  {index === 0 && (
                    <div className="lab-mini">
                      <div className="lab-mini-bar">LAB.exe</div>
                      <div className="lab-mini-window"><span>IVONNE_OS</span><p>A more interesting internet.</p></div>
                    </div>
                  )}
                  {index === 1 && <span>ask eve</span>}
                  {index === 2 && <span className="system-mini">CHAT<br/>ROOM.exe</span>}
                  {index === 3 && <span className="snake-mini">SNAKE.exe<br/>↑ ↓ ← →</span>}
                </div>
                <div className="experiment-meta"><div><h3>{item.title}</h3><p>{item.meta}</p></div></div>
              </>
            );
            return item.external
              ? <a className="experiment-card experiment-link" href={item.href} target="_blank" rel="noreferrer" key={item.title}>{card}</a>
              : <Link className="experiment-card experiment-link" href={item.href} key={item.title}>{card}</Link>;
          })}
        </div>
      </section>

      <section className="overview-library section-pad overview-anchor" id="library">
        <div className="section-heading">
          <h2 className="section-title small-title">Library</h2>
          <Link href="/library">Open the library →</Link>
        </div>
        <div className="overview-library-grid">
          {library.map(item => (
            <Link href={item.href} className="overview-library-item" key={item.title}>
              <div><h3>{item.title}</h3><p>{item.meta}</p></div><span>→</span>
            </Link>
          ))}
        </div>

        <div className="overview-writing">
          <div className="overview-writing-head"><h2 className="section-title small-title">Writing</h2><Link href="/library">View all →</Link></div>
          {writing.map(item => (
            <a href={item.href} target="_blank" rel="noreferrer" className="overview-writing-row" key={item.title}>
              <h4>{item.title}</h4><p>{item.source}</p><span>↗︎</span>
            </a>
          ))}
        </div>
      </section>

      <section className="overview-press section-pad overview-anchor" id="press">
        <div className="section-heading">
          <h2 className="section-title small-title">Press + Speaking</h2>
          <Link href="/press">View all →</Link>
        </div>
        <div className="overview-press-grid">
          <div>
            <p className="eyebrow">SELECTED PRESS</p>
            {pressPreview.map(([org,title,year]) => (
              <div className="overview-press-row" key={org+title}><span>{year}</span><div><p>{org}</p><h3>{title}</h3></div></div>
            ))}
          </div>
          <div>
            <p className="eyebrow">SELECTED TALKS</p>
            {talksPreview.map(([org,title,year]) => (
              <div className="overview-press-row" key={org+title}><span>{year}</span><div><p>{org}</p><h3>{title}</h3></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="footer-grid section-pad overview-anchor" id="about">
        <div className="footer-about">
          <p className="eyebrow">ABOUT</p>
          <h2>I move between strategy, technology, and art.</h2>
          <Link href="/about">More about me →</Link>
        </div>
        <div>
          <p className="eyebrow">CURRENTLY</p>
          <ul><li>Building digital systems</li><li>Teaching marketing + entrepreneurship</li><li>Making and exhibiting art</li><li>Developing Good World Living</li></ul>
        </div>
        <div>
          <p className="eyebrow">LET’S CONNECT</p>
          <p className="muted">For work, exhibitions, collaborations, or conversation.</p>
          <a className="pill-link" href="mailto:hello@ivonnealdaz.com">Get in touch →</a>
        </div>
      </section>
    </div>
  );
}
