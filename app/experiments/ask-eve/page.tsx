import { permanentRedirect } from "next/navigation";

// Legacy case study retired in favor of the standalone product.
export default function AskEveExperiment() {
  permanentRedirect("https://ask.ivonnealdaz.com");
}
