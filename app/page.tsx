import Link from "next/link";

const features = [
  { n: "01", title: "The Lab", meta: "Ideas / Systems / Experiments", className: "feature feature-lab", href: "https://lab.ivonnealdaz.com", external: true },
  { n: "02", title: "Whitespace", meta: "Strategy / Brand / AI", className: "feature", href: "https://www.bywhitespace.com/", external: true },
  { n: "03", title: "Good World Living", meta: "Experiences / Places / Living", className: "feature", href: "https://www.goodworldliving.com/", external: true },
  { n: "04", title: "Art Practice", meta: "Painting / Ceramics / Installation", className: "feature", href: "/work" },
  { n: "05", title: "Travel", meta: "Photography / Notes / Places", className: "feature", href: "/archive" },
];

const experiments = [
  ["01", "Ask Eve", "Conversational CV"],
  ["02", "Personal OS", "Digital playground"],
  ["03", "Visual Systems", "Interface studies"],
  ["04", "Notes", "Ideas / References / Places"],
];

export default function Home() {
  return (
    <>
      <section className="hero-compact section-pad">
        <div className="hero-row">
          <h1>Strategy, technology, art.</h1>
          <p>
            I work across brand, systems, and creative practice — building digital tools,
            visual worlds, and experiences.
          </p>
        </div>
      </section>

      <section className="selected section-pad">
        <div className="section-heading">
          <div>
            <h2 className="section-title">Projects</h2>
          </div>
          <Link href="/work">Explore all ↗</Link>
        </div>

        <div className="feature-grid">
          {features.map((item, index) => {
            const content = (
              <>
                <div className="feature-media">
                  {index === 0 && (
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
                  )}

                  {index === 1 && (
                    <div className="whitespace-visual">
                      <div className="ws-index">01 / 04</div>
                      <div className="ws-wordmark">WHITESPACE</div>
                      <div className="ws-statement">CLARITY IS A<br/>COMPETITIVE<br/>ADVANTAGE.</div>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="gwl-visual">
                      <div className="gwl-horizon" />
                      <div className="gwl-copy">
                        <span>GOOD WORLD LIVING</span>
                        <strong>ART. TRAVEL.<br/>THE LIFE IN BETWEEN.</strong>
                      </div>
                    </div>
                  )}

                  {index > 2 && <div className={"image-placeholder image-" + index} />}
                </div>

                <div className="feature-copy">
                  <div>
                    <span className="feature-num">{item.n}</span>
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                  </div>
                  <span className="circle-arrow">→</span>
                </div>
              </>
            );

            return item.external ? (
              <a className={item.className} key={item.n} href={item.href} target="_blank" rel="noreferrer">
                {content}
              </a>
            ) : (
              <Link className={item.className} key={item.n} href={item.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-cases section-pad">
        <div className="section-heading">
          <div>
            <h2 className="section-title small-title">Selected Case Studies</h2>
          </div>
          <Link href="/work">View all case studies ↗</Link>
        </div>

        <div className="home-case-list">
          <Link className="home-case" href="/work">
            <span className="home-case-num">01</span>
            <div>
              <p className="eyebrow">AI + SYSTEMS</p>
              <h3>Relationship Operating System</h3>
            </div>
            <p>Turning scattered relationships, introductions, and follow-ups into a system people can actually use.</p>
            <span>↗</span>
          </Link>

          <Link className="home-case" href="/work">
            <span className="home-case-num">02</span>
            <div>
              <p className="eyebrow">STRATEGY + BRAND</p>
              <h3>Brand + Digital Repositioning</h3>
            </div>
            <p>Connecting positioning, messaging, digital experience, and execution into a clearer growth system.</p>
            <span>↗</span>
          </Link>

          <Link className="home-case" href="/work">
            <span className="home-case-num">03</span>
            <div>
              <p className="eyebrow">AUTOMATION + OPERATIONS</p>
              <h3>AI-Assisted Lead Engine</h3>
            </div>
            <p>Reducing manual sorting and turning fragmented inbound information into priorities and next actions.</p>
            <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="experiments section-pad">
        <div className="section-heading">
          <div>
            <h2 className="section-title small-title">Experiments</h2>
          </div>
          <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">View all experiments ↗</a>
        </div>

        <div className="experiment-grid">
          {experiments.map(([n, title, meta], index) => (
            <article className="experiment-card" key={title}>
              <div className={"experiment-thumb exp-" + index}>
                {index === 0 && <span>ask eve</span>}
                {index === 1 && <span className="os-mini">IVONNE_OS<br/>LAB / NOTES / PLAY</span>}
                {index === 2 && <span className="system-mini">Aa<br/>01 02 03</span>}
                {index === 3 && <span>NOTES<br/>• Ideas<br/>• Places<br/>• Quotes</span>}
              </div>
              <div className="experiment-meta">
                <span>{n}</span>
                <div><h3>{title}</h3><p>{meta}</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="footer-grid section-pad">
        <div className="footer-about">
          <p className="eyebrow">ABOUT</p>
          <h2>I move between strategy, technology, and art.</h2>
          <Link href="/about">More about me ↗</Link>
        </div>

        <div>
          <p className="eyebrow">CURRENTLY</p>
          <ul>
            <li>Building digital systems</li>
            <li>Teaching marketing + entrepreneurship</li>
            <li>Making and exhibiting art</li>
            <li>Developing Good World Living</li>
          </ul>
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
