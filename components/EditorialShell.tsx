"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import home from "./EditorialHome.module.css";
import styles from "./EditorialShell.module.css";
export default function EditorialShell({children}:{children:React.ReactNode}) {
  const pathname=usePathname();
  return <div className={`${home.home} ${styles.shell}`}>
    <a className={home.skipLink} href="#editorial-page">Skip to content</a>
    <div className={home.previewBar}><span>Editorial preview</span><a href={`https://ivonnealdaz.com${pathname}`} target="_blank" rel="noreferrer">Compare live version ↗</a></div>
    <header className={styles.header}><Link className={home.wordmark} href="/">IVONNE ALDAZ</Link><nav aria-label="Main navigation"><Link href="/#case-studies">Work</Link><Link href="/about" aria-current={pathname==='/about'?'page':undefined}>About</Link><Link href="/books" aria-current={pathname==='/books'?'page':undefined}>Books</Link><Link href="/music" aria-current={pathname==='/music'?'page':undefined}>Music</Link><a href="https://lab.ivonnealdaz.com" target="_blank" rel="noreferrer">Lab ↗</a></nav><ThemeToggle compact/></header>
    <main id="editorial-page">{children}</main>
    <footer className={styles.footer}><Link className={home.wordmark} href="/">IVONNE ALDAZ</Link><p>The World Is My Studio.</p><a href="mailto:hello@ivonnealdaz.com">hello@ivonnealdaz.com ↗</a></footer>
  </div>;
}
