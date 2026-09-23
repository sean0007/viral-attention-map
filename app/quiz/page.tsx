import type { Metadata } from "next";
import { Quiz } from "@/components/quiz";

export const metadata: Metadata = {
  title: "Are you chasing attention or inventing it?",
  description:
    "Six questions. A shareable result about how you relate to hype. Not a signal to spend money.",
};

export default function QuizPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-tape">
        Six questions · no account
      </p>
      <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
        Are you chasing attention or inventing it?
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/80">
        The result is meant to be shared, not obeyed. It will not tell you what to
        do with money. Attention is not guaranteed money.
      </p>
      <div className="mt-10 max-w-3xl">
        <Quiz />
      </div>
    </div>
  );
}
