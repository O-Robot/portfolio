"use client";
import { Suspense } from "react";
import Scene from "@/components/Scene";
import Loader from "@/components/Loader";
import Header from "@/components/ui/Header";
import SideNav from "@/components/ui/SideNav";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div className="fixed inset-0">
      <Header />
      <SideNav />

      <div className="absolute inset-0">
        <Suspense fallback={<Loader />}>
          <Canvas
            shadows
            camera={{
              position: [
                3, 2, 2,
              ],
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
