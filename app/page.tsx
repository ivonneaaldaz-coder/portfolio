import Link from "next/link";

const features = [
  { n: "01", title: "The Lab", meta: "Ideas / Systems / Experiments", className: "feature feature-lab" },
  { n: "02", title: "Whitespace", meta: "Strategy / Brand / AI", className: "feature" },
  { n: "03", title: "Good World Living", meta: "Experiences / Places / Living", className: "feature" },
  { n: "04", title: "Art Practice", meta: "Painting / Ceramics / Installation", className: "feature" },
  { n: "05", title: "Travel", meta: "Photography / Notes / Places", className: "feature" },
];

const experiments = [
  ["01", "Ask Eve", "CV chatbot"],
  ["02", "Visual Systems", "UI studies"],
  ["03", "Motion Studies", "Interaction"],
  ["04", "Desktop", "Personal OS"],
  ["05", "Notes", "Ideas / References"],
];

export default function Home() {
  return (
    <>
      <section className="hero-compact section-pad">
        <div className="hero-kicker">A creative practice across strategy, technology, and art</div>
        <div className="hero-row">
          <h1>Strategy, creative direction, systems, and art.</h1>
          <p>
            I work across brand, technology, and creative practice — building thoughtful
            systems, visual worlds, and experiences with a point of view.
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
          {features.map((item, index) => (
            <article className={item.className} key={item.n}>
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
                ) : (
                  <div className={"image-placeholder image-" + index} />
                )}
              </div>

              <div className="feature-copy">
                <div>
                  <span className="feature-num">{item.n}</span>
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                </div>
                <span className="circle-arrow">→</span>
              </div>
            </article>
          ))}
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
            <h2 className="section-title small-title">Small things, big curiosity.</h2>
          </div>
          <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">View all experiments ↗</a>
        </div>

        <div className="experiment-grid">
          {experiments.map(([n, title, meta], index) => (
            <article className="experiment-card" key={title}>
              <div className={"experiment-thumb exp-" + index}>
                {index === 0 && <span>ask eve</span>}
                {index === 4 && <span>NOTES<br/>• Ideas<br/>• Places<br/>• Quotes</span>}
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
            <li>Teaching marketing</li>
            <li>Making and exhibiting art</li>
            <li>Exploring what’s next</li>
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
