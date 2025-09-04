"use client";
import { Suspense, useEffect, useState } from "react";
import Scene from "@/components/three/Scene";
import Loader from "@/components/three/Loader";
import SideNav from "@/components/ui/SideNav";
import { Canvas } from "@react-three/fiber";
import CloseButton from "@/components/ui/close-button";
import { useStore } from "@/store";

export default function Home() {
  const { sceneReady } = useStore();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (sceneReady) {
      const timer = setTimeout(() => setShowLoader(false), 500);
      return () => clearTimeout(timer);
    }
  }, [sceneReady]);
  return (
    <div className="fixed inset-0">
      <SideNav />
      <CloseButton />

      <div className="absolute inset-0">
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
