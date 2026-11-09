"use client";

import { useRef, useState } from "react";
import Modal from "./Modal";

export type TravelPhoto = {
  place: string;
  image: string;
};

export default function TravelGallery({ photographs }: { photographs: TravelPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);
  const touchStart = useRef<{x:number;y:number}|null>(null);
  const onTouchStart = (event: React.TouchEvent) => { const t=event.touches[0]; touchStart.current={x:t.clientX,y:t.clientY}; };
  const onTouchEnd = (event: React.TouchEvent) => { const start=touchStart.current; touchStart.current=null; if(!start)return; const t=event.changedTouches[0]; const dx=t.clientX-start.x,dy=t.clientY-start.y; if(Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)*1.25)return; if(dx<0)next(); else previous(); };

  const previous = () => {
    if (active === null) return;
    setActive((active - 1 + photographs.length) % photographs.length);
  };

  const next = () => {
    if (active === null) return;
    setActive((active + 1) % photographs.length);
  };

  return (
    <>
      <style>{`
        .travel-lightbox .art-lightbox-close {
          font-size: 16px !important;
          font-weight: 400;
          line-height: 1.2;
          color: var(--ink);
          padding: 10px;
          top: 18px;
          right: 18px;
          z-index: 2;
        }
      `}</style>
      <div className="travel-grid section-pad">
        {photographs.map((photo, index) => (
          <figure className="travel-photo" key={photo.place + index}>
            <button className="travel-photo-button" type="button" onClick={() => setActive(index)} aria-label={"Open photo from " + photo.place}>
              <img src={photo.image} alt={photo.place} loading={index < 3 ? "eager" : "lazy"} />
            </button>
            <figcaption>{photo.place}</figcaption>
          </figure>
        ))}
      </div>

      {active !== null && (
        <Modal className="art-lightbox travel-lightbox" useSiteCursor label={photographs[active].place} closeOnBackdrop onClose={() => setActive(null)} onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); next(); }
          if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
        }}>
          <button className="art-lightbox-close" type="button" aria-label="Close photo viewer"
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={(event) => { event.preventDefault(); event.stopPropagation(); setActive(null); }}>Close ×</button>
          <button className="art-lightbox-prev" type="button" onClick={previous} aria-label="Previous photo">←</button>

          <div className="art-lightbox-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img src={photographs[active].image} alt={photographs[active].place} />
            <div className="art-lightbox-meta">
              <div>
                <h2>{photographs[active].place}</h2>
              </div>
            </div>
          </div>

          <button className="art-lightbox-next" type="button" onClick={next} aria-label="Next photo">→</button>
        </Modal>
      )}
    </>
  );
}
