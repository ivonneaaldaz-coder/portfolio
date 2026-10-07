import crypto from "node:crypto";
import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.PINTEREST_APP_ID;
  if (!clientId) return new NextResponse("Pinterest OAuth is not configured.", { status: 500 });

  const state = crypto.randomBytes(24).toString("base64url");
  const redirectUri = "https://ivonnealdaz.com/api/pinterest/callback";
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "boards:read,pins:read,user_accounts:read",
    state,
  });

  const response = NextResponse.redirect("https://www.pinterest.com/oauth/?" + params.toString());
  response.cookies.set("moodboard_pinterest_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return response;
}
