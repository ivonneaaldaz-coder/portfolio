"use client";

import { useEffect, useRef } from "react";

/*
  Homepage watercolor — quiet version.
  - One pigment (ultramarine; matches the "Available" dot), tuned for light and dark themes.
  - The cursor leaves a thin brush trail that spreads slightly while wet, then dries away within a few seconds.
  - Each continuous gesture is one stroke: its marks merge into a single wash and fade together,
    so overlaps never stack into circles. Only the outer edge darkens (tide line), plus paper grain.
  - A short gesture paints itself under the headline on load, then dries like any other stroke.
    Nothing stays on the page.
  - Touch: drag to paint. Reduced motion: no painting at all.
*/

type Dab = { x: number; y: number; r: number; born: number; pts: number[]; rot: number; shift: boolean };
type Stroke = { dabs: Dab[]; last: number };

const VERTS = 28;
const WET_MS = 600; // a mark spreads slightly after it lands
const HOLD_MS = 450; // segment stays fully visible after it ends
const DRY_MS = 2200; // then dries away
const GAP_MS = 280; // a pause longer than this starts a new stroke
const MAX_STROKES = 10;
const MAX_DABS_PER_STROKE = 40; // long gestures split into segments that dry behind the cursor
const SPACING = 7; // px between marks, filled in along fast moves

const PIGMENT = {
  dark: { base: [96, 118, 255], shift: [124, 102, 230], alpha: 0.13, edge: 0.38 },
  light: { base: [30, 52, 168], shift: [66, 46, 146], alpha: 0.11, edge: 0.32 },
} as const;

function makeDab(x: number, y: number, r: number, born: number): Dab {
  // Smoothed noise around the circle: organic, not spiky.
  const raw: number[] = [];
  for (let i = 0; i < VERTS; i++) raw.push(Math.random());
  const pts = raw.map((_, i) => {
    const avg =
      (raw[(i - 2 + VERTS) % VERTS] + raw[(i - 1 + VERTS) % VERTS] * 2 + raw[i] * 3 + raw[(i + 1) % VERTS] * 2 + raw[(i + 2) % VERTS]) / 9;
    return 0.84 + avg * 0.26;
  });
  return { x, y, r, born, pts, rot: Math.random() * Math.PI * 2, shift: Math.random() < 0.25 };
}

function makeGrain(): HTMLCanvasElement {
  const g = document.createElement("canvas");
  g.width = g.height = 160;
  const gctx = g.getContext("2d");
  if (!gctx) return g;
  const img = gctx.createImageData(160, 160);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random();
    img.data[i + 3] = v > 0.72 ? Math.round((v - 0.72) * 520) : 0;
  }
  gctx.putImageData(img, 0, 0);
  return g;
}

export default function HomeWatercolorTrace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const strokes: Stroke[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let last: { x: number; y: number } | null = null;
    let touchPainting = false;
    const grain = makeGrain();
    let grainPattern: CanvasPattern | null = null;

    // Half-resolution layers: watercolor is soft, so this keeps it cheap.
    const SCALE = 0.5;
    const scratch = document.createElement("canvas"); // one stroke, opaque
    const wash = document.createElement("canvas"); // all strokes, each at its own fade
    const rim = document.createElement("canvas"); // tide line
    const sctx = scratch.getContext("2d");
    const wctx = wash.getContext("2d");
    const rctx = rim.getContext("2d");
    const canFilter = typeof ctx.filter === "string";

    const theme = () => (document.documentElement.dataset.theme === "dark" ? PIGMENT.dark : PIGMENT.light);

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grainPattern = ctx.createPattern(grain, "repeat");
      for (const c of [scratch, wash, rim]) {
        c.width = Math.max(1, Math.round(width * SCALE));
        c.height = Math.max(1, Math.round(height * SCALE));
      }
      if (!running) render(performance.now());
    };

    const strokeAlpha = (s: Stroke, now: number) => {
      const since = now - s.last;
      if (since < HOLD_MS) return 1;
      const t = Math.min(1, (since - HOLD_MS) / DRY_MS);
      return 1 - t * t * (3 - 2 * t);
    };
    const spread = (age: number) => {
      const t = Math.min(1, age / WET_MS);
      return 0.6 + 0.4 * (1 - (1 - t) * (1 - t));
    };

    const blobPath = (c: CanvasRenderingContext2D, d: Dab, rad: number) => {
      c.beginPath();
      for (let i = 0; i <= VERTS; i++) {
        const k = i % VERTS;
        const ang = d.rot + (k / VERTS) * Math.PI * 2;
        const rr = rad * d.pts[k];
        const px = (d.x + Math.cos(ang) * rr) * SCALE;
        const py = (d.y + Math.sin(ang) * rr) * SCALE;
        if (i === 0) c.moveTo(px, py);
        else {
          const prev = (k - 1 + VERTS) % VERTS;
          const pang = d.rot + ((k - 0.5) / VERTS) * Math.PI * 2;
          const pr = rad * (d.pts[prev] + d.pts[k]) * 0.5;
          c.quadraticCurveTo((d.x + Math.cos(pang) * pr) * SCALE, (d.y + Math.sin(pang) * pr) * SCALE, px, py);
        }
      }
      c.closePath();
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      if (!strokes.length || !sctx || !wctx || !rctx) return;
      const p = theme();

      // 1. Each stroke is drawn opaque, then laid into the wash at its own fade.
      wctx.clearRect(0, 0, wash.width, wash.height);
      let painted = false;
      for (const s of strokes) {
        const a = strokeAlpha(s, now);
        if (a <= 0.01) continue;
        sctx.clearRect(0, 0, scratch.width, scratch.height);
        let any = false;
        for (const d of s.dabs) {
          const age = now - d.born;
          if (age < 0) continue;
          const [r, g, b] = d.shift ? p.shift : p.base;
          sctx.fillStyle = `rgb(${r},${g},${b})`;
          blobPath(sctx, d, d.r * spread(age));
          sctx.fill();
          any = true;
        }
        if (!any) continue;
        wctx.globalAlpha = a;
        wctx.drawImage(scratch, 0, 0);
        painted = true;
      }
      wctx.globalAlpha = 1;
      if (!painted) return;

      // 2. Body: translucent and soft.
      ctx.save();
      ctx.globalAlpha = p.alpha;
      if (canFilter) ctx.filter = "blur(2.5px)";
      ctx.drawImage(wash, 0, 0, width, height);
      ctx.restore();

      // 3. Tide line on the outer contour only.
      if (canFilter) {
        rctx.clearRect(0, 0, rim.width, rim.height);
        rctx.globalCompositeOperation = "source-over";
        rctx.filter = "none";
        rctx.drawImage(wash, 0, 0);
        rctx.globalCompositeOperation = "destination-out";
        rctx.filter = "blur(3px)";
        rctx.drawImage(wash, 0, 0);
        rctx.globalCompositeOperation = "source-over";
        rctx.filter = "none";
        ctx.save();
        ctx.globalAlpha = p.edge;
        ctx.filter = "blur(1px)";
        ctx.drawImage(rim, 0, 0, width, height);
        ctx.restore();
      }

      // 4. Paper grain, punched out of the pigment only.
      if (grainPattern) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = grainPattern;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }
    };

    const tick = (now: number) => {
      for (let i = strokes.length - 1; i >= 0; i--) {
        if (now - strokes[i].last > HOLD_MS + DRY_MS) strokes.splice(i, 1);
      }
      render(now);
      if (strokes.length) frame = requestAnimationFrame(tick);
      else running = false;
    };
    const ensureLoop = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const addDab = (x: number, y: number) => {
      const now = performance.now();
      let s = strokes[strokes.length - 1];
      if (!s || now - s.last > GAP_MS || s.dabs.length >= MAX_DABS_PER_STROKE) {
        s = { dabs: [], last: now };
        strokes.push(s);
        while (strokes.length > MAX_STROKES) strokes.shift();
      }
      s.dabs.push(makeDab(x, y, 8 + Math.random() * 6, now));
      s.last = now;
      ensureLoop();
    };

    // A short gesture under the headline on load, so visitors know the page responds. It dries like any other.
    const loadGesture = (start: number) => {
      const rect = canvas.getBoundingClientRect();
      const h1 = canvas.parentElement?.querySelector("h1")?.getBoundingClientRect();
      const cx = h1 ? h1.left - rect.left + h1.width / 2 : width / 2;
      const cy = h1 ? h1.bottom - rect.top + 14 : height * 0.5;
      const span = Math.min((h1?.width ?? width * 0.5) * 0.42, 320);
      const steps = 40;
      const dabs: Dab[] = [];
      for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1);
        const x = cx - span / 2 + span * t;
        const y = cy + Math.sin(t * Math.PI * 1.1 + 0.3) * 8;
        dabs.push(makeDab(x, y, 6 + Math.sin(t * Math.PI) * 7, start + t * 900));
      }
      return { dabs, last: start + 1600 };
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const themeWatch = new MutationObserver(() => {
      if (!running) render(performance.now());
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    strokes.push(loadGesture(performance.now() + 500));
    ensureLoop();

    const paint = (event: PointerEvent) => {
      if (event.pointerType === "touch" && !touchPainting) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) return;
      if (!last) {
        last = { x, y };
        addDab(x, y);
        return;
      }
      const dist = Math.hypot(x - last.x, y - last.y);
      if (dist < SPACING) return;
      // Fill in along fast moves so the trail reads as one line, not beads.
      const steps = Math.min(40, Math.floor(dist / SPACING));
      for (let i = 1; i <= steps; i++) addDab(last.x + ((x - last.x) * i) / steps, last.y + ((y - last.y) * i) / steps);
      last = { x, y };
    };
    const down = (event: PointerEvent) => {
      if (event.pointerType === "touch") touchPainting = true;
      last = null;
      paint(event);
    };
    const up = () => {
      touchPainting = false;
      last = null;
    };

    window.addEventListener("pointermove", paint, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    document.documentElement.addEventListener("pointerleave", up);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeWatch.disconnect();
      window.removeEventListener("pointermove", paint);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      document.documentElement.removeEventListener("pointerleave", up);
    };
  }, []);

  return <canvas ref={canvasRef} className="home-watercolor-trace" aria-hidden="true" />;
}
