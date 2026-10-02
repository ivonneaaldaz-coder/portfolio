import Link from "next/link";

const studies = [
  {
    n: "01",
    title: "Relationship Operating System",
    tag: "AI + Systems",
    desc: "A centralized relationship system that turns scattered contacts, introductions, and follow-ups into an actionable pipeline.",
    href: "/work/relationship-operating-system",
  },
  {
    n: "02",
    title: "Brand + Digital Repositioning",
    tag: "Strategy + Brand",
    desc: "A clearer positioning and digital experience designed to connect message, customer journey, and conversion.",
    href: "/work/brand-digital-repositioning",
  },
  {
    n: "03",
    title: "AI-Assisted Lead Engine",
    tag: "Automation + Operations",
    desc: "A lightweight automation system for capturing inbound leads, structuring information, and surfacing next actions.",
    href: "/work/ai-assisted-lead-engine",
  },
];

const practice = [
  ["Whitespace", "Strategy studio", "https://www.bywhitespace.com/", true],
  ["The Lab", "Digital experiments", "https://lab.ivonnealdaz.com", true],
  ["Art Practice", "Painting / ceramics / installation", "/art", false],
  ["Travel", "Photography / places", "/travel", false],
  ["Good World Living", "Experiences / places / living", "https://www.goodworldliving.com/", true],
];

export default function WorkPage() {
  return (
    <section className="page section-pad work-index">
      <div className="page-intro">
        <h1>Work across strategy, systems, brand, and creative practice.</h1>
        <p>
          Selected case studies, independent projects, and ongoing bodies of work.
        </p>
      </div>

      <section className="work-section">
        <div className="section-heading">
          <h2 className="section-title small-title">Case Studies</h2>
        </div>

        <div className="case-list">
          {studies.map((study) => (
            <Link className="case-row" href={study.href} key={study.n}>
              <span>{study.n}</span>
              <div>
                <p className="eyebrow">{study.tag}</p>
                <h2>{study.title}</h2>
              </div>
              <p>{study.desc}</p>
              <span className="case-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="work-section work-practice">
        <div className="section-heading">
          <h2 className="section-title small-title">Projects</h2>
        </div>

        <div className="practice-index">
          {practice.map(([title, meta, href, external], index) =>
            external ? (
              <a className="practice-row" href={href as string} target="_blank" rel="noreferrer" key={title as string}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{meta}</p>
                <span>↗</span>
              </a>
            ) : (
              <Link className="practice-row" href={href as string} key={title as string}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{meta}</p>
                <span>↗</span>
              </Link>
            )
          )}
        </div>
      </section>
    </section>
  );
}
