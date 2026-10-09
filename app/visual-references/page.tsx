import Link from "next/link";
import { cookies } from "next/headers";
import PinterestGallery from "@/components/PinterestGallery";
import PinterestProfileFallback from "@/components/PinterestProfileFallback";
import { getPinterestPins } from "@/lib/pinterest";
import { PINTEREST_COOKIE_NAME, decryptPinterestSession } from "@/lib/pinterestOAuth";

export const revalidate = 3600;

export default async function VisualReferencesPage() {
  const cookieStore = await cookies();
  const session = decryptPinterestSession(cookieStore.get(PINTEREST_COOKIE_NAME)?.value);

  let pins = session?.accessToken
    ? await getPinterestPins(500, session.accessToken)
    : [];

  if (!pins.length) {
    pins = await getPinterestPins(500);
  }

  return (
    <section className="page section-pad visual-index-page pinterest-reference-page">
      <header className="collection-intro">
        <div>
          <h1>Visual References</h1>
          <p>Images, spaces, colors, and details that have inspired me.</p>
        </div>
        <Link href="/#library">← Back to Library</Link>
      </header>

      <div className="pinterest-reference-header">
        <a href="https://www.pinterest.com/ivonnealdaz/_pins/" target="_blank" rel="noreferrer">
          View on Pinterest ↗︎
        </a>
      </div>

      {pins.length ? <PinterestGallery pins={pins} /> : <PinterestProfileFallback />}

      <nav className="related-paths" aria-label="Explore next">
        <Link href="/books">Books + Quotes →</Link>
        <Link href="/travel">Places →</Link>
      </nav>
    </section>
  );
}
