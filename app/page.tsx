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
    <div className="project-visual project-whitespace" aria-hidden="true"><span className="ws-orb" /><span className="ws-rib ws-rib-a" /><span className="ws-rib ws-rib-b" /><span className="ws-rib ws-rib-c" /></div>
  ) : index === 2 ? (
    <img className="project-photo project-art" src="https://drive.google.com/thumbnail?id=1eCnQkPPWiHQwzHHUeLwlDTgSJECXh1sk&sz=w1800" alt="What I Didn’t Say" />
  ) : index === 3 ? (
    <img className="project-photo project-gwl" src="data:image/webp;base64,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" alt="" />
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
