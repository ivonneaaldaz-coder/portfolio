import Link from "next/link";
import ExperimentLoop from "@/components/ExperimentLoop";

type ExperimentKey = "the-lab" | "ask-eve" | "chatroom" | "snake" | "moodboard-agent";

const experiments = [
  { key:"the-lab" as ExperimentKey, title:"The Lab", meta:"RETRO WINDOWS", href:"/experiments/the-lab", loop:"lab" },
  { key:"ask-eve" as ExperimentKey, title:"Ask Eve", meta:"CONVERSATIONAL CV", href:"/experiments/ask-eve", loop:"eve" },
  { key:"chatroom" as ExperimentKey, title:"Chatroom", meta:"PUBLIC CHAT", href:"/experiments/chatroom", loop:"chat" },
  { key:"snake" as ExperimentKey, title:"Snake", meta:"GLOBAL LEADERBOARD", href:"/experiments/snake", loop:"snake" },
  { key:"moodboard-agent" as ExperimentKey, title:"Moodboard", meta:"PINTEREST → CAROUSEL", href:"/experiments/moodboard-agent", loop:null },
];

export default function MoreExperiments({ current }: { current: ExperimentKey }) {
  const items = experiments.filter(item => item.key !== current).slice(0,3);

  return (
    <section className="experiment-more">
      <div className="section-heading">
        <h2 className="section-title small-title">More experiments</h2>
      </div>

      <div className="experiment-more-grid">
        {items.map(item => (
          <Link href={item.href} className="experiment-more-card" key={item.key}>
            <div className="experiment-more-visual">
              {item.loop ? (
                <ExperimentLoop name={item.loop} label={`${item.title} preview`} />
              ) : (
                <div className="moodboard-card-visual" aria-label="Moodboard preview">
                  <div className="moodboard-card-chrome">
                    <span>moodboard.</span>
                    <span>visual editor</span>
                  </div>
                  <div className="moodboard-card-stage">
                    <div className="moodboard-card-copy">
                      <small>VISUAL EDITOR / 01</small>
                      <strong>Saved inspiration,<br/>ready to post.</strong>
                    </div>
                    <div className="moodboard-card-carousel"><span/><span/><span/></div>
                  </div>
                </div>
              )}
            </div>
            <div className="experiment-more-copy">
              <span>{item.meta}</span>
              <h3>{item.title} <span aria-hidden="true">→</span></h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
