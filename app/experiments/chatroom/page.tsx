import Link from "next/link";
import DemoVideo from "@/components/DemoVideo";

export default function ChatroomExperiment() {
  return (
    <article className="experiment-detail page section-pad">
      <Link className="back-link" href="/overview#experiments">← Experiments</Link>
      <header className="experiment-detail-hero">
        <p className="eyebrow">PUBLIC CHAT / MESSENGER-ERA WEB</p>
        <h1>A tiny public room on the internet.</h1>
        <p className="experiment-detail-dek">
          A lightweight shared chat space built as part of the Lab — less social network,
          more digital room people can wander into.
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
          <p>Make the portfolio feel inhabited — somewhere visitors can leave a trace instead of only consuming pages.</p>
        </div>
        <div>
          <p className="eyebrow">THE FORMAT</p>
          <p>A simple public chat experience that also lives inside the Lab as CHATROOM.exe.</p>
        </div>
        <div>
          <p className="eyebrow">WHY IT EXISTS</p>
          <p>Because the internet is more interesting when a website can behave like a place, not just a brochure.</p>
        </div>
      </section>
    </article>
  );
}
