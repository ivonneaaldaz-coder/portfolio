const studies = [
  ["01", "Relationship Operating System", "AI + Systems", "A centralized system for turning a fragmented network into an actionable relationship pipeline."],
  ["02", "AI-Assisted Lead Engine", "Automation + Operations", "An intake and prioritization workflow designed to reduce manual sorting and surface next actions."],
  ["03", "Brand + Digital Repositioning", "Strategy + Brand", "A repositioning system spanning messaging, digital experience, campaigns, and sales enablement."],
  ["04", "Personal Operating System", "Product + Experiment", "An experimental interface for work, notes, music, identity, and digital play."],
];

export default function WorkPage() {
  return (
    <section className="page section-pad">
      <p className="eyebrow">WORK / CASE STUDIES</p>
      <div className="page-intro">
        <h1>Selected problems I’ve helped solve.</h1>
        <p>Strategy, systems, brand, product, and creative work — framed around the problem, approach, and outcome rather than the client logo.</p>
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
