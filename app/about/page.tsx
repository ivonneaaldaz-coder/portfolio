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
  { title:"UTSA Group Exhibition", meta:"Group exhibition", year:"2026" },
  { title:"Breva Creative", meta:"Group exhibition", year:"2026" },
  { title:"Bellagio, Lake Como", meta:"Group exhibition", year:"2025" },
  { title:"Casa d'Arte, Lake Como", meta:"Artist residency", year:"2025" },
  { title:"NG Art Residency, Provence", meta:"Artist residency", year:"2024" },
  { title:"La Roane, France", meta:"Watercolor retreat", year:"2023" },
];

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
const moreBrands = brands.slice(10);

export default async function AboutPage() {
  const github = await getGitHubContributions();
  const githubCalendar = buildGitHubCalendar(github?.days || []);

  return (
    <section id="about-top" className="page section-pad about-page">
      <div className="about-hero">
        <div className="about-portrait about-portrait-hover">
          <img className="about-portrait-bw" src={driveImageUrl("1UJ7HG3gZU2zD5Y_kdHwCXLGjm1llx_Xc")} alt="Ivonne Aldaz" />
          <img className="about-portrait-color" src={driveImageUrl("1AlOciizm_YrgZmFTGCeUZ4ZORuFGjaZA")} alt="" aria-hidden="true" />
        </div>
        <div className="about-copy">
          <h1>Strategist, artist, builder, educator.</h1>
          <p>My work moves between brand strategy, technology, systems, and visual art — from building digital tools and brand worlds to teaching, making, and independent experiments.</p>
          <div className="about-links">
            <Link href="/work">Selected work →</Link>
            <Link href="/art">Art practice →</Link>
            <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">The Lab ↗︎</a>
            <Link href="/press">Press + speaking →</Link>
          </div>
        </div>
      </div>

      <section className="about-section about-resume-section">
        <div className="about-resume-row">
          <div className="about-resume-content">
            <p className="about-resume-label">Experience</p>
            <div className="about-experience-list">
              {experience.map(item => (
                <div className="about-experience-item" key={item.role + item.company}>
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                  <span>{item.dates}</span>
                </div>
              ))}
              <details className="about-earlier-experience">
                <summary><span>Earlier experience</span><span aria-hidden="true">＋</span></summary>
                <div>
                  {earlierExperience.map(item => (
                    <div className="about-experience-item" key={item.role + item.company}>
                      <div>
                        <h3>{item.role}</h3>
                        <p>{item.company}</p>
                      </div>
                      <span>{item.dates}</span>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>

      <section className="about-section">
        <div className="section-heading"><h2 className="section-title small-title">Selected brands</h2></div>
        <div className="brand-wall">
          {visibleBrands.map((brand)=><div className="brand-name" key={brand}><strong>{brand}</strong></div>)}
        </div>
        <details className="brand-more">
          <summary>More brands + collaborations</summary>
          <div className="brand-wall brand-wall-more">
            {moreBrands.map((brand)=><div className="brand-name" key={brand}><strong>{brand}</strong></div>)}
          </div>
        </details>
      </section>

        <div className="about-resume-row">
          <div className="about-resume-content">
            <p className="about-resume-label">Capabilities</p>
            <div className="about-capabilities-grid">
              {capabilities.map(item => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-teaching-section">
        <div className="section-heading"><h2 className="section-title small-title">Teaching</h2></div>
        <div className="about-exhibitions-list about-teaching-list">
          <div className="about-exhibition-row">
            <div>
              <h3>Adjunct Professor of Marketing</h3>
              <p>St. Mary’s University · Principles of Marketing</p>
            </div>
            <span>Spring 2027</span>
          </div>
          <div className="about-exhibition-row">
            <div>
              <h3>Lecturer in Marketing</h3>
              <p>University of the Incarnate Word · Consumer Behavior + International Entrepreneurship</p>
            </div>
            <span>Spring 2027</span>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-heading"><h2 className="section-title small-title">Kind words</h2></div>
        <div className="quote-grid">
          <figure className="quote-card"><blockquote>“A rare find. Deeply data-driven, deeply human.”</blockquote><figcaption>— CEO, TrueLoyal</figcaption></figure>
          <figure className="quote-card"><blockquote>“Everyone keeps saying what a great job you’re doing and how happy the clients are.”</blockquote><figcaption>— CMO, TrueLoyal</figcaption></figure>
          <figure className="quote-card"><blockquote>“Why are we even talking about it? Just hire her.”</blockquote><figcaption>— VP of Sales, TINT</figcaption></figure>
        </div>
      </section>

      <section className="about-section about-exhibitions-section">
        <div className="section-heading"><h2 className="section-title small-title">Exhibitions + Residencies</h2></div>
        <div className="about-exhibitions-list">
          {exhibitions.map(item => (
            <div className="about-exhibition-row" key={item.title + item.year}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
              </div>
              <span>{item.year}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section about-github-section">
        <div className="section-heading about-github-heading">
          <div>
            <h2 className="section-title small-title">Building</h2>
            <p>Small tools, products, and experiments I keep shipping.</p>
          </div>
          <div className="about-github-meta">
            {github?.total ? <span>{github.total.toLocaleString()} contributions · last year</span> : null}
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

      <section className="about-section about-community-section">
        <div className="about-resume-row">
          <div className="about-resume-content">
            <p className="about-resume-label">Side Quests</p>
            <div className="about-community-list">
              {visibleSideQuests.map(item => <p key={item}>{item}</p>)}
            </div>
            <details className="about-side-quests-more">
              <summary><span>More side quests</span><span aria-hidden="true">＋</span></summary>
              <div className="about-community-list about-community-list-more">
                {moreSideQuests.map(item => <p key={item}>{item}</p>)}
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="about-section education-section">
        <div className="section-heading"><h2 className="section-title small-title">Education</h2></div>
        <div className="education-list">
          <div><h3>MBA</h3><p>St. Mary’s University</p></div>
          <div><h3>MA, International Business + Economics</h3><p>FH Schmalkalden University of Applied Sciences</p></div>
          <div><h3>Bachelor of Arts</h3><p>St. Mary’s University</p></div>
        </div>
        <div className="education-languages"><span>Languages</span><p>English · Spanish · French</p></div>
      </section>

      <section className="about-section">
        <details className="long-story">
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
