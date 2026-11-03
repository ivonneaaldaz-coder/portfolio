"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTORS = [
  ".section-heading",
  ".feature",
  ".home-case",
  ".experiment-card",
  ".footer-grid > div",
  ".case-row",
  ".practice-row",
  ".case-copy",
  ".case-visual",
  ".case-facts",
  ".project-detail-grid > div",
  ".project-detail-band > div",
  ".experiment-detail-grid > div",
  ".art-shop-item",
  ".travel-photo",
  ".note-row",
  ".writing-row",
  ".reference-card",
  ".archive-row",
  ".about-grid > div",
  ".art-v11 .gallery .work",
  ".travel-page .travel-photo",
  ".selected-work-company-section",
  ".selected-work-projects",
  ".site-main > :not(.home-minimal) .gallery > .work",
  ".site-main > :not(.home-minimal) .travel-gallery > *",
  ".site-main > :not(.home-minimal) .books-grid > *",
  ".site-main > :not(.home-minimal) .visual-references-grid > *",
  ".site-main > :not(.home-minimal) .about-editorial-cards > *",
  ".site-main > :not(.home-minimal) .overview-press-grid > div",
  ".site-main > :not(.home-minimal) .overview-writing-row"
].join(",");

export default function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Apply to every interior route, including pages without bespoke class names.
    // Leave the homepage hero and persistent navigation/player animations alone.
    const pageRoots = Array.from(document.querySelectorAll<HTMLElement>(".site-main > :not(.home-minimal):not(.site-footer)"));
    const genericTargets = pageRoots.flatMap(root => Array.from(root.querySelectorAll<HTMLElement>(":scope > section, :scope > article, :scope > .gallery, :scope > .page-content, :scope > .grid")));
    const targets = Array.from(new Set([...document.querySelectorAll<HTMLElement>(SELECTORS), ...genericTargets]));

    targets.forEach((el, index) => {
      el.classList.add("reveal-target");
      el.style.setProperty("--reveal-delay", `${Math.min((index % 5) * 55, 220)}ms`);
    });

    const explicitHeroBits = Array.from(document.querySelectorAll<HTMLElement>(
      ".hero-row h1,.hero-row p,.page-intro h1,.page-intro p,.art-intro h1,.art-intro>div,.travel-intro h1,.travel-intro p,.case-hero>*," +
      ".project-detail-hero>*,.experiment-detail-hero>*,.native-note header>*," +
      ".art-v11-opening,.travel-page-opening,.work-hybrid-page .selected-work-index h3,.about-editorial-hero h1,.about-editorial-hero p"
    ));
    const genericHeroBits = pageRoots.flatMap(root => Array.from(root.querySelectorAll<HTMLElement>("h1, :scope > header > p, :scope > .page-intro > p")).slice(0, 3));
    const heroBits = Array.from(new Set([...explicitHeroBits, ...genericHeroBits]));

    heroBits.forEach((el, index) => {
      if (el.closest(".home-minimal")) return;
      el.classList.add("page-enter");
      el.style.setProperty("--enter-delay", `${index * 70}ms`);
    });

    if (reduceMotion) {
      targets.forEach((el) => el.classList.add("is-visible"));
      heroBits.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    requestAnimationFrame(() => {
      heroBits.forEach((el) => el.classList.add("is-visible"));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
