"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard, Html } from "@react-three/drei";
import { BUILDINGS, BuildingConfig } from "@/lib/world-constants";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";

export default function Buildings() {
  return (
    <group>
      {BUILDINGS.map((building) => (
        <VillageBuilding key={building.id} config={building} />
      ))}
    </group>
  );
}

function VillageBuilding({ config }: { config: BuildingConfig }) {
  const groupRef = useRef<THREE.Group>(null);
  const { setSelectedDestination, isTraveling, activeBuilding, setActiveBuilding, flying } = useVillageStore();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y =
      config.position[1] + Math.sin(state.clock.elapsedTime * 0.8 + config.position[0]) * 0.03;
    const targetScale = hovered ? 1.05 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  React.useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, []);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (activeBuilding) return;

    // Realistic workflow: in flying mode open directly, otherwise travel to building then auto-open on arrival
    if (flying) {
      setActiveBuilding(config.id);
    } else {
      setSelectedDestination(config.id);
    }
  };

  const accent = hovered ? "#D4A017" : config.color;

  return (
    <group
      position={config.position}
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={() => {
        if ((!isTraveling || flying) && !activeBuilding) {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <BuildingGeometry id={config.id} accent={accent} hovered={hovered} />

      {(hovered || activeBuilding === config.id) && (
        <Billboard position={[0, 6, 0]}>
          <Text position={[0, 0, 0]} fontSize={0.45} color={hovered ? "#D4A017" : "#FFF"} outlineColor="#000" outlineWidth={0.03} anchorY="bottom" maxWidth={8}>
            {config.name}
          </Text>
          <Text position={[0, -0.5, 0]} fontSize={0.22} color={hovered ? "#D4A017" : "#AAA"} outlineColor="#000" outlineWidth={0.02} anchorY="bottom">
            {config.subtitle}
          </Text>
          {hovered && (!isTraveling || flying) && !activeBuilding && (
            <Text position={[0, 0.6, 0]} fontSize={0.2} color="#D4A017" outlineColor="#000" outlineWidth={0.02} anchorY="bottom">
              {flying ? "Click to View" : "Click to Travel"}
            </Text>
          )}
        </Billboard>
      )}

    </group>
  );
}

function AvatarHologram({ accent, glow }: { accent: string; glow: number }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const meshRef = useRef<THREE.Group>(null);

  React.useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("/heet_avatar.jpeg", (tex) => {
      setTexture(tex);
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.8;
    }
    if (meshRef.current) {
      meshRef.current.position.y = 2.2 + Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group ref={meshRef} position={[0, 2.2, 0]}>
      {/* Outer spinning sci-fi ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.7, 0.76, 32]} />
        <meshBasicMaterial color={accent} side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
      
      {/* Inner glowing ring */}
      <mesh>
        <ringGeometry args={[0.65, 0.67, 32]} />
        <meshBasicMaterial color="#FFF" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* Hologram Billboard */}
      <Billboard>
        {texture && (
          <mesh>
            <circleGeometry args={[0.6, 32]} />
            <meshBasicMaterial 
              map={texture} 
              transparent 
              side={THREE.DoubleSide}
              color="#E2F2FF"
            />
          </mesh>
        )}
        {/* Semi-transparent blue glow backing */}
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[0.62, 32]} />
          <meshBasicMaterial 
            color={accent} 
            transparent 
            opacity={0.25} 
            side={THREE.DoubleSide}
          />
        </mesh>
      </Billboard>
      
      {/* Subtle light source */}
      <pointLight distance={4} intensity={1.5} color={accent} position={[0, 0, 0.2]} />
    </group>
  );
}

function BuildingGeometry({ id, accent, hovered }: { id: string; accent: string; hovered: boolean }) {
  const glow = hovered ? 0.8 : 0.2;

  switch (id) {
    case "town-square":
      return (
        <group>
          <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[3.5, 4, 0.3, 8]} /><meshStandardMaterial color="#7A6B5D" roughness={0.9} /></mesh>
          <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[1.5, 1.8, 0.5, 16]} /><meshStandardMaterial color="#5A5A5A" roughness={0.7} metalness={0.3} /></mesh>
          <mesh position={[0, 0.78, 0]}><cylinderGeometry args={[1.3, 1.3, 0.05, 16]} /><meshStandardMaterial color="#4AA3DF" emissive="#2980B9" emissiveIntensity={0.5} /></mesh>
          <mesh position={[0, 0.78, 0]}><cylinderGeometry args={[1.4, 1.4, 0.02, 16]} /><meshStandardMaterial color="#3A93CF" transparent opacity={0.4} /></mesh>
          <mesh position={[0, 1.3, 0]}><cylinderGeometry args={[0.15, 0.25, 1.2, 8]} /><meshStandardMaterial color="#C0C0C0" metalness={0.6} roughness={0.3} /></mesh>
          <AvatarHologram accent={accent} glow={glow} />
          {[-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2].map((x, i) => (
            <mesh key={`cb-${i}`} position={[x * 0.35, 0.9, 1.7]}><boxGeometry args={[0.06, 0.3, 0.06]} /><meshStandardMaterial color="#888" /></mesh>
          ))}
        </group>
      );

    case "forge":
      return (
        <group>
          <mesh position={[0, 0.9, 0]}><boxGeometry args={[3.0, 1.8, 2.4]} /><meshStandardMaterial color="#4A3728" roughness={0.9} /></mesh>
          <mesh position={[0, 1.9, -0.6]}><boxGeometry args={[3.2, 0.2, 1.8]} /><meshStandardMaterial color="#5C4033" roughness={0.95} /></mesh>
          <mesh position={[0, 2.3, 0]} rotation={[0, 0, 0]}><coneGeometry args={[2.4, 0.7, 4]} /><meshStandardMaterial color="#8B2500" roughness={0.85} /></mesh>
          <mesh position={[-1.0, 2.7, 0]}><boxGeometry args={[0.5, 1.0, 0.5]} /><meshStandardMaterial color="#666" roughness={0.7} /></mesh>
          <mesh position={[-1.0, 3.3, 0]}><sphereGeometry args={[0.25, 8, 8]} /><meshStandardMaterial color="#FF5722" emissive="#FF5722" emissiveIntensity={hovered ? 3 : 1.5} /></mesh>
          <mesh position={[-1.0, 3.3, 0]}><sphereGeometry args={[0.4, 8, 8]} /><meshStandardMaterial color="#FF8A00" emissive="#FF8A00" emissiveIntensity={0.3} transparent opacity={0.3} /></mesh>
          <mesh position={[0, 0.5, 1.21]}><boxGeometry args={[0.7, 1.0, 0.08]} /><meshStandardMaterial color="#2D1B0E" /></mesh>
          <mesh position={[0.5, 0.8, 1.21]}><boxGeometry args={[0.3, 0.01, 0.05]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
          <mesh position={[-0.5, 0.8, 1.21]}><boxGeometry args={[0.3, 0.01, 0.05]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
          <mesh position={[0.9, 1.1, 1.21]}><boxGeometry args={[0.35, 0.35, 0.06]} /><meshStandardMaterial color="#FF8A00" emissive="#FF8A00" emissiveIntensity={glow + 0.5} /></mesh>
          <mesh position={[-0.9, 1.1, 1.21]}><boxGeometry args={[0.35, 0.35, 0.06]} /><meshStandardMaterial color="#FF8A00" emissive="#FF8A00" emissiveIntensity={glow + 0.3} /></mesh>
          <mesh position={[0, 3.2, 0.6]}><boxGeometry args={[0.15, 0.4, 0.15]} /><meshStandardMaterial color="#666" roughness={0.6} /></mesh>
          <mesh position={[0, 3.2, 0.6]}><sphereGeometry args={[0.08, 6, 6]} /><meshStandardMaterial color="#FF6600" emissive="#FF6600" emissiveIntensity={0.5} /></mesh>
        </group>
      );

    case "academy":
      return (
        <group>
          <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[1.6, 1.8, 2.4, 8]} /><meshStandardMaterial color="#D4C9B0" roughness={0.4} metalness={0.1} /></mesh>
          {[0.8, -0.8].map((x, i) => (
            <mesh key={`col-${i}`} position={[x, 0.8, 1.3]}><cylinderGeometry args={[0.1, 0.12, 1.6, 8]} /><meshStandardMaterial color="#B0A890" roughness={0.5} metalness={0.2} /></mesh>
          ))}
          <mesh position={[0, 2.8, 0]}><sphereGeometry args={[1.5, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#1A237E" roughness={0.3} metalness={0.5} /></mesh>
          <mesh position={[0, 2.8, 0]}><sphereGeometry args={[1.5, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#2C3E6B" roughness={0.3} metalness={0.4} transparent opacity={0.6} /></mesh>
          <mesh position={[0, 2.3, 0]} rotation={[0.4, 0, 0.2]}><torusGeometry args={[2.2, 0.06, 8, 32]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow + 0.4} /></mesh>
          <mesh position={[0, 2.3, 0]} rotation={[-0.4, 0.4, 0]}><torusGeometry args={[2.2, 0.06, 8, 32]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow + 0.4} /></mesh>
          <mesh position={[0, 2.3, 0]} rotation={[0, 0.8, 0.6]}><torusGeometry args={[2.2, 0.06, 8, 32]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow + 0.3} /></mesh>
          <mesh position={[0, 3.3, 0]}><sphereGeometry args={[0.3, 12, 12]} /><meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={glow + 0.5} /></mesh>
          <mesh position={[0, 0.5, 1.61]}><boxGeometry args={[0.6, 1.0, 0.06]} /><meshStandardMaterial color="#0D1B4A" /></mesh>
          <mesh position={[0.5, 0.9, 1.62]}><boxGeometry args={[0.2, 0.01, 0.03]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
          <mesh position={[-0.5, 0.9, 1.62]}><boxGeometry args={[0.2, 0.01, 0.03]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
        </group>
      );

    case "watchtower":
      return (
        <group>
          <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[1.2, 1.4, 0.8, 6]} /><meshStandardMaterial color="#4A4A4A" roughness={0.8} /></mesh>
          <mesh position={[0, 1.8, 0]}><cylinderGeometry args={[0.55, 0.9, 2.4, 6]} /><meshStandardMaterial color="#5A5A5A" roughness={0.7} metalness={0.1} /></mesh>
          <mesh position={[0, 3.2, 0]}><cylinderGeometry args={[0.45, 0.55, 0.8, 6]} /><meshStandardMaterial color="#3A3A3A" roughness={0.6} metalness={0.3} /></mesh>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <mesh key={`win-${i}`} position={[Math.sin(angle) * 0.6, 2.0, Math.cos(angle) * 0.6]}>
                <boxGeometry args={[0.16, 0.25, 0.02]} />
                <meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={glow + 0.2} />
              </mesh>
            );
          })}
          <mesh position={[0, 4.3, 0]}><sphereGeometry args={[0.55, 12, 12]} /><meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={hovered ? 2.5 : 1.0} /></mesh>
          <mesh position={[0, 4.3, 0]}><sphereGeometry args={[0.75, 12, 12]} /><meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={0.2} transparent opacity={0.2} /></mesh>
          <mesh position={[0, 5.2, 0]}><coneGeometry args={[0.12, 0.9, 6]} /><meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} /></mesh>
          <mesh position={[0, 5.6, 0]}><sphereGeometry args={[0.04, 4, 4]} /><meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={2} /></mesh>
          <mesh position={[0, 0.8, 1.11]}><boxGeometry args={[0.5, 0.8, 0.05]} /><meshStandardMaterial color="#2A2A2A" /></mesh>
        </group>
      );

    case "arena":
      return (
        <group>
          <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[3.0, 3.3, 0.3, 10]} /><meshStandardMaterial color="#B8956A" roughness={0.85} /></mesh>
          <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[2.4, 2.6, 0.25, 10]} /><meshStandardMaterial color="#A08060" roughness={0.8} /></mesh>
          <mesh position={[0, 0.6, 0]}><cylinderGeometry args={[1.8, 2.0, 0.2, 10]} /><meshStandardMaterial color="#C9A96E" roughness={0.7} /></mesh>
          <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[1.3, 1.3, 0.1, 10]} /><meshStandardMaterial color="#D4A017" roughness={0.6} /></mesh>
          {[-2.6, -1.3, 1.3, 2.6].map((x, i) => (
            <mesh key={`step-${i}`} position={[x, 0.3, 0]}><boxGeometry args={[0.8, 0.1, 0.8]} /><meshStandardMaterial color="#B8956A" roughness={0.8} /></mesh>
          ))}
          {[-2.8, 2.8].map((x, i) => (
            <group key={`pole-${i}`}>
              <mesh position={[x, 1.3, 0]}><cylinderGeometry args={[0.06, 0.08, 2.6, 6]} /><meshStandardMaterial color="#6B4226" roughness={0.8} /></mesh>
              <mesh position={[x, 2.5, 0]}><sphereGeometry args={[0.06, 4, 4]} /><meshStandardMaterial color="#D4A017" /></mesh>
              <mesh position={[x, 2.0, 0.15]}><boxGeometry args={[0.02, 0.6, 0.35]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow} /></mesh>
            </group>
          ))}
          <mesh position={[0, 1.0, 0]}><torusGeometry args={[1.7, 0.04, 6, 16]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow + 0.2} /></mesh>
        </group>
      );

    case "guildhall":
      return (
        <group>
          <mesh position={[0, 1.0, 0]}><boxGeometry args={[3.8, 2.0, 2.8]} /><meshStandardMaterial color="#7A6B50" roughness={0.85} /></mesh>
          {[
            [-1.3, 2.0, 0], [1.3, 2.0, 0],
            [-1.3, 1.3, 1.41], [1.3, 1.3, 1.41],
            [-1.3, 1.3, -1.41], [1.3, 1.3, -1.41],
            [-1.3, 2.7, -1.41], [1.3, 2.7, -1.41],
          ].map((pos, i) => (
            <mesh key={`bw-${i}`} position={pos as [number, number, number]}>
              <boxGeometry args={[0.15, 0.15, 0.15]} />
              <meshStandardMaterial color="#D4C9B0" roughness={0.6} />
            </mesh>
          ))}
          <mesh position={[0, 2.4, 0]}><boxGeometry args={[4.0, 0.12, 2.6]} /><meshStandardMaterial color="#5C4033" roughness={0.9} /></mesh>
          <mesh position={[0, 2.8, 0]}><boxGeometry args={[3.2, 0.12, 2.0]} /><meshStandardMaterial color="#4A3028" roughness={0.9} /></mesh>
          <mesh position={[0, 1.3, 1.41]}><circleGeometry args={[0.5, 8]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={glow + 0.4} /></mesh>
          <mesh position={[0, 1.3, 1.41]}><ringGeometry args={[0.4, 0.5, 8]} /><meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={glow} /></mesh>
          <mesh position={[0, 0.5, 1.41]}><boxGeometry args={[0.8, 1.0, 0.06]} /><meshStandardMaterial color="#3E2723" /></mesh>
          <mesh position={[-0.2, 0.5, 1.42]}><boxGeometry args={[0.15, 0.01, 0.03]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
          <mesh position={[0.2, 0.5, 1.42]}><boxGeometry args={[0.15, 0.01, 0.03]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
        </group>
      );

    case "town-hall":
      return (
        <group>
          <mesh position={[0, 0.12, 1.6]}><boxGeometry args={[3.2, 0.24, 1.0]} /><meshStandardMaterial color="#999" roughness={0.7} /></mesh>
          <mesh position={[0, 1.2, 0]}><boxGeometry args={[3.2, 2.4, 2.8]} /><meshStandardMaterial color="#E0D4C0" roughness={0.5} /></mesh>
          {[-1.2, 0, 1.2].map((x, i) => (
            <mesh key={`col-${i}`} position={[x, 1.2, 1.41]}><cylinderGeometry args={[0.1, 0.12, 2.4, 8]} /><meshStandardMaterial color="#CCC" roughness={0.4} metalness={0.1} /></mesh>
          ))}
          <mesh position={[0, 2.6, 1.41]}><coneGeometry args={[1.8, 0.6, 3]} /><meshStandardMaterial color="#C0B090" roughness={0.6} /></mesh>
          <mesh position={[0, 2.2, 1.41]}><circleGeometry args={[0.35, 16]} /><meshStandardMaterial color="#FFF" emissive={accent} emissiveIntensity={glow} /></mesh>
          <mesh position={[0, 2.2, 1.41]}><ringGeometry args={[0.3, 0.35, 16]} /><meshStandardMaterial color="#333" /></mesh>
          <mesh position={[0, 0.5, 1.41]}><boxGeometry args={[0.9, 1.1, 0.05]} /><meshStandardMaterial color="#5C4033" /></mesh>
          <mesh position={[-0.25, 0.5, 1.42]}><boxGeometry args={[0.15, 0.01, 0.03]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
          <mesh position={[0.25, 0.5, 1.42]}><boxGeometry args={[0.15, 0.01, 0.03]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
          <mesh position={[0, 2.8, 0]}><boxGeometry args={[3.2, 0.15, 2.4]} /><meshStandardMaterial color="#B0A090" roughness={0.6} /></mesh>
          {[-1.4, 1.4].map((x, i) => (
            <mesh key={`top-${i}`} position={[x, 0.8, -1.41]}><boxGeometry args={[0.25, 0.4, 0.25]} /><meshStandardMaterial color="#666" roughness={0.7} /></mesh>
          ))}
        </group>
      );

    case "harbor":
      return (
        <group>
          <mesh position={[0, 0.15, 0]}><boxGeometry args={[5.0, 0.3, 3.5]} /><meshStandardMaterial color="#7A6B50" roughness={0.9} /></mesh>
          <mesh position={[0, 0.15, 0]}><boxGeometry args={[4.6, 0.1, 3.1]} /><meshStandardMaterial color="#6B5B4F" roughness={0.8} /></mesh>
          <mesh position={[-1.2, 0.7, -0.3]}><boxGeometry args={[1.8, 1.2, 1.8]} /><meshStandardMaterial color="#5C4A3A" roughness={0.85} /></mesh>
          <mesh position={[-1.2, 1.5, -0.3]}><coneGeometry args={[1.2, 0.5, 4]} /><meshStandardMaterial color="#8B2500" roughness={0.8} /></mesh>
          <mesh position={[-1.2, 0.35, -0.9]}><boxGeometry args={[0.5, 0.7, 0.05]} /><meshStandardMaterial color="#3E2723" /></mesh>
          <mesh position={[1.5, 1.3, -0.3]}><cylinderGeometry args={[0.3, 0.45, 2.6, 8]} /><meshStandardMaterial color="#E0D4C0" roughness={0.4} /></mesh>
          <mesh position={[1.5, 2.8, -0.3]}><sphereGeometry args={[0.3, 8, 8]} /><meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={hovered ? 3 : 1.2} /></mesh>
          <mesh position={[1.5, 2.8, -0.3]}><sphereGeometry args={[0.5, 8, 8]} /><meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.15} transparent opacity={0.2} /></mesh>
          <mesh position={[0, 0.15, 2.3]} rotation={[0, 0.3, 0]}><boxGeometry args={[0.8, 0.35, 1.8]} /><meshStandardMaterial color="#5C4033" roughness={0.9} /></mesh>
          <mesh position={[0, 0.15, 2.3]} rotation={[0, 0.3, 0]}><boxGeometry args={[0.6, 0.02, 1.6]} /><meshStandardMaterial color="#3A2A1A" /></mesh>
          <mesh position={[0, 0.4, 2.6]} rotation={[0, 0.3, 0]}><cylinderGeometry args={[0.04, 0.04, 0.5, 6]} /><meshStandardMaterial color="#5C4033" /></mesh>
          {[0, 1].map((i) => (
            <mesh key={`post-${i}`} position={[-1.7 + i * 3.4, 0.5, 0]}><cylinderGeometry args={[0.06, 0.08, 1.0, 6]} /><meshStandardMaterial color="#666" roughness={0.7} /></mesh>
          ))}
          <mesh position={[-1.7, 1.0, 0]} rotation={[0, 0, 0.2]}><boxGeometry args={[0.03, 0.4, 0.3]} /><meshStandardMaterial color="#999" roughness={0.6} transparent opacity={0.5} /></mesh>
          <mesh position={[1.7, 1.0, 0]} rotation={[0, 0, -0.2]}><boxGeometry args={[0.03, 0.4, 0.3]} /><meshStandardMaterial color="#999" roughness={0.6} transparent opacity={0.5} /></mesh>
        </group>
      );

    case "archive":
      return (
        <group>
          {/* Main building body - two-story stone library */}
          <mesh position={[0, 1.2, 0]}><boxGeometry args={[3.4, 2.4, 3.0]} /><meshStandardMaterial color="#8B7355" roughness={0.85} /></mesh>
          <mesh position={[0, 1.2, 0]}><boxGeometry args={[3.2, 2.2, 2.8]} /><meshStandardMaterial color="#9B8365" roughness={0.8} /></mesh>
          
          {/* Roof */}
          <mesh position={[0, 2.8, 0]} rotation={[0, 0, 0]}><coneGeometry args={[2.6, 0.8, 4]} /><meshStandardMaterial color="#5C4033" roughness={0.9} /></mesh>
          <mesh position={[0, 3.2, 0]}><sphereGeometry args={[0.15, 6, 6]} /><meshStandardMaterial color="#D4A017" emissive="#D4A017" emissiveIntensity={0.5} /></mesh>
          
          {/* Chimney */}
          <mesh position={[1.3, 2.0, 1.2]}><boxGeometry args={[0.3, 1.2, 0.3]} /><meshStandardMaterial color="#6B5B4F" roughness={0.9} /></mesh>
          <mesh position={[1.3, 2.7, 1.2]}><boxGeometry args={[0.35, 0.1, 0.35]} /><meshStandardMaterial color="#5A4A3A" /></mesh>
          
          {/* Windows - glowing warm light */}
          {[[-0.8, 0.8, 1.51], [0.8, 0.8, 1.51], [-0.8, 1.8, 1.51], [0.8, 1.8, 1.51]].map((pos, i) => (
            <mesh key={`win-${i}`} position={pos as [number, number, number]}>
              <planeGeometry args={[0.5, 0.6]} />
              <meshStandardMaterial color="#FFD700" emissive="#FFB300" emissiveIntensity={0.6} transparent opacity={0.8} />
            </mesh>
          ))}
          
          {/* Window frames */}
          {[[-0.8, 0.8, 1.52], [0.8, 0.8, 1.52], [-0.8, 1.8, 1.52], [0.8, 1.8, 1.52]].map((pos, i) => (
            <mesh key={`fw-${i}`} position={pos as [number, number, number]}>
              <ringGeometry args={[0.25, 0.27, 4]} />
              <meshStandardMaterial color="#3A2A1A" roughness={0.7} />
            </mesh>
          ))}
          
          {/* Door */}
          <mesh position={[0, 0.5, 1.51]}><boxGeometry args={[0.7, 1.0, 0.06]} /><meshStandardMaterial color="#3E2723" /></mesh>
          <mesh position={[0.2, 0.5, 1.52]}><boxGeometry args={[0.12, 0.01, 0.03]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
          <mesh position={[-0.2, 0.5, 1.52]}><boxGeometry args={[0.12, 0.01, 0.03]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
          <mesh position={[0.3, 0.5, 1.52]}><sphereGeometry args={[0.04, 4, 4]} /><meshStandardMaterial color="#D4A017" metalness={0.8} /></mesh>
          
          {/* Bookshelf detail - side walls */}
          {[[-1.71, 0.8, 0.5], [-1.71, 0.8, -0.5], [1.71, 0.8, -0.5], [1.71, 0.8, 0.5]].map((pos, i) => (
            <mesh key={`book-${i}`} position={pos as [number, number, number]}>
              <boxGeometry args={[0.04, 0.8, 0.6]} />
              <meshStandardMaterial color={["#6B4E2E", "#8B2500", "#2C3E6B", "#4A7C59"][i]} roughness={0.9} />
            </mesh>
          ))}
          
          {/* Lantern on wall */}
          <mesh position={[-1.0, 1.2, 1.52]}><sphereGeometry args={[0.08, 6, 6]} /><meshStandardMaterial color="#FF6600" emissive="#FF6600" emissiveIntensity={0.8} /></mesh>
          <mesh position={[1.0, 1.2, 1.52]}><sphereGeometry args={[0.08, 6, 6]} /><meshStandardMaterial color="#FF6600" emissive="#FF6600" emissiveIntensity={0.8} /></mesh>
          
          {/* Welcome mat */}
          <mesh position={[0, 0.02, 1.71]}><planeGeometry args={[0.8, 0.4]} /><meshStandardMaterial color="#8B2500" roughness={0.95} /></mesh>
        </group>
      );

    default:
      return <mesh position={[0, 1, 0]}><boxGeometry args={[2, 2, 2]} /><meshStandardMaterial color="#888" /></mesh>;
  }
}
