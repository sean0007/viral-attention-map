import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection, type FaqItem } from "@/components/faq-section";
import { BoardStatus } from "@/components/board-status";
import { PairCard } from "@/components/pair-card";
import { ShareActions } from "@/components/share-actions";
import { SourceCard } from "@/components/source-card";
import { attentionSources } from "@/lib/attention-sources";
import { RATE_LIMIT } from "@/lib/agent-api";
import { DISCLAIMER, SHARE_TEXT } from "@/lib/copy";
import { PUBLIC_URL, SITE_NAME } from "@/lib/site";
import { getTrends } from "@/lib/trends";

export const revalidate = 120;

const title = "Why memecoins pump and dump: attention moves first";
const description =
  "Free educational board of what is pulling eyes online. Attention moves first; price is late. Public Solana paid-boost chatter plus cultural patterns that make a clip travel. No wallet, no orders.";

export const metadata: Metadata = {
  title: { absolute: `${title} · ${SITE_NAME}` },
  description,
  alternates: { canonical: `${PUBLIC_URL}/` },
  openGraph: {
    title,
    description,
    type: "website",
    url: `${PUBLIC_URL}/`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: `${PUBLIC_URL}/`,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any (web browser)",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description,
};

const faq: FaqItem[] = [
  {
    q: "Why do memecoins pump and dump?",
    a: "Crowds often form around repetition first — strangers copy a clip, sound, or name — and a price move, if it happens at all, shows up afterward. On this map that order is the lesson: attention moves first; price is late. Late is not the same as profitable. Memecoins are high risk and often go to zero after the noise.",
  },
  {
    q: "Does attention move before price?",
    a: "That is the framing this board teaches. A thing is getting attention when strangers repeat it. One post is a claim; two unrelated copies are a pattern. Paid boosts are also attention someone bought — still attention, not an independent discovery, and not a reason to spend your own money. If a number moves after the crowd shows up, that number is late.",
  },
  {
    q: "What is the Viral Attention Map?",
    a: "A free educational board of what is pulling eyes: public Solana market chatter from DexScreener's paid-boost list (name, symbol, liquidity, 24h volume when available), plus cultural pattern cards on how clips, posts, and forwards travel. If the live API fails, labeled SAMPLE cards are shown instead. No wallet connect and no order buttons.",
  },
  {
    q: "How does the attention quiz work?",
    a: "The quiz at /quiz asks six multiple-choice questions titled \"Are you chasing attention or inventing it?\" Each answer tilts toward chaser, inventor, or reader. Scoring returns that tilt (or a split on a tie) with a short explanation you can share. It is a self-check on how you react to hype, not a trading signal.",
  },
  {
    q: "What attention patterns does the map explain?",
    a: "Concept cards cover patterns such as TikTok sound reuse, X quote-post piles, stitch chains, group-chat naked forwards, and YouTube thumbnail clones. Each lists the platform, the observable signal, and the lesson — for example that argument can be a distribution channel, or that a forward with no source feels private but is not the same as early.",
  },
  {
    q: "Is this a trading bot or financial advice?",
    a: `${DISCLAIMER} Attention is not guaranteed money. Nothing on this site places an order. A crowd repeating itself is attention; a number moving afterward is late — not a paycheck.`,
  },
  {
    q: "Is there an API for agents?",
    a: `Yes, free and keyless, with CORS open. GET ${PUBLIC_URL}/api/patterns (optional ?platform=TikTok) returns how-attention-spreads patterns. GET ${PUBLIC_URL}/api/quiz returns the questions, or score with ?answers=reader,reader,inventor,reader,chaser,reader. Every response includes a disclaimer field. Fair use is about ${RATE_LIMIT} requests per minute per IP. OpenAPI: ${PUBLIC_URL}/openapi.json.`,
  },
  {
    q: "Can my AI assistant use this through MCP?",
    a: "Yes. The tools viral_attention_patterns and viral_attention_quiz are on the free remote MCP server at https://free-agent-tools.vercel.app/mcp (streamable HTTP, no auth), together with the maker's other free tools. Add that URL to Claude, Cursor, ChatGPT, or another MCP client.",
  },
  {
    q: "Does the site store my quiz answers or connect a wallet?",
    a: "No wallets, no order buttons, and no login required to browse. The quiz is a local educational tilt check; the board is public chatter plus labeled sample fallback. Educational only — not a place to trade.",
  },
];

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
        Why do memecoins pump and dump?
        <span className="mt-2 block italic text-tape">Attention moves first. Price is late.</span>
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

      <FaqSection items={faq} heading="Attention map questions" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
