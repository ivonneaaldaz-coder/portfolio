"use client";

import { useState } from "react";

const books = [
  { category:"Art", className:"cover-a" },
  { category:"Design", className:"cover-b" },
  { category:"Essays", className:"cover-c" },
  { category:"Place", className:"cover-d" },
  { category:"Ideas", className:"cover-e" },
  { category:"Fiction", className:"cover-f" },
  { category:"Art", className:"cover-g" },
  { category:"Design", className:"cover-h" },
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
                key={book.category + index}
                onClick={()=>setSelected(index)}
                aria-label={"Open " + book.category + " collection slot"}
              >
                <div className="book-cover-mark" aria-hidden="true" />
                <small>{book.category}</small>
              </button>
            ))}
          </div>
          <aside className="book-detail">
            <h2>{books[selected].category}</h2>
            <p>Book cover, title, author, your note, and a purchase link will live here once the collection is cataloged.</p>
            <div className="book-detail-lines" aria-hidden="true"><i/><i/><i/></div>
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
