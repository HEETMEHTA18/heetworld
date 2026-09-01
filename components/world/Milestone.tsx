"use client";

import React from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function Milestone() {
  return (
    <group position={[2.5, 0, 65]} rotation={[0, -Math.PI / 6, 0]}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.1, 8]} />
        <meshStandardMaterial color="#4A3A2A" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.15, 2.4, 6]} />
        <meshStandardMaterial color="#6B5E51" roughness={0.85} />
      </mesh>
      <mesh position={[0, 2.3, 0.05]} castShadow>
        <boxGeometry args={[1.0, 0.5, 0.08]} />
        <meshStandardMaterial color="#3A2A1A" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.3, 0.091]}>
        <planeGeometry args={[0.85, 0.38]} />
        <meshStandardMaterial color="#F2E6C9" roughness={0.5} />
      </mesh>
      <Text
        position={[0, 2.38, 0.1]}
        fontSize={0.12}
        color="#2D3436"
        anchorX="center"
        anchorY="middle"
      >
        0 KM
      </Text>
      <Text
        position={[0, 2.18, 0.1]}
        fontSize={0.09}
        color="#2D3436"
        anchorX="center"
        anchorY="middle"
      >
        Heet Mehta
      </Text>
    </group>
  );
}

export default React.memo(Milestone);
