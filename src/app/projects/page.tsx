"use client";
import LiveGitHub from "@/components/live-github-widget";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { Link2 } from "lucide-react";
import projects from "@/data/projects.json";

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
              A showcase of ideas brought to life — exploring creativity,
              problem-solving, and innovation through code
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.25 }}
            className={`relative z-0 gap-7 flex justify-center  mx-auto`}
          >
            <div
              className="grid gap-7 w-full"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gridAutoRows: "max-content",
              }}
            >
              {projects.map((project, i) => (
                <Tilt
                  key={i}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1}
                  transitionSpeed={450}
                  className="bg-background/30 shadow shadow-skill-text/40 p-5 rounded-xl"
                >
                  {/* Project preview / link */}
                  <div className="relative w-full h-[230px]">
                    <Image
                      src={project?.image || "/images/logo.png"}
                      alt="project_image"
                      className="w-full h-full object-cover object-left-center rounded-2xl"
                      width={1300}
                      height={50}
                    />
                    <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                      <div
                        onClick={() => window.open(project.url, "_blank")}
                        className="bg-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                      >
                        <Link2 />
                      </div>
                    </div>
                  </div>

                  {/* Title + description */}
                  <div className="mt-5">
                    <h3 className="text-primary-text font-bold text-[20px]">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-primary-text/70 text-[14px]">
                      {project.description || "No description available."}
                    </p>
                    {project.createdAt && (
                      <p className="mt-1 text-xs text-primary/80">
                        {project.createdAt}
                      </p>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.languages.map((lang, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-white text-xs text-[#231942]"
                      >
                        <Icon icon={lang.iconifyClass} className="w-4 h-4" />
                        {lang.name}
                      </span>
                    ))}
                  </div>
                </Tilt>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-16 px-6"
          >
            <LiveGitHub />
          </motion.div>
        </div>
      </section>
    </section>
  );
}
