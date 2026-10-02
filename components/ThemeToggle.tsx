"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("portfolio-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    setReady(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
  };

  return (
    <button
      type="button"
      className={compact ? "theme-toggle theme-toggle-compact" : "theme-toggle"}
      onClick={toggle}
      aria-label={"Switch to " + (theme === "dark" ? "light" : "dark") + " mode"}
      title={"Switch to " + (theme === "dark" ? "light" : "dark") + " mode"}
      aria-pressed={theme === "dark"}
    >
      <span className="theme-switch" aria-hidden="true">
        <span className="theme-switch-thumb" />
      </span>
      <span className="theme-label">{ready ? (theme === "dark" ? "Dark" : "Light") : "Theme"}</span>
    </button>
  );
}
