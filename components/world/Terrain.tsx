"use client";

import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

const Terrain = React.memo(function Terrain() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.receiveShadow = true;
          
          if ((child as THREE.Mesh).geometry.type === "PlaneGeometry") {
            // Apply polygonOffset to paths (planes elevated above the base ground)
            if (child.position.y > -0.01) {
              const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
              mat.polygonOffset = true;
              mat.polygonOffsetFactor = -1;
              mat.polygonOffsetUnits = -1;
              mat.needsUpdate = true;
            }
          } else {
            // Non-planes (trees, etc.) can cast shadows
            child.castShadow = true;
          }
        }
      });
    }
  }, []);

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#3D6B3A" roughness={0.95} />
      </mesh>

      {/* Main Vertical Road */}
      <mesh position={[0, 0.015, 27.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 110]} />
        <meshStandardMaterial color="#3A3A3A" roughness={0.85} />
      </mesh>

      {/* Main Road Dashed Lines */}
      {Array.from({ length: 28 }).map((_, i) => {
        const z = 80 - i * 4;
        // Skip intersections
        if (Math.abs(z - (-6)) < 3 || Math.abs(z - 14) < 3 || Math.abs(z - (-22)) < 3) return null;
        return (
          <mesh key={`lane-${i}`} position={[0, 0.15, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.2, 2.0]} />
            <meshStandardMaterial color="#DDD" emissive="#FFF" emissiveIntensity={0.2} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} />
          </mesh>
        );
      })}

      {/* Crossroad 1 Dashes */}
      {Array.from({ length: 11 }).map((_, i) => {
        const x = -20 + i * 4;
        if (Math.abs(x) < 4) return null; // skip intersection
        return (
          <mesh key={`cr1-lane-${i}`} position={[x, 0.15, -6]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.0, 0.2]} />
            <meshStandardMaterial color="#DDD" emissive="#FFF" emissiveIntensity={0.2} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} />
          </mesh>
        );
      })}

      {/* Crossroad 2 Dashes */}
      {Array.from({ length: 11 }).map((_, i) => {
        const x = -20 + i * 4;
        if (Math.abs(x) < 4) return null; // skip intersection
        return (
          <mesh key={`cr2-lane-${i}`} position={[x, 0.15, 14]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.0, 0.2]} />
            <meshStandardMaterial color="#DDD" emissive="#FFF" emissiveIntensity={0.2} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} />
          </mesh>
        );
      })}

      {/* Main Road Side Lines - Split to avoid intersections */}
      {/* Segment 1: z = -27.5 to -25 */}
      <mesh position={[-3.8, 0.12, -26.25]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.08, 2.5]} /><meshStandardMaterial color="#DDD" polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} /></mesh>
      <mesh position={[3.8, 0.12, -26.25]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.08, 2.5]} /><meshStandardMaterial color="#DDD" polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} /></mesh>
      
      {/* Segment 2: z = -19 to -9 */}
      <mesh position={[-3.8, 0.12, -14]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.08, 10]} /><meshStandardMaterial color="#DDD" polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} /></mesh>
      <mesh position={[3.8, 0.12, -14]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.08, 10]} /><meshStandardMaterial color="#DDD" polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} /></mesh>

      {/* Segment 3: z = -3 to 11 */}
      <mesh position={[-3.8, 0.12, 4]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.08, 14]} /><meshStandardMaterial color="#DDD" polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} /></mesh>
      <mesh position={[3.8, 0.12, 4]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.08, 14]} /><meshStandardMaterial color="#DDD" polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} /></mesh>

      {/* Segment 4: z = 17 to 82.5 */}
      <mesh position={[-3.8, 0.12, 49.75]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.08, 65.5]} /><meshStandardMaterial color="#DDD" polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} /></mesh>
      <mesh position={[3.8, 0.12, 49.75]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.08, 65.5]} /><meshStandardMaterial color="#DDD" polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} /></mesh>

      {/* Crossroad 1 (z = -6) - Split Left & Right */}
      <mesh position={[-13, 0.015, -6]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[18, 6]} /><meshStandardMaterial color="#3A3A3A" roughness={0.85} /></mesh>
      <mesh position={[13, 0.015, -6]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[18, 6]} /><meshStandardMaterial color="#3A3A3A" roughness={0.85} /></mesh>

      {/* Crossroad 2 (z = 14) - Split Left & Right */}
      <mesh position={[-12, 0.015, 14]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[16, 6]} /><meshStandardMaterial color="#3A3A3A" roughness={0.85} /></mesh>
      <mesh position={[12, 0.015, 14]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[16, 6]} /><meshStandardMaterial color="#3A3A3A" roughness={0.85} /></mesh>

      {/* Crossroad 3 (z = -22) - Split Left & Right */}
      <mesh position={[-6, 0.015, -22]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[4, 6]} /><meshStandardMaterial color="#3A3A3A" roughness={0.85} /></mesh>
      <mesh position={[6, 0.015, -22]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[4, 6]} /><meshStandardMaterial color="#3A3A3A" roughness={0.85} /></mesh>

      <mesh position={[14, -0.04, 32]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#2C5F7C" roughness={0.2} metalness={0.3} />
      </mesh>

      <Trees />
      <Pebbles />
      <Lampposts />
      <Mountains />
      <Gate />
      <Flowers />
      <GrassTufts />
      <Well />
      <Benches />
      <GardenPlot />

      <mesh position={[5, 0.015, 32]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 1.0]} />
        <meshStandardMaterial color="#4A4A4A" roughness={0.8} />
      </mesh>
    </group>
  );
});

export default Terrain;

function Trees() {
  const positions: [number, number, number][] = [
    [-22, 0, -22], [-12, 0, -24], [12, 0, -24], [22, 0, -20],
    [-24, 0, 4], [24, 0, 5], [-24, 0, 12], [24, 0, -8],
    [-10, 0, 48], [10, 0, 58], [-10, 0, 68], [10, 0, 72],
    [-10, 0, 4], [10, 0, 4], [-10, 0, 22], [10, 0, 22],
    [-22, 0, 24], [22, 0, 24],
    [-26, 0, -10], [26, 0, -10], [-28, 0, 18], [28, 0, 18],
    [-16, 0, -26], [16, 0, -26], [-14, 0, -28], [14, 0, -28],
    [-26, 0, -26], [26, 0, -26], [0, 0, -28],
    [-14, 0, 44], [14, 0, 44], [-7, 0, 48], [7, 0, 48],
    [-12, 0, 54], [12, 0, 54], [-10, 0, 60], [10, 0, 60],
    [-14, 0, 66], [14, 0, 66], [-7, 0, 68], [7, 0, 68],
    [-12, 0, 72], [12, 0, 72], [-8, 0, 74], [8, 0, 74],
    [-16, 0, 78], [16, 0, 78],
    [-28, 0, -6], [28, 0, -6], [-28, 0, 6], [28, 0, 6],
    [-24, 0, 14], [24, 0, 14], [-26, 0, -16], [26, 0, -16],
    [-18, 0, -10], [18, 0, -10], [-22, 0, 20], [22, 0, 20],
    [-10, 0, -24], [10, 0, -24],
    [-30, 0, 18], [30, 0, 18], [-30, 0, -18], [30, 0, -18],
    [-8, 0, 36], [8, 0, 36], [-7, 0, 40], [7, 0, 40],
  ];

  const bushPositions: [number, number, number][] = [
    [-5, 0, -0.5], [5, 0, -0.5], [-5, 0, -9], [5, 0, -9],
    [-18, 0, -2], [18, 0, -2], [-14, 0, 10], [14, 0, 10],
    [-11, 0, 7], [11, 0, 7], [-5, 0, 18], [5, 0, 18],
    [-18, 0, 9], [18, 0, 9], [-5, 0, 24], [5, 0, 24],
    [-8, 0, 23], [8, 0, 23], [-14, 0, 4], [14, 0, 4],
  ];

  return (
    <group>
      {positions.map((pos, i) => {
        const isLarge = i % 3 === 0;
        const h = (isLarge ? 2.5 : 1.5) + Math.abs(Math.sin(i * 2.3)) * (isLarge ? 2.5 : 1.5);
        const r = (isLarge ? 1.2 : 0.7) + Math.abs(Math.cos(i * 1.7)) * (isLarge ? 1.0 : 0.6);
        const colors = ["#2D8B3E", "#3A9C4A", "#4AAC5A", "#1E7A30"];
        const color1 = colors[i % colors.length];
        const color2 = colors[(i + 1) % colors.length];
        return (
          <group key={`tree-${i}`} position={pos}>
            <mesh position={[0, h * 0.22, 0]}>
              <cylinderGeometry args={[0.06, 0.18, h * 0.44, 5]} />
              <meshStandardMaterial color="#4A3028" roughness={0.95} />
            </mesh>
            {isLarge ? (
              <>
                <mesh position={[0, h * 0.45, 0]}>
                  <coneGeometry args={[r * 1.1, h * 0.25, 6]} />
                  <meshStandardMaterial color={color1} roughness={0.85} />
                </mesh>
                <mesh position={[0, h * 0.62, 0]}>
                  <coneGeometry args={[r * 0.85, h * 0.2, 6]} />
                  <meshStandardMaterial color={color2} roughness={0.85} />
                </mesh>
                <mesh position={[0, h * 0.82, 0]}>
                  <coneGeometry args={[r * 0.55, h * 0.18, 6]} />
                  <meshStandardMaterial color="#1A6A28" roughness={0.85} />
                </mesh>
              </>
            ) : (
              <>
                <mesh position={[0, h * 0.55, 0]}>
                  <coneGeometry args={[r, h * 0.5, 5]} />
                  <meshStandardMaterial color={color1} roughness={0.85} />
                </mesh>
                <mesh position={[0, h * 0.85, 0]}>
                  <coneGeometry args={[r * 0.6, h * 0.35, 5]} />
                  <meshStandardMaterial color={color2} roughness={0.85} />
                </mesh>
              </>
            )}
          </group>
        );
      })}
      {bushPositions.map((pos, i) => {
        const s = 0.3 + Math.random() * 0.25;
        return (
          <group key={`bush-${i}`} position={pos}>
            <mesh position={[0, s * 0.4, 0]}>
              <sphereGeometry args={[s, 5, 5]} />
              <meshStandardMaterial color="#3A7C4A" roughness={0.9} />
            </mesh>
            <mesh position={[s * 0.3, s * 0.2, s * 0.2]}>
              <sphereGeometry args={[s * 0.6, 5, 5]} />
              <meshStandardMaterial color="#2D6B3A" roughness={0.9} />
            </mesh>
            <mesh position={[-s * 0.25, s * 0.15, -s * 0.15]}>
              <sphereGeometry args={[s * 0.5, 5, 5]} />
              <meshStandardMaterial color="#4A8C5A" roughness={0.9} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Gate() {
  return (
    <group position={[0, 0, 32]}>
      <mesh position={[-2.2, 1.5, 0]}>
        <boxGeometry args={[0.5, 3.0, 0.5]} />
        <meshStandardMaterial color="#5A4A3A" roughness={0.8} />
      </mesh>
      <mesh position={[2.2, 1.5, 0]}>
        <boxGeometry args={[0.5, 3.0, 0.5]} />
        <meshStandardMaterial color="#5A4A3A" roughness={0.8} />
      </mesh>
      <mesh position={[-2.2, 3.2, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.6]} />
        <meshStandardMaterial color="#6A5A4A" roughness={0.7} />
      </mesh>
      <mesh position={[2.2, 3.2, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.6]} />
        <meshStandardMaterial color="#6A5A4A" roughness={0.7} />
      </mesh>
      <mesh position={[0, 3.3, 0]}>
        <boxGeometry args={[4.9, 0.35, 0.5]} />
        <meshStandardMaterial color="#4A3A2A" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, 3.9, 0]}>
        <boxGeometry args={[4.4, 0.8, 0.35]} />
        <meshStandardMaterial color="#6A5A4A" roughness={0.7} />
      </mesh>
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[3.6, 0.4, 0.25]} />
        <meshStandardMaterial color="#5A4A3A" roughness={0.7} />
      </mesh>

      <mesh position={[0, 3.5, 0.3]}>
        <planeGeometry args={[4.0, 2.0]} />
        <meshStandardMaterial color="#2A1A0A" roughness={0.9} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-2.2, 3.0, 0.35]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[2.2, 3.0, 0.35]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0, 4.2, 0.35]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={2.0} />
      </mesh>

      <mesh position={[-1.6, 0.6, 0.26]}>
        <boxGeometry args={[0.08, 1.2, 0.02]} />
        <meshStandardMaterial color="#666" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[1.6, 0.6, 0.26]}>
        <boxGeometry args={[0.08, 1.2, 0.02]} />
        <meshStandardMaterial color="#666" roughness={0.5} metalness={0.3} />
      </mesh>

      <mesh position={[-1.6, 0, 0.26]}>
        <boxGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.6, 0, 0.26]}>
        <boxGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[-2.2, 0.3, 0.36]}>
        <sphereGeometry args={[0.04, 4, 4]} />
        <meshStandardMaterial color="#FF6600" emissive="#FF6600" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[2.2, 0.3, 0.36]}>
        <sphereGeometry args={[0.04, 4, 4]} />
        <meshStandardMaterial color="#FF6600" emissive="#FF6600" emissiveIntensity={0.8} />
      </mesh>

      <mesh position={[-2.5, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#5A4A3A" roughness={0.8} />
      </mesh>
      <mesh position={[2.5, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.4, 0.15]} />
        <meshStandardMaterial color="#5A4A3A" roughness={0.8} />
      </mesh>
      <mesh position={[-2.5, 0.6, 0]}>
        <sphereGeometry args={[0.06, 4, 4]} />
        <meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={1} />
      </mesh>
      <mesh position={[2.5, 0.6, 0]}>
        <sphereGeometry args={[0.06, 4, 4]} />
        <meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function Pebbles() {
  const positions = useMemo(() => {
    const arr: [number, number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 2 + Math.random() * 6;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist + Math.random() * 3 - 1.5;
      const s = 0.03 + Math.random() * 0.04;
      arr.push([x, 0, z, s]);
    }
    return arr;
  }, []);

  return (
    <group>
      {positions.map((p, i) => (
        <mesh key={`pebble-${i}`} position={[p[0], 0.005, p[2]]}>
          <sphereGeometry args={[p[3], 4, 4]} />
          <meshStandardMaterial color="#5A5A5A" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Flowers() {
  const patches: [number, number, number, string][] = [
    // Near Central Plaza
    [-2, 0, 2.5, "#FF6B6B"], [2, 0, 2.5, "#FFD93D"], [-2.5, 0, -2, "#FF8E53"], [2.5, 0, -2, "#FF6B6B"],
    // Near Forge
    [-18, 0, -4, "#FF6B6B"], [-22, 0, -8, "#FFD93D"], [-17, 0, -8, "#FF8E53"],
    // Near Academy
    [18, 0, -4, "#C084FC"], [22, 0, -8, "#F472B6"], [17, 0, -8, "#C084FC"],
    // Near Guildhall
    [-16, 0, 12, "#FFD93D"], [-20, 0, 16, "#FF6B6B"], [-15, 0, 16, "#F472B6"],
    // Near Arena
    [16, 0, 12, "#FF8E53"], [20, 0, 16, "#FFD93D"],
    // Near Career Archives
    [-2, 0, 20, "#F472B6"], [2, 0, 20, "#C084FC"],
    // Near Archive
    [23, 0, 8, "#C084FC"], [27, 0, 12, "#F472B6"], [22, 0, 12, "#FFD93D"],
    // Along road
    [-5, 0, 28, "#FF6B6B"], [5, 0, 28, "#FFD93D"],
    [-5, 0, 36, "#FF8E53"], [5, 0, 36, "#F472B6"],
    [-5, 0, 44, "#C084FC"], [5, 0, 44, "#FF6B6B"],
    [-5, 0, 52, "#FFD93D"], [5, 0, 52, "#FF8E53"],
    // Near Watchtower
    [-2, 0, -20, "#F472B6"], [2, 0, -20, "#C084FC"],
  ];

  const flowerOffsets = useMemo(() =>
    patches.map(() =>
      [0, 1, 2].map(() => ({
        px: (Math.random() - 0.5) * 0.4,
        py: 0.05 + Math.random() * 0.1,
        pz: (Math.random() - 0.5) * 0.4,
        size: 0.04 + Math.random() * 0.03,
      }))
    ), []
  );

  return (
    <group>
      {patches.map((patch, i) => {
        const [px, _, pz, color] = patch;
        return (
          <group key={`flower-${i}`} position={[px, 0, pz]}>
            {flowerOffsets[i].map((o, j) => (
              <mesh key={`f-${i}-${j}`} position={[o.px, o.py, o.pz]}>
                <sphereGeometry args={[o.size, 5, 5]} />
                <meshStandardMaterial color={color} roughness={0.6} />
              </mesh>
            ))}
            <mesh position={[0, 0.02, 0]}>
              <cylinderGeometry args={[0.005, 0.008, 0.1, 3]} />
              <meshStandardMaterial color="#4A7C59" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function GrassTufts() {
  const positions: [number, number][] = [
    [-6, 4], [-8, 6], [6, 4], [8, 6],
    [-15, -4], [15, -4], [-14, 10], [14, 10],
    [-10, 20], [10, 20], [-8, 26], [8, 26],
    [-6, 34], [6, 34], [-8, 42], [8, 42],
    [-6, 50], [6, 50], [-8, 58], [8, 58],
    [-20, -14], [20, -14], [-22, 8], [22, 8],
  ];

  const blades = useMemo(() =>
    positions.map((_, i) =>
      [0, 1, 2].map((j) => ({
        px: (Math.random() - 0.5) * 0.3,
        py: 0.02 + Math.random() * 0.05,
        pz: (Math.random() - 0.5) * 0.3,
        size: 0.08 + Math.random() * 0.06,
      }))
    ), []
  );

  return (
    <group>
      {positions.map(([x, z], i) => (
        <group key={`grass-${i}`} position={[x, 0, z]}>
          {blades[i].map((b, j) => (
            <mesh key={`g-${i}-${j}`} position={[b.px, b.py, b.pz]}>
              <coneGeometry args={[0.03, b.size, 3]} />
              <meshStandardMaterial color={["#4A7C59", "#5A8C69", "#3A6C49"][j]} roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Well() {
  return (
    <group position={[-3, 0, 0]}>
      {/* Well base */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 0.3, 12]} />
        <meshStandardMaterial color="#7A6B5D" roughness={0.9} />
      </mesh>
      {/* Well wall */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.5, 12]} />
        <meshStandardMaterial color="#8B7B6D" roughness={0.85} />
      </mesh>
      {/* Water */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.02, 12]} />
        <meshStandardMaterial color="#2C5F7C" roughness={0.2} metalness={0.3} transparent opacity={0.8} />
      </mesh>
      {/* Arch */}
      <mesh position={[0, 0.9, 0]}>
        <torusGeometry args={[0.5, 0.05, 6, 12, Math.PI]} />
        <meshStandardMaterial color="#6B5B4F" roughness={0.7} />
      </mesh>
      {/* Bucket */}
      <mesh position={[0.3, 0.2, 0.3]}>
        <cylinderGeometry args={[0.08, 0.1, 0.12, 6]} />
        <meshStandardMaterial color="#5C4033" roughness={0.9} />
      </mesh>
      {/* Rope */}
      <mesh position={[0, 0.7, 0.3]}>
        <cylinderGeometry args={[0.005, 0.005, 0.5, 3]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
    </group>
  );
}

function Benches() {
  const positions: [number, number][] = [
    [-5, 6], [5, 6], [-5, 22], [5, 22], [-5, 38], [5, 38], [-5, 50], [5, 50],
  ];

  return (
    <group>
      {positions.map(([x, z], i) => (
        <group key={`bench-${i}`} position={[x, 0, z]}>
          {/* Seat */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.8, 0.08, 0.3]} />
            <meshStandardMaterial color="#6B5B4F" roughness={0.85} />
          </mesh>
          {/* Back */}
          <mesh position={[0, 0.5, -0.15]}>
            <boxGeometry args={[0.8, 0.3, 0.04]} />
            <meshStandardMaterial color="#5A4A3A" roughness={0.85} />
          </mesh>
          {/* Legs */}
          <mesh position={[-0.3, 0.12, 0.1]}>
            <boxGeometry args={[0.04, 0.25, 0.04]} />
            <meshStandardMaterial color="#4A3A2A" />
          </mesh>
          <mesh position={[0.3, 0.12, 0.1]}>
            <boxGeometry args={[0.04, 0.25, 0.04]} />
            <meshStandardMaterial color="#4A3A2A" />
          </mesh>
          <mesh position={[-0.3, 0.12, -0.1]}>
            <boxGeometry args={[0.04, 0.25, 0.04]} />
            <meshStandardMaterial color="#4A3A2A" />
          </mesh>
          <mesh position={[0.3, 0.12, -0.1]}>
            <boxGeometry args={[0.04, 0.25, 0.04]} />
            <meshStandardMaterial color="#4A3A2A" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function GardenPlot() {
  return (
    <group position={[-16, 0, 17]}>
      {/* Soil */}
      <mesh position={[0, 0.01, 0]}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshStandardMaterial color="#4A3728" roughness={0.95} />
      </mesh>
      {/* Border */}
      <mesh position={[0, 0.04, -0.6]}><boxGeometry args={[1.9, 0.06, 0.06]} /><meshStandardMaterial color="#6B5B4F" /></mesh>
      <mesh position={[0, 0.04, 0.6]}><boxGeometry args={[1.9, 0.06, 0.06]} /><meshStandardMaterial color="#6B5B4F" /></mesh>
      <mesh position={[-0.9, 0.04, 0]}><boxGeometry args={[0.06, 0.06, 1.3]} /><meshStandardMaterial color="#6B5B4F" /></mesh>
      <mesh position={[0.9, 0.04, 0]}><boxGeometry args={[0.06, 0.06, 1.3]} /><meshStandardMaterial color="#6B5B4F" /></mesh>
      {/* Crops */}
      {[[-0.5, 0.05, -0.3], [0.5, 0.05, -0.3], [-0.5, 0.05, 0.3], [0.5, 0.05, 0.3]].map((pos, i) => (
        <mesh key={`crop-${i}`} position={pos as [number, number, number]}>
          <coneGeometry args={[0.06, 0.15, 4]} />
          <meshStandardMaterial color={["#4A7C59", "#5A8C69", "#3A6C49", "#6B9C79"][i]} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Lampposts() {
  const positions: [number, number, number][] = [
    // Main road
    [-4, 0, 8], [4, 0, 8], [-4, 0, 16], [4, 0, 16],
    [-4, 0, 24], [4, 0, 24], [-4, 0, 32], [4, 0, 32],
    [-4, 0, 40], [4, 0, 40],
    // Crossroad 1
    [-12, 0, -9], [12, 0, -9], [-12, 0, -3], [12, 0, -3],
    // Crossroad 2
    [-12, 0, 11], [12, 0, 11], [-12, 0, 17], [12, 0, 17],
    // Crossroad 3
    [-6, 0, -25], [6, 0, -25]
  ];
  return (
    <group>
      {positions.map((pos, i) => (
        <group key={`lamp-${i}`} position={pos}>
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 1.2, 6]} />
            <meshStandardMaterial color="#4A4A4A" roughness={0.7} metalness={0.3} />
          </mesh>
          <mesh position={[0, 1.35, 0]}>
            <boxGeometry args={[0.2, 0.15, 0.2]} />
            <meshStandardMaterial color="#5A5A5A" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Mountains() {
  const mountainData = [
    // Behind Watchtower (Z ~ -30 to -40)
    { pos: [0, 0, -42], scale: [35, 25, 25], color: "#2E4053" },
    { pos: [-25, 0, -38], scale: [30, 20, 20], color: "#34495E" },
    { pos: [25, 0, -38], scale: [28, 18, 20], color: "#2E4053" },
    
    // Wrapping around towards the left
    { pos: [-40, 0, -25], scale: [25, 15, 18], color: "#5D6D7E" },
    { pos: [-45, 0, -10], scale: [28, 20, 22], color: "#2E4053" },
    
    // Near Archive / Data Observatory (Z ~ 10, X ~ 45)
    { pos: [45, 0, -15], scale: [32, 22, 25], color: "#2E4053" },
    { pos: [40, 0, 5], scale: [25, 18, 22], color: "#34495E" },
    { pos: [48, 0, 25], scale: [35, 25, 28], color: "#2C3E50" },
    
    // Filling the corner (X ~ 40, Z ~ -35)
    { pos: [38, 0, -30], scale: [40, 30, 30], color: "#1F2F3F" },
  ];

  return (
    <group>
      {mountainData.map((m, i) => (
        <group key={`mountain-${i}`} position={m.pos as [number, number, number]}>
          <mesh castShadow receiveShadow position={[0, m.scale[1] / 2, 0]}>
            <coneGeometry args={[m.scale[0] / 2, m.scale[1], 5]} />
            <meshStandardMaterial color={m.color} roughness={0.9} flatShading />
          </mesh>
          {/* Snow cap: raised and narrowed to prevent z-fighting with cone body */}
          <mesh position={[0, m.scale[1] * 0.92, 0]}>
            <coneGeometry args={[m.scale[0] * 0.08, m.scale[1] * 0.25, 5]} />
            <meshStandardMaterial color="#ECF0F1" roughness={0.9} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}
