import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} — Ivonne Aldaz`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, type: "website", siteName: "Ivonne Aldaz", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/opengraph-image"] },
  };
}
