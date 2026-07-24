import type { Metadata } from "next";

import AnalyticsProvider from "@/components/AnalyticsProvider";
import ChatLoader from "@/components/chat-loader";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import JsonLd from "@/components/seo/JsonLd";
import { Toaster } from "@/components/ui/toaster";
import { metadataSiteConfig } from "@/utils/metadata";
import { buildWebsiteSchema } from "@/utils/schema";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    OgooluwaniChat?: {
      open: () => void;
      close: () => void;
      toggle: () => void;
      destroy: () => void;
    };
  }
}

const space = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
if (typeof window !== "undefined") {
  console.log("path", window.location.pathname);
}

export const metadata: Metadata = {
  metadataBase: new URL(metadataSiteConfig.siteUrl),
  title: {
    default: `${metadataSiteConfig.personName} | Software Developer`,
    template: `%s | ${metadataSiteConfig.personName}`,
  },
  description: metadataSiteConfig.homepageDescription,
  applicationName: metadataSiteConfig.siteName,
  authors: [
    {
      name: metadataSiteConfig.personName,
      url: metadataSiteConfig.siteUrl,
    },
  ],
  creator: metadataSiteConfig.personName,
  publisher: metadataSiteConfig.personName,
  manifest: "/manifest.json",
  category: "technology",
  keywords: [
    metadataSiteConfig.personName,
    "Software Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Lagos, Nigeria",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: metadataSiteConfig.siteUrl,
    siteName: metadataSiteConfig.siteName,
    title: `${metadataSiteConfig.personName} | Software Developer`,
    description: metadataSiteConfig.homepageDescription,
    locale: "en_US",
    images: [
      {
        url: metadataSiteConfig.socialImageUrl,
        alt: metadataSiteConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${metadataSiteConfig.personName} | Software Developer`,
    description: metadataSiteConfig.homepageDescription,
    creator: metadataSiteConfig.twitterHandle,
    images: [metadataSiteConfig.socialImageUrl],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd id="website-jsonld" data={buildWebsiteSchema()} />
        <Script
          src="https://code.iconify.design/2/2.2.1/iconify.min.js"
          defer
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-1JV5XE6QBL`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1JV5XE6QBL', { page_path: window.location.pathname });
            `,
          }}
        />
      </head>
      <body
        className={`${space.className} antialiased  bg-background text-foreground h-screen flex flex-col justify-between`}
        suppressHydrationWarning
      >
        <AnalyticsProvider />
        <Header />
        {children}
        <Toaster />

        <ChatLoader />
        <Footer />
      </body>
    </html>
  );
}
