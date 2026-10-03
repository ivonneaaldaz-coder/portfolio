import Link from "next/link";

export default function AIAssistedLeadEnginePage() {
  return (
    <article className="case-study page section-pad">
      <Link className="back-link" href="/work">← Work</Link>

      <header className="case-hero">
        <p className="eyebrow">AI + AUTOMATION / 2026</p>
        <h1>AI-Assisted Lead Engine</h1>
        <p className="case-dek">
          A lightweight pipeline for turning messy inbound information into structured records, priorities, and next steps.
        </p>

        <dl className="case-meta">
          <div><dt>Role</dt><dd>Workflow design / prototyping / implementation</dd></div>
          <div><dt>Scope</dt><dd>Inbox / extraction / CRM / summaries</dd></div>
          <div><dt>Principle</dt><dd>Automate the sorting, keep judgment human</dd></div>
        </dl>
      </header>

      <section className="case-body">
        <div className="case-copy">
          <p className="eyebrow">THE QUESTION</p>
          <h2>What if the team never had to manually organize a lead again?</h2>
          <p>
            The workflow was designed around a simple reality: useful opportunities often arrive in inconsistent formats. The system needed to capture them without forcing everyone into a new behavior.
          </p>
        </div>

        <div className="case-visual case-visual-engine">
          <span>INBOX</span><span>EXTRACT</span><span>STRUCTURE</span><span>PRIORITIZE</span><span>ACT</span>
        </div>

        <div className="case-copy">
          <p className="eyebrow">THE WORKFLOW</p>
          <h2>Keep the front door familiar. Automate what happens after.</h2>
          <p>
            Leads could be forwarded into a shared intake point, parsed into structured fields, added to the CRM, checked for duplicates, and surfaced in a daily action summary. The system focused on reducing administrative drag rather than replacing decision-making.
          </p>
        </div>

        <div className="case-facts">
          <div><h3>Low-friction intake</h3><p>The workflow works with existing email behavior instead of demanding a new tool first.</p></div>
          <div><h3>Structured automatically</h3><p>Unstructured information becomes consistent fields that can be filtered and acted on.</p></div>
          <div><h3>Human review retained</h3><p>AI supports extraction and prioritization while final judgment stays with the team.</p></div>
        </div>

        <div className="case-copy">
          <p className="eyebrow">WHY IT MATTERS</p>
          <h2>Small operational systems can create disproportionate leverage.</h2>
          <p>
            The value was not the presence of AI. It was the removal of repetitive sorting and the creation of a clearer daily operating rhythm.
          </p>
        </div>
      </section>

      <nav className="case-next">
        <Link href="/work">Back to all work <span>View Work →</span></Link>
      </nav>
    </article>
  );
}
