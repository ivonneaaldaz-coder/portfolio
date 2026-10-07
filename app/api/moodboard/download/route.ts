import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import sharp from "sharp";
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

function wrapTheme(value: string, max = 22) {
  const words = value.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function titleSvg(theme: string) {
  const lines = wrapTheme(theme || "Visual Edit");
  return Buffer.from(`
    <svg width="1080" height="450" xmlns="http://www.w3.org/2000/svg">
      <rect width="1080" height="450" fill="#f1eee7"/>
      <text x="64" y="72" fill="#6d6961" font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="700" letter-spacing="3">MOODBOARD</text>
      <text x="64" y="205" fill="#11110f" font-family="Arial,Helvetica,sans-serif" font-size="58" font-weight="500" letter-spacing="-2.5">
        ${lines.map((line,index)=>`<tspan x="64" dy="${index===0?0:68}">${esc(line)}</tspan>`).join("")}
      </text>
    </svg>
  `);
}

function footerSvg(index: number, board: string) {
  return Buffer.from(`
    <svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
      <text x="60" y="1300" fill="#77736c" font-family="Arial,Helvetica,sans-serif" font-size="20" letter-spacing="2">${String(index).padStart(2,"0")}</text>
      <text x="1020" y="1300" text-anchor="end" fill="#77736c" font-family="Arial,Helvetica,sans-serif" font-size="18">${esc(board)}</text>
    </svg>
  `);
}

export async function POST(request: NextRequest) {
  const body = await request.json() as RequestBody;
  const theme = (body.theme || "Visual Edit").trim().slice(0,120);
  const caption = (body.caption || "").trim();
  const pins = Array.isArray(body.pins) ? body.pins.slice(0,8) : [];

  if (!pins.length) {
    return NextResponse.json({ error:"No Pinterest references were selected." }, { status:400 });
  }

  try {
    const zip = new JSZip();

    const first = await fetch(pins[0].imageUrl,{cache:"no-store"});
    if (!first.ok) throw new Error("Could not load cover image");
    const firstBuffer = Buffer.from(await first.arrayBuffer());
    const coverImage = await sharp(firstBuffer)
      .resize(1080,900,{fit:"cover",position:"attention"})
      .png()
      .toBuffer();

    const cover = await sharp({
      create:{width:1080,height:1350,channels:4,background:"#f1eee7"}
    })
      .composite([
        {input:coverImage,left:0,top:0},
        {input:titleSvg(theme),left:0,top:900},
      ])
      .png()
      .toBuffer();

    zip.file("01-cover.png", cover);

    const sources: string[] = [];
    for (let i=1;i<pins.length;i++) {
      const pin = pins[i];
      sources.push(`${i+1}. ${pin.title || pin.boardName} — ${pin.pinUrl}`);

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
          {input:footerSvg(i+1,pin.boardName),left:0,top:0}
        ])
        .png()
        .toBuffer();

      zip.file(`${String(i+1).padStart(2,"0")}.png`, slide);
    }

    zip.file("caption.txt", caption || `Pinterest finds: ${theme.toLowerCase().replaceAll(" / ",", ")}.`);
    zip.file("sources.txt", sources.join("\n"));

    const output = await zip.generateAsync({type:"uint8array",compression:"DEFLATE"});
    const body = output.buffer.slice(output.byteOffset, output.byteOffset + output.byteLength) as ArrayBuffer;
    const slug = theme.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,48) || "moodboard";

    return new NextResponse(body, {
      status:200,
      headers:{
        "Content-Type":"application/zip",
        "Content-Disposition":`attachment; filename="${slug}.zip"`,
        "Cache-Control":"no-store",
      },
    });
  } catch (error) {
    console.error("Moodboard download failed:",error);
    return NextResponse.json({ error:"Could not generate the moodboard download." }, { status:500 });
  }
}
