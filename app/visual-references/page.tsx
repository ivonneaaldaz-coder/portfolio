import Link from "next/link";
import PinterestGallery from "@/components/PinterestGallery";
import PinterestProfileFallback from "@/components/PinterestProfileFallback";
import { getPinterestPins } from "@/lib/pinterest";

export const revalidate = 900;

export default async function VisualReferencesPage() {
  const pins = await getPinterestPins(1800);

  return (
    <section className="page section-pad visual-index-page pinterest-reference-page">
      
{pins.length ? <PinterestGallery pins={pins} /> : <PinterestProfileFallback />}

      <nav className="related-paths" aria-label="Explore next">
        <Link href="/books">Books + Quotes →</Link>
        <Link href="/travel">Places →</Link>
      </nav>
    </section>
  );
}
