import { NextRequest, NextResponse } from "next/server";
import { DRIVE_COOKIE_NAME, decryptDriveSession } from "@/lib/googleDriveOAuth";

export async function GET(request: NextRequest) {
  const session = decryptDriveSession(request.cookies.get(DRIVE_COOKIE_NAME)?.value);
  return NextResponse.json({
    connected: Boolean(session?.refreshToken),
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID || null,
  });
}
