import Link from "next/link";
import SidebarSubscribe from "@/components/SidebarSubscribe";
export default function SiteFooter() {
 return <footer className="footer-grid section-pad site-footer" style={{paddingTop:"clamp(65px,8vw,120px)",paddingBottom:"clamp(75px,9vw,140px)"}}>
   <div className="footer-about"><h2>The world is my studio.</h2><a href="mailto:hello@ivonnealdaz.com">Get in touch →</a></div>
   <div><p className="eyebrow">FIND ME ELSEWHERE</p><ul>
     <li><a href="https://www.pinterest.com/ivonnealdaz/" target="_blank" rel="noreferrer">Pinterest ↗</a></li>
     <li><a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer">GitHub ↗</a></li>
     <li><a href="https://www.linkedin.com/in/ivonnealdaz/" target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
     <li><a href="https://x.com/ivonnealdazz" target="_blank" rel="noreferrer">X ↗</a></li>
     <li><a href="https://open.spotify.com/user/ivonnealdaz" target="_blank" rel="noreferrer">Spotify ↗</a></li>
   </ul></div>
   <div><p className="eyebrow">STAY IN THE LOOP</p><SidebarSubscribe /></div>
 </footer>;
}