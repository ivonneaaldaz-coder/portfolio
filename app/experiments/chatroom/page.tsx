import Link from "next/link";

export default function ChatroomExperiment() {
  return (
    <article className="experiment-detail page section-pad">
      <Link className="back-link" href="/overview">← Overview</Link>
      <header className="experiment-detail-hero">
        <p className="eyebrow">PUBLIC CHAT / AOL-ERA WEB</p>
        <h1>A tiny public room on the internet.</h1>
        <p className="experiment-detail-dek">
          A lightweight shared chat space built as part of the Lab — less social network,
          more digital room people can wander into.
        </p>
        <a className="experiment-launch" href="https://chat.ivonnealdaz.com" target="_blank" rel="noreferrer">
          Enter the Chatroom ↗︎
        </a>
      </header>

      <div className="experiment-demo-video">
        <video
          src="/experiments/chatroom-demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label="Chatroom experiment demo"
        />
      </div>

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
