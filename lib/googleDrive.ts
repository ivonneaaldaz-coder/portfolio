export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
};

const FALLBACK: Record<string, DriveFile[]> = {
  "1mp7-HM3jdj_Q0rp4ltW49dUhSIoLbySt": [
    { id:"1Ylpy2wMcmK9aJiY9h-oALtJxwvi9BStk", name:"1.png", mimeType:"image/png" },
    { id:"1IoVqwM8CkMrze11Gy69JvsnYB1koZ_pZ", name:"2.png", mimeType:"image/png" },
    { id:"1Piz7I2_9zpKdsGF2s6PhLOlEL-cVmeaf", name:"3.png", mimeType:"image/png" },
    { id:"1j_OF70aYbReC0YsSpeKn_pRiNo_KZ0lD", name:"4.png", mimeType:"image/png" },
    { id:"1Qmm5q1RE_geKAKgirHOWwnfkoNM4Wwzr", name:"5.png", mimeType:"image/png" },
    { id:"1f5N9-VY4m8G5TzekVWw8ZgiRxBU35Fn5", name:"6.png", mimeType:"image/png" },
    { id:"12Bq4JEKCUJl7rGKQvGSsaXzA9UXgLZJt", name:"7.png", mimeType:"image/png" },
    { id:"1lcVmOUYQQ4nYnLK5FIAweIZ1hh81eqL7", name:"8.png", mimeType:"image/png" },
    { id:"1qAwW0yUooIyYf8ts3by-Ty9NGm9pfvdD", name:"9.png", mimeType:"image/png" },
  ],
  "1hpdPGeKX8nISrESD0EAzdCeAoVCnnnl7": [
    { id:"1t3X1YmWw_QD7Pv8waHKP54mo4KlPTCW7", name:"art practice", mimeType:"image/jpeg" },
    { id:"1rqN8R5eiZnqYZxRzmiFK4GAs95gPbs0E", name:"art .jpg", mimeType:"image/jpeg" },
    { id:"1dlPdxNPSuyLK090MsvBeY9953d3zfI2m", name:"good world living.jpg", mimeType:"image/jpeg" },
    { id:"1xLB_UJu64dcncS9KZBEk6ISlmxGfIen4", name:"travel.jpg", mimeType:"image/jpeg" },
    { id:"1mXWQUKcb_t9BDWgJIb94OFsjd8d3y_IP", name:"whitespace.jpg", mimeType:"image/jpeg" },
  ],
  "1ftwuGg6MmnOKXcuet2J8G7x_piUipwh5": [
    { id:"1m2guNKM7t99L-Iuw7PM77zIajzUtvLrL", name:"Ivonne-Aldaz_AI-Experiment_Liquid-Concept_001.png", mimeType:"image/png" },
    { id:"1wMtNYYFBPjZmvkmtDMZEqX7Qq37ZBSAh", name:"Ivonne-Aldaz_AI-Experiment_Liquid-Concept_002.png", mimeType:"image/png" },
    { id:"15sguWLC9rTSz8wgo3gxKV5vBN_rymwT1", name:"Ivonne-Aldaz_AI-Experiment_Liquid-Concept_003.png", mimeType:"image/png" },
    { id:"1x1C_3Gk-JTW2gX4jhAG7Q29uZM1xcFdd", name:"Ivonne-Aldaz_AI-Experiment_Cinematic-Mediterranean_001.png", mimeType:"image/png" },
    { id:"1tHdIp9L4Qz9BBLGfFhm3Cxi91lrJA9aA", name:"Ivonne-Aldaz_AI-Experiment_Cinematic-Mediterranean_002.png", mimeType:"image/png" },
    { id:"1mkilZfZ6dmLYhe9zvUtTadokFwqdXlOL", name:"Ivonne-Aldaz_AI-Experiment_Cinematic-Mediterranean_003.png", mimeType:"image/png" },
    { id:"1zWaAd_bkMFfFtYlRtnv61ENyxXRzYrli", name:"Ivonne-Aldaz_AI-Experiment_Cinematic-Mediterranean_004.png", mimeType:"image/png" },
    { id:"1yNCxrQvDoxulfXqTojUKsfDM1qv-ztc-", name:"Ivonne-Aldaz_AI-Experiment_Liquid-Concept_001.mp4", mimeType:"video/mp4" },
    { id:"1_QUw7xUrbIl1MfJSEvOgm_gGCpMeOTGn", name:"Ivonne-Aldaz_AI-Experiment_Liquid-Concept_002.mp4", mimeType:"video/mp4" },
    { id:"1Oj1fibxkBmuWkSmRUkbZIcKDs2cwUrzr", name:"Ivonne-Aldaz_AI-Experiment_Liquid-Concept_003.mp4", mimeType:"video/mp4" },
  ],
};

export async function listDriveFolder(folderId: string): Promise<DriveFile[]> {
  const key = process.env.GOOGLE_DRIVE_API_KEY;
  if (!key) return FALLBACK[folderId] ?? [];

  const params = new URLSearchParams({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id,name,mimeType,modifiedTime)",
    orderBy: "name_natural",
    pageSize: "1000",
    key,
  });

  try {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
      cache: "no-store",
    });
    if (!response.ok) return FALLBACK[folderId] ?? [];
    const data = await response.json();
    return Array.isArray(data.files) ? data.files : [];
  } catch {
    return FALLBACK[folderId] ?? [];
  }
}

export function driveImageUrl(id: string, size = "w1800") {
  return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;
}

export function driveVideoUrl(id: string) {
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

export function normalizeDriveName(name: string) {
  return name.toLowerCase().replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}
