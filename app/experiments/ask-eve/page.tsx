import Link from "next/link";
import MoreExperiments from "@/components/MoreExperiments";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Ask Eve", "A conversational CV: ask questions about Ivonne’s work, projects, art, and what she’s building.", "/experiments/ask-eve");
import DemoVideo from "@/components/DemoVideo";

export default function AskEveExperiment() {
  return (
    <article className="experiment-detail page section-pad">
      <Link className="back-link" href="/#experiments">← Experiments</Link>
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
        <div><p className="eyebrow">THE IDEA</p><p>Turn a résumé into something a hiring manager can query — ask about specific roles, projects, industries, skills, or how different parts of my background connect.</p></div>
        <div><p className="eyebrow">HOW IT WORKS</p><p>Ask Eve answers from a defined set of source material: my résumé, selected projects, writing, and portfolio context, with guardrails that keep it focused on my work.</p></div>
        <div><p className="eyebrow">THE FORMAT</p><p>A conversational assistant built into the Lab as its own desktop app, so it feels like part of the portfolio rather than a chatbot bolted onto it.</p></div>
      </section>

      <MoreExperiments current="ask-eve" />
    </article>
  );
}
