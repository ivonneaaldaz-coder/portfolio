import Link from "next/link";

const features = [
  { n: "01", title: "The Lab", meta: "Ideas / Systems / Experiments", className: "feature feature-lab", href: "https://lab.ivonnealdaz.com", external: true },
  { n: "02", title: "Whitespace", meta: "Strategy / Brand / AI", className: "feature", href: "https://www.bywhitespace.com/", external: true },
  { n: "03", title: "Art Practice", meta: "Painting / Ceramics / Installation", className: "feature", href: "/art" },
  { n: "04", title: "Good World Living", meta: "Experiences / Places / Living", className: "feature", href: "https://www.goodworldliving.com/", external: true },
  { n: "05", title: "Travel", meta: "Photography / Notes / Places", className: "feature", href: "/travel" },
];

const studies = [
  ["01", "Relationship Operating System", "Systems + CRM", "A system for turning fragmented contacts and follow-ups into an actionable relationship pipeline.", "/work/relationship-operating-system"],
  ["02", "Brand + Digital Repositioning", "Brand + Digital", "Connecting positioning, message, experience, and execution into one clearer system.", "/work/brand-digital-repositioning"],
  ["03", "AI-Assisted Lead Engine", "AI + Automation", "Turning messy inbound information into structured records, priorities, and next actions.", "/work/ai-assisted-lead-engine"],
];

const experiments = [
  ["01", "Ask Eve", "Conversational CV", "/experiments/ask-eve"],
  ["02", "Chatroom", "Public internet experiment", "/experiments/chatroom"],
  ["03", "Snake", "Game + global leaderboard", "/experiments/snake"],
];

export default function Home() {
  return (
    <>
      <section className="hero-compact section-pad">
        <div className="hero-row">
          <h1>Strategy, technology, art.</h1>
          <p>I work across brand, systems, and creative practice — building digital tools, visual worlds, and experiences.</p>
        </div>
      </section>

      <section className="selected section-pad">
        <div className="section-heading">
          <h2 className="section-title">Projects</h2>
          <Link href="/work">Explore all ↗︎</Link>
        </div>

        <div className="feature-grid">
          {features.map((item, index) => {
            const content = (
              <>
                <div className="feature-media">
                  {index === 0 ? (
                    <div className="retro-shell">
                      <div className="retro-bar">LAB.exe <span>— □ ×</span></div>
                      <div className="retro-desktop">
                        <div className="retro-icon">LAB</div>
                        <div className="retro-icon">NOTES</div>
                        <div className="retro-icon">ASK EVE</div>
                        <div className="retro-window">
                          <div className="retro-window-head">IVONNE_OS</div>
                          <p>A more interesting internet.</p>
                        </div>
                      </div>
                    </div>
                  ) : <div className={"image-placeholder image-" + index} />}
                </div>
                <div className="feature-copy">
                  <div><span className="feature-num">{item.n}</span><h3>{item.title}</h3><p>{item.meta}</p></div>
                  <span className="circle-arrow">→</span>
                </div>
              </>
            );

            return item.external ? (
              <a className={item.className} key={item.n} href={item.href} target="_blank" rel="noreferrer">{content}</a>
            ) : (
              <Link className={item.className} key={item.n} href={item.href}>{content}</Link>
            );
          })}
        </div>
      </section>

      <section className="home-cases section-pad">
        <div className="section-heading">
          <h2 className="section-title small-title">Selected Case Studies</h2>
          <Link href="/work">View all case studies ↗︎</Link>
        </div>
        <div className="home-case-list">
          {studies.map(([n,title,tag,desc,href]) => (
            <Link className="home-case" href={href} key={n}>
              <span className="home-case-num">{n}</span>
              <div><h3>{title}</h3></div>
              <p>{desc}</p><span>↗︎</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="experiments section-pad">
        <div className="section-heading">
          <h2 className="section-title small-title">Experiments</h2>
          <Link href="/work#experiments">View all experiments ↗︎</Link>
        </div>
        <div className="experiment-grid experiment-grid-three">
          {experiments.map(([n,title,meta,href], index) => (
            <Link className="experiment-card experiment-link" href={href} key={title}>
              <div className={"experiment-thumb exp-" + index}>
                {index === 0 && <span>ask eve</span>}
                {index === 1 && <span className="system-mini">CHAT<br/>ROOM.exe</span>}
                {index === 2 && <span className="snake-mini">SNAKE.exe<br/>↑ ↓ ← →</span>}
              </div>
              <div className="experiment-meta">
                <span>{n}</span><div><h3>{title}</h3><p>{meta}</p></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="footer-grid section-pad">
        <div className="footer-about">
          <p className="eyebrow">ABOUT</p>
          <h2>I move between strategy, technology, and art.</h2>
          <Link href="/about">More about me ↗︎</Link>
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
    </>
  );
}
