import { permanentRedirect } from "next/navigation";

// The live Chatroom replaces the former case study.
export default function ChatroomExperiment() {
  permanentRedirect("https://chat.ivonnealdaz.com");
}
