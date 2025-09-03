"use client";
import LiveGitHub from "@/components/live-github-widget";
import { motion } from "framer-motion";
import projects from "@/data/projects.json";
import Projects from "@/components/sections/projects";

export default function ProjectsPage() {
  return (
    <section className="bg-background">
      <section id="projects" className="py-32 relative  ">
        <div className="container  mx-auto px-6">
          {" "}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text">
              My Projects Journey
            </h2>
            <p className="text-xl text-primary-text/80 max-w-3xl mx-auto mb-8">
              A showcase of ideas brought to life. Exploring creativity,
              problem-solving, and innovation through code
            </p>
          </motion.div>
          <div className="w-full">
            <Projects projectsData={projects} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16 px-6 w-full"
          >
            <LiveGitHub />
          </motion.div>
        </div>
      </section>
    </section>
  );
}
