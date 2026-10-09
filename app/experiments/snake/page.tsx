import Link from "next/link";
import MoreExperiments from "@/components/MoreExperiments";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Snake", "A retro Snake game with a global leaderboard, living inside the Lab.", "/experiments/snake");
import DemoVideo from "@/components/DemoVideo";

export default function SnakeExperiment() {
  return (
    <article className="experiment-detail page section-pad">
      <Link className="back-link" href="/#experiments">← Experiments</Link>
      <header className="experiment-detail-hero">
        <p className="eyebrow">EXPERIMENT / SNAKE</p>
        <h1>A tiny game with a global leaderboard.</h1>
        <p className="experiment-detail-dek">
          A deliberately unnecessary addition to the Lab: a playable Snake window with scores, levels,
          and a leaderboard shared across visitors.
        </p>
        <a className="experiment-launch" href="https://lab.ivonnealdaz.com/#snake" target="_blank" rel="noreferrer">
          Play Snake ↗︎
        </a>
      </header>

      <section className="experiment-demo">
        <DemoVideo src="/experiments/demos/snake.mp4" poster="/experiments/demos/snake.webp" label="Snake gameplay" square />
      </section>
      <section className="experiment-detail-grid">
        <div><p className="eyebrow">THE IDEA</p><p>Put a real game inside the portfolio — not as a demo or mockup, but something visitors can actually play while they’re exploring the Lab.</p></div>
        <div><p className="eyebrow">THE FORMAT</p><p>Classic Snake rebuilt as a desktop app with levels, scoring, sound, and a global leaderboard shared across visitors.</p></div>
        <div><p className="eyebrow">WHAT I WAS TESTING</p><p>How far I could push the Lab beyond static portfolio content, including persistent shared data, game state, and a small interaction people might come back to beat.</p></div>
      </section>

      <MoreExperiments current="snake" />
    </article>
  );
}
