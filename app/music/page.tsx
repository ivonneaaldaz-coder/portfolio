import Link from "next/link";

const playlists = [
  { title:"In Passing", note:"Songs for the things that linger.", className:"playlist-in-passing" },
  { title:"Drift", note:"Slow edges, late light, no urgency.", className:"playlist-drift" },
];

export default function MusicPage() {
  return (
    <section className="page section-pad music-page">
      <header className="collection-intro">
        <div>
          <h1>Music</h1>
          <p>Playlists, records, and a running soundtrack for everything else.</p>
        </div>
        <Link href="/library">Back to Library ←</Link>
      </header>

      <section className="music-section">
        <div className="section-heading">
          <h2 className="section-title small-title">Playlists</h2>
          <a href="https://open.spotify.com/user/ivonnealdaz" target="_blank" rel="noreferrer">Spotify profile ↗︎</a>
        </div>
        <div className="playlist-grid">
          {playlists.map((item) => (
            <a className="playlist-card" href="https://open.spotify.com/user/ivonnealdaz" target="_blank" rel="noreferrer" key={item.title}>
              <div className={"playlist-cover " + item.className}></div>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </a>
          ))}
          <a className="playlist-card playlist-more" href="https://open.spotify.com/user/ivonnealdaz" target="_blank" rel="noreferrer">
            <div className="playlist-cover"><span>→</span></div>
            <h3>More on Spotify</h3>
            <p>The rest of the archive.</p>
          </a>
        </div>
      </section>

      <section className="music-section record-section">
        <div className="section-heading">
          <h2 className="section-title small-title">Record shelf</h2>
        </div>
        <div className="record-shelf">
          <div className="record record-1"></div>
          <div className="record record-2"></div>
          <div className="record record-3"></div>
          <div className="record-note"><p>Records I love, short notes, and vinyl links will live here as the shelf grows.</p></div>
        </div>
      </section>
      <nav className="related-paths" aria-label="Explore next"><Link href="/books">Books + Quotes →</Link><Link href="/library">Library →</Link></nav>
    </section>
  );
}
