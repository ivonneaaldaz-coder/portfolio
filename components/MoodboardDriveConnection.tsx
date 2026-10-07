"use client";

import { useEffect, useState } from "react";

export default function MoodboardDriveConnection() {
  const [connected, setConnected] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/google-drive/status", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setConnected(Boolean(data.connected)))
      .catch(() => setConnected(false));
  }, []);

  if (connected === null) {
    return <p className="moodboard-drive-status">Checking Google Drive…</p>;
  }

  return connected ? (
    <div className="moodboard-drive-connected">
      <span>Google Drive connected ✓</span>
      <a href="https://drive.google.com/drive/folders/1mXH8hxHdEHSaZv4nbN3pqbNNkIU1HXNz" target="_blank" rel="noreferrer">
        Open folder ↗︎
      </a>
    </div>
  ) : (
    <a className="experiment-launch" href="/api/google-drive/connect">
      Connect Google Drive →
    </a>
  );
}
