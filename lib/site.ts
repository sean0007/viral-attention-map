export function siteUrl(): string {
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const vercelHost = process.env.VERCEL_URL?.trim();
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    productionHost ? `https://${productionHost}` : undefined,
    vercelHost ? `https://${vercelHost}` : undefined,
    "http://localhost:3000",
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const url = new URL(candidate.trim());
      if (url.protocol === "https:" || url.protocol === "http:") {
        return url.origin;
      }
    } catch {
      continue;
    }
  }

  return "http://localhost:3000";
}

/** Other free tools by the same maker, shown in the footer. */
export const SIBLING_TOOLS = [
  { href: "https://pitch-roast.vercel.app", label: "Pitch Roast" },
  { href: "https://fund-fix-flee.vercel.app", label: "Founder Scorecard" },
  { href: "https://japan-trip-brain.vercel.app", label: "Japan Trip Brain" },
  { href: "https://hotel-ota-calculator.vercel.app", label: "Hotel OTA Calculator" },
  { href: "https://saas-bill-cutter.vercel.app", label: "SaaS Bill Cutter" },
  { href: "https://ads-risk-check.vercel.app", label: "Ads Risk Check" },
  { href: "https://faceless-yt-risk-check.vercel.app", label: "Faceless YT Reality Check" },
  { href: "https://appgate-pack.vercel.app/check", label: "AppGate Pack" },
  { href: "https://ai-bottleneck-map.vercel.app", label: "AI Bottleneck Map" },
] as const;
