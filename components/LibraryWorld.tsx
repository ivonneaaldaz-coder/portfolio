"use client";

import { useState } from "react";

const shelves = [
  { label:"Art", note:"Artists, exhibition books, monographs, and books about making." },
  { label:"Design", note:"Graphic design, typography, architecture, interiors, and visual culture." },
  { label:"Essays", note:"Writing I return to for ideas, language, and perspective." },
  { label:"Place", note:"Travel, cities, landscapes, food, and books rooted in somewhere specific." },
  { label:"Ideas", note:"Business, technology, philosophy, behavior, and useful ways of thinking." },
  { label:"Fiction", note:"Stories worth disappearing into for a while." },
];

export default function LibraryWorld() {
  const [active,setActive] = useState(0);
  const shelf=shelves[active];

  return (
    <div className="library-world">
      <div className="bookshelf" aria-label="Library shelves">
        <div className="shelf shelf-top">
          {shelves.slice(0,3).map((item,index) => (
            <button
              className={"book-spine spine-" + index + (active===index ? " active" : "")}
              key={item.label}
              onClick={() => setActive(index)}
              type="button"
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="shelf">
          {shelves.slice(3).map((item,index) => {
            const real=index+3;
            return (
              <button
                className={"book-spine spine-" + real + (active===real ? " active" : "")}
                key={item.label}
                onClick={() => setActive(real)}
                type="button"
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="library-note">
        <span>{String(active+1).padStart(2,"0")} / 06</span>
        <h2>{shelf.label}</h2>
        <p>{shelf.note}</p>
        <p className="muted">Individual books, short notes, and purchase links will live here as the shelf is cataloged.</p>
      </aside>
    </div>
  );
}
