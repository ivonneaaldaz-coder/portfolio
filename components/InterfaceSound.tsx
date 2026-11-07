"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "portfolio-interface-sound";
type Tone = "click" | "card" | "page" | "toggle";

export default function InterfaceSound() {
  const [enabled, setEnabled] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const last = useRef(0);

  useEffect(() => {
    try { setEnabled(localStorage.getItem(KEY) === "on"); } catch {}
  }, []);

  useEffect(() => {
    if (!enabled || window.matchMedia("(max-width: 900px)").matches) return;
    const onClick = (event: MouseEvent) => {
      if (!event.isTrusted || event.button !== 0) return;
      const el = event.target;
      if (!(el instanceof Element)) return;
      const target = el.closest("a, button, summary, [role='button'], [role='tab']");
      if (!target || target.closest("[data-no-ui-sound], .global-music, .music-player") || target.hasAttribute("disabled") || target.getAttribute("aria-disabled") === "true") return;
      if (target instanceof HTMLAnchorElement && (target.protocol === "mailto:" || target.protocol === "tel:")) return;
      const now = performance.now();
      if (now - last.current < 85) return;
      last.current = now;
      const tone: Tone = target.closest(".selected-work-projects, .selected-work-project-preview, .selected-work-index") ? "card"
        : target.closest(".books-page, .book-card, .book-modal, .library-page") ? "page"
        : target.matches("summary, [aria-expanded]") ? "toggle" : "click";
      try {
        const ctx = audio.current ?? new AudioContext();
        audio.current = ctx;
        if (ctx.state === "suspended") void ctx.resume();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 1250;
        oscillator.type = tone === "page" ? "sine" : "triangle";
        const frequency = tone === "card" ? 390 : tone === "page" ? 290 : tone === "toggle" ? 460 : 530;
        const duration = tone === "page" ? 0.095 : tone === "card" ? 0.07 : 0.045;
        const start = ctx.currentTime;
        oscillator.frequency.setValueAtTime(frequency, start);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * (tone === "page" ? 1.12 : 0.78), start + duration);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.009, start + 0.007);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        oscillator.connect(filter).connect(gain).connect(ctx.destination);
        oscillator.start(start);
        oscillator.stop(start + duration + 0.005);
        oscillator.onended = () => { oscillator.disconnect(); filter.disconnect(); gain.disconnect(); };
      } catch { /* audio is optional; never block navigation */ }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled]);

  const toggle = () => {
    setEnabled(value => {
      const next = !value;
      try { localStorage.setItem(KEY, next ? "on" : "off"); } catch {}
      return next;
    });
  };

  return <button type="button" className="interface-sound-toggle" data-no-ui-sound aria-label={enabled ? "Turn interface sounds off" : "Turn interface sounds on"} aria-pressed={enabled} title={enabled ? "Interface sounds on" : "Interface sounds off"} onClick={toggle}><span aria-hidden="true">{enabled ? "◖))" : "◖×"}</span><span>Sound {enabled ? "on" : "off"}</span></button>;
}
