import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About", "Meet Ivonne Aldaz: strategist, artist, builder, and educator.", "/about");
export const revalidate = 3600;

import Link from "next/link";
import { getGitHubContributions } from "@/lib/githubContributions";
import { driveImageUrl } from "@/lib/googleDrive";

const experience = [
  { role: "Founder", company: "Whitespace", dates: "2018 — Present" },
  { role: "Director, Brand Insights", company: "TrueLoyal (formerly TINT)", dates: "2023 — 2025" },
  { role: "Senior Marketing Manager", company: "TINT", dates: "2022 — 2023" },
];

const earlierExperience = [
  { role: "Marketing Manager", company: "TINT", dates: "2020 — 2022" },
  { role: "Vice President of Marketing", company: "Patel Gaines PLLC", dates: "2015 — 2018" },
];

const areasOfPractice = [
  { title: "Strategy & Research", items: ["Brand strategy", "Positioning", "Consumer insights", "Behavioral research", "Market intelligence"] },
  { title: "Design & Experience", items: ["Product design", "UI/UX design", "Graphic design", "Interaction design", "Information architecture"] },
  { title: "Creative & Editorial", items: ["Creative direction", "Art direction", "Campaign development", "Visual storytelling", "Content strategy"] },
  { title: "Technology & Systems", items: ["Creative technology", "AI prototyping", "Digital product development", "Automation", "Systems design"] },
];

const sideQuests = [
  "San Antonio Arts Commission — Centro de Artes Committee Member",
  "University of the Incarnate Word — Startup Challenge Mentor",
  "Alliance Française de San Antonio — Marketing Committee",
  "San Antonio Art League Museum — Docent",
  "Witte Museum — Docent",
  "Yoga + Meditation Instructor",
];

const visibleSideQuests = sideQuests.slice(0,3);
const moreSideQuests = sideQuests.slice(3);

const exhibitions = [
  { title:"NG Art Residency, Provence", meta:"Artist residency", year:"2024" },
  { title:"Casa d'Arte, Lake Como", meta:"Artist residency", year:"2025" },
  { title:"Bellagio, Lake Como", meta:"Group exhibition", year:"2025" },
  { title:"UTSA Group Exhibition", meta:"Group exhibition", year:"2026" },
  { title:"Breva Creative", meta:"Group exhibition", year:"2026" },
  { title:"La Roane, France", meta:"Watercolor retreat", year:"2023" },
];

const visibleExhibitions = exhibitions.slice(0,3);
const moreExhibitions = exhibitions.slice(3);


const brands = [
  "Hero Cosmetics","Nestlé","CVS Health","Batiste","Purina","ARM & HAMMER","Gerber","Nescafe","Stouffer's","Sir Kensington's (Unilever)",
  "Kellanova","Clio Snacks","First Response","Gaia Herbs","H-E-B","Maggi Noodles","Maison Perrier","Pacific Coast Producers",
  "TrueLoyal (formerly TINT)","Veggies Made Great","Flexitol","Fur Buddies","viemaa",
];

const visibleBrands = brands.slice(0,10);

function buildGitHubCalendar(days: { date:string; level:number; count:number }[]) {
  const cutoff = new Date(Date.now() - 182*864e5).toISOString().slice(0,10);
  const sorted = [...days].filter(d => d.date >= cutoff).sort((a,b) => a.date.localeCompare(b.date));
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

export default async function AboutPage() {
  const github=await getGitHubContributions();
  const githubCalendar=buildGitHubCalendar(github?.days||[]);

  return (
    <section id="about-top" className="page about-editorial"><style>{`@media(max-width:600px){.about-editorial .about-github-panel{padding:22px 8px!important}.about-editorial .about-github-calendar{overflow:hidden!important}.about-editorial .about-github-months{min-width:0!important;gap:2px!important}.about-editorial .about-github-body{min-width:0!important;grid-template-columns:24px minmax(0,1fr)!important}.about-editorial .about-github-grid{min-width:0!important;gap:2px!important}.about-editorial .about-github-grid span{min-width:0!important}.about-editorial .about-github-months span{font-size:9px!important}}@media(min-width:601px) and (max-width:900px){.about-editorial .about-editorial-hero{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,36%)!important;align-items:center!important;gap:28px!important}.about-editorial .about-hero-portrait{max-width:100%!important;width:100%!important}.about-editorial .about-hero-portrait img{max-height:360px!important;object-fit:cover!important}.about-editorial .about-hero-intro h1{white-space:normal!important}}`}</style>
      <div className="about-editorial-hero">
        <div className="about-hero-intro"><h1>Strategist, artist, builder</h1><p className="about-editorial-lede">I work across brands, technology, and the arts — creating things that make people think, feel, or see differently.</p></div>
        <figure className="about-hero-portrait"><img src={driveImageUrl("1UJ7HG3gZU2zD5Y_kdHwCXLGjm1llx_Xc")} alt="Portrait of Ivonne Aldaz" /><figcaption><span>San Antonio, Texas</span><span>Often elsewhere</span></figcaption></figure>
      </div>
      <div className="about-editorial-row"><h2>The short version</h2><div><p>I'm interested in why people do what they do, what makes an idea stick, and how to turn something abstract into something real. For more than a decade, I've worked across industries—from growing tech companies to global household brands—turning ideas and insights into brands, strategies, and experiences that connect with people and drive growth.</p><p>My work moves between strategy, research, design, and technology. Sometimes that's a brand. Sometimes it's a product. Sometimes it's an experiment that started with curiosity and got a little out of hand.</p></div></div>
      <section className="about-story-inline"><details className="long-story about-disclosure"><summary><span>The not-so-short version</span><span aria-hidden="true">＋</span></summary><div className="long-story-copy"><p className="long-story-lede">I've never been particularly good at choosing just one thing.</p><p>I grew up on the border, which might explain a few things. Two languages, two cultures, and an early understanding that there's usually more than one way to see the world.</p><p>Somewhere along the way, I built a career in marketing. I became fascinated by why people do what they do, how ideas take hold, and what makes something worth paying attention to.</p><p>Then I started making things that had absolutely nothing to do with my job.</p><p>Paintings. Ceramics. Little corners of the internet. Some experiments were more successful than others. All of them taught me something.</p><p>I like a good spreadsheet as much as a blank canvas. I believe in doing the research, trusting your instincts, and occasionally following an idea simply because you can't stop thinking about it.</p><p>I'm still figuring out what to call all of it.</p><p>For now, I just make things.</p></div></details></section>
      <section className="about-practice" id="practice" aria-labelledby="about-practice-heading">
        <style>{`
          .about-editorial .about-practice{border-top:1px solid var(--line);padding:clamp(65px,7vw,95px) 0 clamp(78px,8vw,115px)}
          .about-editorial .about-practice-heading{display:flex;justify-content:space-between;align-items:baseline;gap:24px;margin:0 0 40px}
          .about-editorial .about-practice-heading h2{font-family:inherit;font-size:clamp(25px,2.35vw,34px);font-weight:400;letter-spacing:-.05em;line-height:1.14;margin:0}
          .about-editorial .about-practice-kicker{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);line-height:1.6;margin:0;text-align:right}
          .about-editorial .about-practice-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(16px,2.6vw,32px);align-items:start}
          .about-editorial .about-practice-item{min-width:0;border-top:1px solid var(--line)}
          .about-editorial .about-practice-item summary{display:flex;align-items:flex-start;justify-content:space-between;gap:7px;cursor:pointer;list-style:none;padding:18px 0 12px;min-height:68px}
          .about-editorial .about-practice-item summary::-webkit-details-marker{display:none}
          .about-editorial .about-practice-item summary::marker{content:""}
          .about-editorial .about-practice-item .practice-label{font-size:clamp(14px,1.42vw,17px);letter-spacing:-.015em;line-height:1.4;font-weight:400;min-width:0}
          .about-editorial .about-practice-item .practice-toggle{color:var(--muted);font-size:19px;font-weight:300;line-height:1.2;flex:none;transition:transform .2s ease}
          .about-editorial .about-practice-item[open] .practice-toggle{transform:rotate(45deg)}
          .about-editorial .about-practice-item ul{list-style:none;padding:6px 0 15px;margin:0}
          .about-editorial .about-practice-item li{font-size:13px;line-height:1.5;color:var(--muted);margin:0 0 11px}
          .about-editorial .about-practice-item summary:focus-visible{outline:2px solid currentColor;outline-offset:4px}
          @media(hover:hover){.about-editorial .about-practice-item summary:hover .practice-label{opacity:.72}}
          @media(min-width:681px) and (max-width:900px){.about-editorial .about-practice-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 36px}}
          @media(max-width:900px){.about-editorial .about-practice-heading h2{font-size:clamp(25px,7vw,32px)}}
          @media(max-width:680px){
            .about-editorial .about-practice{padding:64px 0 82px}
            .about-editorial .about-practice-heading{display:block;margin-bottom:24px}
            .about-editorial .about-practice-heading h2{margin-bottom:10px}
            .about-editorial .about-practice-kicker{text-align:left;font-size:10px}
            .about-editorial .about-practice-grid{display:block;border-top:1px solid var(--line)}
            .about-editorial .about-practice-item{border-top:0;border-bottom:1px solid var(--line)}
            .about-editorial .about-practice-item summary{padding:20px 0;min-height:65px;align-items:center}
            .about-editorial .about-practice-item .practice-label{font-size:16px;letter-spacing:-.012em}
            .about-editorial .about-practice-item ul{padding:0 0 24px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px 15px}
            .about-editorial .about-practice-item li{font-size:12px;margin:0}
          }
          @media(max-width:360px){.about-editorial .about-practice-item ul{grid-template-columns:1fr}}
          @media(prefers-reduced-motion:reduce){.about-editorial .about-practice-item .practice-toggle{transition:none}}
        `}</style>
        <div className="about-practice-heading">
          <h2 id="about-practice-heading">Areas of Practice</h2>
          <p className="about-practice-kicker">A multidisciplinary approach</p>
        </div>
        <div className="about-practice-grid">
          {areasOfPractice.map((area) => <details className="about-practice-item" key={area.title}>
            <summary><span className="practice-label">{area.title}</span><span className="practice-toggle" aria-hidden="true">+</span></summary>
            <ul>{area.items.map(item => <li key={item}>{item}</li>)}</ul>
          </details>)}
        </div>
      </section>
      <div className="about-editorial-row"><h2>Selected experience</h2><div className="about-editorial-list">{[{title:"Founder",sub:"Whitespace",date:"2018 — Present"},{title:"Director, Brand Insights",sub:"TrueLoyal (formerly TINT)",date:"2023 — 2025"},{title:"Senior Marketing Manager",sub:"TINT (acquired)",date:"2020 — 2023"},{title:"VP of Marketing",sub:"Patel Gaines",date:"2015 — 2018"}].map(x=><div className="about-editorial-item" key={x.title}><div><h3>{x.title}</h3>{x.sub ? <small>{x.sub}</small> : null}</div><span>{x.date}</span></div>)}</div></div>
      <section className="about-editorial-feature"><style>{`.about-editorial-feature .about-editorial-cards>.building-card{min-height:245px;border:1px solid var(--line);padding:30px 25px;display:flex;flex-direction:column;justify-content:flex-start;gap:24px}.about-editorial-feature .about-editorial-cards>a,.about-editorial-feature .about-editorial-cards>.building-card{display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:stretch!important;gap:22px!important}.about-editorial-feature .about-editorial-cards>a h3,.about-editorial-feature .about-editorial-cards>a p,.about-editorial-feature .about-editorial-cards>.building-card h3,.about-editorial-feature .about-editorial-cards>.building-card p{margin:0!important}.about-editorial-feature .about-editorial-cards>.building-card:nth-child(odd){background:rgba(128,128,128,.07)}.about-editorial-feature .about-editorial-more{display:flex;width:max-content;margin-left:auto;align-items:center;gap:8px;margin-top:28px;padding-bottom:7px;border-bottom:1px solid var(--line);font-size:13px;font-weight:500;text-decoration:none}.about-editorial-feature .about-editorial-more:hover{border-color:currentColor}@media(max-width:600px){.about-editorial-feature .about-editorial-cards>.building-card{min-height:200px}.about-editorial-feature .about-editorial-more{margin-top:24px}}`}</style><h2>Things I'm building</h2><div className="about-editorial-cards"><a href="https://bywhitespace.com"><h3>Whitespace</h3><p>Brand strategy, consumer insight, and creative direction for leading brands.</p></a><a href="https://www.instagram.com/makespace______/"><h3>Make Space</h3><p>Creative gatherings and hands-on experiences, made with friends.</p></a><div className="building-card"><h3>Good World Living</h3><p>Exploring art, travel, and intentional living through places, people, and thoughtfully made things.</p></div></div><Link className="about-editorial-more" href="/work#selected-work">Explore more projects ↗</Link></section>
      <div className="about-editorial-row"><h2>Teaching</h2><div className="about-editorial-list"><div className="about-editorial-item"><div><h3>St. Mary's University</h3><small>Adjunct Professor · Principles of Marketing</small></div><span>Spring 2027</span></div><div className="about-editorial-item"><div><h3>University of the Incarnate Word</h3><small>Lecturer · Consumer Behavior + International Entrepreneurship</small></div><span>Spring 2027</span></div></div></div>
      <div className="about-editorial-row"><h2>Education</h2><div className="about-editorial-list"><div className="about-editorial-item"><div><h3>Master of Business Administration</h3><small>St. Mary's University</small></div></div><div className="about-editorial-item"><div><h3>Master of International Business &amp; Economics</h3><small>Hochschule Schmalkalden · In progress</small></div></div></div></div>
      <div className="about-editorial-row"><h2>Beyond work</h2><div><p>I volunteer with local arts and cultural organizations, teach yoga, and spend as much time as I can making things with my hands.</p><Link className="about-editorial-text-link" href="/art">See the art →</Link></div></div>
      <section className="about-editorial-feature about-editorial-kind"><h2>Kind words</h2><div className="about-editorial-quotes"><figure><blockquote>“A rare find. Deeply data-driven, deeply human.”</blockquote><figcaption>— CEO, TrueLoyal</figcaption></figure><figure><blockquote>“Everyone keeps saying what a great job you're doing and how happy the clients are.”</blockquote><figcaption>— CMO, TrueLoyal</figcaption></figure><figure><blockquote>“Why are we even talking about it? Just hire her.”</blockquote><figcaption>— VP of Sales, TINT</figcaption></figure></div></section>
      <section className="about-editorial-feature about-editorial-building"><div className="about-editorial-building-head"><div><h2>Always making something</h2></div><div className="about-github-stats">{github?.total ? <strong>{github.total.toLocaleString()} contributions</strong> : null}<a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer">View GitHub ↗</a></div></div><div className="about-github-panel" style={{width:"100%",maxWidth:"100%",minWidth:0,overflow:"hidden"}}><div className="about-github-calendar" style={{display:"block",width:"100%",maxWidth:"100%",minWidth:0,overflowX:"hidden",overflowY:"hidden"}} aria-label="GitHub contribution activity"><div className="about-github-months" aria-hidden="true" style={{minWidth:0,gridTemplateColumns:`repeat(${githubCalendar.weeks.length},minmax(0,1fr))`}}>{githubCalendar.months.map((m,i)=><span key={m.label+i} style={{gridColumn:`${m.start+1} / span 4`}}>{m.label}</span>)}</div><div className="about-github-body" style={{minWidth:0}}><div className="about-github-days" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div><div className="about-github-grid" style={{gridTemplateColumns:`repeat(${githubCalendar.weeks.length},minmax(0,1fr))`}}>{githubCalendar.weeks.flatMap((week,i)=>week.map((day,j)=><span className={`level-${day.level}`} key={day.date} title={`${day.count} contributions on ${day.date}`} style={{gridColumn:i+1,gridRow:j+1}} />))}</div></div><div className="about-github-legend"><span>Less</span>{[0,1,2,3,4].map(n=><i className={`level-${n}`} key={n}/>)}<span>More</span></div></div></div></section>

    </section>
  );
}
