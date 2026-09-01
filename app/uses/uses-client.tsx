"use client";

import { useState } from "react";
import { Play, RotateCcw, Check } from "lucide-react";
import { usesCategoriesData } from "@/content/data/uses";
import { NotebookCell } from "@/components/notebook-cell";

export function UsesNotebookClient() {
  // Total cells = Cell 0 (Summary) + 9 categories + Cell 10 (Execution/Terminal)
  const totalCellsCount = usesCategoriesData.length + 2;
  const [openCells, setOpenCells] = useState<Record<number, boolean>>({
    0: true,
    1: true, // Hardware
    4: true, // AI & ML
    5: true, // Environment
    [totalCellsCount - 1]: true, // Terminal output
  });

  const allOpen = Object.keys(openCells).length >= totalCellsCount && 
    Object.values(openCells).every(Boolean);

  const toggleRunAll = () => {
    if (allOpen) {
      setOpenCells({});
    } else {
      const all: Record<number, boolean> = {};
      for (let i = 0; i < totalCellsCount; i++) {
        all[i] = true;
      }
      setOpenCells(all);
    }
  };

  const toggleCell = (index: number) => {
    setOpenCells((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="mx-auto max-w-reading overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      {/* Notebook Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs font-medium text-foreground">
            uses.ipynb
          </span>
          <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline-block">
            · Python · ML · Systems · AI
          </span>
        </div>

        <button
          type="button"
          onClick={toggleRunAll}
          className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-background"
        >
          {allOpen ? (
            <>
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5 fill-current" />
              Run All Cells
            </>
          )}
        </button>
      </div>

      {/* Notebook Cells */}
      <div className="space-y-4 p-4 sm:p-6">
        {/* Cell 0: Summary */}
        <NotebookCell
          index={0}
          command={`# Heet's environment\nimport stack\n\nstack.summary()`}
          isOpen={!!openCells[0]}
          onToggle={() => toggleCell(0)}
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            A Linux-first development environment designed around Python, machine learning, experimentation, and shipping software.
          </p>
        </NotebookCell>

        {/* Categories 1..9 */}
        {usesCategoriesData.map((cat, i) => {
          const cellIndex = i + 1;
          return (
            <NotebookCell
              key={cat.key}
              index={cellIndex}
              command={cat.command}
              isOpen={!!openCells[cellIndex]}
              onToggle={() => toggleCell(cellIndex)}
            >
              <div className="space-y-3">
                {cat.description ? (
                  <p className="text-xs font-mono text-muted-foreground italic">
                    {cat.description}
                  </p>
                ) : null}

                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {cat.items?.map((it) => (
                    <li
                      key={it.name + it.detail}
                      className="flex flex-wrap items-baseline gap-x-2"
                    >
                      <span className="font-medium text-foreground">
                        • {it.name}
                      </span>
                      <span>— {it.detail}</span>
                      {it.link ? (
                        <a
                          className="text-accent underline-offset-4 hover:underline"
                          href={it.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ↗
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>

                {/* Custom category extra blocks */}
                {cat.key === "research" ? (
                  <div className="mt-4 rounded-lg border border-border/80 bg-background/60 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Preferred Learning Loop:
                    </p>
                    <code className="mt-1 block font-mono text-xs text-foreground">
                      concept → implementation → experiment → break it → understand it
                    </code>
                  </div>
                ) : null}

                {cat.key === "productivity" ? (
                  <p className="mt-2 text-xs font-mono text-muted-foreground">
                    The goal isn&apos;t to optimize productivity endlessly. It&apos;s to spend more time actually building.
                  </p>
                ) : null}

                {cat.key === "projects" ? (
                  <div className="mt-3 space-y-1 text-xs font-mono text-muted-foreground">
                    <p>Some become projects.</p>
                    <p>Some become experiments.</p>
                    <p>Some get deleted.</p>
                    <p className="text-foreground pt-1">That&apos;s part of the process.</p>
                  </div>
                ) : null}
              </div>
            </NotebookCell>
          );
        })}

        {/* Terminal / Closing Cell */}
        <NotebookCell
          index={totalCellsCount - 1}
          command={`print("learn → experiment → build → repeat")\nprint("Portfolio built with code + curiosity.")`}
          isOpen={!!openCells[totalCellsCount - 1]}
          onToggle={() => toggleCell(totalCellsCount - 1)}
        >
          <div className="space-y-1.5 font-mono text-xs">
            <p className="text-emerald-400">
              <span className="text-muted-foreground">{"=> "}</span>Environment ready.
            </p>
            <p className="text-emerald-400">
              <span className="text-muted-foreground">{"=> "}</span>Model loaded.
            </p>
            <p className="text-emerald-400">
              <span className="text-muted-foreground">{"=> "}</span>Terminal open.
            </p>
            <p className="text-foreground font-semibold pt-1">
              <span className="text-accent">{"=> "}</span>Time to build.
            </p>
          </div>
        </NotebookCell>
      </div>
    </div>
  );
}
