import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const ogImage = new URL("/cotizar/arma-tu-evento/opengraph-image", siteUrl).toString();

export const metadata: Metadata = {
  title: "Arma tu evento",
  description: "Construye tu evento paso a paso y recibe un resumen con totales.",
  openGraph: {
    title: "Arma tu evento | MB Eventos",
    description: "Construye tu evento paso a paso y recibe un resumen con totales.",
    url: new URL("/cotizar/arma-tu-evento", siteUrl).toString(),
    images: [{ url: ogImage, width: 1200, height: 630, alt: "MB Eventos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arma tu evento | MB Eventos",
    description: "Construye tu evento paso a paso y recibe un resumen con totales.",
    images: [ogImage],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
