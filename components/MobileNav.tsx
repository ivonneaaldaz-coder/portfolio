import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function MobileNav() {
  return (
    <header className="mobile-nav">
      <Link className="brand" href="/">IVONNE ALDAZ</Link>
      <div className="mobile-nav-actions">
        <ThemeToggle compact />
        <details>
          <summary>Menu</summary>
          <div className="mobile-menu">
            <Link href="/">Overview</Link>
            <Link href="/work">Work</Link>
            <a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">Lab ↗</a>
            <Link href="/notes">Notes</Link>
            <Link href="/archive">Archive</Link>
            <Link href="/about">About</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
