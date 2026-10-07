"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = "G-065MH3533W";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

/**
 * Google Analytics 4 for every page on the site.
 * Page views on in-site navigation are recorded by GA4's enhanced measurement
 * ("page changes based on browser history events", on by default).
 * Also records a few key clicks as events.
 */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a || !window.gtag) return;
      const href = a.getAttribute("href") || "";
      const label = (a.textContent || "").trim().slice(0, 80);
      if (href.startsWith("mailto:")) window.gtag("event", "contact_click", { link_text: label, link_url: href });
      else if (href.startsWith("/work/")) window.gtag("event", "case_study_click", { link_text: label, link_url: href });
      else if (href.startsWith("/experiments/")) window.gtag("event", "experiment_click", { link_text: label, link_url: href });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}</Script>
    </>
  );
}
