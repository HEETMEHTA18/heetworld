"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Car({ isDriving, ...props }: { isDriving: boolean; position?: [number, number, number]; rotation?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={groupRef} {...props}>
      {/* --- CAR EXTERIOR --- */}
      {/* Main Body */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.5, 3]} />
        <meshStandardMaterial color="#1A2530" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Front Hood */}
      <mesh position={[0, 0.65, -0.9]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.1, 1.2]} />
        <meshStandardMaterial color="#1A2530" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* --- CAR INTERIOR --- */}
      {/* Roof */}
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.05, 1.6]} />
        <meshStandardMaterial color="#111820" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 0.9, 0.8]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.8, 0.1]} />
        <meshStandardMaterial color="#111820" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Side doors */}
      <mesh position={[-0.65, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.6, 1.6]} />
        <meshStandardMaterial color="#111820" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0.65, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.6, 1.6]} />
        <meshStandardMaterial color="#111820" roughness={0.3} metalness={0.5} />
      </mesh>
      
      {/* A-Pillars (Windshield frames) */}
      <mesh position={[-0.65, 1.05, -0.45]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.7, 0.08]} />
        <meshStandardMaterial color="#111820" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0.65, 1.05, -0.45]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.7, 0.08]} />
        <meshStandardMaterial color="#111820" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Dashboard Top */}
      <mesh position={[0, 0.7, -0.6]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.6]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
      </mesh>
      
      {/* Dashboard Front Face */}
      <mesh position={[0, 0.5, -0.35]}>
        <boxGeometry args={[1.5, 0.4, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>

      {/* AC Vents */}
      <mesh position={[-0.15, 0.6, -0.3]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.03, 0.01]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[0.15, 0.6, -0.3]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.03, 0.01]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[0.6, 0.6, -0.3]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.03, 0.01]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Center Console */}
      <mesh position={[0, 0.45, -0.1]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.35, 0.3, 0.6]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Gear Shifter */}
      <mesh position={[0, 0.5, -0.05]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1]} />
        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.55, -0.05]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* Center Infotainment Screen (GPS) */}
      <mesh position={[0, 0.65, -0.31]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.26, 0.18]} />
        <meshBasicMaterial color="#0A0A0A" />
      </mesh>
      <mesh position={[0, 0.65, -0.309]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.24, 0.16]} />
        {/* Simplified GPS Map Look */}
        <meshBasicMaterial color="#1a2b3c" />
      </mesh>
      {/* Map Path Line */}
      <mesh position={[0, 0.65, -0.308]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.02, 0.1]} />
        <meshBasicMaterial color="#00ffcc" />
      </mesh>
      {/* Destination Pin */}
      <mesh position={[0, 0.68, -0.307]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.015, 16]} />
        <meshBasicMaterial color="#ff3366" />
      </mesh>

      {/* Steering Wheel Column */}
      <mesh position={[-0.4, 0.65, -0.28]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.25, 8]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* Steering Wheel */}
      <mesh position={[-0.4, 0.75, -0.15]} rotation={[0.15, 0, 0]}>
        <torusGeometry args={[0.16, 0.028, 16, 32]} />
        <meshStandardMaterial color="#222" roughness={0.6} />
      </mesh>
      {/* Steering Wheel Center Logo */}
      <mesh position={[-0.4, 0.75, -0.14]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.01, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* Instrument Cluster (Speedometer hood) */}
      <mesh position={[-0.4, 0.8, -0.4]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.4, 0.05, 0.25]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Speedometer Screen */}
      <mesh position={[-0.4, 0.72, -0.34]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.3, 0.12]} />
        <meshBasicMaterial color="#0A0A0A" />
      </mesh>
      {/* Speedometer Graphics */}
      <mesh position={[-0.45, 0.72, -0.339]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.04, 32, 0, Math.PI]} />
        <meshBasicMaterial color="#00FFCC" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.35, 0.72, -0.339]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.04, 32, 0, Math.PI]} />
        <meshBasicMaterial color="#ff3366" transparent opacity={0.8} />
      </mesh>

      {/* Rearview mirror */}
      <mesh position={[0, 1.25, -0.35]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.25, 0.08, 0.02]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* --- EXTERIOR LIGHTS & WHEELS --- */}
      {/* Wheels */}
      <CarWheel position={[-0.85, 0.25, -1]} isDriving={isDriving} />
      <CarWheel position={[0.85, 0.25, -1]} isDriving={isDriving} />
      <CarWheel position={[-0.85, 0.25, 1]} isDriving={isDriving} />
      <CarWheel position={[0.85, 0.25, 1]} isDriving={isDriving} />

      {/* Headlights */}
      <mesh position={[-0.5, 0.45, -1.51]}>
        <planeGeometry args={[0.3, 0.15]} />
        <meshBasicMaterial color="#FFFFEE" />
      </mesh>
      <mesh position={[0.5, 0.45, -1.51]}>
        <planeGeometry args={[0.3, 0.15]} />
        <meshBasicMaterial color="#FFFFEE" />
      </mesh>
      
      {/* Tail lights */}
      <mesh position={[-0.5, 0.45, 1.51]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.3, 0.15]} />
        <meshBasicMaterial color="#FF0000" />
      </mesh>
      <mesh position={[0.5, 0.45, 1.51]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.3, 0.15]} />
        <meshBasicMaterial color="#FF0000" />
      </mesh>
    </group>
  );
}

function CarWheel({ position, isDriving }: { position: [number, number, number], isDriving: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current && isDriving) {
      ref.current.rotation.x -= delta * 15;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.25, 0.1, 0.2, 16]} />
      <meshStandardMaterial color="#111111" roughness={0.9} />
    </mesh>
  );
}
