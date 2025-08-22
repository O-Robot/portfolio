"use client";
import ExperienceFilter from "@/components/experience-filter";
import Timeline from "@/components/sections/timeline";
import { motion } from "framer-motion";
import { useState } from "react";
import experience from "@/data/experience.json";
export default function ExperiencePage() {
  const [selectedFilter, setSelectedFilter] = useState("work");

  return (
    <section className="bg-background">
      <section id="projects" className="py-32 relative  ">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text">
              My Professional Journey
            </h2>
            <p className="text-xl text-primary-text/80 max-w-3xl mx-auto mb-8">
              A timeline of growth, learning, and achievements
            </p>

            <ExperienceFilter
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </motion.div>
          {/* work experience */}
          <div className="w-full">
            <Timeline
              timelineData={experience.filter(
                (item) => item.type === selectedFilter
              )}
            />
          </div>
        </div>
      </section>
    </section>
  );
}
