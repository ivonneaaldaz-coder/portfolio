import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Music", "Playlists, records, and current listening from Ivonne Aldaz.", "/music");

import Link from "next/link";
import SpotifyPlaylists from "@/components/SpotifyPlaylists";

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
    <section className="page section-pad music-page">
      <header className="collection-intro">
        <div>
          <h1>Music</h1>
          <p>Playlists, records, and whatever I’m listening to lately.</p>
        </div>
        <Link href="/#library">Back to Library ←</Link>
      </header>

      <section className="music-section">
        <div className="section-heading">
          <h2 className="section-title small-title">Playlists</h2>
          <a href="https://open.spotify.com/user/ivonnealdaz" target="_blank" rel="noreferrer">Spotify profile ↗︎</a>
        </div>
        <SpotifyPlaylists />
      </section>

      <section className="music-section record-section">
        <div className="section-heading"><h2 className="section-title small-title">Favorite vinyls</h2></div>
        <div className="vinyl-grid">
          {vinyl.map((item) => (
            <a className="vinyl-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}>
              <div className="vinyl-cover"><img src={item.image} alt="" /></div>
              <h3>{item.title}</h3>
              <p>{item.artist} <span>↗︎</span></p>
            </a>
          ))}
        </div>
      </section>

      <nav className="related-paths" aria-label="Explore next"><Link href="/books">Books + Quotes →</Link><Link href="/library">Library →</Link></nav>
    </section>
  );
}
