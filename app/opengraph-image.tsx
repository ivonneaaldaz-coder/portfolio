import { ImageResponse } from "next/og";

export const alt = "Ivonne Aldaz — Strategy, technology, art.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "72px", background: "#11110f", color: "#f2f0ea", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 24, letterSpacing: 5 }}>IVONNE ALDAZ</div>
      <div style={{ fontSize: 88, letterSpacing: -5, lineHeight: 1.05, maxWidth: 950 }}>Strategy, technology, art.</div>
      <div style={{ fontSize: 24, color: "#b7b7ad" }}>hello@ivonnealdaz.com</div>
    </div>, size
  );
}
