import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About", "Meet Ivonne Aldaz: strategist, artist, builder, and educator.", "/about");

import Link from "next/link";
import { driveImageUrl } from "@/lib/googleDrive";
import { getGitHubContributions } from "@/lib/githubContributions";

const experience = [
  { role: "Founder", company: "Whitespace", dates: "2018 — Present" },
  { role: "Director, Brand Insights", company: "TrueLoyal (formerly TINT)", dates: "2023 — 2025" },
  { role: "Senior Marketing Manager", company: "TINT", dates: "2022 — 2023" },
];

const earlierExperience = [
  { role: "Marketing Manager", company: "TINT", dates: "2020 — 2022" },
  { role: "Vice President of Marketing", company: "Patel Gaines PLLC", dates: "2015 — 2018" },
];

const capabilities = [
  "Brand strategy",
  "Positioning",
  "Consumer insights",
  "Growth strategy",
  "AI + automation",
  "Systems design",
  "Creative direction",
  "Thought leadership",
  "Product strategy",
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

const brands = [
  "Hero Cosmetics","Nestlé","CVS Health","Batiste","Purina","ARM & HAMMER","Gerber","Nescafe","Stouffer's","Sir Kensington's (Unilever)",
  "Kellanova","Clio Snacks","First Response","Gaia Herbs","H-E-B","Maggi Noodles","Maison Perrier","Pacific Coast Producers",
  "TrueLoyal (formerly TINT)","Veggies Made Great","Flexitol","Fur Buddies","viemaa",
];

const visibleBrands = brands.slice(0,10);

export default async function AboutPage() {
  const github = await getGitHubContributions();
  const githubCalendar = buildGitHubCalendar(github?.days || []);
  return (
    <section className="page editorial-about" id="about-top">
      <style>{`
        .editorial-about{--editorial-blue:#3348ec;--editorial-line:rgba(110,117,155,.22);max-width:1100px;margin:0 auto;padding:0 58px 170px;color:var(--ink)}
        .editorial-about .editorial-hero{display:grid;grid-template-columns:minmax(0,1fr) 245px;gap:38px;align-items:start;padding:125px 0 160px}
        .editorial-about .editorial-hero h1{font-family:Georgia,"Times New Roman",serif;font-weight:400;letter-spacing:-.065em;font-size:clamp(54px,5.4vw,78px);line-height:.99;margin:0 0 32px}
        .editorial-about .editorial-hero p{font-size:18px;line-height:1.65;max-width:490px;margin:0 0 17px}
        .editorial-about .editorial-hero small{font-size:12px;opacity:.55}
        .editorial-about .editorial-portrait{width:245px;aspect-ratio:3/4;object-fit:cover;margin-top:12px;filter:grayscale(1)}
        .editorial-about .editorial-row{display:grid;grid-template-columns:36% 1fr;gap:45px;border-top:1px solid var(--editorial-line);padding:90px 0 155px}
        .editorial-about .editorial-row h2,.editorial-about .editorial-full h2{font:400 clamp(30px,3vw,38px)/1.06 Georgia,"Times New Roman",serif;letter-spacing:-.055em;margin:0}
        .editorial-about .editorial-row p{font-size:17px;line-height:1.7;margin:0 0 19px}
        .editorial-about .editorial-entry{padding:0 0 17px;margin:0 0 16px;border-bottom:1px solid var(--editorial-line);display:flex;justify-content:space-between;gap:16px}
        .editorial-about .editorial-entry h3{font:400 22px/1.2 Georgia,"Times New Roman",serif;letter-spacing:-.03em;margin:0 0 6px}
        .editorial-about .editorial-entry p{font-size:13px;opacity:.55;margin:0}
        .editorial-about .editorial-entry time{font-size:12px;opacity:.55;white-space:nowrap}
        .editorial-about .editorial-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:18px}
        .editorial-about .editorial-tags span{border:1px solid var(--editorial-line);border-radius:30px;padding:7px 11px;font-size:10px}
        .editorial-about .editorial-full{border-top:1px solid var(--editorial-line);padding:90px 0 155px}
        .editorial-about .editorial-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px;margin-top:28px}
        .editorial-about .editorial-card{border:1px solid var(--editorial-line);padding:25px;min-height:200px;display:flex;flex-direction:column;justify-content:space-between}
        .editorial-about .editorial-card h3{font:400 25px Georgia,"Times New Roman",serif;margin:0}
        .editorial-about .editorial-card p{font-size:15px;line-height:1.65;opacity:.65;margin:0}
        .editorial-about .about-section{border-top:1px solid var(--editorial-line);padding:90px 0 155px;margin:0}
        .editorial-about .section-title{font:400 34px Georgia,"Times New Roman",serif;letter-spacing:-.05em}
        .editorial-about .quote-grid{margin-top:32px}
        .editorial-about .about-github-panel{max-width:100%;overflow-x:auto}
        .editorial-about .long-story{max-width:100%}
        html[data-theme="light"] .editorial-about{color:#3348ec}
        html[data-theme="dark"] .editorial-about{color:#f2f0eb;--editorial-line:rgba(255,255,255,.19)}
        @media(max-width:900px){.editorial-about{padding:0 7% 120px}.editorial-about .editorial-hero{padding:90px 0 100px}}
        @media(max-width:620px){.editorial-about .editorial-hero{grid-template-columns:1fr;gap:30px;padding:70px 0 90px}.editorial-about .editorial-portrait{margin:0;width:min(75%,245px)}.editorial-about .editorial-row{grid-template-columns:1fr;gap:32px;padding:55px 0 85px}.editorial-about .editorial-full,.editorial-about .about-section{padding:55px 0 85px}.editorial-about .editorial-cards{grid-template-columns:1fr}.editorial-about .editorial-card{min-height:150px}}
      `}</style>
      <header className="editorial-hero">
        <div><h1>A little<br/>about me.</h1><p>I'm a strategist, artist, and builder. I work across brands, technology, and the arts — drawn to ideas that make people think, feel, or see things differently.</p><small>Based in San Antonio, Texas. Often elsewhere.</small></div>
        <img className="editorial-portrait" src={driveImageUrl("1UJ7HG3gZU2zD5Y_kdHwCXLGjm1llx_Xc")} alt="Ivonne Aldaz portrait"/>
      </header>
      <section className="editorial-row"><h2>The short<br/>version.</h2><div>
        <p>I'm drawn to the intersection of human behavior, creativity, and business. For more than a decade, I've worked across industries—from growing tech companies to global household brands—turning ideas and insights into brands, strategies, and experiences that connect with people and drive growth.</p>
        <p>I run a creative studio, build independent ventures, and teach marketing at university. Outside of work, you'll usually find me painting, making ceramics, traveling, or experimenting with something on the internet.</p>
        <p>I grew up on the Texas–Mexico border. I've always been curious about people, places, and what makes us see things differently.</p>
      </div></section>
      <section className="editorial-row"><h2>Selected<br/>experience.</h2><div>
        {[
          ["Founder · Whitespace","Independent strategy and creative studio","2018 — Present"],
          ["Director, Brand Insights · TrueLoyal","Formerly TINT","2023 — 2025"],
          ["Marketing leadership · TINT","Strategy, research, content, and growth","2020 — 2023"],
          ["VP of Marketing · Patel Gaines","Brand and marketing leadership","2015 — 2018"]
        ].map(([title,sub,dates])=><div className="editorial-entry" key={title}><div><h3>{title}</h3><p>{sub}</p></div><time>{dates}</time></div>)}
        <div className="editorial-tags">{capabilities.slice(0,5).map(x=><span key={x}>{x}</span>)}</div>
      </div></section>
      <section className="editorial-full"><h2>Things I'm building.</h2><div className="editorial-cards">
        <a href="https://bywhitespace.com" className="editorial-card"><h3>Whitespace</h3><p>Strategy, creative direction, and systems for ambitious businesses.</p></a>
        <div className="editorial-card"><h3>Make Space</h3><p>Creative gatherings and hands-on experiences, made with friends.</p></div>
        <a href="/work" className="editorial-card"><h3>More projects ↗</h3><p>A selection of brands, experiments, and other things I've made.</p></a>
      </div></section>
      <section className="editorial-row"><h2>In the<br/>classroom.</h2><div>
        <div className="editorial-entry"><div><h3>St. Mary's University</h3><p>Adjunct Professor · Principles of Marketing</p></div><time>Spring 2027</time></div>
        <div className="editorial-entry"><div><h3>University of the Incarnate Word</h3><p>Lecturer · Consumer Behavior + International Entrepreneurship</p></div><time>Spring 2027</time></div>
      </div></section>
      <section className="editorial-row"><h2>Education.</h2><div>
        <div className="editorial-entry"><div><h3>Master of Business Administration</h3><p>St. Mary's University</p></div></div>
        <div className="editorial-entry"><div><h3>International Business & Economics</h3><p>Hochschule Schmalkalden · In progress</p></div></div>
      </div></section>
      <section className="editorial-row"><h2>Beyond work.</h2><div><p>I volunteer with local arts and cultural organizations, teach yoga, and spend as much time as I can making things with my hands.</p><a href="/art">See the art ↗</a></div></section>
            <section className="about-section">
        <div className="section-heading"><h2 className="section-title small-title">Kind words</h2></div>
        <div className="quote-grid">
          <figure className="quote-card"><blockquote>“A rare find. Deeply data-driven, deeply human.”</blockquote><figcaption>— CEO, TrueLoyal</figcaption></figure>
          <figure className="quote-card"><blockquote>“Everyone keeps saying what a great job you’re doing and how happy the clients are.”</blockquote><figcaption>— CMO, TrueLoyal</figcaption></figure>
          <figure className="quote-card"><blockquote>“Why are we even talking about it? Just hire her.”</blockquote><figcaption>— VP of Sales, TINT</figcaption></figure>
        </div>
      </section>
            <section className="about-section about-github-section">
        <div className="section-heading about-github-heading">
          <div>
            <h2 className="section-title small-title">Building</h2>
            <p>A running record of the tools, products, and experiments I’m building.</p>
          </div>
          <div className="about-github-meta">
            {github?.total ? (
              <div className="about-github-counter" aria-label={`${github.total.toLocaleString()} contributions in the last year`}>
                <strong>{github.total.toLocaleString()}</strong>
                <span>contributions · last 12 months</span>
              </div>
            ) : null}
            <a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer">View GitHub ↗︎</a>
          </div>
        </div>
        <div className="about-github-panel">
          <div className="about-github-calendar" aria-label="GitHub contribution activity">
            <div className="about-github-months" aria-hidden="true">
              {githubCalendar.months.map((month, index) => (
                <span key={`${month.label}-${index}`} style={{ gridColumn: `${month.start + 1} / span 4` }}>{month.label}</span>
              ))}
            </div>
            <div className="about-github-body">
              <div className="about-github-days" aria-hidden="true">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>
              <div className="about-github-grid" aria-hidden="true">
                {githubCalendar.weeks.flatMap((week, weekIndex) =>
                  week.map((day, dayIndex) => (
                    <span
                      className={`level-${day.level}`}
                      key={day.date}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                      style={{ gridColumn: weekIndex + 1, gridRow: dayIndex + 1 }}
                    />
                  )),
                )}
              </div>
            </div>
            <div className="about-github-legend" aria-hidden="true">
              <span>Less</span>
              <i className="level-0" />
              <i className="level-1" />
              <i className="level-2" />
              <i className="level-3" />
              <i className="level-4" />
              <span>More</span>
            </div>
          </div>
        </div>
      </section>
            <section className="about-section">
        <details className="long-story about-disclosure">
          <summary><span>Read the longer story</span><span aria-hidden="true">＋</span></summary>
          <div className="long-story-copy">
            <p className="long-story-lede">Life is about saying yes to the things that will make a better story.</p>
            <p>For over a decade, I’ve been building brands and shaping how companies think, look, and communicate — from startups navigating pivots and acquisitions to work supporting global enterprises. All of it has been driven by the same obsession: what makes something resonate, what gives it a world, and what makes people feel something before they can explain why.</p>
            <p>In marketing, everything moves quickly. I needed to make something that could outlive the next campaign, so I paint and work in ceramics — something I can’t undo with a keystroke.</p>
            <p>Art residencies in France and Italy cracked something open in me. Every time I committed, the next thing revealed itself.</p>
            <p>These days, I follow that curiosity wherever it goes. Sometimes that’s a painting. Sometimes it’s a ceramics workshop, a yoga practice, a brand, or a weird little thing I build on the internet.</p>
            <p><strong>Whitespace</strong> is my strategy and creative studio. <strong>Make Space</strong> brings people together to make things with their hands. <strong>Good World Living</strong> is an ongoing exploration of remarkable places, thoughtfully made things, and what it means to live well.</p>
            <p>Different expressions of the same curiosity.</p>
            <p>I grew up on the border. Two languages, two worlds. A constant pull toward the other side.</p>
            <p>Some of that shows up in the work.<br />All of it shows up here.</p>
          </div>
        </details>
      </section>
    </section>
  );
}
