"use client";

import { useRef, useState } from "react";
import Modal from "./Modal";
import Link from "next/link";

const knownBooks: Record<string,{ title:string; author:string; href:string|null }> = {
  "1.png": { title:"The Alchemist", author:"Paulo Coelho", href:"https://amzn.to/4sULp9V" },
  "2.png": { title:"The Four Agreements", author:"Don Miguel Ruiz", href:"https://amzn.to/4s24lmx" },
  "3.png": { title:"The Artist’s Way", author:"Julia Cameron", href:"https://www.amazon.com/s?k=The+Artists+Way+Julia+Cameron&tag=ivonnealdaz0c-20" },
  "4.png": { title:"The 48 Laws of Power", author:"Robert Greene", href:"https://amzn.to/4sRdlLS" },
  "5.png": { title:"The Creative Act: A Way of Being", author:"Rick Rubin", href:"https://www.amazon.com/s?k=The+Creative+Act+Rick+Rubin&tag=ivonnealdaz0c-20" },
  "6.png": { title:"Atomic Habits", author:"James Clear", href:"https://amzn.to/4bmYovk" },
  "7.png": { title:"A New Earth", author:"Eckhart Tolle", href:"https://amzn.to/4soqFHT" },
  "8.png": { title:"The Daily Stoic", author:"Ryan Holiday", href:"https://amzn.to/4t1TolQ" },
  "9.png": { title:"Stillness Is the Key", author:"Ryan Holiday", href:"https://www.amazon.com/s?k=Stillness+Is+the+Key+Ryan+Holiday&tag=ivonnealdaz0c-20" },
};

const bookNotes: Record<string,{summary:string;why:string}> = {
 "1.png":{summary:"A fable about a shepherd following a dream and learning to recognize what matters along the way.",why:"A reminder to trust curiosity and keep moving toward the life you want."},
 "2.png":{summary:"Four practical principles for questioning assumptions, communicating clearly, and taking things less personally.",why:"A useful reset for how we speak to ourselves and to others."},
 "3.png":{summary:"A creative recovery guide built around daily writing, attention, and small acts of making.",why:"Permission to create before everything feels figured out."},
 "4.png":{summary:"An examination of power, influence, and the patterns behind strategic behavior.",why:"An interesting lens on human motives and social dynamics."},
 "5.png":{summary:"Rick Rubin explores creativity as a way of noticing and engaging with the world, not just producing work.",why:"A reminder that creative practice starts with paying attention."},
 "6.png":{summary:"A practical framework for building habits through small, repeatable changes to your environment and routines.",why:"The idea that consistency can matter more than intensity."},
 "7.png":{summary:"A reflection on ego, awareness, and the possibility of living with more presence.",why:"An invitation to notice the stories we tell ourselves."},
 "8.png":{summary:"Daily reflections inspired by Stoic philosophy, focused on judgment, resilience, and intentional action.",why:"A small dose of perspective for ordinary days."},
 "9.png":{summary:"An exploration of stillness as a source of clarity, discipline, and better decisions.",why:"A counterweight to the pressure to always be doing more."},
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

export default function LibraryWorld({ driveBooks = [] }: { driveBooks?: {name:string; image:string}[] }) {
  const books = driveBooks.map((file,index) => ({
    name:file.name,
    image:file.image,
    title:knownBooks[file.name]?.title ?? file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g," "),
    author:knownBooks[file.name]?.author ?? "From the shelf",
    href:knownBooks[file.name]?.href ?? null,
    summary:bookNotes[file.name]?.summary ?? "",
    why:bookNotes[file.name]?.why ?? "",
    index,
  }));

  const touchStart = useRef<{x:number;y:number}|null>(null);
  const moveBook = (direction:number) => setSelected(current => (current + direction + books.length) % books.length);
  const [view,setView] = useState<"books"|"quotes">("books");
  const [bookOpen, setBookOpen] = useState(false);
  const [selected,setSelected] = useState(0);
  const safeSelected = Math.min(selected, Math.max(books.length - 1, 0));
  const activeBook = books[safeSelected];

  return (
    <div className="library-experience"><style>{`.library-page .quote-entry{padding-top:clamp(42px,5vw,76px)!important;padding-bottom:clamp(46px,5vw,76px)!important}.library-page .quote-attribution{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:5px!important;margin-top:clamp(28px,3vw,42px)!important}.library-page .quote-attribution strong{font-weight:500!important}.library-page .quote-attribution span{opacity:.7!important}.library-page .quote-expand{margin-top:clamp(28px,3vw,40px)!important}@media(max-width:600px){.library-page .quote-entry{padding:44px 0 48px!important}.library-page .quote-attribution{margin-top:28px!important;gap:6px!important}.library-page .quote-expand{margin-top:30px!important}}`}</style>
      <div className="library-topline"><div className="library-tabs" role="group" aria-label="Books and quotes">
        <button type="button" aria-pressed={view==="books"} className={view==="books" ? "active" : ""} onClick={()=>setView("books")}>Books</button>
        <button type="button" aria-pressed={view==="quotes"} className={view==="quotes" ? "active" : ""} onClick={()=>setView("quotes")}>Quotes</button>
      </div><Link className="library-back-link" href="/">← Back to Home</Link></div>

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
              {activeBook.summary ? <p className="book-summary">{activeBook.summary}</p> : null}
              {activeBook.why ? <><p className="book-why-label">Why it’s on the shelf</p><p className="book-why-note">{activeBook.why}</p></> : null}
              {activeBook.href ? <a href={activeBook.href} target="_blank" rel="noreferrer">View book ↗︎</a> : null}
            </aside>
          ) : null}
        </div>
      ) : (
        <div className="quotes-world">
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
        <Modal className="book-dialog" label={activeBook.title} onClose={() => setBookOpen(false)} onKeyDown={event => { if(event.key === "ArrowLeft") moveBook(-1); if(event.key === "ArrowRight") moveBook(1); }}>
          <button type="button" className="book-dialog-close" onClick={() => setBookOpen(false)} aria-label="Close book details">×</button>
          <div className="book-dialog-swipe-content" style={{touchAction:"pan-y"}} onTouchStart={e=>{const t=e.touches[0];touchStart.current={x:t.clientX,y:t.clientY}}} onTouchCancel={()=>{touchStart.current=null}} onTouchEnd={e=>{const a=touchStart.current;touchStart.current=null;if(!a)return;const t=e.changedTouches[0];const dx=t.clientX-a.x,dy=t.clientY-a.y;if(Math.abs(dx)>=45&&Math.abs(dx)>Math.abs(dy)*1.2)moveBook(dx<0?1:-1)}}>
          <div className="book-dialog-swipe" style={{touchAction:"pan-y"}}><img src={activeBook.image} alt="" draggable={false} /></div>
          <div className="book-detail">
            <p className="book-author">{activeBook.author}</p>
            <h2>{activeBook.title}</h2>
            {activeBook.summary ? <p className="book-summary">{activeBook.summary}</p> : null}
            {activeBook.why ? <><p className="book-why-label">Why it’s on the shelf</p><p className="book-why-note">{activeBook.why}</p></> : null}
            {activeBook.href ? <a href={activeBook.href} target="_blank" rel="noreferrer">View book ↗︎</a> : null}
          </div>
          </div>
          <nav className="book-dialog-navigation" aria-label="Browse books"><button type="button" onClick={()=>moveBook(-1)} aria-label="Previous book">←</button><span>{safeSelected+1} / {books.length} · Swipe to explore</span><button type="button" onClick={()=>moveBook(1)} aria-label="Next book">→</button></nav>
        </Modal>
      ) : null}
    </div>
  );
}
