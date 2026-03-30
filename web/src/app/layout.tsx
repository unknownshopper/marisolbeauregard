import type { Metadata } from "next";
import { Geist_Mono, Ubuntu } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const ogImage = new URL("/opengraph-image", siteUrl).toString();

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MB Eventos | Coordinación de Eventos",
    template: "%s | MB Eventos",
  },
  description:
    "Planeación, coordinación y logística de eventos sociales, empresariales y gubernamentales.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "MB Eventos",
    title: "MB Eventos | Coordinación de Eventos",
    description:
      "Planeación, coordinación y logística de eventos sociales, empresariales y gubernamentales.",
    url: siteUrl,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "MB Eventos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MB Eventos | Coordinación de Eventos",
    description:
      "Planeación, coordinación y logística de eventos sociales, empresariales y gubernamentales.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${ubuntu.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
