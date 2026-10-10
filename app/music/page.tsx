import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Music", "Playlists, records, and current listening from Ivonne Aldaz.", "/music");

import Link from "next/link";
import SpotifyPlaylists from "@/components/SpotifyPlaylists";
import styles from "@/components/MusicRoom.module.css";

const vinyl = [
  { title:"Dark Side of the Moon", artist:"Pink Floyd", image:"/music/dark-side-of-the-moon.webp", href:"https://amzn.to/47b4A72" },
  { title:"Wish You Were Here", artist:"Pink Floyd", image:"/music/wish-you-were-here.webp", href:"https://amzn.to/4bn22W3" },
  { title:"Swimming", artist:"Mac Miller", image:"/music/swimming.webp", href:"https://amzn.to/4t0XYk9" },
  { title:"Mac Miller — Tiny Desk", artist:"Mac Miller", image:"/music/mac-miller-tiny-desk.webp", href:"https://amzn.to/4279sY5" },
  { title:"Cigarettes After Sex", artist:"Cigarettes After Sex", image:"/music/cigarettes-after-sex.webp", href:"https://www.amazon.com/Cigarettes-After-Sex-Winyl/dp/B07D9PF6V5/" },
  { title:"Melt", artist:"Not For Radio", image:"/music/melt.webp", href:"https://amzn.to/41fGlRB" },
  { title:"Submarine", artist:"The Marías", image:"/music/submarine.webp", href:"https://amzn.to/4smQOa5" },
  { title:"Hit Me Hard And Soft", artist:"Billie Eilish", image:"/music/hit-me-hard-and-soft.webp", href:"https://amzn.to/48PeZGf" },
  { title:"MTV Unplugged — Live", artist:"Zoé", image:"/music/zoe-mtv-unplugged.webp", href:"https://amzn.to/3TCy8a9" },
];

export default function MusicPage() {
  return (
    <div className={styles.room}>
      <header className={styles.intro}>
        <div>
          <p className={styles.mono}>The personal collection / 02</p>
          <h1>Music for<br /><em>the everyday.</em></h1>
        </div>
        <div className={styles.introAside}>
          <p>Playlists for the background.<br />Records worth turning over.</p>
          <Link href="/#library">← Back to Library</Link>
        </div>
      </header>
      <nav className={styles.collectionNav} aria-label="Music collections">
        <a href="#playlists"><span>01</span> Spotify playlists <span aria-hidden="true">↓</span></a>
        <a href="#vinyl"><span>02</span> Vinyl collection <span aria-hidden="true">↓</span></a>
        <span className={styles.navNote}>Digital + analog</span>
      </nav>
      <section className={styles.playlistsSection} id="playlists" aria-labelledby="playlists-title">
        <div className={styles.sectionHeading}><div><p className={styles.mono}>01 / Press play</p><h2 id="playlists-title">My playlists.</h2></div><p>Five playlists. Pick your mood.</p></div>
        <SpotifyPlaylists />
      </section>
      <section className={styles.recordsSection} id="vinyl" aria-labelledby="vinyl-title">
        <div className={styles.sectionHeading}><div><p className={styles.mono}>02 / The record crate</p><h2 id="vinyl-title">On vinyl.</h2></div><p>A collection to come back to.<br />Browse the sleeves. Find your next record.</p></div>
        <p className={styles.disclosure}>Some record links are affiliate links. I may earn a commission if you buy through them, at no extra cost to you.</p>
        <div className={styles.recordGrid}>
          {vinyl.map((item,index) => (
            <a className={styles.recordCard} href={item.href} target="_blank" rel="sponsored noreferrer" key={item.title} aria-label={`${item.title} by ${item.artist} — view vinyl on Amazon (opens in a new tab)`}>
              <div className={styles.recordStage}>
                <span className={styles.recordNumber}>{String(index + 1).padStart(2,"0")} / LP</span>
                <span className={styles.disc} aria-hidden="true"><span><img src={item.image} alt="" loading="lazy" /></span></span>
                <div className={styles.sleeve}><img src={item.image} alt="" loading="lazy" /></div>
              </div>
              <div className={styles.recordInfo}><p>{item.artist}</p><h3>{item.title}</h3><span className={styles.purchaseLink}>View vinyl on Amazon <span aria-hidden="true">↗</span></span></div>
            </a>
          ))}
        </div>
      </section>
      <aside className={styles.labNote}><span className={styles.mono}>More ways to play</span><p>There’s an experimental side, too.</p><a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">Explore my Lab ↗</a></aside>
      <nav className="related-paths" aria-label="Explore next"><Link href="/books">Books + Quotes →</Link><Link href="/#library">Back to Library →</Link></nav>
    </div>
  );
}
