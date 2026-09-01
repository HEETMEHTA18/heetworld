"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

/**
 * Soft ambient glow along village paths — visible at night.
 * Creates an ethereal ground-level illumination effect along the roads.
 */
export default function PathGlow() {
  const { timeOfDay, autoDayNight, dayNightProgress } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.5);

  if (!isNight) return null;

  return <PathGlowSystem />;
}

function PathGlowSystem() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.children.forEach((child, i) => {
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = 0.04 + Math.sin(t * 0.5 + i * 0.3) * 0.02;
      }
    });
  });

  // Path segments matching the main road and crossroads
  const pathSegments: { pos: [number, number, number]; size: [number, number] }[] = [
    // Main vertical road
    { pos: [0, 0.03, 27.5], size: [9, 110] },
    // Crossroad 1
    { pos: [-13, 0.03, -6], size: [18, 7] },
    { pos: [13, 0.03, -6], size: [18, 7] },
    // Crossroad 2
    { pos: [-12, 0.03, 14], size: [16, 7] },
    { pos: [12, 0.03, 14], size: [16, 7] },
  ];

  return (
    <group ref={meshRef}>
      {pathSegments.map((seg, i) => (
        <mesh key={`glow-${i}`} position={seg.pos} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={seg.size} />
          <meshBasicMaterial
            color="#00FFCC"
            transparent
            opacity={0.04}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
