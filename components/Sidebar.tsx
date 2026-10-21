"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label:"Home", href:"/" },

  { label:"Lab ↗", href:"https://lab.ivonnealdaz.com", external:true },

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
  const [workOpen,setWorkOpen]=useState(false);
  const [libraryOpen,setLibraryOpen]=useState(()=>library.some(x=>x.href===pathname));
  return <aside className="sidebar">
    <div><Link className="brand" href="/">IVONNE ALDAZ</Link>
      <nav className="sidebar-nav" aria-label="Primary">
        <div className="sidebar-work-group"><Link href="/#selected-work">Work</Link><button type="button" className="sidebar-work-expand" aria-label="Toggle work sections" aria-expanded={workOpen} onClick={()=>setWorkOpen(v=>!v)}>{workOpen?"−":"+"}</button></div>{workOpen&&<div className="sidebar-library sidebar-work-links"><Link href="/#selected-work">Projects</Link><Link href="/#case-studies">Case studies</Link><Link href="/#press">Press + Speaking</Link><Link href="/#writing">Writing</Link></div>}{links.map(link=>link.external?<a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>:<Link key={link.href} href={link.href} className={pathname===link.href?"active":""}>{link.label}</Link>)}
        <button type="button" className="sidebar-library-toggle" aria-expanded={libraryOpen} aria-controls="sidebar-library-links" onClick={()=>setLibraryOpen(v=>!v)}>Library <span aria-hidden="true">{libraryOpen?"−":"+"}</span></button>
        {libraryOpen&&<div id="sidebar-library-links" className="sidebar-library">{library.map(link=><Link key={link.href} className={pathname===link.href?"active":""} href={link.href}>{link.label}</Link>)}</div>}
        <Link href="/about" className={pathname==="/about"?"active":""}>About</Link>
      </nav>
    </div>
    <div className="sidebar-bottom"><div className="sidebar-status"><p><span className="status-dot"/> Available for select projects</p><a className="sidebar-email" href="mailto:hello@ivonnealdaz.com">hello@ivonnealdaz.com ↗</a></div></div>
  </aside>;
}
