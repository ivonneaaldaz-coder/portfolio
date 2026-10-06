import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });

  const upstream = await fetch(`https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1200`, {
    cache: "force-cache",
  });

  if (!upstream.ok) return new Response("Image unavailable", { status: upstream.status });

  const contentType = upstream.headers.get("content-type") || "image/jpeg";
  const body = await upstream.arrayBuffer();

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
    },
  });
}
