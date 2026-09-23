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
