"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "@/components/mark";

const LINKS = [
  { href: "/", label: "Map" },
  { href: "/trends", label: "Trends" },
  { href: "/quiz", label: "Quiz" },
  { href: "/digest", label: "Digest" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-paper">
          <Mark />
          <span className="font-display text-xl leading-none tracking-tight">
            Viral Attention Map
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-1">
            {LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-10 items-center px-3 font-mono text-[11px] tracking-[0.18em] uppercase ${
                      active
                        ? "bg-paper text-ink"
                        : "text-paper/75 hover:text-paper"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
