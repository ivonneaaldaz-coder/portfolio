"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMusic } from "@/components/MusicProvider";

export default function GlobalMusicControls() {
  const music = useMusic();
  const pathname = usePathname();
  const [collapsed,setCollapsed] = useState(true);
  if (pathname === "/music") return null;
  const track = music.currentTrack;
  const label = track
    ? [track.artist,track.title].filter(Boolean).join(" — ")
    : "Music";

  return (
    <><style>{`@media(max-width:900px){.global-music.global-music-collapsed{width:auto!important;max-width:calc(100vw - 32px)!important;min-width:0!important;padding:4px!important;gap:4px!important}.global-music.global-music-collapsed .global-music-cover,.global-music.global-music-collapsed .global-music-track,.global-music.global-music-collapsed .global-music-step{display:none!important}.global-music .global-music-toggle{display:inline-flex!important;align-items:center;justify-content:center;min-width:44px;min-height:44px;border:0;background:transparent;color:inherit;cursor:pointer}.global-music button.global-music-step,.global-music button.global-music-play{min-width:44px!important;min-height:44px!important;touch-action:manipulation}.site-main{padding-bottom:80px!important}}@media(min-width:901px){.global-music .global-music-toggle{display:none!important}}@media(max-width:900px){.global-music.global-music-collapsed{right:12px!important;bottom:calc(12px + env(safe-area-inset-bottom,0px))!important;min-height:44px!important;border-radius:999px!important;padding:0 8px!important;box-shadow:none!important}.global-music.global-music-collapsed .global-music-toggle{min-width:56px!important;height:44px!important;font-size:12px!important;letter-spacing:.02em!important;padding:0 8px!important}.global-music.global-music-collapsed .global-music-play{width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important;border:0!important;background:transparent!important}.global-music.global-music-collapsed .global-music-track,.global-music.global-music-collapsed .global-music-cover,.global-music.global-music-collapsed .global-music-step{display:none!important}}`}</style><div className={"global-music"+(collapsed?" global-music-collapsed":"")} aria-label="Music controls"><button type="button" className="global-music-toggle" aria-label={collapsed?"Expand music controls":"Collapse music controls"} aria-expanded={!collapsed} onClick={()=>setCollapsed(v=>!v)}>{collapsed?"Music":"×"}</button>
      <Link href="/music" className="global-music-cover" aria-label="Open music page">
        {music.artworkUrl ? <img src={music.artworkUrl} alt="" /> : <span />}
      </Link>
      <button type="button" onClick={music.previous} aria-label="Previous song" className="global-music-step">←</button>
      <button
        type="button"
        onClick={music.toggle}
        aria-label={music.isPaused ? "Play music" : "Pause music"}
        className="global-music-play"
      >
        <span aria-hidden="true"><span className="music-desktop-symbol">{music.isPaused ? "▶" : "Ⅱ"}</span><span className="music-mobile-symbol">{music.isPaused ? "\u25B6\uFE0E" : "Ⅱ"}</span></span>
      </button>
      <button type="button" onClick={music.next} aria-label="Next song" className="global-music-step">→</button>
      <Link href="/music" className="global-music-track" title={label}>{label}</Link>
    </div></>
  );
}
