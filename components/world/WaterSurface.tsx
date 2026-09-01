"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

/**
 * Animated water surface at the harbor pond area.
 * Uses vertex displacement for ripple simulation and
 * dynamic emissive glow that responds to day/night cycle.
 */
export default function WaterSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { timeOfDay, autoDayNight, dayNightProgress } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.55);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(18, 14, 48, 48);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const positions = (meshRef.current.geometry as THREE.BufferGeometry).getAttribute("position");
    const posArray = positions.array as Float32Array;

    for (let i = 0; i < positions.count; i++) {
      const x = posArray[i * 3];
      const z = posArray[i * 3 + 2];
      // Multi-frequency wave simulation
      posArray[i * 3 + 1] =
        Math.sin(x * 0.8 + t * 1.2) * 0.04 +
        Math.sin(z * 0.6 + t * 0.9) * 0.03 +
        Math.sin((x + z) * 0.5 + t * 1.5) * 0.02 +
        Math.sin(x * 1.5 + z * 1.2 + t * 2.0) * 0.01;
    }
    positions.needsUpdate = true;
    (meshRef.current.geometry as THREE.BufferGeometry).computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[14, -0.02, 32]}
    >
      <meshStandardMaterial
        color={isNight ? "#0A1628" : "#1A4A6A"}
        transparent
        opacity={0.85}
        roughness={0.1}
        metalness={0.6}
        emissive={isNight ? "#0044AA" : "#1A3A5A"}
        emissiveIntensity={isNight ? 0.15 : 0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
