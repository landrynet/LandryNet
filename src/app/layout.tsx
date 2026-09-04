import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3001"),
  title: {
    default: "Alex Martin - Développeur full-stack",
    template: "%s | Alex Martin",
  },
  description: "Portfolio d'Alex Martin, développeur full-stack indépendant.",
  keywords: ["développeur full-stack", "Next.js", "React", "TypeScript", "portfolio"],
  authors: [{ name: "Alex Martin" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Alex Martin Portfolio",
    title: "Alex Martin - Développeur full-stack",
    description: "Développeur full-stack indépendant, orienté produits numériques clairs et humains.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
