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
  { id:"1cOVvYNVaBVup0Yu6fz9J1", url:"https://open.spotify.com/playlist/1cOVvYNVaBVup0Yu6fz9J1", title:"Playlist 02", thumbnail_url:"", tracks:[] },
  { id:"3G8AYHiczaJoHhcVjzh9TR", url:"https://open.spotify.com/playlist/3G8AYHiczaJoHhcVjzh9TR", title:"Playlist 03", thumbnail_url:"", tracks:[] },
  { id:"3tnq9920I6cEP0fzLYTDU0", url:"https://open.spotify.com/playlist/3tnq9920I6cEP0fzLYTDU0", title:"Playlist 04", thumbnail_url:"", tracks:[] },
  { id:"4szZdGqhnAnsFBMqkYtug9", url:"https://open.spotify.com/playlist/4szZdGqhnAnsFBMqkYtug9", title:"Playlist 05", thumbnail_url:"", tracks:[] },
  { id:"0k23fYvaVXxyfo8j5zl0cU", url:"https://open.spotify.com/playlist/0k23fYvaVXxyfo8j5zl0cU", title:"Playlist 06", thumbnail_url:"", tracks:[] },
  { id:"6srDkgcJIEo3QiOMvlRr1q", url:"https://open.spotify.com/playlist/6srDkgcJIEo3QiOMvlRr1q", title:"Playlist 07", thumbnail_url:"", tracks:[] },
  { id:"5vCPnlOrnR2IoYwBO0Ecgh", url:"https://open.spotify.com/playlist/5vCPnlOrnR2IoYwBO0Ecgh", title:"Playlist 08", thumbnail_url:"", tracks:[] },
  { id:"3J1lx2Ydr5NrGEB5Eq6NJe", url:"https://open.spotify.com/playlist/3J1lx2Ydr5NrGEB5Eq6NJe", title:"Playlist 09", thumbnail_url:"", tracks:[] },
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
  const [controllerReady, setControllerReady] = useState(false);
  const loadedUriRef = useRef("");
  const earlyPlayRef = useRef<{playlistIndex:number;trackIndex:number} | null>(null);
  const initializeRef = useRef<() => void>(() => {});
  const requestedRef = useRef<{playlistIndex:number;trackIndex:number;uri:string} | null>(null);
  const pendingRef = useRef<{playlistIndex:number;trackIndex:number;uri:string}|null>(null);
  const shouldContinueRef = useRef(false);
  const confirmedUriRef = useRef("");
  const hasProgressRef = useRef(false);
  const playbackPausedRef = useRef(true);
  const advanceRef = useRef<() => void>(() => {});
  const lastCompletedUriRef = useRef("");

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
      requestedRef.current = pending;
      if (loadedUriRef.current !== pending.uri) {
        // loadEntity replaces the iframe document. Do not enqueue Play in the
        // SDK's timer-based loading queue: retain one cancellable intent here.
        readyRef.current = false;
        loadedUriRef.current = pending.uri;
        controller.loadEntity(pending.uri);
        return;
      }
      // Consume before calling the SDK, so repeated ready events cannot replay.
      pendingRef.current = null;
      if (shouldContinueRef.current) controller.play();
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
    // loadEntity navigates the iframe. Events already queued by the old entity
    // must never replace the selected track, progress, or transport state.
    const acceptsEvent = (data: NonNullable<SpotifyEvent["data"]>) => {
      const expected = pendingRef.current?.uri || requestedRef.current?.uri || loadedUriRef.current;
      if (data.playingURI) return !expected || data.playingURI === expected;
      return !!expected && confirmedUriRef.current === expected;
    };
    const onStarted = (event:SpotifyEvent) => {
      if (disposed || !event.data || !acceptsEvent(event.data)) return;
      const uri = event.data.playingURI || loadedUriRef.current;
      confirmedUriRef.current = uri;
      syncTrack(uri);
      playbackPausedRef.current = false;
      setIsPaused(false);
      setIsBuffering(false);
    };
    const onUpdate = (event:SpotifyEvent) => {
      if (disposed) return;
      const data = event.data;
      if (!data || !acceptsEvent(data)) return;
      const uri = data.playingURI || confirmedUriRef.current;
      if (data.isPaused === false) {
        confirmedUriRef.current = uri;
        if (typeof data.position === "number" && data.position > 0) hasProgressRef.current = true;
      }
      // Spotify previews can finish with isPaused:false. The exact reported
      // endpoint, after confirmed progress, is authoritative for completion.
      const completed = hasProgressRef.current && confirmedUriRef.current === uri &&
        data.isBuffering === false && typeof data.duration === "number" && data.duration > 0 &&
        typeof data.position === "number" && data.position >= data.duration;
      if (typeof data.isPaused === "boolean") {
        playbackPausedRef.current = completed || data.isPaused;
        setIsPaused(completed || data.isPaused);
      }
      if (typeof data.isBuffering === "boolean") setIsBuffering(data.isBuffering);
      if (typeof data.position === "number") setPosition(data.position);
      if (typeof data.duration === "number") setDuration(data.duration);
      syncTrack(data.playingURI || "");
      // A paused/loading/autoplay-denied event is not an instruction to Play.
      // Only advance a confirmed session that actually progressed to its end.
      if (shouldContinueRef.current && completed && uri && lastCompletedUriRef.current !== uri) {
        lastCompletedUriRef.current = uri;
        advanceRef.current();
      }
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
            setControllerReady(true);
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
      loadedUriRef.current = "";
      controllerRef.current = null;
      ownedController?.destroy();
      host.replaceChildren();
    };
  }, [executePending]);

  const playTrack = (playlistIndex:number,trackIndex:number) => {
    const playlist = playlistsRef.current[playlistIndex];
    if (!playlist) return;
    setSelectedIndexState(playlistIndex);

    if (!playlist.tracks.length) {
      earlyPlayRef.current = { playlistIndex, trackIndex };
      return;
    }
    earlyPlayRef.current = null;

    const safe = ((trackIndex % playlist.tracks.length) + playlist.tracks.length) % playlist.tracks.length;
    const track = playlist.tracks[safe];
    setSelectedTrackIndex(safe);
    shouldContinueRef.current = true;
    confirmedUriRef.current = "";
    hasProgressRef.current = false;
    lastCompletedUriRef.current = "";
    pendingRef.current = { playlistIndex,trackIndex:safe,uri:track.uri };

    initializeRef.current();
    executePending();
  };

  useEffect(() => {
    const early = earlyPlayRef.current;
    const playlistIndex = early?.playlistIndex ?? selectedIndex;
    const trackIndex = early?.trackIndex ?? selectedTrackIndex;
    const tracks = playlists[playlistIndex]?.tracks;
    if (!tracks?.length) return;
    const safe = ((trackIndex % tracks.length) + tracks.length) % tracks.length;
    const track = tracks[safe];
    if (early) {
      earlyPlayRef.current = null;
      shouldContinueRef.current = true;
      pendingRef.current = { playlistIndex, trackIndex:safe, uri:track.uri };
      executePending();
    }
    // Prepare the initial selection without playing. Loading an entity on the
    // first tap queues Play behind iframe navigation and can lose mobile activation.
    // Once a session has been requested, browsing must not interrupt that session.
    const controller = controllerRef.current;
    if (controllerReady && controller && !requestedRef.current && !pendingRef.current && loadedUriRef.current !== track.uri) {
      readyRef.current = false;
      loadedUriRef.current = track.uri;
      controller.loadEntity(track.uri);
    }
  }, [playlists, selectedIndex, selectedTrackIndex, controllerReady, executePending]);

  const toggle = () => {
    const controller = controllerRef.current;
    if (pendingRef.current && shouldContinueRef.current) {
      // Pause must cancel a track change even before the new embed is ready.
      shouldContinueRef.current = false;
      pendingRef.current = null;
      earlyPlayRef.current = null;
      controller?.pause();
      return;
    }
    if (controller && readyRef.current && requestedRef.current) {
      try {
        // Explicit commands remain deterministic before React receives the next
        // state event; toggling an unknown iframe state can invert user intent.
        const resume = playbackPausedRef.current;
        shouldContinueRef.current = resume;
        if (resume) controller.resume();
        else {
          pendingRef.current = null;
          earlyPlayRef.current = null;
          controller.pause();
        }
        return;
      } catch {}
    }
    const playlistIndex = selectedIndex;
    playTrack(playlistIndex,selectedTrackIndex);
  };

  const step = (delta:number) => {
    const unconfirmed = pendingRef.current ?? (requestedRef.current?.uri !== playingUri ? requestedRef.current : null);
    const playlistIndex = unconfirmed?.playlistIndex ?? (playingPlaylist >= 0 ? playingPlaylist : selectedIndex);
    const playlist = playlistsRef.current[playlistIndex];
    if (!playlist?.tracks.length) return;
    const base = unconfirmed?.trackIndex ?? (playingTrack >= 0 ? playingTrack : selectedTrackIndex);
    const nextIndex = ((base + delta) % playlist.tracks.length + playlist.tracks.length) % playlist.tracks.length;
    playTrack(playlistIndex,nextIndex);
  };

  advanceRef.current = () => step(1);

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
