"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

/**
 * Drifting leaf particles — autumn leaves floating in the wind.
 * Slowly spiral downward with random spin. Respawn at height.
 */
export default function LeafParticles() {
  const { weather } = useVillageStore();
  if (weather === "snow") return null; // No leaves during snow

  return <LeafSystem />;
}

function LeafSystem() {
  const count = 60;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 60,
        y: 3 + Math.random() * 10,
        z: (Math.random() - 0.5) * 60,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        spinSpeedX: (Math.random() - 0.5) * 2,
        spinSpeedY: (Math.random() - 0.5) * 3,
        spinSpeedZ: (Math.random() - 0.5) * 1.5,
        fallSpeed: 0.3 + Math.random() * 0.5,
        driftX: (Math.random() - 0.5) * 0.8,
        driftZ: (Math.random() - 0.5) * 0.8,
        swayPhase: Math.random() * Math.PI * 2,
        scale: 0.06 + Math.random() * 0.05,
        colorIdx: Math.floor(Math.random() * 4),
      })),
    []
  );

  const colors = useMemo(
    () => [
      new THREE.Color("#C0392B"), // Deep red
      new THREE.Color("#D4A017"), // Amber gold
      new THREE.Color("#E67E22"), // Orange
      new THREE.Color("#8B4513"), // Saddle brown
    ],
    []
  );

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const t = Date.now() * 0.001;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      // Fall with gentle sway
      p.y -= p.fallSpeed * delta;
      p.x += p.driftX * delta + Math.sin(t * 0.5 + p.swayPhase) * delta * 0.5;
      p.z += p.driftZ * delta + Math.cos(t * 0.4 + p.swayPhase) * delta * 0.3;

      // Spin
      p.rotX += p.spinSpeedX * delta;
      p.rotY += p.spinSpeedY * delta;
      p.rotZ += p.spinSpeedZ * delta;

      // Reset at ground level
      if (p.y < -0.5) {
        p.y = 8 + Math.random() * 6;
        p.x = (Math.random() - 0.5) * 60;
        p.z = (Math.random() - 0.5) * 60;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Per-instance color
      meshRef.current.setColorAt(i, colors[p.colorIdx]);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 0.6]} />
      <meshStandardMaterial
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
        roughness={0.8}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
