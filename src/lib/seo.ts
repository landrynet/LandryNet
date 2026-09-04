import type { Metadata } from "next";

const siteUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3001";

export function pageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: { title, description, url: `${siteUrl}${path}`, type: "website" },
  };
}
