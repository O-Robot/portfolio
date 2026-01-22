"use client";
import Script from "next/script";
import { useState, useEffect } from "react";

export default function ChatLoader() {
  const chatUrl = process.env.NEXT_PUBLIC_CHAT_URL;
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (!chatUrl) return;

    fetch(`${chatUrl}/embed.js`, { method: "HEAD" })
      .then((res) => {
        if (res.ok) setIsAvailable(true);
      })
      .catch(() => {
        setIsAvailable(false);
      });
  }, [chatUrl]);

  if (!chatUrl || !isAvailable) return null;

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
