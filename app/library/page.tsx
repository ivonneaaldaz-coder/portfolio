import Link from "next/link";
import LibraryWorld from "@/components/LibraryWorld";

export default function LibraryPage() {
  return (
    <section className="page section-pad library-page">
      <header className="collection-intro">
        <div>
          <h1>Library</h1>
          <p>Books, passages, and ideas worth returning to.</p>
        </div>
        <Link href="/notes">Back to Index ←</Link>
      </header>

      <LibraryWorld />
    </section>
  );
}
