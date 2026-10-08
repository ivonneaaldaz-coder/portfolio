"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    PinUtils?: { build?: () => void };
  }
}

export default function PinterestProfileFallback() {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-pinterest-widget="true"]');

    if (existing) {
      window.PinUtils?.build?.();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.pinterest.com/js/pinit.js";
    script.async = true;
    script.defer = true;
    script.dataset.pinterestWidget = "true";
    script.onload = () => window.PinUtils?.build?.();
    document.body.appendChild(script);
  }, []);

  return (
    <div className="pinterest-profile-fallback">
      <p>Live Pinterest feed temporarily unavailable. Showing my latest public saves instead.</p>
      <div className="pinterest-profile-widget-shell">
        <a
          data-pin-do="embedUser"
          data-pin-board-width="1000"
          data-pin-scale-height="680"
          data-pin-scale-width="120"
          href="https://www.pinterest.com/ivonnealdaz/"
        />
      </div>
    </div>
  );
}
