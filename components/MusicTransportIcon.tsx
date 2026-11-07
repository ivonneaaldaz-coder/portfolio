"use client";

/** Identical geometry on desktop and mobile; avoids font-dependent glyph alignment. */
export default function MusicTransportIcon({ paused }: { paused: boolean }) {
  return paused
    ? <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{display:"block",flexShrink:0}}><path d="M9 6.5 18 12l-9 5.5z" /></svg>
    : <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{display:"block",flexShrink:0}}><rect x="5.5" y="5" width="4" height="14" rx=".65"/><rect x="14.5" y="5" width="4" height="14" rx=".65"/></svg>;
}
