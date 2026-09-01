"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CloudConfig {
  position: [number, number, number];
  scale: number;
  speed: number;
}

const CLOUDS: CloudConfig[] = [
  { position: [-15, 14, -25], scale: 1.2, speed: 0.3 },
  { position: [-5, 16, -15], scale: 0.9, speed: 0.4 },
  { position: [10, 13, -5], scale: 1.5, speed: 0.25 },
  { position: [20, 15, 5], scale: 1.0, speed: 0.35 },
  { position: [-20, 14, 15], scale: 1.3, speed: 0.3 },
  { position: [-8, 17, 25], scale: 0.8, speed: 0.45 },
  { position: [15, 15, 35], scale: 1.1, speed: 0.3 },
  { position: [5, 18, 45], scale: 0.7, speed: 0.5 },
  { position: [-12, 13, 55], scale: 1.4, speed: 0.2 },
  { position: [18, 16, 65], scale: 0.9, speed: 0.35 },
  { position: [-3, 14, 75], scale: 1.0, speed: 0.4 },
  { position: [8, 12, 85], scale: 1.1, speed: 0.25 },
  { position: [-18, 15, 40], scale: 0.6, speed: 0.5 },
  { position: [25, 14, 50], scale: 0.8, speed: 0.3 },
  { position: [-25, 13, 60], scale: 1.0, speed: 0.35 },
];

function Clouds() {
  return (
    <group>
      {CLOUDS.map((cloud, i) => (
        <Cloud key={i} config={cloud} />
      ))}
    </group>
  );
}

export default React.memo(Clouds);

function Cloud({ config }: { config: CloudConfig }) {
  const groupRef = useRef<THREE.Group>(null);
  const baseZ = useRef(config.position[2]);

  const parts = useMemo(() => {
    const count = 4 + Math.floor(Math.random() * 4);
    const arr: { x: number; y: number; z: number; r: number; opacity: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 2 * config.scale,
        y: (Math.random() - 0.5) * 0.3 * config.scale,
        z: (Math.random() - 0.5) * 1.5 * config.scale,
        r: (0.3 + Math.random() * 0.5) * config.scale,
        opacity: 0.45 + Math.random() * 0.25,
      });
    }
    return arr;
  }, [config.scale]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    baseZ.current += delta * config.speed;
    if (baseZ.current > 90) baseZ.current = -40;
    groupRef.current.position.z = baseZ.current;
  });

  return (
    <group ref={groupRef} position={config.position}>
      {parts.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.r, 8, 8]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={p.opacity}
            roughness={0.95}
            metalness={0.05}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
