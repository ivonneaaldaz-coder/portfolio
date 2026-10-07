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

async function pinterestFetch<T>(path: string, explicitToken?: string): Promise<T> {
  const token = explicitToken || process.env.PINTEREST_ACCESS_TOKEN;
  if (!token) throw new Error("Missing Pinterest access token");

  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Pinterest API ${response.status}: ${body.slice(0, 300)}`);
  }

  return response.json() as Promise<T>;
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

export async function getPinterestPins(limit = 500, explicitToken?: string): Promise<PinterestPin[]> {
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
    return [];
  }
}
