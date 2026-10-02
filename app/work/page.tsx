const studies = [
  ["01", "Relationship Operating System", "AI + Systems", "A centralized system for turning a fragmented network into an actionable relationship pipeline."],
  ["02", "Brand + Digital Repositioning", "Strategy + Brand", "A clearer positioning and digital system designed to connect message, experience, and conversion."],
  ["03", "Creative Practice + Studio", "Strategy + Direction", "A multidisciplinary studio model spanning brand strategy, creative direction, systems, and execution."],
  ["04", "Tender Things Have Edges", "Art + Installation", "An installation exploring softness, structure, light, and the tension between protection and vulnerability."],
  ["05", "Painting + Material Studies", "Art Practice", "A growing body of work across acrylic, raw canvas, watercolor, ceramics, and mixed media."],
  ["06", "Personal Operating System", "Product + Experiment", "An experimental interface for work, notes, music, identity, and digital play."],
];

export default function WorkPage() {
  return (
    <section className="page section-pad">
      <p className="eyebrow">WORK / SELECTED PRACTICE</p>
      <div className="page-intro">
        <h1>Selected work across strategy, systems, and art.</h1>
        <p>
          Commercial work, independent experiments, and creative practice — organized around
          the ideas, problems, and forms that shaped them.
        </p>
      </div>

      <div className="work-filters">
        <span>All</span><span>Strategy</span><span>Systems</span><span>Art</span><span>Experiments</span>
      </div>

      <div className="case-list">
        {studies.map(([n, title, tag, desc]) => (
          <article className="case-row" key={n}>
            <span>{n}</span>
            <div><p className="eyebrow">{tag}</p><h2>{title}</h2></div>
            <p>{desc}</p>
            <span className="case-arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
