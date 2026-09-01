import { writeFileSync, mkdirSync } from "node:fs";
import { buildDitherSvg, type SceneKey } from "../lib/dither.ts";

type Entry = { number: string; scene: SceneKey; ratio: "tall" | "wide" | "square" };

const entries: Entry[] = [
  { number: "01", scene: "road-home", ratio: "wide" },
  { number: "02", scene: "stillness", ratio: "tall" },
  { number: "03", scene: "red-ridge", ratio: "tall" },
  { number: "04", scene: "wind", ratio: "square" },
  { number: "05", scene: "quiet-peaks", ratio: "square" },
  { number: "06", scene: "golden-gate", ratio: "wide" },
  { number: "07", scene: "pink-bank", ratio: "tall" },
  { number: "08", scene: "liftoff", ratio: "wide" },
  { number: "09", scene: "reflection", ratio: "square" },
  { number: "10", scene: "philadelphia", ratio: "wide" },
  { number: "11", scene: "buda", ratio: "tall" },
  { number: "12", scene: "columns", ratio: "tall" },
  { number: "13", scene: "inlet", ratio: "wide" },
  { number: "14", scene: "lake-peak", ratio: "square" },
  { number: "15", scene: "snowfield", ratio: "square" },
  { number: "16", scene: "river-valley", ratio: "wide" },
];

mkdirSync("public/art", { recursive: true });

for (const e of entries) {
  try {
    console.log("building", e.number, e.scene);
    const svg = buildDitherSvg({ scene: e.scene, seed: Number(e.number), ratio: e.ratio, uid: `a${e.number}` });
    const file = `public/art/${e.number}-${e.scene}.svg`;
    writeFileSync(file, svg);
    console.log("wrote", file);
  } catch (err) {
    console.error("FAILED", e.number, e.scene, (err as Error).message);
    throw err;
  }
}

console.log(`\nGenerated ${entries.length} dither images in public/art/`);
