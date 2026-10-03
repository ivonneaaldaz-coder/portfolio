"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const filters = ["All","Type","Interiors","Art","Objects","Color","Places","Interfaces"] as const;
const tiles = [
  {title:"TYPE",desc:"Typefaces, spacing, editorial systems",size:"visual-tall",category:"Type"},
  {title:"INTERIORS",desc:"Rooms, materials, light",size:"visual-wide",category:"Interiors"},
  {title:"COLOR",desc:"Palettes and unexpected combinations",size:"visual-square",category:"Color"},
  {title:"ART",desc:"Work that changes how I see",size:"visual-tall",category:"Art"},
  {title:"OBJECTS",desc:"Useful, strange, beautifully resolved",size:"visual-square",category:"Objects"},
  {title:"PLACES",desc:"Architecture, landscape, atmosphere",size:"visual-wide",category:"Places"},
  {title:"INTERFACES",desc:"Digital details worth remembering",size:"visual-square",category:"Interfaces"},
  {title:"MATERIAL",desc:"Paper, clay, metal, texture",size:"visual-tall",category:"Objects"},
] as const;

export default function VisualReferencesPage() {
  const [active,setActive] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(()=>active==="All" ? tiles : tiles.filter(tile=>tile.category===active),[active]);

  return (
    <section className="page section-pad visual-index-page">
      <header className="collection-intro">
        <div>
          <h1>Visual References</h1>
          <p>A visual collection of things I like enough to save.</p>
        </div>
        <Link href="/library">Back to Library ←</Link>
      </header>

      <div className="visual-filter-row" role="group" aria-label="Filter visual references">
        {filters.map(filter=>(
          <button type="button" key={filter} className={active===filter ? "active" : ""} onClick={()=>setActive(filter)}>{filter}</button>
        ))}
      </div>

      <div className="visual-masonry">
        {visible.map((item,index) => (
          <article className={"visual-tile " + item.size + " visual-tone-" + (index%6)} key={item.title}>
            <div><h2>{item.title}</h2><p>{item.desc}</p></div>
          </article>
        ))}
      </div>

      <p className="collection-status">Saved imagery from your collection will drop into this system without changing the structure.</p>

      <nav className="related-paths" aria-label="Explore next">
        <Link href="/books">Books + Quotes →</Link>
        <Link href="/travel">Places →</Link>
      </nav>
    </section>
  );
}
