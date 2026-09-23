"use client";

import { useState } from "react";

type ShareActionsProps = {
  text: string;
  path: string;
  primaryLabel?: string;
};

export function ShareActions({
  text,
  path,
  primaryLabel = "Share this",
}: ShareActionsProps) {
  const [notice, setNotice] = useState<string | null>(null);

  function shareUrl() {
    return new URL(path, window.location.origin).toString();
  }

  async function copyWords() {
    const url = shareUrl();
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setNotice("Copied. Paste it anywhere.");
    } catch {
      setNotice("Copy failed. Select the words and copy them manually.");
    }
  }

  async function shareNative() {
    const url = shareUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: "Viral Attention Map", text, url });
        setNotice("Share sheet opened.");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    await copyWords();
  }

  function postOnX() {
    const url = shareUrl();
    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", text);
    intent.searchParams.set("url", url);
    const opened = window.open(intent.toString(), "_blank", "noopener,noreferrer");
    setNotice(
      opened
        ? "X opened in a new tab."
        : "Allow pop-ups to post, or copy the words instead.",
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => {
            void shareNative();
          }}
          className="inline-flex min-h-14 items-center justify-center bg-heat px-6 text-lg font-semibold text-[#fff7f2] hover:bg-[#a82b0c]"
        >
          {primaryLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            void copyWords();
          }}
          className="inline-flex min-h-14 items-center justify-center border border-current px-5 text-base font-medium"
        >
          Copy words
        </button>
        <button
          type="button"
          onClick={postOnX}
          className="inline-flex min-h-14 items-center justify-center border border-current px-5 text-base font-medium"
        >
          Post on X
        </button>
      </div>
      <p aria-live="polite" className="min-h-5 text-sm">
        {notice}
      </p>
    </div>
  );
}
