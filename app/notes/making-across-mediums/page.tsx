import Link from "next/link";

export default function MakingAcrossMediumsNote() {
  return (
    <article className="native-note page section-pad">
      <Link className="back-link" href="/notes">← Notes</Link>
      <header>
        <p className="eyebrow">PRACTICE</p>
        <h1>Making across mediums</h1>
        <p className="native-note-dek">What changes when an idea moves between painting, ceramics, systems, and words.</p>
      </header>
      <div className="native-note-body">
        <p>I am less interested in choosing one medium than in noticing what each medium lets an idea become.</p>
        <p>A system asks for structure. A painting can stay unresolved. Clay forces negotiation with material. Writing makes the logic visible.</p>
        <p>The medium changes the answer, which is part of why moving between them remains useful.</p>
      </div>
    </article>
  );
}
