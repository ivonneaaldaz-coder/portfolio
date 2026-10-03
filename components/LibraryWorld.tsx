"use client";

import { useState } from "react";

const books = [
  { title:"The Alchemist", author:"Paulo Coelho", cover:"https://assets2.panuval.com/image/cache/catalog/1117/the-alchemist-10000209-550x550h.png", href:"https://amzn.to/4sULp9V" },
  { title:"The Four Agreements", author:"Don Miguel Ruiz", cover:"https://images2.medimops.eu/product/c5b1fb/M01934408654-source.jpg", href:"https://amzn.to/4s24lmx" },
  { title:"The 48 Laws of Power", author:"Robert Greene", cover:"https://www.bordersstore.com/cdn/shop/files/9781861972781_The48LawsOfPower_1_019a0d86-8653-49c6-bdd7-0dccbe410c37.jpg?v=1765878985&width=720", href:"https://amzn.to/4sRdlLS" },
  { title:"A New Earth", author:"Eckhart Tolle", cover:"https://http2.mlstatic.com/D_NQ_NP_810961-MLM45641522648_042021-O.webp", href:"https://amzn.to/4soqFHT" },
  { title:"Atomic Habits", author:"James Clear", cover:"https://cdn.media.amplience.net/s/mardel/3967338-3967338-IMGSET", href:"https://amzn.to/4bmYovk" },
  { title:"The Daily Stoic", author:"Ryan Holiday", cover:"https://miro.medium.com/v2/0%2ARE7Zi7HNFLZVq_4d.jpg", href:"https://amzn.to/4t1TolQ" },
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
