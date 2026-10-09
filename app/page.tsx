import EditorialHome from "@/components/EditorialHome";
import { getPinterestPins } from "@/lib/pinterest";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata("Ideas into systems. Life into work.", "The independent practice of Ivonne Aldaz: strategy, technology, art, and a world of references.", "/"),
  title: { absolute: "Ivonne Aldaz — Ideas into systems. Life into work." },
  robots: { index: false, follow: false },
};

// Public saves observed on Ivonne's existing Pinterest profile widget.
// Keep the collection visible when the API is unavailable in a preview environment.
const referenceFallback = [
  { id: "5718254f", imageUrl: "https://i.pinimg.com/236x/57/18/25/5718254f08952453e90b52690131660d.jpg", altText: "Ceramic vessel saved to my Pinterest references" },
  { id: "fd972f29", imageUrl: "https://i.pinimg.com/236x/fd/97/2f/fd972f293fd1fb896ec793e17c8134d0.jpg", altText: "Artwork and paper textures saved to my Pinterest references" },
  { id: "74799840", imageUrl: "https://i.pinimg.com/236x/74/79/98/74799840553fc6ac6c1f9964d2277ab9.jpg", altText: "An image from my Pinterest reference collection" },
  { id: "7c4b9f12", imageUrl: "https://i.pinimg.com/236x/7c/4b/9f/7c4b9f12a0a56c107f545042c36e09ad.jpg", altText: "A detail saved to my Pinterest reference collection" },
];

export default async function HomePage() {
  const pins = await getPinterestPins(4);
  return <EditorialHome pins={pins.length >= 4 ? pins : referenceFallback} />;
}
