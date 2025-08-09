"use client";
import ParticleBackground from "@/components/three/particle-background";
import { isWebGLSupported } from "@/utils/webgl-utils";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Briefcase,
  BriefcaseBusiness,
  Calendar,
  Download,
  MapPin,
  Rocket,
} from "lucide-react";
import HolographicAvatar from "@/components/three/holographic-avatar";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const [webglSupported, setWebglSupported] = useState(true);
  const { theme } = useStore();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    setWebglSupported(isWebGLSupported());
    // setTheme("dark");
  }, []);

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
    },
  ];

  return (
    <section className={`${theme === "dark" ? "bg-black" : "bg-black/20"}`}>
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
            <div className="glass-morphism border-yellow-400/50 rounded-lg p-3 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-yellow-400">
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
              <HolographicAvatar />
            </motion.div>

            {/* Name with Liquid Gradient */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-6xl md:text-8xl font-bold mb-6 liquid-gradient font-sora"
            >
              Ogooluwani Adewale
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/80 mb-8 font-light"
            >
              Inventing tomorrows web, one line of code at a time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="glass-morphism hover:animate-glow text-white border-cyan-400 hover:border-cyan-300 px-8 py-4 text-lg bg-transparent"
                variant="outline"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Explore My Universe
              </Button>
              <Button
                size="lg"
                className="glass-morphism hover:animate-glow text-white border-purple-400 hover:border-purple-300 px-8 py-4 text-lg bg-transparent"
                variant="outline"
              >
                <Download className="mr-2 h-5 w-5" />
                {/* 📄 */}
                Download Resume
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
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">
              About Me
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="  flex justify-center"
          >
            <div className="text-xl text-center  text-white/80 w-1/2">
              👋 Hey there! I am John Doe, 🎓 a proud graduate of 
              Engineering College, where I am pursuing a Bachelors degree in
              Electronics and Communication Engineering and building a solid
              foundation in technology.
              <br />
              <br />
              💻 I am also an avid developer, enthusiastic volunteer, and public
              speaker, and I love exploring new opportunities and avenues.{" "}
              <br />
              <br />
              🎮 As a self-taught developer, I have spent countless hours
              sharpening my skills and learning new techniques to bring my ideas
              to life.
              <br />
              <div className="flex justify-center gap-3 py-6">
                <Button
                  size="lg"
                  onClick={() => router.push("/about")}
                  className="glass-morphism hover:animate-glow text-white border-purple-400 hover:border-purple-300 px-8 py-4 text-lg bg-transparent"
                  variant="outline"
                >
                  Read More
                </Button>
                <Button
                  size="lg"
                  className="glass-morphism hover:animate-glow text-white border-purple-400 hover:border-purple-300 px-8 py-4 text-lg bg-transparent"
                  variant="outline"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {/* 📄 */}
                  Download Resume
                </Button>
              </div>
            </div>
          </motion.div>{" "}
        </div>
      </section>
      {/* experience tabs  */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">
              My Professional Journey
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A timeline of growth, learning, and achievements
            </p>
          </motion.div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full" />

            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative flex items-center"
                >
                  {/* Image on Timeline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className="w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl ring-4 ring-cyan-400/30 backdrop-blur-sm bg-white flex justify-center items-center">
                      <Image
                        src={item?.image}
                        alt="me"
                        height={50}
                        width={50}
                        className="object-contain "
                      />
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-16" : "pl-16 ml-auto"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      onClick={() =>
                        setSelectedItem(
                          selectedItem === item.id ? null : item.id
                        )
                      }
                      className="cursor-pointer"
                    >
                      <Card className="glass-morphism border border-white/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm bg-white/5">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-cyan-400" />
                            <span className="text-cyan-400 font-semibold">
                              {item.year}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white mb-2">
                            {item.title}
                          </h3>

                          <div className="flex items-center gap-2 mb-3">
                            <BriefcaseBusiness className="h-4 w-4 text-purple-400" />
                            <span className="text-white/80">
                              {item.company}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="h-4 w-4 text-green-400" />
                            <span className="text-white/60">
                              {item.location}
                            </span>
                          </div>

                          <p className="text-white/70 mb-4">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Expanded Details Modal */}
            <AnimatePresence>
              {selectedItem && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedItem(null)}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-morphism rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                  >
                    {(() => {
                      const item = timelineData.find(
                        (i) => i.id === selectedItem
                      );
                      if (!item) return null;

                      return (
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-4">
                            {item.title}
                          </h3>
                          <p className="text-white/80 mb-6">
                            {item.description}
                          </p>

                          <h4 className="text-lg font-semibold text-cyan-400 mb-3">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-2 mb-6">
                            {item.achievements.map(
                              (achievement: any, i: any) => (
                                <li
                                  key={i}
                                  className="text-white/70 flex items-center"
                                >
                                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                                  {achievement}
                                </li>
                              )
                            )}
                          </ul>

                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech: any) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-white/10 text-white"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-3 py-10">
            <Button
              size="lg"
              onClick={() => router.push("/experience")}
              className="glass-morphism hover:animate-glow text-white border-purple-400 hover:border-purple-300 px-8 py-4 text-lg bg-transparent"
              variant="outline"
            >
              View All
            </Button>
          </div>
        </div>
      </section>

      {/* top skills */}
      {/* testimonial */}
      {/* AI Assistant and contact */}
    </section>
  );
}
