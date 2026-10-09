import Link from "next/link";
import MoreExperiments from "@/components/MoreExperiments";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Chatroom", "A tiny public chat room inspired by AOL, Yahoo, and MSN — part of the Lab.", "/experiments/chatroom");
import DemoVideo from "@/components/DemoVideo";

export default function ChatroomExperiment() {
  return (
    <article className="experiment-detail page section-pad">
      <Link className="back-link" href="/#experiments">← Experiments</Link>
      <header className="experiment-detail-hero">
        <p className="eyebrow">PUBLIC CHAT / MESSENGER-ERA WEB</p>
        <h1>A public chatroom built into the portfolio.</h1>
        <p className="experiment-detail-dek">
          Visitors can claim a username, chat in real time, and leave messages behind — a shared layer of the Lab that changes depending on who shows up.
        </p>
        <a className="experiment-launch" href="https://chat.ivonnealdaz.com" target="_blank" rel="noreferrer">
          Enter the Chatroom ↗︎
        </a>
      </header>

      <section className="experiment-demo">
        <DemoVideo src="/experiments/demos/chatroom.mp4" poster="/experiments/demos/chatroom.webp" label="Chatroom product demo" />
      </section>

      <section className="experiment-detail-grid">
        <div>
          <p className="eyebrow">THE IDEA</p>
          <p>Build a real-time public chatroom into the portfolio so visitors can claim a username, talk to whoever is there, and leave messages behind.</p>
        </div>
        <div>
          <p className="eyebrow">THE FORMAT</p>
          <p>Inspired by AOL, Yahoo, and MSN chatrooms: a lightweight public room with persistent messages that also lives inside the Lab as CHATROOM.exe.</p>
        </div>
        <div>
          <p className="eyebrow">WHY IT EXISTS</p>
          <p>Part guestbook, part chatroom, part nostalgia experiment — a way to turn a portfolio visit into a small social interaction.</p>
        </div>
      </section>

      <MoreExperiments current="chatroom" />
    </article>
  );
}
