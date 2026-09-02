import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SpotifyFloatWidget } from "@/components/spotify-float";

import { site } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI Engineer, ML Engineer & Builder`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Heet Mehta",
    "AI Engineer",
    "ML Engineer",
    "Machine Learning Engineer",
    "Natural Language Processing",
    "LLM",
    "Large Language Models",
    "Agentic AI",
    "Open Source",
    "Computer Engineering",
    "Deep Learning",
    "Neural Networks",
    "Python Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "heetworld.tech",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — AI Engineer, ML Engineer & Builder`,
    description: site.description,
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: `${site.name} — AI Engineer & Builder`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: site.twitter,
    title: `${site.name} — AI Engineer, ML Engineer & Builder`,
    description: site.description,
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: site.url,
    types: {
      "application/rss+xml": `${site.url}/rss.xml`,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/og`,
  jobTitle: "AI Engineer & Builder",
  description: site.description,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location,
  },
  sameAs: [
    site.socials.github,
    site.socials.linkedin,
    site.socials.twitter,
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Natural Language Processing",
    "Large Language Models",
    "Deep Learning",
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "Open Source Software",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "AI Engineer",
    occupationalCategory: "15-1252.00",
    skills: "Machine Learning, LLM, NLP, Python, TypeScript",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  author: {
    "@type": "Person",
    name: site.name,
    url: site.url,
  },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "AI Engineer & Builder",
    description: site.description,
    sameAs: [
      site.socials.github,
      site.socials.linkedin,
      site.socials.twitter,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://plausible.io" />
        <meta name="theme-color" content="#fafaf8" />
        <meta name="msapplication-TileColor" content="#fafaf8" />
      </head>
      <body className="texture-noise">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <SpotifyFloatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
