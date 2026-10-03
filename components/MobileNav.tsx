"use client";

import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SidebarSubscribe from "@/components/SidebarSubscribe";

export default function MobileNav() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [closing, setClosing] = useState(false);
  const router = useRouter();

  const animateClose = (after?: () => void) => {
    const details = detailsRef.current;
    if (!details?.open) { after?.(); return; }
    setClosing(true);
    window.setTimeout(() => {
      details.open = false;
      setClosing(false);
      after?.();
    }, 300);
  };

  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    animateClose(() => router.push(href));
  };

  const closeExternal = () => animateClose();

  return (
    <header className="mobile-nav">
      <Link className="brand" href="/" onClick={(event) => go(event, "/")}>IVONNE ALDAZ</Link>
      <details ref={detailsRef} className={closing ? "is-closing" : ""}>
        <summary>Menu</summary>
        <div className="mobile-menu">
          <nav className="mobile-menu-links">
            <Link href="/" onClick={(event) => go(event, "/")}>Overview</Link>
            <Link href="/work" onClick={(event) => go(event, "/work")}>Work</Link>
            <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer" onClick={closeExternal}>
              Lab <span className="text-arrow" aria-hidden="true" />
            </a>
            <Link href="/library" onClick={(event) => go(event, "/library")}>Library</Link>
            <Link href="/about" onClick={(event) => go(event, "/about")}>About</Link>
          </nav>

          <div className="mobile-menu-footer">
            <SidebarSubscribe />
            <div className="mobile-socials">
              <a href="mailto:hello@ivonnealdaz.com" onClick={closeExternal}>Email <span className="text-arrow" aria-hidden="true" /></a>
              <a href="https://www.linkedin.com/in/ivonnealdaz/" target="_blank" rel="noreferrer" onClick={closeExternal}>LinkedIn <span className="text-arrow" aria-hidden="true" /></a>
              <a href="https://www.pinterest.com/ivonnealdaz/" target="_blank" rel="noreferrer" onClick={closeExternal}>Pinterest <span className="text-arrow" aria-hidden="true" /></a>
              <a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer" onClick={closeExternal}>GitHub <span className="text-arrow" aria-hidden="true" /></a>
              <a href="https://x.com/ivonnealdazz" target="_blank" rel="noreferrer" onClick={closeExternal}>X <span className="text-arrow" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </details>
    </header>
  );
}
