"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type MusicTrack = {
  uri: string;
  title: string;
  artist: string;
  duration_ms: number;
};

export type MusicPlaylist = {
  id: string;
  url: string;
  title: string;
  thumbnail_url: string;
  tracks: MusicTrack[];
};

type MusicContextValue = {
  playlists: MusicPlaylist[];
  selectedIndex: number;
  setSelectedIndex: (index:number) => void;
  currentTrack: MusicTrack | null;
  currentPlaylist: MusicPlaylist | null;
  isPaused: boolean;
  position: number;
  duration: number;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  playTrack: (playlistIndex:number, trackIndex:number) => void;
};

const FALLBACK_PLAYLISTS: MusicPlaylist[] = [
  { id:"3MJORK5D5v7d5cSG1Cte6a", url:"https://open.spotify.com/playlist/3MJORK5D5v7d5cSG1Cte6a", title:"Playlist 01", thumbnail_url:"", tracks:[] },
  { id:"3G8AYHiczaJoHhcVjzh9TR", url:"https://open.spotify.com/playlist/3G8AYHiczaJoHhcVjzh9TR", title:"Playlist 02", thumbnail_url:"", tracks:[] },
  { id:"4szZdGqhnAnsFBMqkYtug9", url:"https://open.spotify.com/playlist/4szZdGqhnAnsFBMqkYtug9", title:"Playlist 03", thumbnail_url:"", tracks:[] },
  { id:"6srDkgcJIEo3QiOMvlRr1q", url:"https://open.spotify.com/playlist/6srDkgcJIEo3QiOMvlRr1q", title:"Playlist 04", thumbnail_url:"", tracks:[] },
  { id:"3J1lx2Ydr5NrGEB5Eq6NJe", url:"https://open.spotify.com/playlist/3J1lx2Ydr5NrGEB5Eq6NJe", title:"Playlist 05", thumbnail_url:"", tracks:[] },
];

const MusicContext = createContext<MusicContextValue | null>(null);

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api:any) => void;
    __portfolioSpotifyAPI?: any;
  }
}

export function MusicProvider({ children }:{ children:React.ReactNode }) {
  const [playlists,setPlaylists] = useState<MusicPlaylist[]>(FALLBACK_PLAYLISTS);
  const [selectedIndex,setSelectedIndexState] = useState(0);
  const [playingUri,setPlayingUri] = useState("");
  const [playingPlaylist,setPlayingPlaylist] = useState(-1);
  const [playingTrack,setPlayingTrack] = useState(-1);
  const [isPaused,setIsPaused] = useState(true);
  const [position,setPosition] = useState(0);
  const [duration,setDuration] = useState(0);

  const controllerRef = useRef<any>(null);
  const apiLoadingRef = useRef(false);
  const pendingRef = useRef<{playlistIndex:number;trackIndex:number;uri:string}|null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/spotify-playlists")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (!active || !Array.isArray(data?.playlists)) return;
        setPlaylists((prev) => prev.map((fallback,index) => {
          const row = data.playlists.find((item:any) => item.id === fallback.id) || data.playlists[index] || {};
          return {
            ...fallback,
            title: row.title?.replace(/\s*\|\s*Spotify.*$/i,"") || fallback.title,
            thumbnail_url: row.thumbnail_url || fallback.thumbnail_url,
            url: row.url || fallback.url,
            tracks: Array.isArray(row.tracks) ? row.tracks : [],
          };
        }));
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const findTrack = (uri:string, source = playlists) => {
    for (let p=0;p<source.length;p++) {
      const t = source[p].tracks.findIndex(track => track.uri === uri);
      if (t >= 0) return { playlistIndex:p, trackIndex:t, track:source[p].tracks[t] };
    }
    return null;
  };

  const executePending = () => {
    const controller = controllerRef.current;
    const pending = pendingRef.current;
    if (!controller || !pending) return false;
    try {
      controller.loadEntity(pending.uri);
      controller.play();
      setPlayingUri(pending.uri);
      setPlayingPlaylist(pending.playlistIndex);
      setPlayingTrack(pending.trackIndex);
      setIsPaused(false);
      pendingRef.current = null;
      return true;
    } catch {
      return false;
    }
  };

  const createController = (IFrameAPI:any) => {
    if (controllerRef.current) return;
    const element = document.getElementById("portfolio-spotify-controller");
    if (!element) return;
    IFrameAPI.createController(element,{
      width:320,
      height:80,
      url:FALLBACK_PLAYLISTS[0].url + "?utm_source=generator&theme=0",
    },(controller:any) => {
      controllerRef.current = controller;
      apiLoadingRef.current = false;
      controller.addListener("playback_started",(event:any) => {
        const uri = event?.data?.playingURI || "";
        if (uri) {
          setPlayingUri(uri);
          const found = findTrack(uri);
          if (found) {
            setPlayingPlaylist(found.playlistIndex);
            setPlayingTrack(found.trackIndex);
          }
        }
        setIsPaused(false);
        pendingRef.current = null;
      });
      controller.addListener("playback_update",(event:any) => {
        const data = event?.data || {};
        const uri = data.playingURI || "";
        setIsPaused(Boolean(data.isPaused));
        setPosition(Number(data.position) || 0);
        setDuration(Number(data.duration) || 0);
        if (uri) {
          setPlayingUri(uri);
          const found = findTrack(uri);
          if (found) {
            setPlayingPlaylist(found.playlistIndex);
            setPlayingTrack(found.trackIndex);
          }
        }
      });
      executePending();
    });
  };

  const ensureController = () => {
    if (controllerRef.current) return;
    if (window.__portfolioSpotifyAPI) {
      createController(window.__portfolioSpotifyAPI);
      return;
    }
    if (apiLoadingRef.current) return;
    apiLoadingRef.current = true;
    window.onSpotifyIframeApiReady = (api:any) => {
      window.__portfolioSpotifyAPI = api;
      createController(api);
    };
    if (!document.querySelector('script[data-portfolio-spotify-api]')) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.dataset.portfolioSpotifyApi = "true";
      script.onerror = () => { apiLoadingRef.current = false; };
      document.body.appendChild(script);
    }
  };

  const playTrack = (playlistIndex:number,trackIndex:number) => {
    const playlist = playlists[playlistIndex];
    if (!playlist) return;
    setSelectedIndexState(playlistIndex);
    if (!playlist.tracks.length) {
      ensureController();
      const tryPlaylist = () => {
        const controller = controllerRef.current;
        if (!controller) return;
        try {
          controller.loadEntity(playlist.url);
          controller.play();
          setPlayingPlaylist(playlistIndex);
          setPlayingTrack(-1);
          setIsPaused(false);
        } catch {}
      };
      window.setTimeout(tryPlaylist,120);
      return;
    }
    const safe = ((trackIndex % playlist.tracks.length) + playlist.tracks.length) % playlist.tracks.length;
    const track = playlist.tracks[safe];
    pendingRef.current = { playlistIndex,trackIndex:safe,uri:track.uri };
    ensureController();
    if (!executePending()) window.setTimeout(executePending,220);
  };

  const toggle = () => {
    const controller = controllerRef.current;
    if (controller && playingUri) {
      try { controller.togglePlay(); return; } catch {}
    }
    const playlistIndex = playingPlaylist >= 0 ? playingPlaylist : selectedIndex;
    const trackIndex = playingTrack >= 0 ? playingTrack : 0;
    playTrack(playlistIndex,trackIndex);
  };

  const step = (delta:number) => {
    const playlistIndex = playingPlaylist >= 0 ? playingPlaylist : selectedIndex;
    const playlist = playlists[playlistIndex];
    if (!playlist?.tracks.length) return;
    const base = playingTrack >= 0 ? playingTrack : 0;
    playTrack(playlistIndex,base + delta);
  };

  const setSelectedIndex = (index:number) => {
    const safe = ((index % playlists.length) + playlists.length) % playlists.length;
    setSelectedIndexState(safe);
  };

  const currentTrack = useMemo(() => {
    if (!playingUri) return null;
    return findTrack(playingUri)?.track || null;
  }, [playingUri,playlists]);

  const currentPlaylist = playingPlaylist >= 0 ? playlists[playingPlaylist] : playlists[selectedIndex] || null;

  const value:MusicContextValue = {
    playlists,
    selectedIndex,
    setSelectedIndex,
    currentTrack,
    currentPlaylist,
    isPaused,
    position,
    duration,
    toggle,
    next:() => step(1),
    previous:() => step(-1),
    playTrack,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      <div id="portfolio-spotify-controller" className="portfolio-spotify-controller" aria-hidden="true" />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const value = useContext(MusicContext);
  if (!value) throw new Error("useMusic must be used inside MusicProvider");
  return value;
}
