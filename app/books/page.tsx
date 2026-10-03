import Link from "next/link";
import LibraryWorld from "@/components/LibraryWorld";

export default function BooksPage() {
  return (
    <section className="page section-pad library-page">
      <header className="collection-intro">
        <div>
          <h1>Books + Quotes</h1>
          <p>Books, passages, and ideas worth returning to.</p>
        </div>
        <Link href="/library">Back to Library ←</Link>
      </header>
      <LibraryWorld />
      <nav className="related-paths" aria-label="Explore next">
        <Link href="/visual-references">Visual References →</Link>
        <Link href="/music">Music →</Link>
      </nav>
    </section>
  );
}
