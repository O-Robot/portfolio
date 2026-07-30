"use client";
import Timeline from "@/components/sections/timeline";
import { Button } from "@/components/ui/button";
import robot from "@/data/about.json";
import contact from "@/data/contact.json";
import skills from "@/data/skills.json";
import type { EducationItem } from "@/types/portfolio";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function AboutPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(robot.pronunciation.audio);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const parts = robot.about.split(/(\[\[NAME\]\]|\[\[SPEAKER\]\])/);
  const educationTimeline = robot.education as EducationItem[];

  return (
    <section className="bg-background">
      {/* about */}
      <section
        id="about"
        className="py-32 relative"
        aria-labelledby="about-page-title"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1
              id="about-page-title"
              className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text"
            >
              About Me
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=" mb-16 flex flex-col lg:flex-row gap-10 justify-between px-2 lg:px-10"
          >
            <div className="text-xl text-justify  text-primary-text/80 w-full lg:w-1/2 whitespace-pre-line">
              {parts.map((part, index) => {
                if (part === "[[NAME]]") {
                  return (
                    <span
                      key={index}
                      className="relative group font-semibold cursor-pointer"
                    >
                      {/* Default: full name */}
                      <span className="group-hover:hidden">{robot.name}</span>

                      <span className="hidden group-hover:inline-flex gap-1">
                        {robot.pronunciation.tooltip.map((syllable, i) => {
                          const isLastOfFirstName =
                            i === robot.pronunciation.firstNameLastIndex;
                          const isLastOverall =
                            i < robot.pronunciation.tooltip.length - 1;
                          return (
                            <span
                              key={i}
                              className="relative group/syllable cursor-help"
                            >
                              {syllable.part} {isLastOfFirstName && "\u00A0"}
                              {!isLastOfFirstName && isLastOverall ? "-" : ""}
                              <span className="absolute left-1/2 -translate-x-1/2 mt-1 hidden group-hover/syllable:block bg-primary-text text-background text-xs rounded px-2 py-1 whitespace-nowrap">
                                {syllable.explanation}
                              </span>
                            </span>
                          );
                        })}
                      </span>
                    </span>
                  );
                }
                if (part === "[[SPEAKER]]") {
                  return (
                    <button
                      key={index}
                      onClick={handlePlay}
                      aria-label={
                        isPlaying ? "Stop pronunciation" : "Play pronunciation"
                      }
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full cursor-pointer hover:bg-background/80"
                    >
                      {isPlaying ? "⏹️" : "🗣️"}
                    </button>
                  );
                }
                return part; // normal text
              })}
            </div>
            <div className="text-xl text-white/80 w-full lg:w-1/2 px-2 lg:px-8 flex flex-col gap-8">
              <Image
                src={robot.image}
                alt={`Portrait of ${robot.name}`}
                height={400}
                width={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="rounded-2xl object-cover"
              />

              <div className="border-t border-b border-primary-text/80 py-4 flex flex-wrap justify-center just gap-3">
                {contact.socialMediaLinks.map((media, i) => (
                  <a
                    key={i}
                    href={media.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={media.name}
                    className="text-white rounded-full cursor-pointer text-xl w-10 h-10 flex justify-center items-center"
                    style={{ background: media.color }}
                  >
                    <Icon
                      icon={media.icon}
                      aria-hidden="true"
                      className="transition-transform hover:scale-110"
                    />
                  </a>
                ))}
              </div>
              <div className="rounded-xl flex justify-center flex-col px-4 py-6  bg-[#070d1e]items-center text-center gap-4">
                <p className="text-primary-text text-lg">
                  Want a better feel for how I work and what I build?
                </p>
                <p className="text-sm text-primary-text/40">
                  Explore my experience and selected projects.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/experience">View Experience</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/projects">Browse Projects</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>{" "}
        </div>
      </section>
      {/* education */}
      <section
        id="experience"
        className="py-20 relative"
        aria-labelledby="education-section-title"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              id="education-section-title"
              className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text"
            >
              Education and Leadership Experience
            </h2>
            <p className="text-xl text-primary-text/80 max-w-3xl mx-auto">
              A timeline of learning, milestones, and academic growth
            </p>
          </motion.div>
          <Timeline timelineData={educationTimeline} />
        </div>
      </section>
      {/* top skills */}
      <section
        id="skills"
        className="py-20 relative"
        aria-labelledby="top-skills-title"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              id="top-skills-title"
              className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text"
            >
              Top Skills
            </h2>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="skill-container text-center m
                  b-16"
          >
            {skills.map((logo, i) => (
              <li className="skill-content" key={i}>
                {/* Icon */}
                <span
                  className="iconify w-14 h-14 z-10"
                  data-icon={logo.fontAwesomeClassname}
                  style={
                    logo.style.color === "#000000"
                      ? { color: "var(--primary-text)" }
                      : logo.style
                  }
                  data-inline="false"
                ></span>
                <h4 className="z-10 font-medium">{logo.skillName}</h4>
                <span
                  className="animated-border"
                  style={
                    {
                      "--border-color":
                        logo.style.color === "#000000"
                          ? "var(--primary-text)"
                          : logo.style.color,
                    } as React.CSSProperties
                  }
                ></span>
              </li>
            ))}
          </motion.ul>{" "}
        </div>
      </section>
    </section>
  );
}
