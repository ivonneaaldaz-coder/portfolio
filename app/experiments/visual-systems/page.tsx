import Link from "next/link";

export default function VisualSystemsExperiment() {
  return (
    <article className="experiment-detail page section-pad">
      <Link className="back-link" href="/">← Overview</Link>
      <header className="experiment-detail-hero">
        <p className="eyebrow">EXPERIMENT / VISUAL SYSTEMS</p>
        <h1>Small studies in interface, hierarchy, and interaction.</h1>
        <p className="experiment-detail-dek">
          A place for interface studies, visual systems, interaction ideas, and digital details
          that may or may not become full projects.
        </p>
      </header>

      <section className="experiment-detail-grid">
        <div><p className="eyebrow">WHAT LIVES HERE</p><p>Navigation experiments, type systems, component studies, motion ideas, and little interactions worth testing.</p></div>
        <div><p className="eyebrow">STATUS</p><p>Ongoing collection. This page will grow as individual studies are documented.</p></div>
        <div><p className="eyebrow">RELATED</p><p><a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">Explore the Lab ↗</a></p></div>
      </section>
    </article>
  );
}
