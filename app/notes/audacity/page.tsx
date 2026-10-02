import Link from "next/link";

export default function AudacityNote() {
  return (
    <article className="native-note page section-pad">
      <Link className="back-link" href="/notes">← Notes</Link>
      <header>
        <p className="eyebrow">IDEAS</p>
        <h1>Audacity</h1>
        <p className="native-note-dek">On asking, making, applying, and moving before certainty arrives.</p>
      </header>
      <div className="native-note-body">
        <p>Life rewards audacity more often than we admit.</p>
        <p>Not recklessness. Not pretending you know what you do not. The willingness to send the email, apply anyway, make the thing, ask the question, or enter the room before you feel fully entitled to be there.</p>
        <p>A surprising amount of momentum begins with acting slightly earlier than your confidence would prefer.</p>
      </div>
    </article>
  );
}
