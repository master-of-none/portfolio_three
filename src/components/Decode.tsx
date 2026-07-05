"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "█▓▒░<>/\\|{}[]()=+*#%@$&!?~^;:01";

/**
 * Text that scrambles from terminal glyphs and resolves left-to-right.
 * SSR renders the real text (SEO-safe, no hydration mismatch); the
 * scramble starts client-side. Re-runs on hover. Static under reduced motion.
 */
export function Decode({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [display, setDisplay] = useState(text);
  const running = useRef(false);

  const scramble = useCallback(() => {
    if (running.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running.current = true;

    const chars = Array.from(text);
    let frame = 0;
    // each character locks in after ~2.2 frames of its index; ~45ms tick
    const interval = setInterval(() => {
      frame += 1;
      const out = chars.map((ch, i) => {
        if (ch === " " || ch === ".") return ch;
        if (frame > i * 2.2 + 3) return ch;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      });
      setDisplay(out.join(""));
      if (frame > chars.length * 2.2 + 3) {
        clearInterval(interval);
        setDisplay(text);
        running.current = false;
      }
    }, 45);
  }, [text]);

  useEffect(() => {
    const t = setTimeout(scramble, delay);
    return () => clearTimeout(t);
  }, [scramble, delay]);

  return (
    <span className={className} onMouseEnter={scramble} aria-label={text}>
      {display}
    </span>
  );
}
