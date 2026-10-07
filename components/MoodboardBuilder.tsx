"use client";

import { useEffect, useMemo, useState } from "react";
import type { PinterestPin } from "@/lib/pinterest";

const STOP = new Set([
  "about","after","again","against","also","because","before","being","between","could","every","from",
  "have","into","just","more","most","other","over","pinterest","saved","some","such","than","that","their",
  "them","there","these","they","this","those","through","very","what","when","where","which","while","with",
  "would","your","image","images","design","ideas","inspiration","style"
]);

function themeFromPins(pins: PinterestPin[], fallback: string) {
  const counts = new Map<string, number>();
  pins.forEach((pin) => {
    const text = `${pin.title} ${pin.description}`.toLowerCase();
    (text.match(/[a-z][a-z-]{3,}/g) || []).forEach((word) => {
      if (!STOP.has(word)) counts.set(word, (counts.get(word) || 0) + 1);
    });
  });
  const words = [...counts.entries()]
    .sort((a,b) => b[1] - a[1])
    .slice(0,3)
    .map(([word]) => word.replace(/-/g," "));
  return words.length >= 2 ? words.map(w => w[0].toUpperCase()+w.slice(1)).join(" / ") : fallback;
}

function pickPins(pool: PinterestPin[], offset: number) {
  if (pool.length <= 8) return pool;
  const picks: PinterestPin[] = [];
  for (let i=0; i<8; i++) {
    picks.push(pool[(offset + i * Math.max(1, Math.floor(pool.length / 8))) % pool.length]);
  }
  return [...new Map(picks.map(pin => [pin.id,pin])).values()].slice(0,8);
}

export default function MoodboardBuilder({ pins }: { pins: PinterestPin[] }) {
  const [source, setSource] = useState("Latest saves");
  const [stage, setStage] = useState<"source"|"generating"|"review"|"saving"|"saved">("source");
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState<PinterestPin[]>([]);
  const [theme, setTheme] = useState("");
  const [caption, setCaption] = useState("");
  const [driveConnected, setDriveConnected] = useState(false);
  const [folderUrl, setFolderUrl] = useState("");

  useEffect(() => {
    fetch("/api/google-drive/status",{cache:"no-store"})
      .then(r=>r.json())
      .then(d=>setDriveConnected(Boolean(d.connected)))
      .catch(()=>setDriveConnected(false));
  },[]);

  const boards = useMemo(() => {
    const counts = new Map<string,number>();
    pins.forEach(pin => counts.set(pin.boardName,(counts.get(pin.boardName)||0)+1));
    return [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,12);
  },[pins]);

  const pool = useMemo(() => {
    if (source === "Latest saves") return pins.slice(0,80);
    return pins.filter(pin=>pin.boardName===source);
  },[pins,source]);

  const generate = () => {
    setStage("generating");
    window.setTimeout(() => {
      const edit = pickPins(pool,offset);
      const fallback = source === "Latest saves" ? "Recent Visual Edit" : source;
      const generatedTheme = themeFromPins(edit,fallback);
      setSelected(edit);
      setTheme(generatedTheme);
      setCaption(`Visual notes: ${generatedTheme.toLowerCase().replaceAll(" / ",", ")}.`);
      setStage("review");
    },900);
  };

  const regenerate = () => {
    setOffset(v=>v+7);
    setStage("generating");
    window.setTimeout(() => {
      const edit = pickPins(pool,offset+7);
      const fallback = source === "Latest saves" ? "Recent Visual Edit" : source;
      const generatedTheme = themeFromPins(edit,fallback);
      setSelected(edit);
      setTheme(generatedTheme);
      setCaption(`Visual notes: ${generatedTheme.toLowerCase().replaceAll(" / ",", ")}.`);
      setStage("review");
    },700);
  };

  const save = async () => {
    if (!driveConnected) {
      window.location.href = "/api/google-drive/connect";
      return;
    }
    setStage("saving");
    const response = await fetch("/api/moodboard/save",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({theme,caption,pins:selected})
    });
    const data = await response.json();
    if (!response.ok) {
      setStage("review");
      alert(data.error || "Could not save the moodboard.");
      return;
    }
    setFolderUrl(data.openFolderUrl || "");
    setStage("saved");
  };

  return (
    <section id="moodboard-builder" className="moodboard-builder">
      <div className="moodboard-builder-head">
        <div>
          <p className="eyebrow">BUILD MOODBOARD</p>
          <h2>{stage==="source" ? "Choose your source." : stage==="generating" ? "Building the edit…" : "Review the edit."}</h2>
        </div>
        <span className="moodboard-step">{stage==="source" ? "01 / 03" : stage==="generating" ? "02 / 03" : "03 / 03"}</span>
      </div>

      {stage==="source" ? (
        <div className="moodboard-source-panel">
          <button className={source==="Latest saves"?"active":""} onClick={()=>setSource("Latest saves")}>
            <span>Latest saves</span><small>{Math.min(80,pins.length)} pins</small>
          </button>
          {boards.map(([board,count])=>(
            <button key={board} className={source===board?"active":""} onClick={()=>setSource(board)}>
              <span>{board}</span><small>{count} pins</small>
            </button>
          ))}
          <div className="moodboard-builder-footer">
            <p>{pool.length} references available</p>
            <button className="experiment-launch" onClick={generate} disabled={!pool.length}>Generate edit →</button>
          </div>
        </div>
      ) : null}

      {stage==="generating" ? (
        <div className="moodboard-generating" aria-live="polite">
          <div className="moodboard-pulse" />
          <p>Pulling a coherent set from {source.toLowerCase()}…</p>
        </div>
      ) : null}

      {(stage==="review" || stage==="saving" || stage==="saved") ? (
        <>
          <div className="moodboard-review-top">
            <div>
              <label htmlFor="moodboard-theme">Theme</label>
              <input id="moodboard-theme" value={theme} onChange={e=>setTheme(e.target.value)} />
            </div>
            <div>
              <label htmlFor="moodboard-caption">Caption draft</label>
              <textarea id="moodboard-caption" value={caption} onChange={e=>setCaption(e.target.value)} rows={3} />
            </div>
          </div>

          <div className="moodboard-carousel-preview">
            <div className="moodboard-slide moodboard-cover-slide">
              <span>MOODBOARD</span>
              <h3>{theme}</h3>
              <p>Visual references / Ivonne Aldaz</p>
            </div>
            {selected.map((pin,index)=>(
              <div className="moodboard-slide" key={pin.id}>
                <img src={pin.imageUrl} alt={pin.altText} />
                <span>{String(index+2).padStart(2,"0")}</span>
              </div>
            ))}
          </div>

          <div className="moodboard-review-actions">
            <button type="button" onClick={regenerate} disabled={stage==="saving"}>Regenerate edit</button>
            <button className="experiment-launch" type="button" onClick={save} disabled={stage==="saving" || stage==="saved"}>
              {stage==="saving" ? "Saving to Drive…" : stage==="saved" ? "Saved ✓" : driveConnected ? "Save to Drive →" : "Connect Drive + save →"}
            </button>
            {stage==="saved" && folderUrl ? <a href={folderUrl} target="_blank" rel="noreferrer">Open Drive folder ↗︎</a> : null}
          </div>
        </>
      ) : null}
    </section>
  );
}
