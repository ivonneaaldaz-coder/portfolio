import Link from "next/link";

const features = [
  { title: "The Lab", meta: "Ideas / Systems / Experiments", className: "feature feature-lab", href: "https://lab.ivonnealdaz.com", external: true },
  { title: "Whitespace", meta: "Strategy / Brand / AI", className: "feature", href: "https://www.bywhitespace.com/", external: true },
  { title: "Art Practice", meta: "Painting / Ceramics / Design", className: "feature", href: "/art" },
  { title: "Good World Living", meta: "Experiences / Places / Objects", className: "feature", href: "https://www.goodworldliving.com/", external: true },
  { title: "Travel", meta: "Places / Photography / Reflections", className: "feature", href: "/travel" },
];

const studies = [
  ["Relationship Operating System", "Systems + CRM", "A system for turning fragmented contacts and follow-ups into an actionable relationship pipeline.", "/work/relationship-operating-system"],
  ["Brand + Digital Repositioning", "Brand + Digital", "Connecting positioning, message, experience, and execution into one clearer system.", "/work/brand-digital-repositioning"],
  ["AI-Assisted Lead Engine", "AI + Automation", "Turning messy inbound information into structured records, priorities, and next actions.", "/work/ai-assisted-lead-engine"],
];

const experiments = [
  ["Ask Eve", "Conversational CV", "/experiments/ask-eve"],
  ["Chatroom", "Public internet experiment", "/experiments/chatroom"],
  ["Snake", "Game + global leaderboard", "/experiments/snake"],
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
                  ) : index === 1 ? (
    <img className="project-photo project-whitespace-photo" src="data:image/webp;base64,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" alt="" />
  ) : index === 2 ? (
    <img className="project-photo project-art" src="https://drive.google.com/thumbnail?id=1eCnQkPPWiHQwzHHUeLwlDTgSJECXh1sk&sz=w1800" alt="What I Didn’t Say" />
  ) : index === 3 ? (
    <img className="project-photo project-gwl" src="https://cdn.prod.website-files.com/5fc29a3f3f9d357d704a8951/6743dcb1fa628ec9c79e5002_Ivonne-Aldaz_La-Roane.png" alt="La Roane in St. Antonin-Noble-Val, France" />
  ) : (
    <img className="project-photo project-travel" src="https://drive.google.com/thumbnail?id=1O4kpRXNiIwgR8KqSCwDqD53o664Ku4Ee&sz=w1800" alt="Lago di Braies, Italy" />
  )}
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
          <Link href="/work">View all ↗︎</Link>
        </div>
        <div className="home-case-list">
          {studies.map(([title,tag,desc,href]) => (
            <Link className="home-case" href={href} key={title}>
              <div><h3>{title}</h3></div>
              <p>{desc}</p><span>↗︎</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="experiments section-pad">
        <div className="section-heading">
          <h2 className="section-title small-title">Experiments</h2>
          <Link href="/work#experiments">View all ↗︎</Link>
        </div>
        <div className="experiment-grid experiment-grid-three">
          {experiments.map(([title,meta,href], index) => (
            <Link className="experiment-card experiment-link" href={href} key={title}>
              <div className={"experiment-thumb exp-" + index}>
                {index === 0 && <span>ask eve</span>}
                {index === 1 && <span className="system-mini">CHAT<br/>ROOM.exe</span>}
                {index === 2 && <span className="snake-mini">SNAKE.exe<br/>↑ ↓ ← →</span>}
              </div>
              <div className="experiment-meta">
                <div><h3>{title}</h3><p>{meta}</p></div>
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
