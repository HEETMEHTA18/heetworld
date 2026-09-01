"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useVillageStore } from "@/store/villageStore";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";

interface NPCConfig {
  startPos: [number, number, number];
  path: [number, number][];
  bodyColor: string;
  hatColor: string;
  name: string;
  role: string;
  scale: number;
  speed: number;
  pauseMin: number;
  pauseMax: number;
  isNightActive: boolean;
  dialogue: string[];
  activity: "walk" | "sit_bench" | "stand_greet" | "work" | "follow_player";
  activityPos?: [number, number];
}

const NPCS: NPCConfig[] = [
  {
    startPos: [-4, 0, 25],
    path: [[-4, 25], [0, 28], [4, 25], [0, 22]],
    bodyColor: "#8B6F47",
    hatColor: "#5C4033",
    name: "Old Marcus",
    role: "Village Elder",
    scale: 0.95,
    speed: 0.4,
    pauseMin: 3,
    pauseMax: 5,
    isNightActive: true,
    dialogue: [
      "Ah, a visitor! Heet crafted this portfolio himself.",
      "I've seen many developers, but Heet's approach stands out.",
      "The Archive holds deep dives on AI and engineering.",
      "Back in my day, we compiled with punch cards!",
      "Heet's been building since he was knee-high to a debugger.",
    ],
    activity: "walk",
  },
  {
    startPos: [-18, 0, -4],
    path: [[-18, -4], [-20, -6], [-18, -8], [-16, -6]],
    bodyColor: "#C0392B",
    hatColor: "#2C3E50",
    name: "Forna",
    role: "Blacksmith",
    scale: 1.1,
    speed: 0.3,
    pauseMin: 4,
    pauseMax: 8,
    isNightActive: false,
    dialogue: [
      "*clang* *clang* Building AutoDevs took fire and steel!",
      "40+ project templates forged right here.",
      "Need a CLI tool? I'll hammer one out for ya.",
      "This forge never sleeps... but I do, eventually.",
      "The BinaryBattles arena? I forged its judging sandbox!",
    ],
    activity: "work",
    activityPos: [-18, -6],
  },
  {
    startPos: [18, 0, -4],
    path: [[18, -4], [20, -6], [18, -8], [16, -6]],
    bodyColor: "#2C3E6B",
    hatColor: "#1A1A3A",
    name: "Professor Veda",
    role: "Scholar",
    scale: 0.9,
    speed: 0.35,
    pauseMin: 5,
    pauseMax: 10,
    isNightActive: false,
    dialogue: [
      "DevMentor converts speech to PRs. Quite brilliant!",
      "The Ralph Loop retry architecture is elegant.",
      "I've been studying Heet's agentic workflows.",
      "Voice-to-code... the future is conversational.",
      "His attention to token efficiency is admirable.",
    ],
    activity: "walk",
  },
  {
    startPos: [22, 0, 10],
    path: [[22, 10], [25, 10], [25, 8], [22, 8]],
    bodyColor: "#8B5CF6",
    hatColor: "#5B2C9E",
    name: "Silas",
    role: "Librarian",
    scale: 0.95,
    speed: 0.25,
    pauseMin: 6,
    pauseMax: 12,
    isNightActive: false,
    dialogue: [
      "Shh... the Archive holds knowledge on CNNs and LLMs.",
      "Heet's writings on ML pipelines are quite popular.",
      "The featured scroll on DevMentor has been checked out twice!",
      "Have you read about the Coastal Guardian CNN? Fascinating.",
      "Knowledge is the only treasure that grows when shared.",
    ],
    activity: "walk",
  },
  {
    startPos: [0, 0, 4],
    path: [[0, 4], [-3, 4], [-3, 6], [0, 6]],
    bodyColor: "#E67E22",
    hatColor: "#D4A017",
    name: "Tara & Kavi",
    role: "Children",
    scale: 0.6,
    speed: 1.2,
    pauseMin: 1,
    pauseMax: 2,
    isNightActive: false,
    dialogue: [
      "Wow! You're the visitor everyone's talking about!",
      "Can you teach us to code like Heet?",
      "I saw the flying person! That's so cool!",
      "Heet built a whole 3D portfolio — in a BROWSER!",
      "Race you to the well!",
      "Have you seen the sheep? They're fluffy!",
    ],
    activity: "walk",
  },
  {
    startPos: [10, 0, 22],
    path: [[10, 22], [10, 26], [5, 26], [5, 22]],
    bodyColor: "#D4A017",
    hatColor: "#8B6914",
    name: "Baker Heston",
    role: "Baker",
    scale: 1.05,
    speed: 0.5,
    pauseMin: 2,
    pauseMax: 4,
    isNightActive: false,
    dialogue: [
      "Fresh bread! Well, if I had an oven here...",
      "I hear Heet's code compiles as clean as my dough.",
      "The best ideas come while kneading. Trust me.",
      "That scholar works up an appetite!",
      "No AI can bake a sourdough. Yet.",
    ],
    activity: "walk",
  },
  {
    startPos: [-16, 0, 17],
    path: [[-16, 17], [-16, 18], [-15, 18], [-15, 17]],
    bodyColor: "#4A7C59",
    hatColor: "#2D5A3A",
    name: "Maya",
    role: "Farmer",
    scale: 0.95,
    speed: 0.3,
    pauseMin: 5,
    pauseMax: 8,
    isNightActive: false,
    dialogue: [
      "These crops won't water themselves!",
      "Heet's attention to detail is the envy of every builder.",
      "Growing code and growing food... same patience needed.",
      "Have you seen the flowers near the square? Lovely.",
      "The seasons change, but good code endures.",
    ],
    activity: "work",
    activityPos: [-16, 17],
  },
  {
    startPos: [-3, 0, 4],
    path: [[-3, 4], [3, 4]],
    bodyColor: "#E8D5B7",
    hatColor: "#8B4513",
    name: "Lyra",
    role: "Musician",
    scale: 1.0,
    speed: 0.0,
    pauseMin: 0,
    pauseMax: 0,
    isNightActive: false,
    dialogue: [
      "I composed a tune about BinaryBattles. Wanna hear it?",
      "The rhythm of code is like music... elegant loops.",
      "Heet's CI/CD pipeline has a nice beat!",
      " *hums a melody* This one's called 'The AutoDev Waltz'.",
      "Music and programming — both about patterns.",
    ],
    activity: "stand_greet",
    activityPos: [0, 4],
  },
  {
    startPos: [-10, 0, 16],
    path: [[-10, 16], [-14, 16], [-14, 18], [-10, 18]],
    bodyColor: "#6C5B7B",
    hatColor: "#3D2B4A",
    name: "Elder Nora",
    role: "Storyteller",
    scale: 0.85,
    speed: 0.2,
    pauseMin: 4,
    pauseMax: 6,
    isNightActive: true,
    dialogue: [
      "Gather 'round, young one. Let me tell you of the Great Refactor...",
      "I remember when this portfolio was just a 'Hello World'.",
      "Heet's journey began with a single variable.",
      "Every expert was once a beginner who never gave up.",
      "The best code is the code that brings people together.",
    ],
    activity: "walk",
  },
  {
    startPos: [0, 0, 32],
    path: [[0, 32], [0, 33], [1, 33], [1, 32]],
    bodyColor: "#5A6B7C",
    hatColor: "#2C3E50",
    name: "Guard Aldric",
    role: "Gatekeeper",
    scale: 1.15,
    speed: 0.0,
    pauseMin: 0,
    pauseMax: 0,
    isNightActive: true,
    dialogue: [
      "Halt! ...Oh, it's you. Welcome to Heet's Portfolio.",
      "I keep watch over this place day and night.",
      "Seen any bugs? I squash 'em at the gate.",
      "The milestone says 0 KM. This is the center of everything.",
      "Night's the quietest. Code runs clean after dark.",
    ],
    activity: "stand_greet",
    activityPos: [0, 32],
  },
];

function getActivityPosition(config: NPCConfig): [number, number] {
  if (config.activityPos) return [config.activityPos[0], config.activityPos[1]];
  return [config.startPos[0], config.startPos[2]];
}

export default function NPCs() {
  const { timeOfDay, autoDayNight, dayNightProgress } = useVillageStore();
  const isNight = timeOfDay === "night" || (autoDayNight && dayNightProgress > 0.55);

  return (
    <group>
      {NPCS.map((npc, i) => {
        if (isNight && !npc.isNightActive) return null;
        return <NPC key={i} config={npc} index={i} />;
      })}
    </group>
  );
}

function NPC({ config, index }: { config: NPCConfig; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const sitRef = useRef<boolean>(false);
  const state = useRef({
    pathIndex: 0,
    timer: 0,
    dir: 1,
    pauseTimer: config.pauseMin + Math.random() * (config.pauseMax - config.pauseMin),
    armWave: 0,
    workPhase: 0,
  });

  const { characterPosition } = useVillageStore();
  const [currentDialogue, setCurrentDialogue] = React.useState("");

  const dialogues = useMemo(() => config.dialogue, [config.dialogue]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    const s = state.current;

    const dx = characterPosition[0] - groupRef.current.position.x;
    const dz = characterPosition[2] - groupRef.current.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist < 4.0) {
      s.armWave += delta * 5;
      if (!currentDialogue && Math.random() < 0.02) {
        const idx = Math.floor(Math.random() * dialogues.length);
        setCurrentDialogue(dialogues[idx]);
      }
    } else {
      s.armWave = Math.max(0, s.armWave - delta * 2);
      if (dist > 5.5 && currentDialogue) {
        const elapsed = Date.now();
        if (!groupRef.current.userData.dialogueTimer) groupRef.current.userData.dialogueTimer = elapsed;
        if (elapsed - groupRef.current.userData.dialogueTimer > 3000) {
          setCurrentDialogue("");
          groupRef.current.userData.dialogueTimer = 0;
        }
      } else {
        if (groupRef.current.userData) groupRef.current.userData.dialogueTimer = 0;
      }
    }

    if (config.activity === "sit_bench") {
      if (!sitRef.current) {
        const bp = getActivityPosition(config);
        groupRef.current.position.x = bp[0];
        groupRef.current.position.z = bp[1];
        sitRef.current = true;
      }
      groupRef.current.position.y = Math.abs(Math.sin(Date.now() * 0.002)) * 0.01;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.02);
      return;
    }

    if (config.activity === "stand_greet") {
      const bp = getActivityPosition(config);
      groupRef.current.position.x = bp[0];
      groupRef.current.position.z = bp[1];
      groupRef.current.position.y = Math.abs(Math.sin(Date.now() * 0.003)) * 0.02;
      const lookAngle = Math.atan2(dx, dz);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, lookAngle, 0.03);
      return;
    }

    if (config.activity === "work") {
      s.workPhase += delta;
      const bp = getActivityPosition(config);
      groupRef.current.position.x = bp[0];
      groupRef.current.position.z = bp[1];
      groupRef.current.position.y = Math.abs(Math.sin(s.workPhase * 4)) * 0.04;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, Math.PI * 0.25, 0.02);
      return;
    }

    if (config.activity === "follow_player" && dist < 8 && dist > 2) {
      const followSpeed = config.speed * 1.5 * delta;
      const fdx = characterPosition[0] - groupRef.current.position.x;
      const fdz = characterPosition[2] - groupRef.current.position.z;
      const fd = Math.sqrt(fdx * fdx + fdz * fdz);
      if (fd > 2) {
        groupRef.current.position.x += (fdx / fd) * followSpeed;
        groupRef.current.position.z += (fdz / fd) * followSpeed;
      }
      const fAngle = Math.atan2(fdx, fdz);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, fAngle, 0.1);
      groupRef.current.position.y = Math.abs(Math.sin(Date.now() * 0.01)) * 0.03;
      return;
    }

    s.pauseTimer -= delta;
    if (s.pauseTimer > 0) {
      groupRef.current.position.y = Math.abs(Math.sin(Date.now() * 0.003)) * 0.015;
      return;
    }

    const target = config.path[s.pathIndex];
    const cx = groupRef.current.position.x;
    const cz = groupRef.current.position.z;
    const pdx = target[0] - cx;
    const pdz = target[1] - cz;
    const d = Math.sqrt(pdx * pdx + pdz * pdz);

    if (d > 0.3) {
      const speed = config.speed * delta;
      groupRef.current.position.x += (pdx / d) * speed;
      groupRef.current.position.z += (pdz / d) * speed;
      const angle = Math.atan2(pdx, pdz);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, angle, 0.1);
      groupRef.current.position.y = Math.abs(Math.sin(Date.now() * 0.008 * config.speed)) * 0.035 * (config.scale / 1.0);
    } else {
      groupRef.current.position.y = 0;
      s.pathIndex = (s.pathIndex + s.dir) % config.path.length;
      if (s.pathIndex === 0) s.dir = 1;
      if (s.pathIndex === config.path.length - 1) s.dir = -1;
      s.pauseTimer = config.pauseMin + Math.random() * (config.pauseMax - config.pauseMin);
    }
  });

  return (
    <group ref={groupRef} position={config.startPos}>
      <HumanBody color={config.bodyColor} hatColor={config.hatColor} armWave={state.current.armWave} scale={config.scale} role={config.role} />
      {currentDialogue && (
        <Billboard position={[0, 1.5 * config.scale + 0.3, 0]}>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.0, 0.5]} />
            <meshBasicMaterial color="#0A0E1A" transparent opacity={0.92} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0, -0.015]}>
            <planeGeometry args={[2.04, 0.54]} />
            <meshBasicMaterial color={config.bodyColor} transparent opacity={0.6} depthWrite={false} />
          </mesh>
          <Text
            position={[0, 0.12, 0.01]}
            fontSize={0.09}
            color={"#F2E6C9"}
            maxWidth={1.8}
            textAlign="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {config.name}
          </Text>
          <Text
            position={[0, -0.08, 0.01]}
            fontSize={0.065}
            color="#FFFFFF"
            maxWidth={1.8}
            textAlign="center"
            anchorY="middle"
          >
            {currentDialogue}
          </Text>
        </Billboard>
      )}
    </group>
  );
}

function HumanBody({ color, hatColor, armWave, scale, role }: { color: string; hatColor: string; armWave: number; scale: number; role: string }) {
  const armRef1 = useRef<THREE.Mesh>(null);
  const armRef2 = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (armRef1.current) armRef1.current.rotation.x = Math.sin(armWave * 2) * 0.35;
    if (armRef2.current) armRef2.current.rotation.x = Math.sin(armWave * 2 + 1.2) * 0.35;
  });

  const isChild = scale < 0.7;
  const isTall = scale > 1.05;
  const bodyH = isChild ? 0.5 : isTall ? 0.9 : 0.7;
  const bodyY = isChild ? 0.1 : isTall ? 0.18 : 0.15;
  const headY = isChild ? 0.55 : isTall ? 0.95 : 0.75;
  const headR = isChild ? 0.14 : isTall ? 0.22 : 0.18;

  return (
    <group position={[0, 0.6 * scale, 0]} scale={scale}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, bodyY, 0]}>
        <boxGeometry args={[0.35, bodyH, 0.2]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Arms */}
      <mesh ref={armRef1} position={[-0.28, bodyY + 0.05, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh ref={armRef2} position={[0.28, bodyY + 0.05, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, headY, 0]}>
        <sphereGeometry args={[headR, 10, 10]} />
        <meshStandardMaterial color="#FFDAB9" roughness={0.7} />
      </mesh>
      {/* Hat */}
      {role === "Village Elder" || role === "Storyteller" ? (
        <group position={[0, headY + headR * 0.6, 0]}>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.22, 0.25, 0.06, 8]} />
            <meshStandardMaterial color={hatColor} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.14, 0.18, 0.1, 8]} />
            <meshStandardMaterial color={hatColor} roughness={0.9} />
          </mesh>
        </group>
      ) : role === "Blacksmith" ? (
        <group position={[0, headY + headR * 0.5, 0]}>
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.18, 0.2, 0.08, 6]} />
            <meshStandardMaterial color="#2C3E50" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.22, 0.04, 0.22]} />
            <meshStandardMaterial color="#2C3E50" roughness={0.9} />
          </mesh>
        </group>
      ) : role === "Gatekeeper" ? (
        <group position={[0, headY + headR * 0.5, 0]}>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.15, 0.2, 0.1, 6]} />
            <meshStandardMaterial color="#3D3D3D" roughness={0.8} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.08, 0.04, 0.18]} />
            <meshStandardMaterial color="#FFD700" roughness={0.5} metalness={0.7} />
          </mesh>
        </group>
      ) : role === "Musician" ? (
        <group position={[0, headY + headR * 0.4, 0]}>
          <mesh position={[0.1, 0.04, 0]}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial color="#D4A017" roughness={0.6} />
          </mesh>
        </group>
      ) : isChild ? null : (
        <mesh position={[0, headY + headR * 0.5, -0.05]}>
          <boxGeometry args={[0.18, 0.03, 0.15]} />
          <meshStandardMaterial color={hatColor} roughness={0.8} />
        </mesh>
      )}
      {/* Legs */}
      <mesh position={[-0.1, -bodyY - 0.05, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.25, 4]} />
        <meshStandardMaterial color="#2D3436" roughness={0.9} />
      </mesh>
      <mesh position={[0.1, -bodyY - 0.05, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.25, 4]} />
        <meshStandardMaterial color="#2D3436" roughness={0.9} />
      </mesh>
    </group>
  );
}
