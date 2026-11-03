"use client";

import { useEffect, useRef } from "react";

/*
  Homepage watercolor — pigment blooms.
  - Moving leaves only a hairline of pigment that fades within a second. When the cursor rests for a moment, a drop of pigment blooms
    on the paper around it: it spreads softly while you stay, stops when you move on,
    then dries away. The page stays quiet while people read and responds when they linger.
  - Touch: touching the page drops pigment where your finger lands; holding lets it spread
    further. Scrolling and tapping links work as normal (listeners are passive, canvas has
    no pointer events).
  - One ultramarine pigment (matches the "Available" dot), tuned for light and dark themes.
    Each bloom is drawn as one shape, so it fades evenly; only its outer edge darkens
    (the drying ring), plus paper grain.
  - Reduced motion: no painting.
*/

type Blob = { dx: number; dy: number; dist: number; scale: number; pts: number[]; rot: number; shift: boolean };
type Bloom = {
  x: number;
  y: number;
  maxR: number;
  start: number;
  stop: number | null; // when it stopped spreading (cursor moved on / finger lifted)
  blobs: Blob[];
};

const VERTS = 28;
const DWELL_MS = 650; // how long the cursor rests before pigment drops
const SPREAD_MS = 3200; // time to reach full size if you keep resting
const TOUCH_SPREAD_MS = 900;
const MOUSE_RELEASE_SPREAD_MS = 700; // after a finger lifts, the drop keeps spreading this long
const HOLD_MS = 700; // stays at full strength after it stops spreading
const DRY_MS = 3400; // then dries away
const MOVE_TOLERANCE = 14; // px the cursor can drift and still count as resting
const MAX_BLOOMS = 4;
const TRAIL_MS = 1100; // the hairline behind a moving cursor fades within this long
const TRAIL_WIDTH = 3; // px at its freshest point; it thins toward the tail

const PIGMENT = {
  dark: { base: [96, 118, 255], shift: [124, 102, 230], alpha: 0.15, edge: 0.27, trail: 0.22 },
  light: { base: [30, 52, 168], shift: [66, 46, 146], alpha: 0.12, edge: 0.36, trail: 0.16 },
} as const;

function shape(): { pts: number[]; rot: number } {
  // Smoothed noise around a circle: organic, not spiky.
  const raw: number[] = [];
  for (let i = 0; i < VERTS; i++) raw.push(Math.random());
  const pts = raw.map((_, i) => {
    const avg =
      (raw[(i - 2 + VERTS) % VERTS] + raw[(i - 1 + VERTS) % VERTS] * 2 + raw[i] * 3 + raw[(i + 1) % VERTS] * 2 + raw[(i + 2) % VERTS]) / 9;
    return 0.8 + avg * 0.34;
  });
  return { pts, rot: Math.random() * Math.PI * 2 };
}

function makeBloom(x: number, y: number, maxR: number, start: number): Bloom {
  // A centre pool plus a few lobes that push outward as it spreads: the soft, cauliflower edge of a real bloom.
  // Lopsided on purpose: a few uneven lobes, mostly to one side, so it never reads as a cloud or flower.
  const blobs: Blob[] = [{ dx: 0, dy: 0, dist: 0, scale: 0.84, ...shape(), shift: false }];
  const lobes = 3 + Math.floor(Math.random() * 2);
  const lean = Math.random() * Math.PI * 2;
  for (let i = 0; i < lobes; i++) {
    const ang = lean + (Math.random() - 0.5) * Math.PI * 1.5;
    blobs.push({
      dx: Math.cos(ang),
      dy: Math.sin(ang),
      dist: 0.18 + Math.random() * 0.26,
      scale: 0.36 + Math.random() * 0.3,
      ...shape(),
      shift: Math.random() < 0.3,
    });
  }
  return { x, y, maxR, start, stop: null, blobs };
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

    const blooms: Bloom[] = [];
    const trail: { x: number; y: number; t: number; brk?: boolean }[] = []; // brk: start of a new line (no joining segment)
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let dwellTimer = 0;
    let pointer: { x: number; y: number } | null = null;
    let active: Bloom | null = null; // the bloom currently spreading
    const grain = makeGrain();
    let grainPattern: CanvasPattern | null = null;

    // Half-resolution layers: watercolor is soft, so this keeps it cheap.
    const SCALE = 0.5;
    const scratch = document.createElement("canvas"); // one bloom, opaque
    const wash = document.createElement("canvas"); // all blooms, each at its own strength
    const rim = document.createElement("canvas"); // drying ring
    const sctx = scratch.getContext("2d");
    const wctx = wash.getContext("2d");
    const rctx = rim.getContext("2d");
    const canFilter = typeof ctx.filter === "string";

    const theme = () => (document.documentElement.dataset.theme === "dark" ? PIGMENT.dark : PIGMENT.light);
    const isSmall = () => width < 700;

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

    const ease = (t: number) => 1 - (1 - t) ** 3;
    const radiusOf = (b: Bloom, now: number) => {
      const spreadEnd = b.stop === null ? now : Math.min(now, b.stop);
      const t = Math.min(1, Math.max(0, spreadEnd - b.start) / SPREAD_MS);
      return b.maxR * (0.18 + 0.82 * ease(t));
    };
    const strength = (b: Bloom, now: number) => {
      const fadeIn = Math.min(1, (now - b.start) / 500);
      if (b.stop === null || now < b.stop) return fadeIn;
      const since = now - b.stop;
      if (since < HOLD_MS) return fadeIn;
      const t = Math.min(1, (since - HOLD_MS) / DRY_MS);
      return fadeIn * (1 - t * t * (3 - 2 * t));
    };
    const finished = (b: Bloom, now: number) => b.stop !== null && now - b.stop > HOLD_MS + DRY_MS;

    const blobPath = (c: CanvasRenderingContext2D, cx: number, cy: number, rad: number, pts: number[], rot: number) => {
      c.beginPath();
      for (let i = 0; i <= VERTS; i++) {
        const k = i % VERTS;
        const ang = rot + (k / VERTS) * Math.PI * 2;
        const rr = rad * pts[k];
        const px = (cx + Math.cos(ang) * rr) * SCALE;
        const py = (cy + Math.sin(ang) * rr) * SCALE;
        if (i === 0) c.moveTo(px, py);
        else {
          const prev = (k - 1 + VERTS) % VERTS;
          const pang = rot + ((k - 0.5) / VERTS) * Math.PI * 2;
          const pr = rad * (pts[prev] + pts[k]) * 0.5;
          c.quadraticCurveTo((cx + Math.cos(pang) * pr) * SCALE, (cy + Math.sin(pang) * pr) * SCALE, px, py);
        }
      }
      c.closePath();
    };

    // The hairline: a thin, faint line straight behind the cursor that thins and fades as it ages.
    const drawTrail = (now: number) => {
      if (trail.length < 2) return;
      const p = theme();
      const [r, g, b] = p.base;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const c = trail[i];
        if (c.brk) continue;
        const f = Math.max(0, 1 - (now - c.t) / TRAIL_MS);
        if (f <= 0) continue;
        const prev = i > 1 && !a.brk ? trail[i - 2] : a;
        const next = c;
        ctx.strokeStyle = `rgba(${r},${g},${b},${p.trail * f * f})`;
        ctx.lineWidth = TRAIL_WIDTH * (0.35 + 0.65 * f);
        ctx.beginPath();
        ctx.moveTo((prev.x + a.x) / 2, (prev.y + a.y) / 2);
        ctx.quadraticCurveTo(a.x, a.y, (a.x + next.x) / 2, (a.y + next.y) / 2);
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      drawTrail(now);
      if (!blooms.length || !sctx || !wctx || !rctx) return;
      const p = theme();

      // 1. Each bloom is drawn opaque as one shape, then laid into the wash at its own strength.
      wctx.clearRect(0, 0, wash.width, wash.height);
      let painted = false;
      for (const b of blooms) {
        const a = strength(b, now);
        if (a <= 0.01) continue;
        const r = radiusOf(b, now);
        sctx.clearRect(0, 0, scratch.width, scratch.height);
        for (const blob of b.blobs) {
          const [cr, cg, cb] = blob.shift ? p.shift : p.base;
          sctx.fillStyle = `rgb(${cr},${cg},${cb})`;
          blobPath(sctx, b.x + blob.dx * blob.dist * r, b.y + blob.dy * blob.dist * r, r * blob.scale, blob.pts, blob.rot);
          sctx.fill();
        }
        wctx.globalAlpha = a;
        wctx.drawImage(scratch, 0, 0);
        painted = true;
      }
      wctx.globalAlpha = 1;
      if (!painted) return;

      // 2. Body: translucent and soft.
      ctx.save();
      ctx.globalAlpha = p.alpha;
      if (canFilter) ctx.filter = "blur(3px)";
      ctx.drawImage(wash, 0, 0, width, height);
      ctx.restore();

      // 3. Drying ring on the outer edge only.
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
      for (let i = blooms.length - 1; i >= 0; i--) {
        if (finished(blooms[i], now)) blooms.splice(i, 1);
      }
      while (trail.length && now - trail[0].t > TRAIL_MS) trail.shift();
      render(now);
      if (blooms.length || trail.length) frame = requestAnimationFrame(tick);
      else running = false;
    };
    const ensureLoop = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const startBloom = (x: number, y: number) => {
      const now = performance.now();
      const base = isSmall() ? 70 : 105;
      const b = makeBloom(x, y, base + Math.random() * base * 0.35, now);
      blooms.push(b);
      while (blooms.length > MAX_BLOOMS) {
        const old = blooms.shift();
        if (old && old.stop === null) old.stop = now;
      }
      active = b;
      ensureLoop();
    };
    const stopActive = (extra = 0) => {
      if (active && active.stop === null) active.stop = performance.now() + extra;
      active = null;
    };

    const local = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const inside = (pt: { x: number; y: number }) => pt.x >= 0 && pt.y >= 0 && pt.x <= width && pt.y <= height;

    // Mouse / pen: rest to bloom.
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const pt = local(event);
      if (!inside(pt)) {
        window.clearTimeout(dwellTimer);
        stopActive(MOUSE_RELEASE_SPREAD_MS);
        pointer = null;
        return;
      }
      if (active && Math.hypot(pt.x - active.x, pt.y - active.y) > MOVE_TOLERANCE) stopActive(MOUSE_RELEASE_SPREAD_MS);
      if (pointer && Math.hypot(pt.x - pointer.x, pt.y - pointer.y) < 2) return; // ignore jitter
      pointer = pt;
      const now = performance.now();
      const last = trail[trail.length - 1];
      const brk = !last || now - last.t > 150 || Math.hypot(pt.x - last.x, pt.y - last.y) > 160;
      trail.push({ x: pt.x, y: pt.y, t: now, brk });
      if (trail.length > 160) trail.shift();
      ensureLoop();
      window.clearTimeout(dwellTimer);
      dwellTimer = window.setTimeout(() => {
        if (pointer && !active) startBloom(pointer.x, pointer.y);
      }, DWELL_MS);
    };
    const leave = () => {
      window.clearTimeout(dwellTimer);
      stopActive(MOUSE_RELEASE_SPREAD_MS);
      pointer = null;
    };

    // Touch: a drop lands where the finger touches; holding lets it spread further.
    let touchStart: { x: number; y: number } | null = null;
    const down = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      const pt = local(event);
      if (!inside(pt)) return;
      touchStart = pt;
      startBloom(pt.x, pt.y);
    };
    const touchMove = (event: PointerEvent) => {
      if (event.pointerType !== "touch" || !touchStart) return;
      const pt = local(event);
      if (Math.hypot(pt.x - touchStart.x, pt.y - touchStart.y) > 12) {
        stopActive(); // the finger is scrolling: let this drop settle where it is
        touchStart = null;
      }
    };
    const up = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      stopActive(TOUCH_SPREAD_MS); // a drop keeps spreading a little after the finger lifts
      touchStart = null;
    };
    const cancel = () => {
      stopActive();
      touchStart = null;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const themeWatch = new MutationObserver(() => {
      if (!running) render(performance.now());
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointermove", touchMove, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", cancel);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(dwellTimer);
      observer.disconnect();
      themeWatch.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointermove", touchMove);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", cancel);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="home-watercolor-trace" aria-hidden="true" />;
}
