# Viral Attention Map

Free educational dashboard. Attention moves first. Price is late. Attention is not guaranteed money.

**Not financial advice. Not a trading bot. Educational only. Memecoins are high risk / often zero.**

Someone can land here, scroll what is getting attention, share a card, and leave without being pushed to trade. There are no wallets, no order buttons, and no token deployment.

## Two lenses

- **Paid visibility** — Solana pairs from DexScreener’s public boost API, with name, symbol, liquidity, and 24-hour volume when the API provides them. “View chart” opens a DexScreener information page only.
- **How a crowd forms** — curated cards about sounds, stitches, quote-posts, and naked forwards. These are concepts, not a live social firehose.

If the public API rate-limits or fails, the board shows invented **SAMPLE** cards. Sample cards are labeled, are not real markets, and have no chart links.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Hero, live-ish board, share card |
| `/trends` | DexScreener boost list, or the sample board |
| `/quiz` | “Are you chasing attention or inventing it?” |
| `/quiz/result/[id]` | Shareable result |
| `/digest` | Email signup stub |
| `/legal/disclaimer` | Full disclaimer |

The digest accepts `POST /api/digest` with `{ "email": "...", "watching": "..." }`. It validates the address and returns JSON. It forwards the payload only when `DIGEST_WEBHOOK_URL` is an `https://` hostname you control. Otherwise it stores nothing.

## Deploy on Vercel Hobby

Hobby is enough. There is no database and no paid add-on.

1. Push this repo to GitHub.
2. In Vercel, import the project. Framework preset: **Next.js**.
3. Build command: `npm run build`. Install command: `npm install`.
4. Optional environment variables:
   - `NEXT_PUBLIC_SITE_URL` — production origin, for example `https://your-name.vercel.app`
   - `DIGEST_WEBHOOK_URL` — public `https://` endpoint that receives signup JSON
5. Deploy.

Locally:

```bash
npm install
npm run dev
```

Check the production build:

```bash
npm test
npm run build
```

The public feed is cached for about two minutes so a burst of visitors does not hammer DexScreener.
