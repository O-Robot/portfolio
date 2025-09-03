// components/ChatwootWidget.tsx
"use client";
import { useEffect } from "react";

export default function ChatWidget() {
  useEffect(() => {
    (function (d, t) {
      const BASE_URL = "https://57287ec6edbc.ngrok-free.app/";

      const g = d.createElement(t) as HTMLScriptElement;
      const s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.async = true;
      s.parentNode!.insertBefore(g, s);

      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: "1cBogHNfh4iYu7TtB2neHFx3",
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }, []);

  return null;
}
