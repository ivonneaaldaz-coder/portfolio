"use client";

import Link from "next/link";
import { useMusic } from "@/components/MusicProvider";

export default function GlobalMusicControls() {
  const music = useMusic();
  const label = music.currentTrack
    ? [music.currentTrack.artist,music.currentTrack.title].filter(Boolean).join(" — ")
    : (music.currentPlaylist?.title || "Play music");

  return (
    <div className="global-music" aria-label="Music controls">
      <button type="button" onClick={music.previous} aria-label="Previous song">←</button>
      <button type="button" onClick={music.toggle} aria-label={music.isPaused ? "Play music" : "Pause music"}>
        {music.isPaused ? "▶" : "Ⅱ"}
      </button>
      <button type="button" onClick={music.next} aria-label="Next song">→</button>
      <Link href="/music" className="global-music-track">{label}</Link>
    </div>
  );
}
