"use client";

/**
 * shapes.tsx
 * Helper mesh components for the hero 3D scene.
 * Kept separate so hero-scene.tsx stays under 500 lines.
 */

import * as React from "react";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

// Brand orange — matches --primary oklch(0.646 0.222 41.116) ≈ hsl(24 95% 53%)
const ORANGE = "#ea580c";
const ORANGE_LIGHT = "#fb923c"; // orange-400, accent shapes
const ORANGE_PALE = "#fed7aa"; // orange-200, emissive glow on dark bg

// ─── Central distorted sphere ────────────────────────────────────────────────

interface DistortSphereProps {
  reduced: boolean;
  isMobile: boolean;
}

export function DistortSphere({ reduced, isMobile }: DistortSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reduced || !meshRef.current) return;
    // Slow self-rotation on Y + slight X wobble
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.18;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.12) * 0.08;
  });

  const segments = isMobile ? 48 : 80;

  return (
    <Float
      speed={reduced ? 0 : 1.4}
      rotationIntensity={reduced ? 0 : 0.25}
      floatIntensity={reduced ? 0 : 0.6}
    >
      <mesh ref={meshRef} castShadow={false}>
        <sphereGeometry args={[1.35, segments, segments]} />
        <MeshDistortMaterial
          color={ORANGE}
          distort={reduced ? 0 : 0.38}
          speed={reduced ? 0 : 1.6}
          metalness={0.45}
          roughness={0.28}
          emissive={ORANGE_PALE}
          emissiveIntensity={0.06}
        />
      </mesh>
    </Float>
  );
}

// ─── Accent: beveled-ish box (construction) ───────────────────────────────────

interface AccentBoxProps {
  reduced: boolean;
  position: [number, number, number];
  rotSpeed: [number, number, number];
}

export function AccentBox({ reduced, position, rotSpeed }: AccentBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reduced || !meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * rotSpeed[0];
    meshRef.current.rotation.y = t * rotSpeed[1];
    meshRef.current.rotation.z = t * rotSpeed[2];
  });

  return (
    <Float speed={reduced ? 0 : 1.1} floatIntensity={reduced ? 0 : 0.9} rotationIntensity={0}>
      <mesh ref={meshRef} position={position} castShadow={false}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial
          color={ORANGE_LIGHT}
          metalness={0.6}
          roughness={0.2}
          emissive={ORANGE}
          emissiveIntensity={0.04}
        />
      </mesh>
    </Float>
  );
}

// ─── Accent: icosahedron (electronics / circuit nodes) ────────────────────────

interface AccentIcoProps {
  reduced: boolean;
  position: [number, number, number];
  rotSpeed: [number, number, number];
  scale?: number;
}

export function AccentIco({ reduced, position, rotSpeed, scale = 1 }: AccentIcoProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reduced || !meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * rotSpeed[0];
    meshRef.current.rotation.y = t * rotSpeed[1];
    meshRef.current.rotation.z = t * rotSpeed[2];
  });

  return (
    <Float speed={reduced ? 0 : 1.6} floatIntensity={reduced ? 0 : 1.1} rotationIntensity={0}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow={false}>
        <icosahedronGeometry args={[0.3, 0]} />
        <MeshWobbleMaterial
          color={ORANGE}
          factor={reduced ? 0 : 0.25}
          speed={reduced ? 0 : 2}
          metalness={0.55}
          roughness={0.25}
          emissive={ORANGE_PALE}
          emissiveIntensity={0.08}
        />
      </mesh>
    </Float>
  );
}

// ─── Accent: torus ring (real estate / structure) ─────────────────────────────

interface AccentTorusProps {
  reduced: boolean;
  position: [number, number, number];
}

export function AccentTorus({ reduced, position }: AccentTorusProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reduced || !meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.14;
    meshRef.current.rotation.y = t * 0.22;
  });

  return (
    <Float speed={reduced ? 0 : 0.9} floatIntensity={reduced ? 0 : 0.7} rotationIntensity={0}>
      <mesh ref={meshRef} position={position} castShadow={false}>
        <torusGeometry args={[0.28, 0.09, 12, 32]} />
        <meshStandardMaterial
          color={ORANGE_LIGHT}
          metalness={0.7}
          roughness={0.18}
          emissive={ORANGE}
          emissiveIntensity={0.05}
        />
      </mesh>
    </Float>
  );
}

// ─── Particle field ───────────────────────────────────────────────────────────

interface ParticleFieldProps {
  count?: number;
  reduced: boolean;
}

export function ParticleField({ count = 320, reduced }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random sphere-distributed positions once
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute on a large sphere shell so they surround the scene
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * Math.PI * 2;
      // eslint-disable-next-line react-hooks/purity
      const phi = Math.acos(2 * Math.random() - 1);
      // eslint-disable-next-line react-hooks/purity
      const r = 3.2 + Math.random() * 2.4;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (reduced || !pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.022;
    pointsRef.current.rotation.x = clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={ORANGE_LIGHT}
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}
