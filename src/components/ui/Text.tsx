import { useStore } from "@/store";
import { Text3D as DreiText3D } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

gsap.registerPlugin();
export default function Text3D() {
  const { theme } = useStore();
  const titleRef = useRef<THREE.Mesh>(null);
  const subtitleRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const titleMaterial = titleRef.current.material as THREE.Material[];
    const subtitleMaterial = subtitleRef.current.material as THREE.Material[];

    if (theme === "dark") {
      // Dark theme colors
      if (Array.isArray(titleMaterial)) {
        gsap.to(titleMaterial[0], { r: 8, g: 8, b: 8, duration: 0 });
        gsap.to(titleMaterial[1], { r: 5, g: 5, b: 5, duration: 0 });
      }
      if (Array.isArray(subtitleMaterial)) {
        gsap.to(subtitleMaterial[0], { r: 8, g: 8, b: 8, duration: 0 });
        gsap.to(subtitleMaterial[1], { r: 5, g: 5, b: 5, duration: 0 });
      }
    } else {
      // Light theme colors
      if (Array.isArray(titleMaterial)) {
        gsap.to(titleMaterial[0], {
          r: 0.09019607843137255,
          g: 0.12156862745098039,
          b: 0.15294117647058825,
          duration: 0,
        });
        gsap.to(titleMaterial[1], { r: 1, g: 1, b: 1, duration: 0 });
      }
      if (Array.isArray(subtitleMaterial)) {
        gsap.to(subtitleMaterial[0], {
          r: 0.09019607843137255,
          g: 0.12156862745098039,
          b: 0.15294117647058825,
          duration: 0,
        });
        gsap.to(subtitleMaterial[1], { r: 1, g: 1, b: 1, duration: 0 });
      }
    }
  }, [theme]);

  const textMaterials = [
    new THREE.MeshPhongMaterial({ color: 0x171f27, flatShading: true }),
    new THREE.MeshPhongMaterial({ color: 0xffffff }),
  ];

  return (
    <>
      <DreiText3D
        ref={titleRef}
        font="/fonts/unione.json"
        size={0.08}
        height={0.01}
        position={[-0.27, 0.55, 0.9]}
        rotation={[0, Math.PI * 0.5, 0]}
        material={textMaterials}
      >
        Ogooluwani Adewale
      </DreiText3D>

      <DreiText3D
        ref={subtitleRef}
        font="/fonts/helvatica.json"
        size={0.024}
        height={0}
        position={[-0.255, 0.49, 0.52]}
        rotation={[0, Math.PI * 0.5, 0]}
        material={textMaterials}
      >
        Software Developer
      </DreiText3D>
    </>
  );
}
