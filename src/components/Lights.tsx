import { useStore } from "@/store";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const { theme, lightSwitch, view } = useStore();
  const ambientLight = useRef<THREE.AmbientLight>(null);
  const roomLight = useRef<THREE.PointLight>(null);
  const fanLight5 = useRef<THREE.PointLight>(null);
  const textLights = useRef<THREE.PointLight[]>([]);

  useEffect(() => {
    if (!roomLight.current || !ambientLight.current || !fanLight5.current)
      return;

    const duration = 0.5;
    const lightColorHex = theme === "dark" ? 0x4545af : 0xffffff;
    const ambientColorHex = theme === "dark" ? 0x2c3b4f : 0xffffff;
    const fanDistance = theme === "dark" ? 0.07 : 0.05;
    const textIntensity = theme === "dark" ? 0.6 : 0;
    const roomIntensity = theme === "dark" ? 1.5 : view === "about" ? 1 : 2.5;

    // Convert hex to RGB for GSAP
    const lightColor = new THREE.Color(lightColorHex);
    const ambientColor = new THREE.Color(ambientColorHex);

    gsap.to(roomLight.current, {
      intensity: roomIntensity,
      duration,
    });

    gsap.to(roomLight.current.color, {
      r: lightColor.r,
      g: lightColor.g,
      b: lightColor.b,
      duration,
    });

    gsap.to(ambientLight.current, {
      intensity: theme === "dark" ? 0.3 : 0.6,
      duration,
    });

    gsap.to(ambientLight.current.color, {
      r: ambientColor.r,
      g: ambientColor.g,
      b: ambientColor.b,
      duration,
    });

    gsap.to(fanLight5.current, {
      distance: fanDistance,
      duration,
    });

    textLights.current.forEach((light: any) => {
      if (light) {
        gsap.to(light, {
          intensity: textIntensity,
          duration,
        });
      }
    });

    // Animate light switch
    if (lightSwitch) {
      gsap.to(lightSwitch.rotation, {
        z: theme === "dark" ? Math.PI / 7 : 0,
        duration,
      });
    }

    // Update body theme classes
    if (typeof document !== "undefined") {
      document.body.classList.remove("light-theme", "dark-theme");
      document.body.classList.add(`${theme}-theme`);
    }
  }, [theme, lightSwitch, view]);

  return (
    <>
      <ambientLight ref={ambientLight} intensity={0.6} />
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
        position={[-0.2, 0.6, 0.44]}
        color={0xff0000}
        intensity={0}
        distance={1.1}
      />
      <pointLight
        ref={(ref) => (textLights.current[1] = ref!)}
        position={[-0.2, 0.6, 0.82]}
        color={0xff0000}
        intensity={0}
        distance={1.1}
      />
      <pointLight
        ref={(ref) => (textLights.current[2] = ref!)}
        position={[-0.2, 0.6, 0.11]}
        color={0xff0000}
        intensity={0}
        distance={1.1}
      />
      <pointLight
        ref={(ref) => (textLights.current[3] = ref!)}
        position={[-0.2, 0.6, -0.14]}
        color={0xff0000}
        intensity={0}
        distance={1.1}
      />
    </>
  );
}
