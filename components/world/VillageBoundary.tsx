"use client";

import React from "react";
import * as THREE from "three";

const RADIUS = 32;
const SEGMENTS = 32;

function VillageBoundary() {
  const posts: React.ReactElement[] = [];
  const rails: React.ReactElement[] = [];

  for (let i = 0; i < SEGMENTS; i++) {
    const angle = (i / SEGMENTS) * Math.PI * 2;
    const nextAngle = ((i + 1) / SEGMENTS) * Math.PI * 2;

    const x = Math.cos(angle) * RADIUS;
    const z = Math.sin(angle) * RADIUS + 12;
    const nx = Math.cos(nextAngle) * RADIUS;
    const nz = Math.sin(nextAngle) * RADIUS + 12;

    // Leave a gap for the highway entrance at the "south" / +Z direction
    if ((z > 38 && Math.abs(x) < 8) || (nz > 38 && Math.abs(nx) < 8)) {
      continue;
    }

    posts.push(
      <group key={`post-${i}`} position={[x, 0, z]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 1.2, 0.2]} />
          <meshStandardMaterial color="#3E2723" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.25, 0]} castShadow>
          <cylinderGeometry args={[0, 0.14, 0.1, 4]} />
          <meshStandardMaterial color="#3E2723" roughness={0.9} />
        </mesh>
      </group>
    );

    const dx = nx - x, dz = nz - z;
    const len = Math.sqrt(dx * dx + dz * dz);
    const midX = (x + nx) / 2, midZ = (z + nz) / 2;

    for (const h of [0.4, 0.9]) {
      const key = `rail-${i}-${h}`;
      rails.push(
        <mesh key={key} position={[midX, h, midZ]} rotation={[0, -Math.atan2(dx, dz), 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.15, len]} />
          <meshStandardMaterial color="#4E342E" roughness={0.9} />
        </mesh>
      );
    }
  }

  return <group>{posts}{rails}</group>;
}

export default React.memo(VillageBoundary);
