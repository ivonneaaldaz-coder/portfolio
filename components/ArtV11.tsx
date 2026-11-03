"use client";
import {useEffect,useRef,useState} from "react";
const works=[
  {
    "title": "What I Didn’t Say",
    "meta": [
      "Acrylic on canvas",
      "60 × 48 in",
      "Private collection"
    ],
    "image": "/art-v11/work-1.webp"
  },
  {
    "title": "Wish You Were Here",
    "meta": [
      "Acrylic on canvas",
      "48 × 36 in",
      "Private collection",
      "Lake Como, 2025"
    ],
    "image": "/art-v11/work-2.webp"
  },
  {
    "title": "Beneath the Surface",
    "meta": [
      "Acrylic on canvas",
      "48 × 36 in",
      "Private collection"
    ],
    "image": "/art-v11/work-3.webp"
  },
  {
    "title": "Somewhere in Tequila",
    "meta": [
      "Watercolor on paper",
      "9 × 12 in"
    ],
    "image": "/art-v11/work-4.webp"
  },
  {
    "title": "The Time Beneath",
    "meta": [
      "Watercolor on paper",
      "9 × 12 in",
      "Málaga, Spain"
    ],
    "image": "/art-v11/work-5.webp"
  },
  {
    "title": "The Last Light",
    "meta": [
      "Watercolor on paper",
      "9 × 12 in",
      "St. Antonin-Noble-Val, France"
    ],
    "image": "/art-v11/work-6.webp"
  },
  {
    "title": "Before I Knew",
    "meta": [
      "Watercolor on paper"
    ],
    "image": "/art-v11/work-7.webp"
  },
  {
    "title": "Traces of You",
    "meta": [
      "Acrylic on canvas"
    ],
    "image": "/art-v11/work-8.webp"
  },
  {
    "title": "The Verdon Reflections",
    "meta": [
      "Acrylic on paper",
      "9 × 12 in"
    ],
    "image": "/art-v11/work-9.webp"
  },
  {
    "title": "The Road to Maussane",
    "meta": [
      "Acrylic on paper",
      "12 × 9 in"
    ],
    "image": "/art-v11/work-10.webp"
  }
];
const statement=["My work explores the spaces between memory and place — how color, light, and silence can hold emotion.","I work across acrylic painting, watercolor, and ceramics. Moving between abstraction and observation, I return to the places I've been, the moments I remember, and the feelings that linger long after an experience ends.","Residencies in France and Italy have shaped the way I see and make work. Painting offers a slower way to notice, to remember, and to give something fleeting a physical form."];
const history=[
  {
    "year": "2023",
    "title": "La Roane",
    "detail": "Watercolor retreat · France"
  },
  {
    "year": "2024",
    "title": "NG Art Residency",
    "detail": "Artist residency · Provence, France"
  },
  {
    "year": "2025",
    "title": "Casa d'Arte",
    "detail": "Artist residency · Lake Como, Italy"
  },
  {
    "year": "2025",
    "title": "Torre delle Arti",
    "detail": "Group exhibition · Bellagio, Lake Como, Italy"
  },
  {
    "year": "2026",
    "title": "UTSA",
    "detail": "Group exhibition"
  },
  {
    "year": "2026",
    "title": "Breva Creative",
    "detail": "Group exhibition"
  }
];
export default function ArtV11(){
 const [active,setActive]=useState<number|null>(null);
 const touchStart=useRef<{x:number;y:number}|null>(null);
 const onTouchStart=(event:React.TouchEvent)=>{const t=event.touches[0];touchStart.current={x:t.clientX,y:t.clientY}};
 const onTouchEnd=(event:React.TouchEvent)=>{const start=touchStart.current;touchStart.current=null;if(!start)return;const t=event.changedTouches[0];const dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)*1.25)return;setActive(i=>i===null?null:(i+(dx<0?1:works.length-1))%works.length)};
 useEffect(()=>{if(active===null)return;const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setActive(null);if(e.key==="ArrowRight")setActive(i=>i===null?null:(i+1)%works.length);if(e.key==="ArrowLeft")setActive(i=>i===null?null:(i+works.length-1)%works.length)};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key)},[active]);
 return <div className="art-v11"><div className="art-v11-content"><section className="gallery" aria-label="Selected artworks">{works.map((w,i)=><button type="button" className="work" key={w.title} onClick={()=>setActive(i)} aria-label={`View ${w.title}`}><span className="artwork"><img src={w.image} alt={w.title} loading={i<3?"eager":"lazy"}/></span><span className="work-title">{w.title}</span><span className="work-meta">{w.meta.map((line,j)=><span className="meta-row" key={j}>{line}</span>)}</span></button>)}</section><section className="art-editorial" aria-label="About the art practice"><div className="editorial-row"><h2>Artist statement</h2><div className="editorial-copy">{statement.map((p,i)=><p key={i}>{p}</p>)}</div></div><div className="editorial-row history-row"><h2>Exhibitions &amp;<br/>residencies</h2><div className="history-list">{history.map((h,i)=><div className="history-item" key={i}><span className="history-year">{h.year}</span><div><strong>{h.title}</strong><span>{h.detail}</span></div></div>)}</div></div></section></div>{active!==null&&<div className="viewer open" role="dialog" aria-modal="true" aria-label="Artwork viewer" onClick={()=>setActive(null)}><div className="viewer-top"><span>{active+1} / {works.length}</span><button onClick={()=>setActive(null)} aria-label="Close viewer">Close ×</button></div><div className="viewer-body" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onClick={e=>e.stopPropagation()}><img src={works[active].image} alt={works[active].title}/></div><div className="viewer-bottom"><div><strong>{works[active].title}</strong><p>{works[active].meta.join("\n")}</p></div><div className="viewer-controls"><button aria-label="Previous artwork" onClick={e=>{e.stopPropagation();setActive((active+works.length-1)%works.length)}}>←</button><button aria-label="Next artwork" onClick={e=>{e.stopPropagation();setActive((active+1)%works.length)}}>→</button></div></div></div>}</div>;
}
