"use client";

import { FormEvent, useEffect, useState } from "react";

export default function SidebarSubscribe() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Coming soon.");
  };

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
            <p className="eyebrow">NEWSLETTER</p>
            <h2>Occasional notes worth keeping.</h2>
            <p>Writing, projects, places, and things I’m thinking about.</p>
            <form onSubmit={submit}>
              <input type="email" name="email" placeholder="Email address" aria-label="Email address" required autoFocus />
              <button type="submit">Subscribe</button>
            </form>
            {message && <p className="subscribe-note" role="status">{message}</p>}
          </div>
        </div>
      ) : null}
    </div>
  );
}
