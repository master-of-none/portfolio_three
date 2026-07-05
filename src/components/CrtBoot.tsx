"use client";

import { useEffect, useState } from "react";

type Phase = "on" | "static" | "whack" | "clear";

/**
 * TV-whack boot: the screen powers on to rolling static, a little pixel
 * person walks in and smacks the set, the picture shakes — and clears.
 * Plays once per browser session; any click or keypress skips it;
 * skipped entirely under reduced motion.
 */
export function CrtBoot() {
  const [phase, setPhase] = useState<Phase | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("crtSeen") === "1";
      sessionStorage.setItem("crtSeen", "1");
    } catch {}
    if (reduce || seen) return;

    setPhase("on");
    const timers = [
      setTimeout(() => setPhase("static"), 250),
      setTimeout(() => setPhase("whack"), 2100),
      setTimeout(() => setPhase("clear"), 2400),
      setTimeout(() => setPhase(null), 3050),
    ];
    const skip = () => setPhase(null);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  if (!phase) return null;

  return (
    <div
      className={`fixed inset-0 z-100 overflow-hidden bg-black ${
        phase === "whack" ? "tv-shake" : ""
      } ${phase === "clear" ? "tv-fadeout" : ""}`}
      aria-hidden
    >
      {phase === "on" ? (
        <div className="crt-line" />
      ) : (
        <>
          <div className={`tv-noise ${phase === "clear" ? "tv-clearing" : ""}`} />
          <div className="tv-tear" style={{ top: "16%" }} />
          <div className="tv-tear" style={{ top: "52%", animationDelay: "-0.45s" }} />
          <div className="tv-roll" />

          {/* the repair person */}
          <svg
            viewBox="0 0 40 48"
            className={`tv-person ${phase !== "static" ? "tv-whacking" : ""} ${
              phase === "clear" ? "opacity-0 transition-opacity duration-300" : ""
            }`}
            fill="var(--color-accent)"
          >
            {/* whacking arm (front, pivots at the shoulder) */}
            <g className="tv-arm">
              <rect x="1" y="15" width="9" height="4" />
              <rect x="0" y="12" width="4" height="6" />
            </g>
            {/* head */}
            <rect x="10" y="2" width="10" height="10" />
            {/* eye (looks toward the screen) */}
            <rect x="12" y="6" width="2" height="2" fill="var(--color-bg)" />
            {/* body */}
            <rect x="9" y="14" width="14" height="15" />
            {/* back arm */}
            <rect x="23" y="15" width="4" height="11" />
            {/* legs */}
            <rect x="10" y="29" width="5" height="13" />
            <rect x="17" y="29" width="5" height="13" />
          </svg>

          {phase === "whack" && <div className="tv-flash" />}
        </>
      )}
    </div>
  );
}
