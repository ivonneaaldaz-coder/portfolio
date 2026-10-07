import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "The Lab",
  "An alternate portfolio built like a retro operating system — part playground, part interface experiment.",
  "/experiments/the-lab"
);

const labExperiments = [
  {
    title:"Ask Eve",
    meta:"CONVERSATIONAL CV",
    copy:"A portfolio assistant grounded in my work, projects, writing, and selected context.",
    href:"/experiments/ask-eve",
    mark:"EVE.exe",
    video:"/experiments/cards/card-eve.mp4",
    poster:"/experiments/cards/card-eve.jpg",
    videoClass:"is-eve",
  },
  {
    title:"Chatroom",
    meta:"PUBLIC CHAT / MESSENGER-ERA WEB",
    copy:"A tiny shared room where visitors can show up, talk, and leave a trace.",
    href:"/experiments/chatroom",
    mark:"CHAT.exe",
    video:"/experiments/cards/card-chat.mp4",
    poster:"/experiments/cards/card-chat.jpg",
  },
  {
    title:"Snake",
    meta:"GAME + LEADERBOARD",
    copy:"A deliberately unnecessary retro game with scoring, levels, and a shared leaderboard.",
    href:"/experiments/snake",
    mark:"SNAKE.exe",
    video:"/experiments/cards/card-snake.mp4",
    poster:"/experiments/cards/card-snake.jpg",
  },
];

export default function LabExperiment() {
  return (
    <article className="experiment-detail lab-detail page section-pad">
      <Link className="back-link" href="/overview">← Overview</Link>

      <header className="experiment-detail-hero lab-detail-hero">
        <div>
          <p className="eyebrow">THE LAB / RETRO WINDOWS-INSPIRED PORTFOLIO</p>
          <h1>An alternate portfolio built like an operating system.</h1>
          <p className="experiment-detail-dek">
            Most portfolios are designed to be browsed. I wanted one that could be explored — draggable windows,
            small tools, games, conversations, music, notes, and a few things that probably did not need to exist.
          </p>
          <a className="experiment-launch" href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">
            Launch The Lab ↗︎
          </a>
        </div>

        <div className="lab-detail-screen" aria-hidden="true">
          <div className="lab-detail-menubar"><span>IVONNE_OS</span><span>LAB.exe</span></div>
          <div className="lab-detail-desktop">
            <span className="lab-detail-icon">ASK_EVE</span>
            <span className="lab-detail-icon">MUSIC</span>
            <span className="lab-detail-icon">NOTES</span>
            <div className="lab-detail-window">
              <div className="lab-detail-windowbar"><span>WELCOME.txt</span><span>— □ ×</span></div>
              <p>A more interesting internet.</p>
              <small>portfolio / playground / archive</small>
            </div>
          </div>
        </div>
      </header>

      <div className="experiment-demo-video">
        <video
          src="/experiments/lab-demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label="The Lab portfolio operating system demo"
        />
      </div>

      <section className="experiment-detail-grid lab-detail-notes">
        <div><p className="eyebrow">WHY I BUILT IT</p><p>To make a portfolio feel less like a brochure and more like a place you can wander through.</p></div>
        <div><p className="eyebrow">WHAT I WAS TESTING</p><p>Interface nostalgia, playful navigation, conversational UX, public interaction, and personality in digital products.</p></div>
        <div><p className="eyebrow">THE SYSTEM</p><p>A collection of small experiences that share one visual language and live inside the same desktop world.</p></div>
      </section>

      <section className="lab-explore">
        <div className="section-heading">
          <div>
            <p className="eyebrow">INSIDE THE LAB</p>
            <h2 className="section-title small-title">Explore the experiments.</h2>
          </div>
        </div>

        <div className="lab-experiment-grid">
          {labExperiments.map((item,index)=>(
            <Link href={item.href} className="lab-experiment-card" key={item.title}>
              <div className="lab-experiment-visual overview-experiment-video-tile">
                <span>{item.mark}</span>
                <video
                  className={"overview-experiment-video " + (item.videoClass || "")}
                  src={item.video}
                  poster={item.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={item.title + " preview"}
                />
              </div>
              <div className="lab-experiment-copy">
                <span>{item.meta}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <strong>View experiment →</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="lab-detail-close">
        <p>The Lab itself is the container. These are a few of the things living inside it.</p>
        <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">Open the full Lab ↗︎</a>
      </section>
    </article>
  );
}
