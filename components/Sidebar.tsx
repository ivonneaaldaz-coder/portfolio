import Link from "next/link";

const links = [
  { label: "Overview", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Lab ↗", href: "https://lab.ivonnealdaz.com", external: true },
  { label: "Notes", href: "/notes" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <Link className="brand" href="/">IVONNE ALDAZ</Link>
        <p className="brand-sub">Founder / Strategist / Creative Technologist</p>
        <nav className="sidebar-nav" aria-label="Primary">
          {links.map((link, index) =>
            link.external ? (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                <span>{String(index + 1).padStart(2, "0")}</span>{link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>{link.label}
              </Link>
            )
          )}
        </nav>
      </div>

      <div className="sidebar-footer">
        <p><span className="status-dot" /> Available for select projects</p>
        <p>San Antonio, TX</p>
        <div className="social-row">
          <a href="mailto:hello@ivonnealdaz.com">Email ↗</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </div>
    </aside>
  );
}
