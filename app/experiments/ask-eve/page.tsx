import Link from "next/link";
import DemoVideo from "@/components/DemoVideo";

export default function AskEveExperiment() {
  return (
    <article className="experiment-detail page section-pad">
      <Link className="back-link" href="/overview">← Overview</Link>
      <header className="experiment-detail-hero">
        <p className="eyebrow">EXPERIMENT / ASK EVE</p>
        <h1>A conversational CV.</h1>
        <p className="experiment-detail-dek">
          Instead of scrolling through a résumé, visitors can ask questions about my work,
          projects, background, art, and what I’m building.
        </p>
        <a className="experiment-launch" href="https://lab.ivonnealdaz.com/#ask-eve" target="_blank" rel="noreferrer">
          Launch Ask Eve ↗︎
        </a>
      </header>

      <section className="experiment-demo">
        <DemoVideo src="/experiments/demos/ask-eve.mp4" poster="/experiments/demos/ask-eve.webp" label="Ask Eve product walkthrough" />
      </section>

      <section className="experiment-detail-grid">
        <div><p className="eyebrow">WHY I BUILT IT</p><p>Résumés flatten people. I wanted a way to make the same information searchable, conversational, and a little more human.</p></div>
        <div><p className="eyebrow">WHAT IT DOES</p><p>Answers questions grounded in my CV, projects, writing, and selected context inside the Lab.</p></div>
        <div><p className="eyebrow">FORMAT</p><p>A small AI interface living inside a retro desktop environment rather than a standalone chatbot page.</p></div>
      </section>
    </article>
  );
}
