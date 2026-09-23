"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="font-display text-5xl tracking-tight">The board hiccuped.</h1>
      <p className="mt-4 text-lg text-paper/80">
        This page failed to render. You can try again. Nothing here places an order.
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-8 inline-flex min-h-12 items-center bg-heat px-5 font-semibold text-[#fff7f2]"
      >
        Try again
      </button>
    </div>
  );
}
