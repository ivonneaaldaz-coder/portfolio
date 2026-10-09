"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import type { PinterestPin } from "@/lib/pinterest";
import styles from "./EditorialHome.module.css";

const projects = [
  { name: "Future of Marketing", category: "Audience & editorial", description: "Growing an owned newsletter audience.", href: "/work/future-of-marketing" },
  { name: "Research into a point of view", category: "Research & design", description: "Original insights, made useful across channels.", href: "/work/research-led-content-engine" },
  { name: "A system for relationships", category: "Strategy & technology", description: "From scattered contacts to an active pipeline.", href: "/work/relationship-operating-system" },
];
const archive = [
  { name: "Purina", detail: "The role of video reviews", href: "/work/purina-video-reviews" },
  { name: "Gaia Herbs", detail: "Concept validation", href: "/work/gaia-herbs-concept-validation" },
  { name: "Veggies Made Great", detail: "Omelette Rounds", href: "/work/veggies-made-great" },
  { name: "ARM & HAMMER", detail: "Placement + pricing", href: "/work/arm-hammer-retail-strategy" },
  { name: "Brand + Digital Repositioning", detail: "Positioning through execution", href: "/work/brand-digital-repositioning" },
];
const practice = [
  { name: "Whitespace", category: "Strategy / Brand / AI", description: "Connecting brand strategy, design, and technology.", image: "/editorial/whitespace.webp", alt: "A quiet coastal landscape from Whitespace", href: "https://www.bywhitespace.com/", external: true },
  { name: "Good World Living", category: "Experiences / Places / Objects", description: "A considered way to experience the world.", image: "/editorial/good-world-living.webp", alt: "Stone buildings and a courtyard from Good World Living", href: "https://www.goodworldliving.com/", external: true },
  { name: "Art Practice", category: "Painting / Ceramics / Design", description: "Exploring memory, place, color, and light.", image: "/editorial/art.webp", alt: "Paintings displayed in a gallery", href: "/art", external: false },
];
const writing = [
  { title: "From Brand to Atmosphere: Designing Experiences That Feel Like Worlds", publication: "Whitespace", year: "2026", href: "https://www.bywhitespace.com/blog/designing-experiences-that-feel-like-worlds" },
  { title: "When the Universe Hands You a Yes", publication: "Good World Living", year: "2025", href: "https://www.goodworldliving.com/articles/when-the-universe-hands-you-a-yes" },
  { title: "How an Art Residency in Provence Transformed My Creative Path", publication: "Good World Living", year: "2024", href: "https://www.goodworldliving.com/articles/how-an-art-residency-in-provence-transformed-my-creative-path" },
];
const moreWriting = [
  { title: "Strategy Without Execution Is Just Expensive Advice", publication: "Whitespace", year: "2026", href: "https://www.bywhitespace.com/blog/strategy-without-execution-expensive-advice" },
  { title: "The Shift Toward Intentional Branding", publication: "Whitespace", year: "2025", href: "https://www.bywhitespace.com/blog/intentional-branding-designing-with-meaning-in-a-noisy-world" },
  { title: "Art Retreat in France: Unveiling Creative Wonders", publication: "Good World Living", year: "2023", href: "https://www.goodworldliving.com/articles/france-art-retreat" },
];
const press = [
  { org: "Forbes", title: "Why Retailers Should Utilize TikTok to Grow Their Business", year: "2021", href: "" },
  { org: "Adweek", title: "How Micro and Nano Influencers Drive Big Change", year: "2021", href: "https://www.adweek.com/brand-marketing/how-micro-and-nano-influencers-drive-big-change/" },
  { org: "Digiday", title: "In the Metaverse, Brands’ FOMO Is Competing With Consumers’ Burnout", year: "2024", href: "https://digiday.com/marketing/in-the-metaverse-brands-fomo-is-competing-with-consumers-burnout/" },
];
const talks = [
  { org: "Adweek Social Media Week", title: "The Power of Community-Created Content", year: "2022", href: "https://www.linkedin.com/posts/ivonnealdaz_smw-tintlove-activity-6930008317020819456-GIqE" },
  { org: "San Antonio Startup Week", title: "Future of Marketing Live Podcast", year: "2023", href: "https://vimeo.com/876034599" },
  { org: "Hootsuite", title: "State of UGC — Virtual Panel", year: "2023", href: "" },
];

function PublicationRow({ item }: { item: typeof press[number] }) {
  const content = <><span className={styles.publication}>{item.org}<small>{item.year}</small></span><span>{item.title}</span>{item.href && <span aria-hidden="true">↗</span>}</>;
  return item.href ? <a className={styles.pressRow} href={item.href} target="_blank" rel="noreferrer">{content}</a> : <div className={styles.pressRow}>{content}</div>;
}
function WritingRow({ item }: { item: typeof writing[number] }) {
  return <a className={styles.writingRow} href={item.href} target="_blank" rel="noreferrer"><span className={styles.writingMeta}>{item.publication}<small>{item.year}</small></span><h3>{item.title}</h3><span aria-hidden="true">↗</span></a>;
}

export default function EditorialHome({ pins }: { pins: Pick<PinterestPin, "id" | "imageUrl" | "altText">[] }) {
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const project = projects[selected];
  return (
    <div className={styles.home}>
      <a className={styles.skipLink} href="#editorial-main">Skip to content</a>
      <div className={styles.previewBar}><span>Editorial preview</span><Link href="/original">Compare original ↗</Link></div>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="Ivonne Aldaz home">IVONNE ALDAZ</Link>
        <button className={styles.menuButton} type="button" aria-expanded={menuOpen} aria-controls="editorial-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close −" : "Menu +"}</button>
        <nav id="editorial-navigation" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
          <a href="#case-studies">Work</a><a href="#work">Practice</a><a href="#writing">Writing</a><a href="#press">Press</a><Link href="/about">About</Link><a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">Lab ↗</a>
        </nav>
        <div className={styles.theme}><ThemeToggle compact /></div>
      </header>
      <main id="editorial-main">
        <section className={styles.hero} aria-labelledby="editorial-title">
          <div><p className={styles.eyebrow}>Independent practice · Strategy / Technology / Art</p><h1 id="editorial-title">Ideas into systems.<br/><em>Life into work.</em></h1></div>
          <div className={styles.heroCopy}><p>I build brands, audiences, and digital systems. I paint, collect references, and follow my curiosity.</p><a className={styles.underlined} href="mailto:hello@ivonnealdaz.com">Let’s make something <span aria-hidden="true">↗</span></a><span className={styles.availability}><i aria-hidden="true"/>Available for select projects</span></div>
        </section>
        <nav className={styles.collectionNav} aria-label="Personal collections"><span className={styles.eyebrow}>A few things that shape my world</span><Link href="/visual-references">Visual references ↗</Link><Link href="/books">Books ↗</Link><Link href="/travel">Travel ↗</Link><Link href="/music">Music ↗</Link></nav>
        <section id="library" className={styles.collections} aria-labelledby="collections-title">
          <div className={styles.sectionHeading}><h2 id="collections-title">A world of references.</h2><span className={styles.eyebrow}>Collected, read, visited, played</span></div>
          <div className={styles.collectionGrid}>
            <Link href="/visual-references" className={`${styles.collectionCard} ${styles.referenceCard}`}><div className={styles.referenceMosaic}>{pins.slice(0,4).map(pin => <img key={pin.id} src={pin.imageUrl} alt={pin.altText} width="236" height="236" decoding="async"/>)}<span className={styles.imageOverlay}>Explore the collection ↗</span></div><h3>Visual references <span>Pinterest ↗</span></h3><p>Images and ideas worth keeping.</p></Link>
            <Link href="/books" className={styles.collectionCard}><div className={styles.bookImage}><img src="/editorial/creative-act.webp" alt="The Creative Act by Rick Rubin" width="300" height="400"/><span className={styles.imageOverlay}>From the bookshelf ↗</span></div><h3>Books <span>↗</span></h3><p>Words that stay with me.</p></Link>
            <Link href="/travel" className={styles.collectionCard}><div className={styles.travelImage}><img src="/editorial/dolomites.webp" alt="The Dolomites, Italy — a photograph from my travels" width="800" height="1000"/><span className={styles.imageOverlay}>Elsewhere ↗</span></div><h3>Travel <span>↗</span></h3><p>Places, light, and perspective.</p></Link>
            <Link href="/music" className={styles.collectionCard}><div className={styles.musicImage}><span className={styles.record} aria-hidden="true"><span/></span><img src="/music/zoe-mtv-unplugged.webp" alt="Zoé MTV Unplugged album cover" width="500" height="493"/><span className={styles.imageOverlay}>On the turntable ↗</span></div><h3>Music <span>↗</span></h3><p>A soundtrack for everything else.</p></Link>
          </div>
        </section>
        <section id="case-studies" className={styles.workSection} aria-labelledby="selected-title">
          <div className={styles.sectionHeading}><h2 id="selected-title">Selected work.</h2><span className={styles.eyebrow}>Strategy made tangible</span></div>
          <div className={styles.projectLayout}>
            <div className={styles.projectIndex} role="group" aria-label="Choose a project to preview">
              {projects.map((item,index) => <button key={item.href} type="button" className={styles.projectButton} aria-pressed={selected===index} aria-controls="project-preview" onClick={() => setSelected(index)} onFocus={() => setSelected(index)} onPointerEnter={event => { if(event.pointerType === "mouse") setSelected(index); }}><span className={styles.eyebrow}>0{index+1} / {item.category}</span><strong>{item.name}<span aria-hidden="true">↗</span></strong><span className={styles.projectDescription}>{item.description}</span></button>)}
            </div>
            <div id="project-preview" className={styles.projectPreview}>
              {selected === 0 ? <div className={`${styles.projectPlate} ${styles.newsletterPlate}`}><div className={styles.metricCopy}><p className={styles.eyebrow}>Future of Marketing / TINT</p><div className={styles.metric}>7K <span>→</span> 50K+</div><p className={styles.metricLabel}>Newsletter subscribers.<br/>An owned audience.</p><p className={styles.acquisition}>Podcast, SEO, blogs, events, webinars, social, customers, and partnerships.</p></div><div className={styles.newsletterSheet}><img src="/editorial/newsletter.webp" alt="Excerpt from Future of Marketing Brief 105: The five types of content creators" width="600" height="3880" loading="lazy"/></div></div> : selected === 1 ? <div className={`${styles.projectPlate} ${styles.researchPlate}`}><img src="/editorial/research-cover.webp" alt="State of Social and User-Generated Content, 2023 report cover" width="780" height="1000" loading="lazy"/><div><p className={styles.eyebrow}>Research-led content engine</p><h3>One report.<br/>A year of possibilities.</h3><p>Research → report → editorial, press, social, and email.</p></div></div> : <div className={`${styles.projectPlate} ${styles.systemPlate}`}><p className={styles.eyebrow}>Relationship operating system</p><h3>People.<br/>Context.<br/><em>Next steps.</em></h3><div className={styles.systemFlow}><span>Contacts</span><span aria-hidden="true">→</span><span>Conversations</span><span aria-hidden="true">→</span><span>Follow-ups</span></div><p>For a hospitality network.</p></div>}
              <div className={styles.projectCaption}><span aria-live="polite">{project.name}</span><Link href={project.href}>View case study ↗</Link></div>
            </div>
          </div>
          <details className={styles.disclosure}><summary>Explore more case studies <span aria-hidden="true">＋</span></summary><div className={styles.archiveGrid}>{archive.map(item => <Link href={item.href} key={item.href}><strong>{item.name}</strong><span>{item.detail}</span><b aria-hidden="true">↗</b></Link>)}</div></details>
        </section>
        <section id="work" className={styles.practiceSection} aria-labelledby="practice-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>What I’m building now</p><h2 id="practice-title">Current practice.</h2></div><p className={styles.sectionNote}>Three expressions of the same curiosity.</p></div>
          <div className={styles.practiceGrid}>{practice.map((item,index) => <a className={styles.practiceCard} key={item.name} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}><div className={styles.practiceImage}><img src={item.image} alt={item.alt} width="1200" height="900" loading="lazy"/><span className={styles.practiceNumber}>0{index+1}</span></div><p className={styles.eyebrow}>{item.category}</p><h3>{item.name}<span aria-hidden="true">↗</span></h3><p>{item.description}</p></a>)}</div>
        </section>
        <section id="writing" className={styles.writingSection} aria-labelledby="writing-title"><div className={styles.sectionHeading}><h2 id="writing-title">Thinking out loud.</h2><span className={styles.eyebrow}>Selected writing</span></div><div>{writing.map(item => <WritingRow item={item} key={item.href}/>)}</div><details className={styles.disclosure}><summary>More writing <span aria-hidden="true">＋</span></summary>{moreWriting.map(item => <WritingRow item={item} key={item.href}/>)}</details></section>
        <section id="press" className={styles.pressSection} aria-labelledby="press-title"><div className={styles.sectionHeading}><h2 id="press-title">In conversation.</h2><span className={styles.eyebrow}>Press + speaking</span></div><div className={styles.pressGrid}><div><p className={styles.eyebrow}>In the press</p>{press.map(item => <PublicationRow item={item} key={item.org}/>)}</div><div><p className={styles.eyebrow}>On stage & on air</p>{talks.map(item => <PublicationRow item={item} key={item.org}/>)}</div></div><details className={styles.disclosure}><summary>More press + speaking <span aria-hidden="true">＋</span></summary><div className={styles.pressGrid}><PublicationRow item={{org:"Social Pros Podcast",title:"How to Capture UGC’s Untapped Potential",year:"2022",href:"https://socialpros.libsyn.com/how-to-capture-ugcs-untapped-potential-with-tint"}}/><PublicationRow item={{org:"B2B Better",title:"Writing a Newsletter Worth Reading",year:"2021",href:"https://b2bbite.substack.com/p/writing-a-newsletter-worth-reading"}}/><PublicationRow item={{org:"St. Mary’s University",title:"How to Make the Most of Your MBA",year:"2025",href:""}}/></div></details></section>
        <section className={styles.labSection} aria-labelledby="lab-title"><a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer" className={styles.labImage}><img src="/experiments/lab.webp" alt="The Lab, my interactive retro desktop" width="848" height="584" loading="lazy"/></a><div><p className={styles.eyebrow}>The other side of the practice</p><h2 id="lab-title">A little less finished.<br/><em>A little more curious.</em></h2><p>Experiments, tools, conversations, and things made just to see what happens.</p><a className={styles.underlined} href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">Enter the Lab ↗</a><div className={styles.labLinks}><Link href="/experiments/ask-eve">Ask Eve</Link><Link href="/experiments/chatroom">Chatroom</Link><Link href="/experiments/snake">Snake</Link><Link href="/experiments/moodboard-agent">Moodboard</Link></div></div></section>
        <section id="contact" className={styles.contactSection}><div><p className={styles.eyebrow}>Have something in mind?</p><h2>Let’s make<br/><em>something matter.</em></h2></div><div><a className={styles.email} href="mailto:hello@ivonnealdaz.com">hello@ivonnealdaz.com ↗</a><p>For work, exhibitions, collaborations,<br/>or a good conversation.</p></div></section>
      </main>
      <footer className={styles.footer}><Link className={styles.wordmark} href="/">IVONNE ALDAZ</Link><p>Always collecting. Always making.</p><nav aria-label="Elsewhere"><a href="https://www.pinterest.com/ivonnealdaz/" target="_blank" rel="noreferrer">Pinterest ↗</a><a href="https://www.linkedin.com/in/ivonnealdaz/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://substack.com/@ivonnealdaz" target="_blank" rel="noreferrer">Subscribe ↗</a></nav></footer>
    </div>
  );
}
