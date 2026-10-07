import { NextRequest, NextResponse } from "next/server";
import { getPinterestPins } from "@/lib/pinterest";
import { PINTEREST_COOKIE_NAME, decryptPinterestSession } from "@/lib/pinterestOAuth";

export async function GET(request: NextRequest) {
  const session = decryptPinterestSession(request.cookies.get(PINTEREST_COOKIE_NAME)?.value);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Pinterest is not connected." }, { status: 401 });
  }

  const pins = await getPinterestPins(500, session.accessToken);
  return NextResponse.json({ pins });
}
