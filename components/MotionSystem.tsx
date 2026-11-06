"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// A single observer-driven entrance system for every interior page.
// Web Animations avoids older CSS transitions and component-specific styles
// overriding the reveal (the reason some pages appeared static).
const ITEMS = [
  ".art-v11-opening", ".art-v11 .gallery .work",
  ".art-v11 .editorial-row", ".art-v11 .history-item",
  ".travel-page-opening", ".travel-photo",
  ".quotes-world .quote-entry", ".book-cover-grid > *", ".book-detail",
  ".overview-expanded-list > *", ".overview-press-grid > div", ".overview-writing-head",
  ".selected-work-projects", ".selected-work-case",
  ".selected-work-brand-grid > *",
  ".selected-work-company-section", ".overview-press-row",
  ".overview-writing-row", ".writing-row", ".note-row",
  ".reference-card", ".archive-row", ".experiment-card",
  ".case-row", ".case-visual", ".case-copy", ".case-facts",
  ".practice-row", ".section-heading", ".about-grid > div",
  ".project-detail-grid > div", ".project-detail-band > div",
  ".experiment-detail-grid > div", ".art-shop-item",
  ".footer-grid > div",
  ".about-editorial-hero", ".about-editorial-row",
  ".about-story-inline", ".about-editorial-feature",
  ".about-editorial-feature .about-editorial-cards > *",
  ".about-editorial-item", ".about-editorial-tags",
  ".about-editorial > section", ".about-editorial > div",
].join(",");

const INTERIOR = ".site-main > :not(.home-minimal):not(.site-footer)";

export default function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const roots = Array.from(document.querySelectorAll<HTMLElement>(INTERIOR));
    if (!roots.length) return;

    // Reveal each interior route as a whole, including sections that do not match
    // individual item selectors (case-study copy, tabs and editorial layouts).
    const rootAnimations = roots.map(root => root.animate(
      [{ opacity: 0, transform: "translate3d(0, 10px, 0)" },
       { opacity: 1, transform: "translate3d(0, 0, 0)" }],
      { duration: 780, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" }
    ));
    rootAnimations.forEach(animation => { animation.finished.catch(() => {}).finally(() => animation.cancel()); });
    const seen = new WeakSet<HTMLElement>();
    const pending = new WeakSet<HTMLElement>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        if (seen.has(el)) continue;
        seen.add(el);
        const delay = Number(el.dataset.motionDelay || "0");
        const animation = el.animate(
          [{ opacity: 0, transform: "translate3d(0, 12px, 0)" },
           { opacity: 1, transform: "translate3d(0, 0, 0)" }],
          { duration: 1350, delay, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" }
        );
        animation.finished.catch(() => {}).finally(() => {
          // Clear only this reveal animation, preserving hover and other effects.
          animation.cancel();
        });
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });

    const register = (el: HTMLElement, index: number) => {
      if (pending.has(el) || el.closest(".home-minimal, .viewer, [role=dialog]")) return;
      // Avoid nested animation layers competing for the same transform.
      if (el.closest("[data-motion-item]")) return;
      pending.add(el);
      el.dataset.motionItem = "true";
      el.dataset.motionDelay = String(Math.min(index % 4 * 55, 165));
      observer.observe(el);
    };

    const scan = () => {
      let index = 0;
      for (const root of roots) {
        const headings = Array.from(root.querySelectorAll<HTMLElement>("h1, section > h2, section > h3"));
        const sections = Array.from(root.querySelectorAll<HTMLElement>("section > article, section > .grid > *, section > .gallery > *, .about-editorial > .about-editorial-row, .about-editorial > .about-editorial-feature, .about-editorial > .about-story-inline"));
        const explicit = Array.from(root.querySelectorAll<HTMLElement>(ITEMS));
        // Animate the whole case-study card once: animating its visual and copy
        // independently exposed overlapping shadows and borders during the fade.
        const all = [...new Set([...explicit, ...sections, ...headings])];
        all.forEach(el => register(el, index++));
      }
    };

    scan();
    const mutations = new MutationObserver(records => {
      if (records.some(record => Array.from(record.addedNodes).some(node =>
        node instanceof HTMLElement && !node.hasAttribute("data-motion-item")))) scan();
    });
    roots.forEach(root => mutations.observe(root, { childList: true, subtree: true }));
    return () => { observer.disconnect(); mutations.disconnect(); rootAnimations.forEach(animation => animation.cancel()); };
  }, [pathname]);

  return null;
}
