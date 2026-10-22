"use client";

import React, { useState, useEffect } from "react";
import {
  Dumbbell,
  Utensils,
  Moon,
  Users,
  TrendingUp,
  ChevronRight,
  Plus,
  Play,
  Pause,
  Flame,
  HeartHandshake,
  Clock,
} from "lucide-react";

type EquipmentType = "all" | "gym" | "dumbbells" | "home";

export default function BentoGrid() {
  // --- Block 1: Strength Training States ---
  const [equipmentFilter, setEquipmentFilter] = useState<EquipmentType>("all");
  
  const workouts = [
    {
      name: "Barbell Romanian Deadlift",
      category: "gym",
      categoryLabel: "Commercial Gym",
      sets: "4 sets × 8 reps",
      load: "115 kg",
      rpe: "RPE 8.0",
      overload: "+5kg vs last week",
    },
    {
      name: "Dumbbell Split Squat & Press",
      category: "dumbbells",
      categoryLabel: "Dumbbells Only",
      sets: "3 sets × 10 reps/side",
      load: "2x 22 kg",
      rpe: "RPE 8.5",
      overload: "+2 reps vs last week",
    },
    {
      name: "Weighted Deficit Push-Ups & Ring Dips",
      category: "home",
      categoryLabel: "Home & Bodyweight",
      sets: "4 sets × 12 reps",
      load: "+15 kg Vest",
      rpe: "RPE 8.0",
      overload: "+1 set vs last week",
    },
    {
      name: "Kettlebell Clean to Strict Overhead Press",
      category: "dumbbells",
      categoryLabel: "Dumbbells Only",
      sets: "5 sets × 5 reps",
      load: "2x 24 kg",
      rpe: "RPE 9.0",
      overload: "Speed PR: 0.82 m/s",
    },
  ];

  const filteredWorkouts = equipmentFilter === "all"
    ? workouts
    : workouts.filter((w) => w.category === equipmentFilter);

  // --- Block 2: Macro & Fuel States ---
  const [selectedMeal, setSelectedMeal] = useState<"postWorkout" | "cleanKeto" | "metabolic">("postWorkout");
  const [waterLogged, setWaterLogged] = useState(2750);

  const mealPresets = {
    postWorkout: {
      title: "Wild Salmon Quinoa Recovery Bowl",
      calories: 740,
      protein: 52,
      carbs: 68,
      fats: 22,
      proteinGoal: 180,
      carbsGoal: 240,
      fatsGoal: 70,
    },
    cleanKeto: {
      title: "Grass-Fed Flank Steak & Avocado Greens",
      calories: 680,
      protein: 58,
      carbs: 18,
      fats: 42,
      proteinGoal: 180,
      carbsGoal: 100,
      fatsGoal: 95,
    },
    metabolic: {
      title: "Citrus Roasted Chicken, Sweet Potato & Asparagus",
      calories: 710,
      protein: 48,
      carbs: 74,
      fats: 19,
      proteinGoal: 180,
      carbsGoal: 240,
      fatsGoal: 70,
    },
  };

  const activeMeal = mealPresets[selectedMeal];

  // --- Block 3: Guided Breathwork Timer States ---
  const [breathActive, setBreathActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold (Top)" | "Exhale" | "Hold (Empty)">("Inhale");
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [saunaLogged, setSaunaLogged] = useState(false);
  const [plungeLogged, setPlungeLogged] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (breathActive) {
      timer = setInterval(() => {
        setBreathSeconds((prev) => {
          if (prev > 1) return prev - 1;
          // Switch box breathing phases: Inhale (4s) -> Hold (4s) -> Exhale (4s) -> Hold (4s)
          setBreathPhase((currPhase) => {
            if (currPhase === "Inhale") return "Hold (Top)";
            if (currPhase === "Hold (Top)") return "Exhale";
            if (currPhase === "Exhale") return "Hold (Empty)";
            return "Inhale";
          });
          return 4;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathActive]);

  const toggleBreathwork = () => {
    if (breathActive) {
      setBreathActive(false);
      setBreathSeconds(4);
      setBreathPhase("Inhale");
    } else {
      setBreathActive(true);
    }
  };

  // --- Block 4: Community Cheer & Sprint States ---
  const [cheersCount, setCheersCount] = useState(342);
  const [userCheered, setUserCheered] = useState(false);
  const [joinedSprint, setJoinedSprint] = useState(false);

  const handleCheer = () => {
    setCheersCount((c) => (userCheered ? c - 1 : c + 1));
    setUserCheered(!userCheered);
  };

  return (
    <section id="programs" className="py-16 sm:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>The 4-Pillar System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Holistic Health, Engineered Simply
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminate guesswork with unified protocols. Strength progression, cellular nutrition, circadian sleep, and peer accountability tuned to your physiology.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* BLOCK 1 (Large / Span 2 on 12-col grid -> 7 columns): Adaptive Strength Training */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1B4332] flex items-center justify-center border border-emerald-100">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Adaptive Strength Training</h3>
                    <p className="text-xs text-slate-500">Auto-regulated progressive overload &amp; movement library</p>
                  </div>
                </div>

                {/* Overload badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                  <span>+12.8% 8-Wk Overload</span>
                </div>
              </div>

              {/* Equipment Interactive Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl mb-6">
                {[
                  { id: "all" as EquipmentType, label: "All Equipment" },
                  { id: "gym" as EquipmentType, label: "Full Commercial Gym" },
                  { id: "dumbbells" as EquipmentType, label: "Dumbbells Only" },
                  { id: "home" as EquipmentType, label: "Home & Bodyweight" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setEquipmentFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      equipmentFilter === tab.id
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Workout Planner List */}
              <div className="space-y-3">
                {filteredWorkouts.map((exercise, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200 shrink-0 font-mono">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{exercise.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>{exercise.sets}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-slate-700 font-mono">{exercise.load}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">{exercise.rpe}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
                        {exercise.overload}
                      </span>
                      <button className="text-xs font-semibold text-[#1B4332] hover:underline flex items-center gap-0.5 cursor-pointer">
                        <span>Form Cue</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 8-Week Overload Bar Chart Strip */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                  Calculated Volume Progression (Weeks 1 - 8)
                </span>
                <span className="text-xs font-semibold text-slate-500">1RM Squat: 145kg (+17.5kg)</span>
              </div>
              <div className="grid grid-cols-8 gap-2 items-end h-16 pt-2">
                {[45, 52, 60, 58, 72, 79, 86, 95].map((val, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        i === 7 ? "bg-[#1B4332]" : "bg-emerald-300/70 hover:bg-emerald-400"
                      }`}
                      style={{ height: `${val}%` }}
                      title={`Week ${i + 1}: ${val}% load index`}
                    />
                    <span className="text-[10px] text-slate-500 font-mono">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BLOCK 2 (Medium / 5 columns): Macro & Meal Fuel */}
          <div id="nutrition" className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1B4332] flex items-center justify-center border border-emerald-200">
                    <Utensils className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Macro &amp; Meal Fuel</h3>
                    <p className="text-xs text-slate-500">Targeted metabolic nutrient partitioning</p>
                  </div>
                </div>
              </div>

              {/* Meal Selector Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-4">
                <button
                  onClick={() => setSelectedMeal("postWorkout")}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedMeal === "postWorkout" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                  }`}
                >
                  Post-Workout
                </button>
                <button
                  onClick={() => setSelectedMeal("cleanKeto")}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedMeal === "cleanKeto" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                  }`}
                >
                  Clean Protein
                </button>
                <button
                  onClick={() => setSelectedMeal("metabolic")}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedMeal === "metabolic" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                  }`}
                >
                  Dinner Fuel
                </button>
              </div>

              {/* Active Meal Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-800">{activeMeal.title}</p>
                  <span className="text-xs font-black text-slate-900 font-mono">{activeMeal.calories} kcal</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">High bioavailability • Organic micronutrients</p>
              </div>

              {/* Macronutrient Breakdown Rings (Protein, Carbs, Fats) */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {/* Protein */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center flex flex-col items-center">
                  <div className="relative w-14 h-14 flex items-center justify-center mb-1.5">
                    <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-emerald-200/80 stroke-current stroke-[3.5] fill-none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#1B4332] stroke-current stroke-[3.5] stroke-linecap-round fill-none"
                        strokeDasharray={`${Math.min(100, Math.round((activeMeal.protein / 60) * 100))}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-slate-900 font-mono">
                      {activeMeal.protein}g
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800">Protein</span>
                  <span className="text-[10px] text-emerald-800 font-semibold font-mono">Target: 180g</span>
                </div>

                {/* Carbs */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center flex flex-col items-center">
                  <div className="relative w-14 h-14 flex items-center justify-center mb-1.5">
                    <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200 stroke-current stroke-[3.5] fill-none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-slate-700 stroke-current stroke-[3.5] stroke-linecap-round fill-none"
                        strokeDasharray={`${Math.min(100, Math.round((activeMeal.carbs / 80) * 100))}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-slate-900 font-mono">
                      {activeMeal.carbs}g
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800">Carbs</span>
                  <span className="text-[10px] text-slate-600 font-semibold font-mono">Target: 240g</span>
                </div>

                {/* Healthy Fats */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center flex flex-col items-center">
                  <div className="relative w-14 h-14 flex items-center justify-center mb-1.5">
                    <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-emerald-200/80 stroke-current stroke-[3.5] fill-none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#1B4332] stroke-current stroke-[3.5] stroke-linecap-round fill-none"
                        strokeDasharray={`${Math.min(100, Math.round((activeMeal.fats / 35) * 100))}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-slate-900 font-mono">
                      {activeMeal.fats}g
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800">Fats</span>
                  <span className="text-[10px] text-emerald-800 font-semibold font-mono">Target: 70g</span>
                </div>
              </div>
            </div>

            {/* Quick Hydration Logger */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700">Electrolyte Hydration</span>
                <p className="text-xs text-slate-500 font-mono tabular-nums">{waterLogged} / 3,200 ml logged</p>
              </div>
              <button
                onClick={() => setWaterLogged((w) => w + 250)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+250ml Glass</span>
              </button>
            </div>
          </div>

          {/* BLOCK 3 (Medium / 5 columns): Recovery & Sleep Hygiene */}
          <div id="recovery" className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1B4332] flex items-center justify-center border border-emerald-200">
                    <Moon className="w-5 h-5 text-[#1B4332]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Recovery &amp; Sleep Hygiene</h3>
                    <p className="text-xs text-slate-500">Circadian entrainment, breathwork &amp; thermal contrast</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                  RECOVERY: 94%
                </span>
              </div>

              {/* Circadian Rhythm Clock Visual Strip */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#1B4332] to-slate-900 text-white mb-5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1.5 text-emerald-200">
                    <Clock className="w-3.5 h-3.5" />
                    <span>24-Hour Circadian Biological Clock</span>
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">Optimal Phase</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px] pt-1">
                  <div className="p-1.5 rounded bg-white/10">
                    <p className="text-slate-400">07:00</p>
                    <p className="font-semibold text-white">Morning Light</p>
                  </div>
                  <div className="p-1.5 rounded bg-white/10">
                    <p className="text-slate-400">16:30</p>
                    <p className="font-semibold text-white">Peak Strength</p>
                  </div>
                  <div className="p-1.5 rounded bg-white/10">
                    <p className="text-slate-400">21:00</p>
                    <p className="font-semibold text-white">Melatonin</p>
                  </div>
                  <div className="p-1.5 rounded bg-emerald-500/20 border border-emerald-400/40">
                    <p className="text-emerald-300">22:30</p>
                    <p className="font-semibold text-emerald-200">Deep Sleep REM</p>
                  </div>
                </div>
              </div>

              {/* Guided Breathwork Interactive Tool (Box Breathing) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Guided Box Breathwork (4-4-4-4)
                    </h4>
                    <p className="text-[11px] text-slate-500">Vagal nerve activation to drop sympathetic arousal</p>
                  </div>
                  <button
                    onClick={toggleBreathwork}
                    className="px-3 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#235841] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {breathActive ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    <span>{breathActive ? "Pause" : "Start 3m"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  {/* Dynamic Breathing Orb */}
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ${
                    breathActive
                      ? "border-emerald-600 bg-emerald-100/70 scale-110 shadow-sm"
                      : "border-slate-300 bg-white"
                  }`}>
                    <span className="text-lg font-black text-slate-900 font-mono">{breathSeconds}s</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {breathActive ? breathPhase : "Ready for Breathing Protocol"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {breathActive ? "Follow smooth diaphragm cadence" : "Tap Start to synchronize heart rate variability"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cold Plunge & Sauna Log Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPlungeLogged(!plungeLogged)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    plungeLogged
                      ? "bg-emerald-100 border-emerald-300 text-emerald-900"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  ❄️ Cold Plunge 48°F {plungeLogged ? "✓ (3m 30s)" : ""}
                </button>
                <button
                  onClick={() => setSaunaLogged(!saunaLogged)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    saunaLogged
                      ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  🔥 Sauna 175°F {saunaLogged ? "✓ (25m)" : ""}
                </button>
              </div>
              <span className="text-[11px] font-bold text-slate-400">DAILY LOGS</span>
            </div>
          </div>

          {/* BLOCK 4 (Wide / Span-full -> 7 columns on desktop): Community Accountability */}
          <div id="community" className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#1B4332] flex items-center justify-center border border-emerald-200">
                    <Users className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Community Accountability</h3>
                    <p className="text-xs text-slate-500">Live member leaderboards, sprint challenges &amp; peer cheers</p>
                  </div>
                </div>

                {/* Live Activity Counter */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-700">1,420 Active Today</span>
                </div>
              </div>

              {/* Sprint Challenge Banner */}
              <div className="p-4 rounded-2xl bg-[#0D2218] border border-emerald-900/60 text-white mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Flame className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                    <span>Featured Sprint Challenge</span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">October 100km Ergometer &amp; Rower Sprint</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Community progress: 68.4km / 100km completed</p>
                </div>
                
                <button
                  onClick={() => setJoinedSprint(!joinedSprint)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    joinedSprint
                      ? "bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400"
                      : "bg-white text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {joinedSprint ? "✓ Challenge Joined" : "Join Sprint →"}
                </button>
              </div>

              {/* Leaderboard Table / Feed Row */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-2 uppercase font-mono">
                  <span>Athlete Rank &amp; Name</span>
                  <div className="flex items-center gap-6">
                    <span>Consistency Streak</span>
                    <span>Session Volume</span>
                  </div>
                </div>

                {[
                  { rank: "01", name: "Soren Lindqvist", streak: "28 Days", volume: "44,200 kg", badge: "🥇 Gold Division" },
                  { rank: "02", name: "Aria Chen", streak: "21 Days", volume: "39,800 kg", badge: "🥈 Silver" },
                  { rank: "03", name: "David Kim (You)", streak: "12 Days", volume: "31,400 kg", badge: "🥉 Active Mover" },
                ].map((athlete, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                      athlete.name.includes("You")
                        ? "bg-emerald-50/60 border-emerald-300"
                        : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-black text-slate-700 w-5">{athlete.rank}</span>
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold text-[11px] flex items-center justify-center">
                        {athlete.name[0]}
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{athlete.name}</span>
                        <span className="text-[10px] text-slate-500 ml-2 hidden sm:inline">{athlete.badge}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                        {athlete.streak}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">{athlete.volume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peer Cheer Interactive Feed Bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-800" />
                <span className="text-xs text-slate-600">
                  <strong className="text-slate-900">{cheersCount} cheers</strong> sent to active movers today
                </span>
              </div>
              <button
                onClick={handleCheer}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  userCheered
                    ? "bg-emerald-100 text-[#1B4332] border border-emerald-300"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                }`}
              >
                <span>👏 {userCheered ? "Cheered!" : "Send Cheer"}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
