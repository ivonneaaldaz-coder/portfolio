"use client";

import { useState } from "react";
import Modal from "./Modal";

export type GenerativeItem = {
  id: string;
  name: string;
  type: "image" | "video";
  image: string;
};

export default function GenerativeGallery({ items }: { items: GenerativeItem[] }) {
  const [active,setActive] = useState<number|null>(null);

  const previous = () => {
    if (active === null) return;
    setActive((active - 1 + items.length) % items.length);
  };

  const next = () => {
    if (active === null) return;
    setActive((active + 1) % items.length);
  };

  return (
    <>
      <div className="travel-grid section-pad gen-travel-grid">
        {items.map((item,index) => (
          <figure className="travel-photo gen-photo" key={item.id}>
            <button
              className="travel-photo-button gen-photo-button"
              type="button"
              onClick={() => setActive(index)}
              aria-label={"Open " + item.name}
            >
              <img src={item.image} alt="" loading={index < 3 ? "eager" : "lazy"} />
              {item.type === "video" ? <span className="motion-badge">Motion</span> : null}
            </button>
          </figure>
        ))}
      </div>

      {active !== null && items[active] ? (
        <Modal className="art-lightbox gen-lightbox" label={items[active].name} onClose={() => setActive(null)} onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); next(); }
          if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
        }}>
          <button className="art-lightbox-close" type="button" onClick={() => setActive(null)} aria-label="Close viewer">×</button>
          <button className="art-lightbox-prev" type="button" onClick={previous} aria-label="Previous">←</button>
          <div className="art-lightbox-stage">
            {items[active].type === "video" ? (
              <iframe
                className="gen-drive-player"
                src={"https://drive.google.com/file/d/" + items[active].id + "/preview"}
                allow="autoplay; fullscreen"
                allowFullScreen
                title={items[active].name}
              />
            ) : (
              <img src={items[active].image} alt="" />
            )}
          </div>
          <button className="art-lightbox-next" type="button" onClick={next} aria-label="Next">→</button>
        </Modal>
      ) : null}
    </>
  );
}
