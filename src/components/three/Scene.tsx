"use client";

import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Model from "../../model/Model";
import Lights from "./Lights";
import Loader from "./Loader";
import { useStore } from "@/store";
import Text3D from "../ui/Text";
import { useClickListeners } from "@/hooks/listeners";
import { useCameraControls } from "@/hooks/controls";

export default function Scene() {
  const { controlsEnabled } = useStore();
  const handlePlay = () => {
    // const audio = new Audio(
    //   "https://jollofradiomedia.blob.core.windows.net/static/audio/Konga-Happiness-Song-2015.mp3"
    // );
    // audio.play().catch((error) => {
    // });
  };
  useCameraControls();
  useClickListeners();

  return (
    <Suspense fallback={null}>
      <Lights />
      <Model />
      <Text3D />
      <OrbitControls
        enabled={controlsEnabled}
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
