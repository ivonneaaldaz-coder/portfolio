"use client";

import { useEffect, useState } from "react";

type MoodboardTheme = "light" | "dark";

export default function MoodboardThemeToggle() {
  const [theme, setTheme] = useState<MoodboardTheme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("moodboard-theme");
    const next: MoodboardTheme = saved === "dark" ? "dark" : "light";
    setTheme(next);
    document.querySelector(".moodboard-app")?.setAttribute("data-moodboard-theme", next);
  }, []);

  const toggleTheme = () => {
    const next: MoodboardTheme = theme === "light" ? "dark" : "light";
    setTheme(next);
    window.localStorage.setItem("moodboard-theme", next);
    document.querySelector(".moodboard-app")?.setAttribute("data-moodboard-theme", next);
  };

  return (
    <button
      type="button"
      className="moodboard-theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch Moodboard to dark mode" : "Switch Moodboard to light mode"}
      title={theme === "light" ? "Dark mode" : "Light mode"}
    >
      <span aria-hidden="true">{theme === "light" ? "◐" : "◑"}</span>
      <span>{theme === "light" ? "Dark" : "Light"}</span>
    </button>
  );
}
