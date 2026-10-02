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
  ".reference-card",
  ".archive-row",
  ".about-grid > div"
].join(",");

export default function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));

    targets.forEach((el, index) => {
      el.classList.add("reveal-target");
      el.style.setProperty("--reveal-delay", `${Math.min((index % 5) * 55, 220)}ms`);
    });

    const heroBits = document.querySelectorAll<HTMLElement>(
      ".hero-row h1,.hero-row p,.page-intro h1,.page-intro p,.art-intro h1,.art-intro>div,.travel-intro h1,.travel-intro p,.case-hero>*," +
      ".project-detail-hero>*,.experiment-detail-hero>*,.native-note header>*"
    );

    heroBits.forEach((el, index) => {
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
