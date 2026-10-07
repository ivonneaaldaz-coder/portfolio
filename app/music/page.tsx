import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Music", "Playlists, records, and current listening from Ivonne Aldaz.", "/music");

import Link from "next/link";
import SpotifyPlaylists from "@/components/SpotifyPlaylists";

const vinyl = [
  { title:"Dark Side of the Moon", artist:"Pink Floyd", image:"https://cdn.prod.website-files.com/5fc29a3f06388f6a1521d589/68d9b114266423148faf6cff_Dark%20side%20of%20the%20moon.jpg", href:"https://amzn.to/47b4A72" },
  { title:"Wish You Were Here", artist:"Pink Floyd", image:"https://cdn.prod.website-files.com/5fc29a3f06388f6a1521d589/69bce84f9560916bf024c281_wish%20you%20were%20here%20album%20cover.png", href:"https://amzn.to/4bn22W3" },
  { title:"Swimming", artist:"Mac Miller", image:"https://cdn.prod.website-files.com/5fc29a3f06388f6a1521d589/69be431bfe2e06d5ef282307_swimming%20mac%20miller.jpg", href:"https://amzn.to/4t0XYk9" },
  { title:"Mac Miller — Tiny Desk", artist:"Mac Miller", image:"https://cdn.prod.website-files.com/5fc29a3f06388f6a1521d589/69e7bc329d83aeacab10307b_mac%20miller%20-%20tiny%20desk%20-%20good%20world%20living.png", href:"https://amzn.to/4279sY5" },
  { title:"Cigarettes After Sex", artist:"Cigarettes After Sex", image:"https://cdn.prod.website-files.com/5fc29a3f06388f6a1521d589/69bce4f959a8e165062030a3_Cigarettes_After_Sex_%28album%20cover%29.svg", href:"https://www.amazon.com/Cigarettes-After-Sex-Winyl/dp/B07D9PF6V5/" },
  { title:"Melt", artist:"Not For Radio", image:"https://cdn.prod.website-files.com/5fc29a3f06388f6a1521d589/69bce55e3cccc0a69177d23d_not-for-radio%20vinyl%20cover.jpg", href:"https://amzn.to/41fGlRB" },
  { title:"Submarine", artist:"The Marías", image:"https://cdn.prod.website-files.com/5fc29a3f06388f6a1521d589/68d9b27d159fcd6a75f1f04c_the%20marias%20submarine_ivonne-aldaz.jpg", href:"https://amzn.to/4smQOa5" },
  { title:"Hit Me Hard And Soft", artist:"Billie Eilish", image:"https://cdn.prod.website-files.com/5fc29a3f06388f6a1521d589/69e7b79ccc2b27051dc62f69_billie-eilish-album_Good%20World%20Living.jpg", href:"https://amzn.to/48PeZGf" },
  { title:"MTV Unplugged — Live", artist:"Zoé", image:"https://cdn.prod.website-files.com/5fc29a3f06388f6a1521d589/69e7b7cb579a4763787f1b77_zoe-good%20world%20living.jpg", href:"https://amzn.to/3TCy8a9" },
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
