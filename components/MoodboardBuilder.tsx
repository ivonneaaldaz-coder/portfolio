"use client";

import { useEffect, useMemo, useState } from "react";
import type { PinterestPin } from "@/lib/pinterest";

type Stage = "onboarding" | "connecting" | "source" | "generating" | "review" | "saving" | "saved";

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function editorialTheme(pins: PinterestPin[], source: string) {
  const text = pins.map((pin) => `${pin.title} ${pin.description} ${pin.boardName}`).join(" ").toLowerCase();
  const sourceLower = source.toLowerCase();

  if (sourceLower.includes("art")) return "Pigment / Gesture / Imperfect Edges";
  if (sourceLower.includes("fashion")) return "Soft Structure / Deep Neutrals / Sharp Details";
  if (sourceLower.includes("home")) return "Warm Wood / Low Light / Collected Rooms";
  if (sourceLower.includes("brand")) return "Type / Restraint / Unexpected Detail";
  if (sourceLower.includes("destination") || sourceLower.includes("travel")) return "Old Stone / Open Air / Sun-Faded Color";
  if (sourceLower.includes("food")) return "Texture / Color / Shared Tables";
  if (sourceLower.includes("quote")) return "Words / White Space / Margins";

  const art = ["painting","paint","canvas","gallery","artist","drawing","studio","abstract"];
  const home = ["interior","room","stair","wall","chair","cabinet","sofa","house","wood","walnut","oak"];
  const fashion = ["dress","coat","look","outfit","fashion","shoe","bag","jacket"];
  const brand = ["type","logo","identity","editorial","poster","graphic","packaging"];
  const travel = ["travel","hotel","coast","stone","villa","sea","city","architecture"];

  const score = (terms: string[]) => terms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0);
  const ranked = [
    { label:"Pigment / Gesture / Imperfect Edges", score:score(art) },
    { label:"Warm Wood / Low Light / Collected Rooms", score:score(home) },
    { label:"Soft Structure / Deep Neutrals / Sharp Details", score:score(fashion) },
    { label:"Type / Restraint / Unexpected Detail", score:score(brand) },
    { label:"Old Stone / Open Air / Sun-Faded Color", score:score(travel) },
  ].sort((a,b) => b.score - a.score);

  if (ranked[0].score > 0) return ranked[0].label;
  if (includesAny(text, ["red","burgundy","crimson"])) return "Deep Red / Gloss / Graphic Tension";
  if (includesAny(text, ["blue","sea","sky","cobalt"])) return "Washed Blue / Stone / Open Air";
  if (includesAny(text, ["chrome","metal","silver","steel"])) return "Chrome / Hard Edges / Soft Light";
  return "Texture / Restraint / Unexpected Detail";
}

function editorialCaption(theme: string) {
  const items = theme
    .split("/")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return `Pinterest finds: ${items.join(", ")}.`;
}

function pickPins(pool: PinterestPin[], offset: number) {
  if (pool.length <= 8) return pool;
  const picks: PinterestPin[] = [];
  for (let i = 0; i < 8; i++) {
    picks.push(pool[(offset + i * Math.max(1, Math.floor(pool.length / 8))) % pool.length]);
  }
  return [...new Map(picks.map((pin) => [pin.id, pin])).values()].slice(0, 8);
}

export default function MoodboardBuilder({ demoPins }: { demoPins: PinterestPin[] }) {
  const [stage, setStage] = useState<Stage>("onboarding");
  const [pins, setPins] = useState<PinterestPin[]>([]);
  const [source, setSource] = useState("Latest saves");
  const [isDemo, setIsDemo] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState<PinterestPin[]>([]);
  const [theme, setTheme] = useState("");
  const [caption, setCaption] = useState("");
  const [driveConnected, setDriveConnected] = useState(false);
  const [folderUrl, setFolderUrl] = useState("");
  const [loadingPinterest, setLoadingPinterest] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("pinterest") === "connected") {
      setStage("connecting");
    }

    Promise.all([
      fetch("/api/pinterest/status", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/google-drive/status", { cache: "no-store" }).then((r) => r.json()),
    ]).then(async ([pinterest, drive]) => {
      setDriveConnected(Boolean(drive.connected));
      if (pinterest.connected) {
        const response = await fetch("/api/pinterest/pins", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          setPins(data.pins || []);
          setIsDemo(false);
          setStage("source");
        }
      }
      setLoadingPinterest(false);
    }).catch(() => {
      setLoadingPinterest(false);
      if (params.get("pinterest") === "connected") setStage("onboarding");
    });
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("moodboard-agent-draft-v2");
    if (!saved) return;
    try {
      const draft = JSON.parse(saved);
      if (draft?.selected?.length) {
        setSelected(draft.selected);
        setTheme(draft.theme || "");
        setCaption(draft.caption || "");
        setSource(draft.source || "Latest saves");
        setStage("review");
      }
    } catch {}
  }, []);

  const boards = useMemo(() => {
    const counts = new Map<string, number>();
    pins.forEach((pin) => counts.set(pin.boardName, (counts.get(pin.boardName) || 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  }, [pins]);

  const pool = useMemo(() => {
    if (source === "Latest saves") return pins.slice(0, 80);
    return pins.filter((pin) => pin.boardName === source);
  }, [pins, source]);

  const startDemo = () => {
    setPins(demoPins);
    setIsDemo(true);
    setSource("Latest saves");
    setStage("source");
  };

  const generate = (nextOffset = offset) => {
    setStage("generating");
    window.setTimeout(() => {
      const edit = pickPins(pool, nextOffset);
      const generatedTheme = editorialTheme(edit, source);
      setSelected(edit);
      setTheme(generatedTheme);
      setCaption(editorialCaption(generatedTheme));
      setStage("review");
    }, 900);
  };

  const regenerate = () => {
    const next = offset + 7;
    setOffset(next);
    generate(next);
  };

  const save = async () => {
    const draft = { selected, theme, caption, source };
    window.localStorage.setItem("moodboard-agent-draft-v2", JSON.stringify(draft));

    if (!driveConnected) {
      window.location.href = "/api/google-drive/connect";
      return;
    }

    setStage("saving");
    const response = await fetch("/api/moodboard/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme, caption, pins: selected }),
    });
    const data = await response.json();

    if (!response.ok) {
      setStage("review");
      alert(data.error || "Could not save the moodboard.");
      return;
    }

    setFolderUrl(data.openFolderUrl || "");
    setStage("saved");
    window.localStorage.removeItem("moodboard-agent-draft-v2");
  };

  return (
    <section id="moodboard-builder" className="moodboard-builder">
      {stage === "onboarding" ? (
        <>
          <div className="moodboard-builder-head">
            <div>
              <p className="eyebrow">BUILD MOODBOARD</p>
              <h2>Start with your saves.</h2>
            </div>
            <span className="moodboard-step">01 / 04</span>
          </div>

          <div className="moodboard-onboarding-grid">
            <a className="moodboard-onboarding-card primary" href="/api/pinterest/connect">
              <span>01</span>
              <h3>{loadingPinterest ? "Checking Pinterest…" : "Connect Pinterest"}</h3>
              <p>Use your own boards and recent saves to build a visual edit.</p>
              <strong>Continue with Pinterest →</strong>
            </a>
            <button className="moodboard-onboarding-card" type="button" onClick={startDemo}>
              <span>02</span>
              <h3>Try the demo</h3>
              <p>See how it works with a sample library before connecting anything.</p>
              <strong>Use demo references →</strong>
            </button>
          </div>
        </>
      ) : null}

      {stage === "connecting" ? (
        <div className="moodboard-connecting" aria-live="polite">
          <div className="moodboard-connecting-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="eyebrow">PINTEREST CONNECTED</p>
          <h2>Loading your boards.</h2>
          <p>Pulling your recent saves and organizing your sources…</p>
        </div>
      ) : null}

      {stage === "source" ? (
        <>
          <div className="moodboard-builder-head">
            <div>
              <p className="eyebrow">{isDemo ? "DEMO MODE" : "PINTEREST CONNECTED"}</p>
              <h2>Choose your source.</h2>
            </div>
            <span className="moodboard-step">02 / 04</span>
          </div>

          <div className="moodboard-source-panel">
            <button className={source === "Latest saves" ? "active" : ""} onClick={() => setSource("Latest saves")}>
              <span>Latest saves</span><small>{Math.min(80, pins.length)} pins</small>
            </button>
            {boards.map(([board, count]) => (
              <button key={board} className={source === board ? "active" : ""} onClick={() => setSource(board)}>
                <span>{board}</span><small>{count} pins</small>
              </button>
            ))}
            <div className="moodboard-builder-footer">
              <div>
                <p>{pool.length} references available</p>
                {isDemo ? <button type="button" className="moodboard-text-action" onClick={() => setStage("onboarding")}>Connect your Pinterest instead</button> : null}
              </div>
              <button className="experiment-launch" onClick={() => generate()} disabled={!pool.length}>Generate edit →</button>
            </div>
          </div>
        </>
      ) : null}

      {stage === "generating" ? (
        <div className="moodboard-generating" aria-live="polite">
          <div className="moodboard-pulse" />
          <p>Finding the visual thread…</p>
        </div>
      ) : null}

      {(stage === "review" || stage === "saving" || stage === "saved") ? (
        <>
          <div className="moodboard-builder-head">
            <div>
              <p className="eyebrow">VISUAL EDIT</p>
              <h2>Review the edit.</h2>
            </div>
            <span className="moodboard-step">03 / 04</span>
          </div>

          <div className="moodboard-review-top">
            <div>
              <label htmlFor="moodboard-theme">Theme</label>
              <input id="moodboard-theme" value={theme} onChange={(e) => setTheme(e.target.value)} />
            </div>
            <div>
              <label htmlFor="moodboard-caption">Caption draft</label>
              <textarea id="moodboard-caption" value={caption} onChange={(e) => setCaption(e.target.value)} rows={4} />
            </div>
          </div>

          <div className="moodboard-carousel-preview">
            <div className="moodboard-slide moodboard-cover-slide moodboard-cover-editorial">
              {selected[0] ? <img className="moodboard-cover-image" src={selected[0].imageUrl} alt="" /> : null}
              <div className="moodboard-cover-copy">
                <span>MOODBOARD</span>
                <h3>{theme}</h3>
              </div>
            </div>
            {selected.slice(1).map((pin, index) => (
              <div className="moodboard-slide" key={pin.id}>
                <img src={pin.imageUrl} alt={pin.altText} />
                <span>{String(index + 2).padStart(2, "0")}</span>
              </div>
            ))}
          </div>

          <div className="moodboard-review-actions">
            <button type="button" onClick={regenerate} disabled={stage === "saving"}>Regenerate edit</button>
            <button className="experiment-launch" type="button" onClick={save} disabled={stage === "saving" || stage === "saved"}>
              {stage === "saving" ? "Saving…" : stage === "saved" ? "Saved ✓" : driveConnected ? "Save to Drive →" : "Save to Drive →"}
            </button>
            {stage === "saved" && folderUrl ? <a href={folderUrl} target="_blank" rel="noreferrer">Open Drive folder ↗︎</a> : null}
          </div>
          {!driveConnected && stage === "review" ? <p className="moodboard-save-note">Google Drive connects only when you save.</p> : null}
        </>
      ) : null}
    </section>
  );
}
