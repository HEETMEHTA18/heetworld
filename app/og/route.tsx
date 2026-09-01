import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title") ||
    `${site.name} — ${site.title.split(" · ")[0]}`;
  const subtitle =
    searchParams.get("description") ||
    "AI Engineer, ML Engineer & Builder";

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
          background: "#090909",
          color: "#f5f5f5",
          padding: "96px 96px",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        {lines.map((line, i) => (
          <p
            key={i}
            style={{
              margin: 0,
              fontSize: 80,
              fontWeight: 400,
              lineHeight: 1.0,
              fontFamily: "ui-serif, Georgia, serif",
              color: "#fff",
            }}
          >
            {line}
          </p>
        ))}
        <p
          style={{
            marginTop: 24,
            fontSize: 28,
            lineHeight: 1.2,
            color: "#b7b7b7",
          }}
        >
          {subtitle}
        </p>
        <p
          style={{
            position: "absolute",
            bottom: 56,
            left: 96,
            fontSize: 18,
            color: "#7b7b7b",
          }}
        >
          {site.url.replace("https://", "")}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
