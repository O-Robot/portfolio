import { ImageResponse } from "next/og";

import about from "@/data/about.json";

export const runtime = "edge";
export const alt = `${about.name} portfolio preview`;
export const size = {
  width: 1200,
  height: 630,
};
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
          padding: "56px",
          background:
            "radial-gradient(circle at top left, #11203f 0%, #090d18 42%, #05070d 100%)",
          color: "#f4f7fb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "860px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(244, 247, 251, 0.68)",
            }}
          >
            Software Developer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              lineHeight: 1.02,
              fontWeight: 700,
            }}
          >
            {about.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.3,
              color: "rgba(244, 247, 251, 0.84)",
              maxWidth: "900px",
            }}
          >
            Building fast, reliable software that people enjoy using.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "center",
              fontSize: 26,
              color: "rgba(244, 247, 251, 0.72)",
            }}
          >
            <span>React</span>
            <span style={{ color: "rgba(244, 247, 251, 0.36)" }}>•</span>
            <span>Next.js</span>
            <span style={{ color: "rgba(244, 247, 251, 0.36)" }}>•</span>
            <span>React Native</span>
          </div>
          <div
            style={{
              display: "flex",
              width: 108,
              height: 108,
              borderRadius: "999px",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.08)",
              fontSize: 52,
            }}
          >
            🤖
          </div>
        </div>
      </div>
    ),
    size,
  );
}
