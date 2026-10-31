"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const play = [
  { label:"Art", href:"/art" },
  { label:"Travel", href:"/travel" },
  { label:"Music", href:"/music" },
  { label:"Books + Quotes", href:"/books" },
  { label:"Visual References", href:"/visual-references" },
];
export default function Sidebar(){
  const pathname=usePathname();
  const [workOpen,setWorkOpen]=useState(()=>pathname.startsWith("/work"));
  const [playOpen,setPlayOpen]=useState(()=>play.some(x=>x.href===pathname));
  return <aside className="sidebar">
    <div><Link className="brand" href="/">IVONNE ALDAZ</Link>
      <nav className="sidebar-nav" aria-label="Primary">
        <Link href="/" className={pathname==="/"?"active":""}>Home</Link>
        <button type="button" className="sidebar-library-toggle sidebar-work-toggle" aria-expanded={workOpen} aria-controls="sidebar-work-links" onClick={()=>setWorkOpen(v=>!v)}>Work <span aria-hidden="true">{workOpen?"−":"+"}</span></button>{workOpen&&<div id="sidebar-work-links" className="sidebar-library sidebar-work-links"><Link href="/work#selected-work">Projects</Link><Link href="/work#case-studies">Case Studies</Link><Link href="/work#press">Press + Speaking</Link><Link href="/work#writing">Writing</Link></div>}
        <button type="button" className="sidebar-library-toggle" aria-expanded={playOpen} aria-controls="sidebar-play-links" onClick={()=>setPlayOpen(v=>!v)}>Play <span aria-hidden="true">{playOpen?"−":"+"}</span></button>
        {playOpen&&<div id="sidebar-play-links" className="sidebar-library">{play.map(link=><Link key={link.href} className={pathname===link.href?"active":""} href={link.href}>{link.label}</Link>)}</div>}
        <Link href="/about" className={pathname==="/about"?"active":""}>About</Link>
      </nav>
    </div>
    <div className="sidebar-bottom"><div className="sidebar-status"><p><span className="status-dot"/> Available for select projects</p><a className="sidebar-email" href="mailto:hello@ivonnealdaz.com">hello@ivonnealdaz.com ↗</a></div></div>
  </aside>;
}
