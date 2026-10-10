"use client";
import {useState,type CSSProperties} from "react";
import Modal from "./Modal";
import LibraryWorld from "./LibraryWorld";
import {knownBooks} from "@/lib/books";
import s from "./Bookshelf.module.css";
const jackets=[['#934c34','#f4dfb1',270],['#d6bb73','#353925',245],['#708c82','#f5ecd9',282],['#a6472e','#f5d78b',265],['#ded9c8','#2d3025',290],['#cbb68e','#303b35',252],['#8194a1','#f6f0df',280],['#3e4b48','#e5ddbc',258],['#b49761','#252d27',276]] as const;
export default function Bookshelf({books}:{books:{name:string;image:string}[]}){
 const [open,setOpen]=useState<number|null>(null);
 const [view,setView]=useState<'shelf'|'quotes'>('shelf');
 const catalog=books.map((book,index)=>({...book,...(knownBooks[book.name]||{title:book.name,author:'From my shelf',href:null}),jacket:jackets[index%jackets.length]}));
 const selected=open===null?null:catalog[open];
 return <div className={s.library}>
  <nav className={s.tabs} aria-label="Library views"><button aria-pressed={view==='shelf'} onClick={()=>setView('shelf')}>The bookshelf</button><button aria-pressed={view==='quotes'} onClick={()=>setView('quotes')}>Saved words</button></nav>
  {view==='shelf'?<><div className={s.shelfHeading}><span>{String(catalog.length).padStart(2,'0')} books / Personal collection</span><p>Pick a spine. Open a book.</p></div><div className={s.cabinet}>
   {[catalog.slice(0,5),catalog.slice(5)].filter(row=>row.length).map((row,rowIndex)=><div className={s.shelf} key={rowIndex}><div className={s.books}>{row.map((book,index)=>{const n=rowIndex*5+index;return <button key={book.name} className={s.book} style={{'--jacket':book.jacket[0],'--lettering':book.jacket[1],'--height':`${book.jacket[2]}px`,'--lean':`${index===0?-3:index===row.length-1?3:0}deg`} as CSSProperties} onClick={()=>setOpen(n)} aria-label={`Open ${book.title}`}><span className={s.spineTop}>{String(n+1).padStart(2,'0')}</span><span className={s.spineTitle}>{book.title}</span><span className={s.spineAuthor}>{book.author}</span><span className={s.bookEdge} aria-hidden="true"/></button>})}<div className={s.shelfNote} aria-hidden="true">{rowIndex===0?<><span>On the shelf</span><em>A few things<br/>worth returning to.</em></>:<><em>Read.<br/>Revisit.<br/>Repeat.</em><span>Ivonne’s collection</span></>}</div></div><div className={s.ledge}/></div>)}
  </div><p className={s.footnote}>A personal selection. Choose any book to see its cover and details.</p></>:<LibraryWorld quotesOnly/>}
  {selected&&<Modal className={s.dialog} label={selected.title} onClose={()=>setOpen(null)}><button className={s.close} onClick={()=>setOpen(null)} aria-label="Return book to shelf">Close ×</button><div className={s.openBook}><div className={s.cover}><img src={selected.image} alt={`${selected.title} cover`}/></div><div className={s.details}><span className={s.overline}>From my bookshelf / {String((open??0)+1).padStart(2,'0')}</span><p>{selected.author}</p><h2>{selected.title}</h2>{selected.href&&<a href={selected.href} target="_blank" rel="noreferrer">View book ↗</a>}<button onClick={()=>setOpen(null)}>← Return to the shelf</button></div></div></Modal>}
 </div>
}
