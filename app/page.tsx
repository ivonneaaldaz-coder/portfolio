import Link from "next/link";

export const metadata = {
  title: "Ivonne A. Aldaz",
  description: "I make things — brands, art, experiences.",
};

const menu = [
  { n:"01.", label:"Start Here", href:"/overview" },
  { n:"02.", label:"Whitespace", href:"https://www.bywhitespace.com/", external:true },
  { n:"03.", label:"Good World Living", href:"https://www.goodworldliving.com/", external:true },
  { n:"04.", label:"The Lab", href:"https://lab.ivonnealdaz.com", external:true },
  { n:"05.", label:"Art Gallery", href:"/art" },
  { n:"06.", label:"Playlists", href:"/music" },
];

const essays = [
  { label:"Books That Have Transformed My Life →", href:"https://www.goodworldliving.com/articles/reading-recommendations" },
  { label:"Strategy without execution is just expensive advice →", href:"https://www.bywhitespace.com/blog/strategy-without-execution-expensive-advice" },
  { label:"Provence — how an art residency shifted my path →", href:"https://www.goodworldliving.com/articles/how-an-art-residency-in-provence-transformed-my-creative-path" },
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-grain" aria-hidden="true" />

      <header className="landing-header">
        <h1>Ivonne A. Aldaz</h1>
        <p>I make things – brands, art, experiences.</p>
      </header>

      <div className="landing-main-grid">
        <nav className="landing-menu" aria-label="Explore">
          {menu.map(item => {
            const content = <><span>{item.n}</span><strong>{item.label}</strong></>;
            return item.external ? (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{content}</a>
            ) : (
              <Link key={item.label} href={item.href}>{content}</Link>
            );
          })}
        </nav>

        <aside className="landing-lab-card">
          <p>I built a retro OS version of this site – draggable windows, a live chatroom, a snake game. Go down the rabbit hole.</p>
          <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">Open the Lab →</a>
        </aside>
      </div>

      <div className="landing-essays">
        {essays.map(item => (
          <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}</a>
        ))}
      </div>

      <footer className="landing-footer">
        <p className="landing-studio">The world is my studio.</p>
        <div className="landing-footer-row">
          <nav className="landing-socials" aria-label="Social links">
            <a href="https://www.instagram.com/ivonnealdazz/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://x.com/ivonnealdazz" target="_blank" rel="noreferrer">Twitter/X</a>
            <a href="https://www.linkedin.com/in/ivonnealdaz/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.pinterest.com/ivonnealdaz/" target="_blank" rel="noreferrer">Pinterest</a>
          </nav>
          <form className="landing-subscribe">
            <input type="email" name="email" placeholder="Email address" aria-label="Email address" />
            <button type="button">Subscribe</button>
          </form>
        </div>
        <p className="landing-copyright">© 2026 IVONNE ALDAZ, ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
