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
    <img className="project-photo project-gwl" src="data:image/webp;base64,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[...omitted for brevity...]" alt="" />
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
