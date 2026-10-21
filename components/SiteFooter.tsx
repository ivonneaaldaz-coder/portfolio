import Link from "next/link";
import SidebarSubscribe from "@/components/SidebarSubscribe";
export default function SiteFooter() {
 return <footer className="footer-grid section-pad site-footer" style={{paddingTop:"clamp(65px,8vw,120px)",paddingBottom:"clamp(75px,9vw,140px)"}}>
   <div className="footer-about"><h2>The world is my studio.</h2><a href="mailto:hello@ivonnealdaz.com">Get in touch →</a></div>
   <div><p className="eyebrow">FIND ME ELSEWHERE</p><ul className="footer-social-grid">
     <li><a href="https://www.pinterest.com/ivonnealdaz/" target="_blank" rel="noreferrer">Pinterest ↗</a></li>
     <li><a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer">GitHub ↗</a></li>
     <li><a href="https://www.linkedin.com/in/ivonnealdaz/" target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
     <li><a href="https://x.com/ivonnealdazz" target="_blank" rel="noreferrer">X ↗</a></li>
     
   </ul></div>
   <div className="footer-newsletter"><p className="eyebrow">STAY IN THE LOOP</p><SidebarSubscribe /></div>
 <style>{`.footer-social-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:28px;row-gap:6px;max-width:300px}.footer-newsletter .eyebrow{margin-bottom:24px!important}.footer-newsletter .sidebar-subscribe,.footer-newsletter a{margin-top:0}@media(max-width:700px){.footer-social-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}`}</style></footer>;
}