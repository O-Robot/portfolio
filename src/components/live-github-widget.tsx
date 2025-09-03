"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
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
        <CardTitle className="flex items-center gap-2 text-primary-text">
          <Github className="h-5 w-5 text-green-400" />
          Contribution Graph
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col md:flex-row gap-6">
        {loading ? (
          <div className="w-full flex flex-col items-center px-4">
            <Skeleton className="w-1/2 h-[20px] rounded-lg" />
            <Separator className="mb-4" />
            <Skeleton className="w-full h-[100px] rounded-lg" />
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-x-auto">
            {/* Contributions count */}
            <div className="text-lg md:text-xl font-bold text-green-400">
              {calendar?.totalContributions ?? 0} contributions in {year}
            </div>

            {/* Contribution Graph */}
            {calendar && (
              <div className="grid grid-cols-[repeat(53,1fr)] gap-0.5 min-w-max">
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
        <div className="flex md:flex-col md:space-y-2 gap-2 md:gap-0 justify-center md:justify-start">
          {Array.from({ length: 4 }).map((_, i) => {
            const y = currentYear - i;
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-3 py-1 rounded-lg text-sm cursor-pointer transition-colors ${
                  year === y
                    ? "bg-primary text-white font-bold"
                    : "bg-white/10 text-primary-text/70 hover:bg-white/20"
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
