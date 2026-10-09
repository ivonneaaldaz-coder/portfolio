"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./EditorialHome.module.css";
import labStyles from "./LabPreview.module.css";
const experiments = [
  {name:"The Lab", label:"The full collection", image:"/experiments/lab.webp", href:"https://lab.ivonnealdaz.com"},
  {name:"Ask Eve", label:"An AI conversation", image:"/experiments/eve.webp", href:"/experiments/ask-eve"},
  {name:"Chatroom", label:"A place to talk", image:"/experiments/chat.webp", href:"/experiments/chatroom"},
  {name:"Snake", label:"A classic, rebuilt", image:"/experiments/snake.webp", href:"/experiments/snake"},
  {name:"Moodboard", label:"Pinterest saves → a visual story", image:"", href:"/experiments/moodboard-agent"},
];
export default function LabPreview({pins}:{pins:{id:string;imageUrl:string;altText:string}[]}) {
  const [selected,setSelected]=useState(0);
  const item=experiments[selected];
  return <section className={`${styles.labSection} ${labStyles.section}`} aria-labelledby="lab-title">
    <div className={labStyles.preview}>
      <Link href={item.href} target={selected===0?'_blank':undefined} rel={selected===0?'noreferrer':undefined} className={labStyles.imageLink} aria-label={`Open ${item.name}`}>
        <div key={item.name} className={labStyles.artwork}>
          {item.image ? <img src={item.image} alt={`${item.name} interface preview`} width="848" height="584" loading="lazy"/> : <div className={labStyles.moodboard}>{pins.map(pin=><img key={pin.id} src={pin.imageUrl} alt={pin.altText}/>)}<span>Moodboard / Visual editor</span></div>}
        </div>
      </Link>
      <p className={labStyles.caption} aria-live="polite">{item.name}<span>{item.label}</span></p>
    </div>
    <div><p className={styles.eyebrow}>Experiments in design + technology</p><h2 id="lab-title">Inside <em>the Lab.</em></h2><p>My home for interactive experiments. Explore the collection, or open an experiment below.</p>
      <nav className={labStyles.links} aria-label="Experiments inside the Lab">{experiments.map((experiment,index)=><Link key={experiment.name} href={experiment.href} target={index===0?'_blank':undefined} rel={index===0?'noreferrer':undefined} data-selected={selected===index} onPointerEnter={e=>{if(e.pointerType==='mouse')setSelected(index)}} onFocus={()=>setSelected(index)}><span>{experiment.name}</span><small>{experiment.label}</small><span aria-hidden="true">↗</span></Link>)}</nav>
    </div>
  </section>;
}
