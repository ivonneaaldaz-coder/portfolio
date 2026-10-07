"use client";

import { useMemo, useState } from "react";
import type { PinterestPin } from "@/lib/pinterest";

export default function PinterestGallery({ pins }: { pins: PinterestPin[] }) {
  const [active, setActive] = useState("All");

  const boards = useMemo(() => {
    const unique = Array.from(new Set(pins.map((pin) => pin.boardName))).filter(Boolean);
    return ["All", ...unique].slice(0, 9);
  }, [pins]);

  const visible = active === "All" ? pins : pins.filter((pin) => pin.boardName === active);

  if (!pins.length) {
    return (
      <div className="pinterest-empty">
        <p>Visual references are loading from Pinterest.</p>
        <a href="https://www.pinterest.com/ivonnealdaz/_pins/" target="_blank" rel="noreferrer">
          View on Pinterest ↗︎
        </a>
      </div>
    );
  }

  return (
    <>
      {boards.length > 2 ? (
        <div className="pinterest-filters" aria-label="Filter visual references">
          {boards.map((board) => (
            <button
              key={board}
              type="button"
              className={active === board ? "active" : ""}
              onClick={() => setActive(board)}
            >
              {board}
            </button>
          ))}
        </div>
      ) : null}

      <div className="pinterest-native-grid">
        {visible.map((pin) => (
          <a
            key={pin.id}
            className="pinterest-native-card"
            href={pin.pinUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={pin.title ? `${pin.title} on Pinterest` : "Open Pin on Pinterest"}
          >
            <img src={pin.imageUrl} alt={pin.altText} loading="lazy" decoding="async" />
            <div className="pinterest-native-meta">
              <span>{pin.boardName}</span>
              {pin.title ? <p>{pin.title}</p> : null}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
