import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title") ||
    `${site.name}`;
  const subtitle =
    searchParams.get("description") ||
    "AI Engineer · ML Engineer · Builder";

  const lines = title.length > 40
    ? [title.slice(0, 38) + "…"]
    : [title];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          color: "#f5f5f5",
          padding: "96px 96px",
          fontFamily: "Inter, ui-sans-serif, system-ui",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow */}
        <p
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6366f1",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {site.url.replace("https://", "")}
        </p>

        {/* Title */}
        {lines.map((line, i) => (
          <p
            key={i}
            style={{
              margin: 0,
              marginTop: i === 0 ? 16 : 0,
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.0,
              fontFamily: "ui-serif, Georgia, serif",
              color: "#fff",
              zIndex: 1,
            }}
          >
            {line}
          </p>
        ))}

        {/* Subtitle */}
        <p
          style={{
            marginTop: 24,
            fontSize: 24,
            lineHeight: 1.3,
            color: "#a1a1aa",
            zIndex: 1,
          }}
        >
          {subtitle}
        </p>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 96,
            right: 96,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: "#52525b",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {site.socials.github.replace("https://github.com/", "github.com/")}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: "#52525b",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {site.socials.linkedin.replace("https://linkedin.com/in/", "linkedin.com/in/")}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
