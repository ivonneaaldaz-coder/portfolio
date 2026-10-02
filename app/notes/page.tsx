import Link from "next/link";

const notes = [
  {
    type: "Writing",
    title: "Portfolio careers",
    desc: "Notes on building a career across teaching, strategy, art, and independent work.",
    href: "/notes/portfolio-careers",
    destination: "Read",
  },
  {
    type: "Learning",
    title: "AI implementation",
    desc: "Patterns I keep noticing when AI moves from demo to actual operating system.",
    href: "https://www.bywhitespace.com/",
    destination: "Whitespace",
    external: true,
  },
  {
    type: "Ideas",
    title: "Audacity",
    desc: "A running note on asking, making, applying, and moving before certainty arrives.",
    href: "/notes/audacity",
    destination: "Read",
  },
  {
    type: "Places",
    title: "Places worth returning to",
    desc: "Travel notes, visual references, and small details I want to keep.",
    href: "/travel",
    destination: "Travel",
  },
  {
    type: "Practice",
    title: "Making across mediums",
    desc: "What changes when an idea moves between painting, ceramics, systems, and words.",
    href: "/notes/making-across-mediums",
    destination: "Read",
  },
];

const references = [
  { title: "Books / essays", desc: "Writing worth returning to." },
  { title: "Visual references", desc: "Moodboards, typography, imagery, color, interiors, and visual things I want to keep." },
  { title: "Places", desc: "Travel, architecture, landscapes, and spaces.", href: "/travel" },
  { title: "Quotes", desc: "Lines worth keeping." },
];

export default function NotesPage() {
  return (
    <section className="page section-pad notes-page">
      <div className="page-intro notes-intro">
        <h1>Notes</h1>
        <p>An evolving index of ideas, references, learnings, places, and things I want to remember.</p>
      </div>

      <section className="notes-section">
        <div className="section-heading">
          <h2 className="section-title small-title">Working Notes</h2>
        </div>

        <div className="note-list">
          {notes.map((note, index) => {
            const content = (
              <>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="eyebrow">{note.type}</p>
                  <h2>{note.title}</h2>
                </div>
                <p>{note.desc}</p>
                <span className="note-destination">{note.destination} {note.external ? "↗" : "→"}</span>
              </>
            );

            return note.external ? (
              <a className="note-row note-row-rich note-link" href={note.href} target="_blank" rel="noreferrer" key={note.title}>
                {content}
              </a>
            ) : (
              <Link className="note-row note-row-rich note-link" href={note.href} key={note.title}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="notes-section">
        <div className="section-heading">
          <h2 className="section-title small-title">References</h2>
        </div>

        <div className="reference-grid reference-grid-four">
          {references.map((item, index) =>
            item.href ? (
              <Link className="reference-card reference-card-link" href={item.href} key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <span className="reference-arrow">→</span>
              </Link>
            ) : (
              <div className="reference-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </section>
  );
}
