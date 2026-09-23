import { chartUrl } from "@/lib/links";

export type AttentionPair = {
  id: string;
  name: string;
  symbol: string;
  liquidityUsd: number | null;
  volume24hUsd: number | null;
  boosts: number | null;
  chartUrl: string | null;
};

export type TrendsBoard = {
  source: "live" | "sample";
  reason: string | null;
  fetchedAt: string;
  pairs: AttentionPair[];
};

const SAMPLE_PAIRS: AttentionPair[] = [
  {
    id: "sample-paper-cat",
    name: "Paper Cat",
    symbol: "PURR",
    liquidityUsd: 42000,
    volume24hUsd: 88000,
    boosts: 50,
    chartUrl: null,
  },
  {
    id: "sample-echo-frog",
    name: "Echo Frog",
    symbol: "ECHO",
    liquidityUsd: 12500,
    volume24hUsd: 210000,
    boosts: 30,
    chartUrl: null,
  },
  {
    id: "sample-loop-tape",
    name: "Loop Tape",
    symbol: "LOOP",
    liquidityUsd: 6700,
    volume24hUsd: 54000,
    boosts: 20,
    chartUrl: null,
  },
  {
    id: "sample-naked-forward",
    name: "Naked Forward",
    symbol: "FWD",
    liquidityUsd: 98000,
    volume24hUsd: 15000,
    boosts: 80,
    chartUrl: null,
  },
  {
    id: "sample-thumbnail",
    name: "Open Mouth",
    symbol: "THMB",
    liquidityUsd: 3100,
    volume24hUsd: 640000,
    boosts: 10,
    chartUrl: null,
  },
  {
    id: "sample-stitch",
    name: "Second Stitch",
    symbol: "STCH",
    liquidityUsd: 250000,
    volume24hUsd: 4200,
    boosts: 15,
    chartUrl: null,
  },
];

const REASONS: Record<string, string> = {
  rate_limit:
    "The public feed is rate-limiting requests. This board is SAMPLE data.",
  http: "The public feed returned an error. This board is SAMPLE data.",
  timeout: "The public feed took too long. This board is SAMPLE data.",
  empty:
    "The public feed had no Solana pairs we could show. This board is SAMPLE data.",
  bad_shape: "The public feed changed shape. This board is SAMPLE data.",
  network: "The public feed could not be reached. This board is SAMPLE data.",
};

type ReasonCode = keyof typeof REASONS;

function sampleBoard(reason: ReasonCode): TrendsBoard {
  return {
    source: "sample",
    reason: REASONS[reason],
    fetchedAt: new Date().toISOString(),
    pairs: SAMPLE_PAIRS,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (isRecord(value) && Array.isArray(value.pairs)) return value.pairs;
  throw new Error("BAD_SHAPE");
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function cleanLabel(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  if (!cleaned) return null;
  return cleaned.slice(0, max);
}

function classify(error: unknown): ReasonCode {
  if (!(error instanceof Error)) return "network";
  if (error.message === "RATE_LIMIT") return "rate_limit";
  if (error.message === "EMPTY") return "empty";
  if (error.message === "BAD_SHAPE") return "bad_shape";
  if (error.message.startsWith("HTTP_")) return "http";
  if (error.name === "TimeoutError" || error.name === "AbortError") return "timeout";
  return "network";
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "viral-attention-map/educational",
    },
    next: { revalidate: 120 },
    signal: AbortSignal.timeout(8000),
  });

  if (response.status === 429) throw new Error("RATE_LIMIT");
  if (!response.ok) throw new Error(`HTTP_${response.status}`);
  return response.json() as Promise<unknown>;
}

function bestPair(
  pairs: unknown[],
  address: string,
): Record<string, unknown> | null {
  let best: Record<string, unknown> | null = null;
  let bestLiquidity = -1;

  for (const pair of pairs) {
    if (!isRecord(pair)) continue;
    const base = isRecord(pair.baseToken) ? pair.baseToken : null;
    const quote = isRecord(pair.quoteToken) ? pair.quoteToken : null;
    const matches =
      base?.address === address || quote?.address === address;
    if (!matches) continue;
    const liquidity = isRecord(pair.liquidity) ? num(pair.liquidity.usd) : null;
    const score = liquidity ?? 0;
    if (score >= bestLiquidity) {
      best = pair;
      bestLiquidity = score;
    }
  }

  return best;
}

export async function getTrends(): Promise<TrendsBoard> {
  try {
    const boosts = asArray(
      await fetchJson("https://api.dexscreener.com/token-boosts/top/v1"),
    );

    const byAddress = new Map<string, number | null>();
    for (const boost of boosts) {
      if (!isRecord(boost) || boost.chainId !== "solana") continue;
      const address = cleanLabel(boost.tokenAddress, 64);
      if (!address) continue;
      const amount = num(boost.totalAmount);
      const previous = byAddress.get(address);
      if (previous === undefined || (amount ?? -1) > (previous ?? -1)) {
        byAddress.set(address, amount);
      }
    }

    const addresses = [...byAddress.entries()]
      .sort((a, b) => (b[1] ?? -1) - (a[1] ?? -1))
      .slice(0, 12)
      .map(([address]) => address);

    if (addresses.length === 0) throw new Error("EMPTY");

    const detail = asArray(
      await fetchJson(
        `https://api.dexscreener.com/tokens/v1/solana/${addresses
          .map((address) => encodeURIComponent(address))
          .join(",")}`,
      ),
    );

    const pairs: AttentionPair[] = [];
    for (const address of addresses) {
      const pair = bestPair(detail, address);
      if (!pair) continue;
      const base = isRecord(pair.baseToken) ? pair.baseToken : null;
      const quote = isRecord(pair.quoteToken) ? pair.quoteToken : null;
      const token =
        base?.address === address ? base : quote?.address === address ? quote : base;
      const name = cleanLabel(token?.name, 48);
      const symbol = cleanLabel(token?.symbol, 16);
      if (!name || !symbol || !token) continue;
      const liquidity = isRecord(pair.liquidity) ? num(pair.liquidity.usd) : null;
      const volume = isRecord(pair.volume) ? num(pair.volume.h24) : null;
      pairs.push({
        id: address,
        name,
        symbol,
        liquidityUsd: liquidity,
        volume24hUsd: volume,
        boosts: byAddress.get(address) ?? null,
        chartUrl: chartUrl(pair.url),
      });
    }

    if (pairs.length === 0) throw new Error("EMPTY");

    return {
      source: "live",
      reason: null,
      fetchedAt: new Date().toISOString(),
      pairs,
    };
  } catch (error) {
    const reason = classify(error);
    console.error("trends feed failed", reason);
    return sampleBoard(reason);
  }
}
