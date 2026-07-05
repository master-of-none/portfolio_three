"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { socials } from "@/content/socials";
import { applyPhosphor } from "./ThemeToggle";

type Action = { id: string; label: string; hint: string; run: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const actions: Action[] = useMemo(() => {
    const nav = ["about", "work", "projects", "stack", "contact"].map((s) => ({
      id: `go-${s}`,
      label: `go to ${s}`,
      hint: "section",
      run: () => go(s),
    }));
    const links = socials.map((s) => ({
      id: `link-${s.label}`,
      label: s.label === "Résumé" ? "download résumé" : `open ${s.label}`,
      hint: s.handle,
      run: () =>
        s.href.startsWith("/")
          ? (window.location.href = s.href)
          : window.open(s.href, "_blank", "noopener"),
    }));
    const themes = ["amber", "green", "ice"].map((t) => ({
      id: `theme-${t}`,
      label: `theme: ${t}`,
      hint: "phosphor",
      run: () => {
        applyPhosphor(t);
        window.dispatchEvent(new Event("phosphor-change"));
      },
    }));
    return [...nav, ...links, ...themes];
  }, [go]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q),
    );
  }, [query, actions]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const runActive = () => {
    filtered[active]?.run();
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[15vh] backdrop-blur-md"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg border border-rule bg-raised shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="flex items-center gap-2 border-b border-rule px-3 py-2.5">
          <span className="text-accent">$</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                runActive();
              }
            }}
            placeholder="jump to… (try 'projects', 'résumé', 'theme')"
            className="flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-faint"
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className="border border-rule px-1.5 py-0.5 text-[10px] text-dim">esc</kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto py-1">
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-sm text-dim">no matches.</li>
          )}
          {filtered.map((a, i) => (
            <li key={a.id}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  a.run();
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                  i === active ? "bg-accent/15 text-accent" : "text-fg/90"
                }`}
              >
                <span>{a.label}</span>
                <span className="text-[11px] text-faint">{a.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
