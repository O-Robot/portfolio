"use client";
import { Suspense, useEffect, useState } from "react";
import Scene from "@/components/three/Scene";
import Loader from "@/components/three/Loader";
import SideNav from "@/components/ui/SideNav";
import { Canvas } from "@react-three/fiber";
import CloseButton from "@/components/ui/close-button";
import { useStore } from "@/store";
import { isWebGLSupported } from "@/utils/webgl-utils";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [webglSupported, setWebglSupported] = useState(true);

  const { sceneReady } = useStore();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setWebglSupported(isWebGLSupported());

    if (sceneReady) {
      const timer = setTimeout(() => setShowLoader(false), 200);
      return () => clearTimeout(timer);
    }
  }, [sceneReady]);
  return (
    <div className="fixed inset-0">
      <SideNav />
      <CloseButton />

      <div className="absolute inset-0">
        {/* WebGL Warning */}
        {!webglSupported && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 z-60"
        >
          <div className="glass-morphism border-accent/50 rounded-lg p-3 max-w-md mx-auto">
            <div className="flex items-center gap-2 text-accent">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                3D features unavailable - displaying in 2D mode
              </span>
              <Button
                size="lg"
                className="text-white"
                variant="default"
                onClick={() => router.push("/")}
              >
                Take me Home
              </Button>
            </div>
          </div>
        </motion.div>
         )} 
        {showLoader && <Loader />}
        <Suspense fallback={null}>
          <Canvas
            shadows
            camera={{
              position: [3, 2, 2],
              fov: 75,
            }}
            gl={{
              antialias: true,
            }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
