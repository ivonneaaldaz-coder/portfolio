import Link from "next/link";

export default function PersonalOSExperiment() {
  return (
    <article className="experiment-detail page section-pad">
      <Link className="back-link" href="/">← Overview</Link>
      <header className="experiment-detail-hero">
        <p className="eyebrow">EXPERIMENT / PERSONAL OS</p>
        <h1>A portfolio that behaves like a desktop.</h1>
        <p className="experiment-detail-dek">
          The Lab is a personal operating system for work, notes, art, music, experiments,
          and the odd thing that does not belong neatly anywhere else.
        </p>
        <a className="experiment-launch" href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">
          Open the Lab ↗︎
        </a>
      </header>

      <section className="experiment-detail-grid">
        <div><p className="eyebrow">THE IDEA</p><p>Make a portfolio feel less like a document and more like a place someone can explore.</p></div>
        <div><p className="eyebrow">THE SYSTEM</p><p>Windows, apps, search, notes, photos, games, music, and small interactions stitched into one evolving environment.</p></div>
        <div><p className="eyebrow">WHY IT STAYS MESSY</p><p>The Lab is intentionally allowed to remain experimental. It is where things can exist before they need a business case.</p></div>
      </section>
    </article>
  );
}
