import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Books + Quotes", "Books, passages, and ideas curated by Ivonne Aldaz.", "/books");

import Link from "next/link";
import Bookshelf from "@/components/Bookshelf";
import { listDriveFolder } from "@/lib/googleDrive";

const BOOKS_FOLDER = "1mp7-HM3jdj_Q0rp4ltW49dUhSIoLbySt";

export default async function BooksPage() {
  const files = (await listDriveFolder(BOOKS_FOLDER))
    .filter(file => file.mimeType.startsWith("image/"))
    .map(file => ({ name:file.name, image:`/api/drive-image?id=${encodeURIComponent(file.id)}` }));

  return (
    <section className="page section-pad library-page">
      <header className="collection-intro">
        <div>
          <p className="editorial-kicker">The personal collection / 01</p><h1>Books <em>+ Quotes.</em></h1>
          <p>A small library of books and words I keep close.</p>
        </div>
        <Link href="/#library">← Back to Library</Link>
      </header>
      <Bookshelf books={files} />
      <nav className="related-paths" aria-label="Explore next">
        <Link href="/visual-references">Visual References →</Link>
        <Link href="/music">Music →</Link>
      </nav>
    </section>
  );
}
