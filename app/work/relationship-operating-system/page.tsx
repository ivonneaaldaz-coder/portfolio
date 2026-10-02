import Link from "next/link";

export default function RelationshipOperatingSystemPage() {
  return (
    <article className="case-study page section-pad">
      <Link className="back-link" href="/work">← Work</Link>

      <header className="case-hero">
        <p className="eyebrow">AI + SYSTEMS / 2026</p>
        <h1>Relationship Operating System</h1>
        <p className="case-dek">
          Turning a fragmented network of contacts, introductions, and follow-ups into a system a small team could actually use every day.
        </p>

        <dl className="case-meta">
          <div><dt>Role</dt><dd>Strategy / systems design / implementation</dd></div>
          <div><dt>Scope</dt><dd>CRM / workflows / automation / AI</dd></div>
          <div><dt>Context</dt><dd>Hospitality + investment network</dd></div>
        </dl>
      </header>

      <section className="case-body">
        <div className="case-copy">
          <p className="eyebrow">THE SITUATION</p>
          <h2>Valuable relationships were living everywhere except in one usable place.</h2>
          <p>
            Contacts arrived through inboxes, business cards, referrals, forms, and individual team members. The challenge was less about collecting more data and more about turning what already existed into something structured, current, and actionable.
          </p>
        </div>

        <div className="case-visual case-visual-system">
          <span>CONTACTS</span><span>→</span><span>CRM</span><span>→</span><span>NEXT ACTION</span>
        </div>

        <div className="case-copy">
          <p className="eyebrow">THE SYSTEM</p>
          <h2>A lightweight operating layer around the relationship pipeline.</h2>
          <p>
            I designed the database structure, partner categories, pipeline views, follow-up logic, intake flow, and daily action layer. Automations kept records cleaner and surfaced what needed attention without requiring the team to manually scan the base.
          </p>
        </div>

        <div className="case-facts">
          <div><span>01</span><h3>One source of truth</h3><p>Contacts, categories, status, last touch, and next steps in a shared system.</p></div>
          <div><span>02</span><h3>Action over storage</h3><p>Views and summaries were designed around what the team should do next.</p></div>
          <div><span>03</span><h3>AI where useful</h3><p>Automation supported triage and summaries instead of becoming the product itself.</p></div>
        </div>

        <div className="case-copy">
          <p className="eyebrow">OUTCOME</p>
          <h2>A relationship database became an operating system.</h2>
          <p>
            The finished system gave the team a clearer view of its network, reduced manual organization, and created a repeatable way to move relationships forward.
          </p>
        </div>
      </section>

      <nav className="case-next">
        <Link href="/work/brand-digital-repositioning">Next case study <span>Brand + Digital Repositioning →</span></Link>
      </nav>
    </article>
  );
}
