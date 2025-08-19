"use client";
import LiveGitHubWidget from "@/components/live-github-widget";
import { useStore } from "@/store";
import { useEffect, useState } from "react";

type Stats = {
  totalStars: number;
  totalCommits: number;
  recentActivity: { repo: string; message: string; date: string }[];
};

export default function ProjectsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const { theme } = useStore();

  useEffect(() => {
    fetch("/api/github-stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);
  console.log(stats);

  return (
    <section className={`${theme === "dark" ? "bg-black" : "bg-black/20"}`}>
    <div>
      {/* <LiveGitHubWidget /> */}
    </div></section>
  );
}
