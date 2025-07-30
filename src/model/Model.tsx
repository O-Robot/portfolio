import { useStore } from "@/store";
import { useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Model() {
  const { scene, animations } = useGLTF("/models/room.glb");
  const { setBookCover, setLightSwitch, setSceneReady } = useStore();
  const mixer = useRef<THREE.AnimationMixer>(null);
  const videoTexture = useVideoTexture("/textures/arcane.mp4");
  const bookTexture = useTexture("/textures/book-inner.jpg");
  bookTexture.flipY = false;

  // Initialize animations and materials
  useEffect(() => {
    if (!scene || !animations) return;

    // Setup animations
    mixer.current = new THREE.AnimationMixer(scene);

    // fan animation
    const clips = animations.filter((clip) =>
      clip.name.includes("fan_rotation")
    );
    clips.forEach((clip) => {
      const action = mixer.current!.clipAction(clip);
      action.play();
    });

    // Setup materials and shadows
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = child.name !== "Wall";
      child.receiveShadow = true;

      if (child.name === "CPU") {
        child.children.forEach((part) => {
          if (part instanceof THREE.Mesh) {
            part.material = new THREE.MeshPhysicalMaterial({
              roughness: 0,
              color: 0x999999,
              ior: 3,
              transmission: part.name.includes("001") ? 1 : 2,
              opacity: 0.8,
              depthWrite: false,
              depthTest: false,
            });
          }
        });
      }

      if (child.name === "Book") {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          map: bookTexture,
        });
        setBookCover(child.children[0]);
      }

      if (child.name === "SwitchBoard") {
        setLightSwitch(child.children[0]);
      }

      if (child.name === "Stand") {
        const screen = child.children[0];
        if (screen instanceof THREE.Mesh) {
          screen.material = new THREE.MeshBasicMaterial({
            map: videoTexture,
          });
        }
      }
    });
    setSceneReady(true);
  }, [
    scene,
    animations,
    bookTexture,
    videoTexture,
    setBookCover,
    setLightSwitch,
    setSceneReady,
  ]);

  // Animation loop
  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={scene} />;
}
