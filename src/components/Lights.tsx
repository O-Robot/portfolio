import { useStore } from "@/store";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const { theme, bookCover } = useStore();
  const ambientLight = useRef<THREE.AmbientLight>(null);
  const roomLight = useRef<THREE.PointLight>(null);
  const fanLight5 = useRef<THREE.PointLight>(null);
  const textLights = useRef<THREE.PointLight[]>([]);

  useEffect(() => {
    if (!roomLight.current || !ambientLight.current || !fanLight5.current)
      return;
    console.log(theme);
    const duration = 0.5;
    const lightColor = theme === "dark" ? 0x4545af : 0xffffff;
    const ambientColor = theme === "dark" ? 0x2c3b4f : 0xffffff;
    const fanDistance = theme === "dark" ? 0.07 : 0.05;
    const textIntensity = theme === "dark" ? 0.6 : 0;

    gsap.to(roomLight.current, {
      intensity: theme === "dark" ? 1.5 : 2.5,
      color: lightColor,
      duration,
    });

    gsap.to(ambientLight.current, {
      intensity: theme === "dark" ? 0.3 : 0.6,
      color: ambientColor,
      duration,
    });

    gsap.to(fanLight5.current, {
      distance: fanDistance,
      duration,
    });

    textLights.current.forEach((light: any) => {
      gsap.to(light, {
        intensity: textIntensity,
        duration,
      });
    });

    if (bookCover) {
      gsap.to(bookCover.rotation, {
        z: theme === "dark" ? Math.PI / 7 : 0,
        duration,
      });
    }
  }, [theme, bookCover]);
  return (
    <>
      <ambientLight  intensity={0.6} />
      <pointLight
        ref={roomLight}
        position={[0.3, 2, 0.5]}
        intensity={2.5}
        distance={10}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.002}
      />

      {/* Fan lights */}
      <pointLight
        position={[0, 0.29, -0.29]}
        color={0xff0000}
        intensity={30}
        distance={0.2}
      />
      <pointLight
        position={[-0.15, 0.29, -0.29]}
        color={0x00ff00}
        intensity={30}
        distance={0.12}
      />
      <pointLight
        position={[0.21, 0.29, -0.29]}
        color={0x00ff00}
        intensity={30}
        distance={0.2}
      />
      <pointLight
        position={[0.21, 0.19, -0.29]}
        color={0x00ff00}
        intensity={30}
        distance={0.2}
      />
      <pointLight
        ref={fanLight5}
        position={[0.21, 0.08, -0.29]}
        color={0x00ff00}
        intensity={30}
        distance={0.05}
      />

      {/* Text lights */}
      <pointLight
        ref={(ref) => (textLights.current[0] = ref!)}
        position={[-0.2, 0.6, 0.24]}
        color={0xff0000}
        intensity={0}
        distance={1.1}
      />
    </>
  );
}
