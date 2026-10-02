import Link from "next/link";

const work = [
  { n: "01", title: "Relationship Operating System", tags: "AI + Systems", text: "Turning scattered contacts, introductions, and follow-ups into a centralized system for growth." },
  { n: "02", title: "AI-Assisted Lead Engine", tags: "Automation + Operations", text: "Transforming fragmented inbound information into structured priorities and next actions." },
  { n: "03", title: "Brand + Digital Repositioning", tags: "Strategy + Brand", text: "Creating a clearer path from positioning and messaging to a more useful digital experience." },
];

export default function Home() {
  return (
    <>
      <section className="hero section-pad">
        <p className="eyebrow">PORTFOLIO / 2026</p>
        <div className="hero-copy">
          <h1>I build brands, systems, and experiences.</h1>
          <p>Strategy, AI, design, and culture — connected by a belief that useful things can still be beautiful.</p>
        </div>
      </section>

      <section className="work-section section-pad">
        <div className="section-heading">
          <p className="eyebrow">SELECTED WORK</p>
          <Link href="/work">View all work ↗</Link>
        </div>

        <div className="work-grid">
          {work.map((item) => (
            <article className="work-card" key={item.n}>
              <div className="work-card-top"><span>{item.n}</span><span>{item.tags}</span></div>
              <div className="work-visual" aria-hidden="true">
                <div className="visual-window">
                  <div className="visual-bar"><i /><i /><i /></div>
                  <div className="visual-lines"><b /><b /><b /><b /></div>
                </div>
              </div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <Link href="/work">View case study ↗</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="lab-section section-pad">
        <div>
          <p className="eyebrow">THE LAB / EXPERIMENTAL</p>
          <h2>Things I build because I want them to exist.</h2>
          <p className="muted">A separate, stranger corner of the internet for experiments, tools, notes, music, and digital play.</p>
          <a className="text-link" href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">Enter the Lab ↗</a>
        </div>
        <div className="lab-preview" aria-label="Stylized preview of the Lab">
          <div className="lab-titlebar"><span>IVONNE_OS</span><span>— □ ×</span></div>
          <div className="lab-desktop">
            <div className="lab-icon">ASK<br/>EVE</div>
            <div className="lab-icon">NOTES</div>
            <div className="lab-icon">MUSIC</div>
            <div className="lab-window"><div>WELCOME.EXE</div><p>Ideas, tools & internet experiments.</p></div>
          </div>
        </div>
      </section>

      <section className="closing section-pad">
        <p className="eyebrow">CURRENTLY</p>
        <p>Building · Teaching · Making</p>
      </section>
    </>
  );
}
