"use client";
import ExperienceFilter from "@/components/experience-filter";
import Timeline from "@/components/sections/timeline";
import { useStore } from "@/store";
import { motion } from "framer-motion";
import { useState } from "react";
export default function ExperiencePage() {
  const [selectedFilter, setSelectedFilter] = useState("work");
  const { theme } = useStore();

  const timelineData = [
    {
      id: 1,
      year: "2024",
      title: "Senior Full-Stack Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      description:
        "Leading development of next-generation web applications using cutting-edge technologies.",
      technologies: ["React", "Node.js", "TypeScript", "AWS"],
      achievements: [
        "Increased performance by 40%",
        "Led team of 8 developers",
        "Architected microservices",
      ],
      image: "/images/companies/swifta.png",
      link: "",
      type: "work",
    },
    {
      id: 2,
      year: "2022",
      title: "Creative Technologist",
      company: "Digital Agency",
      location: "New York, NY",
      description:
        "Bridged design and development to create immersive digital experiences.",
      technologies: ["Three.js", "WebGL", "React", "Python"],
      achievements: [
        "Won 3 design awards",
        "Created viral AR campaign",
        "Mentored junior developers",
      ],
      image: "/images/companies/iratein.png",
      link: "",
      type: "work",
    },
    {
      id: 3,
      year: "2020",
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      description:
        "Built responsive web applications and mobile-first experiences.",
      technologies: ["Vue.js", "JavaScript", "CSS3", "Firebase"],
      achievements: [
        "Launched 5 products",
        "Improved UX metrics by 60%",
        "Built design system",
      ],
      image: "/images/logo.png",
      link: "",
      type: "work",
    },
    {
      id: 3,
      year: "2020",
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      description:
        "Built responsive web applications and mobile-first experiences.",
      technologies: ["Vue.js", "JavaScript", "CSS3", "Firebase"],
      achievements: [
        "Launched 5 products",
        "Improved UX metrics by 60%",
        "Built design system",
      ],
      image: "/images/logo.png",
      link: "",
      type: "intern",
    },
    {
      id: 5,
      year: "2020",
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      description:
        "Built responsive web applications and mobile-first experiences.",
      technologies: ["Vue.js", "JavaScript", "CSS3", "Firebase"],
      achievements: [
        "Launched 5 products",
        "Improved UX metrics by 60%",
        "Built design system",
      ],
      image: "/images/logo.png",
      link: "",
      type: "volunteership",
    },
    {
      id: 4,
      year: "2020",
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      description:
        "Built responsive web applications and mobile-first experiences.",
      technologies: ["Vue.js", "JavaScript", "CSS3", "Firebase"],
      achievements: [
        "Launched 5 products",
        "Improved UX metrics by 60%",
        "Built design system",
      ],
      image: "/images/logo.png",
      link: "",
      type: "volunteership",
    },
    {
      id: 9,
      year: "2020",
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      description:
        "Built responsive web applications and mobile-first experiences.",
      technologies: ["Vue.js", "JavaScript", "CSS3", "Firebase"],
      achievements: [
        "Launched 5 products",
        "Improved UX metrics by 60%",
        "Built design system",
      ],
      image: "/images/logo.png",
      link: "",
      type: "volunteership",
    },
  ];
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
              timelineData={timelineData.filter(
                (item) => item.type === selectedFilter
              )}
            />
          </div>
        </div>
      </section>
    </section>
  );
}
