import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = {
  ...pageMetadata("Ivonne Aldaz — Strategist, artist, builder", "Ivonne Aldaz. Strategist, artist, builder. Explore work and play.", "/"),
  title: { absolute: "Ivonne Aldaz — Strategist, artist, builder" },
};

export default function OverviewPage() {
  return (
    <main className="overview-page home-minimal">
      <section className="home-minimal-hero" aria-labelledby="home-title">
        <div className="home-minimal-content">
          <h1 id="home-title">Ivonne Aldaz</h1>
          <p>Strategist, artist, builder.</p>
          <div className="home-minimal-links">
            <Link href="/work">Explore work <span aria-hidden="true">↗</span></Link>
            <Link href="/art">Explore play <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="home-minimal-bottom">
          <span>San Antonio, TX · Often elsewhere</span>
          <span>© 2026</span>
        </div>
      </section>
    </main>
  );
}
