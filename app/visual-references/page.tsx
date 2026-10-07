"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    PinUtils?: { build?: () => void };
  }
}

export default function VisualReferencesPage() {
  useEffect(() => {
    window.PinUtils?.build?.();
  }, []);

  return (
    <section className="page section-pad visual-index-page pinterest-reference-page">
      <header className="collection-intro">
        <div>
          <h1>Visual References</h1>
          <p>Images, spaces, colors, and details that have inspired me.</p>
        </div>
        <Link href="/library">Back to Library ←</Link>
      </header>

      <div className="pinterest-reference-header">
        <a href="https://www.pinterest.com/ivonnealdaz/_pins/" target="_blank" rel="noreferrer">
          View on Pinterest ↗︎
        </a>
      </div>

      <div className="pinterest-profile-wrap">
        <a
          className="pinterest-profile-widget"
          href="https://www.pinterest.com/ivonnealdaz/"
          data-pin-do="embedUser"
          data-pin-board-width="1400"
          data-pin-scale-height="1100"
          data-pin-scale-width="180"
        />
      </div>

      <nav className="related-paths" aria-label="Explore next">
        <Link href="/books">Books + Quotes →</Link>
        <Link href="/travel">Places →</Link>
      </nav>

      <Script
        id="pinterest-pinit"
        src="https://assets.pinterest.com/js/pinit.js"
        strategy="afterInteractive"
        onLoad={() => window.PinUtils?.build?.()}
      />
    </section>
  );
}
