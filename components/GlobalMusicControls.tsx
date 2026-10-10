"use client";

import Link from "next/link";
import { useMusic } from "@/components/MusicProvider";

export default function GlobalMusicControls() {
  const music = useMusic();
  const track = music.currentTrack;
  const label = track
    ? [track.artist,track.title].filter(Boolean).join(" — ")
    : "Music";

  return (
    <div className="global-music" aria-label="Music controls">
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
        <span aria-hidden="true">{music.isPaused ? "Play" : "Pause"}</span>
      </button>
      <button type="button" onClick={music.next} aria-label="Next song" className="global-music-step">→</button>
      <Link href="/music" className="global-music-track" title={label}>{label}</Link>
    </div>
  );
}
