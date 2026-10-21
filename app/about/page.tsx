import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About", "Meet Ivonne Aldaz: strategist, artist, builder, and educator.", "/about");

import Link from "next/link";
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


const brands = [
  "Hero Cosmetics","Nestlé","CVS Health","Batiste","Purina","ARM & HAMMER","Gerber","Nescafe","Stouffer's","Sir Kensington's (Unilever)",
  "Kellanova","Clio Snacks","First Response","Gaia Herbs","H-E-B","Maggi Noodles","Maison Perrier","Pacific Coast Producers",
  "TrueLoyal (formerly TINT)","Veggies Made Great","Flexitol","Fur Buddies","viemaa",
];

const visibleBrands = brands.slice(0,10);

export default async function AboutPage() {

  return (
    <section id="about-top" className="page about-editorial">
      <div className="about-editorial-hero">
        <div><h1>A little<br/>about me.</h1><p className="about-editorial-lede">I'm a strategist, artist, and builder. I work across brands, technology, and the arts — drawn to ideas that make people think, feel, or see things differently.</p><p className="about-editorial-note">Based in San Antonio, Texas. Often elsewhere.</p></div>
        <img src={driveImageUrl("1UJ7HG3gZU2zD5Y_kdHwCXLGjm1llx_Xc")} alt="Portrait of Ivonne Aldaz" />
      </div>
      <div className="about-editorial-row"><h2>The short<br/>version.</h2><div><p>I'm drawn to the intersection of human behavior, creativity, and business. For more than a decade, I've worked across industries—from growing tech companies to global household brands—turning ideas and insights into brands, strategies, and experiences that connect with people and drive growth.</p><p>I run a creative studio, build independent ventures, and teach marketing at university. Outside of work, you'll usually find me painting, making ceramics, traveling, or experimenting with something on the internet.</p><p>I grew up on the Texas–Mexico border. I've always been curious about people, places, and what makes us see things differently.</p></div></div>
      <div className="about-editorial-row"><h2>Selected<br/>experience.</h2><div className="about-editorial-list">{[{title:"Founder · Whitespace",sub:"Independent strategy and creative studio",date:"2018 — Present"},{title:"Director, Brand Insights · TrueLoyal",sub:"Formerly TINT",date:"2023 — 2025"},{title:"Marketing leadership · TINT",sub:"Strategy, research, content, and growth",date:"2020 — 2023"},{title:"VP of Marketing · Patel Gaines",sub:"Brand and marketing leadership",date:"2015 — 2018"}].map(x=><div className="about-editorial-item" key={x.title}><div><h3>{x.title}</h3><small>{x.sub}</small></div><span>{x.date}</span></div>)}<div className="about-editorial-tags">{["Brand strategy","Consumer insights","Creative direction","AI + systems","Growth"].map(x=><span key={x}>{x}</span>)}</div></div></div>
      <section className="about-editorial-feature"><h2>Things I'm building.</h2><div className="about-editorial-cards"><a href="https://bywhitespace.com"><h3>Whitespace</h3><p>Strategy, creative direction, and systems for ambitious businesses.</p></a><a href="https://www.instagram.com/makespacesa/"><h3>Make Space</h3><p>Creative gatherings and hands-on experiences, made with friends.</p></a><Link href="/work"><h3>More projects ↗</h3><p>A selection of brands, experiments, and other things I've made.</p></Link></div></section>
      <div className="about-editorial-row"><h2>In the<br/>classroom.</h2><div className="about-editorial-list"><div className="about-editorial-item"><div><h3>St. Mary's University</h3><small>Adjunct Professor · Principles of Marketing</small></div><span>Spring 2027</span></div><div className="about-editorial-item"><div><h3>University of the Incarnate Word</h3><small>Lecturer · Consumer Behavior + International Entrepreneurship</small></div><span>Spring 2027</span></div></div></div>
      <div className="about-editorial-row"><h2>Education.</h2><div className="about-editorial-list"><div className="about-editorial-item"><div><h3>Master of Business Administration</h3><small>St. Mary's University</small></div></div><div className="about-editorial-item"><div><h3>International Business & Economics</h3><small>Hochschule Schmalkalden · In progress</small></div></div></div></div>
      <div className="about-editorial-row"><h2>Beyond work.</h2><div><p>I volunteer with local arts and cultural organizations, teach yoga, and spend as much time as I can making things with my hands.</p><Link className="about-editorial-text-link" href="/art">See the art ↗</Link></div></div>
      <section className="about-editorial-feature about-editorial-kind"><h2>Kind words.</h2><div className="about-editorial-quotes"><figure><blockquote>“A rare find. Deeply data-driven, deeply human.”</blockquote><figcaption>— CEO, TrueLoyal</figcaption></figure><figure><blockquote>“Everyone keeps saying what a great job you're doing and how happy the clients are.”</blockquote><figcaption>— CMO, TrueLoyal</figcaption></figure><figure><blockquote>“Why are we even talking about it? Just hire her.”</blockquote><figcaption>— VP of Sales, TINT</figcaption></figure></div></section>
      <section className="about-editorial-feature"><details className="long-story about-disclosure"><summary><span>Read the longer story</span><span aria-hidden="true">＋</span></summary><div className="long-story-copy"><p className="long-story-lede">Life is about saying yes to the things that will make a better story.</p><p>For over a decade, I've been building brands and shaping how companies think, look, and communicate — from startups navigating pivots and acquisitions to work supporting global enterprises.</p><p>In marketing, everything moves quickly. I needed to make something that could outlive the next campaign, so I paint and work in ceramics — something I can't undo with a keystroke.</p><p>Art residencies in France and Italy cracked something open in me. Every time I committed, the next thing revealed itself.</p><p>These days, I follow that curiosity wherever it goes. Sometimes that's a painting. Sometimes it's a ceramics workshop, a yoga practice, a brand, or a weird little thing I build on the internet.</p><p><strong>Whitespace</strong> is my strategy and creative studio. <strong>Make Space</strong> brings people together to make things with their hands. <strong>Good World Living</strong> is an ongoing exploration of remarkable places and thoughtfully made things.</p><p>I grew up on the border. Two languages, two worlds. A constant pull toward the other side.</p></div></details></section>
    </section>
  );
}
