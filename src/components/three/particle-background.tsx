"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type * as THREE from "three";
import { Console } from "@/utils/constants";

type SceneProfile = {
  codeBlocks: number;
  dpr: [number, number];
  particlesCount: number;
};

const FALLBACK_PARTICLES = [
  { left: "8%", top: "16%", delay: "0s", duration: "5.5s" },
  { left: "16%", top: "68%", delay: "0.8s", duration: "6.4s" },
  { left: "23%", top: "36%", delay: "1.2s", duration: "4.8s" },
  { left: "31%", top: "24%", delay: "1.9s", duration: "5.9s" },
  { left: "39%", top: "78%", delay: "0.4s", duration: "6.8s" },
  { left: "47%", top: "48%", delay: "2.2s", duration: "5.2s" },
  { left: "56%", top: "12%", delay: "1.5s", duration: "4.9s" },
  { left: "64%", top: "62%", delay: "2.6s", duration: "6.2s" },
  { left: "72%", top: "28%", delay: "0.9s", duration: "5.7s" },
  { left: "81%", top: "82%", delay: "1.8s", duration: "6.5s" },
  { left: "89%", top: "44%", delay: "2.4s", duration: "5.3s" },
  { left: "94%", top: "18%", delay: "0.6s", duration: "6.1s" },
];

function buildParticlePositions(count: number) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }

  return positions;
}

function buildConstellationPositions(count: number) {
  return Array.from({ length: count }, () => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
  ] as const);
}

const ParticleField = memo(function ParticleField({
  isActive,
  particlesCount,
}: {
  isActive: boolean;
  particlesCount: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(
    () => buildParticlePositions(particlesCount),
    [particlesCount],
  );

  useFrame((state) => {
    if (isActive && ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
});

const CodeConstellation = memo(function CodeConstellation({
  blocks,
  isActive,
}: {
  blocks: number;
  isActive: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const positions = useMemo(() => buildConstellationPositions(blocks), [blocks]);

  useFrame((state) => {
    if (isActive && ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={ref}>
      {positions.map((position, i) => (
        <mesh key={i} position={position}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
});

// CSS-based fallback animation
function FallbackParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {FALLBACK_PARTICLES.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-60"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function ParticleBackground() {
  const [webglSupported, setWebglSupported] = useState(true);
  const [canvasError, setCanvasError] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [profile, setProfile] = useState<SceneProfile>({
    codeBlocks: 20,
    dpr: [1, 1.5],
    particlesCount: 1000,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
      Console.log(e);
    }
  }, []);

  useEffect(() => {
    const updateProfile = () => {
      const width = window.innerWidth;
      const pixelRatio = window.devicePixelRatio || 1;

      if (width < 640) {
        setProfile({
          particlesCount: 450,
          codeBlocks: 10,
          dpr: [1, Math.min(1.1, pixelRatio)],
        });
        return;
      }

      if (width < 1024) {
        setProfile({
          particlesCount: 700,
          codeBlocks: 14,
          dpr: [1, Math.min(1.25, pixelRatio)],
        });
        return;
      }

      setProfile({
        particlesCount: 1000,
        codeBlocks: 20,
        dpr: [1, Math.min(1.5, pixelRatio)],
      });
    };

    updateProfile();
    window.addEventListener("resize", updateProfile, { passive: true });

    return () => window.removeEventListener("resize", updateProfile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !webglSupported || canvasError || isReady) {
      return;
    }

    const activate = () => setIsReady(true);
    const idleCapableWindow = window as Window & {
      cancelIdleCallback?: (handle: number) => void;
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
    };

    if (idleCapableWindow.requestIdleCallback) {
      const idleId = idleCapableWindow.requestIdleCallback(activate, {
        timeout: 250,
      });

      return () => idleCapableWindow.cancelIdleCallback?.(idleId);
    }

    const frameId = window.requestAnimationFrame(activate);
    return () => window.cancelAnimationFrame(frameId);
  }, [canvasError, isReady, isVisible, webglSupported]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(document.visibilityState === "visible" && isVisible);
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isVisible]);

  const handleCanvasError = () => {
    setCanvasError(true);
    setWebglSupported(false);
  };

  if (!isReady || !webglSupported || canvasError) {
    return <div ref={containerRef} className="absolute inset-0"><FallbackParticles /></div>;
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        onError={handleCanvasError}
        frameloop={isActive ? "always" : "never"}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          depth: false,
          stencil: false,
          preserveDrawingBuffer: false,
        }}
        dpr={profile.dpr}
        performance={{ min: 0.5 }}
      >
        <ParticleField
          isActive={isActive}
          particlesCount={profile.particlesCount}
        />
        <CodeConstellation
          isActive={isActive}
          blocks={profile.codeBlocks}
        />
      </Canvas>
    </div>
  );
}
