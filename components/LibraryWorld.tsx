"use client";

import { useState } from "react";
import Modal from "./Modal";

import { knownBooks } from "@/lib/books";

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
    full:"I saw my life branching out before me like the green fig tree in the story. From the tip of every branch, like a fat purple fig, a wonderful future beckoned and winked. One fig was a husband and a happy home and children, and another fig was a famous poet and another fig was a brilliant professor, and another fig was Ee Gee, the amazing editor, and another fig was Europe and Africa and South America, and another fig was Constantin and Socrates and Attila and a pack of other lovers with queer names and offbeat professions, and another fig was an Olympic lady crew champion, and beyond and above these figs were many more figs I couldn't quite make out. I saw myself sitting in the crotch of this fig tree, starving to death, just because I couldn't make up my mind which of the figs I would choose. I wanted each and every one of them, but choosing one meant losing all the rest, and, as I sat there, unable to decide, the figs began to wrinkle and go black, and, one by one, they plopped to the ground at my feet."
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

export default function LibraryWorld({ driveBooks = [], quotesOnly = false }: { driveBooks?: {name:string; image:string}[]; quotesOnly?: boolean }) {
  const books = driveBooks.map((file,index) => ({
    name:file.name,
    image:file.image,
    title:knownBooks[file.name]?.title ?? file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g," "),
    author:knownBooks[file.name]?.author ?? "From the shelf",
    href:knownBooks[file.name]?.href ?? null,
    index,
  }));

  const [view,setView] = useState<"books"|"quotes">(quotesOnly ? "quotes" : "books");
  const [bookOpen, setBookOpen] = useState(false);
  const [selected,setSelected] = useState(0);
  const safeSelected = Math.min(selected, Math.max(books.length - 1, 0));
  const activeBook = books[safeSelected];

  return (
    <div className="library-experience">
      {!quotesOnly && <div className="library-tabs" role="group" aria-label="Books and quotes">
        <button type="button" aria-pressed={view==="books"} className={view==="books" ? "active" : ""} onClick={()=>setView("books")}>Books</button>
        <button type="button" aria-pressed={view==="quotes"} className={view==="quotes" ? "active" : ""} onClick={()=>setView("quotes")}>Quotes</button>
      </div>}

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
            <h2>Words I’ve kept.</h2>
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
                    <summary>{item.source === "The Bell Jar" ? "Read full passage" : "Read full poem"}</summary>
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
