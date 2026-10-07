import Link from "next/link";
import MoodboardDriveConnection from "@/components/MoodboardDriveConnection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Moodboard Agent",
  "A visual research experiment that turns Pinterest saves into weekly editorial moodboards.",
  "/experiments/moodboard-agent"
);

// Moodboard Agent experiment entrypoint
export default function MoodboardAgentPage() {
  return (
    <article className="experiment-detail page section-pad moodboard-agent-page">
      <Link className="back-link" href="/#experiments">← Experiments</Link>

      <header className="experiment-detail-hero">
        <div>
          <p className="eyebrow">VISUAL RESEARCH / CREATIVE OPS</p>
          <h1>Pinterest saves into a weekly editorial moodboard.</h1>
          <p className="experiment-detail-dek">
            A small system that pulls visual references, builds a coherent edit, turns it into an Instagram carousel,
            and saves the finished files to Google Drive.
          </p>
          <MoodboardDriveConnection />
        </div>
      </header>

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
          <p className="eyebrow">DESTINATION</p>
          <p>Approved files land in a dated Google Drive folder for easy posting from desktop or phone.</p>
        </div>
      </section>

      <section className="moodboard-agent-flow">
        <p className="eyebrow">MVP FLOW</p>
        <div className="moodboard-agent-steps">
          <div><span>01</span><h2>Select source</h2><p>Choose the Pinterest board or latest saves to work from.</p></div>
          <div><span>02</span><h2>Choose theme</h2><p>Review a few visual directions and pick the strongest edit.</p></div>
          <div><span>03</span><h2>Review carousel</h2><p>Approve the layout, caption, and selected references before export.</p></div>
          <div><span>04</span><h2>Save to Drive</h2><p>Create a dated folder and upload the final publishing assets.</p></div>
        </div>
      </section>
    </article>
  );
}
