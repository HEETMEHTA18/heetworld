"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

/**
 * Floating dust motes — tiny golden sparkles drifting in sunlight.
 * Creates that magical "pollen in sunbeam" effect.
 * Only visible during day time / golden hour.
 */
export default function DustMotes() {
  const { timeOfDay, autoDayNight, dayNightProgress, weather } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.55);

  if (isNight || weather === "rain" || weather === "snow") return null;

  return <DustMoteSystem />;
}

function DustMoteSystem() {
  const count = 120;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 40,
        y: 0.5 + Math.random() * 4,
        z: (Math.random() - 0.5) * 40 + 20,
        phase: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.15,
        speedZ: (Math.random() - 0.5) * 0.2,
        wobbleSpeed: 0.5 + Math.random() * 1.5,
        wobbleRadius: 0.2 + Math.random() * 0.6,
        baseScale: 0.015 + Math.random() * 0.02,
        pulseSpeed: 0.5 + Math.random() * 2,
      })),
    []
  );

  useFrame(() => {
    if (!meshRef.current) return;
    const t = Date.now() * 0.001;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const wobbleX = Math.sin(t * p.wobbleSpeed + p.phase) * p.wobbleRadius;
      const wobbleY = Math.cos(t * p.wobbleSpeed * 0.7 + p.phase) * p.wobbleRadius * 0.5;
      const wobbleZ = Math.sin(t * p.wobbleSpeed * 0.5 + p.phase + 1) * p.wobbleRadius * 0.3;

      dummy.position.set(
        p.x + wobbleX + Math.sin(t * 0.1) * 0.5,
        p.y + wobbleY,
        p.z + wobbleZ
      );

      // Pulse scale for shimmer
      const shimmer = 0.7 + Math.sin(t * p.pulseSpeed + p.phase) * 0.3;
      dummy.scale.setScalar(p.baseScale * shimmer);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        color="#FFE4A8"
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
