"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

/**
 * Volumetric God Rays — beams of golden light streaming through the village.
 * Visible during golden-hour and clear weather.
 * Uses transparent billboard planes arranged radially from the sun position.
 */
export default function GodRays() {
  const { timeOfDay, weather, autoDayNight, dayNightProgress } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.55);
  const isRain = weather === "rain";
  const isSnow = weather === "snow";

  if (isNight || isRain || isSnow) return null;

  return <GodRayBeams />;
}

function GodRayBeams() {
  const groupRef = useRef<THREE.Group>(null);
  const { autoDayNight, dayNightProgress } = useVillageStore();

  const beams = useMemo(() => {
    const arr: {
      rotZ: number;
      rotX: number;
      width: number;
      height: number;
      opacity: number;
      offsetY: number;
    }[] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      arr.push({
        rotZ: (i / count) * Math.PI * 0.6 - Math.PI * 0.3,
        rotX: -0.3 + Math.random() * 0.15,
        width: 1.5 + Math.random() * 2.5,
        height: 30 + Math.random() * 15,
        opacity: 0.02 + Math.random() * 0.03,
        offsetY: Math.random() * 3,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Subtle breathing animation
    groupRef.current.children.forEach((child, i) => {
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        const pulse = 0.5 + Math.sin(t * 0.3 + i * 0.5) * 0.5;
        const baseOpacity = beams[i]?.opacity || 0.025;
        mat.opacity = baseOpacity * pulse;
      }
    });
  });

  // Reduce intensity during dusk
  const intensityMul = autoDayNight
    ? dayNightProgress < 0.3
      ? 1.0
      : dayNightProgress < 0.45
      ? 0.6
      : 0.2
    : 1.0;

  return (
    <group ref={groupRef} position={[-15, 25, -10]} rotation={[0, 0.3, 0]}>
      {beams.map((b, i) => (
        <mesh
          key={`ray-${i}`}
          position={[0, -b.height / 2 + b.offsetY, 0]}
          rotation={[b.rotX, 0, b.rotZ]}
        >
          <planeGeometry args={[b.width, b.height]} />
          <meshBasicMaterial
            color="#FFE4A8"
            transparent
            opacity={b.opacity * intensityMul}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
