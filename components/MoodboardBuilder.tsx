"use client";

import { useEffect, useMemo, useState } from "react";
import type { PinterestPin } from "@/lib/pinterest";

type Stage = "onboarding" | "connecting" | "source" | "generating" | "review" | "downloading" | "downloaded";

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

function captionOptions(theme: string, source: string) {
  const items = theme
    .split("/")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  const list = items.length > 1
    ? `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`
    : items[0] || "a few things worth saving";

  const sourceLabel = source === "Latest saves" ? "recent saves" : `${source} saves`;

  return [
    `A few things catching my eye lately: ${list}.`,
    `Pulled from my ${sourceLabel} — ${list}. Saving the thread before it disappears.`,
    `No big thesis. Just a visual thread I keep coming back to: ${list}.`,
    `An edit from the current Pinterest rabbit hole: ${list}.`,
    `The references have been quietly agreeing with each other lately. ${list}.`,
  ];
}

function editorialCaption(theme: string, source: string, variant = 0) {
  const options = captionOptions(theme, source);
  return options[((variant % options.length) + options.length) % options.length];
}

function pickPins(pool: PinterestPin[], offset: number) {
  if (pool.length <= 8) return pool;
  const picks: PinterestPin[] = [];
  for (let i = 0; i < 8; i++) {
    picks.push(pool[(offset + i * Math.max(1, Math.floor(pool.length / 8))) % pool.length]);
  }
  return [...new Map(picks.map((pin) => [pin.id, pin])).values()].slice(0, 8);
}

function wrapCoverTitle(
  context: CanvasRenderingContext2D,
  value: string,
  maxWidth: number,
) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const test = (line + " " + word).trim();
    if (line && context.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }

  if (line) lines.push(line);
  return lines.slice(0, 3);
}

async function renderCoverVisual(imageUrl: string, title: string) {
  const image = new Image();
  image.decoding = "async";
  image.src = `/api/moodboard/image?src=${encodeURIComponent(imageUrl)}`;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Could not load the cover image for export."));
  });

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not prepare the cover visual.");

  const targetWidth = 1080;
  const targetHeight = 900;
  const scale = Math.max(targetWidth / image.naturalWidth, targetHeight / image.naturalHeight);
  const sourceWidth = targetWidth / scale;
  const sourceHeight = targetHeight / scale;
  const sourceX = Math.max(0, (image.naturalWidth - sourceWidth) / 2);
  const sourceY = Math.max(0, (image.naturalHeight - sourceHeight) / 2);

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    targetWidth,
    targetHeight,
  );

  context.fillStyle = "#f1eee7";
  context.fillRect(0, 900, 1080, 450);

  context.textBaseline = "alphabetic";
  context.fillStyle = "#6d6961";
  context.font = '700 18px "Helvetica Neue", Helvetica, Arial, sans-serif';
  context.fillText("MOODBOARD", 64, 972);

  context.fillStyle = "#11110f";
  context.font = '500 78px "Helvetica Neue", Helvetica, Arial, sans-serif';
  const lines = wrapCoverTitle(context, title || "Visual Edit", 952);
  lines.forEach((line, index) => context.fillText(line, 64, 1104 + index * 82));

  return canvas.toDataURL("image/webp", 0.94);
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
  const [coverTitle, setCoverTitle] = useState("");
  const [captionVariant, setCaptionVariant] = useState(0);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [loadingPinterest, setLoadingPinterest] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("pinterest") === "connected") {
      setStage("connecting");
    }

    fetch("/api/pinterest/status", { cache: "no-store" })
      .then((response) => response.json())
      .then(async (pinterest) => {
        if (pinterest.connected) {
          setStage("connecting");
          const response = await fetch("/api/pinterest/pins", { cache: "no-store" });
          if (response.ok) {
            const data = await response.json();
            setPins(data.pins || []);
            setIsDemo(false);
            setStage("source");
          } else {
            setStage("onboarding");
          }
        }
        setLoadingPinterest(false);
      })
      .catch(() => {
        setLoadingPinterest(false);
        setStage("onboarding");
      });
  }, []);;

  useEffect(() => {
    const saved = window.localStorage.getItem("moodboard-agent-draft-v2");
    if (!saved) return;
    try {
      const draft = JSON.parse(saved);
      if (draft?.selected?.length) {
        setSelected(draft.selected);
        setTheme(draft.theme || "");
        setCaption(draft.caption || "");
        setCoverTitle(draft.coverTitle || draft.theme || "");
        setCaptionVariant(0);
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

  const connectPinterest = () => {
    setStage("connecting");
    window.setTimeout(() => {
      window.location.href = "/api/pinterest/connect";
    }, 280);
  };

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
      setCaptionVariant(0);
      setCaption(editorialCaption(generatedTheme, source, 0));
      setCoverTitle(generatedTheme);
      setStage("review");
    }, 900);
  };

  const regenerate = () => {
    const next = offset + 7;
    setOffset(next);
    generate(next);
  };

  const download = async () => {
    setStage("downloading");

    try {
      const coverPin = selected[0];
      const coverVisualDataUrl = coverPin
        ? await renderCoverVisual(coverPin.imageUrl, coverTitle)
        : "";

      const response = await fetch("/api/moodboard/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme,
          caption,
          coverTitle,
          coverPinId: coverPin?.id,
          coverVisualDataUrl,
          pins: selected,
        }),
      });

      if (!response.ok) {
        setStage("review");
        const data = await response.json().catch(() => ({}));
        alert(data.error || "Could not generate the download.");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const disposition = response.headers.get("Content-Disposition") || "";
      const match = disposition.match(/filename="([^"]+)"/);
      const filename = match?.[1] || "moodboard.zip";

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);

      setStage("downloaded");
    } catch (error) {
      console.error("Moodboard cover export failed:", error);
      setStage("review");
      alert("Could not prepare the cover visual. Please try again.");
    }
  };

  const copyCaption = async () => {
    await navigator.clipboard.writeText(caption);
    setCopiedCaption(true);
    window.setTimeout(() => setCopiedCaption(false), 1400);
  };

  const replacePhoto = (slideIndex: number) => {
    const candidates = pool.length ? pool : pins;
    if (!candidates.length || !selected[slideIndex]) return;

    const usedIds = new Set(selected.map((pin, index) => index === slideIndex ? "" : pin.id));
    const currentId = selected[slideIndex].id;
    const start = Math.max(0, candidates.findIndex((pin) => pin.id === currentId));

    let replacement: PinterestPin | undefined;
    for (let step = 1; step <= candidates.length; step++) {
      const candidate = candidates[(start + step) % candidates.length];
      if (!usedIds.has(candidate.id)) {
        replacement = candidate;
        break;
      }
    }

    if (!replacement || replacement.id === currentId) return;

    setSelected((current) =>
      current.map((pin, index) => index === slideIndex ? replacement as PinterestPin : pin),
    );
  };

  const regenerateCaption = () => {
    const nextVariant = captionVariant + 1;
    setCaptionVariant(nextVariant);
    setCaption(editorialCaption(theme, source, nextVariant));
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
          </div>

          <div className="moodboard-onboarding-grid">
            <button className="moodboard-onboarding-card primary" type="button" onClick={connectPinterest}>
              <span>01</span>
              <h3>{loadingPinterest ? "Checking Pinterest…" : "Connect Pinterest"}</h3>
              <p>Use your own boards and recent saves to build a visual edit.</p>
              <strong>Continue with Pinterest →</strong>
            </button>
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
          </div>

          <div className="moodboard-source-panel">
            <button className={source === "Latest saves" ? "active" : ""} onClick={() => { setSource("Latest saves"); setOffset(0); }}>
              <span>Latest saves</span><small>{Math.min(80, pins.length)} pins</small>
            </button>
            {boards.map(([board, count]) => (
              <button key={board} className={source === board ? "active" : ""} onClick={() => { setSource(board); setOffset(0); }}>
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

      {(stage === "review" || stage === "downloading" || stage === "downloaded") ? (
        <>
          <div className="moodboard-builder-head">
            <div>
              <p className="eyebrow">VISUAL EDIT</p>
              <h2>Review the edit.</h2>
            </div>
            <button
              type="button"
              className="moodboard-source-switcher"
              onClick={() => setStage("source")}
              aria-label="Change Pinterest source"
            >
              <span>Source</span>
              <strong>{source}</strong>
              <span aria-hidden="true">↓</span>
            </button>
          </div>

          <div className="moodboard-review-top moodboard-caption-only">
            <div>
              <div className="moodboard-field-label-row">
                <label htmlFor="moodboard-caption">Caption draft</label>
                <div className="moodboard-caption-tools">
                  <button type="button" className="moodboard-caption-regenerate" onClick={regenerateCaption}>
                    Regenerate
                  </button>
                  <button type="button" className="moodboard-copy-button" onClick={copyCaption} aria-label="Copy caption" title={copiedCaption ? "Copied" : "Copy caption"}>
                    {copiedCaption ? "✓" : "⧉"}
                  </button>
                </div>
              </div>
              <textarea id="moodboard-caption" value={caption} onChange={(e) => setCaption(e.target.value)} rows={2} />
            </div>
          </div>

          <p className="moodboard-cover-help">
            Everything here is editable — rewrite the cover title or use <strong>Replace photo</strong> on any slide. Your download will match the edit.
          </p>

          <div className="moodboard-carousel-preview">
            <div className="moodboard-slide moodboard-cover-slide moodboard-cover-editorial">
              {selected[0] ? <img className="moodboard-cover-image" src={selected[0].imageUrl} alt="" /> : null}
              <button type="button" className="moodboard-cover-photo-action" onClick={() => replacePhoto(0)}>Replace photo</button>
              <div className="moodboard-cover-copy">
                <span>MOODBOARD</span>
                <textarea
                  className="moodboard-cover-title-input"
                  aria-label="Cover title"
                  value={coverTitle}
                  onChange={(e) => setCoverTitle(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            {selected.slice(1).map((pin, index) => (
              <div className="moodboard-slide" key={`${pin.id}-${index}`}>
                <img src={pin.imageUrl} alt={pin.altText} />
                <button
                  type="button"
                  className="moodboard-cover-photo-action moodboard-slide-photo-action"
                  onClick={() => replacePhoto(index + 1)}
                >
                  Replace photo
                </button>
                <span>{String(index + 2).padStart(2, "0")}</span>
              </div>
            ))}
          </div>

          <div className="moodboard-review-actions">
            <button type="button" onClick={regenerate} disabled={stage === "downloading"}>Regenerate edit</button>
            <button className="experiment-launch" type="button" onClick={download} disabled={stage === "downloading"}>
              {stage === "downloading" ? "Preparing download…" : stage === "downloaded" ? "Download again →" : "Download ZIP →"}
            </button>
          </div>
          <p className="moodboard-save-note">Includes carousel PNGs + numbered source links.</p>
        </>
      ) : null}
    </section>
  );
}
