"use client";

import { pageview } from "@/utils/gtag";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fullPath =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    pageview(fullPath);
  }, [pathname, searchParams]);

  return null;
}
