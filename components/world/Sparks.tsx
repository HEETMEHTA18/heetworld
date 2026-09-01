"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Sparks() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = 30;

  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        baseX: -8 + (Math.random() - 0.5) * 1.5,
        baseZ: -2 + (Math.random() - 0.5) * 1.5,
        velY: 2 + Math.random() * 3,
        velX: (Math.random() - 0.5) * 1,
        velZ: (Math.random() - 0.5) * 1,
        life: Math.random(),
        maxLife: 0.5 + Math.random() * 0.8,
      })),
    []
  );

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.life += delta;
      if (p.life > p.maxLife) {
        p.life = 0;
        p.baseX = -8 + (Math.random() - 0.5) * 1.5;
        p.baseZ = -2 + (Math.random() - 0.5) * 1.5;
        p.velY = 2 + Math.random() * 3;
        p.velX = (Math.random() - 0.5) * 1;
        p.velZ = (Math.random() - 0.5) * 1;
      }
      const progress = p.life / p.maxLife;
      const x = p.baseX + p.velX * progress * 2;
      const z = p.baseZ + p.velZ * progress * 2;
      const y = 0.5 + p.velY * progress - progress * progress * 3;
      dummy.position.set(x, y, z);
      const s = 0.03 * (1 - progress * 0.5);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#FF6600" transparent opacity={0.9} />
    </instancedMesh>
  );
}

export default React.memo(Sparks);
