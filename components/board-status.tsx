import { formatStamp } from "@/lib/format";
import type { TrendsBoard } from "@/lib/trends";

export function BoardStatus({ board }: { board: TrendsBoard }) {
  if (board.source === "sample") {
    return (
      <div role="status" className="border border-tape bg-tape px-4 py-3 text-tape-ink">
        <p className="font-mono text-[11px] tracking-[0.18em]">SAMPLE</p>
        <p className="mt-1 font-medium">{board.reason}</p>
        <p className="mt-1 text-sm">
          These cards are invented examples. They are not real markets and they have no chart links. Checked {formatStamp(board.fetchedAt)}.
        </p>
      </div>
    );
  }

  return (
    <div role="status" className="border border-line px-4 py-3">
      <p className="font-mono text-[11px] tracking-[0.18em] text-archive">PUBLIC FEED</p>
      <p className="mt-1 text-sm leading-relaxed text-paper/85">
        DexScreener boosts are paid visibility, refreshed about every two minutes.
        Names, liquidity, and volume are context — not a list of what to do. Checked{" "}
        {formatStamp(board.fetchedAt)}.
      </p>
    </div>
  );
}
