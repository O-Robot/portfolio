import { useStore } from "@/store";
import { useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Model() {
  const { scene, animations } = useGLTF("/models/room.glb");
  const { theme, setBookCover, setLightSwitch, setSceneReady } = useStore();
  const mixer = useRef<THREE.AnimationMixer>(null);
  const videoTexture = useVideoTexture("/textures/arcane.mp4", {
    start: false,
    loop: true,
  });
  const bookTexture = useTexture("/textures/book-inner.jpg");
  const screenTexture = useTexture("/textures/screen.png");
  const plantRefs = useRef<{ [key: string]: THREE.Mesh }>({});
  const speakerRefs = useRef<{ [key: string]: THREE.Mesh }>({});
  bookTexture.flipY = false;
  // Initialize animations and materials
  useEffect(() => {
    if (!scene || !animations) return;

    if (scene && videoTexture?.image instanceof HTMLVideoElement) {
      videoTexture.image.play().catch((err) => {
        console.warn("Video autoplay failed:", err);
      });
    }
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
      // book
      if (child.children) {
        child.children.forEach((innerChild) => {
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
        setBookCover(child.children[0] as THREE.Mesh);
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
      const applyPlantGlow = (mesh: THREE.Mesh, name: string) => {
        const baseColor =
          mesh.material instanceof THREE.MeshStandardMaterial
            ? mesh.material.color
            : new THREE.Color(0x4a5d23);

        const material = new THREE.MeshStandardMaterial({
          color: baseColor,
          emissive: new THREE.Color(0x209a0b),
          emissiveIntensity: 0.08, // Start dim
          roughness: 0.6,
        });
        mesh.material = material;
        plantRefs.current[name] = mesh;
      };

      switch (child.name) {
        case "Plant":
          applyPlantGlow(child, "plant");
          break;
        case "Plant_Pot":
          applyPlantGlow(child, "pot");
          break;
        // case "Pot_Soil":
        //   applyPlantGlow(child, "soil");
        //   break;
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

  useEffect(() => {
    const duration = 0.8;

    // Speaker glow intensities
    const speakerIntensity = theme === "dark" ? 0.4 : 0.05;
    Object.values(speakerRefs.current).forEach((mesh) => {
      if (mesh?.material) {
        gsap.to(mesh.material, {
          emissiveIntensity: speakerIntensity,
          duration,
        });
      }
    });

    // const plantIntensity = theme === "dark" ? 0.2 : 0.05;
    // Object.values(plantRefs.current).forEach((mesh) => {
    //   if (mesh?.material) {
    //     gsap.to(mesh.material, {
    //       emissiveIntensity: plantIntensity,
    //       duration,
    //     });
    //   }
    // });

    // const rgbIntensity = theme === "dark" ? 0.3 : 0.1;
    // Object.values(rgbRefs.current).forEach((mesh) => {
    //   if (mesh?.material) {
    //     gsap.to(mesh.material, {
    //       emissiveIntensity: rgbIntensity,
    //       duration,
    //     });
    //   }
    // });
  }, [theme]);

  // Animation loop
  useFrame((state, delta) => {
    mixer.current?.update(delta);
    if (theme === "dark") {
      const time = state.clock.elapsedTime;
      const speakerR = speakerRefs.current.speakerR;
      const speakerL = speakerRefs.current.speakerL;

      if (speakerR?.material) {
        const pulse = 0.4 + Math.sin(time * 2) * 0.1;
        (speakerR.material as THREE.MeshStandardMaterial).emissiveIntensity =
          pulse;
      }

      if (speakerL?.material) {
        const pulse = 0.4 + Math.sin(time * 2.5) * 0.1;
        (speakerL.material as THREE.MeshStandardMaterial).emissiveIntensity =
          pulse;
      }
    }
  });

  return <primitive object={scene} />;
}
