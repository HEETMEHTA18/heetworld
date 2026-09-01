"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

function Rain() {
  const count = 1500;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 60,
        y: Math.random() * 20 + 2,
        z: (Math.random() - 0.5) * 60,
        speed: 8 + Math.random() * 6,
      })),
    []
  );

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.y -= p.speed * delta;
      p.x += delta * 0.5;
      p.z += delta * 0.3;
      if (p.y < -2) {
        p.y = 18 + Math.random() * 4;
        p.x = (Math.random() - 0.5) * 60;
        p.z = (Math.random() - 0.5) * 60;
      }
      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(0.3, 0, 0.1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.015, 0.015, 0.3, 3]} />
      <meshStandardMaterial color="#8899BB" transparent opacity={0.3} depthWrite={false} />
    </instancedMesh>
  );
}

function Snow() {
  const count = 2000;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 70,
        y: Math.random() * 18 + 2,
        z: (Math.random() - 0.5) * 70,
        speed: 0.8 + Math.random() * 1.2,
        drift: (Math.random() - 0.5) * 0.3,
        size: 0.04 + Math.random() * 0.06,
      })),
    []
  );

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.y -= p.speed * delta;
      p.x += Math.sin(p.y * 0.5 + i) * delta * 0.3;
      p.z += Math.cos(p.y * 0.5 + i) * delta * 0.3;
      if (p.y < -2) {
        p.y = 18 + Math.random() * 4;
        p.x = (Math.random() - 0.5) * 70;
        p.z = (Math.random() - 0.5) * 70;
      }
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#FFFFFF" transparent opacity={0.4} depthWrite={false} roughness={0.2} metalness={0.1} />
    </instancedMesh>
  );
}

export default function Weather() {
  const { weather } = useVillageStore();

  if (weather === "rain") return <Rain />;
  if (weather === "snow") return <Snow />;
  return null;
}
