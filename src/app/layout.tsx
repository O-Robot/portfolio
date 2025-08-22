import type { Metadata } from "next";

import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Toaster } from "@/components/ui/toaster";

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
      </head>
      <body
        className={`${space.className} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
