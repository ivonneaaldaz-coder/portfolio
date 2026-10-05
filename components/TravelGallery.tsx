"use client";

import { useState } from "react";
import Modal from "./Modal";

export type TravelPhoto = {
  place: string;
  image: string;
};

export default function TravelGallery({ photographs }: { photographs: TravelPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);

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
        <Modal className="art-lightbox travel-lightbox" label={photographs[active].place} onClose={() => setActive(null)} onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); next(); }
          if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
        }}>
          <button className="art-lightbox-close" type="button" onClick={() => setActive(null)} aria-label="Close photo viewer">×</button>
          <button className="art-lightbox-prev" type="button" onClick={previous} aria-label="Previous photo">←</button>

          <div className="art-lightbox-stage">
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
