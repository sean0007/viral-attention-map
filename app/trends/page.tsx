import type { Metadata } from "next";
import { attentionSources } from "@/lib/attention-sources";
import { getTrends } from "@/lib/trends";
import { BoardStatus } from "@/components/board-status";
import { PairCard } from "@/components/pair-card";
import { SourceCard } from "@/components/source-card";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Trends",
  description:
    "Solana pairs with paid DexScreener visibility, plus curated notes on how attention spreads. Educational only.",
};

export default async function TrendsPage() {
  const board = await getTrends();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-tape">
        Public market lens
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
        What is paying to be seen
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/85">
        This list is Solana pairs from DexScreener&apos;s public boost feed. A boost
        is a paid placement. It means someone spent money to be noticed. It does
        not mean a crowd found it on their own, and it does not mean the market is
        healthy. Liquidity and 24-hour volume are public context when the API
        provides them.
      </p>
      <div className="mt-8">
        <BoardStatus board={board} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {board.pairs.map((pair) => (
          <PairCard key={pair.id} pair={pair} sample={board.source === "sample"} />
        ))}
      </div>

      <section className="mt-16" aria-labelledby="culture-heading">
        <h2
          id="culture-heading"
          className="font-display text-4xl tracking-tight sm:text-5xl"
        >
          The other lens
        </h2>
        <p className="mt-3 max-w-2xl text-paper/80">
          Curated patterns from short video, posts, and forwards. These are not a
          live social feed. They are the shapes attention takes before anyone puts
          a number on them.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {attentionSources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      </section>
    </div>
  );
}
