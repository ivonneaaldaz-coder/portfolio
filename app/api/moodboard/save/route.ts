import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import {
  DRIVE_COOKIE_NAME,
  createDriveFolder,
  decryptDriveSession,
  refreshGoogleAccessToken,
  uploadDriveFile,
} from "@/lib/googleDriveOAuth";
import type { PinterestPin } from "@/lib/pinterest";

type RequestBody = {
  theme?: string;
  caption?: string;
  pins?: PinterestPin[];
};

function esc(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"
  }[char] || char));
}

function wrapTheme(value: string, max = 20) {
  const words = value.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    if ((line + " " + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  });
  if (line) lines.push(line);
  return lines.slice(0,4);
}

function coverSvg(theme: string) {
  const lines = wrapTheme(theme || "Visual Edit");
  const tspans = lines.map((line,index) =>
    `<tspan x="78" dy="${index===0 ? 0 : 98}">${esc(line)}</tspan>`
  ).join("");

  return Buffer.from(`
  <svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
    <rect width="1080" height="1350" fill="#11110f"/>
    <text x="78" y="95" fill="#f2efe8" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="700" letter-spacing="3">MOODBOARD</text>
    <text x="78" y="430" fill="#f2efe8" font-family="Arial,Helvetica,sans-serif" font-size="86" font-weight="700" letter-spacing="-4">${tspans}</text>
    <line x1="78" y1="1170" x2="1002" y2="1170" stroke="#6e6d68" stroke-width="1"/>
    <text x="78" y="1240" fill="#aaa79f" font-family="Arial,Helvetica,sans-serif" font-size="22">Visual references / Ivonne Aldaz</text>
  </svg>`);
}

function footerSvg(index: number, board: string) {
  return Buffer.from(`
  <svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
    <text x="60" y="1300" fill="#77736c" font-family="Arial,Helvetica,sans-serif" font-size="20" letter-spacing="2">${String(index).padStart(2,"0")}</text>
    <text x="1020" y="1300" text-anchor="end" fill="#77736c" font-family="Arial,Helvetica,sans-serif" font-size="18">${esc(board)}</text>
  </svg>`);
}

export async function POST(request: NextRequest) {
  const session = decryptDriveSession(request.cookies.get(DRIVE_COOKIE_NAME)?.value);
  if (!session?.refreshToken) {
    return NextResponse.json({ error:"Connect Google Drive before saving." }, { status:401 });
  }

  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootFolderId) {
    return NextResponse.json({ error:"Drive folder is not configured." }, { status:500 });
  }

  const body = await request.json() as RequestBody;
  const theme = (body.theme || "Visual Edit").trim().slice(0,120);
  const caption = (body.caption || "").trim();
  const pins = Array.isArray(body.pins) ? body.pins.slice(0,8) : [];

  if (!pins.length) {
    return NextResponse.json({ error:"No Pinterest references were selected." }, { status:400 });
  }

  try {
    const accessToken = await refreshGoogleAccessToken(session.refreshToken);
    const date = new Date().toISOString().slice(0,10);
    const folder = await createDriveFolder(accessToken, `Moodboard — ${date} — ${theme.slice(0,42)}`, rootFolderId);

    const cover = await sharp(coverSvg(theme)).png().toBuffer();
    await uploadDriveFile(accessToken,new Blob([cover],{type:"image/png"}),"01-cover.png","image/png",folder.id);

    const sources: string[] = [];

    for (let i=0;i<pins.length;i++) {
      const pin = pins[i];
      sources.push(`${i+2}. ${pin.title || pin.boardName} — ${pin.pinUrl}`);

      const response = await fetch(pin.imageUrl,{cache:"no-store"});
      if (!response.ok) continue;
      const source = Buffer.from(await response.arrayBuffer());
      const image = await sharp(source)
        .resize(960,1130,{fit:"cover",position:"attention"})
        .png()
        .toBuffer();

      const slide = await sharp({
        create:{width:1080,height:1350,channels:4,background:"#f4f1eb"}
      })
        .composite([
          {input:image,left:60,top:60},
          {input:footerSvg(i+2,pin.boardName),left:0,top:0}
        ])
        .png()
        .toBuffer();

      await uploadDriveFile(
        accessToken,
        new Blob([slide],{type:"image/png"}),
        `${String(i+2).padStart(2,"0")}.png`,
        "image/png",
        folder.id
      );
    }

    await uploadDriveFile(
      accessToken,
      new Blob([caption || `Visual notes: ${theme.toLowerCase()}.`],{type:"text/plain"}),
      "caption.txt",
      "text/plain",
      folder.id
    );

    await uploadDriveFile(
      accessToken,
      new Blob([sources.join("\n")],{type:"text/plain"}),
      "sources.txt",
      "text/plain",
      folder.id
    );

    return NextResponse.json({
      ok:true,
      openFolderUrl:`https://drive.google.com/drive/folders/${folder.id}`
    });
  } catch (error) {
    console.error("Moodboard generation failed:",error);
    return NextResponse.json({ error:"Could not generate and save the moodboard." },{status:500});
  }
}
