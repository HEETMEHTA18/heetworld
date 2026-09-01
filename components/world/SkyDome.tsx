"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

export default function SkyDome() {
  const { timeOfDay, weather, autoDayNight, dayNightProgress } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.55);
  const isRain = weather === "rain";
  const isSnow = weather === "snow";

  const colors = useMemo(() => {
    if (isNight) {
      return { top: new THREE.Color("#050A1A"), bottom: new THREE.Color("#0A1530") };
    }
    if (isRain) {
      return { top: new THREE.Color("#4A5A6A"), bottom: new THREE.Color("#7A8A9A") };
    }
    if (isSnow) {
      return { top: new THREE.Color("#8A9AAA"), bottom: new THREE.Color("#C0D0E0") };
    }
    // Golden hour gradient
    return { top: new THREE.Color("#1A6AB0"), bottom: new THREE.Color("#87CEEB") };
  }, [isNight, isRain, isSnow]);

  const sunRef = useRef<THREE.Mesh>(null);
  const sunGlowRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sunRef.current && !isNight) {
      sunRef.current.position.x = Math.sin(t * 0.02) * 30;
      sunRef.current.position.y = 18 + Math.sin(t * 0.015) * 5;
    }
    if (sunGlowRef.current && !isNight) {
      sunGlowRef.current.position.copy(sunRef.current?.position || new THREE.Vector3(15, 20, -20));
      const pulse = 0.12 + Math.sin(t * 0.3) * 0.03;
      (sunGlowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
    if (moonRef.current && isNight) {
      moonRef.current.position.y = 22 + Math.sin(t * 0.01) * 1;
    }
  });

  return (
    <group>
      {/* Sky sphere */}
      <mesh>
        <sphereGeometry args={[60, 32, 32]} />
        <meshBasicMaterial side={THREE.BackSide}>
          <color attach="color" args={[colors.bottom]} />
        </meshBasicMaterial>
      </mesh>

      {/* Horizon glow band */}
      {!isNight && !isRain && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
          <ringGeometry args={[50, 60, 64]} />
          <meshBasicMaterial
            color="#FFB74D"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Sun */}
      {!isNight && (
        <>
          <mesh ref={sunRef} position={[15, 20, -20]}>
            <sphereGeometry args={[1.5, 16, 16]} />
            <meshBasicMaterial color="#FFE4A8" />
          </mesh>
          {/* Sun corona glow */}
          <mesh ref={sunGlowRef} position={[15, 20, -20]}>
            <sphereGeometry args={[4, 16, 16]} />
            <meshBasicMaterial color="#FFE4A8" transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </>
      )}

      {/* Moon with crescent detail */}
      {isNight && (
        <group>
          <mesh ref={moonRef} position={[25, 22, -25]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshBasicMaterial color="#E8E8FF" />
          </mesh>
          {/* Moon glow */}
          <mesh position={[25, 22, -25]}>
            <sphereGeometry args={[1.5, 12, 12]} />
            <meshBasicMaterial color="#8888FF" transparent opacity={0.04} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      )}
    </group>
  );
}
