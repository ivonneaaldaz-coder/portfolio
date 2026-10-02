export default function AboutPage() {
  return (
    <section className="page section-pad about-page">
      <p className="eyebrow">ABOUT / IVONNE ALDAZ</p>

      <div className="about-hero">
        <div className="portrait-placeholder"><span>PORTRAIT</span></div>
        <div className="about-copy">
          <h1>I like building things that make ideas easier to understand, use, or feel.</h1>
          <p>I’m a strategist, builder, artist, and educator working across brand, technology, systems, and culture.</p>
          <p>My work moves between commercial strategy and creative practice: designing systems, shaping brands, experimenting with AI, teaching, making art, and occasionally building strange little corners of the internet.</p>
        </div>
      </div>

      <div className="about-grid">
        <div><span>01</span><h2>Strategist</h2><p>Positioning, insight, brand, growth.</p></div>
        <div><span>02</span><h2>Builder</h2><p>Systems, automation, AI, digital products.</p></div>
        <div><span>03</span><h2>Artist</h2><p>Painting, ceramics, photography, installation.</p></div>
        <div><span>04</span><h2>Educator</h2><p>Marketing, entrepreneurship, yoga, workshops.</p></div>
      </div>
    </section>
  );
}
