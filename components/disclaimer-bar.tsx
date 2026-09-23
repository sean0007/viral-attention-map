import Link from "next/link";
import { DISCLAIMER } from "@/lib/copy";

export function DisclaimerBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-[#d7a62a] bg-tape text-tape-ink">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-[13px] font-medium leading-snug sm:px-6 sm:text-sm">
        <p>{DISCLAIMER}</p>
        <Link href="/legal/disclaimer" className="underline underline-offset-2">
          Full disclaimer
        </Link>
      </div>
    </div>
  );
}
