import Link from "next/link";
import PinterestGallery from "@/components/PinterestGallery";
import { getPinterestPins } from "@/lib/pinterest";

export const revalidate = 3600;

export default async function VisualReferencesPage() {
  const pins = await getPinterestPins(500);

  return (
    <section className="page section-pad visual-index-page pinterest-reference-page">
      <header className="collection-intro">
        <div>
          <h1>Visual References</h1>
          <p>Images, spaces, colors, and details that have inspired me.</p>
        </div>
        <Link href="/#library">Back to Library ←</Link>
      </header>

      <div className="pinterest-reference-header">
        <a href="https://www.pinterest.com/ivonnealdaz/_pins/" target="_blank" rel="noreferrer">
          View on Pinterest ↗︎
        </a>
      </div>

      <PinterestGallery pins={pins} />

      <nav className="related-paths" aria-label="Explore next">
        <Link href="/books">Books + Quotes →</Link>
        <Link href="/travel">Places →</Link>
      </nav>
    </section>
  );
}
