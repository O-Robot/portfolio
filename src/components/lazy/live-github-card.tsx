"use client";

import dynamic from "next/dynamic";

const LiveGitHub = dynamic(() => import("@/components/live-github-widget"), {
  ssr: false,
  loading: () => (
    <div className="glass-morphism border border-white/20 rounded-xl min-h-65" />
  ),
});

export default function LiveGithubCard() {
  return <LiveGitHub />;
}
