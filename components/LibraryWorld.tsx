"use client";

import { useState } from "react";

const books = [
  { title:"The Alchemist", author:"Paulo Coelho", cover:"https://covers.openlibrary.org/isbn/9780061122415-L.jpg", href:"https://amzn.to/4sULp9V" },
  { title:"The Four Agreements", author:"Don Miguel Ruiz", cover:"https://covers.openlibrary.org/isbn/9781878424310-L.jpg", href:"https://amzn.to/4s24lmx" },
  { title:"The 48 Laws of Power", author:"Robert Greene", cover:"https://covers.openlibrary.org/isbn/9780140280197-L.jpg", href:"https://amzn.to/4sRdlLS" },
  { title:"A New Earth", author:"Eckhart Tolle", cover:"https://covers.openlibrary.org/isbn/9780452289963-L.jpg", href:"https://amzn.to/4soqFHT" },
  { title:"Atomic Habits", author:"James Clear", cover:"https://covers.openlibrary.org/isbn/9780735211292-L.jpg", href:"https://amzn.to/4bmYovk" },
  { title:"The Daily Stoic", author:"Ryan Holiday", cover:"https://covers.openlibrary.org/isbn/9780735211735-L.jpg", href:"https://amzn.to/4t1TolQ" },
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
                <img src={book.cover} alt="" />
              </button>
            ))}
          </div>
          <aside className="book-detail">
            <p className="book-author">{activeBook.author}</p>
            <h2>{activeBook.title}</h2>
            <a href={activeBook.href} target="_blank" rel="noreferrer">View book ↗︎</a>
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
