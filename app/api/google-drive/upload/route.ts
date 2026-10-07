import { NextRequest, NextResponse } from "next/server";
import {
  DRIVE_COOKIE_NAME,
  createDriveFolder,
  decryptDriveSession,
  refreshGoogleAccessToken,
  uploadDriveFile,
} from "@/lib/googleDriveOAuth";

export async function POST(request: NextRequest) {
  const session = decryptDriveSession(request.cookies.get(DRIVE_COOKIE_NAME)?.value);
  if (!session?.refreshToken) {
    return NextResponse.json({ error: "Google Drive is not connected." }, { status: 401 });
  }

  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootFolderId) {
    return NextResponse.json({ error: "Moodboard Drive folder is not configured." }, { status: 500 });
  }

  const form = await request.formData();
  const folderName = String(form.get("folderName") || "").trim();
  const files = form.getAll("files").filter((item): item is File => item instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "No files were provided." }, { status: 400 });
  }

  try {
    const accessToken = await refreshGoogleAccessToken(session.refreshToken);
    const destination = folderName
      ? await createDriveFolder(accessToken, folderName, rootFolderId)
      : { id: rootFolderId, name: "Moodboard Agent" };

    const uploaded = [];
    for (const file of files) {
      uploaded.push(
        await uploadDriveFile(
          accessToken,
          file,
          file.name,
          file.type || "application/octet-stream",
          destination.id,
        ),
      );
    }

    return NextResponse.json({
      ok: true,
      folder: destination,
      files: uploaded,
      openFolderUrl: `https://drive.google.com/drive/folders/${destination.id}`,
    });
  } catch (error) {
    console.error("Moodboard Drive upload failed:", error);
    return NextResponse.json({ error: "Could not upload to Google Drive." }, { status: 500 });
  }
}
