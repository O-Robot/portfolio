"use client";

import { Suspense } from "react";
import { OrbitControls, Text } from "@react-three/drei";
import Model from "../model/Model";
import Lights from "./Lights";
import Loader from "./Loader";
import { useStore } from "@/store";
import Text3D from "./ui/Text";
import { useClickListeners } from "@/hooks/listeners";

export default function Scene() {
  const { theme } = useStore();
  const handlePlay = () => {
    // const audio = new Audio(
    //   "https://jollofradiomedia.blob.core.windows.net/static/audio/Konga-Happiness-Song-2015.mp3"
    // );
    // audio.play().catch((error) => {
    //   console.error("Error playing audio:", error);
    // });
  };
  useClickListeners();

  return (
    // <Canvas
    //   shadows
    //   camera={{
    //     position: [1.009, 0.546, 0.498],
    //     rotation: [-0.831, 0.938, 0.724],
    //     fov: 75,
    //     near: 0.01,
    //     far: 1000,
    //   }}
    //   gl={{ antialias: true }}
    //   style={{
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     width: "100vw",
    //     height: "100vh",
    //     zIndex: 0,
    //   }}
    // >
    <Suspense fallback={null}>
      <Model />
      <Lights />
      <Text3D />

      <OrbitControls
        enablePan={false}
        minDistance={0.9}
        maxDistance={1.6}
        minAzimuthAngle={0.2}
        maxAzimuthAngle={Math.PI * 0.78}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2}
      />
    </Suspense>
  );
}
