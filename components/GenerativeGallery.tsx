"use client";

import { useEffect, useState } from "react";

export type GenerativeItem = {
  name: string;
  type: "image" | "video";
  src: string;
};

export default function GenerativeGallery({ items }: { items: GenerativeItem[] }) {
  const [active,setActive] = useState<number|null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % items.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + items.length) % items.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown",onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown",onKey);
    };
  },[active,items.length]);

  return (
    <>
      <div className="gen-gallery section-pad">
        {items.map((item,index) => (
          <button className="gen-card" type="button" key={item.name} onClick={()=>setActive(index)} aria-label={"Open " + item.name}>
            {item.type === "video" ? (
              <video src={item.src} autoPlay muted loop playsInline preload="metadata" />
            ) : (
              <img src={item.src} alt="" loading={index < 4 ? "eager" : "lazy"} />
            )}
          </button>
        ))}
      </div>

      {active !== null && items[active] ? (
        <div className="art-lightbox gen-lightbox" role="dialog" aria-modal="true" aria-label={items[active].name}>
          <button className="art-lightbox-close" type="button" onClick={()=>setActive(null)} aria-label="Close viewer">×</button>
          <button className="art-lightbox-prev" type="button" onClick={()=>setActive((active - 1 + items.length) % items.length)} aria-label="Previous">←</button>
          <div className="art-lightbox-stage">
            {items[active].type === "video" ? (
              <video src={items[active].src} autoPlay muted loop playsInline controls />
            ) : (
              <img src={items[active].src} alt="" />
            )}
          </div>
          <button className="art-lightbox-next" type="button" onClick={()=>setActive((active + 1) % items.length)} aria-label="Next">→</button>
        </div>
      ) : null}
    </>
  );
}
