"use client";
import {useState} from "react";
import Link from "next/link";
import ExperimentLoop from "@/components/ExperimentLoop";
import CaseArt from "@/components/CaseArt";

const projects=[
{title:"The Lab",meta:"Interactive portfolio",description:"A nostalgic desktop of projects, music, art, and playful experiments.",href:"/experiments/the-lab",loop:"lab"},
{title:"Ask Eve",meta:"Conversational CV",description:"Explore my work and experience through an interactive AI conversation.",href:"/experiments/ask-eve",loop:"eve"},
{title:"Chatroom",meta:"Community experiment",description:"An old-internet-inspired public chatroom.",href:"/experiments/chatroom",loop:"chat"},
{title:"Snake",meta:"Game",description:"A playable experiment with a leaderboard.",href:"/experiments/snake",loop:"snake"},
{title:"Watercolor",meta:"Interactive study",description:"An interactive watercolor trace that responds to movement and slowly fades away.",href:"/experiments/watercolor",loop:"watercolor"},
{title:"Art Practice",meta:"Painting / Watercolor / Ceramics",description:"Selected artworks, exhibitions, and an evolving art practice.",href:"/art",loop:null},
{title:"Whitespace",meta:"Creative studio",description:"Brand, marketing, and operating systems.",href:"https://www.bywhitespace.com/",loop:"whitespace"},
{title:"Good World Living",meta:"Creative platform",description:"A collection of art, travel, experiences, and intentional living.",href:"https://www.goodworldliving.com/",loop:"gwl"}
];
const brands=["Hero Cosmetics","Nestlé","CVS Health","Batiste","Purina","ARM & HAMMER","Gerber","Nescafe","Stouffer's","Sir Kensington's (Unilever)","Kellanova","Clio Snacks","First Response","Gaia Herbs","H-E-B","Maggi Noodles","Maison Perrier","Pacific Coast Producers","TrueLoyal (formerly TINT)","Veggies Made Great","Flexitol","Fur Buddies","viemaa","Propel Real Estate Capital","Potluck"];
const featuredBrands=["Purina","ARM & HAMMER","Future of Marketing","TINT","Gaia Herbs","Veggies Made Great","TrueLoyal"];
const additionalBrands=brands.filter(b=>b!=="TrueLoyal (formerly TINT)"&&!featuredBrands.includes(b));
const cases:Record<string,{title:string;category:string;description:string;href?:string;image?:string;video?:string}>={
"Purina":{title:"The Role of Video Reviews",category:"Consumer insights",description:"Explored how video reviews influence pet-care purchase decisions, comparing market consumers with Purina fans.",href:"/work/purina-video-reviews"},
"ARM & HAMMER":{title:"Placement + Pricing",category:"Retail insights",description:"Consumer research on expected product placement and willingness to pay, supporting a Walmart launch.",href:"/work/arm-hammer-retail-strategy"},
"Gaia Herbs":{title:"Concept Validation",category:"Product research",description:"Evaluated multivitamin concepts and messaging before further investment.",href:"/work/gaia-herbs-concept-validation"},
"Veggies Made Great":{title:"Omelette Rounds",category:"Product strategy",description:"Research supported the transition from Egg Patties to Omelette Rounds.",href:"/work/veggies-made-great"},
"Future of Marketing":{title:"Future of Marketing",category:"Newsletter growth",description:"Grew the Future of Marketing newsletter from 7K to more than 50K subscribers.",href:"/work/future-of-marketing",image:"/case-studies/future-of-marketing-interview.webp"},
"TINT":{title:"State of Social Report",category:"Original research / Editorial",description:"Original research and insights developed into the State of Social report.",image:"/case-studies/research-blog.webp"},
"TrueLoyal":{title:"Brand Insights",category:"Insights work",description:"Research and strategic insights work for TrueLoyal."}
};
type Props={compact?:boolean};
export default function SelectedWorkExplorer({compact=false}:Props){
 const [showMoreBrands,setShowMoreBrands]=useState(false);
 const [project,setProject]=useState(0),[brand,setBrand]=useState<string|null>("Purina"),[pinned,setPinned]=useState("Purina");
 const current=projects[project],caseStudy=brand?cases[brand]:undefined;
 return <section className={"selected-work-explorer"+(compact?" selected-work-compact":"")} id="selected-work">
 
 <div className="selected-work-projects"><div className="selected-work-index"><h3>Projects</h3><div className="selected-work-scroll" role="group" aria-label="Select a project">{projects.map((p,i)=><button type="button" aria-pressed={project===i} className={project===i?"active":""} key={p.title} onClick={()=>setProject(i)}><span className="selected-work-index-number">{String(i+1).padStart(2,"0")}</span><span><strong>{p.title}</strong><small>{p.meta}</small></span></button>)}</div><div className="selected-work-scroll-cue" aria-hidden="true">Scroll for more projects <span>↓</span></div></div>
 <div className="selected-work-project-preview"><div className="selected-work-preview-stage selected-work-preview-unframed">{current.loop?<ExperimentLoop key={current.loop} name={current.loop} label={current.title+" preview"}/>:<div className="selected-work-text-preview"><span>IVONNE ALDAZ / PROJECTS</span><strong>{current.title}</strong><small>{current.meta}</small></div>}</div><div className="selected-work-project-description"><h4>{current.title}</h4><p>{current.description}</p><Link href={current.href}>Open project ↗</Link></div></div></div>
 <div className="selected-work-company-section" id="case-studies"><div className="selected-work-brand-heading"><h3>Brands I’ve worked with</h3><span>Hover or click to explore</span></div><div className="selected-work-brand-grid" aria-label="Brands I've worked with" onMouseLeave={()=>setBrand(pinned)}>{featuredBrands.map(b=><button key={b} type="button" className={(brand===b?"active":"")+(pinned===b?" pinned":"")} aria-pressed={brand===b} data-has-case={Boolean(cases[b])} onMouseEnter={()=>setBrand(b)} onFocus={()=>setBrand(b)} onClick={()=>{setBrand(b);setPinned(b)}}>{b}</button>)}{showMoreBrands&&additionalBrands.map(b=><button key={b} type="button" className={(brand===b?"active":"")+(pinned===b?" pinned":"")} aria-pressed={brand===b} data-has-case={Boolean(cases[b])} onMouseEnter={()=>{if(cases[b])setBrand(b)}} onFocus={()=>{if(cases[b])setBrand(b)}} onClick={()=>{if(cases[b]){setBrand(b);setPinned(b)}}}>{b}</button>)}<div className="selected-work-brand-toggle"><button type="button" className="selected-work-more-brands" aria-expanded={showMoreBrands} onClick={()=>setShowMoreBrands(v=>!v)}>{showMoreBrands?"− Fewer brands":"+ More brands"}</button></div></div>
 {caseStudy?<div className="selected-work-case"><div className="selected-work-case-visual has-media" key={brand}>{caseStudy.image?<img className="case-still" src={caseStudy.image} alt={caseStudy.title}/>:<CaseArt brand={brand!}/>}<span className="case-media-label">{brand}</span></div><div className="selected-work-case-copy"><span>{caseStudy.category}</span><h4>{caseStudy.title}</h4><p>{caseStudy.description}</p>{caseStudy.href?<Link href={caseStudy.href}>Read case study →</Link>:null}</div></div>:null}
 </div></section>
}
