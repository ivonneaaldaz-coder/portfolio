import HomeWatercolorTrace from "@/components/HomeWatercolorTrace";

export const metadata = { title: "Watercolor — Ivonne Aldaz", description: "An interactive watercolor study." };

export default function WatercolorPage() {
  return <main className="watercolor-project-page" style={{ position: "relative", minHeight: "100dvh", overflow: "hidden", display: "grid", placeItems: "center", padding: "5rem 2rem" }}>
    <HomeWatercolorTrace />
    <div style={{ position: "relative", zIndex: 1, textAlign: "center", pointerEvents: "none" }}>
      <p style={{ fontSize: 13, letterSpacing: ".16em", textTransform: "uppercase", opacity: .55, marginBottom: 24 }}>Interactive study</p>
      <h1 style={{ fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 400, letterSpacing: "-.055em", margin: 0 }}>Watercolor</h1>
      <p style={{ opacity: .6, marginTop: 20 }}>Move your cursor to paint. Let it fade.</p>
    </div>
  </main>;
}
