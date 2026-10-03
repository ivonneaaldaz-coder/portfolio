import Link from "next/link";

const extras = [
  { title: "Ventures", copy: "Whitespace · Make Space · Good World Living" },
  { title: "Community", copy: "San Antonio Arts Commission — Centro de Artes Committee · Witte Museum · San Antonio Art League Museum" },
  { title: "Languages", copy: "English · Spanish · some French" },
  { title: "Practice", copy: "Certified yoga + meditation teacher · guitar · learning piano" },
];

const brands = [
  "ARM & HAMMER","Batiste","Clio Snacks","CVS Health","First Response","Flexitol","Fur Buddies","Gaia Herbs",
  "Gerber","H-E-B","Hero Cosmetics","Kellanova","Maggi Noodles","Maison Perrier","Nestlé","Nescafe",
  "Pacific Coast Producers","Purina","Sir Kensington's (Unilever)","Stouffer's","TrueLoyal (formerly TINT)","Veggies Made Great","viemaa",
];

const visibleBrands = brands.slice(0,16);
const moreBrands = brands.slice(16);

export default function AboutPage() {
  return (
    <section className="page section-pad about-page">
      <div className="about-hero">
        <div className="about-portrait"><img src="data:image/webp;base64,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" alt="Ivonne Aldaz" /></div>
        <div className="about-copy">
          <h1>Strategist, artist, builder, educator.</h1>
          <p>My work moves between brand strategy, technology, systems, and visual art — from building digital tools and brand worlds to teaching, making, and independent experiments.</p>
          <div className="about-links">
            <Link href="/work">Selected work →</Link>
            <Link href="/art">Art practice →</Link>
            <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">The Lab ↗︎</a>
            <Link href="/speaking">Speaking + press →</Link>
          </div>
        </div>
      </div>

      <div className="about-grid">
        <div><h2>Strategy</h2><p>Positioning, insight, brand, growth.</p></div>
        <div><h2>Systems</h2><p>AI, automation, tools, digital products.</p></div>
        <div><h2>Art</h2><p>Painting, ceramics, photography, design.</p></div>
        <div><h2>Teaching</h2><p>Marketing, entrepreneurship, workshops.</p></div>
      </div>

      <section className="about-section">
        <div className="section-heading"><h2 className="section-title small-title">Selected brands</h2></div>
        <div className="brand-wall">
          {visibleBrands.map((brand)=><div className="brand-name" key={brand}><strong>{brand}</strong></div>)}
        </div>
        <details className="brand-more">
          <summary>More brands + collaborations</summary>
          <div className="brand-wall brand-wall-more">
            {moreBrands.map((brand)=><div className="brand-name" key={brand}><strong>{brand}</strong></div>)}
          </div>
        </details>
      </section>

      <section className="about-section">
        <div className="section-heading"><h2 className="section-title small-title">Kind words</h2></div>
        <div className="quote-grid">
          <figure className="quote-card"><blockquote>“A rare find. Deeply data-driven, deeply human.”</blockquote><figcaption>— Senior executive</figcaption></figure>
          <figure className="quote-card"><blockquote>“Everyone keeps saying what a great job you’re doing and how happy the clients are.”</blockquote><figcaption>— Former manager</figcaption></figure>
          <figure className="quote-card"><blockquote>“Why are we even talking about it? Just hire her.”</blockquote><figcaption>— Former colleague</figcaption></figure>
        </div>
      </section>

      <section className="about-section">
        <div className="section-heading"><h2 className="section-title small-title">A few more things</h2></div>
        <div className="elsewhere-grid">
          {extras.map(item=><div className="elsewhere-item" key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></div>)}
        </div>
      </section>

      <section className="about-section education-section">
        <div className="section-heading"><h2 className="section-title small-title">Education</h2></div>
        <div className="education-list">
          <div><h3>MBA</h3><p>St. Mary’s University</p></div>
          <div><h3>MA, International Business + Economics</h3><p>FH Schmalkalden University of Applied Sciences · thesis pending</p></div>
          <div><h3>Bachelor of Arts</h3><p>St. Mary’s University</p></div>
        </div>
      </section>

      <section className="about-section">
        <details className="long-story">
          <summary><span>Read the longer story</span><span aria-hidden="true">＋</span></summary>
          <div className="long-story-copy">
            <p className="long-story-lede">Life is about saying yes to the things that will make a better story.</p>
            <p>For over a decade, I’ve been building brands and shaping how companies think, look, and communicate — from startups navigating pivots and acquisitions to work supporting global enterprises. All of it has been driven by the same obsession: what makes something resonate, what gives it a world, and what makes people feel something before they can explain why.</p>
            <p>In marketing, everything moves quickly. I needed to make something that could outlive the next campaign, so I paint and work in ceramics — something I can’t undo with a keystroke.</p>
            <p>Art residencies in France and Italy cracked something open in me. Every time I committed, the next thing revealed itself.</p>
            <p>These days, I follow that curiosity wherever it goes. Sometimes that’s a painting. Sometimes it’s a ceramics workshop, a yoga practice, a brand, or a weird little thing I build on the internet.</p>
            <p><strong>Whitespace</strong> is my strategy and creative studio. <strong>Make Space</strong> brings people together to make things with their hands. <strong>Good World Living</strong> is an ongoing exploration of remarkable places, thoughtfully made things, and what it means to live well.</p>
            <p>Different expressions of the same curiosity.</p>
            <p>I grew up on the border. Two languages, two worlds. A constant pull toward the other side.</p>
            <p>Some of that shows up in the work.<br />All of it shows up here.</p>
          </div>
        </details>
      </section>
    </section>
  );
}
