"use client";

import Link from "next/link";
import { useMusic } from "@/components/MusicProvider";

export default function GlobalMusicControls() {
  const music = useMusic();
  const track = music.currentTrack;
  const label = track
    ? [track.artist,track.title].filter(Boolean).join(" — ")
    : "Play music";

  return (
    <div className="global-music" aria-label="Music controls">
      <Link href="/music" className="global-music-cover" aria-label="Open music">
        {music.artworkUrl ? <img src={music.artworkUrl} alt="" /> : <span />}
      </Link>
      <button type="button" onClick={music.previous} aria-label="Previous song">←</button>
      <button type="button" onClick={music.toggle} aria-label={music.isPaused ? "Play music" : "Pause music"}>
        {music.isPaused ? "▶" : "Ⅱ"}
      </button>
      <button type="button" onClick={music.next} aria-label="Next song">→</button>
      <Link href="/music" className="global-music-track">{label}</Link>
    </div>
  );
}
