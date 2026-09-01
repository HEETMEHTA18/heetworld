"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Eye,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import { skillGroups } from "@/content/data/skills";
import { cn } from "@/lib/utils";

type LogEntry = { id: number; text: string };

const spring = { type: "spring", stiffness: 420, damping: 26 } as const;

export function StackPlayground() {
  const groups = skillGroups;
  const [stack, setStack] = useState<string[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [overTray, setOverTray] = useState(false);
  const trayRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef(false);
  const logId = useRef(0);
  const reduceMotion = useReducedMotion();

  const byKey = useMemo(() => new Map(groups.map((g) => [g.key, g])), [groups]);
  const topKey = stack.length > 0 ? stack[stack.length - 1] : null;
  const top = topKey ? byKey.get(topKey) : undefined;

  const log = (text: string) =>
    setLogs((prev) =>
      [{ id: ++logId.current, text }, ...prev].slice(0, 6)
    );

  const pointInTray = (x: number, y: number) => {
    const el = trayRef.current;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  const push = (key: string) => {
    const group = byKey.get(key);
    if (!group) return;
    if (stack.includes(key)) {
      log(`stack.push("${group.label}")  # already on the stack`);
      return;
    }
    setStack((s) => [...s, key]);
    log(`stack.push("${group.label}")`);
  };

  const pop = () => {
    if (!topKey) {
      log("stack.pop()  # underflow — the stack is empty");
      return;
    }
    const group = byKey.get(topKey);
    setStack((s) => s.slice(0, -1));
    log(`stack.pop()  # removed "${group?.label}"`);
  };

  const removeAny = (key: string) => {
    const group = byKey.get(key);
    if (!group || !stack.includes(key)) return;
    setStack((s) => s.filter((k) => k !== key));
    log(`stack.remove("${group.label}")  # direct removal`);
  };

  const popAll = () => {
    if (!stack.length) return;
    setStack([]);
    log("while not stack.is_empty(): stack.pop()");
  };

  const peek = () => {
    log(
      top
        ? `stack.peek()  # "${top.label}"`
        : "stack.peek()  # empty (returns None)"
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
      {/* Palette — the source of items */}
      <div>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          available — click a block or drag it onto the stack
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {groups.map((g) => {
            const on = stack.includes(g.key);
            return (
              <motion.button
                key={g.key}
                type="button"
                drag
                dragSnapToOrigin
                dragMomentum={false}
                whileDrag={{ scale: 1.05, zIndex: 40, cursor: "grabbing" }}
                onDragStart={() => setOverTray(false)}
                onDrag={(_, info) => {
                  dropRef.current = pointInTray(info.point.x, info.point.y);
                  setOverTray(dropRef.current);
                }}
                onDragEnd={() => {
                  if (dropRef.current) push(g.key);
                  setOverTray(false);
                }}
                onTap={() => push(g.key)}
                aria-pressed={on}
                aria-label={`Push ${g.label} onto the stack`}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-colors",
                  on
                    ? "border-border bg-muted text-muted-foreground"
                    : "border-border bg-card text-foreground hover:border-foreground/25"
                )}
              >
                <g.icon className="h-4 w-4 shrink-0 text-accent" />
                <span className="flex-1 text-[13px] font-medium">{g.label}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {g.skills.length}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* The stack itself */}
      <div className="flex flex-col gap-4">
        <div
          ref={trayRef}
          aria-label="The stack"
          className={cn(
            "relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl border-2 border-dashed p-3 transition-colors",
            overTray
              ? "border-accent bg-accent/5"
              : "border-border bg-card"
          )}
        >
          <div className="pointer-events-none absolute left-3 top-3 right-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              the stack
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              len = {stack.length}
            </span>
          </div>

          {stack.length === 0 && (
            <div className="pointer-events-none flex flex-col items-center gap-1.5 pb-10 text-center">
              <ArrowDownToLine className="h-5 w-5 text-muted-foreground/50" />
              <p className="font-mono text-[11px] tracking-wide text-muted-foreground/70">
                stack is empty
              </p>
              <p className="max-w-[220px] font-mono text-[10px] leading-relaxed text-muted-foreground/50">
                click an item to push · tap a stack item to remove it · drag to
                drop it here
              </p>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {stack.map((key, i) => {
              const g = byKey.get(key);
              const isTop = i === stack.length - 1;
              if (!g) return null;
              return (
                <motion.button
                  key={key}
                  type="button"
                  layout
                  drag
                  dragSnapToOrigin
                  dragMomentum={false}
                  whileDrag={{ scale: 1.04, zIndex: 40 }}
                  onDragStart={() => setOverTray(false)}
                  onDrag={(_, info) => {
                    dropRef.current = pointInTray(
                      info.point.x,
                      info.point.y
                    );
                    setOverTray(dropRef.current);
                  }}
                  onDragEnd={() => {
                    if (!dropRef.current) removeAny(key);
                    setOverTray(false);
                  }}
                  onTap={() => removeAny(key)}
                  initial={{ y: -56, opacity: 0, scale: 0.92 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -44, opacity: 0, scale: 0.92 }}
                  transition={reduceMotion ? { duration: 0 } : spring}
                  aria-label={`Remove ${g.label} from the stack`}
                  className={cn(
                    "relative z-10 mb-2 flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left shadow-card",
                    isTop
                      ? "border-accent/50 bg-accent text-accent-foreground"
                      : "border-border bg-card text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <g.icon className="h-4 w-4 shrink-0 opacity-90" />
                    <span className="text-[13px] font-medium">{g.label}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[10px] opacity-70">
                      {g.skills.length}
                    </span>
                    {isTop && (
                      <span className="rounded-md px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider border border-accent-foreground/40">
                        top
                      </span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>

          <div
            aria-hidden="true"
            className="mt-auto flex items-center justify-between border-t border-dashed pt-1"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
              base
            </span>
            <span className="font-mono text-[9px] text-muted-foreground/60">
              LIFO
            </span>
          </div>
        </div>

        {/* Stack controls */}
        <div className="flex items-center gap-2">
          <StackControl
            label="pop"
            icon={ArrowUpFromLine}
            onClick={pop}
            disabled={stack.length === 0}
          />
          <StackControl
            label="peek"
            icon={Eye}
            onClick={peek}
            disabled={false}
          />
          <StackControl
            label="clear"
            icon={Trash2}
            onClick={popAll}
            disabled={stack.length === 0}
          />
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">
            {stack.length === 0
              ? "empty"
              : stack.length === 1
                ? "1 item"
                : `${stack.length} items`}
          </span>
        </div>

        {/* Operation console */}
        <div className="overflow-hidden rounded-xl border border-border bg-[#0b0d11] font-mono text-[11px] leading-relaxed text-[#d4d4d8]">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#71717a]">
              console — stack.cpp
            </span>
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#f87171]" />
            </span>
          </div>
          <div aria-live="polite" className="max-h-36 space-y-0.5 overflow-y-auto px-3 py-2">
            {logs.length === 0 ? (
              <p className="text-[#52525b]">
                {"// operations will print here"}
              </p>
            ) : (
              logs.map((l) => <p key={l.id}>{l.text}</p>)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StackControl({
  label,
  icon: Icon,
  onClick,
  disabled,
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-[11px] text-foreground transition-colors hover:border-foreground/30 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}