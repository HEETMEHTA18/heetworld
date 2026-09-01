export type SceneKey =
  | "lake-peak"
  | "snowfield"
  | "river-valley"
  | "buda"
  | "columns"
  | "philadelphia"
  | "inlet"
  | "road-home"
  | "stillness"
  | "red-ridge"
  | "wind"
  | "pink-bank"
  | "quiet-peaks"
  | "golden-gate"
  | "liftoff"
  | "reflection";

type Palette = {
  sky: string;
  light: string;
  mid: string;
  dark: string;
  accent: string;
  ground: string;
};

type SceneConfig = {
  palette: Palette;
  layers: number;
  water?: boolean;
  sun?: { x: number; y: number; r: number };
  moon?: boolean;
  birds?: number;
  road?: boolean;
  silhouette?: "castle" | "columns" | "hall" | "bridge" | "rocket" | "tree" | "figure";
  grain?: number;
};

const P = {
  blueOrange: { sky: "#0a1a3f", light: "#f0a868", mid: "#d98050", dark: "#16284a", accent: "#ffd9a0", ground: "#0a1330" },
  snow: { sky: "#16263f", light: "#cfe0f0", mid: "#9fb6d0", dark: "#22324d", accent: "#ffffff", ground: "#101c30" },
  blueWater: { sky: "#08203a", light: "#3f86c4", mid: "#1d4f80", dark: "#0a1730", accent: "#bfe0ff", ground: "#06121f" },
  orangeBlue: { sky: "#102a4a", light: "#f2a25c", mid: "#c9743a", dark: "#1a2440", accent: "#ffcf99", ground: "#0c1428" },
  redBlack: { sky: "#1a0a0a", light: "#e2603f", mid: "#a8311f", dark: "#160606", accent: "#ff8a5c", ground: "#0d0404" },
  pink: { sky: "#2a1320", light: "#f0a0b8", mid: "#d06a86", dark: "#2a1622", accent: "#ffd0dd", ground: "#1c0e16" },
} satisfies Record<string, Palette>;

export const SCENES: Record<SceneKey, SceneConfig> = {
  "lake-peak": { palette: P.blueOrange, layers: 4, water: true, sun: { x: 310, y: 90, r: 34 } },
  snowfield: { palette: P.snow, layers: 3, sun: { x: 210, y: 120, r: 40 } },
  "river-valley": { palette: P.blueWater, layers: 4, water: true, birds: 2, sun: { x: 300, y: 80, r: 26 } },
  buda: { palette: P.orangeBlue, layers: 3, sun: { x: 300, y: 100, r: 30 }, silhouette: "castle" },
  columns: { palette: P.orangeBlue, layers: 2, sun: { x: 90, y: 110, r: 28 }, silhouette: "columns" },
  philadelphia: { palette: P.orangeBlue, layers: 2, sun: { x: 110, y: 120, r: 30 }, silhouette: "hall" },
  inlet: { palette: P.blueWater, layers: 3, water: true, birds: 4, sun: { x: 300, y: 90, r: 24 } },
  "road-home": { palette: P.blueOrange, layers: 4, road: true, sun: { x: 200, y: 70, r: 30 } },
  stillness: { palette: P.blueWater, layers: 3, moon: true, silhouette: "figure" },
  "red-ridge": { palette: P.redBlack, layers: 4, sun: { x: 300, y: 90, r: 28 } },
  wind: { palette: P.snow, layers: 3, birds: 3, sun: { x: 290, y: 100, r: 26 } },
  "pink-bank": { palette: P.pink, layers: 2, water: true, sun: { x: 280, y: 100, r: 26 }, silhouette: "tree" },
  "quiet-peaks": { palette: P.snow, layers: 2, sun: { x: 210, y: 110, r: 28 } },
  "golden-gate": { palette: P.orangeBlue, layers: 2, water: true, sun: { x: 300, y: 100, r: 26 }, silhouette: "bridge" },
  liftoff: { palette: P.blueWater, layers: 2, sun: { x: 120, y: 90, r: 30 }, silhouette: "rocket" },
  reflection: { palette: P.blueOrange, layers: 4, water: true, sun: { x: 200, y: 80, r: 32 } },
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ridge(rng: () => number, w: number, h: number, baseY: number, amp: number, segs: number) {
  const step = w / segs;
  const pts: string[] = [`0,${h}`, `0,${(baseY + (rng() - 0.5) * amp).toFixed(1)}`];
  for (let i = 1; i < segs; i++) {
    const x = step * i;
    pts.push(`${x.toFixed(1)},${(baseY + (rng() - 0.5) * amp).toFixed(1)}`);
  }
  pts.push(`${w},${(baseY + (rng() - 0.5) * amp).toFixed(1)}`, `${w},${h}`);
  return pts.join(" ");
}

function silhouette(kind: NonNullable<SceneConfig["silhouette"]>, W: number, H: number, horizon: number, color: string, accent: string) {
  switch (kind) {
    case "castle":
      return `<g fill="${color}"><rect x="${W * 0.34}" y="${horizon - 90}" width="${W * 0.32}" height="90"/><rect x="${W * 0.4}" y="${horizon - 130}" width="${W * 0.2}" height="50"/>${[0, 1, 2, 3].map((i) => `<rect x="${W * 0.34 + i * W * 0.1}" y="${horizon - 104}" width="6" height="16"/>`).join("")}</g>`;
    case "columns":
      return `<g fill="${color}">${[0, 1, 2, 3, 4].map((i) => `<rect x="${W * 0.18 + i * W * 0.13}" y="${horizon - 120}" width="${W * 0.05}" height="120"/>`).join("")}<rect x="${W * 0.14}" y="${horizon - 132}" width="${W * 0.72}" height="14"/><rect x="${W * 0.14}" y="${horizon - 8}" width="${W * 0.72}" height="10"/></g>`;
    case "hall":
      return `<g fill="${color}"><rect x="${W * 0.24}" y="${horizon - 110}" width="${W * 0.52}" height="110"/><rect x="${W * 0.34}" y="${horizon - 80}" width="${W * 0.32}" height="80" fill="${accent}" opacity="0.3"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${W * 0.27 + i * W * 0.08}" y="${horizon - 120}" width="5" height="14"/>`).join("")}</g>`;
    case "bridge":
      return `<g fill="${color}"><rect x="${W * 0.1}" y="${horizon - 70}" width="${W * 0.8}" height="8"/>${[0.22, 0.5, 0.78].map((t) => `<path d="M ${W * t} ${horizon} Q ${W * t} ${horizon - 80} ${W * t - 26} ${horizon - 80}" stroke="${color}" stroke-width="5" fill="none"/>`).join("")}<line x1="${W * 0.22}" y1="${horizon - 72}" x2="${W * 0.22}" y2="${horizon}" stroke="${color}" stroke-width="4"/><line x1="${W * 0.78}" y1="${horizon - 72}" x2="${W * 0.78}" y2="${horizon}" stroke="${color}" stroke-width="4"/></g>`;
    case "rocket":
      return `<g fill="${color}"><path d="M ${W * 0.5} ${H * 0.32} q 18 30 0 70 q -18 -40 0 -70 Z"/><rect x="${W * 0.5 - 22}" y="${H * 0.5}" width="44" height="34" fill="${accent}" opacity="0.5"/><path d="M ${W * 0.5 - 18} ${H * 0.62} l -14 26 l 14 -8 Z"/><path d="M ${W * 0.5 + 18} ${H * 0.62} l 14 26 l -14 -8 Z"/></g>`;
    case "tree":
      return `<g><rect x="${W * 0.42}" y="${horizon - 60}" width="8" height="60" fill="${color}"/><circle cx="${W * 0.44}" cy="${horizon - 80}" r="34" fill="${accent}" opacity="0.8"/><circle cx="${W * 0.52}" cy="${horizon - 64}" r="22" fill="${accent}" opacity="0.6"/></g>`;
    case "figure":
      return `<g fill="${color}"><circle cx="${W * 0.5}" cy="${horizon - 56}" r="10"/><rect x="${W * 0.5 - 7}" y="${horizon - 46}" width="14" height="46" rx="6"/></g>`;
  }
}

export function buildDitherSvg({
  scene,
  seed = 1,
  ratio = "square",
  uid = "a",
}: {
  scene: SceneKey;
  seed?: number;
  ratio?: "tall" | "wide" | "square";
  uid?: string;
}) {
  const cfg = SCENES[scene];
  const W = 400;
  const H = ratio === "tall" ? 520 : ratio === "wide" ? 225 : 400;
  const horizon = H * (cfg.water ? 0.62 : 0.58);
  const rng = mulberry32(seed * 9973 + scene.length * 31);

  const layerColors = [cfg.palette.light, cfg.palette.mid, cfg.palette.dark, cfg.palette.ground];
  const mountains = Array.from({ length: cfg.layers }, (_, i) => {
    const baseY = horizon - i * (horizon * 0.16) - 6;
    const amp = 26 + i * 16;
    const segs = 5 + i * 2;
    return { points: ridge(rng, W, H, baseY, amp, segs), fill: layerColors[Math.min(i, layerColors.length - 1)] };
  });

  const birds = Array.from({ length: cfg.birds ?? 0 }, () => ({
    x: 40 + rng() * (W - 120),
    y: 50 + rng() * (horizon - 90),
    s: 0.7 + rng() * 0.7,
  }));

  const id = uid;

  const defs = `
    <defs>
      <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${cfg.palette.sky}"/>
        <stop offset="100%" stop-color="${cfg.palette.light}" stop-opacity="0.55"/>
      </linearGradient>
      <filter id="grain-${id}">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}" stitchTiles="stitch" result="n"/>
        <feColorMatrix in="n" type="saturate" values="0"/>
        <feComponentTransfer><feFuncA type="discrete" tableValues="0 0.35 0.7 1"/></feComponentTransfer>
      </filter>
      <pattern id="dots-${id}" width="3" height="3" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="0.7" fill="${cfg.palette.accent}" opacity="0.5"/>
      </pattern>
      ${cfg.moon ? `<radialGradient id="moon-${id}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${cfg.palette.accent}"/><stop offset="100%" stop-color="${cfg.palette.light}"/></radialGradient>` : ""}
    </defs>`;

  const body = `
    <rect width="${W}" height="${H}" fill="url(#sky-${id})"/>
    ${cfg.sun ? `<circle cx="${cfg.sun.x}" cy="${cfg.sun.y}" r="${cfg.sun.r}" fill="${cfg.palette.accent}" opacity="0.9"/>` : ""}
    ${cfg.moon ? `<circle cx="${W * 0.7}" cy="${H * 0.2}" r="34" fill="url(#moon-${id})"/>` : ""}
    ${mountains.map((m) => `<polygon points="${m.points}" fill="${m.fill}"/>`).join("")}
    ${cfg.silhouette ? silhouette(cfg.silhouette, W, H, horizon, cfg.palette.dark, cfg.palette.accent) : ""}
    ${cfg.water ? `<g opacity="0.55"><rect x="0" y="${horizon}" width="${W}" height="${H - horizon}" fill="${cfg.palette.ground}"/><g transform="translate(0,${horizon * 2}) scale(1,-1)" opacity="0.6">${mountains.map((m) => `<polygon points="${m.points}" fill="${m.fill}"/>`).join("")}</g>${Array.from({ length: 4 }, (_, i) => `<line x1="0" y1="${horizon + 14 + i * 16}" x2="${W}" y2="${horizon + 14 + i * 16}" stroke="${cfg.palette.accent}" stroke-width="0.6" opacity="0.25"/>`).join("")}</g>` : ""}
    ${cfg.road ? `<path d="M ${W / 2 - 6} ${H} L ${W / 2 + 6} ${H} L ${W / 2 + 34} ${horizon} L ${W / 2 - 34} ${horizon} Z" fill="${cfg.palette.light}" opacity="0.85"/>` : ""}
    ${birds.map((b) => `<path d="M ${b.x} ${b.y} q ${6 * b.s} ${-5 * b.s} ${12 * b.s} 0 q ${6 * b.s} ${-5 * b.s} ${12 * b.s} 0" fill="none" stroke="${cfg.palette.dark}" stroke-width="1.4" stroke-linecap="round" opacity="0.8"/>`).join("")}
    <rect width="${W}" height="${H}" filter="url(#grain-${id})" opacity="${cfg.grain ?? 0.22}" style="mix-blend-mode:overlay"/>
    <rect width="${W}" height="${H}" fill="url(#dots-${id})" opacity="0.06" style="mix-blend-mode:soft-light"/>
    <rect width="${W}" height="${H}" fill="none" stroke="${cfg.palette.dark}" stroke-opacity="0.15"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" role="img">${defs}${body}</svg>`;
}
