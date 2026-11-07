import { permanentRedirect } from "next/navigation";

// The standalone Lab now replaces the former case study.
export default function LabExperiment() {
  permanentRedirect("https://lab.ivonnealdaz.com");
}
