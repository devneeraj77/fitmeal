"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Heart, ChevronRight } from "lucide-react";

interface HeroProps {
  onOpenRoutineBuilder: () => void;
  onOpenGuidedSession: () => void;
}

export default function Hero({ onOpenRoutineBuilder, onOpenGuidedSession }: HeroProps) {
  // Interactive workout player states
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSet, setCurrentSet] = useState(3);
  const totalSets = 4;
  const [restTime, setRestTime] = useState(45);
  const [bpm, setBpm] = useState(142);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);

  const exercises = [
    {
      name: "Kettlebell Romanian Deadlift to Clean",
      target: "Posterior Chain & Explosive Power",
      load: "2x 24kg Bell Pairs",
      volumeKg: 18400,
    },
    {
      name: "Barbell Front Squat (Tempo 3-1-X-1)",
      target: "Quadriceps & Core Bracing",
      load: "102.5 kg Barbell",
      volumeKg: 21600,
    },
    {
      name: "Overhead Thoracic Mobility Flow",
      target: "Scapular Rhythm & Rotator Cuff",
      load: "Bodyweight + Mobility Band",
      volumeKg: 9800,
    },
  ];

  const currentExercise = exercises[currentExerciseIdx];

  // Rest countdown timer when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setRestTime((prev) => (prev > 0 ? prev - 1 : 45));
        // Subtle realistic BPM fluctuation
        setBpm((prev) => {
          const delta = (Math.random() - 0.48) * 3;
          const next = Math.round(prev + delta);
          return Math.min(Math.max(next, 137), 148);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNextSet = () => {
    if (currentSet < totalSets) {
      setCurrentSet((s) => s + 1);
      setRestTime(60);
    } else {
      setCurrentSet(1);
      setRestTime(45);
      setCurrentExerciseIdx((idx) => (idx + 1) % exercises.length);
    }
  };

  const progressPercent = Math.round((currentSet / totalSets) * 100);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background aesthetic gradient glow */}
      <div className="absolute top-12 left-1/4 -z-10 w-96 h-96 bg-[#9c67b5]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 -z-10 w-96 h-96 bg-[#f7fe72]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-14">
          
          {/* Left Column (55% desktop width) */}
          <div className="w-full lg:w-[55%] flex flex-col items-start space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9c67b5]/15 border border-[#9c67b5]/30 text-[#f7fe72] text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#f7fe72] shrink-0 shadow-[0_0_8px_#f7fe72]" />
              <span>SCIENCE-BACKED LONGEVITY &amp; STRENGTH PROTOCOLS</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance">
              Build Sustainable Strength. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9c67b5] via-[#f4e76e] to-[#f7fe72]">
                Master Daily Recovery.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#A0A493] leading-relaxed max-w-xl font-normal">
              Personalized hybrid workout routines, targeted nutritional planning, and mindful recovery trackers engineered to fit your life.
            </p>

            {/* Action Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full sm:w-auto">
              {/* Primary high-voltage CTA button (#f7fe72 / #f4e76e) */}
              <button
                onClick={onOpenRoutineBuilder}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] font-black text-base shadow-lg shadow-[#f7fe72]/20 hover:shadow-xl transition-all duration-200 active:scale-98 whitespace-nowrap cursor-pointer"
              >
                <span>Build Your Routine</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Ghost button featuring play icon */}
              <button
                onClick={onOpenGuidedSession}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#121815] hover:bg-[#181f1b] border border-[#757761]/40 text-[#E2E7DE] font-medium text-base shadow-xs hover:border-[#9c67b5]/60 transition-all duration-200 active:scale-98 whitespace-nowrap cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#9c67b5]/30 text-[#f7fe72] flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Explore Guided Sessions (5 min)</span>
              </button>
            </div>

            {/* Social Proof Ticker */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-sm text-[#A0A493]">
              {/* Avatar stack */}
              <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0B0E0C] bg-[#2D163D] text-[#f7fe72] font-bold text-xs flex items-center justify-center shadow-xs border border-[#9c67b5]/40">
                  DK
                </div>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0B0E0C] bg-[#121815] text-[#f4e76e] font-bold text-xs flex items-center justify-center shadow-xs border border-[#757761]/40">
                  ST
                </div>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0B0E0C] bg-[#9c67b5]/30 text-white font-bold text-xs flex items-center justify-center shadow-xs border border-[#9c67b5]/50">
                  MJ
                </div>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0B0E0C] bg-[#181f1b] text-[#f7fe72] font-bold text-xs flex items-center justify-center shadow-xs border border-[#757761]/50">
                  AL
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#f4e76e]">
                  {"★".repeat(5)}
                  <span className="text-xs font-semibold text-[#CBD2C7] ml-1">4.9/5</span>
                </div>
                <p className="text-sm font-medium text-[#CBD2C7]">
                  Joined by <strong className="font-bold text-white">14,000+ active movers</strong> this month
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (45% desktop width): Floating card mockup showing interactive workout player */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#121815] rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/70 border border-[#757761]/30 relative group transition-all duration-300 hover:border-[#9c67b5]/50">
              
              {/* Top Card Bar with Live Activity & Category */}
              <div className="flex items-center justify-between pb-4 border-b border-[#757761]/25">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-[#f7fe72]' : 'bg-[#757761]'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? 'bg-[#f7fe72]' : 'bg-[#757761]'}`}></span>
                  </span>
                  <span className="text-xs font-bold tracking-wider text-[#E2E7DE] uppercase font-mono">
                    {isPlaying ? "ACTIVE TRAINING SESSION" : "SESSION PAUSED"}
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#9c67b5]/20 text-[#f4e76e] border border-[#9c67b5]/30 font-mono">
                  BLOCK 2 // HYPERTROPHY
                </span>
              </div>

              {/* High-res athlete demonstration thumbnail / mockup canvas */}
              <div className="mt-4 relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#121815] via-[#1a1528] to-[#2D163D] aspect-[16/9] flex items-end p-4 text-white shadow-inner border border-[#9c67b5]/30">
                {/* Visual geometric gym backdrop simulation */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(247,254,114,0.3)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Athlete Silhouette / Dynamic SVG Graphic */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full border border-[#9c67b5]/30 flex items-center justify-center animate-pulse">
                      <div className="w-20 h-20 rounded-full border border-[#f7fe72]/40 flex items-center justify-center">
                        <svg className="w-12 h-12 text-[#f7fe72] stroke-current fill-none stroke-[1.8]" viewBox="0 0 24 24">
                          <circle cx="12" cy="5" r="3" />
                          <path d="M7 21v-4l3-3 2 2 3-5 5 4" />
                          <path d="M5 11l4 2 3-2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top overlay badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#9c67b5] text-white backdrop-blur-sm shadow-xs">
                    4K COACH DEMO
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-black/60 text-[#f4e76e] backdrop-blur-sm border border-[#757761]/30">
                    FORM: 98% MATCH
                  </span>
                </div>

                {/* Bottom Exercise Overlay Info */}
                <div className="relative z-10 w-full flex items-end justify-between">
                  <div>
                    <p className="text-xs text-[#f7fe72] font-semibold uppercase tracking-wider">Current Movement</p>
                    <p className="text-sm sm:text-base font-bold text-white line-clamp-1">{currentExercise.name}</p>
                    <p className="text-xs text-[#CBD2C7] mt-0.5">{currentExercise.target} • {currentExercise.load}</p>
                  </div>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] text-[#0B0E0C] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0 ml-2 hover:brightness-110"
                    aria-label={isPlaying ? "Pause workout" : "Resume workout"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-[#0B0E0C] text-[#0B0E0C]" /> : <Play className="w-4 h-4 fill-[#0B0E0C] text-[#0B0E0C] ml-0.5" />}
                  </button>
                </div>
              </div>

              {/* Real-time Heartbeat BPM Graph & Telemetry */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#0B0E0C] border border-[#757761]/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Heart className={`w-4 h-4 text-[#f7fe72] fill-[#f7fe72] ${isPlaying ? 'animate-pulse' : ''}`} />
                    <span className="text-xs font-bold text-[#E2E7DE]">Cardiovascular Load</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-white font-mono tabular-nums">{bpm}</span>
                    <span className="text-xs text-[#A0A493] font-medium">BPM</span>
                    <span className="text-[10px] font-bold text-[#f4e76e] bg-[#9c67b5]/25 border border-[#9c67b5]/40 px-1.5 py-0.5 rounded ml-1">
                      Zone 3
                    </span>
                  </div>
                </div>

                {/* Interactive SVG ECG / BPM Waveform Graph */}
                <div className="w-full h-11 bg-[#121815] rounded-xl border border-[#757761]/30 px-2 flex items-center overflow-hidden relative">
                  <svg className="w-full h-8 text-[#f7fe72] stroke-current fill-none stroke-[2]" viewBox="0 0 300 40" preserveAspectRatio="none">
                    <path
                      d="M0 20 L40 20 L50 20 L55 8 L65 32 L75 14 L85 24 L95 20 L140 20 L150 20 L155 5 L165 35 L175 12 L185 25 L195 20 L240 20 L250 20 L255 10 L265 30 L275 16 L285 22 L300 20"
                      className={isPlaying ? "transition-all duration-300" : "opacity-60"}
                    />
                  </svg>
                  {/* Subtle sweep scanline indicator */}
                  {isPlaying && (
                    <div className="absolute inset-y-0 right-1/4 w-0.5 bg-[#f7fe72] shadow-[0_0_8px_rgba(247,254,114,0.8)]" />
                  )}
                </div>
              </div>

              {/* Active Set Counter & Volume Progress Ring */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {/* Active Set Counter Box */}
                <div className="p-3.5 rounded-2xl bg-[#0B0E0C] border border-[#757761]/30 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#A0A594]">Active Set</span>
                    <span className="text-[11px] font-bold text-[#f7fe72] bg-[#f7fe72]/15 border border-[#f7fe72]/30 px-2 py-0.5 rounded-full font-mono">
                      {restTime > 0 ? "REST" : "LIFT"}
                    </span>
                  </div>
                  <div className="my-2">
                    <div className="text-xl font-black text-white font-mono tracking-tight">
                      Set {currentSet} of {totalSets}
                    </div>
                    <p className="text-xs text-[#A0A493] font-mono tabular-nums mt-0.5">
                      • {restTime}s Rest Interval
                    </p>
                  </div>
                  <button
                    onClick={handleNextSet}
                    className="w-full py-1.5 px-2 bg-[#9c67b5] hover:bg-[#8651a0] text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                  >
                    <span>{currentSet < totalSets ? "Log Set & Rest" : "Complete Exercise"}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Volume Progress Ring Box */}
                <div className="p-3.5 rounded-2xl bg-[#0B0E0C] border border-[#757761]/30 flex items-center gap-3">
                  {/* Circular SVG Ring */}
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                    <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-[#757761]/25 stroke-current stroke-[3.5] fill-none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#f7fe72] stroke-current stroke-[3.5] stroke-linecap-round fill-none transition-all duration-500"
                        strokeDasharray={`${progressPercent}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-xs font-black text-white font-mono">
                      {progressPercent}%
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#A0A594]">Volume Moved</span>
                    <span className="text-base font-black text-white font-mono tabular-nums">
                      {(currentExercise.volumeKg * (currentSet / totalSets)).toLocaleString()}
                    </span>
                    <span className="text-[11px] text-[#A0A493]">kg cumulative</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Switch Hint */}
              <div className="mt-3.5 pt-3 border-t border-[#757761]/25 flex items-center justify-between text-xs text-[#A0A493]">
                <span className="truncate">Exercise {currentExerciseIdx + 1} of {exercises.length}</span>
                <button
                  onClick={() => setCurrentExerciseIdx((idx) => (idx + 1) % exercises.length)}
                  className="text-[#f4e76e] hover:text-[#f7fe72] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Switch Movement</span>
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
