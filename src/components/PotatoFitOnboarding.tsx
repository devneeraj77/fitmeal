"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Droplets,
  Footprints,
  Dumbbell,
  Flame,
  Zap,
  Trophy,
  ArrowRight,
  MapPin,
  Compass,
  CheckCircle2,
  Radar,
  ShoppingBag,
  Store,
  ChevronRight,
  Shield,
  Activity,
  Layers,
  Award,
  Globe2,
  X,
  RefreshCw,
  Search,
  Sparkle
} from "lucide-react";
import PotatoFitLogo from "./PotatoFitLogo";
import { fireTierUnlockConfetti } from "@/lib/confetti";

export type AthleteLevelId = "spud-rookie" | "street-athlete" | "apex-competitor";

export interface AthleteLevel {
  id: AthleteLevelId;
  name: string;
  tagline: string;
  tag: string;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  metrics: {
    hydration: string;
    movement: string;
    macroFocus: string;
    radiusTarget: string;
  };
  dailyQuestSnippet: string;
  targetUserGroup: string;
  xpBonus: string;
}

const ATHLETE_LEVELS: AthleteLevel[] = [
  {
    id: "spud-rookie",
    name: "Spud Rookie",
    tagline: "Just getting started, focusing on hitting water and step goals.",
    tag: "TIER 01 • FOUNDATION",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    borderColor: "hover:border-emerald-500/60",
    glowColor: "rgba(16, 185, 129, 0.2)",
    icon: Droplets,
    iconBg: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    iconColor: "text-emerald-400",
    metrics: {
      hydration: "3.0L Water / day",
      movement: "8,000 Baseline Steps",
      macroFocus: "2x Fresh Local Veggie Servings",
      radiusTarget: "2.5 km Local Produce Stalls",
    },
    dailyQuestSnippet: "Quest: Drink 1L before 10 AM & secure 1 seasonal green bunch.",
    targetUserGroup: "Zero intimidation, sustainable habit formation",
    xpBonus: "+250 XP Starting Surge",
  },
  {
    id: "street-athlete",
    name: "Street Athlete",
    tagline: "Workouts established, need hyper-local macro planning.",
    tag: "TIER 02 • OPTIMIZATION",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    borderColor: "hover:border-amber-500/80",
    glowColor: "rgba(245, 158, 11, 0.25)",
    icon: Dumbbell,
    iconBg: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    iconColor: "text-amber-400",
    metrics: {
      hydration: "3.8L Water / day",
      movement: "4x Weekly Strength & Conditioning",
      macroFocus: "160g High-Bioavailability Protein",
      radiusTarget: "5.0 km Local Vendor Radar",
    },
    dailyQuestSnippet: "Quest: High-protein meal prep mapped to nearby farm eggs & legumes.",
    targetUserGroup: "Gym-goers, calisthenics & hybrid runners",
    xpBonus: "+450 XP Athlete Surge",
  },
  {
    id: "apex-competitor",
    name: "Apex Competitor",
    tagline: "Aiming for top 5% on the global leaderboard.",
    tag: "TIER 03 • GLOBAL APEX",
    badgeColor: "bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-300 border-amber-400/40",
    borderColor: "hover:border-amber-400",
    glowColor: "rgba(245, 158, 11, 0.35)",
    icon: Trophy,
    iconBg: "bg-gradient-to-tr from-amber-500/30 via-emerald-500/20 to-amber-400/30 text-amber-300 border border-amber-400/40",
    iconColor: "text-amber-300",
    metrics: {
      hydration: "4.5L Electrolyte Water",
      movement: "Daily Periodized Performance & PvP",
      macroFocus: "Precision Nutrient Timing & Root Carbs",
      radiusTarget: "10.0 km Full Producer Network",
    },
    dailyQuestSnippet: "Quest: Pre-exhaustion workout + apex recovery bowl from 3 local vendors.",
    targetUserGroup: "Competitive athletes, top 5% leaderboard contenders",
    xpBonus: "+800 XP Apex Crown Surge",
  },
];

interface LocalVendor {
  id: string;
  name: string;
  type: string;
  distance: string;
  freshHighlight: string;
  macroMatch: string;
  verifiedLocal: boolean;
}

const SAMPLE_VENDORS: LocalVendor[] = [
  {
    id: "v1",
    name: "Sunburst Organic Farm Stand",
    type: "Local Vegetable Grower",
    distance: "0.8 km (9 min walk)",
    freshHighlight: "Heirloom sweet potatoes, baby spinach & organic kale",
    macroMatch: "Apex Complex Carbohydrates & Fiber",
    verifiedLocal: true,
  },
  {
    id: "v2",
    name: "Highland Pastures Dairy & Eggs",
    type: "Cooperative Grocer",
    distance: "1.4 km (4 min cycle)",
    freshHighlight: "Pasture-raised farm eggs, raw curd, artisanal cottage cheese",
    macroMatch: "High-Bioavailability Leucine & Protein",
    verifiedLocal: true,
  },
  {
    id: "v3",
    name: "Verdant Valley Green Grocers",
    type: "Neighborhood Produce Market",
    distance: "2.1 km (7 min cycle)",
    freshHighlight: "Beetroot juice, organic avocados, fresh citrus electrolytes",
    macroMatch: "Nitric Oxide Booster & Healthy Monounsaturates",
    verifiedLocal: true,
  },
  {
    id: "v4",
    name: "Pioneer Grain & Sprout Depot",
    type: "Bulk Organic Wholesaler",
    distance: "3.2 km (9 min drive)",
    freshHighlight: "Sprouted black lentils, steel-cut oats, organic chia seeds",
    macroMatch: "Low-GI Energy & Sustained Glycogen Replenishment",
    verifiedLocal: true,
  },
];

interface PotatoFitOnboardingProps {
  onContinueToDashboard?: () => void;
  onExploreFullPlatform?: () => void;
}

export default function PotatoFitOnboarding({
  onContinueToDashboard,
  onExploreFullPlatform,
}: PotatoFitOnboardingProps) {
  const [selectedLevelId, setSelectedLevelId] = useState<AthleteLevelId>("street-athlete");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionStep, setDetectionStep] = useState<number>(0);
  const [isRadarModalOpen, setIsRadarModalOpen] = useState(false);
  const [userLocationName, setUserLocationName] = useState("Downtown District • 3.2km Radius");
  const [radarSweepAngle, setRadarSweepAngle] = useState(0);

  const selectedLevel = ATHLETE_LEVELS.find((lvl) => lvl.id === selectedLevelId) || ATHLETE_LEVELS[1];

  // Subtle radar sweep effect when modal opens
  useEffect(() => {
    if (!isRadarModalOpen) return;
    const interval = setInterval(() => {
      setRadarSweepAngle((prev) => (prev + 4) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, [isRadarModalOpen]);

  // Handle Primary Action: "Detect My Local Food Radius & Begin →"
  const handleDetectRadius = () => {
    setIsDetecting(true);
    setDetectionStep(1);

    // Simulated scanning sequence for thrilling athletic feedback
    setTimeout(() => {
      setDetectionStep(2);
    }, 600);

    setTimeout(() => {
      setDetectionStep(3);
    }, 1300);

    setTimeout(() => {
      setIsDetecting(false);
      setDetectionStep(0);
      setIsRadarModalOpen(true);
      fireTierUnlockConfetti();
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] text-slate-100 font-sans selection:bg-[#F59E0B] selection:text-slate-950 flex flex-col relative overflow-x-hidden">
      {/* Dynamic Ambient Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#F59E0B]/15 rounded-full blur-[140px]" />
        <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-[#10B981]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/5 rounded-full blur-[160px]" />
        {/* Subtle athletic coordinate grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* 1. Header Bar */}
      <header className="relative z-10 w-full border-b border-slate-800/80 bg-[#0F172A]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Modern PotatoFit Faceted Logo */}
          <PotatoFitLogo size="md" />

          {/* Quick Nav Links / Status */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[#10B981]">Vendor Radar Active</span>
              <span className="text-slate-500">|</span>
              <span className="text-amber-400 font-mono">5.2k+ Grocers Mapped</span>
            </div>

            <Link
              href="/leaderboards"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Global Ladder</span>
            </Link>

            {onContinueToDashboard ? (
              <button
                onClick={onContinueToDashboard}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm"
              >
                <span>Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm"
              >
                <span>Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Hero & Onboarding Flow */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {/* Athletic Badge Tag */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(245,158,11,0.15)] animate-fade-in">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span>HYPER-LOCAL ATHLETIC NUTRITION PLATFORM</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-emerald-400 font-mono">SEASON 04 LIVE</span>
          </div>
        </div>

        {/* 2. Central Value Proposition */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-5">
            From Couch Potato to{" "}
            <span className="bg-gradient-to-r from-[#F59E0B] via-amber-300 to-[#10B981] bg-clip-text text-transparent drop-shadow-sm">
              Global Apex.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            AI-driven nutrition mapped to your nearest vegetable vendors and local grocers. Fuel
            smart, track daily quests, and compete with athletes worldwide.
          </p>

          {/* Quick Feature Pillars */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              Local Farm Radius
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              AI Macro Calibration
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Daily Habit Quests
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              Global Leaderboard
            </span>
          </div>
        </div>

        {/* 3. Interactive Starting Level Selector */}
        <section className="mb-8 sm:mb-10" aria-label="Starting Level Selector">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-2">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
                Step 01 / Calibrate Baseline
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Select Your Starting Level
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              You can adjust this anytime as your physical fitness transforms.
            </p>
          </div>

          {/* The 3 Clickable Level Cards with Subtle Hover Lift & Golden Border Glow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {ATHLETE_LEVELS.map((level) => {
              const isSelected = selectedLevelId === level.id;
              const IconComponent = level.icon;

              return (
                <div
                  key={level.id}
                  onClick={() => setSelectedLevelId(level.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedLevelId(level.id);
                    }
                  }}
                  className={`relative group rounded-2xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 transform text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isSelected
                      ? "bg-slate-800/95 border-2 border-[#F59E0B] shadow-[0_0_35px_rgba(245,158,11,0.3)] -translate-y-2 ring-1 ring-amber-500/50"
                      : "bg-slate-900/80 border border-slate-800 hover:border-amber-500/70 hover:shadow-[0_0_28px_rgba(245,158,11,0.22)] hover:-translate-y-1.5"
                  }`}
                >
                  {/* Glowing selection corner accent */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/20 via-transparent to-transparent rounded-tr-2xl pointer-events-none" />
                  )}

                  <div>
                    {/* Header Row: Tier Badge & Selection Radio/Check */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border ${level.badgeColor}`}
                      >
                        {level.tag}
                      </span>

                      {/* Interactive Radio / Check indicator */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? "bg-[#F59E0B] text-slate-950 shadow-md shadow-amber-500/40"
                            : "border-2 border-slate-700 group-hover:border-amber-400/60"
                        }`}
                      >
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-amber-400/60 transition-colors" />
                        )}
                      </div>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3.5 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${level.iconBg}`}
                      >
                        <IconComponent className={`w-6 h-6 ${level.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
                          {level.name}
                        </h3>
                        <span className="text-[11px] font-mono font-bold text-emerald-400">
                          {level.xpBonus}
                        </span>
                      </div>
                    </div>

                    {/* Value Proposition Description */}
                    <p className="text-sm text-slate-300 leading-relaxed font-normal mb-5">
                      {level.tagline}
                    </p>

                    {/* Target Metrics Blueprint */}
                    <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5 text-blue-400" />
                          Hydration Target
                        </span>
                        <span className="font-semibold text-slate-200">
                          {level.metrics.hydration}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Footprints className="w-3.5 h-3.5 text-emerald-400" />
                          Movement Baseline
                        </span>
                        <span className="font-semibold text-slate-200">
                          {level.metrics.movement}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                          Macro Planning
                        </span>
                        <span className="font-semibold text-slate-200">
                          {level.metrics.macroFocus}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                          Vendor Distance
                        </span>
                        <span className="font-semibold text-slate-200">
                          {level.metrics.radiusTarget}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Active Status / Click Indication */}
                  <div className="mt-5 pt-3.5 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold">
                    <span
                      className={`transition-colors ${
                        isSelected ? "text-amber-400 font-bold" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {isSelected ? "✓ Active Selected Path" : "Click to calibrate"}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {level.targetUserGroup}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Selected Tier Dynamic Summary Banner */}
        <div className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span>
              Configured Level:{" "}
              <strong className="text-white font-bold">{selectedLevel.name}</strong>{" "}
              <span className="text-slate-400">({selectedLevel.tag})</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{selectedLevel.dailyQuestSnippet}</span>
          </div>
        </div>

        {/* 4. Primary Action: Full-width golden-amber pill button */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={handleDetectRadius}
            disabled={isDetecting}
            className="w-full relative group overflow-hidden rounded-full bg-gradient-to-r from-[#F59E0B] via-amber-400 to-[#F59E0B] hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg tracking-wide py-4 sm:py-5 px-8 shadow-[0_10px_35px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.5)] transform active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-80 flex items-center justify-center gap-3"
            title="Scan nearby vegetable stalls, farmer markets & start your customized daily quest"
          >
            {/* Shimmer sweep animation across pill button */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            {isDetecting ? (
              <>
                <RefreshCw className="w-5 h-5 text-slate-950 animate-spin" />
                <span>
                  {detectionStep === 1 && "Acquiring GPS Coordinates & Radius..."}
                  {detectionStep === 2 && "Triangulating Local Produce Stalls..."}
                  {detectionStep === 3 && "Calibrating Day 1 Quest for " + selectedLevel.name + "..."}
                </span>
              </>
            ) : (
              <>
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 group-hover:rotate-45 transition-transform duration-300" />
                <span>{"Detect My Local Food Radius & Begin →"}</span>
              </>
            )}
          </button>

          {/* Micro-guarantee & trust markers under button */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#10B981]" />
              Zero ads, 100% verified local grocers
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              Hyper-local 3km to 10km radar
            </span>
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Global Leaderboard Sync Included
            </span>
          </div>
        </div>
      </main>

      {/* Footer Details */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#0F172A]/90 py-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">POTATOFIT</span>
            <span>&bull;</span>
            <span>From Couch Potato to Global Apex</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
              Athlete Dashboard
            </Link>
            <span>&bull;</span>
            <Link href="/leaderboards" className="hover:text-amber-400 transition-colors">
              Leaderboards
            </Link>
            {onExploreFullPlatform && (
              <>
                <span>&bull;</span>
                <button
                  onClick={onExploreFullPlatform}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Full Platform View
                </button>
              </>
            )}
          </div>
        </div>
      </footer>

      {/* 5. Interactive Radar Modal: Triggered after "Detect My Local Food Radius & Begin →" */}
      {isRadarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0F172A] border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.25)] flex flex-col max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-[#F59E0B] flex items-center justify-center">
                  <Radar className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                      Radius Locked
                    </span>
                    <span className="text-xs text-slate-400 font-mono">GPS 30.2672° N, 97.7431° W</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Local Food Radar Calibrated!
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsRadarModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Radar Visualizer Animation */}
            <div className="relative w-full h-44 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center mb-6">
              {/* Radar concentric range circles */}
              <div className="absolute w-24 h-24 rounded-full border border-emerald-500/30" />
              <div className="absolute w-44 h-44 rounded-full border border-emerald-500/20" />
              <div className="absolute w-64 h-64 rounded-full border border-emerald-500/10" />

              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-emerald-500/20" />
              <div className="absolute h-full w-[1px] bg-emerald-500/20" />

              {/* Sweeping radar line */}
              <div
                className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left pointer-events-none"
                style={{
                  transform: `rotate(${radarSweepAngle}deg)`,
                  background:
                    "conic-gradient(from 180deg at 0% 100%, transparent 60deg, rgba(16, 185, 129, 0.45) 90deg)",
                }}
              />

              {/* Center user dot (You) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 shadow-[0_0_12px_#F59E0B] animate-ping" />
                <span className="text-[10px] font-bold text-amber-300 mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded">
                  YOU ({selectedLevel.name})
                </span>
              </div>

              {/* Detected Vendor Pings on Radar */}
              <div className="absolute top-10 left-16 flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                <span className="text-[9px] font-mono text-emerald-300 bg-slate-900/80 px-1 rounded">
                  Sunburst Farm (0.8km)
                </span>
              </div>

              <div className="absolute bottom-10 right-20 flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                <span className="text-[9px] font-mono text-emerald-300 bg-slate-900/80 px-1 rounded">
                  Highland Eggs (1.4km)
                </span>
              </div>

              <div className="absolute top-8 right-24 flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                <span className="text-[9px] font-mono text-amber-300 bg-slate-900/80 px-1 rounded">
                  Verdant Valley (2.1km)
                </span>
              </div>
            </div>

            {/* Found Vendors List */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Store className="w-4 h-4 text-emerald-400" />
                  Discovered Fresh Food Partners in Your Radius
                </h4>
                <span className="text-xs font-mono text-amber-400 font-bold">4 Verified</span>
              </div>

              <div className="space-y-2.5">
                {SAMPLE_VENDORS.map((v) => (
                  <div
                    key={v.id}
                    className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">{v.name}</h5>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                            {v.distance}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{v.freshHighlight}</p>
                        <span className="text-[11px] font-semibold text-amber-400">
                          Match: {v.macroMatch}
                        </span>
                      </div>
                    </div>

                    <span className="hidden sm:inline-flex text-[11px] font-bold text-slate-300 px-2 py-1 rounded bg-slate-800 border border-slate-700">
                      Open Today
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalized Day 1 Quest Card */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-amber-500/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Your Day 01 Quest: &quot;{selectedLevel.name}&quot; Kickoff
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {selectedLevel.xpBonus}
                </span>
              </div>
              <p className="text-sm text-slate-200 font-medium">
                {selectedLevel.dailyQuestSnippet}
              </p>
              <div className="mt-2 text-xs text-slate-400 flex items-center gap-4">
                <span>💧 Target: {selectedLevel.metrics.hydration}</span>
                <span>👟 Target: {selectedLevel.metrics.movement}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link
                href="/dashboard"
                onClick={() => {
                  if (onContinueToDashboard) onContinueToDashboard();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-center text-sm shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Athlete Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/leaderboards"
                className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-center text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Join Global Leaderboard</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
