"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PinterestPin } from "@/lib/pinterest";

const PAGE_SIZE = 48;

export default function PinterestGallery({ pins }: { pins: PinterestPin[] }) {
  const [active, setActive] = useState("All");
  const filterRef = useRef<HTMLDivElement>(null);
  const categoryTouchRef = useRef<{x:number;y:number;name:string}|null>(null);
  const [shown, setShown] = useState(PAGE_SIZE);
  const [columnCount, setColumnCount] = useState(4);

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
  const selectCategory = (name:string) => {
    setActive(name);
    const buttons=filterRef.current?.querySelectorAll("button");
    const index=boards.indexOf(name);
    if(index>=0)buttons?.[index]?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
  };

  const columns = useMemo(() => {
    const next = Array.from({ length: columnCount }, () => [] as PinterestPin[]);
    visible.forEach((pin, index) => {
      next[index % columnCount].push(pin);
    });
    return next;
  }, [visible, columnCount]);

  useEffect(() => {
    setShown(PAGE_SIZE);
  }, [active]);

  useEffect(() => {
    const updateColumns = () => setColumnCount(window.innerWidth <= 900 ? 3 : 4);
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

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
        <div className="pinterest-filters" ref={filterRef} aria-label="Filter visual references" onTouchStart={e=>{const t=e.touches[0];categoryTouchRef.current={x:t.clientX,y:t.clientY,name:active}}} onTouchEnd={e=>{const start=categoryTouchRef.current;categoryTouchRef.current=null;if(!start)return;const t=e.changedTouches[0];const dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)>32&&Math.abs(dx)>Math.abs(dy)*1.2){const index=boards.indexOf(start.name);selectCategory(boards[Math.max(0,Math.min(boards.length-1,index+(dx<0?1:-1)))])}}} style={{overflowX:"auto",overscrollBehaviorX:"contain",WebkitOverflowScrolling:"touch",flexWrap:"nowrap",touchAction:"pan-y"}}>
          {boards.map((board) => {
            const count = board === "All"
              ? pins.length
              : pins.filter((pin) => pin.boardName === board).length;

            return (
              <button
                key={board}
                type="button"
                className={active === board ? "active" : ""}
                onClick={() => selectCategory(board)}
              >
                {board} <span>{count}</span>
              </button>
            );
          })}
        </div>
      ) : null}
      {boards.length > 2 ? <p className="pinterest-filter-hint" style={{fontSize:11,opacity:0.65,marginTop:10,marginBottom:32}}>Swipe to switch categories →</p> : null}

      <div className="pinterest-native-grid" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
        {columns.map((column, columnIndex) => (
          <div className="pinterest-native-column" key={columnIndex}>
            {column.map((pin) => (
              <a
                key={pin.id}
                className="pinterest-native-card"
                href={pin.pinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={pin.title ? `${pin.title} on Pinterest` : "Open Pin on Pinterest"}
              >
                <img src={pin.imageUrl} alt={pin.altText} loading="lazy" decoding="async" />
              </a>
            ))}
          </div>
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
