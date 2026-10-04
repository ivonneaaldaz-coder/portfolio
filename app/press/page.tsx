import Link from "next/link";

const press = [
  { year:"2021", org:"Forbes", title:"Why Retailers Should Utilize TikTok to Grow Their Business", href:"https://www.forbes.com/sites/jiawertz/2021/09/24/why-retailers-should-utilize-tiktok-to-grow-their-business/" },
  { year:"2021", org:"Adweek", title:"How Micro and Nano Influencers Drive Big Change", href:"https://www.adweek.com/brand-marketing/how-micro-and-nano-influencers-drive-big-change/" },
  { year:"2024", org:"Digiday", title:"In the Metaverse, Brands’ FOMO Is Competing With Consumers’ Burnout", href:"https://digiday.com/marketing/in-the-metaverse-brands-fomo-is-competing-with-consumers-burnout/" },
  { year:"2022", org:"Social Pros Podcast", title:"How to Capture UGC’s Untapped Potential", href:"https://socialpros.libsyn.com/how-to-capture-ugcs-untapped-potential-with-tint" },
  { year:"2021", org:"B2B Better", title:"Writing a Newsletter Worth Reading", href:"https://b2bbite.substack.com/p/writing-a-newsletter-worth-reading" },
];

const talks = [
  { year:"2022", org:"Adweek Social Media Week", title:"The Power of Community-Created Content", href:"https://www.linkedin.com/posts/ivonnealdaz_smw-tintlove-activity-6930008317020819456-GIqE" },
  { year:"2025", org:"St. Mary’s University", title:"How to Make the Most of Your MBA", href:"" },
  { year:"2024", org:"University of Portland School of Business", title:"B2B Marketing in SaaS", href:"" },
  { year:"2023", org:"San Antonio Startup Week", title:"Live Podcast — Spurs", href:"https://vimeo.com/876034599" },
  { year:"", org:"Texas Tech University", title:"Future Digital Marketing Leaders", href:"" },
];

export default function PressPage() {
  return (
    <section className="page section-pad speaking-page">
      <header className="speaking-hero">
        <h1>Press + Speaking</h1>
        <div>
          <p>Selected press, podcasts, talks, classrooms, panels, and public conversations across marketing, technology, creativity, and entrepreneurship.</p>
          <a href="mailto:hello@ivonnealdaz.com?subject=Speaking%20or%20collaboration%20inquiry">Speaking inquiries ↗︎</a>
        </div>
      </header>

      <div className="speaking-topics"><span>Brand</span><span>AI + marketing</span><span>Creativity</span><span>Portfolio careers</span><span>Community</span><span>Entrepreneurship</span></div>

      <section className="public-section">
        <div className="section-heading"><h2 className="section-title small-title">Selected press + podcasts</h2></div>
        <div className="public-list">
          {press.map((item) => (
            <a className="public-row" href={item.href} target="_blank" rel="noreferrer" key={item.org+item.title}>
              <span>{item.year}</span><p>{item.org}</p><h3>{item.title}</h3><span>↗︎</span>
            </a>
          ))}
        </div>
      </section>

      <section className="public-section">
        <div className="section-heading"><h2 className="section-title small-title">Selected talks</h2></div>
        <div className="public-list">
          {talks.map((item) => {
            const body=<><span>{item.year}</span><p>{item.org}</p><h3>{item.title}</h3><span>{item.href ? "↗︎" : "—"}</span></>;
            return item.href ? <a className="public-row" href={item.href} target="_blank" rel="noreferrer" key={item.org+item.title}>{body}</a> : <div className="public-row" key={item.org+item.title}>{body}</div>;
          })}
        </div>
      </section>

      <nav className="related-paths" aria-label="Explore next"><Link href="/work">Selected Work →</Link><Link href="/about">About →</Link></nav>

      <section className="speaking-cta">
        <p>Speaking, teaching, panels, podcasts, guest lectures, and thoughtful collaborations.</p>
        <a href="mailto:hello@ivonnealdaz.com?subject=Speaking%20or%20collaboration%20inquiry">Start a conversation ↗︎</a>
      </section>
    </section>
  );
}
