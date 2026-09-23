import Link from "next/link";
import { attentionSources } from "@/lib/attention-sources";
import { SHARE_TEXT } from "@/lib/copy";
import { getTrends } from "@/lib/trends";
import { BoardStatus } from "@/components/board-status";
import { PairCard } from "@/components/pair-card";
import { ShareActions } from "@/components/share-actions";
import { SourceCard } from "@/components/source-card";

export const revalidate = 120;

const lessons = [
  {
    title: "Repetition is the signal",
    body: "A thing is getting attention when strangers repeat it. One post is a claim. Two unrelated copies are a pattern.",
  },
  {
    title: "Payment is also attention",
    body: "A boost is attention someone bought. Bought attention is still attention. It is not an independent discovery, and it is not a reason to spend your own money.",
  },
  {
    title: "Price is the souvenir",
    body: "If a number moves after the crowd shows up, that number is late. Late is not the same as profitable. Memecoins often go to zero after the noise.",
  },
];

export default async function HomePage() {
  const board = await getTrends();
  const pairs = board.pairs.slice(0, 4);
  const sources = attentionSources.slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-tape">
        Free · no wallet · no orders
      </p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
        Attention moves first.
        <span className="mt-2 block italic text-tape">Price is late.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85">
        A free board of what is pulling eyes: public Solana market chatter, plus
        the cultural patterns that make a clip travel. Attention is not guaranteed
        money. Nothing on this site places an order.
      </p>
      <div className="mt-8">
        <ShareActions text={SHARE_TEXT} path="/" primaryLabel="Share the map" />
      </div>
      <dl className="mt-4 grid max-w-xl grid-cols-3 gap-3 border-t border-line pt-4 text-sm">
        <div>
          <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
            Wallets
          </dt>
          <dd className="mt-1 font-display text-3xl">0</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
            Order buttons
          </dt>
          <dd className="mt-1 font-display text-3xl">0</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
            Lenses
          </dt>
          <dd className="mt-1 font-display text-3xl">2</dd>
        </div>
      </dl>

      <section className="mt-16" aria-labelledby="board-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="board-heading"
              className="font-display text-4xl tracking-tight sm:text-5xl"
            >
              The live-ish board
            </h2>
            <p className="mt-3 max-w-2xl text-paper/80">
              One lens is paid visibility on Solana. The other is how clips, posts,
              and forwards actually spread. A crowd repeating itself is attention.
              A number moving afterward is late.
            </p>
          </div>
          <Link
            href="/trends"
            className="inline-flex min-h-11 items-center border border-paper/30 px-4 text-sm hover:border-paper"
          >
            Open the full trends board
          </Link>
        </div>
        <div className="mt-6">
          <BoardStatus board={board} />
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
              Paid visibility · Solana
            </h3>
            <div className="mt-4 grid gap-4">
              {pairs.map((pair) => (
                <PairCard
                  key={pair.id}
                  pair={pair}
                  sample={board.source === "sample"}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
              How a crowd forms
            </h3>
            <div className="mt-4 grid gap-4">
              {sources.map((source) => (
                <SourceCard key={source.id} source={source} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="read-heading">
        <h2 id="read-heading" className="font-display text-4xl tracking-tight">
          How to read this
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {lessons.map((lesson, index) => (
            <li key={lesson.title} className="border border-line bg-ink-2 p-5">
              <p className="font-mono text-[11px] tracking-[0.18em] text-tape">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-2xl leading-tight">{lesson.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/80">{lesson.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="share-heading">
        <div
          id="share-card"
          className="bg-paper px-6 py-8 text-ink sm:px-10 sm:py-12"
        >
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-stamp">
            Pass this along
          </p>
          <h2
            id="share-heading"
            className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] tracking-tight sm:text-6xl"
          >
            Send this to the person who sent you a screenshot.
          </h2>
          <ul className="mt-6 max-w-xl space-y-2 text-lg">
            <li>Attention moves first.</li>
            <li>Price is late.</li>
            <li>A crowd is not a paycheck.</li>
          </ul>
          <p className="mt-4 text-sm text-ink/70">
            Viral Attention Map · educational only · no orders
          </p>
          <div className="mt-8">
            <ShareActions text={SHARE_TEXT} path="/" primaryLabel="Share the map" />
          </div>
        </div>
      </section>
    </div>
  );
}
