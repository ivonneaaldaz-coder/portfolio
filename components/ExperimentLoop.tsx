"use client";

import { useEffect, useRef, useState } from "react";

/** Transparent, looping card preview that only loads/plays while on screen.
 *  Chrome/Firefox/Edge get a VP9 video with alpha; Safari (no VP9 alpha) gets
 *  the animated WebP, which is transparent everywhere. Reduced motion: still poster. */
export default function ExperimentLoop({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"video" | "image" | "still">("video");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setMode("still"); return; }
    const ua = navigator.userAgent;
    if (/^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(ua) || /iPhone|iPad/i.test(ua)) setMode("image");
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (mode !== "video" || !video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (video.preload !== "auto") { video.preload = "auto"; video.load(); }
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { rootMargin: "200px" });
    io.observe(video);
    return () => io.disconnect();
  }, [mode]);

  if (mode !== "video") {
    return <img className="experiment-loop" src={`/experiments/${mode === "image" ? name + ".webp" : name + "-poster.png"}`} alt={label} loading="lazy" />;
  }
  return (
    <video ref={ref} className="experiment-loop" poster={`/experiments/${name}-poster.png`} muted loop playsInline preload="none" aria-label={label}>
      <source src={`/experiments/${name}.webm`} type="video/webm" />
    </video>
  );
}
