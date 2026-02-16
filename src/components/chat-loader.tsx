"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useState, useEffect } from "react";

export default function ChatLoader() {
  const pathname = usePathname();
  const chatUrl = process.env.NEXT_PUBLIC_CHAT_URL;
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (!chatUrl) return;
    if (pathname === "/") return;

    fetch(`${chatUrl}/embed.js`, { method: "HEAD" })
      .then((res) => {
        if (res.ok) setIsAvailable(true);
      })
      .catch(() => {
        setIsAvailable(false);
      });
  }, [chatUrl, pathname]);

  if (!chatUrl || !isAvailable) return null;

  return (
    <Script
      src={`${chatUrl}/embed.js`}
      strategy="afterInteractive"
      data-widget-url={chatUrl}
    />
  );
}
