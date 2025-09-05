"use client";

import dynamic from "next/dynamic";

const AnalyticsTracker = dynamic(() => import("./AnalyticsTracker"), {
  ssr: false,
});

export default function AnalyticsProvider() {
  return <AnalyticsTracker />;
}
