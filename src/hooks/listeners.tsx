import { useStore } from "@/store";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export function useClickListeners() {
  const { camera, scene, gl } = useThree();
  const { theme, setTheme, setView, lightSwitch, bookCover } = useStore();

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      // Prevent clicks on UI elements
      const target = event.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.closest("button")) {
        return;
      }

      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children, true);

      for (const intersect of intersects) {
        const objectName = intersect.object.name;

        // Handle light switch click
        if (objectName === "SwitchBoard" || objectName === "Switch") {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
          console.log("clicked");
          // Animate switch rotation
          if (lightSwitch) {
            const targetRotation = newTheme === "dark" ? Math.PI / 7 : 0;
            lightSwitch.rotation.z = targetRotation;
          }
          break;
        }

        // Handle book click
        if (objectName === "Book" || objectName === "Book001") {
          setView("about");
          break;
        }

        // Handle project plane clicks
        if (objectName === "project" && intersect.object.userData?.url) {
          window.open(intersect.object.userData.url, "_blank");
          break;
        }
      }
    };

    const canvas = gl.domElement;
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [camera, scene, gl, theme, setTheme, setView, lightSwitch, bookCover]);
}
