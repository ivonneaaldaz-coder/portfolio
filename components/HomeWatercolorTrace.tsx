"use client";

import { useEffect, useRef } from "react";

/*
  Homepage watercolor.
  - One pigment (ultramarine), tuned separately for light and dark themes.
  - Each dab is an irregular blob with a darker "tide line" at the edge, the way
    real watercolor pools as it dries, plus paper grain punched out of the pigment.
  - Dabs spread while wet (~1s), hold, then dry away slowly instead of vanishing.
  - The load stroke stays as the page's painted mark; cursor strokes dry away.
  - A single stroke paints itself behind the headline on load, so visitors know
    the page responds before they move the mouse.
  - Touch: tap or drag to paint.
  - Reduced motion: one static stroke, no animation, no listeners.
*/

type Dab = {
  x: number;
  y: number;
  r: number;
  born: number;
  pts: number[]; // per-vertex radius multipliers (irregular edge)
  rot: number;
  hue: 0 | 1; // 0 = ultramarine, 1 = violet shift
  weight: number; // 0.6–1.2 pigment load
  keep?: boolean; // the load stroke stays; cursor strokes dry away
};

const VERTS = 28;
const WET_MS = 1000; // spreading
const HOLD_MS = 5200; // fully visible
const DRY_MS = 7000; // fade out
const LIFE_MS = WET_MS + HOLD_MS + DRY_MS;
const MAX_DABS = 240;

const PIGMENT = {
  dark: { base: [96, 118, 255], shift: [128, 100, 232], alpha: 0.16, edge: 0.5 },
  light: { base: [30, 52, 168], shift: [70, 46, 146], alpha: 0.13, edge: 0.4 },
} as const;

function makeDab(x: number, y: number, r: number, born: number, weight = 1): Dab {
  // Smoothed noise around the circle: organic, not spiky.
  const raw: number[] = [];
  for (let i = 0; i < VERTS; i++) raw.push(Math.random());
  const pts = raw.map((_, i) => {
    const avg = (raw[(i - 2 + VERTS) % VERTS] + raw[(i - 1 + VERTS) % VERTS] * 2 + raw[i] * 3 + raw[(i + 1) % VERTS] * 2 + raw[(i + 2) % VERTS]) / 9;
    return 0.82 + avg * 0.3;
  });
  return { x, y, r, born, pts, rot: Math.random() * Math.PI * 2, hue: Math.random() < 0.3 ? 1 : 0, weight };
}

function makeGrain(): HTMLCanvasElement {
  const g = document.createElement("canvas");
  g.width = g.height = 160;
  const gctx = g.getContext("2d");
  if (!gctx) return g;
  const img = gctx.createImageData(160, 160);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random();
    img.data[i] = img.data[i + 1] = img.data[i + 2] = 0;
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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dabs: Dab[] = [];
    const queue: Dab[] = []; // scheduled dabs (load stroke)
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let last: { x: number; y: number } | null = null;
    let touchPainting = false;
    const grain = makeGrain();
    let grainPattern: CanvasPattern | null = null;

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
      sizeLayers();
      if (!running) render(performance.now());
    };

    // Opacity over a dab's life: spread in, hold, dry away.
    const lifeAlpha = (age: number, keep?: boolean) => {
      if (keep && age >= WET_MS) return 1;
      if (age < WET_MS) return 0.35 + 0.65 * (age / WET_MS);
      if (age < WET_MS + HOLD_MS) return 1;
      const t = (age - WET_MS - HOLD_MS) / DRY_MS;
      return Math.max(0, 1 - t * t * (3 - 2 * t)); // smoothstep out
    };
    const lifeSpread = (age: number) => {
      const t = Math.min(1, age / WET_MS);
      return 0.55 + 0.45 * (1 - (1 - t) * (1 - t)); // ease-out growth while wet
    };

    // Offscreen layers at half resolution: watercolor is soft, so this keeps it cheap.
    const SCALE = 0.5;
    const wash = document.createElement("canvas");
    const rim = document.createElement("canvas");
    const wctx = wash.getContext("2d");
    const rctx = rim.getContext("2d");
    const canFilter = typeof (ctx as CanvasRenderingContext2D & { filter?: string }).filter === "string";
    const sizeLayers = () => {
      wash.width = rim.width = Math.max(1, Math.round(width * SCALE));
      wash.height = rim.height = Math.max(1, Math.round(height * SCALE));
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
      if (!dabs.length || !wctx || !rctx) return;
      const p = theme();

      // 1. Merge every dab into one wash, so overlaps read as a single continuous stroke.
      wctx.clearRect(0, 0, wash.width, wash.height);
      for (const d of dabs) {
        const age = reducedMotion ? WET_MS + 1 : now - d.born;
        if (age < 0) continue;
        const a = Math.min(1, lifeAlpha(age, d.keep) * d.weight);
        if (a <= 0.01) continue;
        const [r, g, b] = d.hue ? p.shift : p.base;
        wctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        blobPath(wctx, d, d.r * lifeSpread(age));
        wctx.fill();
      }

      // 2. Body of the wash: translucent and slightly soft.
      ctx.save();
      ctx.globalAlpha = p.alpha;
      if (canFilter) ctx.filter = "blur(2.5px)";
      ctx.drawImage(wash, 0, 0, width, height);
      ctx.restore();

      // 3. Tide line: only the outer contour gets darker, where pigment pools as it dries.
      if (canFilter) {
        rctx.clearRect(0, 0, rim.width, rim.height);
        rctx.globalCompositeOperation = "source-over";
        rctx.filter = "none";
        rctx.drawImage(wash, 0, 0);
        rctx.globalCompositeOperation = "destination-out";
        rctx.filter = "blur(4px)";
        rctx.drawImage(wash, 0, 0);
        rctx.globalCompositeOperation = "source-over";
        rctx.filter = "none";
        ctx.save();
        ctx.globalAlpha = p.edge;
        ctx.filter = "blur(1px)";
        ctx.drawImage(rim, 0, 0, width, height);
        ctx.restore();
      }

      // 4. Paper grain: punch tiny speckles out of the pigment only.
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
      while (queue.length && queue[0].born <= now) {
        const d = queue.shift();
        if (d) dabs.push(d);
      }
      for (let i = dabs.length - 1; i >= 0; i--) {
        if (!dabs[i].keep && now - dabs[i].born >= LIFE_MS) dabs.splice(i, 1);
      }
      while (dabs.length > MAX_DABS) {
        const i = dabs.findIndex((d) => !d.keep);
        if (i < 0) break;
        dabs.splice(i, 1);
      }
      render(now);
      const animating = queue.length || dabs.some((d) => !d.keep || now - d.born < WET_MS);
      if (animating) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const ensureLoop = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const addDab = (x: number, y: number, weight = 1) => {
      const now = performance.now();
      dabs.push(makeDab(x, y, 30 + Math.random() * 36, now, weight));
      // a smaller satellite bleed now and then
      if (Math.random() < 0.28) {
        const ang = Math.random() * Math.PI * 2;
        const dist = 26 + Math.random() * 30;
        dabs.push(makeDab(x + Math.cos(ang) * dist, y + Math.sin(ang) * dist, 12 + Math.random() * 14, now + 60, 0.8));
      }
      ensureLoop();
    };

    // One stroke that paints itself behind the headline on load.
    const loadStroke = (start: number) => {
      // Anchor to the headline (the canvas also runs under the sidebar).
      const rect = canvas.getBoundingClientRect();
      const h1 = canvas.parentElement?.querySelector("h1")?.getBoundingClientRect();
      const cx = h1 ? h1.left - rect.left + h1.width / 2 : width / 2;
      const cy = h1 ? h1.bottom - rect.top + Math.min(36, height * 0.04) : height * 0.5;
      const span = Math.min((h1?.width ?? width * 0.6) * 1.05, width * 0.9, 900);
      const x0 = cx - span / 2;
      const x1 = cx + span / 2;
      const steps = 26;
      const out: Dab[] = [];
      for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1);
        const x = x0 + (x1 - x0) * t;
        const y = cy + Math.sin(t * Math.PI * 1.15 + 0.4) * Math.min(height * 0.06, 48) - 18;
        const r = (34 + Math.sin(t * Math.PI) * 46) * (width < 640 ? 0.65 : 1);
        const d = makeDab(x, y, r, start + t * 1600, 0.85 + Math.sin(t * Math.PI) * 0.35);
        d.keep = true;
        out.push(d);
      }
      return out;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const themeWatch = new MutationObserver(() => { if (!running) render(performance.now()); });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (reducedMotion) {
      // Static painted stroke, no motion.
      dabs.push(...loadStroke(0));
      render(performance.now());
      return () => {
        observer.disconnect();
        themeWatch.disconnect();
      };
    }

    queue.push(...loadStroke(performance.now() + 450));
    ensureLoop();

    const paint = (event: PointerEvent) => {
      if (event.pointerType === "touch" && event.type === "pointermove" && !touchPainting) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) return;
      if (last && Math.hypot(x - last.x, y - last.y) < 14) return;
      last = { x, y };
      addDab(x, y);
    };
    const down = (event: PointerEvent) => {
      if (event.pointerType === "touch") touchPainting = true;
      last = null;
      paint(event);
      // a tap drops a fuller bloom
      if (event.pointerType === "touch") {
        const rect = canvas.getBoundingClientRect();
        addDab(event.clientX - rect.left + 8, event.clientY - rect.top - 6, 1.15);
      }
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
