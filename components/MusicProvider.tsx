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
  selectedTrack: MusicTrack | null;
  setSelectedIndex: (index:number) => void;
  currentTrack: MusicTrack | null;
  currentPlaylist: MusicPlaylist | null;
  artworkUrl: string;
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

function trackUrl(uri:string) {
  const id = uri.replace("spotify:track:","");
  return id ? "https://open.spotify.com/track/" + id : "";
}

export function MusicProvider({ children }:{ children:React.ReactNode }) {
  const [playlists,setPlaylists] = useState<MusicPlaylist[]>(FALLBACK_PLAYLISTS);
  const playlistsRef = useRef<MusicPlaylist[]>(FALLBACK_PLAYLISTS);
  const [selectedIndex,setSelectedIndexState] = useState(0);
  const [selectedTrackIndex,setSelectedTrackIndex] = useState(0);
  const [playingUri,setPlayingUri] = useState("");
  const [playingPlaylist,setPlayingPlaylist] = useState(-1);
  const [playingTrack,setPlayingTrack] = useState(-1);
  const [isPaused,setIsPaused] = useState(true);
  const [position,setPosition] = useState(0);
  const [duration,setDuration] = useState(0);
  const [artworkUrl,setArtworkUrl] = useState("");

  const controllerRef = useRef<any>(null);
  const apiLoadingRef = useRef(false);
  const pendingRef = useRef<{playlistIndex:number;trackIndex:number;uri:string}|null>(null);

  useEffect(() => {
    playlistsRef.current = playlists;
  }, [playlists]);

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

  const findTrack = (uri:string, source = playlistsRef.current) => {
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
        const uri = event?.data?.playingURI || pendingRef.current?.uri || "";
        if (uri) {
          setPlayingUri(uri);
          const found = findTrack(uri);
          if (found) {
            setPlayingPlaylist(found.playlistIndex);
            setPlayingTrack(found.trackIndex);
            setSelectedIndexState(found.playlistIndex);
            setSelectedTrackIndex(found.trackIndex);
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

      if (pendingRef.current) executePending();
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

  useEffect(() => {
    ensureController();
  }, []);

  const playTrack = (playlistIndex:number,trackIndex:number) => {
    const playlist = playlistsRef.current[playlistIndex];
    if (!playlist) return;
    setSelectedIndexState(playlistIndex);

    if (!playlist.tracks.length) return;

    const safe = ((trackIndex % playlist.tracks.length) + playlist.tracks.length) % playlist.tracks.length;
    const track = playlist.tracks[safe];
    setSelectedTrackIndex(safe);
    pendingRef.current = { playlistIndex,trackIndex:safe,uri:track.uri };

    ensureController();
    if (!executePending()) window.setTimeout(() => executePending(),120);
  };

  const toggle = () => {
    const controller = controllerRef.current;
    if (controller && playingUri) {
      try {
        controller.togglePlay();
        return;
      } catch {}
    }
    const playlistIndex = selectedIndex;
    playTrack(playlistIndex,selectedTrackIndex);
  };

  const step = (delta:number) => {
    const playlistIndex = playingPlaylist >= 0 ? playingPlaylist : selectedIndex;
    const playlist = playlistsRef.current[playlistIndex];
    if (!playlist?.tracks.length) return;
    const base = playingTrack >= 0 ? playingTrack : selectedTrackIndex;
    playTrack(playlistIndex,base + delta);
  };

  const setSelectedIndex = (index:number) => {
    const safe = ((index % playlistsRef.current.length) + playlistsRef.current.length) % playlistsRef.current.length;
    setSelectedIndexState(safe);
    setSelectedTrackIndex(0);
    setPosition(0);
    setDuration(0);
  };

  const playingTrackData = useMemo(() => {
    if (!playingUri) return null;
    return findTrack(playingUri)?.track || null;
  }, [playingUri,playlists]);

  const selectedTrack = playlists[selectedIndex]?.tracks[selectedTrackIndex] || playlists[selectedIndex]?.tracks[0] || null;
  const currentTrack = playingTrackData || selectedTrack;
  const currentPlaylist = playingPlaylist >= 0 && playingTrackData
    ? playlists[playingPlaylist]
    : playlists[selectedIndex] || null;

  useEffect(() => {
    let active = true;
    const fallback = currentPlaylist?.thumbnail_url || "";
    const url = currentTrack?.uri ? trackUrl(currentTrack.uri) : "";
    if (!url) {
      setArtworkUrl(fallback);
      return;
    }
    fetch("https://open.spotify.com/oembed?url=" + encodeURIComponent(url))
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (active) setArtworkUrl(data.thumbnail_url || fallback);
      })
      .catch(() => {
        if (active) setArtworkUrl(fallback);
      });
    return () => { active = false; };
  }, [currentTrack?.uri,currentPlaylist?.thumbnail_url]);

  const value:MusicContextValue = {
    playlists,
    selectedIndex,
    selectedTrack,
    setSelectedIndex,
    currentTrack,
    currentPlaylist,
    artworkUrl,
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
