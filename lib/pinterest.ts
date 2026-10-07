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

const API_BASE = "https://api.pinterest.com/v5";

async function pinterestFetch<T>(path: string): Promise<T> {
  const token = process.env.PINTEREST_ACCESS_TOKEN;
  if (!token) throw new Error("Missing PINTEREST_ACCESS_TOKEN");

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

function bestImage(pin: PinterestApiPin): string {
  const images = Object.values(pin.media?.images ?? {}).filter(
    (image): image is PinterestImage & { url: string } => Boolean(image?.url),
  );

  if (!images.length) return "";

  images.sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  return images[0].url;
}

export async function getPinterestPins(limit = 40): Promise<PinterestPin[]> {
  try {
    const [pinsResponse, boardsResponse] = await Promise.all([
      pinterestFetch<{ items?: PinterestApiPin[] }>("/pins?page_size=100"),
      pinterestFetch<{ items?: PinterestBoard[] }>("/boards?page_size=100"),
    ]);

    const boards = new Map(
      (boardsResponse.items ?? [])
        .filter((board) => board.id)
        .map((board) => [board.id as string, board.name || "Saved"]),
    );

    return (pinsResponse.items ?? [])
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
