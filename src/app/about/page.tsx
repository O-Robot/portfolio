"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Timeline from "@/components/sections/timeline";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import skills from "@/data/skills.json";
import robot from "@/data/about.json";
import contact from "@/data/contact.json";

export default function AboutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="bg-background">
      {/* about */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text">
              About Me
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=" mb-16 flex flex-col lg:flex-row gap-10 justify-between px-2 lg:px-10"
          >
            <div className="text-xl text-justify  text-primary-text/80 w-full lg:w-1/2">
              {robot.about}
            </div>
            <div className="text-xl text-white/80 w-full lg:w-1/2 px-2 lg:px-8 flex flex-col gap-8">
              <Image
                src={robot.image}
                alt="me"
                height={200}
                width={500}
                className="rounded-2xl"
              />

              <div className="border-t border-b border-primary-text/80 py-4 flex gap-3">
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
                      className="transition-transform hover:scale-110"
                    />
                  </a>
                ))}
              </div>
              <div className="rounded-xl flex justify-center flex-col px-4 py-6 max-w-100 bg-[#070d1e]items-center text-center gap-4">
                <p className="text-primary-text text-lg">
                  Let’s connect and build something awesome together.
                </p>
                <p className="text-sm text-primary-text/40">
                  Send me a message!
                </p>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    router.push("/contact-me");
                  }}
                >
                  Contact
                </Button>
              </div>
            </div>
          </motion.div>{" "}
        </div>
      </section>
      {/* education */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text">
              My Educational Journey
            </h2>
            <p className="text-xl text-primary-text/80 max-w-3xl mx-auto">
              A timeline of learning, milestones, and academic growth
            </p>
          </motion.div>
          <Timeline timelineData={robot.education} />
        </div>
      </section>
      {/* top skills */}
      {/* top skills */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text">
              Top Skills
            </h2>
            {/* <p className="text-xl text-white/80 max-w-3xl mx-auto">
                    A timeline of growth, learning, and achievements
                  </p> */}
          </motion.div>
          <motion.div
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
                  style={logo.style}
                  data-inline="false"
                ></span>
                <h4 className="z-10 font-medium">{logo.skillName}</h4>
                <span
                  className="animated-border"
                  style={
                    {
                      "--border-color": logo.style.color,
                    } as React.CSSProperties
                  }
                ></span>
              </li>
            ))}
          </motion.div>{" "}
        </div>
      </section>
    </section>
  );
}
