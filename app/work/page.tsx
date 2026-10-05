import Link from "next/link";

const featured = [
  { title:"Future of Marketing", tag:"7K → 50K+ subscribers", desc:"Built and grew TINT’s owned-media platform across newsletters, webinars, podcasts, events, and industry programming.", href:"/work/future-of-marketing" },
  { title:"Research-Led Content Engine", tag:"Research → year of campaigns", desc:"Turned original research and expert interviews into a report, press, blogs, social, newsletters, nurture, and demand-generation campaigns.", href:"/work/research-led-content-engine" },
  { title:"Relationship Operating System", tag:"Systems + CRM", desc:"A centralized relationship system that turns scattered contacts, introductions, and follow-ups into an actionable pipeline.", href:"/work/relationship-operating-system" },
];

const moreStudies = [
  { title:"Brand + Digital Repositioning", meta:"Brand / Digital / Campaign", desc:"Connected positioning, message, website, sales materials, and campaigns into one clearer customer journey.", href:"/work/brand-digital-repositioning" },
  { title:"AI-Assisted Lead Engine", meta:"AI / Automation / Operations", desc:"Designed a lightweight workflow for turning messy inbound information into structured records, priorities, and next actions.", href:"/work/ai-assisted-lead-engine" },
  { title:"Veggies Made Great — Omelet Naming + Positioning", meta:"Research / Naming / Consumer Insights", desc:"Consumer research used to evaluate language, product naming, associations, clarity, and purchase appeal." },
  { title:"Purina — Consumer Insights Research", meta:"Research / Consumer Insights", desc:"Research designed to uncover audience behavior, perceptions, and actionable implications for the brand." },
  { title:"Gaia Herbs — Brand + Consumer Insights", meta:"Research / Brand Strategy", desc:"Insight work connecting consumer needs, perceptions, and category context to clearer brand decisions." },
  { title:"ARM & HAMMER — Consumer Insights Research", meta:"Research / Consumer Insights", desc:"Consumer research translated into strategic findings and recommendations for brand and marketing teams." },
];

const projects = [
  ["Whitespace","Strategy studio","https://www.bywhitespace.com/",true],
  ["Make Space","Creative workshops + experiences","https://www.instagram.com/makespace______/",true],
  ["Good World Living","Experiences / places / living","https://www.goodworldliving.com/",true],
  ["Art Practice","Painting / ceramics / design","/art",false],
  ["Travel","Photography / places","/travel",false],
];

const experiments = [
  { title:"The Lab", meta:"Ideas / systems / experiments", href:"https://lab.ivonnealdaz.com", external:true },
  { title:"Ask Eve", meta:"Conversational CV", href:"/experiments/ask-eve" },
  { title:"Chatroom", meta:"Public internet experiment", href:"/experiments/chatroom" },
  { title:"Snake", meta:"Game + global leaderboard", href:"/experiments/snake" },
];

export default function WorkPage() {
  return (
    <section className="page section-pad work-index">
      <div className="page-intro">
        <h1>Work across strategy, systems, brand, and creative practice.</h1>
        <p>Selected case studies, independent projects, and ongoing bodies of work.</p>
      </div>

      <section className="work-section" id="case-studies">
        <div className="section-heading"><h2 className="section-title small-title">Featured Case Studies</h2></div>
        <div className="case-list">
          {featured.map((study) => (
            <Link className="case-row" href={study.href} key={study.title}>
              <div className="case-row-title"><h2>{study.title}</h2><span className="case-row-tag">{study.tag}</span></div>
              <p className="case-row-desc">{study.desc}</p><span className="case-arrow">→</span>
            </Link>
          ))}
        </div>

        <details className="more-case-studies">
          <summary><span>More case studies</span><span aria-hidden="true">＋</span></summary>
          <div className="more-case-list">
            {moreStudies.map((study) => study.href ? (
              <Link className="more-case-row" href={study.href} key={study.title}>
                <div><h3>{study.title}</h3><p>{study.meta}</p></div><p>{study.desc}</p><span>→</span>
              </Link>
            ) : (
              <div className="more-case-row" key={study.title}>
                <div><h3>{study.title}</h3><p>{study.meta}</p></div><p>{study.desc}</p><span>—</span>
              </div>
            ))}
          </div>
        </details>
      </section>

      <section className="work-section work-practice">
        <div className="section-heading"><h2 className="section-title small-title">Projects</h2></div>
        <div className="practice-index">
          {projects.map(([title,meta,href,external]) =>
            external ? (
              <a className="practice-row" href={href as string} target="_blank" rel="noreferrer" key={title as string}>
                <div><h3>{title}</h3><p>{meta}</p></div><span>↗︎</span>
              </a>
            ) : (
              <Link className="practice-row" href={href as string} key={title as string}>
                <div><h3>{title}</h3><p>{meta}</p></div><span>→</span>
              </Link>
            )
          )}
        </div>
      </section>

      <section className="work-section" id="experiments">
        <div className="section-heading"><h2 className="section-title small-title">Experiments</h2></div>
        <div className="experiment-grid experiment-grid-four work-experiment-grid">
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
    </section>
  );
}
