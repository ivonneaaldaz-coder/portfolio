import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="page section-pad about-page">
      <div className="about-hero">
        <div className="portrait-placeholder"><span>PORTRAIT</span></div>
        <div className="about-copy">
          <h1>I’m a strategist, artist, builder, and educator.</h1>
          <p>
            My work moves between brand strategy, technology, systems, and visual art.
            I’m interested in how ideas become useful systems, compelling identities,
            experiences, and physical objects.
          </p>
          <p>
            I work with companies through Whitespace, build independent digital experiments,
            teach marketing and entrepreneurship, and maintain an active art practice.
          </p>
          <div className="about-links">
            <Link href="/work">Selected work ↗</Link>
            <Link href="/art">Art practice ↗</Link>
            <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">The Lab ↗</a>
          </div>
        </div>
      </div>

      <div className="about-grid">
        <div><span>01</span><h2>Strategy</h2><p>Positioning, insight, brand, growth.</p></div>
        <div><span>02</span><h2>Systems</h2><p>AI, automation, tools, digital products.</p></div>
        <div><span>03</span><h2>Art</h2><p>Painting, ceramics, photography, installation.</p></div>
        <div><span>04</span><h2>Teaching</h2><p>Marketing, entrepreneurship, workshops.</p></div>
      </div>
    </section>
  );
}
