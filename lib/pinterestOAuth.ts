import crypto from "node:crypto";

export const PINTEREST_COOKIE_NAME = "moodboard_pinterest_session";

type PinterestSession = {
  accessToken: string;
  refreshToken?: string;
};

function key() {
  const secret = process.env.PINTEREST_SESSION_SECRET;
  if (!secret) throw new Error("Missing PINTEREST_SESSION_SECRET");
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptPinterestSession(session: PinterestSession) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(session), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

export function decryptPinterestSession(value?: string | null): PinterestSession | null {
  if (!value) return null;
  try {
    const data = Buffer.from(value, "base64url");
    const iv = data.subarray(0, 12);
    const tag = data.subarray(12, 28);
    const encrypted = data.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return JSON.parse(decrypted.toString("utf8")) as PinterestSession;
  } catch {
    return null;
  }
}
