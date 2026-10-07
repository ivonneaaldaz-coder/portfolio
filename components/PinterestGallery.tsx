"use client";

import { useEffect, useMemo, useState } from "react";
import type { PinterestPin } from "@/lib/pinterest";

const PAGE_SIZE = 48;

export default function PinterestGallery({ pins }: { pins: PinterestPin[] }) {
  const [active, setActive] = useState("All");
  const [shown, setShown] = useState(PAGE_SIZE);

  const boards = useMemo(() => {
    const counts = new Map<string, number>();

    pins.forEach((pin) => {
      counts.set(pin.boardName, (counts.get(pin.boardName) || 0) + 1);
    });

    return [
      "All",
      ...Array.from(counts.entries())
        .filter(([name]) => Boolean(name))
        .sort((a, b) => b[1] - a[1])
        .map(([name]) => name),
    ];
  }, [pins]);

  const filtered = useMemo(
    () => (active === "All" ? pins : pins.filter((pin) => pin.boardName === active)),
    [active, pins],
  );

  const visible = filtered.slice(0, shown);

  useEffect(() => {
    setShown(PAGE_SIZE);
  }, [active]);

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
          {boards.map((board) => {
            const count = board === "All"
              ? pins.length
              : pins.filter((pin) => pin.boardName === board).length;

            return (
              <button
                key={board}
                type="button"
                className={active === board ? "active" : ""}
                onClick={() => setActive(board)}
              >
                {board} <span>{count}</span>
              </button>
            );
          })}
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

      {shown < filtered.length ? (
        <div className="pinterest-load-more-wrap">
          <button
            className="pinterest-load-more"
            type="button"
            onClick={() => setShown((current) => current + PAGE_SIZE)}
          >
            Load more <span>({filtered.length - shown})</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
