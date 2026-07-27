"use client";
import { FilterOption } from "@/components/filter";
import { Button } from "@/components/ui/button";
import Filter from "@/components/filter";
import Timeline from "@/components/sections/timeline";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import experience from "@/data/experience.json";
import type { ExperienceItem } from "@/types/portfolio";

const WORK_EXPERIENCE_TYPES = [
  "work",
  "full-time",
  "part-time",
  "freelance",
  "contract",
] as const;

export default function ExperiencePage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const experienceItems = experience as ExperienceItem[];

  const filterOptions: FilterOption[] = [
    { id: "all", label: "All", icon: "✦" },
    { id: "work", label: "Work Experience", icon: "🏢" },
    { id: "intern", label: "Internship", icon: "🚀" },
    {
      id: "volunteership",
      label: "Volunteership",
      icon: "🌍",
    },
  ];

  const filteredExperience =
    selectedFilter === "all"
      ? experienceItems
      : selectedFilter === "work"
        ? experienceItems.filter((item) =>
            WORK_EXPERIENCE_TYPES.includes(
              item.type as (typeof WORK_EXPERIENCE_TYPES)[number],
            ),
          )
        : experienceItems.filter((item) => item.type === selectedFilter);

  return (
    <section className="bg-background">
      <section
        id="projects"
        className="py-32 relative  "
        aria-labelledby="experience-page-title"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1
              id="experience-page-title"
              className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text"
            >
              Experience
            </h1>
            <p className="text-xl text-primary-text/80 max-w-3xl mx-auto mb-8">
              A timeline of growth, learning, and achievements
            </p>
            <Filter
              filters={filterOptions}
              selectedFilter={selectedFilter}
              onFilterChange={(f) => {
                setSelectedFilter(f as typeof selectedFilter);
              }}
            />
          </motion.div>
          {/* work experience */}
          <div className="w-full">
            <Timeline timelineData={filteredExperience} />
          </div>
          <div className="flex justify-center gap-3 py-10">
            <Button
              variant="outline"
              size="lg"
              className="glass-morphism px-8 py-4 text-lg bg-transparent"
              asChild
            >
              <Link href="/projects">See Related Projects</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass-morphism px-8 py-4 text-lg bg-transparent"
              asChild
            >
              <Link href="/contact">Start a Conversation</Link>
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
