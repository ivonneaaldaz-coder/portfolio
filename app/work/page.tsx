import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Work", "Selected strategy, research, creative technology, and independent projects.", "/work");

const studies = [
  { title:"Future of Marketing", type:"Audience & editorial strategy", href:"/work/future-of-marketing", detail:"7K → 50K+ subscribers" },
  { title:"Purina — The Role of Video Reviews", type:"Consumer insights", href:"/work/purina-video-reviews", detail:"Research → leadership strategy" },
  { title:"Partner CRM for a Hospitality Network", type:"Product & systems", href:"/work/relationship-operating-system", detail:"Contacts → actionable pipeline" },
  { title:"Gaia Herbs — Concept Validation", type:"Consumer research", href:"/work/gaia-herbs-concept-validation", detail:"Research → product decisions" },
  { title:"Veggies Made Great", type:"Product positioning", href:"/work/veggies-made-great", detail:"Research → product relaunch" },
  { title:"ARM & HAMMER — Placement + Pricing", type:"Retail insights", href:"/work/arm-hammer-retail-strategy", detail:"Research → Walmart launch" },
  { title:"Research-Led Content Engine", type:"Editorial strategy", href:"/work/research-led-content-engine", detail:"One report → year-round campaigns" },
  { title:"Brand + Digital Repositioning", type:"Brand strategy", href:"/work/brand-digital-repositioning", detail:"Positioning → inbound demand" }
];
const projects = [
  {title:"The Lab", category:"Interactive portfolio", href:"/experiments/the-lab"},
  {title:"Ask Eve", category:"Conversational CV", href:"/experiments/ask-eve"},
  {title:"Chatroom", category:"Community experiment", href:"/experiments/chatroom"},
  {title:"Snake", category:"Game & leaderboard", href:"/experiments/snake"},
  {title:"Moodboard Agent", category:"Creative technology", href:"/experiments/moodboard-agent"}
];
export default function WorkPage() {
  return <main className="redesign-work">
    <header className="redesign-work-intro"><p className="redesign-eyebrow">Selected work / 01</p><h1>Work<span className="redesign-period">.</span></h1><p>A collection of research, strategy, systems, and things I've built.</p></header>
    <section className="redesign-work-section"><div className="redesign-section-head"><h2>Case studies</h2><span>Strategy / Research / Growth</span></div>
      <div className="redesign-work-grid">{studies.map((item,i)=><Link className="redesign-work-card" key={item.href} href={item.href}><div className="redesign-card-top"><span>{String(i+1).padStart(2,"0")}</span><span aria-hidden="true">↗</span></div><div><p>{item.type}</p><h3>{item.title}</h3><small>{item.detail}</small></div></Link>)}</div>
    </section>
    <section className="redesign-work-section"><div className="redesign-section-head"><h2>Experiments</h2><span>Products / Prototypes / Play</span></div>
      <div className="redesign-work-grid redesign-experiments">{projects.map((item,i)=><Link className="redesign-work-card" key={item.href} href={item.href}><div className="redesign-card-top"><span>{String(i+1).padStart(2,"0")}</span><span aria-hidden="true">↗</span></div><div><p>{item.category}</p><h3>{item.title}</h3></div></Link>)}</div>
    </section>
  </main>;
}
