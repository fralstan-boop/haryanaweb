import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0e1a 0%, #0f1628 50%, #111318 100%)",
          position: "relative",
        }}
      >
        {/* Saffron glow circle */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Brand name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: "0.1em",
            color: "#f1f5f9",
            marginBottom: 16,
          }}
        >
          HAYANURA
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#f97316",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Geopolitics • History • Animated Storytelling
        </div>
        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 40,
            fontSize: 20,
            color: "#94a3b8",
          }}
        >
          <span>286K+ Subscribers</span>
          <span>110M+ Total Views</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
