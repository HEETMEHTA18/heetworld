"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

/**
 * Flickering warm window lights on buildings at night.
 * Each building gets soft point lights that pulse randomly.
 */
export default function WindowLights() {
  const { timeOfDay, autoDayNight, dayNightProgress } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.5);
  if (!isNight) return null;

  const lights: { pos: [number, number, number]; color: string; intensity: number }[] = [
    { pos: [-20, 1.5, -5], color: "#FF8A00", intensity: 2 },
    { pos: [20, 1.5, -5], color: "#6FA8DC", intensity: 1.5 },
    { pos: [0, 1.5, 0], color: "#FFD700", intensity: 1.8 },
    { pos: [0, 1.0, -22], color: "#D4A017", intensity: 2 },
    { pos: [18, 0.8, 14], color: "#FF6600", intensity: 1.5 },
    { pos: [-18, 1.0, 14], color: "#FFB300", intensity: 1.8 },
    { pos: [0, 1.2, 18], color: "#FFF", intensity: 1.5 },
    { pos: [0, 1.0, 32], color: "#FFD700", intensity: 2 },
    { pos: [25, 1.2, 10], color: "#FFB300", intensity: 1.5 },
  ];

  return (
    <group>
      {lights.map((l, i) => (
        <FlickerLight key={i} position={l.pos} color={l.color} baseIntensity={l.intensity} index={i} />
      ))}
    </group>
  );
}

function FlickerLight({ position, color, baseIntensity, index }: {
  position: [number, number, number];
  color: string;
  baseIntensity: number;
  index: number;
}) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.elapsedTime;
    const flicker = 0.7 + Math.sin(t * 3 + index * 1.7) * 0.15 + Math.sin(t * 7 + index * 3.1) * 0.1 + Math.sin(t * 13 + index * 5.3) * 0.05;
    lightRef.current.intensity = baseIntensity * flicker;
  });

  return <pointLight ref={lightRef} position={position} color={color} intensity={baseIntensity} distance={6} decay={2} />;
}
