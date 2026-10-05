import Link from "next/link";
import type { ReactNode } from "react";

type MetaItem = { label:string; value:string };
type FactItem = { title:string; copy:string };
type SectionItem = { eyebrow:string; title:string; copy:string };

type Props = {
  eyebrow:string;
  title:string;
  dek:string;
  meta:MetaItem[];
  sections:[SectionItem, SectionItem, SectionItem];
  visual?:ReactNode;
  visualClass?:string;
  facts:FactItem[];
  next?:{ href:string; label:string };
};

export default function CaseStudyTemplate({
  eyebrow,title,dek,meta,sections,visual,visualClass="",facts,next
}:Props){
  return (
    <article className="case-study case-study-template page section-pad">
      <Link className="back-link" href="/work">← Work</Link>

      <header className="case-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="case-dek">{dek}</p>
        <dl className="case-meta">
          {meta.map(item=><div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
      </header>

      <section className="case-body">
        <div className="case-copy">
          <p className="eyebrow">{sections[0].eyebrow}</p>
          <h2>{sections[0].title}</h2>
          <p>{sections[0].copy}</p>
        </div>

        {visual ? <div className={"case-visual "+visualClass}>{visual}</div> : null}

        <div className="case-copy">
          <p className="eyebrow">{sections[1].eyebrow}</p>
          <h2>{sections[1].title}</h2>
          <p>{sections[1].copy}</p>
        </div>

        <div className="case-facts">
          {facts.map(item=><div key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></div>)}
        </div>

        <div className="case-copy case-copy-final">
          <p className="eyebrow">{sections[2].eyebrow}</p>
          <h2>{sections[2].title}</h2>
          <p>{sections[2].copy}</p>
        </div>
      </section>

      <nav className="case-next">
        {next ? <Link href={next.href}>Next case study <span>{next.label} →</span></Link> : <Link href="/work">Back to all work <span>View Work →</span></Link>}
      </nav>
    </article>
  );
}
