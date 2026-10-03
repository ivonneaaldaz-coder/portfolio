import Link from "next/link";
import GenerativeGallery from "@/components/GenerativeGallery";
import { driveImageUrl, driveVideoUrl, listDriveFolder } from "@/lib/googleDrive";

const GENERATIVE_FOLDER = "1ftwuGg6MmnOKXcuet2J8G7x_piUipwh5";

export default async function GenerativeVisualsPage() {
  const files = await listDriveFolder(GENERATIVE_FOLDER);
  const items = files
    .filter(file => file.mimeType.startsWith("image/") || file.mimeType.startsWith("video/"))
    .map(file => ({
      name:file.name,
      type:(file.mimeType.startsWith("video/") ? "video" : "image") as "video"|"image",
      src:file.mimeType.startsWith("video/") ? driveVideoUrl(file.id) : driveImageUrl(file.id),
    }));

  return (
    <section className="gen-page page">
      <header className="travel-intro section-pad">
        <p className="eyebrow">EXPERIMENTS</p>
        <h1>Generative Visuals</h1>
        <p>Image and motion studies made with generative tools — a running visual notebook rather than a finished portfolio.</p>
      </header>
      <GenerativeGallery items={items} />
      <nav className="related-paths section-pad" aria-label="Explore next">
        <Link href="/work#experiments">Experiments →</Link>
        <Link href="/travel">Travel →</Link>
      </nav>
    </section>
  );
}
