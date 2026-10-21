import { pageMetadata } from "@/lib/metadata";
import SelectedWorkExplorer from "@/components/SelectedWorkExplorer";
import { getGitHubContributions } from "@/lib/githubContributions";
export const metadata=pageMetadata("Work","Projects, experiments, research, and case studies.","/work");
const writing = [
  { title:"When the Universe Hands You a Yes", source:"Good World Living · 2025", href:"https://www.goodworldliving.com/articles/when-the-universe-hands-you-a-yes" },
  { title:"From Brand to Atmosphere: Designing Experiences That Feel Like Worlds", source:"Whitespace · 2026", href:"https://www.bywhitespace.com/blog/designing-experiences-that-feel-like-worlds" },
  { title:"How an Art Residency in Provence Transformed My Creative Path", source:"Good World Living · 2024", href:"https://www.goodworldliving.com/articles/how-an-art-residency-in-provence-transformed-my-creative-path" },
];

const moreWriting = [
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
  const body = <><span>{item.year}</span><div><p>{item.org}</p><h3>{item.title}</h3></div></>;
  return item.href
    ? <a className="overview-press-row" href={item.href} target="_blank" rel="noreferrer">{body}</a>
    : <div className="overview-press-row">{body}</div>;
}


function buildGitHubCalendar(days: { date:string; level:number; count:number }[]) {
  const sorted = [...days].sort((a,b) => a.date.localeCompare(b.date));
  if (!sorted.length) {
    return {
      weeks: [] as { date:string; level:number; count:number }[][],
      months: [] as { label:string; start:number }[],
    };
  }

  const start = new Date(`${sorted[0].date}T12:00:00Z`);
  const startDay = start.getUTCDay();
  start.setUTCDate(start.getUTCDate() - startDay);

  const end = new Date(`${sorted[sorted.length - 1].date}T12:00:00Z`);
  const endDay = end.getUTCDay();
  end.setUTCDate(end.getUTCDate() + (6 - endDay));

  const byDate = new Map(sorted.map(day => [day.date, day]));
  const weeks: { date:string; level:number; count:number }[][] = [];

  for (let cursor = new Date(start), weekIndex = 0; cursor <= end; weekIndex++) {
    const week: { date:string; level:number; count:number }[] = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const date = cursor.toISOString().slice(0,10);
      week.push(byDate.get(date) || { date, level:0, count:0 });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push(week);
  }

  const months: { label:string; start:number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, index) => {
    const anchor = new Date(`${week[0].date}T12:00:00Z`);
    const month = anchor.getUTCMonth();
    if (month !== lastMonth) {
      months.push({
        label: anchor.toLocaleString("en-US", { month:"short", timeZone:"UTC" }),
        start:index,
      });
      lastMonth = month;
    }
  });

  return { weeks, months };
}

export default async function WorkPage(){
 const github=await getGitHubContributions();
 const githubCalendar=buildGitHubCalendar(github?.days||[]);
 return <main className="page section-pad work-hybrid-page"><header className="work-hybrid-intro"><h1>A little of everything.</h1><p>Selected projects, curious experiments, and ideas brought to life.</p></header><SelectedWorkExplorer />
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

      <section className="overview-writing-section section-pad" id="writing">
        <div className="overview-writing">
          <div className="overview-writing-head"><h2 className="section-title small-title">Writing</h2></div>
          {writing.map(item => <WritingRow item={item} key={item.title} />)}
          <details className="overview-inline-expand">
            <summary><span>More writing</span><span aria-hidden="true">＋</span></summary>
            <div className="overview-expanded-list">{moreWriting.map(item => <WritingRow item={item} key={item.title} />)}</div>
          </details>
        </div>
      </section>
      <section className="about-editorial-feature about-editorial-building"><div className="about-editorial-building-head"><div><h2>Always making something.</h2><p>A running record of the tools, products, and experiments I'm building.</p></div><div>{github?.total ? <strong>{github.total.toLocaleString()} contributions</strong> : null}<a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer">View GitHub ↗</a></div></div><div className="about-github-panel"><div className="about-github-calendar" aria-label="GitHub contribution activity"><div className="about-github-months" aria-hidden="true">{githubCalendar.months.map((m,i)=><span key={m.label+i} style={{gridColumn:`${m.start+1} / span 4`}}>{m.label}</span>)}</div><div className="about-github-body"><div className="about-github-days" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div><div className="about-github-grid">{githubCalendar.weeks.flatMap((week,i)=>week.map((day,j)=><span className={`level-${day.level}`} key={day.date} title={`${day.count} contributions on ${day.date}`} style={{gridColumn:i+1,gridRow:j+1}} />))}</div></div><div className="about-github-legend"><span>Less</span>{[0,1,2,3,4].map(n=><i className={`level-${n}`} key={n}/>)}<span>More</span></div></div></div></section>

 </main>;
}
