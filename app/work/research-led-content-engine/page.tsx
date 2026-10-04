import Link from "next/link";

export default function ResearchLedContentEnginePage() {
  return (
    <article className="case-study page section-pad">
      <Link className="back-link" href="/work">← Work</Link>
      <header className="case-hero">
        <p className="eyebrow">RESEARCH + CONTENT SYSTEMS</p>
        <h1>Research-Led Content Engine</h1>
        <p className="case-dek">Turned one original research initiative into a report, earned-media story, editorial calendar, social program, newsletter narrative, nurture sequence, and months of campaign material.</p>
        <dl className="case-meta">
          <div><dt>Role</dt><dd>Research / insights / interviews / writing / design / distribution</dd></div>
          <div><dt>Inputs</dt><dd>Survey data / expert interviews / podcast conversations</dd></div>
          <div><dt>Outputs</dt><dd>Report / PR / blog / social / newsletter / drip campaigns</dd></div>
        </dl>
      </header>
      <section className="case-body">
        <div className="case-copy">
          <p className="eyebrow">THE OPPORTUNITY</p>
          <h2>Make the research do more than launch once.</h2>
          <p>Instead of treating an eBook or annual report as a single gated asset, I built the work so every insight, interview, quote, and finding could become the raw material for additional campaigns and editorial formats.</p>
        </div>
        <div className="case-visual case-visual-content-engine">
          <span>RESEARCH</span><span>→</span><span>REPORT</span><span>→</span><span>PRESS</span><span>·</span><span>BLOG</span><span>·</span><span>SOCIAL</span><span>·</span><span>EMAIL</span>
        </div>
        <div className="case-copy">
          <p className="eyebrow">THE BUILD</p>
          <h2>Research, editorial, design, and distribution became one system.</h2>
          <p>I drafted the survey questions, analyzed the findings, interviewed industry leaders, and repurposed relevant conversations from the Future of Marketing podcast. I then shaped the narrative and designed the final eBook/report so the research could move cleanly across channels.</p>
        </div>
        <div className="case-facts">
          <div><h3>Original insight</h3><p>Survey design and analysis created proprietary material the brand could own rather than simply comment on.</p></div>
          <div><h3>Expert layer</h3><p>Leader interviews and podcast conversations added outside perspective, credibility, and reusable quotes.</p></div>
          <div><h3>Compounding distribution</h3><p>Findings became press angles, blog posts, social content, newsletter campaigns, drip sequences, and demand-generation assets.</p></div>
        </div>
        <div className="case-copy">
          <p className="eyebrow">THE RETURN</p>
          <h2>One foundational asset drove a year’s worth of marketing.</h2>
          <p>The research generated recurring campaign material and contributed to earned-media mentions in outlets including Forbes and Digiday. It also supported lead-generation activity, though historical attribution does not allow me to report a reliable revenue figure.</p>
        </div>
      </section>
      <nav className="case-next">
        <Link href="/work/relationship-operating-system">Next case study <span>Relationship Operating System →</span></Link>
      </nav>
    </article>
  );
}
