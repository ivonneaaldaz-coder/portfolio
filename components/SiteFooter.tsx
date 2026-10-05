import Link from "next/link";

export default function SiteFooter() {
  return (
    <section className="footer-grid section-pad site-footer">
      <div className="footer-about">
        <p className="eyebrow">ABOUT</p>
        <h2>I move between strategy,<span className="footer-about-break"> technology, and art.</span></h2>
        <Link href="/about">More about me →</Link>
      </div>
      <div>
        <p className="eyebrow">CURRENTLY</p>
        <ul>
          <li>Building digital systems</li>
          <li>Teaching marketing + entrepreneurship</li>
          <li>Making and exhibiting art</li>
          <li>Developing Good World Living</li>
        </ul>
      </div>
      <div>
        <p className="eyebrow">LET’S CONNECT</p>
        <p className="muted">For work, exhibitions, collaborations, or conversation.</p>
        <a className="pill-link" href="mailto:hello@ivonnealdaz.com">Get in touch →</a>
      </div>
    </section>
  );
}
