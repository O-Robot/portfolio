import type { Metadata } from "next";

import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Toaster } from "@/components/ui/toaster";
import ChatWidget from "@/components/ChatWidget";

declare global {
  interface Window {
    chatwootSDK: any;
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function(d,t) {
        const BASE_URL="https://57287ec6edbc.ngrok-free.app/";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
          window.chatwootSDK.run({
            websiteToken: '1cBogHNfh4iYu7TtB2neHFx3',
            baseUrl: BASE_URL
          })
        }
      })(document,"script");
    `,
          }}
        ></script>
      </head>
      <body
        className={`${space.className} antialiased  bg-background text-foreground h-screen flex flex-col justify-between`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Toaster />
        <Footer />
        {/* <ChatWidget /> */}
      </body>
    </html>
  );
}
