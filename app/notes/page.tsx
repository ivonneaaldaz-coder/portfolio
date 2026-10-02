const notes = [
  ["02 OCT 2026", "On building a portfolio career", "Writing"],
  ["30 SEP 2026", "Nothing happens and then it happens all at once.", "Idea"],
  ["18 SEP 2026", "Things I’m learning about AI implementation", "Learning"],
  ["04 AUG 2026", "Notes from places I want to return to", "Places"],
];

export default function NotesPage() {
  return (
    <section className="page section-pad">
      <p className="eyebrow">NOTES / ACTIVE BRAIN</p>
      <div className="page-intro">
        <h1>Things I’m thinking about, learning, and noticing.</h1>
        <p>Short ideas, longer writing, references, places, and things worth keeping.</p>
      </div>
      <div className="note-list">
        {notes.map(([date, title, type]) => (
          <article className="note-row" key={title}>
            <span>{date}</span><h2>{title}</h2><span>{type}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
