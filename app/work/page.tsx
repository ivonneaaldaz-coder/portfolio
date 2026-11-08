import { pageMetadata } from "@/lib/metadata";
import SelectedWorkExplorer from "@/components/SelectedWorkExplorer";
export const metadata=pageMetadata("Work","Projects, experiments, research, and case studies.","/work");
const writing = [
  { title:"The First Time I Felt Free", source:"Good World Living · 2026", href:"https://www.goodworldliving.com/articles/the-first-time-i-felt-free" },
  { title:"From Brand to Atmosphere: Designing Experiences That Feel Like Worlds", source:"Whitespace · 2026", href:"https://www.bywhitespace.com/blog/designing-experiences-that-feel-like-worlds" },
  { title:"How an Art Residency in Provence Transformed My Creative Path", source:"Good World Living · 2024", href:"https://www.goodworldliving.com/articles/how-an-art-residency-in-provence-transformed-my-creative-path" },
];

const moreWriting = [
  { title:"When the Universe Hands You a Yes", source:"Good World Living · 2025", href:"https://www.goodworldliving.com/articles/when-the-universe-hands-you-a-yes" },
  { title:"The Shift Toward Intentional Branding: Designing with Meaning in a Noisy World", source:"Whitespace · 2025", href:"https://www.bywhitespace.com/blog/intentional-branding-designing-with-meaning-in-a-noisy-world" },
  { title:"Art Retreat in France: Unveiling Creative Wonders in St. Antonin-Noble Val", source:"Good World Living · 2023", href:"https://www.goodworldliving.com/articles/france-art-retreat" },
  { title:"Strategy Without Execution Is Just Expensive Advice", source:"Whitespace · 2026", href:"https://www.bywhitespace.com/blog/strategy-without-execution-expensive-advice" },
];

const pressPreview = [
  { org:"Forbes", title:"Why Retailers Should Utilize TikTok to Grow Their Business", year:"2021" },
  { org:"Adweek", title:"How Micro and Nano Influencers Drive Big Change", year:"2021", href:"https://www.adweek.com/brand-marketing/how-micro-and-nano-influencers-drive-big-change/" },
  { org:"Digiday", title:"In the Metaverse, Brands’ FOMO Is Competing With Consumers’ Burnout", year:"2024", href:"https://digiday.com/marketing/in-the-metaverse-brands-fomo-is-competing-with-consumers-burnout/" },
];

const morePress = [
  { org:"Social Pros Podcast", title:"How to Capture UGC’s Untapped Potential", year:"2022", href:"https://socialpros.libsyn.com/how-to-capture-ugcs-untapped-potential-with-tint" },
  { org:"B2B Better", title:"Writing a Newsletter Worth Reading", year:"2021", href:"https://b2bbite.substack.com/p/writing-a-newsletter-worth-reading" },
];

const talksPreview = [
  { org:"Adweek Social Media Week", title:"The Power of Community-Created Content", year:"2022", href:"https://www.linkedin.com/posts/ivonnealdaz_smw-tintlove-activity-6930008317020819456-GIqE" },
  { org:"San Antonio Startup Week", title:"Future of Marketing Live Podcast — Spurs Director of Content Strategy", year:"2023", href:"https://vimeo.com/876034599" },
  { org:"Hootsuite", title:"State of UGC — Virtual Panel", year:"2023" },
];

const moreTalks = [
  { org:"St. Mary’s University", title:"How to Make the Most of Your MBA", year:"2025" },
];


function WritingRow({item}:{item:typeof writing[number] | typeof moreWriting[number]}) {
  return <a href={item.href} target="_blank" rel="noreferrer" className="overview-writing-row">
    <h4>{item.title}</h4><p>{item.source}</p><span>↗︎</span>
  </a>;
}

function PressRow({item}:{item:{org:string;title:string;year:string;href?:string}}) {
  const body = <><div><h3 className="press-article-title">{item.title}</h3><p className="press-publication">{item.org} · {item.year}</p></div></>;
  return item.href
    ? <a className="overview-press-row" href={item.href} target="_blank" rel="noreferrer">{body}<span className="press-link-arrow" aria-hidden="true">↗</span></a>
    : <div className="overview-press-row overview-press-unlinked">{body}</div>;
}


export default async function WorkPage(){
 return <main className="page section-pad work-hybrid-page"><style>{`.work-hybrid-page .overview-press-row{display:flex!important;justify-content:space-between;align-items:flex-start;gap:20px}.work-hybrid-page .press-link-arrow{flex-shrink:0;font-size:15px;opacity:.65;transition:transform .2s ease,opacity .2s ease}.work-hybrid-page a.overview-press-row:hover .press-link-arrow{transform:translate(2px,-2px);opacity:1}`}</style><SelectedWorkExplorer />
      <section className="overview-press section-pad overview-anchor" id="press">
        <div className="section-heading"><h2 className="section-title small-title">Press + Speaking</h2></div>
        <div className="overview-press-grid">
          <div>
            <p className="eyebrow">SELECTED PRESS</p>
            {pressPreview.map(item => <PressRow item={item} key={item.org+item.title} />)}
          </div>
          <div>
            <p className="eyebrow">SELECTED TALKS</p>
            {talksPreview.map(item => <PressRow item={item} key={item.org+item.title} />)}
          </div>
        </div>
        <details className="overview-inline-expand overview-press-expand">
          <summary><span>More press + speaking</span><span aria-hidden="true">＋</span></summary>
          <div className="overview-press-grid overview-expanded-list">
            <div>{morePress.map(item => <PressRow item={item} key={item.org+item.title} />)}</div>
            <div>{moreTalks.map(item => <PressRow item={item} key={item.org+item.title} />)}</div>
          </div>
        </details>
      </section>

      <section className="overview-writing-section section-pad editorial-writing-section" id="writing">
        <style>{`
          .work-hybrid-page .editorial-writing-section{padding-top:clamp(72px,8vw,128px)}
          .work-hybrid-page .editorial-writing-section .overview-writing{max-width:none}
          .work-hybrid-page .editorial-writing-head{display:flex;align-items:center;justify-content:space-between;gap:32px;padding-bottom:30px;border-bottom:1px solid rgba(240,236,230,.28);margin-bottom:44px}
          .work-hybrid-page .editorial-writing-head .section-title{margin:0}
          .work-hybrid-page .editorial-writing-descriptor{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#b6b3ad;text-align:right;line-height:1.7;margin:0}
          .work-hybrid-page .editorial-featured-essay{display:grid;grid-template-columns:minmax(0, .92fr) minmax(0, 1.4fr);gap:clamp(34px,5.5vw,82px);align-items:center;color:inherit;text-decoration:none;padding-bottom:44px;border-bottom:1px solid rgba(240,236,230,.28)}
          .work-hybrid-page .editorial-featured-image{display:block;aspect-ratio:1.78;overflow:hidden;background:#b8c3cf}
          .work-hybrid-page .editorial-featured-image img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .55s cubic-bezier(.2,.7,.2,1);object-position:center 57%}
          .work-hybrid-page .editorial-featured-essay:hover .editorial-featured-image img{transform:scale(1.035)}
          .work-hybrid-page .editorial-featured-copy{min-width:0;display:flex;flex-direction:column;align-items:flex-start}
          .work-hybrid-page .editorial-featured-label{color:#d6d1c9;font-size:11px;font-weight:600;letter-spacing:.24em;margin:0 0 28px;text-transform:uppercase}
          .work-hybrid-page .editorial-featured-title{font-size:clamp(22px,2.15vw,31px);line-height:1.26;font-weight:400;letter-spacing:-.012em;margin:0 0 18px;max-width:760px}
          .work-hybrid-page .editorial-featured-description{color:#b8b5af;font-size:clamp(15px,1.25vw,19px);line-height:1.6;max-width:570px;margin:0 0 34px}
          .work-hybrid-page .editorial-featured-bottom{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px}
          .work-hybrid-page .editorial-featured-source{margin:0;color:#aaa6a0;font-size:14px}
          .work-hybrid-page .editorial-featured-arrow{display:inline-block;font-size:22px;line-height:1;transition:transform .2s ease}
          .work-hybrid-page .editorial-featured-essay:hover .editorial-featured-arrow{transform:translate(4px,-3px)}
          .work-hybrid-page .editorial-writing-section .overview-writing-row{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(160px,.55fr) 24px;align-items:center;gap:28px;padding:28px 0;border-bottom:1px solid rgba(240,236,230,.24);transition:color .2s ease}
          .work-hybrid-page .editorial-writing-section .overview-writing-row h4{font-size:clamp(14px,1.12vw,17px);font-weight:500;line-height:1.45}
          .work-hybrid-page .editorial-writing-section .overview-writing-row p{color:#aaa6a0;font-size:13px}
          .work-hybrid-page .editorial-writing-section .overview-writing-row span{justify-self:end}
          .work-hybrid-page .editorial-writing-section .overview-inline-expand{margin-top:0}
          .work-hybrid-page .editorial-writing-section .overview-inline-expand summary{padding-top:29px}
          @media(max-width:760px){
            .work-hybrid-page .editorial-writing-section{padding-top:76px}
            .work-hybrid-page .editorial-writing-head{align-items:flex-start;flex-direction:column;gap:14px;padding-bottom:23px;margin-bottom:28px}
            .work-hybrid-page .editorial-writing-descriptor{text-align:left;font-size:10px;letter-spacing:.16em}
            .work-hybrid-page .editorial-featured-essay{grid-template-columns:1fr;gap:25px;padding-bottom:30px}
            .work-hybrid-page .editorial-featured-image{aspect-ratio:1.6}
            .work-hybrid-page .editorial-featured-label{margin-bottom:16px}
            .work-hybrid-page .editorial-featured-description{margin-bottom:22px}
            .work-hybrid-page .editorial-featured-source{font-size:12px}
            .work-hybrid-page .editorial-writing-section .overview-writing-row{grid-template-columns:minmax(0,1fr) 22px;gap:7px 14px;padding:22px 0}
            .work-hybrid-page .editorial-writing-section .overview-writing-row h4{grid-column:1;grid-row:1}
            .work-hybrid-page .editorial-writing-section .overview-writing-row p{grid-column:1;grid-row:2}
            .work-hybrid-page .editorial-writing-section .overview-writing-row span{grid-column:2;grid-row:1 / span 2}
          }
          @media(prefers-reduced-motion:reduce){.work-hybrid-page .editorial-featured-image img,.work-hybrid-page .editorial-featured-arrow{transition:none}}
        `}</style>
        <div className="overview-writing">
          <div className="overview-writing-head editorial-writing-head">
            <h2 className="section-title small-title">Writing</h2>
            <p className="editorial-writing-descriptor">Notes on creativity, strategy, and everything in between.</p>
          </div>
          <a className="editorial-featured-essay" href={writing[0].href} target="_blank" rel="noreferrer" aria-label={`Read ${writing[0].title} (opens in new tab)`}>
            <div className="editorial-featured-image">
              <img src="https://cdn.prod.website-files.com/5fc29a3f3f9d357d704a8951/69e7a1fc0bb973edd788d631_Schmalkalden%20-%20Good%20World%20Living.png" alt="Golden grain field, tree-lined hills and expansive blue sky in Germany at sunset" loading="lazy" />
            </div>
            <div className="editorial-featured-copy">
              <p className="editorial-featured-label">Featured essay</p>
              <h3 className="editorial-featured-title">{writing[0].title}</h3>
              <p className="editorial-featured-description">On finding yourself, losing your way, and building a life that feels like your own.</p>
              <div className="editorial-featured-bottom">
                <p className="editorial-featured-source">{writing[0].source}</p>
                <span className="editorial-featured-arrow" aria-hidden="true">↗</span>
              </div>
            </div>
          </a>
          {writing.slice(1).map(item => <WritingRow item={item} key={item.title} />)}
          <details className="overview-inline-expand">
            <summary><span>More writing</span><span aria-hidden="true">＋</span></summary>
            <div className="overview-expanded-list">{moreWriting.map(item => <WritingRow item={item} key={item.title} />)}</div>
          </details>
        </div>
      </section>


 </main>;
}
