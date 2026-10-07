import { NextRequest, NextResponse } from "next/server";
import { PINTEREST_COOKIE_NAME, encryptPinterestSession } from "@/lib/pinterestOAuth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  const savedState = request.cookies.get("moodboard_pinterest_state")?.value;

  if (error) {
    return NextResponse.redirect(new URL("/experiments/moodboard-agent?pinterest=denied#moodboard-builder", request.url));
  }
  if (!code || !state || !savedState || state !== savedState) {
    return new NextResponse("Invalid Pinterest OAuth callback.", { status: 400 });
  }

  const clientId = process.env.PINTEREST_APP_ID;
  const clientSecret = process.env.PINTEREST_APP_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("Pinterest OAuth needs the app secret before it can complete.", { status: 503 });
  }

  const basic = Buffer.from(clientId + ":" + clientSecret).toString("base64");
  const tokenResponse = await fetch("https://api.pinterest.com/v5/oauth/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + basic,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: "https://ivonnealdaz.com/api/pinterest/callback",
    }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    return new NextResponse("Could not connect Pinterest.", { status: 502 });
  }

  const tokens = await tokenResponse.json() as { access_token?: string; refresh_token?: string };
  if (!tokens.access_token) {
    return new NextResponse("Pinterest did not return an access token.", { status: 502 });
  }

  const response = NextResponse.redirect(
    new URL("/experiments/moodboard-agent?pinterest=connected#moodboard-builder", request.url),
  );
  response.cookies.set(
    PINTEREST_COOKIE_NAME,
    encryptPinterestSession({ accessToken: tokens.access_token, refreshToken: tokens.refresh_token }),
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    },
  );
  response.cookies.delete("moodboard_pinterest_state");
  return response;
}
