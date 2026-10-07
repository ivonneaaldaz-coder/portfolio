"use client";

import { useEffect, useState } from "react";

export default function SidebarSubscribe() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <div className="sidebar-subscribe">
      <button className="subscribe-trigger" type="button" onClick={() => setOpen(true)}>
        Subscribe →
      </button>

      {open ? (
        <div className="subscribe-overlay" role="dialog" aria-modal="true" aria-label="Subscribe">
          <button className="subscribe-backdrop" type="button" onClick={() => setOpen(false)} aria-label="Close subscribe form" />
          <div className="subscribe-modal">
            <button className="subscribe-close" type="button" onClick={() => setOpen(false)} aria-label="Close">×</button>
            <h2>Occasional notes from me.</h2>
            <p>Writing, projects, places, and whatever else I feel like sharing.</p>
            <a
              className="subscribe-substack"
              href="https://substack.com/@ivonnealdaz"
              target="_blank"
              rel="noreferrer"
            >
              Subscribe on Substack →
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
