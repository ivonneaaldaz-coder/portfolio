import Link from "next/link";
import MoreExperiments from "@/components/MoreExperiments";
import DemoVideo from "@/components/DemoVideo";
import ExperimentLoop from "@/components/ExperimentLoop";
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
    loop:"eve",
  },
  {
    title:"Chatroom",
    meta:"PUBLIC CHAT",
    copy:"A tiny shared room where visitors can show up, talk, and leave a trace.",
    href:"/experiments/chatroom",
    loop:"chat",
  },
  {
    title:"Snake",
    meta:"GLOBAL LEADERBOARD",
    copy:"A deliberately unnecessary retro game with scoring, levels, and a shared leaderboard.",
    href:"/experiments/snake",
    loop:"snake",
  },
];

export default function LabExperiment() {
  return (
    <article className="experiment-detail lab-detail page section-pad">
      <Link className="back-link" href="/#experiments">← Experiments</Link>

      <header className="experiment-detail-hero">
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
      </header>

      <section className="experiment-demo">
        <DemoVideo src="/experiments/demos/the-lab.mp4" poster="/experiments/demos/the-lab.webp" label="The Lab product demo" />
      </section>

      <section className="experiment-detail-grid lab-detail-notes">
        <div><p className="eyebrow">WHY I BUILT IT</p><p>I wanted a second portfolio for the parts of my work that do not fit neatly into case studies — tools, games, conversations, music, notes, and small internet experiments.</p></div>
        <div><p className="eyebrow">WHAT I WAS TESTING</p><p>Whether familiar desktop behaviors — windows, folders, apps, shortcuts — could make a portfolio more interactive without making it harder to use.</p></div>
        <div><p className="eyebrow">THE SYSTEM</p><p>One retro desktop connects Ask Eve, the public Chatroom, Snake, Music, Notes, Archive, and other experiments as individual apps inside the same interface.</p></div>
      </section>

      <section className="lab-explore">
        <div className="section-heading">
          <div>
            <p className="eyebrow">INSIDE THE LAB</p>
            <h2 className="section-title small-title">Explore the experiments.</h2>
          </div>
        </div>

        <div className="lab-experiment-grid">
          {labExperiments.map(item=>(
            <Link href={item.href} className="lab-experiment-card" key={item.title}>
              <div className="lab-experiment-visual experiment-loop-visual">
                <ExperimentLoop name={item.loop} label={`${item.title} preview`} />
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

      <MoreExperiments current="the-lab" />
    </article>
  );
}
