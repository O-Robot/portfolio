"use client";
import ParticleBackground from "@/components/three/particle-background";
import { isWebGLSupported } from "@/utils/webgl-utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Download, Pencil, Send } from "lucide-react";
import HolographicAvatar from "@/components/three/holographic-avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Timeline from "@/components/sections/timeline";
import timelineData from "@/data/experience.json";
import skills from "@/data/skills.json";
import robot from "@/data/about.json";
import contact from "@/data/contact.json";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TruncateText } from "@/utils/constants";

export default function HomePage() {
  const router = useRouter();
  const [webglSupported, setWebglSupported] = useState(true);
  const [mounted, setMounted] = useState(false);
  const connect = ["Github", "LinkedIn"];

  useEffect(() => {
    setWebglSupported(isWebGLSupported());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="bg-background">
      {/* section hero  */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
        </div>

        {/* WebGL Warning */}
        {!webglSupported && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 left-4 right-4 z-20"
          >
            <div className="glass-morphism border-accent/50 rounded-lg p-3 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-accent">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">
                  3D features unavailable - displaying in 2D mode
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Holographic Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8"
            >
              <HolographicAvatar avatar="" />
            </motion.div>

            {/* Name with Liquid Gradient */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-6xl md:text-8xl font-bold mb-6 text-primary-text liquid-gradient"
            >
              {robot.name}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl md:text-2xl text-primary-text mb-8 font-light"
            >
              {robot.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {/* <Button
                size="lg"
                className="glass-morphism hover:animate-glow text-white border-cyan-400 hover:border-cyan-300 px-8 py-4 text-lg bg-transparent"
                variant="outline"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Explore My Universe
              </Button> */}
              <Button
                size="lg"
                className="glass-morphism hover:animate-glow text-primary-text  px-8 py-4 text-lg bg-transparent"
                variant="outline"
                onClick={() => router.push("/resume")}
              >
                {/* <Download className="mr-2 h-5 w-5" /> */}
                {/* 📄 */}
                View Résumé
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>
      {/* section about */}
      <section id="about" className="py-20 relative">
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
            className="  flex justify-center"
          >
            <div className="text-xl text-center  text-primary-text/80 w-full whitespace-pre-line">
              {TruncateText(robot.about, 550)}
              <div className="flex justify-center gap-3 py-6">
                <Button
                  size="lg"
                  onClick={() => router.push("/about")}
                  className="glass-morphism hover:animate-glow px-8 py-4 text-lg bg-transparent"
                  variant="outline"
                >
                  Read More
                </Button>
                {/* <Button
                  size="lg"
                  className="glass-morphism hover:animate-glow text-white border-purple-400 hover:border-purple-300 px-8 py-4 text-lg bg-transparent"
                  variant="outline"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button> */}
              </div>
            </div>
          </motion.div>{" "}
        </div>
      </section>
      {/* experience tabs  */}
      <section id="experience" className="py-20 relative">
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
            <p className="text-xl text-primary-text/80 max-w-3xl mx-auto">
              A timeline of growth, learning, and achievements
            </p>
          </motion.div>
          <Timeline timelineData={timelineData.slice(0, 3)} />
          <div className="flex justify-center gap-3 py-10">
            <Button
              size="lg"
              onClick={() => router.push("/experience")}
              className="glass-morphism hover:animate-glow px-8 py-4 text-lg bg-transparent"
              variant="outline"
            >
              View All
            </Button>
          </div>
        </div>
      </section>

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
                  style={logo.style} // Still applies the icon color
                  data-inline="false"
                ></span>
                <h4 className="z-10 font-medium">{logo.skillName}</h4>
                {/* Animated rotating border */}
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
      {/* testimonial */}
      {/* AI Assistant and contact */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 iquid-gradient text-primary-text">
              Let&apos;s Connect
            </h2>
            <p className="text-xl text-secondary-text max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let&apos;s discuss how we can
              create something amazing together.
            </p>
          </motion.div>

          <div className="flex flex-col justify-center gap-12 max-w-xl mx-auto">
            {/* Contact Form */}

            {/* Contact Info & AI Assistant */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              {/* Contact Information */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-primary-text flex items-center gap-2">
                    📞 Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full glass-morphism hover:animate-glow"
                    size="lg"
                    onClick={() => {
                      router.push("/contact-me");
                    }}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Contact Me
                  </Button>

                  <Button
                    type="submit"
                    className="w-full glass-morphism  hover:animate-glow"
                    size="lg"
                  >
                    <Pencil className="mr-2 h-5 w-5" />
                    Write a Review
                  </Button>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary-text">
                    🤖 AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/40 to-primary flex items-center justify-center text-sm">
                        AI
                      </div>
                      <div className="flex-1">
                        <p className="text-primary-text/80 text-sm">
                          Hi! I&apos;m Robot. I can help answer questions about
                          Ogooluwa&apos;s experience, schedule meetings, or
                          provide project details. What would you like to know?
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-link-active/10 text-primary-text/80  cursor-pointer hover:bg-white/20"
                      >
                        Tell me about John&apos;s experience
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-link-active/10 text-primary-text/80  cursor-pointer hover:bg-white/20"
                      >
                        What technologies does he use?
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-link-active/10 text-primary-text/80  cursor-pointer hover:bg-white/20"
                      >
                        Schedule a meeting
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-primary-text flex items-center gap-2">
                    🌐 Connect Online
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {contact.socialMediaLinks
                      .filter((link) => connect.includes(link.name))
                      .map((social) => (
                        <motion.a
                          key={social.name}
                          href="#"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 p-3 rounded-lg glass-morphism border text-primary-text/80  cursor-pointer hover:bg-white/20 transition-colors ${social.color}`}
                        >
                          <Icon
                            icon={social.icon}
                            className="transition-transform hover:scale-110"
                          />
                          <span>{social.name}</span>
                        </motion.a>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
}
