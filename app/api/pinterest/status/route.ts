import { NextRequest, NextResponse } from "next/server";
import { PINTEREST_COOKIE_NAME, decryptPinterestSession } from "@/lib/pinterestOAuth";

export async function GET(request: NextRequest) {
  const session = decryptPinterestSession(request.cookies.get(PINTEREST_COOKIE_NAME)?.value);
  return NextResponse.json({ connected: Boolean(session?.accessToken) });
}
