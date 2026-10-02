export default function AboutPage() {
  return (
    <section className="page section-pad about-page">
      <p className="eyebrow">ABOUT / IVONNE ALDAZ</p>

      <div className="about-hero">
        <div className="portrait-placeholder"><span>PORTRAIT</span></div>
        <div className="about-copy">
          <h1>I’m a strategist, artist, builder, and educator.</h1>
          <p>
            My practice moves between brand strategy, technology, systems, and visual art.
            I’m interested in the places where structure meets intuition — where an idea can
            become a useful system, a compelling identity, or a physical object.
          </p>
          <p>
            I work with companies, build independent experiments, teach, and maintain an active
            art practice across painting, ceramics, photography, and installation.
          </p>
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
