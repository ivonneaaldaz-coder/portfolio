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
        <div className="about-portrait"><img src="/ivonne-headshot.webp" alt="Ivonne Aldaz" /></div>
        <div className="about-copy">
          <h1>Strategist, artist, builder, educator.</h1>
          <p>My work moves between brand strategy, technology, systems, and visual art — from building digital tools and brand worlds to teaching, making, and independent experiments.</p>
          <div className="about-links">
            <Link href="/work">Selected work ↗︎</Link>
            <Link href="/art">Art practice ↗︎</Link>
            <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">The Lab ↗︎</a>
            <Link href="/speaking">Speaking + press ↗︎</Link>
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
