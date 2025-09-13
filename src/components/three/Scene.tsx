"use client";

import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Model from "../../model/Model";
import Lights from "./Lights";
import { useStore } from "@/store";
import Text3D from "../ui/Text";
import { useClickListeners } from "@/hooks/listeners";
import { useCameraControls } from "@/hooks/controls";

export default function Scene() {
  const { controlsEnabled } = useStore();

  useCameraControls();
  useClickListeners();

  return (
    <>
      <Suspense fallback={null}>
        <Lights />
      </Suspense>
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <Suspense fallback={null}>
        <Text3D />
      </Suspense>
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
    </>
  );
}
