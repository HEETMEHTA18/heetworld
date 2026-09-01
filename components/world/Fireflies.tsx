"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

export default function Fireflies() {
  const { timeOfDay, autoDayNight, dayNightProgress } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.5);

  if (!isNight) return null;

  return <FirefliesParticles />;
}

function FirefliesParticles() {
  const count = 40;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 50,
        y: 1 + Math.random() * 2,
        z: (Math.random() - 0.5) * 50,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        radius: 0.5 + Math.random() * 1.5,
      })),
    []
  );

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const t = Date.now() * 0.001;
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const xOff = Math.sin(t * p.speed + p.phase) * p.radius;
      const zOff = Math.cos(t * p.speed * 0.7 + p.phase) * p.radius;
      const yOff = Math.sin(t * p.speed * 1.3 + p.phase) * 0.5;
      const glow = 0.3 + Math.sin(t * 2 + p.phase) * 0.5;
      dummy.position.set(p.x + xOff, p.y + yOff, p.z + zOff);
      dummy.scale.setScalar(0.08 + glow * 0.1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#CCFF66" transparent opacity={0.8} />
    </instancedMesh>
  );
}
