"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/content/profile";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [note, setNote] = useState<string>("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio · message from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setNote("all fields are required.");
      return;
    }
    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; fallback?: boolean };
      if (res.ok && data.ok) {
        setStatus("sent");
        setNote("message delivered. talk soon.");
        setForm({ name: "", email: "", message: "" });
      } else if (data.fallback) {
        setStatus("idle");
        setNote("opening your mail client…");
        mailtoFallback();
      } else {
        throw new Error("send failed");
      }
    } catch {
      setStatus("error");
      setNote("couldn't reach the server — opening your mail client instead.");
      mailtoFallback();
    }
  };

  const field =
    "w-full border border-rule bg-sunk px-3 py-2 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-accent";

  return (
    <form onSubmit={submit} className="panel space-y-3 p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs text-dim">name</span>
          <input className={field} value={form.name} onChange={set("name")} placeholder="Ada Lovelace" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-dim">email</span>
          <input
            className={field}
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="ada@example.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-xs text-dim">message</span>
        <textarea
          className={`${field} min-h-[7rem] resize-y`}
          value={form.message}
          onChange={set("message")}
          placeholder="what are you building?"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="border border-accent px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-bg disabled:opacity-50"
        >
          {status === "sending" ? "sending …" : "send message"}
        </button>
        {note && (
          <span
            className={`text-xs ${
              status === "error" ? "text-high" : status === "sent" ? "text-ok" : "text-dim"
            }`}
          >
            {note}
          </span>
        )}
      </div>
    </form>
  );
}
