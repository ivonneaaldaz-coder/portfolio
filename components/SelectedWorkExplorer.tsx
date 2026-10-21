"use client";
import {useState} from "react";
import Link from "next/link";
import ExperimentLoop from "@/components/ExperimentLoop";

const projects=[
{title:"The Lab",meta:"Interactive portfolio",description:"A nostalgic desktop of projects, music, art, and playful experiments.",href:"/experiments/the-lab",loop:"lab"},
{title:"Ask Eve",meta:"Conversational CV",description:"Explore my work and experience through an interactive AI conversation.",href:"/experiments/ask-eve",loop:"eve"},
{title:"Chatroom",meta:"Community experiment",description:"An old-internet-inspired public chatroom.",href:"/experiments/chatroom",loop:"chat"},
{title:"Snake",meta:"Game",description:"A playable experiment with a leaderboard.",href:"/experiments/snake",loop:"snake"},
{title:"Moodboard Agent",meta:"Creative technology",description:"A visual inspiration and carousel-building experiment.",href:"/experiments/moodboard-agent",loop:null},
{title:"Art Practice",meta:"Painting / Watercolor / Ceramics",description:"Selected artworks, exhibitions, and an evolving art practice.",href:"/art",loop:null},
{title:"Whitespace",meta:"Creative studio",description:"Brand, marketing, and operating systems.",href:"https://www.bywhitespace.com/",loop:null},
{title:"Good World Living",meta:"Creative platform",description:"A collection of art, travel, experiences, and intentional living.",href:"https://www.goodworldliving.com/",loop:null}
];
const brands=["Hero Cosmetics","Nestlé","CVS Health","Batiste","Purina","ARM & HAMMER","Gerber","Nescafe","Stouffer's","Sir Kensington's (Unilever)","Kellanova","Clio Snacks","First Response","Gaia Herbs","H-E-B","Maggi Noodles","Maison Perrier","Pacific Coast Producers","TrueLoyal (formerly TINT)","Veggies Made Great","Flexitol","Fur Buddies","viemaa","Propel Real Estate Capital","Potluck"];
const featuredBrands=["Future of Marketing","TINT","TrueLoyal","Purina","ARM & HAMMER","Gaia Herbs","Veggies Made Great"];
const additionalBrands=brands.filter(b=>b!=="TrueLoyal (formerly TINT)"&&!featuredBrands.includes(b));
const cases:Record<string,{title:string;category:string;description:string;href?:string;image?:string}>={
"Purina":{title:"The Role of Video Reviews",category:"Consumer insights",description:"Explored how video reviews influence pet-care purchase decisions, comparing market consumers with Purina fans.",href:"/work/purina-video-reviews"},
"ARM & HAMMER":{title:"Placement + Pricing",category:"Retail insights",description:"Consumer research on expected product placement and willingness to pay, supporting a Walmart launch.",href:"/work/arm-hammer-retail-strategy"},
"Gaia Herbs":{title:"Concept Validation",category:"Product research",description:"Evaluated multivitamin concepts and messaging before further investment.",href:"/work/gaia-herbs-concept-validation"},
"Veggies Made Great":{title:"Omelette Rounds",category:"Product strategy",description:"Research supported the transition from Egg Patties to Omelette Rounds.",href:"/work/veggies-made-great"},
"Future of Marketing":{title:"Future of Marketing",category:"Newsletter growth",description:"Grew the Future of Marketing newsletter from 7K to more than 50K subscribers.",href:"/work/future-of-marketing"},
"TINT":{title:"State of Social Report",category:"Original research / Editorial",description:"Original research and insights developed into the State of Social report."},
"TrueLoyal":{title:"Brand Insights",category:"Insights work",description:"Research and strategic insights work for TrueLoyal."}
};
type Props={compact?:boolean};
export default function SelectedWorkExplorer({compact=false}:Props){
 const [showMoreBrands,setShowMoreBrands]=useState(false);
 const [project,setProject]=useState(0),[brand,setBrand]=useState<string|null>("Future of Marketing");
 const current=projects[project],caseStudy=brand?cases[brand]:undefined;
 return <section className={"selected-work-explorer"+(compact?" selected-work-compact":"")} id="selected-work">
 
 <div className="selected-work-projects"><div className="selected-work-index"><h3>Projects + Experiments</h3><div className="selected-work-scroll" role="group" aria-label="Select a project">{projects.map((p,i)=><button type="button" aria-pressed={project===i} className={project===i?"active":""} key={p.title} onClick={()=>setProject(i)}><span className="selected-work-index-number">{String(i+1).padStart(2,"0")}</span><span><strong>{p.title}</strong><small>{p.meta}</small></span><span aria-hidden="true">↗</span></button>)}</div><div className="selected-work-scroll-cue" aria-hidden="true">Scroll for more projects <span>↓</span></div></div>
 <div className="selected-work-project-preview"><div className="selected-work-browser"><div className="selected-work-browser-bar"><span aria-hidden="true">● ● ●</span><span>{current.title.toLowerCase().replaceAll(" ","-")}.exe</span><Link href={current.href} aria-label={"Open "+current.title}>↗</Link></div><div className="selected-work-preview-stage">{current.loop?<ExperimentLoop key={current.loop} name={current.loop} label={current.title+" preview"}/>:<div className="selected-work-text-preview"><span>IVONNE ALDAZ / PROJECTS</span><strong>{current.title}</strong><small>{current.meta}</small></div>}</div></div><div className="selected-work-project-description"><h4>{current.title}</h4><p>{current.description}</p><Link href={current.href}>Open project ↗</Link></div></div></div>
 <div className="selected-work-company-section" id="case-studies"><h3>Brands I’ve worked with</h3><p className="selected-work-hint">Hover to explore case studies.</p><div className="selected-work-brand-grid" aria-label="Brands I've worked with">{featuredBrands.map(b=><button key={b} type="button" className={brand===b?"active":""} aria-pressed={brand===b} data-has-case={Boolean(cases[b])} onMouseEnter={()=>setBrand(b)} onFocus={()=>setBrand(b)} onClick={()=>setBrand(b)}>{b}</button>)}{showMoreBrands&&additionalBrands.map(b=><button key={b} type="button" className={brand===b?"active":""} aria-pressed={brand===b} data-has-case={Boolean(cases[b])} onMouseEnter={()=>{if(cases[b])setBrand(b)}} onFocus={()=>{if(cases[b])setBrand(b)}} onClick={()=>{if(cases[b])setBrand(b)}}>{b}</button>)}</div><button type="button" className="selected-work-more-brands" aria-expanded={showMoreBrands} onClick={()=>setShowMoreBrands(v=>!v)}>{showMoreBrands?"− Fewer brands":"+ More brands"}</button>
 {caseStudy?<div className="selected-work-case"><div className="selected-work-case-visual"><span>{brand}</span><strong>{caseStudy.title}</strong><small>SELECTED CASE STUDY</small></div><div className="selected-work-case-copy"><span>{caseStudy.category}</span><h4>{caseStudy.title}</h4><p>{caseStudy.description}</p>{caseStudy.href?<Link href={caseStudy.href}>Read case study →</Link>:null}</div></div>:null}
 </div></section>
}
