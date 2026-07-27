import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Console = (() => {
  // Check if the current environment is development
  const isDevMode = process.env.NODE_ENV === "development";

  return new Proxy(console, {
    get(target: typeof console, prop: keyof typeof console) {
      const value = target[prop];

      if (!isDevMode && typeof value === "function") {
        return () => {};
      }

      return value;
    },
  });
})();

export const aboutCameraPos = {
  x: 0.12,
  y: 0.2,
  z: 0.55,
};

export const aboutCameraRot = {
  x: -1.54,
  y: 0.13,
  z: 1.41,
};

export const projectsCameraPos = {
  x: 1,
  y: 0.45,
  z: 0.01,
};

export const projectsCameraRot = {
  x: 0.05,
  y: 0.05,
  z: 0,
};
export const defaultCameraPos = {
  x: 1.2484806787751097,
  y: 0.46343620455819456,
  z: 0.05769702519139227,
};

export const defaultCameraRot = {
  x: -1.4469353324247252,
  y: 1.2128448895177755,
  z: 1.4386475257629794,
};

export const introCameraStartPos = {
  x: 3,
  y: 2,
  z: 2,
};

export const introCameraZoomOutPos = {
  x: 4,
  y: 3,
  z: 3,
};

export const TruncateText = (text?: string, count?: number): string => {
  const truncate = (str: string): string => {
    if (count && str?.length > count) {
      return str.slice(0, count) + "...";
    } else if (!count && str.length > 15) {
      return str.slice(0, 15) + "...";
    }
    return str;
  };

  return truncate(text || "");
};
