"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import { BUILDINGS, TOUR_SEQUENCE } from "@/lib/world-constants";
import * as THREE from "three";

const STOP_POSITIONS: { [key: string]: THREE.Vector3 } = {
  "start": new THREE.Vector3(0, 0.02, 32),
  "town-square": new THREE.Vector3(0, 0.02, 4.5),
  "forge": new THREE.Vector3(-16.0, 0.02, -6),
  "academy": new THREE.Vector3(16.0, 0.02, -6),
  "watchtower": new THREE.Vector3(0, 0.02, -18.5),
  "arena": new THREE.Vector3(13.0, 0.02, 14),
  "guildhall": new THREE.Vector3(-14.0, 0.02, 14),
  "town-hall": new THREE.Vector3(14, 0.02, 28.0),
  "archive": new THREE.Vector3(18.0, 0.02, 10.0),
  "harbor": new THREE.Vector3(-14, 0.02, 28.0)
};

function getTourPath(fromId: string, toId: string): THREE.Vector3[] {
  const path: THREE.Vector3[] = [];
  const dest = STOP_POSITIONS[toId];
  if (!dest) return path;

  // Intersections on the main road (x = 0)
  const int1 = new THREE.Vector3(0, 0.02, -6);  // Crossroad 1
  const int2 = new THREE.Vector3(0, 0.02, 14);  // Crossroad 2

  if (fromId === "start" && toId === "town-square") {
    path.push(dest);
  } else if (fromId === "town-square" && toId === "forge") {
    path.push(int1);
    path.push(dest);
  } else if (fromId === "forge" && toId === "academy") {
    path.push(int1);
    path.push(dest);
  } else if (fromId === "academy" && toId === "watchtower") {
    path.push(int1);
    path.push(dest);
  } else if (fromId === "watchtower" && toId === "arena") {
    path.push(int1);
    path.push(int2);
    path.push(dest);
  } else if (fromId === "arena" && toId === "guildhall") {
    path.push(int2);
    path.push(dest);
  } else if (fromId === "guildhall" && toId === "town-hall") {
    path.push(int2);
    path.push(dest);
  } else if (fromId === "town-hall" && toId === "archive") {
    path.push(int2);
    path.push(dest);
  } else if (fromId === "archive" && toId === "harbor") {
    path.push(int2);
    path.push(dest);
  } else {
    path.push(dest);
  }

  return path;
}

export default function Scooter() {
  const groupRef = useRef<THREE.Group>(null);
  const wheelAnim = useRef(0);
  const lastTourIndex = useRef(-1);
  const currentWaypointIdx = useRef(0);

  const { tourActive } = useVillageStore();

  useFrame((_state, delta) => {
    if (!groupRef.current || !tourActive) return;

    const pause = useVillageStore.getState().tourPause;
    const activeBuilding = useVillageStore.getState().activeBuilding;
    const seq = TOUR_SEQUENCE;
    const idx = useVillageStore.getState().tourIndex;
    const targetId = seq[idx];

    // Reset waypoint index when target destination changes
    if (idx !== lastTourIndex.current) {
      lastTourIndex.current = idx;
      currentWaypointIdx.current = 0;
    }

    const fromId = idx === 0 ? "start" : seq[idx - 1];
    const path = getTourPath(fromId, targetId);

    if (path.length > 0) {
      const activeWaypoint = path[Math.min(currentWaypointIdx.current, path.length - 1)];
      const dist = groupRef.current.position.distanceTo(activeWaypoint);

      if (pause > 0) {
        useVillageStore.getState().setTourPause(pause - delta);
        // Gradually straighten the bike when stopped
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.15);
      } else if (pause === -1) {
        // Waiting for user to close the panel
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.15);
        if (!activeBuilding) {
          // Panel closed! Start moving to the next building.
          const nextIdx = (idx + 1) % seq.length;
          if (nextIdx === 0) {
            useVillageStore.getState().setTourActive(false);
            useVillageStore.getState().setTourIndex(0);
            useVillageStore.getState().setTourPause(0);
            useVillageStore.getState().setShowAboutMe(true);
          } else {
            useVillageStore.getState().setTourIndex(nextIdx);
            useVillageStore.getState().setTourPause(0.5); // Brief pause before starting next segment
          }
        }
      } else {
        if (dist > 0.4) {
          const speed = 4.8 * delta; // Slower ride speed
          groupRef.current.position.lerp(activeWaypoint, speed / dist);
          const dir = activeWaypoint.clone().sub(groupRef.current.position).normalize();
          const targetAngle = Math.atan2(dir.x, dir.z);
          
          let diff = targetAngle - groupRef.current.rotation.y;
          // Normalize to [-PI, PI]
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          
          groupRef.current.rotation.y += diff * 0.12;
          
          // Physics: Lean into turns based on turn severity
          const leanAngle = -diff * 1.5; 
          groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, leanAngle, 0.15);

          // Physics: Wheel rotation based on distance traveled (r=0.25)
          wheelAnim.current += speed * 4; 
        } else {
          // We reached the active waypoint!
          if (currentWaypointIdx.current < path.length - 1) {
            currentWaypointIdx.current += 1;
          } else {
            // We arrived! Open full info card panel and wait indefinitely.
            useVillageStore.getState().setActiveBuilding(targetId);
            useVillageStore.getState().setTourPause(-1);
          }
        }
      }
    }

    const pos = groupRef.current.position;
    useVillageStore.getState().setCharacterPosition([pos.x, pos.y, pos.z]);
    useVillageStore.getState().setCharacterRotation(groupRef.current.rotation.y);

    const forwardVec = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), groupRef.current.rotation.y);
    const idealCam = pos.clone().add(new THREE.Vector3(0, 1.8, 0)).add(forwardVec.clone().multiplyScalar(-4.5));
    _state.camera.position.lerp(idealCam, 0.15);
    const lookAt = pos.clone().add(new THREE.Vector3(0, 0.5, 0)).add(forwardVec.clone().multiplyScalar(5));
    _state.camera.lookAt(lookAt);
  });

  if (!tourActive) return null;

  return (
    <group ref={groupRef} position={[0, 0.02, 32]}>
      {/* Frame (Main triangle) */}
      <mesh position={[0, 0.4, 0]} rotation={[0.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 5]} />
        <meshStandardMaterial color="#E74C3C" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Frame (Top tube) */}
      <mesh position={[0, 0.65, 0.1]} rotation={[1.57, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 5]} />
        <meshStandardMaterial color="#E74C3C" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Front Fork */}
      <mesh position={[0, 0.4, 0.45]} rotation={[-0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 5]} />
        <meshStandardMaterial color="#BDC3C7" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Handlebars */}
      <mesh position={[0, 0.7, 0.4]} rotation={[0, 0, 1.57]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 5]} />
        <meshStandardMaterial color="#34495E" metalness={0.3} roughness={0.8} />
      </mesh>
      {/* Seat Post */}
      <mesh position={[0, 0.55, -0.2]} rotation={[-0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 5]} />
        <meshStandardMaterial color="#BDC3C7" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Seat */}
      <mesh position={[0, 0.75, -0.25]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.2]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.9} />
      </mesh>

      {/* Front Wheel */}
      <group position={[0, 0.25, 0.5]}>
        <group rotation={[wheelAnim.current, 0, 0]}>
          <mesh castShadow rotation={[0, 1.5708, 0]}>
            <torusGeometry args={[0.25, 0.03, 16, 32]} />
            <meshStandardMaterial color="#2D3436" roughness={0.9} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
            <meshStandardMaterial color="#BDC3C7" metalness={0.8} />
          </mesh>
          <mesh rotation={[1.5708, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
            <meshStandardMaterial color="#BDC3C7" metalness={0.8} />
          </mesh>
          <mesh rotation={[0.7854, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
            <meshStandardMaterial color="#BDC3C7" metalness={0.8} />
          </mesh>
          <mesh rotation={[-0.7854, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
            <meshStandardMaterial color="#BDC3C7" metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Back Wheel */}
      <group position={[0, 0.25, -0.3]}>
        <group rotation={[wheelAnim.current, 0, 0]}>
          <mesh castShadow rotation={[0, 1.5708, 0]}>
            <torusGeometry args={[0.25, 0.03, 16, 32]} />
            <meshStandardMaterial color="#2D3436" roughness={0.9} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
            <meshStandardMaterial color="#BDC3C7" metalness={0.8} />
          </mesh>
          <mesh rotation={[1.5708, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
            <meshStandardMaterial color="#BDC3C7" metalness={0.8} />
          </mesh>
          <mesh rotation={[0.7854, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
            <meshStandardMaterial color="#BDC3C7" metalness={0.8} />
          </mesh>
          <mesh rotation={[-0.7854, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
            <meshStandardMaterial color="#BDC3C7" metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Rider Character */}
      <group position={[0, 0, 0]}>
        {/* Torso */}
        <mesh position={[0, 0.95, -0.2]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.25, 0.4, 0.15]} />
          <meshStandardMaterial color="#2980B9" roughness={0.8} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.25, -0.1]} castShadow>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color="#F5CBA7" roughness={0.6} />
        </mesh>
        {/* Right Arm */}
        <mesh position={[0.16, 0.9, 0]} rotation={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 0.4, 0.06]} />
          <meshStandardMaterial color="#F5CBA7" roughness={0.6} />
        </mesh>
        {/* Left Arm */}
        <mesh position={[-0.16, 0.9, 0]} rotation={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[0.06, 0.4, 0.06]} />
          <meshStandardMaterial color="#F5CBA7" roughness={0.6} />
        </mesh>
        {/* Right Leg */}
        <mesh position={[0.1, 0.55, -0.15]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 0.08]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.9} />
        </mesh>
        {/* Left Leg */}
        <mesh position={[-0.1, 0.55, -0.15]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 0.08]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
