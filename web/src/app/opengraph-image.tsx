import { ImageResponse } from "next/og";

export const runtime = "edge";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logoUrl = new URL("/logo.png", siteUrl).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            width: 1100,
            height: 530,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 48,
            backgroundColor: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
            overflow: "hidden",
          }}
        >
          <img
            src={logoUrl}
            alt="MB Eventos"
            width={420}
            height={420}
            style={{
              objectFit: "contain",
              borderRadius: 32,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
