import Link from "next/link";

export default function BrandDigitalRepositioningPage() {
  return (
    <article className="case-study page section-pad">
      <Link className="back-link" href="/work">← Work</Link>

      <header className="case-hero">
        <p className="eyebrow">BRAND + DIGITAL / 2026</p>
        <h1>Brand + Digital Repositioning</h1>
        <p className="case-dek">
          Reworking a lending brand so its positioning, website, sales materials, and ongoing marketing told one clearer story.
        </p>

        <dl className="case-meta">
          <div><dt>Role</dt><dd>Strategy / messaging / creative direction</dd></div>
          <div><dt>Scope</dt><dd>Website / sales tools / campaign / content</dd></div>
          <div><dt>Context</dt><dd>Financial services</dd></div>
        </dl>
      </header>

      <section className="case-body">
        <div className="case-copy">
          <p className="eyebrow">THE SITUATION</p>
          <h2>The offer was stronger than the way it was being explained.</h2>
          <p>
            The business needed a clearer digital presence and sharper sales narrative: what made the product useful, why a broker should care, and how the experience differed from alternatives.
          </p>
        </div>

        <div className="case-visual case-visual-brand">
          <span>POSITIONING</span><span>MESSAGE</span><span>EXPERIENCE</span><span>CONVERSION</span>
        </div>

        <div className="case-copy">
          <p className="eyebrow">THE APPROACH</p>
          <h2>Make every touchpoint reinforce the same strategic idea.</h2>
          <p>
            I aligned the website refresh, sales one-pager, product tearsheet, newsletter, LinkedIn direction, and broker activation campaign around a more consistent value proposition and customer journey.
          </p>
        </div>

        <div className="case-facts">
          <div><span>01</span><h3>Sharper hierarchy</h3><p>Clarified what mattered most and reduced competing messages.</p></div>
          <div><span>02</span><h3>Connected assets</h3><p>Website, sales collateral, and campaigns worked as one system rather than isolated deliverables.</p></div>
          <div><span>03</span><h3>Execution included</h3><p>Strategy moved directly into copy, campaign structure, and launch-ready materials.</p></div>
        </div>

        <div className="case-copy">
          <p className="eyebrow">OUTCOME</p>
          <h2>A more coherent brand system built for actual use.</h2>
          <p>
            The work created a clearer path from positioning to execution, giving the team a more consistent story across the website, sales process, and marketing.
          </p>
        </div>
      </section>

      <nav className="case-next">
        <Link href="/work/ai-assisted-lead-engine">Next case study <span>AI-Assisted Lead Engine →</span></Link>
      </nav>
    </article>
  );
}
