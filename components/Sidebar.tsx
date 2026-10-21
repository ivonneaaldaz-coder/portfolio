"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Lab ↗︎", href: "https://lab.ivonnealdaz.com", external: true },
  { label: "Library", href: "/#library" },
  { label: "Press", href: "/#press" },
  { label: "About", href: "/about" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleInternalClick = (href: string) => {
    if (href === "/about" && pathname === "/about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <aside className="sidebar">
      <div>
        <Link className="brand" href="/">IVONNE ALDAZ</Link>
        

        <nav className="sidebar-nav" aria-label="Primary">
          {links.map((link) => {
            const active = !link.external && link.href === pathname;
            return link.external ? (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={active ? "active" : ""}
                onClick={() => handleInternalClick(link.href)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-status">
          <p><span className="status-dot" /> Available for select projects</p>
        </div>
      </div>
    </aside>
  );
}
