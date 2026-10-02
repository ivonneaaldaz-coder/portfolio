import Link from "next/link";

export default function PortfolioCareersNote() {
  return (
    <article className="native-note page section-pad">
      <Link className="back-link" href="/notes">← Notes</Link>
      <header>
        <p className="eyebrow">WRITING</p>
        <h1>Portfolio careers</h1>
        <p className="native-note-dek">Notes on building a career across teaching, strategy, art, and independent work.</p>
      </header>
      <div className="native-note-body">
        <p>A portfolio career is less about collecting unrelated jobs and more about building a life where different forms of work reinforce each other.</p>
        <p>Teaching sharpens the way I explain ideas. Client work keeps me close to real problems. Art protects a different kind of attention. Building independent projects gives me room to experiment.</p>
        <p>The goal is not maximum variety. It is enough coherence that the pieces begin to compound.</p>
      </div>
    </article>
  );
}
