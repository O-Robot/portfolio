"use client";
import Script from "next/script";

export default function ChatLoader() {
  const chatUrl = process.env.NEXT_PUBLIC_CHAT_URL;
  if (!chatUrl) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.CHAT_WIDGET_URL = "${chatUrl}";`,
        }}
        suppressHydrationWarning
      />
      <Script src={`${chatUrl}/embed.js`} strategy="afterInteractive" />
    </>
  );
}
