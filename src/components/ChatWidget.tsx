// components/ChatwootWidget.tsx
"use client";
import { useEffect } from "react";

export default function ChatWidget() {
  useEffect(() => {
    (function (d, t) {
      const BASE_URL = "https://2ca5ac3ce5cd.ngrok-free.app/";

      const g = d.createElement(t) as HTMLScriptElement;
      const s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.async = true;
      s.parentNode!.insertBefore(g, s);

      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: "S4UJKmPeDPMsCG9vXQsBHFFR",
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }, []);

  return null;
}
