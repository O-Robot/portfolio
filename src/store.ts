import { create } from "zustand";
import * as THREE from "three";

type View = "default" | "about" | "projects";
type Theme = "light" | "dark";

interface StoreState {
  theme: Theme;
  view: View;
  sceneReady: boolean;
  controlsEnabled: boolean;
  bookCover: THREE.Object3D | null;
  lightSwitch: THREE.Object3D | null;
  setTheme: (theme: Theme) => void;
  setView: (view: View) => void;
  setSceneReady: (ready: boolean) => void;
  setControlsEnabled: (enabled: boolean) => void;
  setBookCover: (obj: THREE.Object3D | null) => void;
  setLightSwitch: (obj: THREE.Object3D | null) => void;
  resetCamera: () => void;
  cameraToAbout: () => void;
  cameraToProjects: () => void;
  resetProjects: () => void;
}

export const useStore = create<StoreState>((set) => ({
  theme: "light",
  view: "default",
  sceneReady: false,
  controlsEnabled: true,
  bookCover: null,
  lightSwitch: null,
  setTheme: (theme) => set({ theme }),
  setView: (view) => set({ view, controlsEnabled: false }),
  setSceneReady: (sceneReady) => set({ sceneReady }),
  setControlsEnabled: (controlsEnabled) => set({ controlsEnabled }),
  setBookCover: (bookCover) => set({ bookCover }),
  setLightSwitch: (lightSwitch) => set({ lightSwitch }),
  resetCamera: () => set({ view: "default" }),
  cameraToAbout: () => set({ view: "about" }),
  cameraToProjects: () => set({ view: "projects" }),
  resetProjects: () => {
    /* Add project reset logic here */
  },
}));
