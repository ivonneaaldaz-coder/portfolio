import { ImageResponse } from "next/og";

export const alt = "Ivonne Aldaz — circular identity mark on a dark background";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",background:"#11110f"}}>
      <svg width="410" height="410" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24.5" fill="none" stroke="#f2f0ea" strokeOpacity="0.8" strokeWidth="2.5"/>
        <circle cx="32" cy="32" r="8" fill="#f2f0ea"/>
      </svg>
    </div>,
    size
  );
}
