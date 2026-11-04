"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMusic } from "@/components/MusicProvider";

export default function GlobalMusicControls() {
  const music = useMusic();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (pathname === "/music" || !mounted) return null;

  const label = music.currentTrack
    ? [music.currentTrack.artist, music.currentTrack.title].filter(Boolean).join(" — ")
    : "Music";

  return createPortal(
    <>
      <style>{`
        /* Compact rounded player: restore cover and transport controls on mobile. */
        .global-music.global-music-restored {
          position:fixed!important;
          left:auto!important;
          right:18px!important;
          top:auto!important;
          bottom:18px!important;
          transform:none!important;
          display:flex!important;
          align-items:center!important;
          gap:4px!important;
          width:auto!important;
          max-width:calc(100vw - 24px)!important;
          min-height:48px!important;
          padding:5px 9px 5px 5px!important;
          border:1px solid var(--line)!important;
          border-radius:999px!important;
          background:color-mix(in srgb,var(--bg) 94%,transparent)!important;
          backdrop-filter:blur(14px)!important;
          box-shadow:none!important;
          z-index:2147483000!important;
          visibility:visible!important;
          opacity:1!important;
          pointer-events:auto!important;
        }
        .global-music.global-music-restored .global-music-cover {
          display:block!important;
          width:38px!important;
          height:38px!important;
          min-width:38px!important;
          flex:0 0 38px!important;
          margin:0 5px 0 0!important;
          border:0!important;
          border-radius:50%!important;
          overflow:hidden!important;
        }
        .global-music.global-music-restored .global-music-cover img,
        .global-music.global-music-restored .global-music-cover span {
          display:block!important;
          width:100%!important;
          height:100%!important;
          object-fit:cover!important;
        }
        .global-music.global-music-restored button.global-music-step,
        .global-music.global-music-restored button.global-music-play {
          display:inline-flex!important;
          align-items:center!important;
          justify-content:center!important;
          flex:0 0 40px!important;
          width:40px!important;
          min-width:40px!important;
          height:40px!important;
          min-height:40px!important;
          padding:0!important;
          border:0!important;
          border-radius:50%!important;
          background:transparent!important;
          color:var(--ink)!important;
          font-size:18px!important;
          cursor:pointer;
          touch-action:manipulation;
        }
        .global-music.global-music-restored button.global-music-play {font-size:17px!important}
        .global-music.global-music-restored .global-music-track {display:none!important}
        @media(max-width:900px) {
          .global-music.global-music-restored {
            right:12px!important;
            bottom:calc(12px + env(safe-area-inset-bottom,0px))!important;
          }
          .global-music.global-music-restored .global-music-cover {width:36px!important;height:36px!important;min-width:36px!important;flex-basis:36px!important}
          .global-music.global-music-restored button.global-music-step,
          .global-music.global-music-restored button.global-music-play {width:40px!important;height:40px!important;min-width:40px!important;min-height:40px!important}
        }
      `}</style>
      <div className="global-music global-music-restored" role="group" aria-label="Music controls">
        <Link href="/music" className="global-music-cover" aria-label="Open music page">
          {music.artworkUrl ? <img src={music.artworkUrl} alt="" /> : <span />}
        </Link>
        <button type="button" onClick={music.previous} aria-label="Previous song" className="global-music-step">←</button>
        <button type="button" onClick={music.toggle} aria-label={music.isPaused ? "Play music" : "Pause music"} className="global-music-play">
          <span aria-hidden="true"><span className="music-desktop-symbol">{music.isPaused ? "▸" : "▌▌"}</span><span className="music-mobile-symbol">{music.isPaused ? "▸" : "▌▌"}</span></span>
        </button>
        <button type="button" onClick={music.next} aria-label="Next song" className="global-music-step">→</button>
        <Link href="/music" className="global-music-track" title={label}>{label}</Link>
      </div>
    </>,
    document.body
  );
}
