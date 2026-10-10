"use client";

import { useState } from "react";
import styles from "./MusicRoom.module.css";

const playlists = [
  { id:"3MJORK5D5v7d5cSG1Cte6a", title:"⚡️", label:"Lightning", image:"https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da8476ad1797afc30f2d7501145e" },
  { id:"6srDkgcJIEo3QiOMvlRr1q", title:"drift", label:"drift", image:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da840b4356f3ed6fcb840aaa455e" },
  { id:"3G8AYHiczaJoHhcVjzh9TR", title:"another lifetime", label:"another lifetime", image:"https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da8447ea69c73c36625647794722" },
  { id:"3J1lx2Ydr5NrGEB5Eq6NJe", title:"soft static", label:"soft static", image:"https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da84b42ec39691c499957d028c05" },
  { id:"4szZdGqhnAnsFBMqkYtug9", title:"…", label:"Ellipsis", image:"https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da84f15c854f9c3552ddd4590732" },
];

export default function SpotifyPlaylists() {
  const [selected, setSelected] = useState(0);
  const playlist = playlists[selected];
  return (
    <div className={styles.listeningDesk}>
      <div className={styles.playlistIndex}>
        <div className={styles.indexHeader}><span className={styles.mono}>Select a playlist</span><span className={styles.mono}>01—05</span></div>
        <div className={styles.playlistList} role="group" aria-label="Choose a Spotify playlist">
          {playlists.map((item, index) => (
            <button type="button" key={item.id} className={styles.playlistButton} aria-pressed={selected === index} aria-controls="spotify-player" aria-label={`Select ${item.label} playlist`} onClick={() => setSelected(index)}>
              <span className={styles.playlistThumb}><img src={item.image} alt="" loading="lazy" /></span>
              <span className={styles.playlistName}>{item.title}</span>
              <span className={styles.selectionMark} aria-hidden="true">{selected === index ? "●" : String(index + 1).padStart(2,"0")}</span>
            </button>
          ))}
        </div>
        <a className={styles.profileLink} href="https://open.spotify.com/user/ivonnealdaz" target="_blank" rel="noreferrer">Follow on Spotify <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.playerPanel} id="spotify-player">
        <div className={styles.playerHeading}>
          <p className={styles.mono} aria-live="polite">Selected / {playlist.label}</p>
          <span className={styles.mono}>Spotify</span>
        </div>
        <iframe key={playlist.id} className={styles.spotifyEmbed} title={`${playlist.label} — Spotify playlist player`} src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`} width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
        <div className={styles.playerFoot}><p>Press play. Stay awhile.</p><a href={`https://open.spotify.com/playlist/${playlist.id}`} target="_blank" rel="noreferrer">Full listening on Spotify ↗</a></div>
      </div>
    </div>
  );
}
