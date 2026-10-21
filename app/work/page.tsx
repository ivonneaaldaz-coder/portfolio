"use client";
import { useState } from "react";
const projects=[
{title:"The Lab",url:"https://lab.ivonnealdaz.com",category:"Interactive portfolio",description:"A nostalgic desktop-inspired world of experiments, projects, music, and play.",preview:"lab"},
{title:"Ask Eve",url:"https://lab.ivonnealdaz.com",category:"Conversational CV",description:"An interactive way to explore my experience and work.",preview:"eve"},
{title:"Chatroom",url:"https://lab.ivonnealdaz.com",category:"Community experiment",description:"An old-internet-inspired space to leave a message and connect.",preview:"chat"},
{title:"Snake",url:"https://lab.ivonnealdaz.com",category:"Game",description:"A playful browser experiment with a leaderboard.",preview:"snake"},
{title:"Moodboard Agent",url:"/experiments/moodboard-agent",category:"Creative technology",description:"An experiment in collecting and organizing visual inspiration.",preview:"mood"}
];
const cases=[
{company:"TINT",title:"Future of Marketing",category:"Audience growth / Editorial",description:"Built an owned-media platform and grew its newsletter from 7K to more than 50K subscribers.",href:"/work/future-of-marketing"},
{company:"Purina",title:"The Role of Video Reviews",category:"Consumer research",description:"Studied how video reviews shape purchase decisions in pet care.",href:"/work/purina-video-reviews"},
{company:"Gaia Herbs",title:"Concept Validation",category:"Research / Product",description:"Evaluated product concepts to inform development and positioning.",href:"/work/gaia-herbs-concept-validation"},
{company:"ARM & HAMMER",title:"Placement + Pricing",category:"Retail insights",description:"Research on where consumers expect to find a new product and what they will pay.",href:"/work/arm-hammer-retail-strategy"},
{company:"Veggies Made Great",title:"Omelette Rounds",category:"Product strategy",description:"Consumer insights that supported a product repositioning.",href:"/work/veggies-made-great"},
{company:"Hospitality",title:"Partner CRM",category:"Product / Systems",description:"Built an actionable relationship pipeline from fragmented partner data.",href:"/work/relationship-operating-system"}
];
export default function WorkPage(){const [project,setProject]=useState(0);const [study,setStudy]=useState(0);const p=projects[project],c=cases[study];return <main className="redesign-work work-v9">
<section className="work-v9-intro"><h1>A little of everything.</h1><p>Selected projects, curious experiments, and ideas brought to life.</p></section>
<section className="work-v9-explorer" aria-label="Interactive project explorer"><aside><h2>Projects</h2><div className="work-v9-project-list">{projects.map((x,i)=><button type="button" className={i===project?"active":""} onClick={()=>setProject(i)} key={x.title}><span>{String(i+1).padStart(2,"0")}</span><strong>{x.title}</strong><span>↗</span></button>)}</div></aside><div className="work-v9-right"><div className="work-v9-browser"><div className="work-v9-browser-bar"><span>● ● ●</span><span>{p.url.replace("https://","")}</span><a href={p.url} target="_blank" rel="noreferrer" aria-label="Open project">↗</a></div><div className={"work-v9-preview work-v9-"+p.preview}><div className="work-v9-preview-window"><span>{p.category}</span><strong>{p.title}</strong><span>IVONNE ALDAZ / EXPERIMENTS</span></div></div></div><div className="work-v9-project-detail"><h3>{p.title}</h3><p>{p.description}</p><a href={p.url} target="_blank" rel="noreferrer">Open project ↗</a><a href="#case-studies">Selected case studies ↗</a></div></div></section>
<section id="case-studies" className="work-v9-companies"><div className="work-v9-company-head"><h2>In good company</h2></div><div className="work-v9-logos">{cases.map((x,i)=><button type="button" onClick={()=>setStudy(i)} className={study===i?"active":""} key={x.company}>{x.company}</button>)}</div><div className="work-v9-feature"><div className="work-v9-feature-art"><span>{c.company}</span><strong>{c.title}</strong><small>SELECTED WORK</small></div><div className="work-v9-feature-copy"><span>{c.category}</span><h3>{c.title}</h3><p>{c.description}</p><a href={c.href}>Explore related work ↗</a></div></div></section>
<section className="work-v9-ending"><h2>Have something in mind?</h2><a href="mailto:hello@ivonnealdaz.com">hello@ivonnealdaz.com ↗</a></section>
</main>}
