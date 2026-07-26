"use client";
import LiveGithubCard from "@/components/lazy/live-github-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import projects from "@/data/projects.json";
import Projects from "@/components/sections/projects";

export default function ProjectsPage() {
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
              A showcase of ideas brought to life. Exploring creativity,
              problem-solving, and innovation through code
            </p>
          </motion.div>
          <div className="w-full">
            <Projects projectsData={projects} />
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
