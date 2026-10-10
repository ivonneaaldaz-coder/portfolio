"use client";

import Link from "next/link";
import { useMusic } from "@/components/MusicProvider";

export default function GlobalMusicControls() {
  const music = useMusic();
  const track = music.currentTrack;
  const trackLabel = track
    ? [track.artist,track.title].filter(Boolean).join(" — ")
    : "Music";

  return (
    <div className="global-music" aria-label="Music controls">
      <Link href="/music" className="global-music-label" aria-label="Open music page">Music</Link>
      <button
        type="button"
        className="global-music-toggle"
        onClick={music.toggle}
        aria-label={music.isPaused ? "Play music" : "Pause music"}
        title={music.isPaused ? "Play music" : "Pause music"}
      >
        <span aria-hidden="true">{music.isPaused ? "Play" : "Pause"}</span>
      </button>
      <Link href="/music" className="global-music-track" title={trackLabel}>{trackLabel}</Link>
    </div>
  );
}
