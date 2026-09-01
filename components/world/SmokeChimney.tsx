"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Chimney smoke particles — rising from the Forge's chimney.
 * Soft gray billows that expand and fade as they rise.
 */
function SmokeChimney() {
  return (
    <>
      <SmokeSystem position={[-21, 3.5, -6]} color="#8A8A8A" count={25} />
      <SmokeSystem position={[26.3, 2.8, 11.2]} color="#7A7A7A" count={15} />
    </>
  );
}

export default React.memo(SmokeChimney);

function SmokeSystem({
  position,
  color,
  count,
}: {
  position: [number, number, number];
  color: string;
  count: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        y: 0,
        x: 0,
        z: 0,
        speed: 0.6 + Math.random() * 0.8,
        drift: (Math.random() - 0.5) * 0.5,
        driftZ: (Math.random() - 0.5) * 0.3,
        life: Math.random(),
        maxLife: 2.5 + Math.random() * 2.5,
        scale: 0.15 + Math.random() * 0.15,
        expansion: 0.3 + Math.random() * 0.2,
      })),
    [count]
  );

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.life += delta;

      if (p.life > p.maxLife) {
        p.life = 0;
        p.y = 0;
        p.x = (Math.random() - 0.5) * 0.2;
        p.z = (Math.random() - 0.5) * 0.2;
      }

      const progress = p.life / p.maxLife;
      p.y += p.speed * delta;
      p.x += p.drift * delta;
      p.z += p.driftZ * delta;

      // Wind effect — drift more as it rises
      const windDrift = Math.sin(Date.now() * 0.001 + i) * delta * 0.2;
      p.x += windDrift;

      dummy.position.set(p.x, p.y, p.z);
      const currentScale = p.scale + progress * p.expansion;
      dummy.scale.setScalar(currentScale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={1}
          metalness={0}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}
