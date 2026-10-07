import Link from "next/link";
import MoodboardBuilder from "@/components/MoodboardBuilder";
import MoodboardThemeToggle from "@/components/MoodboardThemeToggle";
import { getPinterestPins } from "@/lib/pinterest";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Moodboard",
  "Turn Pinterest saves into a polished editorial carousel.",
  "/experiments/moodboard-agent"
);

export default async function MoodboardAgentPage() {
  const pins = await getPinterestPins(300);

  return (
    <div className="moodboard-app">
      <header className="moodboard-app-bar">
        <Link href="/experiments/moodboard-agent" className="moodboard-app-brand" aria-label="Moodboard home">
          moodboard<span>.</span>
        </Link>

        <div className="moodboard-app-meta">
          <span className="moodboard-app-status"><i /> Pinterest → carousel</span>
          <MoodboardThemeToggle />
          <a
            href="mailto:hello@ivonnealdaz.com?subject=Moodboard%20%E2%80%94%20feedback%20%2F%20ideas&body=Hi%20Ivonne%2C%0A%0AI%20was%20using%20Moodboard%20and%20wanted%20to%20share%3A%0A%0A"
            className="moodboard-feedback-link"
          >
            Feedback / ideas ↗
          </a>
          <Link href="/overview#experiments">Back to portfolio ↗</Link>
        </div>
      </header>

      <main className="moodboard-app-main">
        <section className="moodboard-app-intro">
          <div className="moodboard-app-intro-copy">
            <p className="moodboard-app-kicker">VISUAL EDITOR / 01</p>
            <h1>Turn saved inspiration into something you can post.</h1>
            <p>
              Connect Pinterest, choose a board, and build a clean editorial carousel from the references you already save.
            </p>
          </div>

          <div className="moodboard-app-note">
            <span>OUTPUT</span>
            <strong>1080 × 1350</strong>
            <p>Carousel PNGs + source links</p>
          </div>
        </section>

        <MoodboardBuilder demoPins={pins} />
      </main>

      <footer className="moodboard-app-footer">
        <span>Built as an experiment by Ivonne Aldaz.</span>
        <span>Private connections. Nothing posts automatically.</span>
      </footer>
    </div>
  );
}
