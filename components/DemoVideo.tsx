"use client";

import { useEffect, useRef } from "react";

/** Product / case-study video: shows a poster until it scrolls into view,
 *  then loads and plays muted on loop. Controls let visitors turn sound on. */
export default function DemoVideo({ src, poster, label, square = false }: { src: string; poster: string; label: string; square?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (video.preload !== "auto") { video.preload = "auto"; video.load(); }
        if (!still) video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    }, { rootMargin: "200px" });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={"demo-video" + (square ? " demo-video-square" : "")}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      controls
      preload="none"
      aria-label={label}
    />
  );
}
