"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

function Mountains_() {
  const mountains = useMemo(() => {
    const arr = [];
    // Generate an arc of mountains in the distance, specifically behind the town
    // The car spawns at Z=200 and drives towards Z=0.
    // So the mountains should be in the -Z direction (opposite of spawn)
    for (let i = 0; i < 40; i++) {
      // Angle from Math.PI (180 deg) to Math.PI * 2 (360 deg) gives negative Z
      // We extend it a bit to wrap around the back of the town slightly (-20 to 200 degrees)
      const minAngle = Math.PI * 0.8; 
      const maxAngle = Math.PI * 2.2;
      const angle = minAngle + (i / 40) * (maxAngle - minAngle);
      
      const radius = 100 + Math.random() * 40;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 20; // Push them slightly further back
      
      const height = 15 + Math.random() * 35;
      const width = 25 + Math.random() * 20;
      
      arr.push({
        position: [x, height / 2 - 5, z] as [number, number, number],
        rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
        scale: [width, height, width] as [number, number, number],
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {mountains.map((m, i) => (
        <mesh key={i} position={m.position} rotation={m.rotation} scale={m.scale} castShadow receiveShadow>
          <coneGeometry args={[1, 1, 4]} />
          <meshStandardMaterial color="#1F2A38" roughness={0.9} flatShading />
        </mesh>
      ))}
      
      {/* Some extra ambient fog near the mountains */}
      {mountains.map((m, i) => i % 3 === 0 && (
         <pointLight key={`l-${i}`} position={[m.position[0], 5, m.position[2]]} color="#6FA8DC" intensity={0.2} distance={30} />
      ))}
    </group>
  );
}

export default React.memo(Mountains_);
