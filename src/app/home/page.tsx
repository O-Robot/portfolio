"use client";
import ParticleBackground from "@/components/three/particle-background";
import { isWebGLSupported } from "@/utils/webgl-utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Download, Rocket } from "lucide-react";
import HolographicAvatar from "@/components/three/holographic-avatar";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";

export default function HomePage() {
  const [webglSupported, setWebglSupported] = useState(true);
  const { theme } = useStore();

  useEffect(() => {
    setWebglSupported(isWebGLSupported());
    // setTheme("dark");
  }, []);
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
      {/* experience tabs  */}
      {/* top skills */}
      {/* testimonial */}
      {/* AI Assistant */}
    </section>
  );
}
