"use client";

import { useState } from "react";
import Modal from "./Modal";

export type ArtWork = {
  title: string;
  meta: string;
  image: string;
};

export default function ArtGallery({ works }: { works: ArtWork[] }) {
  const [active, setActive] = useState<number | null>(null);

  const previous = () => {
    if (active === null) return;
    setActive((active - 1 + works.length) % works.length);
  };

  const next = () => {
    if (active === null) return;
    setActive((active + 1) % works.length);
  };

  return (
    <>
      <div className="art-shop-grid section-pad">
        {works.map((work, index) => (
          <figure className="art-shop-item" key={work.title}>
            <button className="art-shop-image" type="button" onClick={() => setActive(index)} aria-label={"Open " + work.title}>
              <img src={work.image} alt={work.title} loading={index < 3 ? "eager" : "lazy"} />
            </button>
            <figcaption>
              <div>
                <h2>{work.title}</h2>
                <p>{work.meta}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {active !== null && (
        <Modal className="art-lightbox" label={works[active].title} onClose={() => setActive(null)} onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); next(); }
          if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
        }}>
          <button className="art-lightbox-close" type="button" onClick={() => setActive(null)} aria-label="Close artwork viewer">×</button>
          <button className="art-lightbox-prev" type="button" onClick={previous} aria-label="Previous artwork">←</button>

          <div className="art-lightbox-stage">
            <img src={works[active].image} alt={works[active].title} />
            <div className="art-lightbox-meta">
              <div>
                <h2>{works[active].title}</h2>
                <p>{works[active].meta}</p>
              </div>
            </div>
          </div>

          <button className="art-lightbox-next" type="button" onClick={next} aria-label="Next artwork">→</button>
        </Modal>
      )}
    </>
  );
}
