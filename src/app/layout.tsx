import type { Metadata } from "next";

import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Toaster } from "@/components/ui/toaster";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import ChatLoader from "@/components/chat-loader";

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

export const metadata: Metadata = {
  title: "Ogooluwani Adewale",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
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
