export type SpotifyEvent = {
  data?: {
    playingURI?: string;
    isPaused?: boolean;
    isBuffering?: boolean;
    position?: number;
    duration?: number;
  };
};

export type SpotifyController = {
  loadEntity: (uri: string) => void;
  play: () => void;
  togglePlay: () => void;
  destroy: () => void;
  addListener: (name: string, listener: (event: SpotifyEvent) => void) => void;
};

type SpotifyAPI = {
  createController: (
    element: HTMLElement,
    options: { width: number; height: number; url: string },
    callback: (controller: SpotifyController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyAPI) => void;
    __portfolioSpotifyAPI?: SpotifyAPI;
  }
}

let apiPromise: Promise<SpotifyAPI> | null = null;

// Share only the SDK loader. Each provider owns and cleans up its controller.
export function loadSpotifyAPI(): Promise<SpotifyAPI> {
  if (window.__portfolioSpotifyAPI) return Promise.resolve(window.__portfolioSpotifyAPI);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<SpotifyAPI>((resolve, reject) => {
    window.onSpotifyIframeApiReady = (api) => {
      window.__portfolioSpotifyAPI = api;
      resolve(api);
    };
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    script.dataset.portfolioSpotifyApi = "true";
    script.onerror = () => {
      script.remove();
      apiPromise = null;
      reject(new Error("Spotify iframe API could not be loaded"));
    };
    document.body.appendChild(script);
  });
  return apiPromise;
}
