"use client";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/three/particle-background";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <section className="bg-background">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-auto w-full"
          >
            <div className="flex flex-col justify-center items-center text-primary-text">
              <motion.div
                animate={{ y: [-8, 5, -5] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/404.png"
                  alt="Lost robot"
                  width={300}
                  height={500}
                />
              </motion.div>
              <motion.div
                animate={{ y: [-8, 5, -5] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {/* <h1 className="text-9xl font-bold mb-4 text-primary">404</h1> */}
                <p className="text-2xl mb-8">
                  Looks like you wandered off the beaten path!
                </p>
              </motion.div>

              <div className="flex gap-4 ">
                <Button
                  size="lg"
                  className="text-white"
                  variant="default"
                  onClick={() => router.push("/")}
                >
                  Take me Home
                </Button>
                <Button
                  size="lg"
                  variant={"outline"}
                  onClick={() => router.push("/projects")}
                >
                  See my Projects
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  );
}
