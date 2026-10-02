const notes = [
  ["Writing", "Portfolio careers", "Notes on building a career across teaching, strategy, art, and independent work."],
  ["Learning", "AI implementation", "Patterns I keep noticing when AI moves from demo to actual operating system."],
  ["Ideas", "Audacity", "A running note on asking, making, applying, and moving before certainty arrives."],
  ["Places", "Places worth returning to", "Travel notes, visual references, and small details I want to keep."],
  ["Practice", "Making across mediums", "What changes when an idea moves between painting, ceramics, systems, and words."],
];

const references = [
  "Books / essays",
  "Interfaces",
  "Places",
  "Objects",
  "Quotes",
  "Artists / studios",
];

export default function NotesPage() {
  return (
    <section className="page section-pad notes-page">
      <div className="page-intro notes-intro">
        <h1>Notes</h1>
        <p>
          An evolving index of ideas, references, learnings, places, and things I want to remember.
        </p>
      </div>

      <section className="notes-section">
        <div className="section-heading">
          <h2 className="section-title small-title">Working Notes</h2>
        </div>

        <div className="note-list">
          {notes.map(([type, title, desc], index) => (
            <article className="note-row note-row-rich" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="eyebrow">{type}</p>
                <h2>{title}</h2>
              </div>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="notes-section">
        <div className="section-heading">
          <h2 className="section-title small-title">References</h2>
        </div>
        <div className="reference-grid">
          {references.map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></div>
          ))}
        </div>
      </section>
    </section>
  );
}
