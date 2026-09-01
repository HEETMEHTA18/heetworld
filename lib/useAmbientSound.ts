"use client";

import { useEffect, useRef } from "react";

type Zone = "field" | "forge" | "harbor" | "academy";

function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const length = sr * duration;
  const buffer = ctx.createBuffer(1, length, sr);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }
  return buffer;
}

function cleanupAudio(ctxRef: React.MutableRefObject<AudioContext | null>, nodesRef: React.MutableRefObject<AudioNode[]>) {
  nodesRef.current.forEach((n) => {
    try {
      if (n instanceof AudioScheduledSourceNode) n.stop();
      n.disconnect();
    } catch {}
  });
  nodesRef.current = [];
  if (ctxRef.current) ctxRef.current.close().catch(() => {});
  ctxRef.current = null;
}

export function useAmbientSound(soundOn: boolean, zone: Zone = "field") {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);

  useEffect(() => {
    if (!soundOn) {
      cleanupAudio(ctxRef, nodesRef);
      return;
    }

    let ctx: AudioContext;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctx = new AudioContextClass();
      if (ctx.state === "suspended") ctx.resume();
    } catch {
      return;
    }

    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.65, ctx.currentTime); // Increased master volume
    masterGain.connect(ctx.destination);
    nodesRef.current.push(masterGain);
 
    // --- Wind (always present) ---
    const windLen = 4;
    const windSrc = ctx.createBufferSource();
    windSrc.buffer = createNoiseBuffer(ctx, windLen);
    windSrc.loop = true;
 
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "lowpass";
    windFilter.frequency.setValueAtTime(400, ctx.currentTime);
    windFilter.Q.setValueAtTime(1, ctx.currentTime);
 
    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.18, ctx.currentTime); // Increased wind volume
 
    windSrc.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);
    windSrc.start();
    nodesRef.current.push(windSrc, windFilter, windGain);
 
    const windLfo = ctx.createOscillator();
    windLfo.frequency.setValueAtTime(0.08, ctx.currentTime);
    const windLfoGain = ctx.createGain();
    windLfoGain.gain.setValueAtTime(200, ctx.currentTime);
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);
    windLfo.start();
    nodesRef.current.push(windLfo, windLfoGain);
 
    // --- Birds (field zone main, quieter in others) ---
    const birdGain = ctx.createGain();
    birdGain.gain.setValueAtTime(zone === "field" ? 1.5 : zone === "academy" ? 0.6 : 0.25, ctx.currentTime); // Increased bird volumes
    birdGain.connect(masterGain);
    nodesRef.current.push(birdGain);
 
    function scheduleChirp() {
      if (!ctxRef.current) return;
      const now = ctxRef.current.currentTime;
      const chirpCount = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < chirpCount; i++) {
        const t = now + Math.random() * 0.8;
        const osc = ctxRef.current.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(2000 + Math.random() * 3000, t);
        osc.frequency.exponentialRampToValueAtTime(4000 + Math.random() * 2000, t + 0.05);
        osc.frequency.exponentialRampToValueAtTime(1500 + Math.random() * 1000, t + 0.1);
 
        const chirpGain = ctxRef.current.createGain();
        chirpGain.gain.setValueAtTime(0, t);
        chirpGain.gain.linearRampToValueAtTime(0.06, t + 0.02); // Increased chirp gain
        chirpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
 
        osc.connect(chirpGain);
        chirpGain.connect(birdGain);
        osc.start(t);
        osc.stop(t + 0.2);
        nodesRef.current.push(osc, chirpGain);
      }
      const nextDelay = 1.5 + Math.random() * 4;
      chirpTimer = window.setTimeout(scheduleChirp, nextDelay * 1000);
    }
    let chirpTimer = window.setTimeout(scheduleChirp, 2000);
 
    // --- Zone-specific ambient ---
    if (zone === "forge") {
      const forgeLen = 2;
      const forgeSrc = ctx.createBufferSource();
      forgeSrc.buffer = createNoiseBuffer(ctx, forgeLen);
      forgeSrc.loop = true;
 
      const forgeFilter = ctx.createBiquadFilter();
      forgeFilter.type = "bandpass";
      forgeFilter.frequency.setValueAtTime(800, ctx.currentTime);
      forgeFilter.Q.setValueAtTime(2, ctx.currentTime);
 
      const forgeGain = ctx.createGain();
      forgeGain.gain.setValueAtTime(0.24, ctx.currentTime); // Increased forge volume
 
      forgeSrc.connect(forgeFilter);
      forgeFilter.connect(forgeGain);
      forgeGain.connect(masterGain);
      forgeSrc.start();
      nodesRef.current.push(forgeSrc, forgeFilter, forgeGain);
 
      const forgeLfo = ctx.createOscillator();
      forgeLfo.frequency.setValueAtTime(2, ctx.currentTime);
      const forgeLfoGain = ctx.createGain();
      forgeLfoGain.gain.setValueAtTime(0.08, ctx.currentTime); // Increased modulation
      forgeLfo.connect(forgeLfoGain);
      forgeLfoGain.connect(masterGain.gain);
      forgeLfo.start();
      nodesRef.current.push(forgeLfo, forgeLfoGain);
    }
 
    if (zone === "harbor") {
      const waterOsc = ctx.createOscillator();
      waterOsc.type = "sine";
      waterOsc.frequency.setValueAtTime(0.5, ctx.currentTime);
 
      const waterGain = ctx.createGain();
      waterGain.gain.setValueAtTime(0.12, ctx.currentTime); // Increased harbor volume
 
      const waterMod = ctx.createOscillator();
      waterMod.frequency.setValueAtTime(0.1, ctx.currentTime);
      const waterModGain = ctx.createGain();
      waterModGain.gain.setValueAtTime(0.06, ctx.currentTime);
      waterMod.connect(waterModGain);
      waterModGain.connect(waterGain.gain);
      waterMod.start();
 
      waterOsc.connect(waterGain);
      waterGain.connect(masterGain);
      waterOsc.start();
      nodesRef.current.push(waterOsc, waterGain, waterMod, waterModGain);
    }
 
    if (zone === "academy") {
      const humOsc = ctx.createOscillator();
      humOsc.type = "sine";
      humOsc.frequency.setValueAtTime(80, ctx.currentTime);
 
      const humGain = ctx.createGain();
      humGain.gain.setValueAtTime(0.045, ctx.currentTime); // Increased academy hum volume
      const humFilter = ctx.createBiquadFilter();
      humFilter.type = "lowpass";
      humFilter.frequency.setValueAtTime(150, ctx.currentTime);
 
      humOsc.connect(humFilter);
      humFilter.connect(humGain);
      humGain.connect(masterGain);
      humOsc.start();
      nodesRef.current.push(humOsc, humGain, humFilter);
    }
 
    // --- Soft pad (base) ---
    const padOsc = ctx.createOscillator();
    padOsc.type = "sine";
    padOsc.frequency.setValueAtTime(55, ctx.currentTime);
    const padGain = ctx.createGain();
    padGain.gain.setValueAtTime(0.035, ctx.currentTime); // Increased base pad volume
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = "lowpass";
    padFilter.frequency.setValueAtTime(200, ctx.currentTime);
    padOsc.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(masterGain);
    padOsc.start();
    nodesRef.current.push(padOsc, padGain, padFilter);
 
    return () => {
      clearTimeout(chirpTimer);
      cleanupAudio(ctxRef, nodesRef);
    };
  }, [soundOn, zone]);
 
  return { currentZone: zone };
}
