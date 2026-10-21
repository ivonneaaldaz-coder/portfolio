"use client";
import { useEffect,useState } from "react";
type Theme="light"|"dark";
export default function ThemeToggle(){
 const [theme,setTheme]=useState<Theme>("light");
 useEffect(()=>{const saved=localStorage.getItem("portfolio-theme");const initial:Theme=saved==="dark"||saved==="light"?saved:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");setTheme(initial);document.documentElement.dataset.theme=initial},[]);
 const toggle=()=>{const next=theme==="dark"?"light":"dark";setTheme(next);document.documentElement.dataset.theme=next;localStorage.setItem("portfolio-theme",next)};
 return <button type="button" className="editorial-theme-toggle" onClick={toggle} aria-label={theme==="dark"?"Switch to light mode":"Switch to dark mode"} title={theme==="dark"?"Switch to light mode":"Switch to dark mode"}><span className="editorial-theme-icon" aria-hidden="true">{theme==="dark"?<svg viewBox="0 0 48 48" fill="none"><path d="M34 7a19 19 0 1 0 7 30A18 18 0 0 1 34 7Z" stroke="currentColor" strokeWidth="1.5"/><path d="M37 4v9M32.5 8.5h9M42 19v6M39 22h6" stroke="currentColor" strokeWidth="1.3"/></svg>:<svg viewBox="0 0 48 48" fill="none"><path d="M24 3v42M3 24h42M9 9l30 30M39 9 9 39" stroke="currentColor" strokeWidth="1.5"/><circle cx="24" cy="24" r="5" fill="currentColor"/></svg>}</span></button>
}