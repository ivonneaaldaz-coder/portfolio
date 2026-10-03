import Link from "next/link";

const writing = [
  { title:"When the Universe Hands You a Yes", source:"Good World Living", year:"2025", href:"https://www.goodworldliving.com/articles/when-the-universe-hands-you-a-yes" },
  { title:"From Brand to Atmosphere: Designing Experiences That Feel Like Worlds", source:"Whitespace", year:"2026", href:"https://www.bywhitespace.com/blog/designing-experiences-that-feel-like-worlds" },
  { title:"How an Art Residency in Provence Transformed My Creative Path", source:"Good World Living", year:"2024", href:"https://www.goodworldliving.com/articles/how-an-art-residency-in-provence-transformed-my-creative-path" },
  { title:"The Shift Toward Intentional Branding: Designing with Meaning in a Noisy World", source:"Whitespace", year:"2025", href:"https://www.bywhitespace.com/blog/intentional-branding-designing-with-meaning-in-a-noisy-world" },
  { title:"Art Retreat in France: Unveiling Creative Wonders in St. Antonin-Noble Val", source:"Good World Living", year:"2023", href:"https://www.goodworldliving.com/articles/france-art-retreat" },
];

const references = [
  { title:"Library", desc:"Books, essays, passages, and a growing commonplace.", href:"/library", meta:"Books + commonplace" },
  { title:"Visual Index", desc:"Moodboards, type, imagery, color, interiors, and saved references.", href:"/visual-index", meta:"A visual collection" },
  { title:"Places", desc:"Travel, architecture, landscapes, and memorable spaces.", href:"/travel", meta:"Photography + notes" },
  { title:"Music", desc:"Playlists, records, and things worth listening to closely.", href:"/music", meta:"Playlists + records" },
];

export default function NotesPage() {
  return (
    <section className="page section-pad notes-page">
      <div className="page-intro notes-intro">
        <h1>Notes</h1>
        <p>Published writing and a small library of things worth keeping.</p>
      </div>

      <section className="notes-section writing-section notes-first-section">
        <div className="section-heading"><h2 className="section-title small-title">Writing</h2></div>
        <div className="writing-list">
          {writing.map((item,index) => (
            <a className="writing-row" href={item.href} target="_blank" rel="noreferrer" key={item.title}>
              <span>{String(index+1).padStart(2,"0")}</span>
              <h3>{item.title}</h3>
              <p>{item.source} · {item.year}</p>
              <span>↗︎</span>
            </a>
          ))}
        </div>
      </section>

      <section className="notes-section">
        <div className="section-heading"><h2 className="section-title small-title">References</h2></div>
        <div className="reference-portals">
          {references.map((item,index) => (
            <Link className="reference-portal" href={item.href} key={item.title}>
              <span>{String(index+1).padStart(2,"0")}</span>
              <div>
                <p>{item.meta}</p>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <span>→</span>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
