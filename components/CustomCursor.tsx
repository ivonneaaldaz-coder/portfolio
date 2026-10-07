"use client";

import { useEffect, useRef } from "react";

/**
 * A small ink dot that tracks the pointer exactly, plus a soft ring that follows
 * with a little lag. Over links/buttons the ring opens up; over external links,
 * videos and zoomable images it shows a tiny hint (↗, ▶, +).
 * Mouse/trackpad only — touch devices and text fields keep the native cursor.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = dot.current!, r = ring.current!;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, shown = false;
    const loop = () => {
      const k = reduced ? 1 : 0.2;
      rx += (x - rx) * k; ry += (y - ry) * k;
      d.style.transform = `translate3d(${x}px,${y}px,0)`;
      r.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const hintFor = (el: Element | null) => {
      if (!el) return { state: "", hint: "" };
      if (el.closest("input, textarea, select, [contenteditable='true']")) return { state: "text", hint: "" };
      if (el.closest("video")) return { state: "hover", hint: "▶" };
      const a = el.closest("a, button, summary, label, [role='button']") as HTMLElement | null;
      if (!a) {
        if (el.closest("[style*='zoom-in'], .art-shop-image, .travel-photo-button")) return { state: "hover", hint: "+" };
        return { state: "", hint: "" };
      }
      if (a.tagName === "A" && (a as HTMLAnchorElement).target === "_blank") return { state: "hover", hint: "↗" };
      if (getComputedStyle(a).cursor === "zoom-in") return { state: "hover", hint: "+" };
      return { state: "hover", hint: "" };
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      if (!shown) { rx = x; ry = y; shown = true; root.classList.add("cursor-shown"); }
      const { state, hint } = hintFor(e.target as Element);
      r.dataset.state = state; d.dataset.state = state;
      r.dataset.hint = hint;
      kick();
    };
    const onLeave = () => { shown = false; root.classList.remove("cursor-shown"); };
    const onDown = () => r.classList.add("is-down");
    const onUp = () => r.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor", "cursor-shown");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
