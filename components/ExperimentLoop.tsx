"use client";

import { useEffect, useRef } from "react";

/** Muted, looping card video that only loads/plays while on screen.
 *  Falls back to the poster image for reduced-motion visitors. */
export default function ExperimentLoop({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
  }, []);

  return (
    <video
      ref={ref}
      className="experiment-loop"
      poster={`/experiments/${name}.webp`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    >
      <source src={`/experiments/${name}.webm`} type="video/webm" />
      <source src={`/experiments/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
