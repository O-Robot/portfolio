import type { Metadata } from "next";

import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Toaster } from "@/components/ui/toaster";

import dynamic from "next/dynamic";

const AnalyticsTracker = dynamic(
  () => import("@/components/AnalyticsTracker"),
  {
    ssr: false,
  }
);

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
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
        <script
          src="https://code.iconify.design/2/2.2.1/iconify.min.js"
          defer
        ></script>
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
        <AnalyticsTracker />
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
