const archive = [
  ["2026", "OCT", "Teaching", "University teaching / course development"],
  ["2026", "SEP", "Art", "Tender Things Have Edges"],
  ["2026", "SEP", "Experience", "Make Space / Clay & Conversation"],
  ["2026", "AUG", "Systems", "Partner relationship operating system"],
  ["2026", "JUL", "Lab", "Ask Eve / portfolio experiments"],
  ["2026", "JUN", "Art", "Group exhibition"],
];

export default function ArchivePage() {
  return (
    <section className="page section-pad">
      <p className="eyebrow">ARCHIVE / ARTIFACTS</p>
      <div className="page-intro">
        <h1>A running index of things made, built, taught, shown, and explored.</h1>
      </div>

      <div className="archive-filters">
        <button>All</button><button>Work</button><button>Art</button><button>Teaching</button><button>Travel</button><button>Experiments</button>
      </div>

      <div className="archive-list">
        {archive.map(([year, month, type, title], i) => (
          <article className="archive-row" key={month + "-" + title}>
            <span>{i === 0 ? year : ""}</span>
            <span>{month}</span>
            <span>{type}</span>
            <h2>{title}</h2>
            <span>↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
