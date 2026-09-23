import Link from "next/link";
import { DISCLAIMER } from "@/lib/copy";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6">
        <p>{DISCLAIMER}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.16em] uppercase">
          <Link href="/trends" className="hover:text-paper">
            Trends
          </Link>
          <Link href="/quiz" className="hover:text-paper">
            Quiz
          </Link>
          <Link href="/digest" className="hover:text-paper">
            Digest
          </Link>
          <Link href="/legal/disclaimer" className="hover:text-paper">
            Disclaimer
          </Link>
        </nav>
      </div>
    </footer>
  );
}
