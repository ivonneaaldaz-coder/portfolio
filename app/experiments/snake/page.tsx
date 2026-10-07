import Link from "next/link";
import DemoVideo from "@/components/DemoVideo";

export default function SnakeExperiment() {
  return (
    <article className="experiment-detail page section-pad">
      <Link className="back-link" href="/overview">← Overview</Link>
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
        <div><p className="eyebrow">THE IDEA</p><p>Give the portfolio something people can actually play instead of only scroll through.</p></div>
        <div><p className="eyebrow">THE FORMAT</p><p>A retro desktop game living inside the Lab, complete with scoring and a shared leaderboard.</p></div>
        <div><p className="eyebrow">WHY IT EXISTS</p><p>Because useful is good. Memorable is better.</p></div>
      </section>
    </article>
  );
}
