import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = ["i.pinimg.com", "pinimg.com"];

function isAllowedHost(hostname: string) {
  return ALLOWED_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
}

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");
  if (!src) {
    return NextResponse.json({ error: "Missing image source." }, { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return NextResponse.json({ error: "Invalid image source." }, { status: 400 });
  }

  if (url.protocol !== "https:" || !isAllowedHost(url.hostname)) {
    return NextResponse.json({ error: "Image source is not allowed." }, { status: 400 });
  }

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json({ error: "Could not load image." }, { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const bytes = await response.arrayBuffer();

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=300",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Moodboard image proxy failed:", error);
    return NextResponse.json({ error: "Could not load image." }, { status: 500 });
  }
}
