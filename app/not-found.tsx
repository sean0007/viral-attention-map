import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-tape">
        404
      </p>
      <h1 className="mt-3 font-display text-5xl tracking-tight">This page is not on the map.</h1>
      <p className="mt-4 text-lg text-paper/80">
        The address does not match a page. The board, the quiz, and the disclaimer are still here.
      </p>
      <Link href="/" className="mt-8 inline-flex min-h-12 items-center bg-paper px-5 font-medium text-ink">
        Back to the map
      </Link>
    </div>
  );
}
