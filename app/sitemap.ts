import type { MetadataRoute } from "next";

const SITE = "https://ivonnealdaz.com";
const paths = [
  "/", "/about", "/art", "/travel", "/books", "/music", "/visual-references",
  "/experiments/the-lab", "/experiments/ask-eve", "/experiments/chatroom", "/experiments/snake",
  "/work/future-of-marketing", "/work/purina-video-reviews", "/work/relationship-operating-system",
  "/work/research-led-content-engine", "/work/brand-digital-repositioning", "/work/veggies-made-great",
  "/work/gaia-herbs-concept-validation", "/work/arm-hammer-retail-strategy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: SITE + p, changeFrequency: "monthly", priority: p === "/" ? 1 : p.startsWith("/work") ? 0.8 : 0.6 }));
}
