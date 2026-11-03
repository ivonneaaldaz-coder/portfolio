"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { MouseEvent, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";


export default function MobileNav() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [closing, setClosing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [playOpen, setPlayOpen] = useState(false);
  const closingRef = useRef(false);
  const workGroupRef = useRef<HTMLDetailsElement>(null);
  const playGroupRef = useRef<HTMLDetailsElement>(null);
  const resetGroups = () => { setWorkOpen(false); setPlayOpen(false); };
  const router = useRouter();
  const pathname = usePathname();

  const animateClose = (after?: () => void) => {
    const details = detailsRef.current;
    if (!menuOpen) { after?.(); return; }
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    window.setTimeout(() => {
      setMenuOpen(false);
      resetGroups();
      closingRef.current = false;
      setClosing(false);
      after?.();
    }, 300);
  };

  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    // Navigate on the first tap; never defer routing until the menu animation ends.
    event.preventDefault();
    const current = pathname;
    const destination = href.split("#")[0];
    if (current === destination && !href.includes("#")) window.scrollTo({top:0,behavior:"smooth"});
    else router.push(href);
    animateClose();
  };

  const closeExternal = () => animateClose();

  const toggleMenu = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (closingRef.current) return;
    const details = detailsRef.current;
    if (!details) return;
    if (menuOpen) animateClose();
    else { resetGroups(); setMenuOpen(true); }
  };

  return (
    <header className="mobile-nav">
      <Link className="brand" href="/" onClick={(event) => go(event, "/")}>IVONNE ALDAZ</Link>
      <div className="mobile-header-actions">
        <details ref={detailsRef} open={menuOpen} className={closing ? "is-closing" : ""}>
        <summary onClick={toggleMenu}>{menuOpen ? "Close" : "Menu"}</summary>
        <div className="mobile-menu">
          <nav className="mobile-menu-links">
            <Link href="/" onClick={(event) => go(event, "/")}>Home</Link>
            <details ref={workGroupRef} open={workOpen} className="mobile-work-group"><summary onClick={(event) => { event.preventDefault(); setWorkOpen(!workOpen); setPlayOpen(false); }}>Work <span aria-hidden="true" className="mobile-disclosure-arrow">+</span></summary><div className="mobile-work-links"><Link href="/work" onClick={(event) => go(event, "/work")}>Projects</Link><Link href="/work#case-studies" onClick={(event) => go(event, "/work#case-studies")}>Case Studies</Link><Link href="/work#press" onClick={(event) => go(event, "/work#press")}>Press + Speaking</Link><Link href="/work#writing" onClick={(event) => go(event, "/work#writing")}>Writing</Link></div></details>

            <details ref={playGroupRef} open={playOpen} className="mobile-library-group"><summary onClick={(event) => { event.preventDefault(); setPlayOpen(!playOpen); setWorkOpen(false); }}>Play <span aria-hidden="true" className="mobile-disclosure-arrow">+</span></summary><div className="mobile-library-links">
              <Link href="/art" onClick={(event) => go(event, "/art")}>Art</Link>
              <Link href="/travel" onClick={(event) => go(event, "/travel")}>Travel</Link>
              <Link href="/music" onClick={(event) => go(event, "/music")}>Music</Link>
              <Link href="/books" onClick={(event) => go(event, "/books")}>Books + Quotes</Link>
              <Link href="/visual-references" onClick={(event) => go(event, "/visual-references")}>Visual References</Link>
            </div></details>
            <Link href="/about" onClick={(event) => go(event, "/about")}>About</Link>
          </nav>

          <div className="mobile-menu-footer">
            <a href="mailto:hello@ivonnealdaz.com">hello@ivonnealdaz.com <span className="external-arrow" aria-hidden="true">↗</span></a>
            <div className="mobile-socials">
              <a href="https://www.instagram.com/ivonnealdaz/" target="_blank" rel="noreferrer" onClick={closeExternal}>Instagram <span className="external-arrow" aria-hidden="true">↗</span></a>
              <a href="https://www.linkedin.com/in/ivonnealdaz/" target="_blank" rel="noreferrer" onClick={closeExternal}>LinkedIn <span className="external-arrow" aria-hidden="true">↗</span></a>
              <a href="https://www.pinterest.com/ivonnealdaz/" target="_blank" rel="noreferrer" onClick={closeExternal}>Pinterest <span className="external-arrow" aria-hidden="true">↗</span></a>
              <a href="https://github.com/ivonneaaldaz-coder" target="_blank" rel="noreferrer" onClick={closeExternal}>GitHub <span className="external-arrow" aria-hidden="true">↗</span></a>
              <a href="https://x.com/ivonnealdazz" target="_blank" rel="noreferrer" onClick={closeExternal}>X <span className="external-arrow" aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
        </details>
        <ThemeToggle />
      </div>
    </header>
  );
}
