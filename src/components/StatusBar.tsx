"use client";

import { useEffect, useState } from "react";

const SECTIONS = ["about", "work", "projects", "stack", "contact"];

/** tmux-style statusline pinned to the bottom of the viewport. */
export function StatusBar() {
  const [section, setSection] = useState("~");
  const [time, setTime] = useState("");
  const [phosphor, setPhosphor] = useState("amber");

  // live IST clock — starts empty so SSR/client markup always match
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // track which section is on screen
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(`~/${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    const onTop = () => {
      if (window.scrollY < 200) setSection("~");
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // reflect phosphor changes made via ThemeToggle / terminal / palette
  useEffect(() => {
    const read = () =>
      setPhosphor(document.documentElement.getAttribute("data-phosphor") || "amber");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-phosphor"] });
    return () => mo.disconnect();
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-raised text-[11px] leading-none"
      role="status"
      aria-label="status bar"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-1.5 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="bg-accent px-1.5 py-0.5 font-medium text-bg">guest</span>
          <span className="hidden text-dim sm:inline">@shrikrishna.dev</span>
          <span className="truncate text-accent">{section}</span>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-dim">
          <span className="hidden sm:inline">◆ {phosphor}</span>
          <span suppressHydrationWarning>{time ? `IST ${time}` : "IST --:--:--"}</span>
        </div>
      </div>
    </div>
  );
}
