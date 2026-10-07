import crypto from "node:crypto";

const COOKIE_NAME = "moodboard_drive_session";

type DriveSession = {
  refreshToken: string;
  email?: string;
};

function key() {
  const secret = process.env.DRIVE_SESSION_SECRET;
  if (!secret) throw new Error("Missing DRIVE_SESSION_SECRET");
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptDriveSession(session: DriveSession) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(session), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

export function decryptDriveSession(value?: string | null): DriveSession | null {
  if (!value) return null;

  try {
    const data = Buffer.from(value, "base64url");
    const iv = data.subarray(0, 12);
    const tag = data.subarray(12, 28);
    const encrypted = data.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return JSON.parse(decrypted.toString("utf8")) as DriveSession;
  } catch {
    return null;
  }
}

export const DRIVE_COOKIE_NAME = COOKIE_NAME;

export async function refreshGoogleAccessToken(refreshToken: string) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("Missing Google OAuth credentials");

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Google token refresh failed: ${response.status}`);
  }

  const data = await response.json() as { access_token?: string };
  if (!data.access_token) throw new Error("Google did not return an access token");
  return data.access_token;
}

export async function createDriveFolder(accessToken: string, name: string, parentId?: string) {
  const response = await fetch("https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      ...(parentId ? { parents: [parentId] } : {}),
    }),
  });

  if (!response.ok) throw new Error(`Drive folder creation failed: ${response.status}`);
  return response.json() as Promise<{ id: string; name: string; webViewLink?: string }>;
}

export async function uploadDriveFile(
  accessToken: string,
  file: Blob,
  filename: string,
  mimeType: string,
  parentId: string,
) {
  const metadata = {
    name: filename,
    parents: [parentId],
  };

  const boundary = `moodboard-${crypto.randomBytes(12).toString("hex")}`;
  const metadataPart =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n` +
    JSON.stringify(metadata) +
    "\r\n";
  const fileHeader =
    `--${boundary}\r\nContent-Type: ${mimeType || "application/octet-stream"}\r\n\r\n`;
  const close = `\r\n--${boundary}--`;

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const body = Buffer.concat([
    Buffer.from(metadataPart),
    Buffer.from(fileHeader),
    fileBuffer,
    Buffer.from(close),
  ]);

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Drive upload failed: ${response.status} ${error.slice(0, 200)}`);
  }

  return response.json() as Promise<{ id: string; name: string; webViewLink?: string }>;
}
