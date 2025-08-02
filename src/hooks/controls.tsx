import { useStore } from "@/store";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  aboutCameraPos,
  aboutCameraRot,
  defaultCameraPos,
  defaultCameraRot,
  projectsCameraPos,
  projectsCameraRot,
} from "@/utils/constants";

export function useCameraControls() {
  const { camera } = useThree();
  const { view, bookCover, setControlsEnabled, sceneReady } = useStore();
  const hasPlayedIntro = useRef(false);

  // Intro animation when scene first loads
  useEffect(() => {
    if (sceneReady && !hasPlayedIntro.current) {
      setControlsEnabled(false);
      hasPlayedIntro.current = true;

      // Start from far away
      camera.position.set(2, 1, 1);
      camera.lookAt(0, 0, 0);

      // Zoom out first
      gsap.to(camera.position, {
        x: 3,
        y: 2,
        z: 2,
        duration: 1,
        ease: "power2.out",
      });

      // Then zoom into the default position
      gsap.to(camera.position, {
        ...defaultCameraPos,
        duration: 2.5,
        delay: 1.2,
        ease: "power2.inOut",
      });

      gsap.to(camera.rotation, {
        ...defaultCameraRot,
        duration: 2.5,
        delay: 1.2,
        ease: "power2.inOut",
      });

      // Enable controls after intro
      gsap.delayedCall(4, () => {
        setControlsEnabled(true);
      });
    }
  }, [sceneReady, camera, setControlsEnabled]);

  useEffect(() => {
    if (!sceneReady || !hasPlayedIntro.current) return;

    const duration = 1.5;

    switch (view) {
      case "about":
        setControlsEnabled(false);

        // Move camera to about position
        gsap.to(camera.position, {
          ...aboutCameraPos,
          duration,
        });
        gsap.to(camera.rotation, {
          ...aboutCameraRot,
          duration,
        });

        // Flip book cover after camera movement
        if (bookCover) {
          gsap.delayedCall(duration, () => {
            gsap.to(bookCover.rotation, {
              x: Math.PI,
              duration: 1,
            });
          });
        }
        break;

      case "projects":
        setControlsEnabled(false);

        // Move camera to projects position
        gsap.to(camera.position, {
          ...projectsCameraPos,
          duration,
        });
        gsap.to(camera.rotation, {
          ...projectsCameraRot,
          duration,
        });
        break;

      case "default":
        // Reset camera to default position
        gsap.to(camera.position, {
          ...defaultCameraPos,
          duration,
        });
        gsap.to(camera.rotation, {
          ...defaultCameraRot,
          duration,
        });

        // Reset book cover
        if (bookCover) {
          gsap.to(bookCover.rotation, {
            x: 0,
            duration,
          });
        }

        // Re-enable controls after animation
        gsap.delayedCall(duration, () => {
          setControlsEnabled(true);
        });
        break;
    }
  }, [view, camera, bookCover, setControlsEnabled, sceneReady]);
}
