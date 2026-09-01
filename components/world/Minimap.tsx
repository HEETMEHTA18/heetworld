"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import { useVillageStore } from "@/store/villageStore";
import { BUILDINGS } from "@/lib/world-constants";

const MINI_SIZE = 160;
const FULL_SIZE = 500;
const WORLD_RANGE = 40;

function worldToMap(
  wx: number,
  wz: number,
  size: number
): { x: number; y: number } {
  return {
    x: size / 2 + (wx / WORLD_RANGE) * (size / 2),
    y: size / 2 + (wz / WORLD_RANGE) * (size / 2),
  };
}

export default function Minimap() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const {
    showMinimap,
    minimapExpanded,
    setMinimapExpanded,
    setShowMinimap,
    nearbyBuilding,
    setActiveBuilding,
    setSelectedDestination,
    isTraveling,
    activeBuilding,
    characterPosition,
  } = useVillageStore();

  const lastClick = useRef(0);

  const handleMapClick = useCallback(
    (e: React.MouseEvent) => {
      const now = Date.now();
      if (now - lastClick.current < 400) {
        const size = minimapExpanded ? FULL_SIZE : MINI_SIZE;
        const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const wx =
          ((px / size) * WORLD_RANGE * 2 - WORLD_RANGE);
        const wz =
          ((py / size) * WORLD_RANGE * 2 - WORLD_RANGE);

        let closest: string | null = null;
        let closestDist = Infinity;
        for (const b of BUILDINGS) {
          const dx = wx - b.position[0];
          const dz = wz - b.position[2];
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist < 3 && dist < closestDist) {
            closest = b.id;
            closestDist = dist;
          }
        }
        if (closest && !isTraveling && !activeBuilding) {
          setSelectedDestination(closest);
          setMinimapExpanded(false);
        }
      }
      lastClick.current = now;
    },
    [
      minimapExpanded,
      isTraveling,
      activeBuilding,
      setSelectedDestination,
      setMinimapExpanded,
    ]
  );

  const handleDoubleClick = useCallback(() => {
    if (minimapExpanded) {
      setMinimapExpanded(false);
    } else {
      setMinimapExpanded(true);
    }
  }, [minimapExpanded, setMinimapExpanded]);

  if (!showMinimap) return null;

  const miniSize = isMobile ? 100 : MINI_SIZE;
  const size = minimapExpanded ? FULL_SIZE : miniSize;
  const charPos = worldToMap(characterPosition[0], characterPosition[2], size);

  return (
    <>
      {minimapExpanded && (
        <div
          className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setMinimapExpanded(false)}
        >
          <div
            className={`bg-[#050505]/95 border border-[#D4A017]/30 rounded-2xl ${isMobile ? "mx-4 p-3 max-w-full" : "p-5"} shadow-[0_0_50px_rgba(212,160,23,0.15)]`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`font-accent ${isMobile ? "text-sm" : "text-lg"} text-[#D4A017] tracking-wider`}>
                Portfolio Map
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                {!isMobile && (
                  <span className="font-mono text-[10px] text-[#F9F7F3]/40">
                    Double-tap building to travel
                  </span>
                )}
                <button
                  onClick={() => {
                    setMinimapExpanded(false);
                    setShowMinimap(false);
                  }}
                  className="font-mono text-sm text-[#F9F7F3]/40 hover:text-[#F9F7F3] transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <svg
              width={isMobile ? Math.min(window.innerWidth - 48, FULL_SIZE) : size}
              height={isMobile ? Math.min(window.innerWidth - 48, FULL_SIZE) : size}
              viewBox={`0 0 ${size} ${size}`}
              className="rounded-xl cursor-crosshair"
              onClick={handleMapClick}
              onDoubleClick={handleDoubleClick}
            >
              <rect width={size} height={size} fill="#0A0E1A" rx="6" />

              {/* roads */}
              <line
                x1={worldToMap(0, -5, size).x}
                y1={worldToMap(0, -5, size).y}
                x2={worldToMap(0, 60, size).x}
                y2={worldToMap(0, 60, size).y}
                stroke="#2A3A2A"
                strokeWidth="1.5"
                strokeDasharray={minimapExpanded ? "6,4" : undefined}
              />
              <line
                x1={worldToMap(-11, -2, size).x}
                y1={worldToMap(-11, -2, size).y}
                x2={worldToMap(11, -2, size).x}
                y2={worldToMap(11, -2, size).y}
                stroke="#2A3A2A"
                strokeWidth="1.5"
                strokeDasharray={minimapExpanded ? "6,4" : undefined}
              />

              {/* buildings */}
              {BUILDINGS.map((b) => {
                const pos = worldToMap(b.position[0], b.position[2], size);
                const isActive = b.id === activeBuilding;
                const isNearby = b.id === nearbyBuilding;
                const boxSize = minimapExpanded ? 16 : 8;
                const fontSize = minimapExpanded ? 10 : 6;
                return (
                  <g key={b.id} className="cursor-pointer">
                    <rect
                      x={pos.x - boxSize / 2}
                      y={pos.y - boxSize / 2}
                      width={boxSize}
                      height={boxSize}
                      rx={3}
                      fill={b.color}
                      opacity={isActive ? 1 : isNearby ? 0.9 : 0.5}
                      stroke={isNearby ? "#D4A017" : "none"}
                      strokeWidth={minimapExpanded ? 2 : 1}
                    />
                    {minimapExpanded && (
                      <>
                        <text
                          x={pos.x}
                          y={pos.y + boxSize / 2 + 12}
                          fill={isNearby ? "#D4A017" : "#F9F7F3"}
                          opacity={0.7}
                          fontSize={fontSize}
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {b.name}
                        </text>
                        <text
                          x={pos.x}
                          y={pos.y + boxSize / 2 + 22}
                          fill="#F9F7F3"
                          opacity={0.4}
                          fontSize={7}
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {b.subtitle}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

              {/* character */}
              <circle
                cx={charPos.x}
                cy={charPos.y}
                r={minimapExpanded ? 6 : 3}
                fill="#D4A017"
                opacity={0.95}
              />
              <circle
                cx={charPos.x}
                cy={charPos.y}
                r={minimapExpanded ? 10 : 5}
                fill="none"
                stroke="#D4A017"
                strokeWidth={1}
                opacity={0.4}
              />
            </svg>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4A017]" />
                <span className="font-mono text-[10px] sm:text-xs text-[#F9F7F3]/60">You</span>
              </div>
              {minimapExpanded && !isMobile && (
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] text-[#F9F7F3]/30">
                    Scroll • click to travel
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!minimapExpanded && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-[#050505]/85 backdrop-blur-md border border-[#D4A017]/20 rounded-xl p-2.5 shadow-[0_0_20px_rgba(212,160,23,0.15)]">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <span className="font-mono text-[8px] text-[#D4A017]/70 uppercase tracking-wider">
                Map
              </span>
              <button
                onClick={() => {
                  setShowMinimap(false);
                }}
                className="font-mono text-[8px] text-[#F9F7F3]/30 hover:text-[#F9F7F3] transition-colors"
              >
                ✕
              </button>
            </div>

            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="rounded-lg cursor-crosshair"
              onClick={handleMapClick}
              onDoubleClick={handleDoubleClick}
            >
              <rect width={size} height={size} fill="#0A0E1A" rx="4" />

              <line
                x1={worldToMap(0, -5, size).x}
                y1={worldToMap(0, -5, size).y}
                x2={worldToMap(0, 60, size).x}
                y2={worldToMap(0, 60, size).y}
                stroke="#2A3A2A"
                strokeWidth="1"
              />
              <line
                x1={worldToMap(-11, -2, size).x}
                y1={worldToMap(-11, -2, size).y}
                x2={worldToMap(11, -2, size).x}
                y2={worldToMap(11, -2, size).y}
                stroke="#2A3A2A"
                strokeWidth="1"
              />

              {BUILDINGS.map((b) => {
                const pos = worldToMap(b.position[0], b.position[2], size);
                const isNearby = b.id === nearbyBuilding;
                const isActive = b.id === activeBuilding;
                return (
                  <g key={b.id} className="cursor-pointer">
                    <rect
                      x={pos.x - 4}
                      y={pos.y - 4}
                      width={8}
                      height={8}
                      rx={2}
                      fill={b.color}
                      opacity={isActive ? 1 : isNearby ? 0.9 : 0.5}
                      stroke={isNearby ? "#D4A017" : "none"}
                      strokeWidth={1}
                    />
                  </g>
                );
              })}

              <circle cx={charPos.x} cy={charPos.y} r={3} fill="#D4A017" opacity={0.95} />
              <circle
                cx={charPos.x}
                cy={charPos.y}
                r={5}
                fill="none"
                stroke="#D4A017"
                strokeWidth={1}
                opacity={0.3}
              />
            </svg>

            <div className="flex items-center justify-between mt-1.5 px-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                <span className="font-mono text-[7px] text-[#F9F7F3]/40">You</span>
              </div>
              <span className="font-mono text-[7px] text-[#F9F7F3]/20">≡</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
