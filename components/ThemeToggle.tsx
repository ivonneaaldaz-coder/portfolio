"use client";
import { useEffect, useState } from "react";
type Theme = "light" | "dark";
export default function ThemeToggle() {
  const [theme,setTheme]=useState<Theme>("light");
  useEffect(()=>{const saved=localStorage.getItem("portfolio-theme");const t:Theme=saved==="dark"||saved==="light"?saved:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");setTheme(t);document.documentElement.dataset.theme=t;},[]);
  const toggle=()=>{const t:Theme=theme==="light"?"dark":"light";setTheme(t);document.documentElement.dataset.theme=t;localStorage.setItem("portfolio-theme",t);};
  return <button type="button" onClick={toggle} aria-label={theme==="dark"?"Switch to light mode":"Switch to dark mode"} title={theme==="dark"?"Light mode":"Dark mode"} style={{border:0,background:"transparent",padding:10,cursor:"pointer",fontSize:25,lineHeight:1,color:"inherit",transition:"transform .35s ease"}} className="celestial-theme-toggle"><span aria-hidden="true" style={{display:"inline-block",transition:"transform .4s ease",transform:theme==="dark"?"rotate(25deg)":"rotate(0deg)"}}>{theme==="dark"?"☾":"✳"}</span></button>;
}