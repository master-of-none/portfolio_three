"use client";

import { useEffect, useState } from "react";

const PHOSPHORS = ["amber", "green", "ice"] as const;
type Phosphor = (typeof PHOSPHORS)[number];

export function applyPhosphor(p: string) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-phosphor", p);
  try {
    localStorage.setItem("phosphor", p);
  } catch {}
}

export function ThemeToggle() {
  const [phosphor, setPhosphor] = useState<Phosphor>("amber");

  useEffect(() => {
    const saved = (localStorage.getItem("phosphor") as Phosphor) || "amber";
    setPhosphor(saved);
    applyPhosphor(saved);
    const onExternal = () => {
      const cur = (document.documentElement.getAttribute("data-phosphor") as Phosphor) || "amber";
      setPhosphor(cur);
    };
    window.addEventListener("phosphor-change", onExternal);
    return () => window.removeEventListener("phosphor-change", onExternal);
  }, []);

  const cycle = () => {
    const next = PHOSPHORS[(PHOSPHORS.indexOf(phosphor) + 1) % PHOSPHORS.length];
    setPhosphor(next);
    applyPhosphor(next);
  };

  return (
    <button
      onClick={cycle}
      title={`phosphor: ${phosphor} — click to cycle`}
      aria-label={`Switch color theme (current: ${phosphor})`}
      className="flex items-center gap-1.5 border border-rule px-2 py-1 text-xs text-dim transition-colors hover:border-accent hover:text-accent"
    >
      <span
        className="inline-block h-2.5 w-2.5"
        style={{ background: "var(--color-accent)", boxShadow: "0 0 6px var(--color-accent)" }}
      />
      {phosphor}
    </button>
  );
}
