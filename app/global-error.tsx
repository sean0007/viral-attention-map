"use client";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#141210",
          color: "#f3eee4",
          fontFamily: "Georgia, serif",
          margin: 0,
          padding: "2rem",
        }}
      >
        <p style={{ background: "#f2c14e", color: "#1a1408", padding: "0.75rem" }}>
          Not financial advice. Not a trading bot. Educational only. Memecoins are
          high risk / often zero.
        </p>
        <h1>This page failed to load.</h1>
        <button type="button" onClick={() => retry()}>
          Try again
        </button>
      </body>
    </html>
  );
}
