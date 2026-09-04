"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("landry-theme");
    const enabled = saved === "dark";
    setDark(enabled);
    document.documentElement.classList.toggle("dark-mode", enabled);
  }, []);

  function toggle() {
    const enabled = !dark;
    setDark(enabled);
    localStorage.setItem("landry-theme", enabled ? "dark" : "light");
    document.documentElement.classList.toggle("dark-mode", enabled);
  }

  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={dark ? "Activer le thème clair" : "Activer le thème sombre"}>{dark ? "☼" : "◐"}</button>;
}
