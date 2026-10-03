"use client";

import { useState } from "react";

const knownBooks: Record<string,{ title:string; author:string; href:string|null }> = {
  "1.png": { title:"The Alchemist", author:"Paulo Coelho", href:"https://amzn.to/4sULp9V" },
  "2.png": { title:"The Four Agreements", author:"Don Miguel Ruiz", href:"https://amzn.to/4s24lmx" },
  "3.png": { title:"The Artist’s Way", author:"Julia Cameron", href:null },
  "4.png": { title:"The 48 Laws of Power", author:"Robert Greene", href:"https://amzn.to/4sRdlLS" },
  "5.png": { title:"The Creative Act: A Way of Being", author:"Rick Rubin", href:null },
  "6.png": { title:"Atomic Habits", author:"James Clear", href:"https://amzn.to/4bmYovk" },
  "7.png": { title:"A New Earth", author:"Eckhart Tolle", href:"https://amzn.to/4soqFHT" },
  "8.png": { title:"The Daily Stoic", author:"Ryan Holiday", href:"https://amzn.to/4t1TolQ" },
  "9.png": { title:"Stillness Is the Key", author:"Ryan Holiday", href:null },
};

const quotes = [
  { label:"Decision making", className:"common-card-a" },
  { label:"Making", className:"common-card-b" },
  { label:"Attention", className:"common-card-c" },
  { label:"Place", className:"common-card-d" },
  { label:"Learning", className:"common-card-e" },
];

export default function LibraryWorld({ driveBooks = [] }: { driveBooks?: {name:string; image:string}[] }) {
  const books = driveBooks.map((file,index) => ({
    name:file.name,
    image:file.image,
    title:knownBooks[file.name]?.title ?? file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g," "),
    author:knownBooks[file.name]?.author ?? "From the shelf",
    href:knownBooks[file.name]?.href ?? null,
    index,
  }));

  const [view,setView] = useState<"books"|"quotes">("books");
  const [selected,setSelected] = useState(0);
  const safeSelected = Math.min(selected, Math.max(books.length - 1, 0));
  const activeBook = books[safeSelected];

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
                className={"book-cover-tile real-cover" + (safeSelected===index ? " active" : "")}
                key={book.name}
                onClick={()=>setSelected(index)}
                aria-label={"Open " + book.title}
              >
                <img src={book.image} alt="" />
              </button>
            ))}
          </div>
          {activeBook ? (
            <aside className="book-detail">
              <p className="book-author">{activeBook.author}</p>
              <h2>{activeBook.title}</h2>
              {activeBook.href ? <a href={activeBook.href} target="_blank" rel="noreferrer">View book ↗︎</a> : null}
            </aside>
          ) : null}
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
