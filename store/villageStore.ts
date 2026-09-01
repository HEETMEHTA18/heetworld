import { create } from "zustand";

export type TimeOfDay = "golden" | "night" | "rain";
export type WeatherType = "clear" | "rain" | "snow";

interface GitHubData {
  stars: number;
  repos: number;
  lastCommit: string;
}

interface VillageState {
  activeBuilding: string | null;
  selectedDestination: string | null;
  groundDestination: [number, number, number] | null;
  isTraveling: boolean;
  timeOfDay: TimeOfDay;
  weather: WeatherType;
  soundOn: boolean;
  isLoading: boolean;
  introSequenceComplete: boolean;
  nearbyBuilding: string | null;
  showMinimap: boolean;
  minimapExpanded: boolean;
  characterPosition: [number, number, number];
  characterRotation: number;
  cameraTarget: [number, number, number] | null;
  cameraPosition: [number, number, number] | null;
  firstPerson: boolean;
  flying: boolean;
  autoDayNight: boolean;
  dayNightProgress: number;
  ghData: GitHubData | null;
  interiorView: string | null;
  showingNpc: boolean;
  tourActive: boolean;
  tourIndex: number;
  tourPause: number;
  guideGreeting: boolean;
  activePhoneProject: string | null;
  welcomeMessageActive: boolean;

  showAboutMe: boolean;

  setActiveBuilding: (id: string | null) => void;
  setSelectedDestination: (id: string | null) => void;
  setGroundDestination: (pos: [number, number, number] | null) => void;
  setIsTraveling: (traveling: boolean) => void;
  setTimeOfDay: (time: TimeOfDay) => void;
  setWeather: (weather: WeatherType) => void;
  toggleSound: () => void;
  setIsLoading: (loading: boolean) => void;
  setIntroSequenceComplete: (complete: boolean) => void;
  setNearbyBuilding: (id: string | null) => void;
  setShowMinimap: (show: boolean) => void;
  setMinimapExpanded: (expanded: boolean) => void;
  setCharacterPosition: (pos: [number, number, number]) => void;
  setCharacterRotation: (rot: number) => void;
  setCameraTarget: (target: [number, number, number] | null) => void;
  setCameraPosition: (position: [number, number, number] | null) => void;
  setFirstPerson: (fp: boolean) => void;
  setFlying: (f: boolean) => void;
  setAutoDayNight: (auto: boolean) => void;
  setDayNightProgress: (p: number) => void;
  setGhData: (data: GitHubData | null) => void;
  setInteriorView: (id: string | null) => void;
  setShowingNpc: (show: boolean) => void;
  setTourActive: (active: boolean) => void;
  setTourIndex: (idx: number) => void;
  setTourPause: (t: number) => void;
  setGuideGreeting: (greeted: boolean) => void;
  setActivePhoneProject: (project: string | null) => void;
  setWelcomeMessageActive: (active: boolean) => void;
  setShowAboutMe: (show: boolean) => void;
}

export const useVillageStore = create<VillageState>((set) => ({
  activeBuilding: null,
  selectedDestination: null,
  groundDestination: null,
  isTraveling: false,
  timeOfDay: "golden",
  weather: "clear",
  soundOn: false,
  isLoading: true,
  introSequenceComplete: false,
  nearbyBuilding: null,
  showMinimap: false,
  minimapExpanded: false,
  characterPosition: [0, 0, 75],
  characterRotation: Math.PI,
  cameraTarget: null,
  cameraPosition: null,
  firstPerson: false,
  flying: false,
  autoDayNight: true,
  dayNightProgress: 0.2,
  ghData: null,
  interiorView: null,
  showingNpc: false,
  tourActive: false,
  tourIndex: 0,
  tourPause: 0,
  guideGreeting: false,
  activePhoneProject: null,
  welcomeMessageActive: false,
  showAboutMe: false,

  setActiveBuilding: (id) => set({ activeBuilding: id, nearbyBuilding: null }),
  setSelectedDestination: (id) => set({ selectedDestination: id, groundDestination: null }),
  setGroundDestination: (pos) => set({ groundDestination: pos, selectedDestination: null }),
  setIsTraveling: (traveling) => set({ isTraveling: traveling }),
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  setWeather: (weather) => set({ weather }),
  toggleSound: () => set((state) => ({ soundOn: !state.soundOn })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIntroSequenceComplete: (complete) => set({ introSequenceComplete: complete }),
  setNearbyBuilding: (id) => set({ nearbyBuilding: id }),
  setShowMinimap: (show) => set({ showMinimap: show, minimapExpanded: false }),
  setMinimapExpanded: (expanded) => set({ minimapExpanded: expanded }),
  setCharacterPosition: (pos) => set({ characterPosition: pos }),
  setCharacterRotation: (rot) => set({ characterRotation: rot }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setFirstPerson: (fp) => set({ firstPerson: fp }),
  setFlying: (f) => set({ flying: f }),
  setAutoDayNight: (auto) => set({ autoDayNight: auto }),
  setDayNightProgress: (p) => set({ dayNightProgress: p }),
  setGhData: (data) => set({ ghData: data }),
  setInteriorView: (id) => set({ interiorView: id }),
  setShowingNpc: (show) => set({ showingNpc: show }),
  setTourActive: (active) => set({ tourActive: active }),
  setTourIndex: (idx) => set({ tourIndex: idx }),
  setTourPause: (t) => set({ tourPause: t }),
  setGuideGreeting: (greeted) => set({ guideGreeting: greeted }),
  setActivePhoneProject: (project) => set({ activePhoneProject: project }),
  setWelcomeMessageActive: (active) => set({ welcomeMessageActive: active }),
  setShowAboutMe: (show) => set({ showAboutMe: show }),
}));
