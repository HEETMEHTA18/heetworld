"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

type AnimalType = "sheep" | "cow" | "chicken" | "goat";

interface AnimalConfig {
  startPos: [number, number, number];
  type: AnimalType;
  color?: string;
  groupId: number;
}

const ANIMALS: AnimalConfig[] = [
  // Sheep flock (group 1) - left pasture
  { startPos: [-14, 0, 2], type: "sheep", groupId: 1 },
  { startPos: [-13, 0, 4], type: "sheep", groupId: 1 },
  { startPos: [-15, 0, 3], type: "sheep", groupId: 1 },
  { startPos: [-12, 0, 1], type: "sheep", groupId: 1 },
  { startPos: [-16, 0, 5], type: "sheep", groupId: 1 },
  // Cow herd (group 2) - right pasture
  { startPos: [12, 0, -5], type: "cow", groupId: 2 },
  { startPos: [14, 0, -4], type: "cow", groupId: 2 },
  { startPos: [13, 0, -7], type: "cow", groupId: 2 },
  { startPos: [11, 0, -3], type: "cow", groupId: 2 },
  { startPos: [15, 0, -6], type: "cow", groupId: 2 },
  // Goats (group 3) - near hills
  { startPos: [-24, 0, -14], type: "goat", groupId: 3, color: "#8B7B6D" },
  { startPos: [-22, 0, -16], type: "goat", groupId: 3, color: "#A0927B" },
  { startPos: [-26, 0, -12], type: "goat", groupId: 3, color: "#7B6B5D" },
  // Chickens (group 4) - near town square
  { startPos: [-3, 0, 8], type: "chicken", groupId: 4 },
  { startPos: [-1, 0, 9], type: "chicken", groupId: 4 },
  { startPos: [-2, 0, 7], type: "chicken", groupId: 4 },
  { startPos: [-4, 0, 9], type: "chicken", groupId: 4 },
  // Extra sheep for texture
  { startPos: [-17, 0, 0], type: "sheep", groupId: 1 },
  { startPos: [-11, 0, 6], type: "sheep", groupId: 1 },
];

export default function Animals() {
  const { timeOfDay, autoDayNight, dayNightProgress } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.55);
  if (isNight) return null;

  return (
    <group>
      {ANIMALS.map((animal, i) => (
        <Animal key={i} config={animal} index={i} />
      ))}
    </group>
  );
}

function Animal({ config, index }: { config: AnimalConfig; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { characterPosition } = useVillageStore();

  const state = useRef({
    targetX: config.startPos[0] + (Math.random() - 0.5) * 2,
    targetZ: config.startPos[2] + (Math.random() - 0.5) * 2,
    wanderTimer: Math.random() * 8,
    moveSpeed: 0.2 + Math.random() * 0.4,
    grazePhase: Math.random() * Math.PI * 2,
    fleeTimer: 0,
  });

  const homePos = useMemo(
    () => new THREE.Vector3(config.startPos[0], 0, config.startPos[2]),
    [config.startPos]
  );

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const s = state.current;
    const pos = groupRef.current.position;

    const dx = characterPosition[0] - pos.x;
    const dz = characterPosition[2] - pos.z;
    const charDist = Math.sqrt(dx * dx + dz * dz);

    s.grazePhase += delta;

    if (charDist < 2.5) {
      s.fleeTimer = 1.5;
      const fleeAngle = Math.atan2(-dx, -dz);
      const fx = pos.x + Math.sin(fleeAngle) * 4;
      const fz = pos.z + Math.cos(fleeAngle) * 4;
      s.targetX = Math.max(-30, Math.min(30, fx));
      s.targetZ = Math.max(-30, Math.min(30, fz));
      s.moveSpeed = 1.5 + Math.random() * 1.0;
    } else {
      s.fleeTimer -= delta;
    }

    if (s.fleeTimer <= 0) {
      s.wanderTimer -= delta;
      if (s.wanderTimer <= 0) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 1.5 + Math.random() * 3;
        const gx = homePos.x + Math.cos(angle) * dist;
        const gz = homePos.z + Math.sin(angle) * dist;
        s.targetX = Math.max(-30, Math.min(30, gx));
        s.targetZ = Math.max(-30, Math.min(30, gz));
        s.wanderTimer = 4 + Math.random() * 6;
        s.moveSpeed = 0.15 + Math.random() * 0.3;
      }
    }

    const tdx = s.targetX - pos.x;
    const tdz = s.targetZ - pos.z;
    const dist = Math.sqrt(tdx * tdx + tdz * tdz);

    const isMoving = dist > 0.3;
    if (isMoving) {
      const speed = s.moveSpeed * delta * 2;
      pos.x += (tdx / dist) * speed;
      pos.z += (tdz / dist) * speed;
      const angle = Math.atan2(tdx, tdz);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        angle,
        0.08
      );
    }

    // Grazing: head bobs down when not moving
    if (config.type === "sheep" || config.type === "goat") {
      if (!isMoving) {
        const grazeY = Math.abs(Math.sin(s.grazePhase * 1.5)) * 0.08;
        groupRef.current.position.y = grazeY;
      } else {
        groupRef.current.position.y = Math.abs(Math.sin(s.grazePhase * 4)) * 0.03;
      }
    } else if (config.type === "chicken") {
      if (!isMoving) {
        groupRef.current.position.y = Math.abs(Math.sin(s.grazePhase * 2)) * 0.04;
      } else {
        groupRef.current.position.y = Math.abs(Math.sin(s.grazePhase * 10)) * 0.05;
      }
    } else {
      groupRef.current.position.y = isMoving
        ? Math.abs(Math.sin(s.grazePhase * 3)) * 0.02
        : 0;
    }
  });

  const body = (() => {
    switch (config.type) {
      case "sheep": return <SheepBody color={config.color} />;
      case "cow": return <CowBody color={config.color} />;
      case "goat": return <GoatBody color={config.color || "#8B7B6D"} />;
      case "chicken": return <ChickenBody />;
    }
  })();

  return <group ref={groupRef} position={config.startPos}>{body}</group>;
}

function SheepBody({ color }: { color?: string }) {
  const fleeceColor = color || "#F5F0E0";
  return (
    <group position={[0, 0, 0]} scale={0.55}>
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.45, 8, 8]} />
        <meshStandardMaterial color={fleeceColor} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.28, 0]} scale={[1, 0.6, 1]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color={fleeceColor} roughness={0.95} />
      </mesh>
      <mesh position={[0.3, 0.5, 0.3]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-0.3, 0.5, 0.3]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 0.45, 0.45]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      {[0.12, -0.12].map((x, i) => (
        <mesh key={`ear-${i}`} position={[x, 0.6, 0.25]}>
          <sphereGeometry args={[0.04, 4, 4]} />
          <meshStandardMaterial color="#DDD" />
        </mesh>
      ))}
      {[0, 1].map((i) => (
        <mesh key={`leg-${i}`} position={[-0.12 + i * 0.24, -0.18, 0]}>
          <cylinderGeometry args={[0.035, 0.045, 0.25, 4]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      ))}
    </group>
  );
}

function CowBody({ color }: { color?: string }) {
  const hideColor = color || "#F5F0E0";
  return (
    <group position={[0, 0, 0]} scale={0.65}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.75, 0.5, 0.5]} />
        <meshStandardMaterial color={hideColor} roughness={0.85} />
      </mesh>
      <mesh position={[0.3, 0.15, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#D4A017" roughness={0.8} />
      </mesh>
      <mesh position={[0.5, 0.38, 0.18]}>
        <sphereGeometry args={[0.09, 6, 6]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.5, 0.38, -0.18]}>
        <sphereGeometry args={[0.09, 6, 6]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.5, 0.33, 0]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      <mesh position={[0.2, 0.55, 0.12]}>
        <sphereGeometry args={[0.035, 4, 4]} />
        <meshStandardMaterial color="#FFF" />
      </mesh>
      {[0, 1, 2, 3].map((i) => {
        const x = -0.25 + i * 0.2;
        return (
          <mesh key={`leg-${i}`} position={[x, -0.1, i < 2 ? -0.12 : 0.12]}>
            <cylinderGeometry args={[0.04, 0.05, 0.25, 4]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        );
      })}
      <mesh position={[-0.45, 0.5, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.015, 0.015, 0.15, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-0.45, 0.5, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.015, 0.015, 0.15, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

function GoatBody({ color }: { color: string }) {
  return (
    <group position={[0, 0, 0]} scale={0.5}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.35, 0.35]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0.2, 0.15, 0]}>
        <boxGeometry args={[0.15, 0.2, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0.3, 0.35, 0.12]}>
        <sphereGeometry args={[0.06, 5, 5]} />
        <meshStandardMaterial color="#4A3028" />
      </mesh>
      <mesh position={[0.3, 0.35, -0.12]}>
        <sphereGeometry args={[0.06, 5, 5]} />
        <meshStandardMaterial color="#4A3028" />
      </mesh>
      <mesh position={[0.32, 0.3, 0]}>
        <sphereGeometry args={[0.04, 5, 5]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      <mesh position={[0.12, 0.55, 0.08]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.12, 4]} />
        <meshStandardMaterial color="#4A3028" />
      </mesh>
      <mesh position={[0.12, 0.55, -0.08]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.12, 4]} />
        <meshStandardMaterial color="#4A3028" />
      </mesh>
      {[0, 1].map((i) => (
        <mesh key={`leg-${i}`} position={[-0.12 + i * 0.24, -0.15, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.2, 4]} />
          <meshStandardMaterial color="#4A3028" />
        </mesh>
      ))}
    </group>
  );
}

function ChickenBody() {
  return (
    <group position={[0, 0, 0]} scale={0.35}>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.25, 6, 6]} />
        <meshStandardMaterial color="#FFF8DC" roughness={0.9} />
      </mesh>
      <mesh position={[0.15, 0.25, 0]}>
        <sphereGeometry args={[0.12, 6, 6]} />
        <meshStandardMaterial color="#FFF8DC" roughness={0.9} />
      </mesh>
      <mesh position={[0.22, 0.3, 0.05]}>
        <coneGeometry args={[0.03, 0.04, 4]} />
        <meshStandardMaterial color="#FF8C00" />
      </mesh>
      <mesh position={[0.18, 0.3, -0.02]}>
        <sphereGeometry args={[0.025, 4, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.15, 0.38, 0]} rotation={[0, 0, 0.4]}>
        <sphereGeometry args={[0.02, 4, 4]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>
      {[0, 1].map((i) => (
        <mesh key={`leg-${i}`} position={[-0.04 + i * 0.08, -0.1, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 3]} />
          <meshStandardMaterial color="#FF8C00" />
        </mesh>
      ))}
    </group>
  );
}
