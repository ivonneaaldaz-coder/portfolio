const archive = [
  ["2026", "SEP", "Art", "Tender Things Have Edges / lighting installation"],
  ["", "SEP", "Teaching", "University teaching appointments confirmed for Spring 2027"],
  ["", "SEP", "Make Space", "Clay & Conversation / Casa Dōson"],
  ["", "AUG", "Systems", "Partner relationship operating system / handoff"],
  ["", "JUL", "Make Space", "Clay & Conversation / first workshop"],
  ["", "JUL", "Lab", "Portfolio OS / Ask Eve / notes / experiments"],
  ["", "JUN", "Art", "UTSA group exhibition"],
  ["", "MAR", "Art", "Dominion Country Club exhibition"],
  ["2025", "DEC", "Studio", "Whitespace relaunched"],
  ["", "AUG", "Art", "Bellagio / Lake Como"],
  ["2024", "FEB", "Teaching", "University of Portland guest lecture"],
  ["", "", "Art", "NG Art / Provence"],
  ["2023", "", "Art", "La Roane residency"],
];

export default function ArchivePage() {
  return (
    <section className="page section-pad archive-page">
      <div className="page-intro archive-intro">
        <h1>Archive</h1>
        <p>A running index of things made, built, taught, shown, and explored.</p>
      </div>

      <div className="archive-filters">
        <span>All</span><span>Work</span><span>Art</span><span>Teaching</span><span>Travel</span><span>Experiments</span>
      </div>

      <div className="archive-list">
        {archive.map(([year, month, type, title], i) => (
          <article className="archive-row" key={String(i) + title}>
            <span>{year}</span>
            <span>{month}</span>
            <span>{type}</span>
            <h2>{title}</h2>
            <span>—</span>
          </article>
        ))}
      </div>
    </section>
  );
}
