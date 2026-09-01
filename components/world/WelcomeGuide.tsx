"use client";

import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

export default function WelcomeGuide() {
  const groupRef = useRef<THREE.Group>(null);
  const { introSequenceComplete, guideGreeting, setGuideGreeting } = useVillageStore();
  const [phase, setPhase] = useState<"idle" | "walking" | "greeting">("idle");
  const greetingTimer = useRef(0);
  const walkTimer = useRef(0);
  const walkProgress = useRef(0);

  const startPos = new THREE.Vector3(-4, 0, 26.0);
  const targetPos = new THREE.Vector3(0, 0, 31.0);

  useEffect(() => {
    if (introSequenceComplete && !guideGreeting) {
      walkTimer.current = 0;
      walkProgress.current = 0;
      setGuideGreeting(true);
      setPhase("walking");
    }
  }, [introSequenceComplete, guideGreeting, setGuideGreeting]);

  useFrame((_state, delta) => {
    if (!groupRef.current || phase === "idle") return;

    if (phase === "walking") {
      walkTimer.current += delta;
      walkProgress.current = Math.min(walkProgress.current + delta * 0.5, 1);
      const t = 1 - Math.pow(1 - walkProgress.current, 3);

      groupRef.current.position.x = startPos.x + (targetPos.x - startPos.x) * t;
      groupRef.current.position.z = startPos.z + (targetPos.z - startPos.z) * t;
      groupRef.current.position.y = Math.abs(Math.sin(walkTimer.current * 8)) * 0.04;

      const dx = targetPos.x - groupRef.current.position.x;
      const dz = targetPos.z - groupRef.current.position.z;
      if (dx * dx + dz * dz > 0.01) {
        groupRef.current.rotation.y = Math.atan2(dx, dz);
      }

      if (walkProgress.current >= 1) {
        setPhase("greeting");
        greetingTimer.current = 0;
      }
    }

    if (phase === "greeting") {
      greetingTimer.current += delta;
      groupRef.current.position.y = Math.abs(Math.sin(Date.now() * 0.003)) * 0.02;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        0, // Face +Z towards the player
        0.05,
      );
    }
  });

  const elapsed = greetingTimer.current;
  const showBubble = phase === "greeting" && elapsed < 6;
  const bubbleOpacity = showBubble
    ? Math.min(1, elapsed * 2, (6 - elapsed) * 2)
    : 0;

  return (
    <group ref={groupRef} position={[-4, 0, 26.0]}>
      <group position={[0, 0.6, 0]} scale={0.4}>
        <mesh position={[-0.35, 0.1, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#D4A017" />
        </mesh>
        <mesh position={[0.35, 0.1, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#D4A017" />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.4, 0.7, 0.2]} />
          <meshStandardMaterial color="#D4A017" />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#FFDAB9" />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 4]} />
          <meshStandardMaterial color="#2D3436" />
        </mesh>
        <mesh position={[0.12, -0.35, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 4]} />
          <meshStandardMaterial color="#2D3436" />
        </mesh>
      </group>

      {showBubble && (
        <Billboard position={[0, 1.2, 0]}>
          <mesh>
            <planeGeometry args={[2.2, 0.55]} />
            <meshBasicMaterial
              color="#1C1A14"
              transparent
              opacity={0.92 * bubbleOpacity}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[0.3, -0.32, 0.01]}>
            <planeGeometry args={[0.25, 0.2]} />
            <meshBasicMaterial
              color="#1C1A14"
              transparent
              opacity={0.92 * bubbleOpacity}
              depthWrite={false}
            />
          </mesh>
          <Text
            position={[0, 0.02, 0.02]}
            fontSize={0.13}
            color="#D4A017"
            anchorX="center"
            anchorY="middle"
            fillOpacity={bubbleOpacity}
          >
            Welcome to Heet's Portfolio!
          </Text>
        </Billboard>
      )}
    </group>
  );
}
