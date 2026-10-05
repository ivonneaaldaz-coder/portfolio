import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Books + Quotes", "Books, passages, and ideas worth returning to, curated by Ivonne Aldaz.", "/books");

import Link from "next/link";
import LibraryWorld from "@/components/LibraryWorld";
import { driveImageUrl, listDriveFolder } from "@/lib/googleDrive";

const BOOKS_FOLDER = "1mp7-HM3jdj_Q0rp4ltW49dUhSIoLbySt";

export default async function BooksPage() {
  const files = (await listDriveFolder(BOOKS_FOLDER))
    .filter(file => file.mimeType.startsWith("image/"))
    .map(file => ({ name:file.name, image:driveImageUrl(file.id) }));

  return (
    <section className="page section-pad library-page">
      <header className="collection-intro">
        <div>
          <h1>Books + Quotes</h1>
          <p>Books, passages, and ideas worth returning to.</p>
        </div>
        <Link href="/library">Back to Library ←</Link>
      </header>
      <LibraryWorld driveBooks={files} />
      <nav className="related-paths" aria-label="Explore next">
        <Link href="/visual-references">Visual References →</Link>
        <Link href="/music">Music →</Link>
      </nav>
    </section>
  );
}
