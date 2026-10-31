"use client";

import { useEffect, useRef } from "react";

type Stroke = { x: number; y: number; radius: number; born: number };

export default function HomeWatercolorTrace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const strokes: Stroke[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let last: { x: number; y: number } | null = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" && event.type === "pointermove") return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) return;
      if (last && Math.hypot(x - last.x, y - last.y) < 9) return;
      last = { x, y };
      strokes.push({ x, y, radius: 28 + Math.random() * 32, born: performance.now() });
      if (strokes.length > 90) strokes.shift();
    };
    const leave = () => { last = null; };
    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      for (let i = strokes.length - 1; i >= 0; i--) {
        const dot = strokes[i];
        const age = (now - dot.born) / 2400;
        if (age >= 1) { strokes.splice(i, 1); continue; }
        const opacity = (1 - age) * 0.085;
        const radius = dot.radius * (1 + age * 0.75);
        const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, radius);
        gradient.addColorStop(0, "rgba(112, 151, 173, " + opacity + ")");
        gradient.addColorStop(0.45, "rgba(146, 120, 156, " + opacity * 0.45 + ")");
        gradient.addColorStop(1, "rgba(146, 120, 156, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerdown", move);
    canvas.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerdown", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);
  return <canvas ref={canvasRef} className="home-watercolor-trace" aria-hidden="true" />;
}
