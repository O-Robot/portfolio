"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, LoaderCircle } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export default function LiveGitHub() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [loading, setLoading] = useState(false);
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/github-graph?login=o-robot&year=${year}`)
      .then((res) => res.json())
      .then((data) => setCalendar(data))
      .finally(() => setLoading(false));
  }, [year]);

  return (
    <Card className="glass-morphism border-white/20 hover:border-green-400/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Github className="h-5 w-5 text-green-400" />
          Contribution Graph
        </CardTitle>
      </CardHeader>

      <CardContent className="flex gap-4">
        {/* Graph + Stats */}
        {loading ? (
          <div className="w-full flex flex-col items-center  px-4 ">
            <Skeleton className="w-1/2 h-[20px] rounded-lg" />{" "}
            <Separator className="mb-4" />{" "}
            <Skeleton className="w-full h-[100px] rounded-lg" />
          </div>
        ) : (
          <div className="flex-1 space-y-4 ">
            {/* Contributions count */}
            <div className="text-xl font-bold text-green-400">
              {calendar?.totalContributions ?? 0} contributions in {year}
            </div>

            {/* Contribution Graph */}
            {calendar && (
              <div className="grid grid-cols-[repeat(53,1fr)] gap-0.5 overflow-x-auto">
                {calendar.weeks.map((week, wi) => (
                  <div key={wi} className="grid grid-rows-7 gap-0.5">
                    {week.contributionDays.map((day, di) => (
                      <div
                        key={di}
                        title={`${day.date}: ${day.contributionCount} contributions`}
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: day.color }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sidebar Tabs */}
        <div className="flex flex-col space-y-2">
          {Array.from({ length: 4 }).map((_, i) => {
            const y = currentYear - i;
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${
                  year === y
                    ? "bg-green-500 text-black font-bold"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {y}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
