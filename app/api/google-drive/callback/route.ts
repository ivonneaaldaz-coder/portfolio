import { NextRequest, NextResponse } from "next/server";
import { DRIVE_COOKIE_NAME, encryptDriveSession } from "@/lib/googleDriveOAuth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  const savedState = request.cookies.get("moodboard_oauth_state")?.value;

  if (error) {
    return NextResponse.redirect(new URL("/experiments/moodboard-agent?drive=denied", request.url));
  }

  if (!code || !state || !savedState || state !== savedState) {
    return new NextResponse("Invalid OAuth callback.", { status: 400 });
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("Google OAuth is not configured.", { status: 500 });
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: "https://ivonnealdaz.com/api/google-drive/callback",
      grant_type: "authorization_code",
    }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    return new NextResponse("Could not connect Google Drive.", { status: 502 });
  }

  const tokens = await tokenResponse.json() as {
    refresh_token?: string;
    access_token?: string;
  };

  if (!tokens.refresh_token) {
    return new NextResponse("Google did not return a refresh token. Reconnect and approve access.", { status: 400 });
  }

  const response = NextResponse.redirect(
    new URL("/experiments/moodboard-agent?drive=connected", request.url),
  );

  response.cookies.set(
    DRIVE_COOKIE_NAME,
    encryptDriveSession({ refreshToken: tokens.refresh_token }),
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 180,
      path: "/",
    },
  );
  response.cookies.delete("moodboard_oauth_state");
  return response;
}
