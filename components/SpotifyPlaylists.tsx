"use client";

import { useEffect, useState } from "react";

const playlistUrls = [
  "https://open.spotify.com/playlist/3MJORK5D5v7d5cSG1Cte6a",
  "https://open.spotify.com/playlist/3G8AYHiczaJoHhcVjzh9TR",
  "https://open.spotify.com/playlist/4szZdGqhnAnsFBMqkYtug9",
  "https://open.spotify.com/playlist/6srDkgcJIEo3QiOMvlRr1q",
  "https://open.spotify.com/playlist/3J1lx2Ydr5NrGEB5Eq6NJe",
];

type SpotifyMeta = { title?: string; thumbnail_url?: string };

export default function SpotifyPlaylists() {
  const [meta,setMeta] = useState<Record<string,SpotifyMeta>>({});

  useEffect(() => {
    let active = true;
    Promise.all(
      playlistUrls.map(async (url) => {
        try {
          const response = await fetch("https://open.spotify.com/oembed?url=" + encodeURIComponent(url));
          if (!response.ok) return [url,{}] as const;
          const data = await response.json();
          return [url,data] as const;
        } catch {
          return [url,{}] as const;
        }
      })
    ).then((items) => {
      if (active) setMeta(Object.fromEntries(items));
    });
    return () => { active = false; };
  }, []);

  return (
    <div className="playlist-grid playlist-grid-live">
      {playlistUrls.map((url,index) => {
        const item = meta[url] || {};
        const title = item.title?.replace(/\s*\|\s*Spotify.*$/i,"") || "Playlist " + String(index + 1).padStart(2,"0");
        return (
          <a className="playlist-card" href={url} target="_blank" rel="noreferrer" key={url}>
            <div className="playlist-cover playlist-cover-live">
              {item.thumbnail_url ? <img src={item.thumbnail_url} alt="" /> : <span className="playlist-loading" />}
            </div>
            <h3>{title}</h3>
            <p>Open on Spotify ↗︎</p>
          </a>
        );
      })}
    </div>
  );
}
