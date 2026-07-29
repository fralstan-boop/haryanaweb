import type { Metadata } from "next";
import { Inter, Cinzel, Playfair_Display, Cormorant_Garamond } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hayanura | Geopolitics, History & Strategic Analysis",
  description: "Cinematic geopolitical storytelling, defence analysis, and historical insights from Hayanura.",
  keywords: [
    "geopolitics",
    "history",
    "defence analysis",
    "military strategy",
    "India geopolitics",
    "Hayanura"
  ],
  metadataBase: new URL("https://hayanura.in"),
  alternates: {
    canonical: "https://hayanura.in",
  },
  openGraph: {
    title: "HAYANURA | Geopolitics, History & Strategic Analysis",
    description: "Cinematic geopolitical storytelling, defence analysis, and historical insights.",
    url: "https://hayanura.in",
    siteName: "Hayanura",
    images: [
      {
        url: "https://hayanura.in/og-image.png?v=5",
        width: 1200,
        height: 630,
        alt: "HAYANURA | Geopolitics, History & Strategic Analysis"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAYANURA | Geopolitics, History & Strategic Analysis",
    description: "Cinematic geopolitical storytelling, defence analysis, and historical insights.",
    images: ["https://hayanura.in/og-image.png?v=5"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://hayanura.in/#organization",
        name: "HAYANURA",
        url: "https://hayanura.in",
        logo: {
          "@type": "ImageObject",
          url: "https://hayanura.in/logo.png"
        },
        description: "Geopolitical storytelling, defence analysis, and historical narratives.",
        sameAs: [
          siteConfig.links.youtube,
          siteConfig.links.instagram,
          siteConfig.links.twitter,
          siteConfig.links.discord,
        ],
      },
      {
        "@type": "Person",
        "@id": "https://hayanura.in/#person",
        name: "HAYANURA Creator",
        url: "https://hayanura.in",
        jobTitle: "Creator & Animator",
        worksFor: {
          "@id": "https://hayanura.in/#organization"
        },
        sameAs: [
          siteConfig.links.youtube,
          siteConfig.links.instagram,
        ]
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link 
          rel="preload" 
          as="image" 
          href="/images/golden-arch.png" 
        />
        <link 
          rel="preload" 
          as="image" 
          href="/images/services-bg.png" 
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
      <body className={`${inter.variable} ${cinzel.variable} ${playfair.variable} ${garamond.variable} font-sans antialiased`}>
        <DesktopGate>
          {children}
        </DesktopGate>
        <Analytics />
      </body>
    </html>
  );
}
