import Link from "next/link";
import LibraryWorld from "@/components/LibraryWorld";

export default function LibraryPage() {
  return (
    <section className="page section-pad library-page">
      <header className="collection-intro">
        <div>
          <h1>Library</h1>
          <p>A living shelf of books, essays, passages, and ideas worth returning to.</p>
        </div>
        <Link href="/notes">Back to Notes ←</Link>
      </header>

      <LibraryWorld />

      <section className="commonplace">
        <div className="section-heading">
          <h2 className="section-title small-title">Commonplace</h2>
        </div>
        <div className="commonplace-grid">
          <article><span>01</span><p>Quotes, passages, marginalia, and fragments worth keeping.</p></article>
          <article><span>02</span><p>The things that survive the highlight and make their way into real life.</p></article>
          <article><span>03</span><p>Collected slowly. No algorithm required.</p></article>
        </div>
      </section>
    </section>
  );
}
