import { ImageResponse } from "next/og";

export const alt = "Viral Attention Map. Attention moves first. Price is late.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141210",
          color: "#f3eee4",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#f2c14e",
          }}
        >
          Viral Attention Map
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            lineHeight: 1,
          }}
        >
          <div style={{ display: "flex" }}>Attention moves first.</div>
          <div style={{ display: "flex", color: "#f2c14e" }}>Price is late.</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#f2c14e" }}>
          Not financial advice. Not a trading bot. Educational only.
        </div>
      </div>
    ),
    { ...size },
  );
}
