import { formatCount, formatUsd } from "@/lib/format";
import type { AttentionPair } from "@/lib/trends";

export function PairCard({
  pair,
  sample,
}: {
  pair: AttentionPair;
  sample: boolean;
}) {
  return (
    <article className="flex h-full flex-col bg-paper p-5 text-ink shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stamp">
          Solana · {sample ? "invented" : "public feed"}
        </p>
        <span className="bg-tape px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-tape-ink">
          {sample ? "SAMPLE" : "PUBLIC"}
        </span>
      </div>
      <h3 className="mt-4 font-display text-4xl leading-none tracking-tight">
        {pair.symbol}
      </h3>
      <p className="mt-2 text-lg">{pair.name}</p>
      <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-stamp">
            Liquidity
          </dt>
          <dd className="mt-1 text-lg font-medium">{formatUsd(pair.liquidityUsd)}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-stamp">
            24h volume
          </dt>
          <dd className="mt-1 text-lg font-medium">{formatUsd(pair.volume24hUsd)}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-stamp">
            Paid boosts
          </dt>
          <dd className="mt-1 text-lg font-medium">{formatCount(pair.boosts)}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-ink/75">
        {sample
          ? "Invented example so the board still has a shape. Not a real market."
          : "Listed because DexScreener shows paid boosts. Visibility someone paid for is not a suggestion."}
      </p>
      {pair.chartUrl ? (
        <a
          href={pair.chartUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center self-start border-b border-stamp font-medium text-stamp"
        >
          View chart
          <span className="sr-only"> on DexScreener (opens in a new tab)</span>
        </a>
      ) : (
        <p className="mt-5 text-sm text-stamp">No chart link on sample cards.</p>
      )}
    </article>
  );
}
