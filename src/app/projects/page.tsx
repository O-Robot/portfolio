"use client";
import LiveGithubCard from "@/components/lazy/live-github-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import projects from "@/data/projects.json";
import Projects from "@/components/sections/projects";
import type { ProjectItem } from "@/types/portfolio";
import { getProjectPageLead } from "@/utils/profile";

export default function ProjectsPage() {
  const projectItems = projects as ProjectItem[];
  const mobileCount = projectItems.filter(
    (project) => project.category === "mobile",
  ).length;
  const webCount = projectItems.filter(
    (project) => project.category === "web",
  ).length;

  return (
    <section className="bg-background">
      <section
        id="projects"
        className="py-32 relative  "
        aria-labelledby="projects-page-title"
      >
        <div className="container  mx-auto px-6">
          {" "}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1
              id="projects-page-title"
              className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text"
            >
              Projects
            </h1>
            <p className="text-xl text-primary-text/80 max-w-3xl mx-auto mb-8">
              {getProjectPageLead(projectItems.length, mobileCount, webCount)}{" "}
              Each project highlights the product, stack, and delivery details
              without relying on external demos alone.
            </p>
          </motion.div>
          <div className="w-full">
            <Projects projectsData={projectItems} />
          </div>
          <div className="flex justify-center gap-3 py-10">
            <Button
              variant="outline"
              size="lg"
              className="glass-morphism px-8 py-4 text-lg bg-transparent"
              asChild
            >
              <Link href="/contact">Build Something Like This</Link>
            </Button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16 px-6 w-full"
          >
            <LiveGithubCard />
          </motion.div>
        </div>
      </section>
    </section>
  );
}
