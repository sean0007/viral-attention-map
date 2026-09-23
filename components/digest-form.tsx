"use client";

import { useState, type FormEvent } from "react";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "done"; message: string }
  | { state: "error"; message: string };

export function DigestForm() {
  const [email, setEmail] = useState("");
  const [watching, setWatching] = useState("");
  const [fax, setFax] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/digest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, watching, fax }),
      });
      const payload: unknown = await response.json().catch(() => null);
      const message =
        payload &&
        typeof payload === "object" &&
        "message" in payload &&
        typeof payload.message === "string"
          ? payload.message
          : "The stub could not read that response.";

      if (!response.ok) {
        setStatus({ state: "error", message });
        return;
      }

      setStatus({ state: "done", message });
      setEmail("");
      setWatching("");
    } catch {
      setStatus({
        state: "error",
        message: "The stub could not be reached. Try again in a moment.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid max-w-xl gap-5" noValidate>
      <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Fax
          <input
            tabIndex={-1}
            autoComplete="off"
            value={fax}
            onChange={(event) => setFax(event.target.value)}
          />
        </label>
      </div>
      <label className="grid gap-2">
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
          Email
        </span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={200}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="min-h-12 border border-line bg-ink-2 px-3 text-paper outline-none placeholder:text-muted/70"
        />
      </label>
      <label className="grid gap-2">
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted">
          What format are you watching? Optional.
        </span>
        <textarea
          name="watching"
          maxLength={280}
          rows={4}
          value={watching}
          onChange={(event) => setWatching(event.target.value)}
          placeholder="A sound, a joke, a repeated screenshot — not a ticker."
          className="border border-line bg-ink-2 px-3 py-3 text-paper outline-none placeholder:text-muted/70"
        />
      </label>
      <button
        type="submit"
        disabled={status.state === "sending"}
        className="inline-flex min-h-14 items-center justify-center bg-heat px-6 text-lg font-semibold text-[#fff7f2] hover:bg-[#a82b0c] disabled:opacity-60"
      >
        {status.state === "sending" ? "Sending…" : "Join the stub list"}
      </button>
      <p aria-live="polite" className="min-h-6 text-sm leading-relaxed">
        {status.state === "done" || status.state === "error" ? status.message : null}
      </p>
    </form>
  );
}
