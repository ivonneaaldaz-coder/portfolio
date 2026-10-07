"use client";

import { useState } from "react";
import Modal from "./Modal";

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
  {
    quote:"Two roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.",
    author:"Robert Frost",
    source:"The Road Not Taken",
    full:`Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.

I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.`
  },
  {
    quote:"That it will never come again\nIs what makes life so sweet.",
    author:"Emily Dickinson",
    source:"Poem 1741",
    full:`That it will never come again
Is what makes life so sweet.
Believing what we don’t believe
Does not exhilarate.

That if it be, it be at best
An ablative estate—
This instigates an appetite
Precisely opposite.`
  },
  {
    quote:"I wanted each and every one of them, but choosing one meant losing all the rest, and, as I sat there, unable to decide, the figs began to wrinkle and go black, and, one by one, they plopped to the ground at my feet.",
    author:"Sylvia Plath",
    source:"The Bell Jar",
    full:"The fig-tree passage expands on the fear that choosing one possible life means giving up all the others — until indecision becomes its own kind of loss."
  },
  {
    quote:"You will be forgotten either way. So live in such a manner that, while you remain, you belong to yourself.",
    author:"Marcus Aurelius",
    source:null,
    full:null
  },
  {
    quote:"What is to give light, must endure burning.",
    author:"Victor E. Frankl",
    source:null,
    full:null
  },
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
  const [bookOpen, setBookOpen] = useState(false);
  const [selected,setSelected] = useState(0);
  const safeSelected = Math.min(selected, Math.max(books.length - 1, 0));
  const activeBook = books[safeSelected];

  return (
    <div className="library-experience">
      <div className="library-tabs" role="group" aria-label="Books and quotes">
        <button type="button" aria-pressed={view==="books"} className={view==="books" ? "active" : ""} onClick={()=>setView("books")}>Books</button>
        <button type="button" aria-pressed={view==="quotes"} className={view==="quotes" ? "active" : ""} onClick={()=>setView("quotes")}>Quotes</button>
      </div>

      {view === "books" ? (
        <div className="book-browser">
          <div className="book-cover-grid">
            {books.map((book,index)=>(
              <button
                type="button"
                className={"book-cover-tile real-cover" + (safeSelected===index ? " active" : "")}
                key={book.name}
                onClick={() => {
                  setSelected(index);
                  if (window.matchMedia("(max-width: 900px)").matches) setBookOpen(true);
                }}
                aria-pressed={safeSelected === index}
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
        <div className="quotes-world">
          <div className="quotes-intro">
            <span>QUOTES</span>
            <h2>Lines I like.</h2>
            <p>Passages, fragments, and sentences from books, poems, and elsewhere.</p>
          </div>
          <div className="quote-list">
            {quotes.map((item,index)=>(
              <article className="quote-entry" key={item.author + index}>
                <blockquote>{item.quote.split("\n").map((line,i)=><span key={i}>{line}</span>)}</blockquote>
                <div className="quote-attribution">
                  <strong>{item.author}</strong>
                  {item.source ? <span>{item.source}</span> : null}
                </div>
                {item.full ? (
                  <details className="quote-expand">
                    <summary>{item.source === "The Bell Jar" ? "Read excerpt" : "Read full poem"}</summary>
                    <div className="quote-full">{item.full.split("\n").map((line,i)=><span key={i}>{line || "\u00A0"}</span>)}</div>
                  </details>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      )}
      {bookOpen && activeBook ? (
        <Modal className="book-dialog" label={activeBook.title} onClose={() => setBookOpen(false)}>
          <button type="button" className="book-dialog-close" onClick={() => setBookOpen(false)} aria-label="Close book details">×</button>
          <img src={activeBook.image} alt="" />
          <div className="book-detail">
            <p className="book-author">{activeBook.author}</p>
            <h2>{activeBook.title}</h2>
            {activeBook.href ? <a href={activeBook.href} target="_blank" rel="noreferrer">View book ↗︎</a> : null}
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
