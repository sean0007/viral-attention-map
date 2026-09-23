import type { AttentionSource } from "@/lib/attention-sources";

export function SourceCard({ source }: { source: AttentionSource }) {
  return (
    <article className="flex h-full flex-col border border-line bg-ink-2 p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-archive">
          {source.index} · {source.platform}
        </p>
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
          Curated
        </span>
      </div>
      <h3 className="mt-3 font-display text-3xl leading-none tracking-tight">
        {source.pattern}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-paper/85">{source.signal}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{source.lesson}</p>
    </article>
  );
}
