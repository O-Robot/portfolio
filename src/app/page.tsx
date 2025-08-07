"use client";
import { Suspense } from "react";
import Scene from "@/components/three/Scene";
import Loader from "@/components/three/Loader";
import SideNav from "@/components/ui/SideNav";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div className="fixed inset-0">
      <SideNav />

      <div className="absolute inset-0">
        <Suspense fallback={<Loader />}>
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
