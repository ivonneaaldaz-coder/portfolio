"use client";

import { FormEvent, useState } from "react";

export default function SidebarSubscribe() {
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Coming soon.");
  };

  return (
    <div className="sidebar-subscribe">
      <form onSubmit={submit}>
        <input type="email" name="email" placeholder="Email address" aria-label="Email address" required />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p className="subscribe-note" role="status">{message}</p>}
    </div>
  );
}
