export type PinterestPin = {
  id: string;
  title: string;
  description: string;
  altText: string;
  imageUrl: string;
  pinUrl: string;
  boardName: string;
  createdAt: string;
};

type PinterestImage = {
  url?: string;
  width?: number;
  height?: number;
};

type PinterestApiPin = {
  id?: string;
  title?: string;
  description?: string;
  alt_text?: string;
  link?: string;
  board_id?: string;
  created_at?: string;
  media?: {
    images?: Record<string, PinterestImage>;
  };
};

type PinterestBoard = {
  id?: string;
  name?: string;
};

type PinterestPage<T> = {
  items?: T[];
  bookmark?: string | null;
};

const API_BASE = "https://api.pinterest.com/v5";

async function getAppAccessToken(): Promise<string | null> {
  const clientId = process.env.PINTEREST_APP_ID;
  const clientSecret = process.env.PINTEREST_APP_SECRET;
  if (!clientId || !clientSecret) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${API_BASE}/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "boards:read,pins:read,user_accounts:read",
    }),
    next: { revalidate: 3300 },
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Pinterest client credentials failed ${response.status}: ${body.slice(0, 200)}`);
    return null;
  }

  const data = await response.json() as { access_token?: string };
  return data.access_token || null;
}

async function fetchWithToken<T>(path: string, token: string): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });
}

async function pinterestFetch<T>(path: string, explicitToken?: string): Promise<T> {
  const tokens: string[] = [];

  if (explicitToken) tokens.push(explicitToken);
  if (process.env.PINTEREST_ACCESS_TOKEN) tokens.push(process.env.PINTEREST_ACCESS_TOKEN);

  const appToken = await getAppAccessToken();
  if (appToken) tokens.push(appToken);

  if (!tokens.length) throw new Error("Missing Pinterest access token");

  let lastError = "Pinterest authentication failed";

  for (const token of Array.from(new Set(tokens))) {
    const response = await fetchWithToken<T>(path, token);
    if (response.ok) return response.json() as Promise<T>;

    const body = await response.text();
    lastError = `Pinterest API ${response.status}: ${body.slice(0, 300)}`;

    if (response.status !== 401) break;
  }

  throw new Error(lastError);
}

async function pinterestFetchAll<T>(path: string, maxItems = 500, explicitToken?: string): Promise<T[]> {
  const items: T[] = [];
  let bookmark: string | null | undefined = null;

  do {
    const joiner = path.includes("?") ? "&" : "?";
    const suffix: string = bookmark ? "&bookmark=" + encodeURIComponent(bookmark) : "";
    const pagePath: string = path + joiner + "page_size=250" + suffix;
    const page: PinterestPage<T> = await pinterestFetch<PinterestPage<T>>(pagePath, explicitToken);

    items.push(...(page.items ?? []));
    bookmark = page.bookmark;

    if (items.length >= maxItems) break;
  } while (bookmark);

  return items.slice(0, maxItems);
}

function bestImage(pin: PinterestApiPin): string {
  const images = Object.values(pin.media?.images ?? {}).filter(
    (image): image is PinterestImage & { url: string } => Boolean(image?.url),
  );

  if (!images.length) return "";

  images.sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  return images[0].url;
}


type PinterestPublicPin = {
  id?: string;
  title?: string;
  seo_title?: string;
  description?: string;
  grid_description?: string;
  seo_description?: string;
  created_at?: string;
  seo_url?: string;
  url?: string;
  board?: { name?: string };
  board_name?: string;
  images?: Record<string, PinterestImage>;
};

type PinterestPublicResource = {
  resource_response?: {
    data?: PinterestPublicPin[];
    bookmark?: string | null;
    bookmarks?: string[] | null;
  };
};

function publicPinImage(pin: PinterestPublicPin): string {
  const images = Object.values(pin.images ?? {}).filter(
    (image): image is PinterestImage & { url: string } => Boolean(image?.url),
  );
  if (!images.length) return "";
  images.sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  return images[0].url;
}

async function getPublicPinterestPins(limit = 500): Promise<PinterestPin[]> {
  const username = "ivonnealdaz";
  const collected = new Map<string, PinterestPublicPin>();
  let bookmark: string | null = null;

  for (let page = 0; page < 24 && collected.size < limit; page += 1) {
    const options: Record<string, unknown> = {
      add_vase: true,
      field_set_key: "mobile_grid_item",
      is_own_profile_pins: false,
      username,
    };
    if (bookmark) options.bookmarks = [bookmark];

    const params = new URLSearchParams({
      source_url: `/${username}/_pins/`,
      data: JSON.stringify({ options, context: {} }),
      _: Date.now().toString(),
    });

    let payload: PinterestPublicResource | null = null;
    const handlers = [
      "www/[username]/_pins.js",
      "www/[username]/_saved.js",
      "www/[username]/index.js",
    ];

    for (const handler of handlers) {
      const response = await fetch(
        `https://www.pinterest.com/resource/UserPinsResource/get/?${params.toString()}`,
        {
          headers: {
            "x-pinterest-pws-handler": handler,
            "user-agent": "Mozilla/5.0 (compatible; IvonneAldazPortfolio/1.0)",
            accept: "application/json,text/plain,*/*",
          },
          next: { revalidate: 900 },
        },
      );
      if (response.ok) {
        payload = await response.json() as PinterestPublicResource;
        break;
      }
    }

    const resource = payload?.resource_response;
    const items = resource?.data ?? [];
    if (!items.length) break;

    for (const item of items) {
      if (item.id && publicPinImage(item)) collected.set(item.id, item);
    }

    const nextBookmark =
      resource?.bookmark ??
      (Array.isArray(resource?.bookmarks) ? resource?.bookmarks?.[0] : null) ??
      null;

    if (!nextBookmark || nextBookmark === "-end-" || nextBookmark === bookmark) break;
    bookmark = nextBookmark;
  }

  return Array.from(collected.values())
    .map((pin) => {
      const id = pin.id || "";
      const path = pin.seo_url || pin.url || (id ? `/pin/${id}/` : "");
      return {
        id,
        title: pin.title || pin.seo_title || "",
        description: pin.description || pin.grid_description || pin.seo_description || "",
        altText: pin.title || pin.seo_title || pin.description || "Pinterest visual reference",
        imageUrl: publicPinImage(pin),
        pinUrl: path.startsWith("http") ? path : `https://www.pinterest.com${path}`,
        boardName: pin.board?.name || pin.board_name || "Saved",
        createdAt: pin.created_at || "",
      };
    })
    .filter((pin) => pin.id && pin.imageUrl)
    .slice(0, limit);
}

export async function getPinterestPins(limit = 500, explicitToken?: string): Promise<PinterestPin[]> {
  if (!explicitToken) {
    try {
      const publicPins = await getPublicPinterestPins(limit);
      if (publicPins.length) return publicPins;
    } catch (error) {
      console.error("Pinterest public feed unavailable:", error);
    }
  }

  try {
    const [pins, boardsList] = await Promise.all([
      pinterestFetchAll<PinterestApiPin>("/pins", limit, explicitToken),
      pinterestFetchAll<PinterestBoard>("/boards", 250, explicitToken),
    ]);

    const boards = new Map(
      boardsList
        .filter((board) => board.id)
        .map((board) => [board.id as string, board.name || "Saved"]),
    );

    return pins
      .map((pin) => {
        const id = pin.id || "";
        const imageUrl = bestImage(pin);

        return {
          id,
          title: pin.title || "",
          description: pin.description || "",
          altText: pin.alt_text || pin.title || "Pinterest visual reference",
          imageUrl,
          pinUrl: id ? `https://www.pinterest.com/pin/${id}/` : "https://www.pinterest.com/ivonnealdaz/",
          boardName: (pin.board_id && boards.get(pin.board_id)) || "Saved",
          createdAt: pin.created_at || "",
        };
      })
      .filter((pin) => pin.id && pin.imageUrl)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);
  } catch (error) {
    console.error("Pinterest feed unavailable:", error);
    try {
      return await getPublicPinterestPins(limit);
    } catch (publicError) {
      console.error("Pinterest public feed unavailable:", publicError);
      return [];
    }
  }
}
