"use client";

import Link from "next/link";
import { useRef } from "react";
import SidebarSubscribe from "@/components/SidebarSubscribe";

export default function MobileNav() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (detailsRef.current) detailsRef.current.open = false; };

  return (
    <header className="mobile-nav">
      <Link className="brand" href="/" onClick={closeMenu}>IVONNE ALDAZ</Link>
      <details ref={detailsRef}>
        <summary>Menu</summary>
        <div className="mobile-menu">
          <nav className="mobile-menu-links">
            <Link href="/" onClick={closeMenu}>Overview</Link>
            <Link href="/work" onClick={closeMenu}>Work</Link>
            <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer" onClick={closeMenu}>
              Lab <span className="text-arrow">↗</span>
            </a>
            <Link href="/notes" onClick={closeMenu}>Notes</Link>
            <Link href="/archive" onClick={closeMenu}>Archive</Link>
            <Link href="/about" onClick={closeMenu}>About</Link>
          </nav>

          <div className="mobile-menu-footer">
            <SidebarSubscribe />
            <div className="mobile-socials">
              <a href="mailto:hello@ivonnealdaz.com">Email <span className="text-arrow">↗</span></a>
              <a href="https://www.linkedin.com/in/ivonnealdaz/" target="_blank" rel="noreferrer">LinkedIn <span className="text-arrow">↗</span></a>
              <a href="https://www.pinterest.com/ivonnealdaz/" target="_blank" rel="noreferrer">Pinterest <span className="text-arrow">↗</span></a>
              <a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer">GitHub <span className="text-arrow">↗</span></a>
              <a href="https://x.com/ivonnealdazz" target="_blank" rel="noreferrer">X <span className="text-arrow">↗</span></a>
            </div>
          </div>
        </div>
      </details>
    </header>
  );
}
