"use client";

/**
 * hero-scene.tsx
 * Lightweight, premium 3D accent for the Northline Contracting hero section.
 *
 * Visual concept: A central distorted orange sphere (brand primary) surrounded
 * by three small accent shapes — a beveled box (construction), an icosahedron
 * (electronics), and a torus ring (real estate) — all gently floating via
 * drei <Float>. A sparse particle field adds depth. The whole group tilts
 * subtly toward the mouse cursor (lerped, capped ±15°). Soft ambient + warm
 * directional lighting with an Environment preset for metallic reflections.
 *
 * Contract with A2:
 *   - DEFAULT export, "use client", fills parent, transparent canvas,
 *     pointer-events-none, self-contained.
 *   - A2 lazy-loads via dynamic(() => import("@/components/three/hero-scene"), { ssr: false })
 */

import * as React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

import {
  DistortSphere,
  AccentBox,
  AccentIco,
  AccentTorus,
  ParticleField,
} from "./shapes";

// ─── Mouse parallax controller ───────────────────────────────────────────────

const MAX_TILT = 0.26; // ~15 degrees in radians
const LERP_FACTOR = 0.04;

interface SceneGroupProps {
  reduced: boolean;
  isMobile: boolean;
  mouseNorm: React.RefObject<{ x: number; y: number }>;
}

function SceneGroup({ reduced, isMobile, mouseNorm }: SceneGroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    if (reduced) {
      // Static frame — no animation at all
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.y = 0;
      return;
    }

    const target = mouseNorm.current ?? { x: 0, y: 0 };
    const targetX = -target.y * MAX_TILT;
    const targetY = target.x * MAX_TILT;

    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * LERP_FACTOR;
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * LERP_FACTOR;
  });

  // Accent positions — offset so they orbit around the sphere without overlap
  const boxPos: [number, number, number] = isMobile
    ? [1.7, 0.6, -0.4]
    : [2.1, 0.8, -0.5];
  const icoPos: [number, number, number] = isMobile
    ? [-1.6, -0.5, 0.2]
    : [-2.0, -0.7, 0.3];
  const ico2Pos: [number, number, number] = isMobile
    ? [0.8, -1.5, -0.3]
    : [1.1, -1.9, -0.4];
  const torusPos: [number, number, number] = isMobile
    ? [-1.0, 1.4, 0.1]
    : [-1.3, 1.8, 0.2];

  const particleCount = isMobile ? 180 : 320;

  return (
    <group ref={groupRef}>
      {/* Central hero sphere */}
      <DistortSphere reduced={reduced} isMobile={isMobile} />

      {/* Three accent shapes — one per Northline vertical */}
      <AccentBox reduced={reduced} position={boxPos} rotSpeed={[0.22, 0.31, 0.09]} />
      <AccentIco reduced={reduced} position={icoPos} rotSpeed={[0.18, 0.27, 0.12]} />
      <AccentIco
        reduced={reduced}
        position={ico2Pos}
        rotSpeed={[0.1, 0.2, 0.15]}
        scale={0.72}
      />
      <AccentTorus reduced={reduced} position={torusPos} />

      {/* Particle field for depth */}
      <ParticleField count={particleCount} reduced={reduced} />
    </group>
  );
}

// ─── Camera responsive adjustment ────────────────────────────────────────────

function ResponsiveCamera({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    // Imperatively updating the R3F camera is the intended pattern here.
    // eslint-disable-next-line react-hooks/immutability
    cam.fov = isMobile ? 65 : 55;
    cam.updateProjectionMatrix();
  }, [camera, isMobile]);
  return null;
}

// ─── Main exported component ─────────────────────────────────────────────────

export default function HeroScene() {
  // Detect reduced motion preference — lazy-initialised to avoid a synchronous
  // setState call in the effect body (react-hooks/set-state-in-effect).
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  // Detect mobile for geometry LOD and particle count — lazy-initialised to avoid
  // a synchronous setState call in the effect body (react-hooks/set-state-in-effect)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Normalised mouse position (-1..1) stored in a ref to avoid re-renders
  const mouseNorm = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseNorm.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    mouseNorm.current = { x: 0, y: 0 };
  }, []);

  // frameloop: demand when reduced so R3F draws once then idles (saves CPU/power)
  const frameloop = reduced ? "demand" : "always";

  return (
    <div
      className="h-full w-full"
      style={{ pointerEvents: "none" }}
      // Re-enable pointer events only for the mouse-move tracker (no click/drag)
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        frameloop={frameloop}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 55, near: 0.1, far: 50 }}
        gl={{
          antialias: !isMobile, // skip AA on mobile to save fill rate
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{
          background: "transparent",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Responsive camera FOV tweak */}
        <ResponsiveCamera isMobile={isMobile} />

        {/* Lighting: soft ambient + warm key light + cool fill */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.8}
          color="#ffedd5" /* warm orange-tinted key */
        />
        <pointLight
          position={[-4, -3, 2]}
          intensity={0.9}
          color="#fed7aa" /* soft fill */
        />
        <pointLight
          position={[0, 4, -3]}
          intensity={0.5}
          color="#e0f2fe" /* cool rim from behind */
        />

        {/* Scene content wrapped in Suspense — blank fallback on WebGL error */}
        <Suspense fallback={null}>
          <SceneGroup
            reduced={reduced}
            isMobile={isMobile}
            mouseNorm={mouseNorm}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
