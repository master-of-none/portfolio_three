"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      onClick={copy}
      className="group flex items-center gap-3 border border-rule px-3 py-2 text-sm transition-colors hover:border-accent"
      aria-label={`Copy email ${email}`}
    >
      <span className="text-accent">✉</span>
      <span className="text-fg/90 group-hover:text-accent">{email}</span>
      <span className="text-xs text-faint">{copied ? "copied ✓" : "click to copy"}</span>
    </button>
  );
}
