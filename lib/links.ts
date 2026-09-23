const BLOCKED_HOST_SUFFIXES = [".local", ".internal", ".localhost"];

export function chartUrl(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 300) return null;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== "https:") return null;
    if (host !== "dexscreener.com" && host !== "www.dexscreener.com") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function isPublicHttpsWebhook(value: string): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") return false;
  if (url.username || url.password) return false;

  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (!host || host === "localhost" || host.includes(":")) return false;
  if (BLOCKED_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix))) return false;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return false;

  return true;
}

export function isEmail(value: string): boolean {
  if (value.length > 200) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
