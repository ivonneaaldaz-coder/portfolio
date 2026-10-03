import Link from "next/link";

const studies = [
  { n:"01", title:"Relationship Operating System", tag:"Systems + CRM", desc:"A centralized relationship system that turns scattered contacts, introductions, and follow-ups into an actionable pipeline.", href:"/work/relationship-operating-system" },
  { n:"02", title:"Brand + Digital Repositioning", tag:"Brand + Digital", desc:"A clearer positioning and digital experience designed to connect message, customer journey, and conversion.", href:"/work/brand-digital-repositioning" },
  { n:"03", title:"AI-Assisted Lead Engine", tag:"AI + Automation", desc:"A lightweight automation system for capturing inbound leads, structuring information, and surfacing next actions.", href:"/work/ai-assisted-lead-engine" },
];

const projects = [
  ["Whitespace","Strategy studio","https://www.bywhitespace.com/",true],
  ["The Lab","Digital experiments","https://lab.ivonnealdaz.com",true],
  ["Make Space","Creative workshops + experiences","https://www.instagram.com/makespace______/",true],
  ["Good World Living","Experiences / places / living","https://www.goodworldliving.com/",true],
  ["Art Practice","Painting / ceramics / installation","/art",false],
  ["Travel","Photography / places","/travel",false],
];

const experiments = [
  ["Ask Eve","Conversational CV","/experiments/ask-eve"],
  ["Chatroom","Public internet experiment","/experiments/chatroom"],
  ["Snake","Game + global leaderboard","/experiments/snake"],
];

export default function WorkPage() {
  return (
    <section className="page section-pad work-index">
      <div className="page-intro">
        <h1>Work across strategy, systems, brand, and creative practice.</h1>
        <p>Selected case studies, independent projects, and ongoing bodies of work.</p>
      </div>

      <section className="work-section">
        <div className="section-heading"><h2 className="section-title small-title">Case Studies</h2></div>
        <div className="case-list">
          {studies.map((study) => (
            <Link className="case-row" href={study.href} key={study.n}>
              <span>{study.n}</span>
              <div><h2>{study.title}</h2></div>
              <p>{study.desc}</p><span className="case-arrow">↗︎</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="work-section work-practice">
        <div className="section-heading"><h2 className="section-title small-title">Projects</h2></div>
        <div className="practice-index">
          {projects.map(([title,meta,href,external],index) =>
            external ? (
              <a className="practice-row" href={href as string} target="_blank" rel="noreferrer" key={title as string}>
                <span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{meta}</p><span>↗︎</span>
              </a>
            ) : (
              <Link className="practice-row" href={href as string} key={title as string}>
                <span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{meta}</p><span>→</span>
              </Link>
            )
          )}
        </div>
      </section>

      <section className="work-section" id="experiments">
        <div className="section-heading"><h2 className="section-title small-title">Experiments</h2></div>
        <div className="practice-index">
          {experiments.map(([title,meta,href],index) => (
            <Link className="practice-row" href={href} key={title}>
              <span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{meta}</p><span>→</span>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
