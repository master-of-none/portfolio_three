"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./ThemeToggle";

const NAV = ["about", "work", "projects", "stack", "contact"];

export function TopBar() {
  const [mac, setMac] = useState(true);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-bg/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-2.5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2 whitespace-nowrap">
          <span className="text-accent">{profile.shell}</span>
          <span className="text-dim">:~$</span>
          <span className="cursor hidden sm:inline-block" aria-hidden />
        </a>

        <nav className="hidden items-center gap-5 text-sm text-dim md:flex">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="transition-colors before:mr-1 before:text-accent before:opacity-0 before:transition-opacity before:content-['>'] hover:text-accent hover:before:opacity-100"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-palette"))}
            className="flex items-center gap-1.5 border border-rule px-2 py-1 text-xs text-dim transition-colors hover:border-accent hover:text-accent"
            aria-label="Open command palette"
          >
            <span className="hidden xs:inline">run</span>
            <kbd className="font-mono">{mac ? "⌘" : "^"}K</kbd>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
