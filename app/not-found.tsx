import Link from "next/link";

export const metadata = { title: "Page not found — Ivonne Aldaz" };

export default function NotFound() {
  return (
    <section className="page section-pad not-found-page">
      <p className="eyebrow">404</p>
      <h1>This page wandered off.</h1>
      <p className="not-found-copy">It may have moved, or it never existed. Everything worth seeing starts from the overview.</p>
      <div className="not-found-links">
        <Link href="/">Back to the overview →</Link>
        <Link href="/#case-studies">Case studies →</Link>
        <Link href="/#experiments">Experiments →</Link>
      </div>
    </section>
  );
}
