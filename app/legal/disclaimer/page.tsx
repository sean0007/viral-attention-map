import type { Metadata } from "next";
import { DISCLAIMER } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: DISCLAIMER,
};

export default function DisclaimerPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-tape">
        Legal
      </p>
      <h1 className="mt-3 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
        Disclaimer
      </h1>
      <p className="mt-6 text-lg font-medium leading-relaxed">{DISCLAIMER}</p>

      <h2 className="mt-10 font-display text-3xl">What this site is</h2>
      <p className="mt-3 leading-relaxed text-paper/85">
        Viral Attention Map is a free educational page about attention. It shows
        two kinds of signals: Solana pairs that appear in DexScreener&apos;s public
        boost list, with name, symbol, liquidity, and 24-hour volume when that
        API provides them; and written examples of how attention spreads in short
        video, posts, and forwards.
      </p>

      <h2 className="mt-10 font-display text-3xl">What this site is not</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-paper/85">
        <li>Not financial, investment, tax, or legal advice.</li>
        <li>Not a broker, exchange, advisor, or custodian.</li>
        <li>Not a trading bot. It does not place orders, connect wallets, or hold funds.</li>
        <li>Not an offer to sell anything, and not a solicitation to buy any asset.</li>
        <li>Not a token launcher, and not a tool for deploying tokens.</li>
      </ul>

      <h2 className="mt-10 font-display text-3xl">Markets and memecoins</h2>
      <p className="mt-3 leading-relaxed text-paper/85">
        Crypto assets, especially memecoins, can lose all value. Liquidity can
        vanish. Volume can be wash activity. Names can be impersonated. A crowd
        talking about something is not evidence that it will hold value. Price
        movement after attention is common and is not, by itself, a reason to
        spend money. Attention is not guaranteed money.
      </p>

      <h2 className="mt-10 font-display text-3xl">Data</h2>
      <p className="mt-3 leading-relaxed text-paper/85">
        Live cards use a public third-party API and can be delayed, incomplete,
        rate-limited, or wrong. Boosts are paid visibility. Paid visibility is a
        form of attention, and it is also an advertisement. If the feed fails,
        the board shows SAMPLE cards. Sample cards are invented so the layout
        still teaches the shape of the page. They are not real markets and they
        do not link to charts.
      </p>
      <p className="mt-3 leading-relaxed text-paper/85">
        &quot;View chart&quot; opens a DexScreener information page in a new tab.
        That site is not ours. A chart is not an instruction.
      </p>

      <h2 className="mt-10 font-display text-3xl">Quiz</h2>
      <p className="mt-3 leading-relaxed text-paper/85">
        The quiz is a mirror for how you relate to hype. It is not a personality
        diagnosis, a screening tool, or a recommendation to take risk.
      </p>

      <h2 className="mt-10 font-display text-3xl">Digest</h2>
      <p className="mt-3 leading-relaxed text-paper/85">
        The email form is a stub. Signups are validated and, only if the operator
        set an HTTPS webhook, forwarded as JSON to that webhook. Without a
        webhook, this site does not keep a mailing list. Do not expect trade
        alerts. There will not be any.
      </p>

      <h2 className="mt-10 font-display text-3xl">No endorsement</h2>
      <p className="mt-3 leading-relaxed text-paper/85">
        Mention of a token name, a platform, or a cultural pattern is not an
        endorsement. This site is not affiliated with DexScreener, any token
        project, or any social network.
      </p>

      <h2 className="mt-10 font-display text-3xl">Your decisions</h2>
      <p className="mt-3 leading-relaxed text-paper/85">
        You are responsible for your own decisions. The operators of this site
        are not liable for losses that follow from using, misreading, or sharing
        it.
      </p>
      <p className="mt-8 text-sm text-muted">Last updated 23 September 2026.</p>
    </article>
  );
}
