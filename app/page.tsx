import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import HomeWatercolorTrace from "@/components/HomeWatercolorTrace";

export const metadata = {
  ...pageMetadata("Ivonne Aldaz — Strategist, artist, builder", "Ivonne Aldaz. Strategist, artist, builder. Explore work and play.", "/"),
  title: { absolute: "Ivonne Aldaz — Strategist, artist, builder" },
};

export default function OverviewPage() {
  return (
    <main className="overview-page home-minimal">
      <section className="home-minimal-hero" aria-labelledby="home-title">
        <HomeWatercolorTrace />
        <div className="home-minimal-content">
          <h1 id="home-title">I make things <span>— brands, art, experiences.</span></h1>
          <div className="home-minimal-links">
            <Link href="/work">Explore work <span aria-hidden="true">↗</span></Link>
            <details className="home-play-disclosure"><summary>Explore play <span aria-hidden="true">+</span></summary><nav aria-label="Explore play"><Link href="/art">Art</Link><Link href="/travel">Travel</Link><Link href="/music">Music</Link><Link href="/books">Books + Quotes</Link><Link href="/visual-references">Visual References</Link></nav></details>
          </div>
        </div>
      </section>
    </main>
  );
}
