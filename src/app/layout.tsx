import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/site.config";
import "./globals.css";
import DesktopGate from "@/components/DesktopGate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.seoDescription,
  keywords: [
    "HAYANURA",
    "geopolitics",
    "Indian history",
    "animated storytelling",
    "military",
    "defence",
    "India",
  ],
  authors: [{ name: siteConfig.brand.name }],
  creator: siteConfig.brand.name,
  metadataBase: new URL("https://hayanura.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hayanura.in",
    siteName: siteConfig.brand.name,
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.seoDescription,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: siteConfig.brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.brand.name,
    description: siteConfig.brand.seoDescription,
    images: ["/api/og"],
  },
  other: {
    "theme-color": "#0a0e1a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand.name,
    url: "https://hayanura.in",
    description: siteConfig.brand.description,
    sameAs: [
      siteConfig.links.youtube,
      siteConfig.links.twitter,
      siteConfig.links.instagram,
      siteConfig.links.discord,
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link 
          rel="preload" 
          as="image" 
          href="https://github.com/fralstan-boop/etwf/blob/main/file_000000000d4c7208a829d326a656ba57.png?raw=true" 
        />
        <link 
          rel="preload" 
          as="image" 
          href="https://github.com/fralstan-boop/etwf/blob/main/servicebg.png?raw=true" 
        />
        <link 
          rel="preload" 
          as="image" 
          href="/images/desktop-preview.png" 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased`}>
        <DesktopGate>
          {children}
        </DesktopGate>
        <Analytics />
      </body>
    </html>
  );
}
