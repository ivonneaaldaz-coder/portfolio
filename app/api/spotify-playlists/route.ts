const PLAYLISTS = [
  "https://open.spotify.com/playlist/3MJORK5D5v7d5cSG1Cte6a",
  "https://open.spotify.com/playlist/3G8AYHiczaJoHhcVjzh9TR",
  "https://open.spotify.com/playlist/4szZdGqhnAnsFBMqkYtug9",
  "https://open.spotify.com/playlist/6srDkgcJIEo3QiOMvlRr1q",
  "https://open.spotify.com/playlist/3J1lx2Ydr5NrGEB5Eq6NJe",
];

function playlistId(url:string) {
  return url.match(/playlist\/([A-Za-z0-9]+)/)?.[1] || "";
}

function findTrackList(value:any,seen = new Set<any>()):any[] | null {
  if (!value || typeof value !== "object" || seen.has(value)) return null;
  seen.add(value);
  if (Array.isArray(value.trackList)) return value.trackList;
  for (const key of Object.keys(value)) {
    const found = findTrackList(value[key],seen);
    if (found) return found;
  }
  return null;
}

function normalizeTrack(track:any) {
  const uri = typeof track?.uri === "string" ? track.uri : "";
  const title = typeof track?.title === "string" ? track.title.trim() : "";
  if (!uri.startsWith("spotify:track:") || !title) return null;
  return {
    uri,
    title,
    artist:typeof track.subtitle === "string" ? track.subtitle.trim() : "",
    duration_ms:Number.isFinite(Number(track.duration)) ? Number(track.duration) : 0,
  };
}

async function readPlaylistTracks(id:string) {
  const response = await fetch("https://open.spotify.com/embed/playlist/" + id,{
    headers:{ "User-Agent":"Mozilla/5.0 (compatible; Ivonne-Portfolio/1.0)" },
    next:{ revalidate:1800 },
  });
  if (!response.ok) return [];
  const html = await response.text();
  const match = html.match(/<script[^>]+id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!match) return [];
  try {
    const data = JSON.parse(match[1]);
    const list = findTrackList(data);
    return Array.isArray(list) ? list.map(normalizeTrack).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export async function GET() {
  const playlists = await Promise.all(PLAYLISTS.map(async (url) => {
    const id = playlistId(url);
    try {
      const [metaResponse,tracks] = await Promise.all([
        fetch("https://open.spotify.com/oembed?url=" + encodeURIComponent(url),{
          headers:{ "User-Agent":"Ivonne-Portfolio/1.0" },
          next:{ revalidate:1800 },
        }),
        readPlaylistTracks(id),
      ]);
      const meta = metaResponse.ok ? await metaResponse.json() : {};
      return {
        id,
        url,
        title:typeof meta.title === "string" ? meta.title.trim() : "",
        thumbnail_url:typeof meta.thumbnail_url === "string" ? meta.thumbnail_url : "",
        tracks,
      };
    } catch {
      return { id,url,title:"",thumbnail_url:"",tracks:[] };
    }
  }));
  return Response.json({ playlists },{
    headers:{ "Cache-Control":"public, s-maxage=1800, stale-while-revalidate=21600" },
  });
}
