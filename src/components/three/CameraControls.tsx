"use client";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useStore } from "@/store";
import {
  aboutCameraPos,
  aboutCameraRot,
  defaultCameraPos,
  defaultCameraRot,
  projectsCameraPos,
  projectsCameraRot,
} from "@/utils/constants";

export function CameraControls() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const { view, setControlsEnabled, resetProjects } = useStore();

  useEffect(() => {
    if (!camera) return;

    const duration = 1.5;

    switch (view) {
      case "about":
        gsap.to(camera.position, { ...aboutCameraPos, duration });
        gsap.to(camera.rotation, { ...aboutCameraRot, duration });
        break;
      case "projects":
        gsap.to(camera.position, { ...projectsCameraPos, duration });
        gsap.to(camera.rotation, { ...projectsCameraRot, duration });
        resetProjects();
        break;
      case "default":
        gsap.to(camera.position, { ...defaultCameraPos, duration });
        gsap.to(camera.rotation, { ...defaultCameraRot, duration });
        gsap.delayedCall(duration, () => setControlsEnabled(true));
        break;
    }
  }, [view, camera, setControlsEnabled, resetProjects]);

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={view === "default"}
      enablePan={false}
      minDistance={0.9}
      maxDistance={1.6}
      minAzimuthAngle={0.2}
      maxAzimuthAngle={Math.PI * 0.78}
      minPolarAngle={0.3}
      maxPolarAngle={Math.PI / 2}
    />
  );
}
