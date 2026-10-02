import Link from "next/link";

export default function MakeSpacePage() {
  return (
    <article className="project-detail page section-pad">
      <Link className="back-link" href="/work">← Work</Link>

      <header className="project-detail-hero">
        <p className="eyebrow">PROJECT / MAKE SPACE</p>
        <h1>Creative workshops designed to make making feel social again.</h1>
        <p className="project-detail-dek">
          Make Space is a workshop series built around low-pressure creative experiences —
          clay, collage, watercolor, and other tactile ways to spend time together.
        </p>
      </header>

      <section className="project-detail-grid">
        <div>
          <p className="eyebrow">WHAT IT IS</p>
          <p>
            A growing creative events platform built with Alicia Rivas. The format pairs
            approachable instruction with a considered setting, food, conversation, and enough
            structure for people to make something without needing to think of themselves as artists.
          </p>
        </div>
        <div>
          <p className="eyebrow">MY ROLE</p>
          <p>
            Co-founder / brand / experience design / operations / partnerships / production.
          </p>
        </div>
      </section>

      <section className="project-detail-band">
        <div><span>01</span><h2>Clay & Conversation</h2><p>Handbuilding workshops with fired ceramic pieces and pickup after glazing.</p></div>
        <div><span>02</span><h2>Small-format by design</h2><p>Intimate groups, thoughtful venues, and room for conversation rather than a class-room feel.</p></div>
        <div><span>03</span><h2>Built to expand</h2><p>Future formats include collage, watercolor, corporate workshops, and larger creative gatherings.</p></div>
      </section>

      <section className="project-detail-footer">
        <p>More visuals and event documentation coming soon.</p>
      </section>
    </article>
  );
}
