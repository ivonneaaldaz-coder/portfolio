import Link from "next/link";
import MoodboardBuilder from "@/components/MoodboardBuilder";
import { getPinterestPins } from "@/lib/pinterest";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Moodboard Agent",
  "A visual research experiment that turns Pinterest saves into editorial moodboards.",
  "/experiments/moodboard-agent"
);

// Pinterest OAuth production env ready
export default async function MoodboardAgentPage() {
  const pins = await getPinterestPins(300);

  return (
    <article className="experiment-detail page section-pad moodboard-agent-page">
      <Link className="back-link" href="/#experiments">← Experiments</Link>

      <header className="experiment-detail-hero">
        <div>
          <p className="eyebrow">VISUAL RESEARCH / CREATIVE OPS</p>
          <h1>Turn your Pinterest saves into an editorial moodboard.</h1>
          <p className="experiment-detail-dek">
            A small system that pulls visual references, builds a coherent edit, and turns it into a ready-to-post Instagram carousel.
          </p>
          <a className="experiment-launch" href="#moodboard-builder">Build moodboard →</a>
        </div>
      </header>

      <MoodboardBuilder demoPins={pins} />

      <section className="experiment-detail-grid">
        <div>
          <p className="eyebrow">SOURCE</p>
          <p>Live Pinterest references from selected boards.</p>
        </div>
        <div>
          <p className="eyebrow">OUTPUT</p>
          <p>A 1080 × 1350 carousel, caption draft, and source list.</p>
        </div>
        <div>
          <p className="eyebrow">EXPORT</p>
          <p>Download the finished carousel, caption, and source links as one ZIP.</p>
        </div>
      </section>

      <section className="moodboard-agent-flow">
        <p className="eyebrow">MVP FLOW</p>
        <div className="moodboard-agent-steps">
          <div><span>01</span><h2>Select source</h2><p>Choose the Pinterest board or latest saves to work from.</p></div>
          <div><span>02</span><h2>Generate edit</h2><p>The system builds a visual set and proposes a theme from your saved references.</p></div>
          <div><span>03</span><h2>Review carousel</h2><p>Edit the theme or caption and regenerate the visual selection if needed.</p></div>
          <div><span>04</span><h2>Download</h2><p>Export the final 1080 × 1350 PNGs, caption, and source links in one ZIP.</p></div>
        </div>
      </section>
    </article>
  );
}
