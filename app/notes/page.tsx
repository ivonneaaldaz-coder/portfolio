import Link from "next/link";

const notes = [
  {
    title: "Portfolio careers",
    desc: "Notes on building a career across teaching, strategy, art, and independent work.",
    href: "/notes/portfolio-careers",
    destination: "Read",
  },
  {
    title: "AI implementation",
    desc: "Patterns I keep noticing when AI moves from demo to actual operating system.",
    href: "https://www.bywhitespace.com/",
    destination: "Whitespace",
    external: true,
  },
  {
    title: "Audacity",
    desc: "A running note on asking, making, applying, and moving before certainty arrives.",
    href: "/notes/audacity",
    destination: "Read",
  },
  {
    title: "Places worth returning to",
    desc: "Travel notes, visual references, and small details I want to keep.",
    href: "/travel",
    destination: "Travel",
  },
  {
    title: "Making across mediums",
    desc: "What changes when an idea moves between painting, ceramics, systems, and words.",
    href: "/notes/making-across-mediums",
    destination: "Read",
  },
];

const writing = [
  {
    title: "When the Universe Hands You a Yes",
    source: "Good World Living",
    year: "2025",
    href: "https://www.goodworldliving.com/articles/when-the-universe-hands-you-a-yes",
  },
  {
    title: "From Brand to Atmosphere: Designing Experiences That Feel Like Worlds",
    source: "Whitespace",
    year: "2026",
    href: "https://www.bywhitespace.com/blog/designing-experiences-that-feel-like-worlds",
  },
  {
    title: "How an Art Residency in Provence Transformed My Creative Path",
    source: "Good World Living",
    year: "2024",
    href: "https://www.goodworldliving.com/articles/how-an-art-residency-in-provence-transformed-my-creative-path",
  },
  {
    title: "The Shift Toward Intentional Branding: Designing with Meaning in a Noisy World",
    source: "Whitespace",
    year: "2025",
    href: "https://www.bywhitespace.com/blog/intentional-branding-designing-with-meaning-in-a-noisy-world",
  },
  {
    title: "Art Retreat in France: Unveiling Creative Wonders in St. Antonin-Noble Val",
    source: "Good World Living",
    year: "2023",
    href: "https://www.goodworldliving.com/articles/france-art-retreat",
  },
];

const references = [
  { title: "Books / essays", desc: "Writing worth returning to." },
  { title: "Visual references", desc: "Moodboards, type, imagery, color, and visual references." },
  { title: "Places", desc: "Travel, architecture, landscapes, and memorable spaces.", href: "/travel" },
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

      <section className="notes-section writing-section">
        <div className="section-heading">
          <h2 className="section-title small-title">Writing</h2>
        </div>

        <div className="writing-list">
          {writing.map((item, index) => (
            <a className="writing-row" href={item.href} target="_blank" rel="noreferrer" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.source} · {item.year}</p>
              <span>↗</span>
            </a>
          ))}
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
