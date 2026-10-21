"use client";
import { useEffect,useRef,useState } from "react";
const colors=["#536f8e","#b66c79","#c6a476","#648b7c","#8a7b9b","#c27f55"];
export default function WatercolorStudio(){
 const ref=useRef<HTMLCanvasElement>(null),drawing=useRef(false),last=useRef<{x:number,y:number}|null>(null),history=useRef<ImageData[]>([]);
 const [color,setColor]=useState(colors[0]),[tool,setTool]=useState<"brush"|"water"|"eraser">("brush"),[size,setSize]=useState(22),[revision,setRevision]=useState(0);
 const [panel,setPanel]=useState<"size"|"palette"|"mixer"|null>(null);
 const [customColors,setCustomColors]=useState<string[]>([]);
 const [mixA,setMixA]=useState(colors[0]),[mixB,setMixB]=useState(colors[1]),[mixRatio,setMixRatio]=useState(50);
 const mix=(a:string,b:string,p:number)=>{const v=(n:number)=>Math.round(parseInt(a.slice(n,n+2),16)*(1-p/100)+parseInt(b.slice(n,n+2),16)*p/100).toString(16).padStart(2,"0");return "#"+v(1)+v(3)+v(5)};
 const mixed=mix(mixA,mixB,mixRatio);
 const addColor=(c:string)=>{setCustomColors(v=>v.includes(c)?v:[...v,c]);setColor(c);setTool("brush")};
 const icon=(name:"brush"|"water"|"eraser"|"palette"|"mixer")=>{
 const common={width:19,height:19,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.6,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
 if(name==="brush")return <svg {...common}><path d="m14 6 4-4 4 4-4 4M14 6 4 16l4 4 10-10M4 16c-2 1-2 4-2 6 2 0 5 0 6-2"/></svg>;
 if(name==="water")return <svg {...common}><path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z"/><path d="M9 17a3 3 0 0 0 3 3"/></svg>;
 if(name==="eraser")return <svg {...common}><path d="m20 14-7 7H6l-4-4a2 2 0 0 1 0-3L13 3a2 2 0 0 1 3 0l6 6a2 2 0 0 1 0 3l-2 2ZM9 9l9 9M13 21h9"/></svg>;
 if(name==="palette")return <svg {...common}><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-4 2 2 0 0 1 1-4h2a4 4 0 0 0 4-4c0-3-4-6-9-6Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/></svg>;
 return <svg {...common}><path d="m4 3 4 4m-2-2 12 12M16 3l5 5-4 4-5-5zM3 16l5 5 4-4-5-5z"/><path d="M11 11l2 2"/></svg>;
 };
 useEffect(()=>{const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;const resize=()=>{const old=document.createElement("canvas");old.width=canvas.width;old.height=canvas.height;old.getContext("2d")?.drawImage(canvas,0,0);const box=canvas.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.max(1,Math.round(box.width*dpr));canvas.height=Math.max(1,Math.round(box.height*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle="#fbf9f5";ctx.fillRect(0,0,box.width,box.height);if(old.width&&old.height)ctx.drawImage(old,0,0,old.width,old.height,0,0,box.width,box.height)};resize();window.addEventListener("resize",resize);return()=>window.removeEventListener("resize",resize)},[]);
 const point=(e:React.PointerEvent<HTMLCanvasElement>)=>{const r=e.currentTarget.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
 const stamp=(x:number,y:number)=>{const ctx=ref.current?.getContext("2d");if(!ctx)return;
  if(tool==="eraser"){ctx.save();ctx.globalCompositeOperation="destination-out";const g=ctx.createRadialGradient(x,y,0,x,y,size*.7);g.addColorStop(0,"rgba(0,0,0,.85)");g.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,size*.7,0,Math.PI*2);ctx.fill();ctx.restore();return}
  ctx.save();ctx.globalCompositeOperation="multiply";
  const water=tool==="water",spread=water?1.9:1.15,opacity=water?.022:.048;
  for(let i=0;i<(water?5:7);i++){const dx=(Math.random()-.5)*size*.65,dy=(Math.random()-.5)*size*.65,r=size*spread*(.38+Math.random()*.6);
   const g=ctx.createRadialGradient(x+dx,y+dy,r*.07,x+dx,y+dy,r);
   g.addColorStop(0,color+Math.round(opacity*255).toString(16).padStart(2,"0"));
   g.addColorStop(.48,color+"09");g.addColorStop(.86,color+"04");g.addColorStop(1,color+"00");
   ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x+dx,y+dy,r,r*(.7+Math.random()*.55),Math.random()*Math.PI,0,Math.PI*2);ctx.fill();
  }ctx.restore();
 };
 const move=(e:React.PointerEvent<HTMLCanvasElement>)=>{if(!drawing.current)return;const p=point(e),prev=last.current||p;const steps=Math.max(1,Math.ceil(Math.hypot(p.x-prev.x,p.y-prev.y)/4));for(let i=0;i<=steps;i++)stamp(prev.x+(p.x-prev.x)*i/steps,prev.y+(p.y-prev.y)*i/steps);last.current=p};
 const start=(e:React.PointerEvent<HTMLCanvasElement>)=>{const canvas=ref.current,ctx=canvas?.getContext("2d");if(!canvas||!ctx)return;history.current.push(ctx.getImageData(0,0,canvas.width,canvas.height));if(history.current.length>12)history.current.shift();setRevision(v=>v+1);drawing.current=true;last.current=null;canvas.setPointerCapture(e.pointerId);move(e)};
 const stop=()=>{drawing.current=false;last.current=null};
 const clear=()=>{const canvas=ref.current,ctx=canvas?.getContext("2d");if(!canvas||!ctx)return;history.current.push(ctx.getImageData(0,0,canvas.width,canvas.height));ctx.fillStyle="#fbf9f5";ctx.fillRect(0,0,canvas.width,canvas.height);setRevision(v=>v+1)};
 const undo=()=>{const canvas=ref.current,ctx=canvas?.getContext("2d"),prev=history.current.pop();if(canvas&&ctx&&prev){ctx.putImageData(prev,0,0);setRevision(v=>v+1)}};
 const surprise=()=>{const canvas=ref.current,ctx=canvas?.getContext("2d");if(!canvas||!ctx)return;
 history.current.push(ctx.getImageData(0,0,canvas.width,canvas.height));if(history.current.length>12)history.current.shift();
 const w=canvas.width,h=canvas.height,choice=Math.floor(Math.random()*20),rand=(a:number,b:number)=>a+Math.random()*(b-a);
 const wash=(x:number,y:number,r:number,c:string,alpha=.12)=>{ctx.save();ctx.globalCompositeOperation="multiply";for(let k=0;k<5;k++){const xx=x+rand(-r*.12,r*.12),yy=y+rand(-r*.12,r*.12),rr=r*rand(.7,1.1);const g=ctx.createRadialGradient(xx,yy,0,xx,yy,rr);g.addColorStop(0,c+Math.round(alpha*255).toString(16).padStart(2,"0"));g.addColorStop(.65,c+"0b");g.addColorStop(1,c+"00");ctx.fillStyle=g;ctx.beginPath();ctx.arc(xx,yy,rr,0,Math.PI*2);ctx.fill()}ctx.restore()};
 const line=(pts:[number,number][],c:string,width:number)=>{ctx.save();ctx.strokeStyle=c+"77";ctx.lineWidth=width;ctx.lineCap="round";ctx.lineJoin="round";ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();ctx.restore()};
 const flower=(x:number,y:number,r:number,c:string,petals:number)=>{for(let j=0;j<petals;j++){const a=j*Math.PI*2/petals;wash(x+Math.cos(a)*r*.6,y+Math.sin(a)*r*.6,r*.52,c,.2)}wash(x,y,r*.22,"#c6a476",.35)};
 const horizon=(y:number,c:string)=>{for(let i=0;i<20;i++)wash(rand(0,w),y+rand(-h*.05,h*.05),rand(w*.07,w*.2),c,.08)};
 const v=choice%5,variant=Math.floor(choice/5);
 if(v===0){ // four floral studies
  for(let i=0;i<3+variant;i++){const x=rand(w*.16,w*.85),y=rand(h*.16,h*.67),r=rand(w*.035,w*.085);line([[x,y+r*.5],[x+rand(-w*.04,w*.04),h*.86]],"#648b7c",Math.max(2,w*.002));flower(x,y,r,colors[(i+variant+1)%colors.length],5+variant);for(let j=0;j<3;j++)wash(x+rand(-r,r),y+r+rand(0,h*.15),r*.35,"#648b7c",.13)}
 }else if(v===1){ // four landscapes
  wash(w*.5,h*.23,w*.24,colors[(variant+2)%colors.length],.1);horizon(h*.58,colors[(variant+3)%colors.length]);horizon(h*.75,colors[(variant+4)%colors.length]);for(let i=0;i<4+variant*2;i++){const x=rand(0,w),y=rand(h*.5,h*.9);wash(x,y,rand(w*.03,w*.13),colors[(i+variant)%colors.length],.16)}
 }else if(v===2){ // four geometric studies
  for(let i=0;i<6+variant*3;i++){const x=rand(w*.1,w*.9),y=rand(h*.12,h*.87),r=rand(w*.025,w*.12);wash(x,y,r,colors[(i+variant)%colors.length],.18);if(i%3===0)line([[x-r,y+r],[x+r,y-r]],colors[(i+2)%colors.length],Math.max(2,w*.003))}
 }else if(v===3){ // four abstract color fields
  for(let i=0;i<9+variant*5;i++){const x=rand(w*.08,w*.92),y=rand(h*.12,h*.88),r=rand(w*.045,w*.18);wash(x,y,r,colors[(i+variant)%colors.length],.14)}
 }else{ // four botanical / organic compositions
  for(let i=0;i<4+variant*2;i++){const x=rand(w*.12,w*.88),y=rand(h*.15,h*.75),r=rand(w*.03,w*.09);line([[x,h*.87],[x,y]],"#648b7c",Math.max(2,w*.002));for(let j=0;j<5;j++){const yy=y+j*r*.55;wash(x+((j%2)?1:-1)*r*.65,yy,r*.55,colors[(i+j+variant)%colors.length],.2)}}
 }
 setRevision(z=>z+1);
 };
 const save=()=>{const a=document.createElement("a");a.download="ivonne-watercolor-study.png";a.href=ref.current?.toDataURL("image/png")||"";a.click()};
 return <section className="hybrid-watercolor" aria-label="Interactive watercolor studio"><div className="hybrid-watercolor-bar"><span>● ● ●</span><span>Watercolor.exe</span><span>↗</span></div><div className="hybrid-watercolor-body"><div className="hybrid-watercolor-tools watercolor-toolbox">
 <button title="Brush" aria-label="Brush" aria-pressed={tool==="brush"} onClick={()=>{setTool("brush");setPanel(v=>v==="size"?null:"size")}}>{icon("brush")}</button>
 <button title="Water" aria-label="Water" aria-pressed={tool==="water"} onClick={()=>{setTool("water");setPanel(null)}}>{icon("water")}</button>
 <button title="Eraser" aria-label="Eraser" aria-pressed={tool==="eraser"} onClick={()=>{setTool("eraser");setPanel(null)}}>{icon("eraser")}</button>
 <button title="Color palette" aria-label="Open color palette" aria-expanded={panel==="palette"} onClick={()=>setPanel(v=>v==="palette"?null:"palette")}>{icon("palette")}</button>
 <button title="Color mixer" aria-label="Open color mixer" aria-expanded={panel==="mixer"} onClick={()=>setPanel(v=>v==="mixer"?null:"mixer")}>{icon("mixer")}</button>
 <div className="watercolor-active-color" title="Current color" style={{background:color}}/>
 {panel==="size"&&<div className="watercolor-tool-panel watercolor-size-panel"><label htmlFor="watercolor-brush-size">Brush size · {size}</label><input id="watercolor-brush-size" aria-label="Brush size" type="range" min="5" max="65" value={size} onChange={e=>setSize(Number(e.target.value))}/></div>}
 {panel==="palette"&&<div className="watercolor-tool-panel watercolor-palette-panel"><strong>Palette</strong><div className="watercolor-swatch-grid">{[...colors,...customColors].map(c=><button key={c} aria-label={"Paint color "+c} aria-pressed={color===c} onClick={()=>{setColor(c);setTool("brush")}} style={{background:c}}/>)}</div><label>Custom color <input type="color" value={color} onChange={e=>setColor(e.target.value)}/></label><button className="watercolor-panel-action" onClick={()=>addColor(color)}>Add to palette +</button></div>}
 {panel==="mixer"&&<div className="watercolor-tool-panel watercolor-mixer-panel"><strong>Mix colors</strong><div className="watercolor-mix-inputs"><label>Color 1<input aria-label="First mixing color" type="color" value={mixA} onChange={e=>setMixA(e.target.value)}/></label><label>Color 2<input aria-label="Second mixing color" type="color" value={mixB} onChange={e=>setMixB(e.target.value)}/></label></div><label>Mix ratio · {mixRatio}%<input type="range" min="0" max="100" value={mixRatio} onChange={e=>setMixRatio(Number(e.target.value))}/></label><div className="watercolor-mix-preview" style={{background:mixed}}/><button className="watercolor-panel-action" onClick={()=>{addColor(mixed);setPanel("palette")}}>Use + save color</button></div>}
 </div><div className="hybrid-watercolor-paper"><canvas ref={ref} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} aria-label="Watercolor painting canvas"/></div></div><div className="hybrid-watercolor-actions"><span>Watercolor.exe</span><div><button disabled={revision===0} onClick={undo}>undo ↶</button><button onClick={surprise}>surprise me ✳</button><button onClick={clear}>clear canvas ×</button><button onClick={save}>save painting ↓</button></div></div></section>
}