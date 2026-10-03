"use client";

import { useState } from "react";

const books = [
  { title:"The Alchemist", author:"Paulo Coelho", tile:"book-sprite-1", href:"https://amzn.to/4sULp9V" },
  { title:"The Four Agreements", author:"Don Miguel Ruiz", tile:"book-sprite-2", href:"https://amzn.to/4s24lmx" },
  { title:"The Artist’s Way", author:"Julia Cameron", tile:"book-sprite-3", href:null },
  { title:"The 48 Laws of Power", author:"Robert Greene", tile:"book-sprite-4", href:"https://amzn.to/4sRdlLS" },
  { title:"The Creative Act: A Way of Being", author:"Rick Rubin", tile:"book-sprite-5", href:null },
  { title:"Atomic Habits", author:"James Clear", tile:"book-sprite-6", href:"https://amzn.to/4bmYovk" },
  { title:"A New Earth", author:"Eckhart Tolle", tile:"book-sprite-7", href:"https://amzn.to/4soqFHT" },
  { title:"The Daily Stoic", author:"Ryan Holiday", tile:"book-sprite-8", href:"https://amzn.to/4t1TolQ" },
  { title:"Stillness Is the Key", author:"Ryan Holiday", tile:"book-sprite-9", href:null },
];

const quotes = [
  { label:"Decision making", className:"common-card-a" },
  { label:"Making", className:"common-card-b" },
  { label:"Attention", className:"common-card-c" },
  { label:"Place", className:"common-card-d" },
  { label:"Learning", className:"common-card-e" },
];

export default function LibraryWorld() {
  const [view,setView] = useState<"books"|"quotes">("books");
  const [selected,setSelected] = useState(0);
  const activeBook = books[selected];

  return (
    <div className="library-experience">
      <div className="library-tabs" role="tablist" aria-label="Books and quotes">
        <button type="button" className={view==="books" ? "active" : ""} onClick={()=>setView("books")}>Books</button>
        <button type="button" className={view==="quotes" ? "active" : ""} onClick={()=>setView("quotes")}>Quotes</button>
      </div>

      {view === "books" ? (
        <div className="book-browser">
          <div className="book-cover-grid">
            {books.map((book,index)=>(
              <button
                type="button"
                className={"book-cover-tile real-cover" + (selected===index ? " active" : "")}
                key={book.title}
                onClick={()=>setSelected(index)}
                aria-label={"Open " + book.title}
              >
                <div className={`book-cover-art ${book.tile}`} aria-hidden="true" />
              </button>
            ))}
          </div>
          <aside className="book-detail">
            <p className="book-author">{activeBook.author}</p>
            <h2>{activeBook.title}</h2>
            {activeBook.href ? <a href={activeBook.href} target="_blank" rel="noreferrer">View book ↗︎</a> : null}
          </aside>
        </div>
      ) : (
        <div className="commonplace-world">
          <div className="commonplace-stack" aria-label="Quote card preview">
            {quotes.map((item,index)=>(
              <article className={"common-card " + item.className} key={item.label} style={{"--card-i":index} as React.CSSProperties}>
                <span>{item.label}</span>
                <p>Saved quote or passage.</p>
              </article>
            ))}
          </div>
          <aside className="commonplace-note">
            <span>QUOTES</span>
            <h2>Lines worth keeping.</h2>
            <p>Passages, fragments, and sentences collected slowly over time.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
