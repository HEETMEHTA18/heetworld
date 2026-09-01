"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

export default function AuroraEffect() {
  const { timeOfDay, autoDayNight, dayNightProgress } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.6);
  if (!isNight) return null;
  return <AuroraCurtain />;
}

function AuroraCurtain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(80, 15, 64, 8), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const positions = (meshRef.current.geometry as THREE.BufferGeometry).getAttribute("position");
    const posArray = positions.array as Float32Array;
    for (let i = 0; i < positions.count; i++) {
      const x = posArray[i * 3];
      const y = posArray[i * 3 + 1];
      posArray[i * 3 + 2] =
        Math.sin(x * 0.08 + t * 0.4) * 2 +
        Math.sin(x * 0.15 + t * 0.3) * 1.5 +
        Math.cos(y * 0.2 + t * 0.5) * 0.8;
    }
    positions.needsUpdate = true;
    meshRef.current.rotation.y = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 35, -30]} rotation={[0.3, 0, 0]}>
      <meshBasicMaterial color="#00FF88" transparent opacity={0.06} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}
