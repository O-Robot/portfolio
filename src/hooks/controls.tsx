import { useStore } from "@/store";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect } from "react";
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
  const { view, bookCover, setControlsEnabled } = useStore();

  useEffect(() => {
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
          gsap.to(bookCover.rotation, {
            x: Math.PI,
            duration,
            delay: duration,
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
  }, [view, camera, bookCover, setControlsEnabled]);
}
