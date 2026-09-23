import type { Metadata } from "next";
import { DigestForm } from "@/components/digest-form";

export const metadata: Metadata = {
  title: "Digest",
  description:
    "A stub email signup for the Viral Attention Map. No trade alerts. No mailing list unless a webhook is configured.",
};

export default function DigestPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-tape">
        Occasional note · not an alert
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
        Get the digest
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/85">
        A short note when the map&apos;s lenses change. No token picks. No prompts
        to act. This form is a stub: it checks the address and, only if this
        deploy has an HTTPS webhook, forwards JSON there. Without that webhook,
        nothing is stored.
      </p>
      <DigestForm />
    </div>
  );
}
