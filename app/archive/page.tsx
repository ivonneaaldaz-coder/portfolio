"use client";

import { useMemo, useState } from "react";

type Category = "Work" | "Art" | "Teaching" | "Travel" | "Experiments";
type Entry = { year:string; month:string; category:Category; title:string };

const filters = ["All","Work","Art","Teaching","Travel","Experiments"] as const;

const archive: Entry[] = [
  { year:"2026", month:"SEP", category:"Art", title:"Tender Things Have Edges / lighting installation" },
  { year:"2026", month:"SEP", category:"Teaching", title:"University teaching appointments confirmed for Spring 2027" },
  { year:"2026", month:"SEP", category:"Work", title:"Clay & Conversation / Casa Dōson" },
  { year:"2026", month:"AUG", category:"Work", title:"Partner relationship operating system / handoff" },
  { year:"2026", month:"JUL", category:"Work", title:"Clay & Conversation / first workshop" },
  { year:"2026", month:"JUL", category:"Experiments", title:"Portfolio OS / Ask Eve / notes / experiments" },
  { year:"2026", month:"JUN", category:"Art", title:"UTSA group exhibition" },
  { year:"2026", month:"MAR", category:"Art", title:"Dominion Country Club exhibition" },
  { year:"2025", month:"DEC", category:"Work", title:"Whitespace relaunched" },
  { year:"2025", month:"AUG", category:"Art", title:"Bellagio / Lake Como" },
  { year:"2024", month:"FEB", category:"Teaching", title:"University of Portland guest lecture" },
  { year:"2024", month:"", category:"Art", title:"NG Art / Provence" },
  { year:"2023", month:"", category:"Art", title:"La Roane residency" },
];

export default function ArchivePage() {
  const [active,setActive] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(() => active === "All" ? archive : archive.filter(item => item.category === active), [active]);

  return (
    <section className="page section-pad archive-page">
      <div className="page-intro archive-intro">
        <h1>Archive</h1>
        <p>A running index of things made, built, taught, shown, and explored.</p>
      </div>

      <div className="archive-filters" role="group" aria-label="Filter archive">
        {filters.map(filter => (
          <button key={filter} type="button" className={active === filter ? "active" : ""} onClick={() => setActive(filter)}>
            {filter}
          </button>
        ))}
      </div>

      <div className="archive-list">
        {visible.map((item,i) => {
          const showYear = i === 0 || visible[i-1]?.year !== item.year;
          return (
            <article className="archive-row archive-row-filterable" key={item.year + item.month + item.title}>
              <span>{showYear ? item.year : ""}</span>
              <span>{item.month}</span>
              <span className="archive-category-pill">{item.category}</span>
              <h2>{item.title}</h2>
            </article>
          );
        })}
      </div>
    </section>
  );
}
