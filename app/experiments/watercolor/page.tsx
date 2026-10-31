import WatercolorStudio from "@/components/WatercolorStudio";

export const metadata = { title: "Watercolor — Ivonne Aldaz", description: "An interactive watercolor playground." };

export default function WatercolorPage() {
  return <main className="page watercolor-project-page" style={{ minHeight: "100dvh", padding: "clamp(24px, 5vw, 72px)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <WatercolorStudio />
    </div>
  </main>;
}
