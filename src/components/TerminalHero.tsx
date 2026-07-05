"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { profile } from "@/content/profile";
import { bootLines, runCommand, type Line, type Tone } from "@/lib/commands";
import { applyPhosphor } from "./ThemeToggle";
import { Decode } from "./Decode";

const totalBootChars = bootLines.reduce((n, l) => n + Math.max(l.text.length, 1), 0);

const toneClass: Record<Tone, string> = {
  fg: "text-fg",
  dim: "text-dim",
  accent: "text-accent",
  high: "text-high",
  ok: "text-ok",
};

function OutLine({ line }: { line: Line }) {
  if (!line) return null;
  return (
    <div className={`whitespace-pre-wrap wrap-break-word ${toneClass[line.tone ?? "fg"]}`}>
      {line.text || " "}
    </div>
  );
}

export function TerminalHero() {
  const [typedChars, setTypedChars] = useState(0);
  const [history, setHistory] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [recall, setRecall] = useState<string[]>([]);
  const [recallIdx, setRecallIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // boot sequence typed character-by-character (instant when reduced motion is on)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTypedChars(totalBootChars);
      return;
    }
    setTypedChars(0);
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setTypedChars((n) => {
          if (n >= totalBootChars) {
            clearInterval(interval);
            return n;
          }
          return n + 1;
        });
      }, 14);
    }, 400);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, []);

  // derive visible boot lines from the character count
  const booted: Line[] = [];
  let remaining = typedChars;
  for (const line of bootLines) {
    if (remaining <= 0) break;
    const len = Math.max(line.text.length, 1);
    if (remaining >= len) {
      booted.push(line);
      remaining -= len;
    } else {
      booted.push({ ...line, text: line.text.slice(0, remaining) });
      remaining = 0;
    }
  }
  const bootDone = typedChars >= totalBootChars;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const ctx = {
    navigate: (id: string) =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    setTheme: (t: string) => {
      applyPhosphor(t);
      window.dispatchEvent(new Event("phosphor-change"));
    },
    clear: () => setHistory([]),
    open: (url: string) => {
      if (url.startsWith("/")) window.location.href = url;
      else window.open(url, "_blank", "noopener");
    },
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    const result = runCommand(value, ctx);
    setHistory((prev) => [...prev, ...result.lines]);
    setRecall((prev) => [value, ...prev].slice(0, 30));
    setRecallIdx(-1);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(recallIdx + 1, recall.length - 1);
      if (recall[next] !== undefined) {
        setRecallIdx(next);
        setValue(recall[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = recallIdx - 1;
      if (next < 0) {
        setRecallIdx(-1);
        setValue("");
      } else {
        setRecallIdx(next);
        setValue(recall[next]);
      }
    }
  };

  return (
    <section
      id="top"
      className="relative px-5 pb-16 pt-24 sm:px-8 sm:pt-28 md:pb-24 md:pt-36"
    >
      <div className="mx-auto max-w-5xl">
        {/* identity block */}
        <p className="prompt text-sm text-dim">whoami</p>
        <h1 className="mt-3 font-display text-5xl leading-[0.95] text-fg glow sm:text-7xl md:text-8xl">
          <Decode text={profile.name} delay={1150} />
        </h1>
        <p className="mt-4 max-w-2xl text-base text-fg sm:text-lg">
          <span className="text-accent">{profile.role}</span>
          <span className="mx-2 text-faint">·</span>
          <span className="text-dim">{profile.location}</span>
        </p>
        <p className="mt-3 max-w-2xl text-sm text-dim sm:text-base">{profile.tagline}</p>

        {/* interactive terminal */}
        <div className="panel mt-8 max-w-2xl">
          <div className="flex items-center justify-between border-b border-rule px-3 py-1.5 text-xs text-dim">
            <span>{profile.shell} — zsh</span>
            <span className="flex gap-1.5" aria-hidden>
              <i className="inline-block h-2.5 w-2.5 border border-rule" />
              <i className="inline-block h-2.5 w-2.5 border border-rule" />
              <i className="inline-block h-2.5 w-2.5 border border-accent bg-accent/20" />
            </span>
          </div>
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="max-h-64 min-h-34 overflow-y-auto px-3 py-2.5 text-[13px] leading-relaxed sm:text-sm"
          >
            {booted.map((line, i) => (
              <OutLine key={`b${i}`} line={line} />
            ))}
            {bootDone && (
              <div className="text-dim">
                type <span className="text-accent">help</span> to explore, or{" "}
                <span className="text-accent">ls</span> to look around.
              </div>
            )}
            {history.map((line, i) => (
              <OutLine key={`h${i}`} line={line} />
            ))}
            <form onSubmit={submit} className="mt-1 flex items-center gap-2">
              <span className="shrink-0 text-accent">{profile.shell}:~$</span>
              <span className="flex min-w-0 flex-1 items-center">
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  size={Math.max(value.length, 1)}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="terminal command input"
                  className="min-w-[1ch] bg-transparent p-0 text-fg caret-transparent outline-none"
                />
                <span className="cursor -ml-1.5" aria-hidden />
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
