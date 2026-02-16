"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useState, useEffect } from "react";

export default function ChatLoader() {
  const pathname = usePathname();
  const chatUrl = process.env.NEXT_PUBLIC_CHAT_URL;
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!chatUrl || pathname === "/") {
      setShouldLoad(false);
      return;
    }

    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [chatUrl, pathname]);

  if (!chatUrl || !shouldLoad) return null;

  return (
    <Script
      src={`${chatUrl}/embed.js`}
      strategy="lazyOnload"
      data-widget-url={chatUrl}
      onError={(e) => {
        console.error("Chat widget failed to load", e);
      }}
    />
  );
}
