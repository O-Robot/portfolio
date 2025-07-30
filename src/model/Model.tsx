import { useStore } from "@/store";
import { useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Model() {
  const { scene, animations } = useGLTF("/models/room.glb");
  const { setBookCover, setLightSwitch, setSceneReady } = useStore();
  const mixer = useRef<THREE.AnimationMixer>(null);
  const videoTexture = useVideoTexture("/textures/arcane.mp4");
  const bookTexture = useTexture("/textures/book-inner.jpg");
  const screenTexture = useTexture("/textures/book-inner.jpg");
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
      // console.log(child.name);
      // book
      if (child.children) {
        child.children.forEach((innerChild) => {
          // disable shadow by book cover & switch btn
          if (innerChild instanceof THREE.Mesh) {
            if (innerChild.name !== "Book001" && innerChild.name !== "Switch") {
              innerChild.castShadow = true;
            }

            if (innerChild.name === "Book001") {
              const bookCoverTexture = new THREE.TextureLoader().load(
                "/textures/book-cover.jpg"
              );
              bookCoverTexture.flipY = false;
              innerChild.material = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                color: 0xffffff,
                map: bookCoverTexture,
              });
            }
            innerChild.receiveShadow = true;
          }
        });
      }
      // book inner
      if (child.name === "Book") {
        setBookCover(child.children[0]);

        // adding texture to book
        const bookTexture = new THREE.TextureLoader().load(
          "textures/book-inner.jpg"
        );
        bookTexture.flipY = false;
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          map: bookTexture,
        });
      }

      // cpu
      if (child.name === "CPU") {
        const applyMaterial = (mesh: THREE.Object3D, transmission: number) => {
          if (!(mesh instanceof THREE.Mesh)) return;

          mesh.material = new THREE.MeshPhysicalMaterial({
            roughness: 0,
            color: new THREE.Color(0x222222),
            ior: 3,
            transmission,
            opacity: 0.8,
            transparent: true,
            depthWrite: false,
            depthTest: false,
            clearcoat: 1,

            envMapIntensity: 1,
          });
        };

        // Apply refined materials to CPU components
        for (let i = 0; i < child.children.length; i++) {
          const mesh = child.children[i];
          // Alternate between solid frame and translucent panels
          const isGlass = mesh.name.toLowerCase().includes("glass");
          applyMaterial(mesh, isGlass ? 2 : 1);
        }
      }

      // switchboard
      if (child.name === "SwitchBoard") {
        setLightSwitch(child.children[0]);
      }

      // stand
      if (child.name === "Stand") {
        const screen = child.children[0];
        if (screen instanceof THREE.Mesh) {
          screen.material = new THREE.MeshBasicMaterial({
            map: videoTexture,
          });
        }
      }

      const applyRGBGlow = (mesh: THREE.Mesh) => {
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissiveIntensity: 1,
        });
      };

      switch (child.name) {
        case "Keyboard":
        case "Mouse":
        case "Speaker-R":
        case "Speaker-L":
          applyRGBGlow(child); // apply RGB glow
          break;

        case "Mobile_Screen":
          child.material = new THREE.MeshStandardMaterial({
            map: screenTexture,
            emissive: new THREE.Color(0xffffff),
            emissiveMap: screenTexture,
            emissiveIntensity: 1,
            side: THREE.DoubleSide,
          });
          break;

        default:
          // No-op
          break;
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
    screenTexture,
  ]);

  // Animation loop
  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={scene} />;
}
