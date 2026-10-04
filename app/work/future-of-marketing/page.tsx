import Link from "next/link";

export default function FutureOfMarketingPage() {
  return (
    <article className="case-study page section-pad">
      <Link className="back-link" href="/work">← Work</Link>
      <header className="case-hero">
        <p className="eyebrow">AUDIENCE GROWTH + OWNED MEDIA</p>
        <h1>Future of Marketing</h1>
        <p className="case-dek">Built and grew TINT’s owned-media platform from roughly 7,000 to more than 50,000 subscribers — using editorial programming to build audience, authority, and recurring demand-generation opportunities.</p>
        <dl className="case-meta">
          <div><dt>Growth</dt><dd>~7K → 50K+ subscribers</dd></div>
          <div><dt>Role</dt><dd>Editorial strategy / audience growth / programming / execution</dd></div>
          <div><dt>Formats</dt><dd>Newsletter / webinars / podcast / events / speaking</dd></div>
        </dl>
      </header>
      <section className="case-body">
        <div className="case-copy">
          <p className="eyebrow">THE IDEA</p>
          <h2>Build an audience around the category, not just the product.</h2>
          <p>Future of Marketing operated as TINT’s media brand: an owned platform designed to keep marketers engaged with useful ideas, expert perspectives, and emerging industry conversations while strengthening TINT’s position as a thought leader.</p>
        </div>
        <div className="case-visual case-visual-fom">
          <strong>7K</strong><span>NEWSLETTER</span><span>WEBINARS</span><span>PODCAST</span><span>EVENTS</span><strong>50K+</strong>
        </div>
        <div className="case-copy">
          <p className="eyebrow">THE SYSTEM</p>
          <h2>One media brand, many recurring reasons to come back.</h2>
          <p>I shaped the editorial direction and built programming across newsletters, webinars, podcast conversations, live and virtual events, public appearances, and expert participation. Each format extended the same audience relationship rather than behaving like an isolated campaign.</p>
        </div>
        <div className="case-facts">
          <div><h3>Audience growth</h3><p>Expanded the subscriber base from roughly 7,000 to more than 50,000.</p></div>
          <div><h3>Integrated programming</h3><p>Connected editorial, webinars, podcasting, events, and speaking into one recognizable media ecosystem.</p></div>
          <div><h3>Business role</h3><p>Created recurring opportunities to engage prospects and support lead generation without turning the platform into product marketing.</p></div>
        </div>
        <div className="case-copy">
          <p className="eyebrow">IMPACT</p>
          <h2>A content program became an audience asset.</h2>
          <p>Future of Marketing gave TINT a persistent industry-facing platform instead of relying only on campaign-by-campaign attention. It supported lead-generation and nurture activity as well, although historical attribution was not clean enough to report a reliable sourced-revenue figure.</p>
        </div>
      </section>
      <nav className="case-next">
        <Link href="/work/research-led-content-engine">Next case study <span>Research-Led Content Engine →</span></Link>
      </nav>
    </article>
  );
}
