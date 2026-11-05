"use client";

import { useMusic } from "@/components/MusicProvider";

function formatTime(ms:number) {
  const total = Math.max(0,Math.floor((ms || 0)/1000));
  return `${Math.floor(total/60)}:${String(total%60).padStart(2,"0")}`;
}

export default function SpotifyPlaylists() {
  const music = useMusic();
  const selected = music.playlists[music.selectedIndex];
  const displayTrack = music.currentTrack;
  const progress = music.duration ? Math.min(100,(music.position/music.duration)*100) : 0;

  return (
    <>
      <style>{`@media(max-width:900px){.music-page .portfolio-music-controls{display:flex;align-items:center;justify-content:center;gap:8px}.music-page .portfolio-music-controls button{min-width:44px!important;min-height:44px!important;display:inline-flex!important;align-items:center;justify-content:center;touch-action:manipulation}.music-page .portfolio-music-controls .portfolio-music-play{min-width:48px!important;min-height:48px!important}.music-page .portfolio-music-play .music-mobile-play-symbol{font-size:22px!important;line-height:1!important;display:inline-block;transform:translateX(1px)}`}</style>
      <div className="music-console">
        <div className="portfolio-music-player">
          <div className="portfolio-music-cover">
            {music.artworkUrl ? <img src={music.artworkUrl} alt="" /> : selected?.thumbnail_url ? <img src={selected.thumbnail_url} alt="" /> : null}
          </div>

          <div className="portfolio-music-copy">
            <span>{music.isBuffering ? "BUFFERING" : music.isPaused ? "READY" : "NOW PLAYING"}</span>
            <h3>{displayTrack?.title || "Choose a playlist"}</h3>
            <p>{displayTrack?.artist || selected?.title || ""}</p>
          </div>

          <div className="portfolio-music-controls">
            <button type="button" onClick={music.previous} aria-label="Previous song">←</button>
            <button type="button" className="portfolio-music-play" onClick={music.toggle} aria-label={music.isPaused ? "Play music" : "Pause music"}>
              <span aria-hidden="true"><span className="music-desktop-symbol">{music.isPaused ? "▸" : "▌▌"}</span><span className={`music-mobile-symbol${music.isPaused ? " music-mobile-play-symbol" : ""}`}>{music.isPaused ? "▸" : "▌▌"}</span></span>
            </button>
            <button type="button" onClick={music.next} aria-label="Next song">→</button>
          </div>

          <div className="portfolio-music-progress">
            <div><span style={{width:`${progress}%`}} /></div>
            <small>{formatTime(music.position)} / {music.duration ? formatTime(music.duration) : "--:--"}</small>
          </div>
        </div>

        <div className="music-tracklist" aria-label={selected ? `${selected.title} track list` : "Track list"}>
          <div className="music-tracklist-head">
            <span>#</span>
            <span>Track</span>
            <span>Artist</span>
          </div>

          <div className="music-tracklist-body">
            {selected?.tracks?.length ? selected.tracks.map((track,index) => {
              const active = music.currentTrack?.uri === track.uri;
              return (
                <button
                  type="button"
                  className={`music-track-row${active ? " active" : ""}`}
                  key={track.uri}
                  onClick={() => music.playTrack(music.selectedIndex,index)}
                  aria-pressed={active}
                >
                  <span>{String(index + 1).padStart(2,"0")}</span>
                  <strong>{track.title}</strong>
                  <em>{track.artist}</em>
                </button>
              );
            }) : (
              <div className="music-tracklist-empty">Tracks are loading…</div>
            )}
          </div>
          {(selected?.tracks?.length ?? 0) > 3 && (
            <p className="music-tracklist-hint">Scroll to explore tracks <span aria-hidden="true">↓</span></p>
          )}
        </div>
      </div>

      <div className="playlist-picker-heading"><span>Choose a playlist</span><small className="playlist-swipe-hint">Swipe to explore →</small></div>
      <div className="playlist-grid playlist-grid-live playlist-selector-grid">
        {music.playlists.map((item,index) => {
          const active = index === music.selectedIndex;
          return (
            <div className={`playlist-card playlist-card-button${active ? " active" : ""}`} key={item.id}>
              <button type="button" className="playlist-select" onClick={() => music.setSelectedIndex(index)} aria-pressed={active}>
                <div className="playlist-cover playlist-cover-live">
                  {item.thumbnail_url ? <img src={item.thumbnail_url} alt="" /> : <span className="playlist-loading" />}
                </div>
                <div className="playlist-selector-copy">
                  <h3>{item.title || "Playlist " + String(index + 1).padStart(2,"0")}</h3>
                </div>
              </button>

            </div>
          );
        })}
      </div>
      <div className="music-spotify-follow"><a href="https://open.spotify.com/user/ivonnealdaz" target="_blank" rel="noopener noreferrer">Follow on Spotify ↗</a></div>
    </>
  );
}
