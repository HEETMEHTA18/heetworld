"use client";

import React, { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Stars, SoftShadows, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, SSAO, DepthOfField } from "@react-three/postprocessing";
import { useVillageStore } from "@/store/villageStore";
import * as THREE from "three";
import Terrain from "./Terrain";
import Buildings from "../buildings/Buildings";
import Animals from "./Animals";
import Clouds from "./Clouds";
import Weather from "./Weather";
import SkyDome from "./SkyDome";
import Fireflies from "./Fireflies";
import Sparks from "./Sparks";
import NPCs from "./NPCs";
import WelcomeGuide from "./WelcomeGuide";
import { Text } from "@react-three/drei";
import { BUILDINGS } from "@/lib/world-constants";
import { keysRef as touchKeys } from "@/components/world-ui/TouchControls";
import VillageBoundary from "./VillageBoundary";
import Milestone from "./Milestone";
import Scooter from "./Scooter";
import GodRays from "./GodRays";
import WaterSurface from "./WaterSurface";
import LeafParticles from "./LeafParticles";
import SmokeChimney from "./SmokeChimney";
import DustMotes from "./DustMotes";
import PathGlow from "./PathGlow";
import AuroraEffect from "./AuroraEffect";
import WindowLights from "./WindowLights";
import Mountains from "./Mountains";
import Car from "./Car";

export default function VillageScene() {
  const { isLoading, timeOfDay, weather, autoDayNight, dayNightProgress } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.55);
  const isRain = weather === "rain";
  const isSnow = weather === "snow";

  const skyColor = useMemo(() => {
    if (isNight) return "#0A0E1A";
    if (isRain) return "#6A7A8A";
    if (isSnow) return "#A0B0C0";
    if (autoDayNight) {
      const p = dayNightProgress;
      if (p < 0.3) return "#87CEEB";
      if (p < 0.45) return "#D4A017";
      if (p < 0.55) return "#1A1A3A";
      return "#0A0E1A";
    }
    return "#87CEEB";
  }, [isNight, isRain, isSnow, autoDayNight, dayNightProgress]);

  const ambientIntensity = useMemo(() => {
    if (isRain) return 0.5;
    if (isSnow) return 0.6;
    if (autoDayNight) {
      const p = dayNightProgress;
      if (p < 0.35) return 0.7;
      if (p < 0.5) return 0.5;
      return 0.25;
    }
    return isNight ? 0.35 : 0.7;
  }, [isNight, isRain, isSnow, autoDayNight, dayNightProgress]);

  const dirIntensity = useMemo(() => {
    if (isRain || isSnow) return 0.7;
    if (autoDayNight) {
      const p = dayNightProgress;
      if (p < 0.35) return 1.3;
      if (p < 0.5) return 0.8;
      return 0.2;
    }
    return isNight ? 0.4 : 1.3;
  }, [isNight, isRain, isSnow, autoDayNight, dayNightProgress]);

  return (
    <div className="w-full h-screen absolute inset-0 bg-[#050505] touch-none">
      <Canvas
        camera={{ position: [0, 10, 85], fov: 55, near: 0.1, far: 150 }}
        shadows={{ enabled: true, type: THREE.PCFShadowMap }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, toneMapping: THREE.NoToneMapping, outputColorSpace: THREE.SRGBColorSpace, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[skyColor]} />
        <fog attach="fog" args={[skyColor, 40, 120]} />

        <Environment preset={isNight ? "night" : "sunset"} />
        {(isNight || (autoDayNight && dayNightProgress > 0.5)) && <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />}

        <ambientLight intensity={ambientIntensity} color={isNight || (autoDayNight && dayNightProgress > 0.5) ? "#6FA8DC" : "#FFF8E7"} />
        <directionalLight
          position={[-15, 25, 10]}
          intensity={dirIntensity}
          color={isNight || (autoDayNight && dayNightProgress > 0.5) ? "#6FA8DC" : "#FFE4A8"}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
          shadow-bias={-0.001}
        />
        <directionalLight position={[10, 10, -10]} intensity={0.3} color="#B0C4FF" />

        <InteractiveWorld />

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.4}
          scale={120}
          blur={2}
          far={4}
          color="#000000"
        />

        <EffectComposer>
          <Bloom luminanceThreshold={0.6} mipmapBlur intensity={0.6} radius={0.4} />
          <Vignette eskil={false} offset={0.3} darkness={0.3} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

const CHAR_RADIUS = 0.6;

function collidesWithBuilding(x: number, z: number): boolean {
  // Boundary limit
  if (x < -35 || x > 35 || z < -25 || z > 80) return true;

  for (const b of BUILDINGS) {
    const dx = x - b.position[0];
    const dz = z - b.position[2];
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < b.collisionRadius + CHAR_RADIUS) return true;
  }
  return false;
}

function resolveCollision(x: number, z: number): [number, number] {
  // Push back from boundaries
  if (x < -35) return [-35, z];
  if (x > 35) return [35, z];
  if (z < -25) return [x, -25];
  if (z > 80) return [x, 80];

  for (const b of BUILDINGS) {
    const dx = x - b.position[0];
    const dz = z - b.position[2];
    const dist = Math.sqrt(dx * dx + dz * dz);
    const minDist = b.collisionRadius + CHAR_RADIUS;
    if (dist < minDist && dist > 0.01) {
      const push = (minDist - dist) * 0.5;
      return [x + (dx / dist) * push, z + (dz / dist) * push];
    }
  }
  return [x, z];
}

function InteractiveWorld() {
  const { camera, gl } = useThree();
  const {
    selectedDestination,
    setSelectedDestination,
    groundDestination,
    setGroundDestination,
    activeBuilding,
    setActiveBuilding,
    isTraveling,
    setIsTraveling,
    introSequenceComplete,
    setIntroSequenceComplete,
    setNearbyBuilding,
    setCharacterPosition,
    setCharacterRotation,
    firstPerson,
    setFirstPerson,
    flying,
    setFlying,
    autoDayNight,
    setAutoDayNight,
    setDayNightProgress,
    dayNightProgress,
    interiorView,
    setInteriorView,
    weather,
    isLoading,
    tourActive,
  } = useVillageStore();

  const characterRef = useRef<THREE.Group>(null);
  const carRef = useRef<THREE.Group>(null);
  const cameraLookRef = useRef(new THREE.Vector3(0, 1, 0));
  const introProgress = useRef(0);

  const scrollTargetZ = useRef<number | null>(null);
  const keys = useRef({ w: false, a: false, s: false, d: false, q: false, e: false });
  const proximityCooldown = useRef(0);
  const flyHeight = useRef(0);
  const dayNightTimer = useRef(dayNightProgress);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useMemo(() => new THREE.Vector2(), []);
  const groundPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);

  const handleCanvasClick = useCallback((e: { clientX: number; clientY: number }) => {
    if (!introSequenceComplete || activeBuilding || interiorView || flying) return;
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersectPoint = new THREE.Vector3();
    const ray = raycaster.ray;
    const dist = ray.intersectPlane(groundPlane, intersectPoint);
    if (dist && intersectPoint) {
      const wx = intersectPoint.x;
      const wz = intersectPoint.z;
      if (wx >= -40 && wx <= 40 && wz >= -25 && wz <= 80) {
        let nearBuilding = false;
        for (const b of BUILDINGS) {
          const dx = wx - b.position[0];
          const dz = wz - b.position[2];
          if (Math.sqrt(dx * dx + dz * dz) < b.collisionRadius + 1) {
            nearBuilding = true;
            break;
          }
        }
        if (!nearBuilding) {
          setGroundDestination([wx, 0, wz]);
        }
      }
    }
  }, [camera, introSequenceComplete, activeBuilding, interiorView, flying, raycaster, mouse, groundPlane, setGroundDestination]);

  React.useEffect(() => {
    gl.domElement.addEventListener("click", handleCanvasClick);
    return () => gl.domElement.removeEventListener("click", handleCanvasClick);
  }, [gl, handleCanvasClick]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!introSequenceComplete) return;
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      const key = e.key.toLowerCase();
      if (key === "w" || key === "arrowup") keys.current.w = true;
      if (key === "a" || key === "arrowleft") keys.current.a = true;
      if (key === "s" || key === "arrowdown") keys.current.s = true;
      if (key === "d" || key === "arrowright") keys.current.d = true;
      if (key === "q" || key === " ") {
        keys.current.q = true;
        if (introSequenceComplete) setFlying(!flying);
      }
      if (key === "e") keys.current.e = true;
      if (key === "f" && introSequenceComplete) setFirstPerson(!firstPerson);
      if (key === "n" && introSequenceComplete) setAutoDayNight(!autoDayNight);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      const key = e.key.toLowerCase();
      if (key === "w" || key === "arrowup") keys.current.w = false;
      if (key === "a" || key === "arrowleft") keys.current.a = false;
      if (key === "s" || key === "arrowdown") keys.current.s = false;
      if (key === "d" || key === "arrowright") keys.current.d = false;
      if (key === "q" || key === " ") keys.current.q = false;
      if (key === "e") keys.current.e = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [introSequenceComplete, setFirstPerson, firstPerson, setFlying, flying, setAutoDayNight, autoDayNight]);

  useFrame((state, delta) => {
    // Dynamic Fog Animation
    if (state.scene.fog && state.scene.fog instanceof THREE.Fog) {
      if (!introSequenceComplete) {
        const p = Math.min(introProgress.current, 1);
        const fogP = Math.min(p / 0.8, 1); // Clears up around 80% of the journey (near the milestone)
        state.scene.fog.near = THREE.MathUtils.lerp(5, 40, fogP);
        state.scene.fog.far = THREE.MathUtils.lerp(80, 120, fogP);
      } else {
        state.scene.fog.near = 40;
        state.scene.fog.far = 120;
      }
    }

    if (isLoading) {
      if (characterRef.current) {
        characterRef.current.position.set(0, 0, 200);
        // Ensure character faces forward properly
        characterRef.current.rotation.set(0, 0, 0); 
      }
      if (carRef.current) {
        carRef.current.position.set(0, 0, 200);
      }
      
      // POV rigidly locked in the driver's seat from the very first frame
      const carPos = new THREE.Vector3(0, 0, 200);
      const idealCam = carPos.clone().add(new THREE.Vector3(-0.4, 1.05, 0.15));
      camera.position.copy(idealCam);
      
      const lookTarget = carPos.clone().add(new THREE.Vector3(-0.4, 0.95, -15));
      cameraLookRef.current.copy(lookTarget);
      camera.lookAt(lookTarget);
      return;
    }

    if (!introSequenceComplete) {
      introProgress.current += delta * 0.06; // ~16 seconds total intro for a slower, cinematic pace
      const p = introProgress.current;
      
      // Timeline:
      // 0.0 - 0.4: Drive to milestone
      // 0.4 - 0.5: Pause and look at milestone
      // 0.5 - 1.0: Exit car, walk slowly to town gate

      const driveProgress = Math.min(p / 0.4, 1);
      const pauseProgress = Math.max(0, Math.min((p - 0.4) / 0.1, 1));
      const walkProgress = Math.max(0, Math.min((p - 0.5) / 0.5, 1));
      
      // Car stops at 75, Character walks to 37.5
      const zPos = driveProgress < 1 
        ? THREE.MathUtils.lerp(130, 75, driveProgress)
        : THREE.MathUtils.lerp(75, 37.5, walkProgress);

      if (carRef.current) {
        carRef.current.position.set(0, 0, driveProgress < 1 ? zPos : 75);
        carRef.current.position.y = driveProgress < 1 ? Math.abs(Math.sin(driveProgress * 200)) * 0.05 : 0;
      }

      if (characterRef.current) {
        characterRef.current.position.set(0, 0, zPos);
        characterRef.current.rotation.set(0, Math.PI, 0);
        characterRef.current.visible = p >= 0.5; // Hidden while driving or pausing in car
        
        if (walkProgress > 0 && walkProgress < 1) {
          // Slow walking bounce
          characterRef.current.position.y = Math.abs(Math.sin(walkProgress * 200)) * 0.06;
        } else {
          characterRef.current.position.y = 0;
        }
      }

      if (p < 0.5) {
        // Phase 1 & 2: Inside the car
        const carPos = new THREE.Vector3(0, 0, driveProgress < 1 ? zPos : 75);
        const idealCam = carPos.clone().add(new THREE.Vector3(-0.4, 1.05, 0.15));
        camera.position.copy(idealCam); // Strictly locked
        
        let lookTarget: THREE.Vector3;
        if (p < 0.4) {
          // Looking forward down the road
          lookTarget = carPos.clone().add(new THREE.Vector3(-0.4, 0.95, -15));
        } else {
          // Phase 2: Pan camera to look at the milestone (which is at X=2.5, Z=65)
          const forwardLook = carPos.clone().add(new THREE.Vector3(-0.4, 0.95, -15));
          const milestoneLook = new THREE.Vector3(2.5, 1.5, 64);
          // Ease in-out interpolation for smooth turning
          const ease = 0.5 - Math.cos(pauseProgress * Math.PI) / 2;
          lookTarget = forwardLook.lerp(milestoneLook, ease);
        }
        
        cameraLookRef.current.copy(lookTarget);
        camera.lookAt(cameraLookRef.current);
      } else if (walkProgress < 1) {
        // Phase 3: Following character walking slowly from 75 to 37.5
        const charPos = new THREE.Vector3(0, 0, zPos);
        const forwardVec = new THREE.Vector3(0, 0, -1);
        const idealCam = charPos.clone().add(new THREE.Vector3(0, 2.0, 4)); // Closer, intimate over-the-shoulder feel
        camera.position.lerp(idealCam, 0.05); // Smooth lerp for exiting car
        
        const lookTarget = charPos.clone().add(new THREE.Vector3(0, 1.2, -5));
        cameraLookRef.current.lerp(lookTarget, 0.1);
        camera.lookAt(cameraLookRef.current);
      } else {
        // Phase 3: Stopped at 37.5, Welcome Message
        if (!characterRef.current?.userData.welcomeStarted) {
          if (characterRef.current) {
             characterRef.current.userData.welcomeStarted = Date.now();
             useVillageStore.getState().setWelcomeMessageActive(true);
          }
        }
        
        const welcomeElapsed = (Date.now() - characterRef.current!.userData.welcomeStarted) / 1000;
        
        // Slowly zoom out / pan camera during welcome
        const charPos = new THREE.Vector3(0, 0, 37.5);
        const forwardVec = new THREE.Vector3(0, 0, -1);
        const exitCam = charPos.clone().add(new THREE.Vector3(0, 2, 0)).add(forwardVec.clone().multiplyScalar(-4));
        camera.position.lerp(exitCam, 0.05);
        
        if (welcomeElapsed > 3.5) {
          const store = useVillageStore.getState();
          store.setWelcomeMessageActive(false);
          setIntroSequenceComplete(true);
          if (characterRef.current) {
            scrollTargetZ.current = characterRef.current.position.z;
          }
          setCharacterPosition([0, 0, 37.5]);
          setCharacterRotation(Math.PI);

          const isTouch = window.matchMedia("(pointer: coarse)").matches;
          if (isTouch) {
            store.setTourIndex(0);
            store.setTourPause(0);
            store.setTourActive(true);
            store.setActiveBuilding(null);
          }
        }
      }
      return;
    }

    // Auto day/night cycle
    if (autoDayNight) {
      dayNightTimer.current += delta * 0.008;
      if (dayNightTimer.current > 1) dayNightTimer.current -= 1;
      setDayNightProgress(dayNightTimer.current);
    }

    if (tourActive) {
      // In tour mode, Scooter handles camera and character position tracking
      return;
    }

    if (characterRef.current) {
      const tk = touchKeys.current;
      const k = keys.current;
      if (tk.w) k.w = true;
      if (tk.a) k.a = true;
      if (tk.s) k.s = true;
      if (tk.d) k.d = true;
      const isKeyboardMoving = k.w || k.a || k.s || k.d || flying;

      if (flying) {
        setGroundDestination(null);
        if (selectedDestination) setSelectedDestination(null);
        if (activeBuilding) setActiveBuilding(null);
        scrollTargetZ.current = null;

        const flySpeed = 15 * delta;
        const turnSpeed = 3 * delta;

        if (k.a) characterRef.current.rotation.y += turnSpeed;
        if (k.d) characterRef.current.rotation.y -= turnSpeed;

        const forwardVec = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), characterRef.current.rotation.y);
        let moveAmount = 0;
        if (k.w) moveAmount = 1;
        if (k.s) moveAmount = -1;

        if (k.q) flyHeight.current += delta * 5;
        if (k.e) flyHeight.current -= delta * 5;
        flyHeight.current = Math.max(2, Math.min(30, flyHeight.current));

        if (moveAmount !== 0) {
          characterRef.current.position.x += forwardVec.x * moveAmount * flySpeed;
          characterRef.current.position.z += forwardVec.z * moveAmount * flySpeed;
        }

        characterRef.current.position.z = Math.max(-25, Math.min(85, characterRef.current.position.z));
        characterRef.current.position.x = Math.max(-45, Math.min(45, characterRef.current.position.x));
        characterRef.current.position.y = flyHeight.current;

        characterRef.current.rotation.z = moveAmount !== 0 ? Math.sin(Date.now() * 0.008) * 0.05 : 0;

        const charPos = characterRef.current.position;
        if (firstPerson) {
          const fpPos = charPos.clone().add(forwardVec.clone().multiplyScalar(0.3));
          fpPos.y += 0.6;
          camera.position.lerp(fpPos, 0.15);
          const lookAt = charPos.clone().add(forwardVec.clone().multiplyScalar(20));
          cameraLookRef.current.lerp(lookAt, 0.2);
          camera.lookAt(cameraLookRef.current);
        } else {
          const idealCam = charPos.clone().add(new THREE.Vector3(0, 2, 0)).add(forwardVec.clone().multiplyScalar(-2));
          camera.position.lerp(idealCam, 0.15);
          const lookAt = charPos.clone();
          cameraLookRef.current.lerp(lookAt, 0.15);
          camera.lookAt(cameraLookRef.current);
        }

        if (moveAmount !== 0) setIsTraveling(true);
        else setIsTraveling(false);

        setCharacterPosition([charPos.x, charPos.y, charPos.z]);
        setCharacterRotation(characterRef.current.rotation.y);
        return;
      }

      // Ground movement
      if (isKeyboardMoving && !k.q) {
        if (selectedDestination) setSelectedDestination(null);
        if (groundDestination) setGroundDestination(null);
        if (activeBuilding) setActiveBuilding(null);
        scrollTargetZ.current = null;

        const moveSpeed = 12 * delta;
        const turnSpeed = 2.5 * delta;

        if (k.a) characterRef.current.rotation.y += turnSpeed;
        if (k.d) characterRef.current.rotation.y -= turnSpeed;

        const forwardVec = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), characterRef.current.rotation.y);
        let moveAmount = 0;
        if (k.w) moveAmount = 1;
        if (k.s) moveAmount = -1;

        if (moveAmount !== 0) {
          const newX = characterRef.current.position.x + forwardVec.x * moveAmount * moveSpeed;
          const newZ = characterRef.current.position.z + forwardVec.z * moveAmount * moveSpeed;
          if (!collidesWithBuilding(newX, newZ)) {
            characterRef.current.position.x = newX;
            characterRef.current.position.z = newZ;
          } else {
            const [rx, rz] = resolveCollision(newX, newZ);
            if (!collidesWithBuilding(rx, rz)) {
              characterRef.current.position.x = rx;
              characterRef.current.position.z = rz;
            }
          }
        }

        characterRef.current.position.z = Math.max(-25, Math.min(80, characterRef.current.position.z));
        characterRef.current.position.x = Math.max(-40, Math.min(40, characterRef.current.position.x));

        if (moveAmount !== 0) {
          if (!isTraveling) setIsTraveling(true);
          characterRef.current.position.y = Math.abs(Math.sin(Date.now() * 0.015)) * 0.08;
        } else {
          if (isTraveling) setIsTraveling(false);
          characterRef.current.position.y = 0;
        }
      } else {
        let targetPos: THREE.Vector3 | null = null;

        if (groundDestination) {
          targetPos = new THREE.Vector3(groundDestination[0], 0, groundDestination[2]);
        } else if (selectedDestination) {
          const destConfig = BUILDINGS.find((b) => b.id === selectedDestination);
          if (destConfig) {
            targetPos = new THREE.Vector3(destConfig.position[0], 0, destConfig.position[2] + destConfig.collisionRadius + 1.5);
            scrollTargetZ.current = null;
          }
        } else if (scrollTargetZ.current !== null) {
          targetPos = new THREE.Vector3(characterRef.current.position.x, 0, scrollTargetZ.current);
        }

          if (targetPos) {
            const dist = characterRef.current.position.distanceTo(targetPos);
            if (dist > 0.3) {
              if (!isTraveling) setIsTraveling(true);
              const nextPos = characterRef.current.position.clone().lerp(targetPos, 0.06);
              if (!collidesWithBuilding(nextPos.x, nextPos.z)) {
                characterRef.current.position.copy(nextPos);
              } else {
                const [rx, rz] = resolveCollision(nextPos.x, nextPos.z);
                if (!collidesWithBuilding(rx, rz)) {
                  characterRef.current.position.set(rx, 0, rz);
                }
              }

              const dir = targetPos.clone().sub(characterRef.current.position).normalize();
              if (dir.lengthSq() > 0.001) {
                const angle = Math.atan2(dir.x, dir.z);
                characterRef.current.rotation.y = THREE.MathUtils.lerp(characterRef.current.rotation.y, angle, 0.15);
              }
              characterRef.current.position.y = Math.abs(Math.sin(Date.now() * 0.015)) * 0.08;
            } else {
              setIsTraveling(false);
              if (selectedDestination) {
                setActiveBuilding(selectedDestination);
                setSelectedDestination(null);
                scrollTargetZ.current = characterRef.current.position.z;
              }
              if (groundDestination) {
                setGroundDestination(null);
                scrollTargetZ.current = characterRef.current.position.z;
              }
              characterRef.current.position.y = 0;
            }
          } else {
          if (isTraveling) {
            setIsTraveling(false);
            characterRef.current.position.y = 0;
          }
        }
      }

      const charPos = characterRef.current.position;
      const forwardVec = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), characterRef.current.rotation.y);

      if (firstPerson) {
        const fpPos = charPos.clone().add(new THREE.Vector3(0, 0.8, 0));
        camera.position.lerp(fpPos, 0.15);
        const lookAt = fpPos.clone().add(forwardVec.clone().multiplyScalar(15));
        cameraLookRef.current.lerp(lookAt, 0.2);
        camera.lookAt(cameraLookRef.current);
      } else {
        const idealCam = charPos.clone().add(new THREE.Vector3(0, 1.4, 0)).add(forwardVec.clone().multiplyScalar(0.3));
        camera.position.lerp(idealCam, 0.15);
        const lookAt = idealCam.clone().add(forwardVec.clone().multiplyScalar(5));
        cameraLookRef.current.lerp(lookAt, 0.15);
        camera.lookAt(cameraLookRef.current);
      }

      proximityCooldown.current += delta;
      if (proximityCooldown.current > 0.3) {
        proximityCooldown.current = 0;
        let closest: string | null = null;
        let closestDist = Infinity;
        for (const b of BUILDINGS) {
          const dx = charPos.x - b.position[0];
          const dz = charPos.z - b.position[2];
          const dist = Math.sqrt(dx * dx + dz * dz);
          const threshold = b.collisionRadius + CHAR_RADIUS + 0.5;
          if (dist < threshold && dist < closestDist) {
            closest = b.id;
            closestDist = dist;
          }
        }
        setNearbyBuilding(closest);
      }

      if (charPos.y < -10) {
        characterRef.current.position.set(0, 0, 15);
        flyHeight.current = 0;
      }

      setCharacterPosition([charPos.x, charPos.y, charPos.z]);
      setCharacterRotation(characterRef.current.rotation.y);
    }
  });

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (introSequenceComplete && !activeBuilding && !flying) {
        if (scrollTargetZ.current === null && characterRef.current) {
          scrollTargetZ.current = characterRef.current.position.z;
        }
        if (scrollTargetZ.current !== null) {
          const moveAmt = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * 0.03, 2);
          scrollTargetZ.current = Math.max(-25, Math.min(80, scrollTargetZ.current + moveAmt));
          if (selectedDestination) setSelectedDestination(null);
          if (groundDestination) setGroundDestination(null);
        }
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [introSequenceComplete, activeBuilding, selectedDestination, setSelectedDestination, groundDestination, setGroundDestination, flying]);

  const showCharacter = !firstPerson && !interiorView && !tourActive;

  return (
    <>
      <SkyDome />
      <Terrain />
      <Buildings />
      <Animals />
      <Clouds />
      <Weather />
      <Fireflies />
      <Sparks />
      <NPCs />
      <WelcomeGuide />
      <VillageBoundary />
      <Milestone />
      <Scooter />

      {/* === Enhanced 3D Village Effects === */}
      <GodRays />
      <WaterSurface />
      <LeafParticles />
      <SmokeChimney />
      <DustMotes />
      <PathGlow />
      <AuroraEffect />
      <WindowLights />
      <Mountains />

      {/* Render Car (Parked after intro) */}
      {showCharacter && (
        <group ref={carRef} position={[0, 0, 200]}>
          <Car isDriving={!introSequenceComplete} position={[0, 0, 0]} />
        </group>
      )}

      {/* Render Character */}
      {showCharacter && (
        <group ref={characterRef} position={[0, 0, 37.5]}>
          {flying ? <FlyingPerson isMoving={isTraveling} /> : <WalkingPerson isWalking={isTraveling || (!introSequenceComplete && introProgress.current >= 0.5 && introProgress.current < 1)} />}
          
          {/* Floating Thoughts during the intro walk */}
          {!introSequenceComplete && introProgress.current >= 0.5 && introProgress.current < 1 && (
            <group position={[0, 2.5, 0]}>
              <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[1.6, 0.4]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
              </mesh>
              <Text fontSize={0.12} color="#2D3436" anchorX="center" anchorY="middle">
                {introProgress.current < 0.65 ? "Where am I...?" : 
                 introProgress.current < 0.85 ? "Portfolio entrance..." : 
                 "Heet's Portfolio — welcome!"}
              </Text>
            </group>
          )}
        </group>
      )}

      {!showCharacter && characterRef.current && (
        <group ref={characterRef} position={[0, -100, 0]} />
      )}
    </>
  );
}

function WalkingPerson({ isWalking }: { isWalking: boolean }) {
  const legRef1 = useRef<THREE.Mesh>(null);
  const legRef2 = useRef<THREE.Mesh>(null);
  const armRef1 = useRef<THREE.Mesh>(null);
  const armRef2 = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

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

  useFrame(() => {
    if (isWalking) {
      const t = Date.now() * 0.01;
      if (legRef1.current) legRef1.current.rotation.x = Math.sin(t) * 0.5;
      if (legRef2.current) legRef2.current.rotation.x = Math.sin(t + Math.PI) * 0.5;
      if (armRef1.current) armRef1.current.rotation.x = Math.sin(t + Math.PI) * 0.5;
      if (armRef2.current) armRef2.current.rotation.x = Math.sin(t) * 0.5;
    } else {
      if (legRef1.current) legRef1.current.rotation.x = 0;
      if (legRef2.current) legRef2.current.rotation.x = 0;
      if (armRef1.current) armRef1.current.rotation.x = 0;
      if (armRef2.current) armRef2.current.rotation.x = 0;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.8, 0]} scale={0.5}>
      <mesh ref={legRef1} position={[-0.2, -0.6, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#2D3436" />
      </mesh>
      <mesh ref={legRef2} position={[0.2, -0.6, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#2D3436" />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.6, 1.0, 0.3]} />
        <meshStandardMaterial color="#D4A017" />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FFDAB9" />
      </mesh>
      <mesh ref={armRef1} position={[-0.4, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#D4A017" />
      </mesh>
      <mesh ref={armRef2} position={[0.4, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#D4A017" />
      </mesh>
    </group>
  );
}

function FlyingPerson({ isMoving }: { isMoving: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  React.useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
        }
      });
    }
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.6}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, isMoving ? Math.sin(Date.now() * 0.008) * 0.05 : 0]}>
        <boxGeometry args={[1.2, 0.15, 0.8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.15, 0.3]}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="#D4A017" />
      </mesh>
      <mesh position={[0.7, 0, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.4]} />
        <meshStandardMaterial color="#666" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[-0.7, 0, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.4]} />
        <meshStandardMaterial color="#666" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  );
}
