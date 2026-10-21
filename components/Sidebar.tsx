"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label:"Home", href:"/" },
  { label:"Work", href:"/work" },
  { label:"Lab ↗", href:"https://lab.ivonnealdaz.com", external:true },
  { label:"About", href:"/about" },
];
const library = [
  { label:"Art", href:"/art" },
  { label:"Travel", href:"/travel" },
  { label:"Books + Quotes", href:"/books" },
  { label:"Music", href:"/music" },
  { label:"Visual References", href:"/visual-references" },
];
export default function Sidebar(){
  const pathname=usePathname();
  const [libraryOpen,setLibraryOpen]=useState(()=>library.some(x=>x.href===pathname));
  return <aside className="sidebar">
    <div><Link className="brand" href="/">IVONNE ALDAZ</Link><p className="brand-sub">Strategist / Artist / Builder</p>
      <nav className="sidebar-nav" aria-label="Primary">
        {links.map(link=>link.external?<a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>:<Link key={link.href} href={link.href} className={pathname===link.href?"active":""}>{link.label}</Link>)}
        <button type="button" className="sidebar-library-toggle" aria-expanded={libraryOpen} aria-controls="sidebar-library-links" onClick={()=>setLibraryOpen(v=>!v)}>Library <span aria-hidden="true">{libraryOpen?"−":"+"}</span></button>
        {libraryOpen&&<div id="sidebar-library-links" className="sidebar-library">{library.map(link=><Link key={link.href} className={pathname===link.href?"active":""} href={link.href}>{link.label}</Link>)}</div>}
      </nav>
    </div>
    <div className="sidebar-bottom"><div className="sidebar-status"><p><span className="status-dot"/> Available for select projects</p></div></div>
  </aside>;
}
