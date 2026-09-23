import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return ["", "/trends", "/quiz", "/digest", "/legal/disclaimer"].map((path) => ({
    url: `${base}${path || "/"}`,
    changeFrequency: path === "" || path === "/trends" ? "hourly" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
