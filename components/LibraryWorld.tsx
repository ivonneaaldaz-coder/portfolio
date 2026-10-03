"use client";

import { useState } from "react";

const books = [
  { n:"01", category:"Art", className:"cover-a" },
  { n:"02", category:"Design", className:"cover-b" },
  { n:"03", category:"Essays", className:"cover-c" },
  { n:"04", category:"Place", className:"cover-d" },
  { n:"05", category:"Ideas", className:"cover-e" },
  { n:"06", category:"Fiction", className:"cover-f" },
  { n:"07", category:"Art", className:"cover-g" },
  { n:"08", category:"Design", className:"cover-h" },
];

const quotes = [
  { n:"01", label:"Decision making", className:"common-card-a" },
  { n:"02", label:"Making", className:"common-card-b" },
  { n:"03", label:"Attention", className:"common-card-c" },
  { n:"04", label:"Place", className:"common-card-d" },
  { n:"05", label:"Learning", className:"common-card-e" },
];

export default function LibraryWorld() {
  const [view,setView] = useState<"books"|"quotes">("books");
  const [selected,setSelected] = useState(0);

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
                className={"book-cover-tile " + book.className + (selected===index ? " active" : "")}
                key={book.n}
                onClick={()=>setSelected(index)}
                aria-label={"Open collection slot " + book.n}
              >
                <span>{book.n}</span>
                <div className="book-cover-mark" aria-hidden="true" />
                <small>{book.category}</small>
              </button>
            ))}
          </div>
          <aside className="book-detail">
            <span>{books[selected].n} / {String(books.length).padStart(2,"0")}</span>
            <h2>{books[selected].category}</h2>
            <p>Book cover, title, author, your note, and a purchase link will live here once the collection is cataloged.</p>
            <div className="book-detail-lines" aria-hidden="true"><i/><i/><i/></div>
          </aside>
        </div>
      ) : (
        <div className="commonplace-world">
          <div className="commonplace-stack" aria-label="Quote card preview">
            {quotes.map((item,index)=>(
              <article className={"common-card " + item.className} key={item.n} style={{"--card-i":index} as React.CSSProperties}>
                <span>{item.n} / {item.label}</span>
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
