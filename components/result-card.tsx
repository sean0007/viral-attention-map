import Link from "next/link";
import { ShareActions } from "@/components/share-actions";
import type { QuizResult } from "@/lib/quiz";

export function ResultCard({ result }: { result: QuizResult }) {
  return (
    <article className="bg-paper px-6 py-8 text-ink shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:px-10 sm:py-12">
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stamp">
        {result.kicker}
      </p>
      <h1 className="mt-3 font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
        {result.title}
      </h1>
      <p className="mt-4 text-2xl italic text-stamp">{result.tell}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed">{result.body}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/70">
        A reflection, not a signal to spend money. Attention is not guaranteed money.
      </p>
      <div className="mt-8 text-ink">
        <ShareActions
          text={result.shareText}
          path={`/quiz/result/${result.id}`}
          primaryLabel="Share this result"
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link href="/quiz" className="underline underline-offset-4">
          Retake the quiz
        </Link>
        <Link href="/trends" className="underline underline-offset-4">
          Look at the board
        </Link>
      </div>
    </article>
  );
}
