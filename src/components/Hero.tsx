"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Heart,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Trophy,
  Utensils,
  Moon,
} from "lucide-react";
import { Avatar, AvatarGroup } from "@heroui/react";

const users = [
  {
    id: 1,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "John Doe",
  },
  {
    id: 2,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    name: "Kate Wilson",
  },
  {
    id: 3,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    name: "Emily Chen",
  },
  {
    id: 4,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    name: "Michael Brown",
  },
  {
    id: 5,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    name: "Olivia Davis",
  },
];

interface HeroProps {
  onOpenRoutineBuilder: () => void;
  onOpenGuidedSession: () => void;
}

export default function Hero({ onOpenRoutineBuilder, onOpenGuidedSession }: HeroProps) {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Carousel slides configuration with Unsplash imagery
  const slides = [
    {
      id: "strength-recovery",
      bgImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=80",
      badgeText: "SCIENCE-BACKED LONGEVITY & STRENGTH PROTOCOLS",
      badgeIcon: Sparkles,
      headlineMain: "Build Sustainable Strength.",
      headlineAccent: "Master Daily Recovery.",
      description:
        "Personalized hybrid workout routines, targeted nutritional planning, and mindful recovery trackers engineered to fit your life.",
      primaryActionText: "Build Your Routine",
      secondaryActionText: "Explore Guided Sessions (5 min)",
      metricLabel: "Joined by 14,000+ active movers this month",
      metricSub: "4.9/5 Rating • Progressive Overload Engine",
    },
    {
      id: "recovery-breathwork",
      bgImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=2000&q=80",
      badgeText: "PARASYMPATHETIC RESET & SLEEP ARCHITECTURE",
      badgeIcon: Moon,
      headlineMain: "Master Daily Recovery.",
      headlineAccent: "Rebuild Neuromuscular Power.",
      description:
        "Optimize autonomic recovery with 4-4-4-4 guided box breathing visualizers, restorative sleep tracking, and coach-led mobility flows.",
      primaryActionText: "Start Box Breathing (5 min)",
      secondaryActionText: "Build Your Routine",
      metricLabel: "88% Optimal Recovery Readiness",
      metricSub: "Zone 1 Parasympathetic Reset Active",
    },
    {
      id: "kirana-nutrition",
      bgImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=2000&q=80",
      badgeText: "HYPER-LOCAL KIRANA & STREET FUEL ENGINE",
      badgeIcon: Utensils,
      headlineMain: "Clean Whole-Food Fuel.",
      headlineAccent: "High-Protein Meals Under ₹150.",
      description:
        "AI Hyper-Local Chef maps fresh unpasteurized sattu, market paneer, and seasonal greens sourced within 2km of South Delhi / Lajpat Nagar.",
      primaryActionText: "Explore Local Meal Engine",
      secondaryActionText: "Build Your Routine",
      metricLabel: "38g Protein • 440 kcal per bowl",
      metricSub: "Average Local Cost: ₹85 • 100% Real Food",
    },
    {
      id: "global-arena",
      bgImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2000&q=80",
      badgeText: "SEASON 4 // GLOBAL GAMIFIED ARENA",
      badgeIcon: Trophy,
      headlineMain: "Compete In The Arena.",
      headlineAccent: "Earn Metallic Reward Tiers.",
      description:
        "Climb real-time leaderboards alongside 14,820+ athletes. Unlock ₹500 Kirana grocery credits and collect authentic canvas prestige badges.",
      primaryActionText: "Enter Global Arena (#42)",
      secondaryActionText: "Explore Guided Sessions",
      metricLabel: "14,820 Active Contenders Worldwide",
      metricSub: "Season 4 Apex Protocol • ₹50,000 FitMeal Prize",
    },
  ];

  // Auto-play carousel rotation (every 6.5s)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Rest countdown timer when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setRestTime((prev) => (prev > 0 ? prev - 1 : 45));
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

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const progressPercent = Math.round((currentSet / totalSets) * 100);
  const activeSlideData = slides[currentSlide];
  const BadgeIcon = activeSlideData.badgeIcon;

  return (
    <section className="relative w-full min-h-[70vh] lg:h-[70vh] flex flex-col justify-center overflow-hidden bg-[#0B0E0C]">
      {/* Dynamic Unsplash Background Carousel with Smooth Crossfade */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-105"
            } transform transition-transform duration-1000`}
          >
            <Image
              src={slide.bgImage}
              alt={slide.headlineMain}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}

        {/* High-Contrast Gradient Darkening Overlays for Razor-Sharp Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E0C] via-[#0B0E0C]/90 to-[#0B0E0C]/65 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C] via-transparent to-[#0B0E0C]/50 z-10" />
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/4 -z-0 w-96 h-96 bg-[#757761]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 -z-0 w-96 h-96 bg-[#f7fe72]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Viewport */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
          
          {/* Left Column (58% desktop width): Carousel Slide Content */}
          <div className="w-full lg:w-[58%] flex flex-col items-start space-y-4 sm:space-y-5 animate-in fade-in duration-500">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121815]/80 backdrop-blur-md border border-[#757761]/40 text-[#f7fe72] text-xs font-bold tracking-wider uppercase shadow-sm">
              <BadgeIcon className="w-3.5 h-3.5 text-[#f7fe72]" />
              <span>{activeSlideData.badgeText}</span>
            </div>

            {/* Carousel Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.08] text-balance">
              {activeSlideData.headlineMain}{" "}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f4e76e] to-[#f7fe72]">
                {activeSlideData.headlineAccent}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#CBD2C7] leading-relaxed max-w-xl font-normal">
              {activeSlideData.description}
            </p>

            {/* Action Buttons Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full sm:w-auto">
              {currentSlide === 3 ? (
                <Link
                  href="/leaderboards"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] font-black text-sm sm:text-base shadow-lg shadow-[#f7fe72]/20 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Trophy className="w-4 h-4" />
                  <span>{activeSlideData.primaryActionText}</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              ) : currentSlide === 2 ? (
                <button
                  onClick={() => {
                    document.getElementById("nutrition-engine-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] font-black text-sm sm:text-base shadow-lg shadow-[#f7fe72]/20 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Utensils className="w-4 h-4" />
                  <span>{activeSlideData.primaryActionText}</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              ) : currentSlide === 1 ? (
                <button
                  onClick={onOpenGuidedSession}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] font-black text-sm sm:text-base shadow-lg shadow-[#f7fe72]/20 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <Play className="w-4 h-4 fill-[#0B0E0C]" />
                  <span>{activeSlideData.primaryActionText}</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              ) : (
                <button
                  onClick={onOpenRoutineBuilder}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] font-black text-sm sm:text-base shadow-lg shadow-[#f7fe72]/20 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span>{activeSlideData.primaryActionText}</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}

              {/* Secondary Ghost Button */}
              <button
                onClick={currentSlide === 1 ? onOpenRoutineBuilder : onOpenGuidedSession}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded-full bg-[#f7fe72]/20 text-[#f7fe72] flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>{activeSlideData.secondaryActionText}</span>
              </button>
            </div>

            {/* Social Proof & Metrics Strip with HeroUI AvatarGroup */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5 text-xs sm:text-sm text-slate-300">
              <AvatarGroup className="shrink-0">
                {users.slice(0, 4).map((user) => (
                  <Avatar key={user.id} className="border-2 border-[#0B0E0C] shadow-sm">
                    <Avatar.Image alt={user.name} src={user.image} />
                    <Avatar.Fallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar.Fallback>
                  </Avatar>
                ))}
              </AvatarGroup>

              <div className="flex flex-col">
                <span className="font-bold text-white leading-tight">
                  {activeSlideData.metricLabel}
                </span>
                <span className="text-[11px] sm:text-xs text-[#f7fe72] font-mono">
                  {activeSlideData.metricSub}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Interactive Workout Telemetry Card */}
          <div className="hidden lg:flex w-[42%] justify-end animate-in fade-in duration-700">
            <div className="w-full max-w-sm xl:max-w-md bg-[#121815]/90 backdrop-blur-xl rounded-3xl p-5 border border-[#757761]/35 shadow-2xl relative text-white">
              
              {/* Top Card Bar with Live Activity & Category */}
              <div className="flex items-center justify-between pb-3 border-b border-[#757761]/25">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-[#f7fe72]' : 'bg-[#757761]'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? 'bg-[#f7fe72]' : 'bg-[#757761]'}`}></span>
                  </span>
                  <span className="text-[11px] font-bold tracking-wider text-[#E2E7DE] uppercase font-mono">
                    {isPlaying ? "ACTIVE TRAINING SESSION" : "SESSION PAUSED"}
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#757761]/25 text-[#f4e76e] border border-[#757761]/30 font-mono">
                  BLOCK 2 // HYPERTROPHY
                </span>
              </div>

              {/* Demonstration thumbnail canvas */}
              <div className="mt-3 relative rounded-xl overflow-hidden aspect-[16/9] flex items-end p-3 text-white shadow-inner border border-[#757761]/30 bg-[#0B0E0C]">
                {/* Visual geometric gym backdrop simulation */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(247,254,114,0.3)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                  </svg>
                </div>

                {/* Athlete Silhouette / Dynamic SVG Graphic */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border border-[#757761]/30 flex items-center justify-center animate-pulse">
                      <div className="w-14 h-14 rounded-full border border-[#f7fe72]/40 flex items-center justify-center">
                        <svg className="w-8 h-8 text-[#f7fe72] stroke-current fill-none stroke-[1.8]" viewBox="0 0 24 24">
                          <circle cx="12" cy="5" r="3" />
                          <path d="M7 21v-4l3-3 2 2 3-5 5 4" />
                          <path d="M5 11l4 2 3-2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top overlay badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#18201A] border border-[#757761]/40 text-white backdrop-blur-sm">
                    4K COACH DEMO
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-black/60 text-[#f4e76e] backdrop-blur-sm border border-[#757761]/30">
                    FORM: 98% MATCH
                  </span>
                </div>

                {/* Bottom Exercise Overlay Info */}
                <div className="relative z-10 w-full flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-[#f7fe72] font-semibold uppercase tracking-wider">Current Movement</p>
                    <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">{currentExercise.name}</p>
                    <p className="text-[10px] text-[#CBD2C7]">{currentExercise.target} • {currentExercise.load}</p>
                  </div>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] text-[#0B0E0C] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0 ml-2 hover:brightness-110"
                    aria-label={isPlaying ? "Pause workout" : "Resume workout"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-[#0B0E0C] text-[#0B0E0C]" /> : <Play className="w-3.5 h-3.5 fill-[#0B0E0C] text-[#0B0E0C] ml-0.5" />}
                  </button>
                </div>
              </div>

              {/* Real-time Heartbeat BPM Graph & Telemetry */}
              <div className="mt-3 p-3 rounded-2xl bg-[#0B0E0C] border border-[#757761]/30">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Heart className={`w-3.5 h-3.5 text-[#f7fe72] fill-[#f7fe72] ${isPlaying ? 'animate-pulse' : ''}`} />
                    <span className="text-[11px] font-bold text-[#E2E7DE]">Cardiovascular Load</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-white font-mono tabular-nums">{bpm}</span>
                    <span className="text-[10px] text-[#A0A493] font-medium">BPM</span>
                    <span className="text-[9px] font-bold text-[#f4e76e] bg-[#757761]/25 border border-[#757761]/40 px-1 py-0.5 rounded ml-1">
                      Zone 3
                    </span>
                  </div>
                </div>

                {/* SVG ECG Waveform */}
                <div className="w-full h-8 bg-[#121815] rounded-lg border border-[#757761]/30 px-2 flex items-center overflow-hidden relative">
                  <svg className="w-full h-6 text-[#f7fe72] stroke-current fill-none stroke-[2]" viewBox="0 0 300 40" preserveAspectRatio="none">
                    <path
                      d="M0 20 L40 20 L50 20 L55 8 L65 32 L75 14 L85 24 L95 20 L140 20 L150 20 L155 5 L165 35 L175 12 L185 25 L195 20 L240 20 L250 20 L255 10 L265 30 L275 16 L285 22 L300 20"
                      className={isPlaying ? "transition-all duration-300" : "opacity-60"}
                    />
                  </svg>
                  {isPlaying && (
                    <div className="absolute inset-y-0 right-1/4 w-0.5 bg-[#f7fe72] shadow-[0_0_8px_rgba(247,254,114,0.8)]" />
                  )}
                </div>
              </div>

              {/* Set Counter & Progress */}
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#0B0E0C] border border-[#757761]/30 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#A0A594]">Active Set</span>
                    <span className="text-[10px] font-bold text-[#f7fe72] bg-[#f7fe72]/15 border border-[#f7fe72]/30 px-1.5 py-0.2 rounded font-mono">
                      {restTime > 0 ? "REST" : "LIFT"}
                    </span>
                  </div>
                  <div className="my-1">
                    <div className="text-base font-black text-white font-mono">
                      Set {currentSet} / {totalSets}
                    </div>
                    <p className="text-[10px] text-[#A0A493] font-mono tabular-nums">
                      {restTime}s Rest Interval
                    </p>
                  </div>
                  <button
                    onClick={handleNextSet}
                    className="w-full py-1 px-2 bg-[#f7fe72] hover:brightness-110 text-[#0B0E0C] rounded text-[11px] font-black transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>{currentSet < totalSets ? "Log Set" : "Complete"}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0B0E0C] border border-[#757761]/30 flex items-center gap-2">
                  <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                    <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 36 36">
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
                    <span className="absolute text-[10px] font-black text-white font-mono">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#A0A594]">Volume Moved</span>
                    <span className="text-sm font-black text-white font-mono tabular-nums">
                      {(currentExercise.volumeKg * (currentSet / totalSets)).toLocaleString()}
                    </span>
                    <span className="text-[9px] text-[#A0A493]">kg cumulative</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Switch */}
              <div className="mt-2.5 pt-2 border-t border-[#757761]/25 flex items-center justify-between text-[11px] text-[#A0A493]">
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

      {/* Carousel Navigation Bottom Bar: Indicators & Controls */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-3 pt-1 flex items-center justify-between">
        
        {/* Slide Indicators / Tabs */}
        <div className="flex items-center gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`group flex items-center gap-2 py-1.5 px-3 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? "bg-[#f7fe72] text-[#0B0E0C] shadow-md shadow-[#f7fe72]/20 font-bold"
                  : "bg-white/10 hover:bg-white/20 text-[#CBD2C7] backdrop-blur-md"
              }`}
              aria-label={`Go to slide ${idx + 1}: ${slide.headlineMain}`}
            >
              <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
              <span className="hidden sm:inline text-xs truncate max-w-[130px]">{slide.headlineMain.replace(".", "")}</span>
            </button>
          ))}
        </div>

        {/* Carousel Arrow Controls & Autoplay Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            aria-label={isAutoPlaying ? "Pause carousel auto-play" : "Start carousel auto-play"}
            title={isAutoPlaying ? "Pause auto-advance" : "Resume auto-advance"}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={handlePrevSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNextSlide}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
