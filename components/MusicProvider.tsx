"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { loadSpotifyAPI, type SpotifyController, type SpotifyEvent } from "@/lib/spotify-iframe";

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
  isBuffering: boolean;
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

function findTrack(uri:string, source:MusicPlaylist[], preferred = -1) {
  const preferredTrack = source[preferred]?.tracks.findIndex(track => track.uri === uri) ?? -1;
  if (preferredTrack >= 0) return { playlistIndex:preferred, trackIndex:preferredTrack, track:source[preferred].tracks[preferredTrack] };
  for (let p=0;p<source.length;p++) {
    const t = source[p].tracks.findIndex(track => track.uri === uri);
    if (t >= 0) return { playlistIndex:p, trackIndex:t, track:source[p].tracks[t] };
  }
  return null;
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
  const [isBuffering,setIsBuffering] = useState(false);
  const [position,setPosition] = useState(0);
  const [duration,setDuration] = useState(0);
  const [artworkUrl,setArtworkUrl] = useState("");

  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const readyRef = useRef(false);
  const initializeRef = useRef<() => void>(() => {});
  const requestedRef = useRef<{playlistIndex:number;trackIndex:number;uri:string} | null>(null);
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
          const row = data.playlists.find((item:MusicPlaylist) => item.id === fallback.id) || data.playlists[index] || {};
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

  const executePending = useCallback(() => {
    const controller = controllerRef.current;
    const pending = pendingRef.current;
    if (!controller || !readyRef.current || !pending) return;
    try {
      // The SDK queues play during entity loading. Do not duplicate that queue
      // with timers, or mark playback active before the iframe reports it.
      controller.loadEntity(pending.uri);
      controller.play();
      requestedRef.current = pending;
      pendingRef.current = null;
    } catch (error) {
      console.warn("Spotify playback request failed", error);
    }
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let creating = false;
    let ownedController: SpotifyController | null = null;

    const syncTrack = (uri:string) => {
      if (!uri) return;
      setPlayingUri(uri);
      const found = findTrack(uri, playlistsRef.current, requestedRef.current?.playlistIndex);
      if (found) {
        setPlayingPlaylist(found.playlistIndex);
        setPlayingTrack(found.trackIndex);
      }
    };
    const onStarted = (event:SpotifyEvent) => {
      if (disposed) return;
      syncTrack(event.data?.playingURI || "");
      setIsPaused(false);
      setIsBuffering(false);
    };
    const onUpdate = (event:SpotifyEvent) => {
      if (disposed) return;
      const data = event.data;
      if (!data) return;
      if (typeof data.isPaused === "boolean") setIsPaused(data.isPaused);
      if (typeof data.isBuffering === "boolean") setIsBuffering(data.isBuffering);
      if (typeof data.position === "number") setPosition(data.position);
      if (typeof data.duration === "number") setDuration(data.duration);
      syncTrack(data.playingURI || "");
    };
    const initialize = () => {
      if (disposed || creating || controllerRef.current) return;
      creating = true;
      loadSpotifyAPI().then((api) => {
        if (disposed) return;
        // createController REPLACES its argument. The styled outer host must
        // survive, so give Spotify a disposable child, never the host itself.
        const mount = document.createElement("div");
        host.replaceChildren(mount);
        api.createController(mount, {
          width:320,
          height:80,
          url:FALLBACK_PLAYLISTS[0].url + "?utm_source=generator&theme=0",
        }, (controller) => {
          if (disposed) {
            controller.destroy();
            return;
          }
          ownedController = controller;
          controllerRef.current = controller;
          creating = false;
          host.querySelectorAll("iframe").forEach((iframe) => {
            // Spotify defaults to lazy loading. An offscreen audio controller
            // would otherwise never load and never emit ready.
            iframe.loading = "eager";
            iframe.setAttribute("tabindex", "-1");
            iframe.setAttribute("aria-hidden", "true");
          });
          controller.addListener("ready", () => {
            if (disposed) return;
            readyRef.current = true;
            executePending();
          });
          controller.addListener("playback_started", onStarted);
          controller.addListener("playback_update", onUpdate);
        });
      }).catch((error:unknown) => {
        creating = false;
        if (!disposed) console.warn("Spotify controller could not initialize", error);
      });
    };
    initializeRef.current = initialize;
    initialize();
    return () => {
      disposed = true;
      initializeRef.current = () => {};
      readyRef.current = false;
      controllerRef.current = null;
      ownedController?.destroy();
      host.replaceChildren();
    };
  }, [executePending]);

  const playTrack = (playlistIndex:number,trackIndex:number) => {
    const playlist = playlistsRef.current[playlistIndex];
    if (!playlist) return;
    setSelectedIndexState(playlistIndex);

    if (!playlist.tracks.length) return;

    const safe = ((trackIndex % playlist.tracks.length) + playlist.tracks.length) % playlist.tracks.length;
    const track = playlist.tracks[safe];
    setSelectedTrackIndex(safe);
    pendingRef.current = { playlistIndex,trackIndex:safe,uri:track.uri };

    initializeRef.current();
    executePending();
  };

  const toggle = () => {
    const controller = controllerRef.current;
    if (controller && readyRef.current && requestedRef.current) {
      try {
        controller.togglePlay();
        return;
      } catch {}
    }
    const playlistIndex = selectedIndex;
    playTrack(playlistIndex,selectedTrackIndex);
  };

  const step = (delta:number) => {
    const unconfirmed = requestedRef.current?.uri !== playingUri ? requestedRef.current : null;
    const playlistIndex = unconfirmed?.playlistIndex ?? (playingPlaylist >= 0 ? playingPlaylist : selectedIndex);
    const playlist = playlistsRef.current[playlistIndex];
    if (!playlist?.tracks.length) return;
    const base = unconfirmed?.trackIndex ?? (playingTrack >= 0 ? playingTrack : selectedTrackIndex);
    playTrack(playlistIndex,base + delta);
  };

  const setSelectedIndex = (index:number) => {
    const safe = ((index % playlistsRef.current.length) + playlistsRef.current.length) % playlistsRef.current.length;
    setSelectedIndexState(safe);
    setSelectedTrackIndex(0);
  };

  const playingTrackData = playingUri ? findTrack(playingUri, playlists, playingPlaylist)?.track || null : null;

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
    isBuffering,
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
      <div ref={hostRef} id="portfolio-spotify-controller" className="portfolio-spotify-controller" aria-hidden="true" />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const value = useContext(MusicContext);
  if (!value) throw new Error("useMusic must be used inside MusicProvider");
  return value;
}
