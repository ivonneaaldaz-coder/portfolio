"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarSubscribe from "@/components/SidebarSubscribe";

const links = [
  { label: "Overview", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Lab ↗︎", href: "https://lab.ivonnealdaz.com", external: true },
  { label: "Index", href: "/notes" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div>
        <Link className="brand" href="/">IVONNE ALDAZ</Link>
        <p className="brand-sub">Strategist / Artist / Builder</p>

        <nav className="sidebar-nav" aria-label="Primary">
          {links.map((link, index) => {
            const active = !link.external && (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href));

            return link.external ? (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                <span>{String(index + 1).padStart(2, "0")}</span>{link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className={active ? "active" : ""}>
                <span>{String(index + 1).padStart(2, "0")}</span>{link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-status">
          <p><span className="status-dot" /> Available for select projects</p>
        </div>

        <div className="sidebar-footer">
          <SidebarSubscribe />

          <div className="sidebar-socials" aria-label="Social links">
            <a href="mailto:hello@ivonnealdaz.com">Email ↗︎</a>
            <a href="https://www.linkedin.com/in/ivonnealdaz/" target="_blank" rel="noreferrer">LinkedIn ↗︎</a>
            <a href="https://www.pinterest.com/ivonnealdaz/" target="_blank" rel="noreferrer">Pinterest ↗︎</a>
            <a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer">GitHub ↗︎</a>
            <a className="social-x" href="https://x.com/ivonnealdazz" target="_blank" rel="noreferrer">X ↗︎</a>
          </div>

          <a className="listen-link" href="https://open.spotify.com/user/ivonnealdaz" target="_blank" rel="noreferrer">
            Listen on Spotify ↗︎
          </a>
        </div>
      </div>
    </aside>
  );
}
