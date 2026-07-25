"use client";

import dynamic from "next/dynamic";

const InlineWidget = dynamic(
  () => import("react-calendly").then((mod) => mod.InlineWidget),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-175 rounded-2xl glass-morphism border border-white/20" />
    ),
  },
);

export default function CalendlyWidget({ url }: { url: string }) {
  return <InlineWidget url={url} />;
}
