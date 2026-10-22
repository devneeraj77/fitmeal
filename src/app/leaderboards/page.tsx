"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Trophy,
  Flame,
  Award,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
  Search,
  CheckCircle2,
  Sparkles,
  MapPin,
  Utensils,
  Dumbbell,
  ArrowLeft,
  Clock,
  LayoutDashboard,
  Crown,
  Medal,
} from "lucide-react";
import RewardTiersModal from "@/components/RewardTiersModal";
import CanvasBadge from "@/components/CanvasBadge";
import {
  ArenaToastProvider,
  ArenaNotificationBell,
  ArenaRivalWatchWidget,
} from "@/components/ArenaToastSystem";

// Self-contained high-performance confetti particle burst
function triggerArenaConfetti(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    alpha: number;
  }> = [];

  const colors = ["#10B981", "#1B4332", "#34D399", "#059669", "#F59E0B", "#FCD34D"];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight * 0.45;

  for (let i = 0; i < 90; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 11 + 4;
    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3.5,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 14,
      alpha: 1,
    });
  }

  const startTime = Date.now();

  function render() {
    if (!ctx || !canvas) return;
    const elapsed = Date.now() - startTime;
    if (elapsed > 2400) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22;
      p.vx *= 0.985;
      p.rotation += p.rotationSpeed;
      p.alpha = Math.max(0, 1 - elapsed / 2200);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

interface Contender {
  id: string;
  rank: number;
  prevRank: number;
  name: string;
  handle: string;
  avatarText: string;
  location: string;
  tier: "Apex Diamond" | "Diamond II" | "Platinum I" | "Platinum III" | "Gold I" | "Silver I";
  xp: number;
  streak: number;
  volumeKg: number;
  nutritionScore: number;
  isCurrentUser?: boolean;
  favDish: string;
  fistBumps: number;
  hasFistBumped?: boolean;
}

export default function LeaderboardsPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter States
  const [scope, setScope] = useState<"global" | "squad" | "regional" | "local">("global");
  const [metric, setMetric] = useState<"xp" | "volume" | "nutrition" | "streak">("xp");
  const [timeframe, setTimeframe] = useState<"weekly" | "season" | "alltime">("weekly");
  const [searchQuery, setSearchQuery] = useState("");

  // User Interactive Progress State
  const [userXp, setUserXp] = useState(8420);
  const [userRank, setUserRank] = useState(42);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [equippedBadge, setEquippedBadge] = useState<{ id: string; name: string }>({
    id: "apex_contender",
    name: "Apex Contender",
  });

  // Active Quests
  const [quests, setQuests] = useState([
    {
      id: "hypertrophy",
      title: "7-Day Hypertrophy Sprint",
      subtitle: "Complete 5 heavy compound sessions with volume tracking",
      current: 4,
      target: 5,
      unit: "sessions",
      rewardXp: 250,
      claimed: false,
    },
    {
      id: "kirana",
      title: "FitMeal Kirana Clean Fuel Gauntlet",
      subtitle: "Log 7 hyper-local meals sourced via street vendors & kiranas",
      current: 6,
      target: 7,
      unit: "days",
      rewardXp: 200,
      claimed: false,
    },
    {
      id: "cold_reset",
      title: "Box Breathing & Parasympathetic Reset",
      subtitle: "Complete 5 guided recovery breathing visualizer cycles",
      current: 5,
      target: 5,
      unit: "cycles",
      rewardXp: 150,
      claimed: false,
    },
  ]);

  // Season Countdown Timer (3 days, 14 hours, 22 mins, dynamic seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(3 * 86400 + 14 * 3600 + 22 * 60 + 45);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${d}d ${h.toString().padStart(2, "0")}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
  };

  // Contenders Directory
  const [contenders, setContenders] = useState<Contender[]>([
    {
      id: "c1",
      rank: 1,
      prevRank: 1,
      name: "Aarav Sharma",
      handle: "@aarav_fit",
      avatarText: "AS",
      location: "South Delhi / Lajpat Nagar",
      tier: "Apex Diamond",
      xp: 18450,
      streak: 42,
      volumeKg: 48600,
      nutritionScore: 99,
      favDish: "Sattu High-Protein Bowl (₹85)",
      fistBumps: 342,
    },
    {
      id: "c2",
      rank: 2,
      prevRank: 3,
      name: "Maya Patel",
      handle: "@mayalifts",
      avatarText: "MP",
      location: "Koramangala, Bangalore",
      tier: "Apex Diamond",
      xp: 16890,
      streak: 38,
      volumeKg: 42100,
      nutritionScore: 96,
      favDish: "Spiced Lentil & Tofu Medley (₹72)",
      fistBumps: 289,
    },
    {
      id: "c3",
      rank: 3,
      prevRank: 2,
      name: "Rohan Verma",
      handle: "@rohan_v",
      avatarText: "RV",
      location: "Bandra West, Mumbai",
      tier: "Apex Diamond",
      xp: 15220,
      streak: 29,
      volumeKg: 39500,
      nutritionScore: 94,
      favDish: "Paneer & Spinach Power Scramble (₹92)",
      fistBumps: 215,
    },
    {
      id: "c4",
      rank: 4,
      prevRank: 6,
      name: "Elena Rostova",
      handle: "@elena_mover",
      avatarText: "ER",
      location: "Indiranagar, Bangalore",
      tier: "Diamond II",
      xp: 13900,
      streak: 24,
      volumeKg: 36200,
      nutritionScore: 92,
      favDish: "Millet & Roasted Gram Porridge",
      fistBumps: 164,
    },
    {
      id: "c5",
      rank: 5,
      prevRank: 4,
      name: "Vikram Malhotra",
      handle: "@vikram_iron",
      avatarText: "VM",
      location: "Saket, South Delhi",
      tier: "Diamond II",
      xp: 13420,
      streak: 31,
      volumeKg: 38900,
      nutritionScore: 91,
      favDish: "Curd & Chia Seed Sattu Shake",
      fistBumps: 148,
    },
    {
      id: "c6",
      rank: 6,
      prevRank: 7,
      name: "Ananya Iyer",
      handle: "@ananya_run",
      avatarText: "AI",
      location: "Powai, Mumbai",
      tier: "Platinum I",
      xp: 11840,
      streak: 21,
      volumeKg: 28400,
      nutritionScore: 97,
      favDish: "Spiced Chickpea & Beetroot Salad",
      fistBumps: 119,
    },
    {
      id: "c7",
      rank: 7,
      prevRank: 5,
      name: "Kabir Mehta",
      handle: "@kabir_lift",
      avatarText: "KM",
      location: "Greater Kailash, Delhi",
      tier: "Platinum I",
      xp: 11210,
      streak: 19,
      volumeKg: 31200,
      nutritionScore: 89,
      favDish: "Soya Chunk & Mustard Leaf Bhurji",
      fistBumps: 96,
    },
    {
      id: "c8",
      rank: 8,
      prevRank: 8,
      name: "Zoya Chen",
      handle: "@zoya_zen",
      avatarText: "ZC",
      location: "Whitefield, Bangalore",
      tier: "Platinum III",
      xp: 9940,
      streak: 16,
      volumeKg: 24800,
      nutritionScore: 95,
      favDish: "Organic Farm Tempeh Bowl",
      fistBumps: 82,
    },
    {
      id: "c9",
      rank: 42,
      prevRank: 45,
      name: "David Kim (You)",
      handle: "@davidk",
      avatarText: "DK",
      location: "South Delhi / Lajpat Nagar",
      tier: "Gold I",
      xp: userXp,
      streak: 14,
      volumeKg: 21400,
      nutritionScore: 93,
      favDish: "Sattu Spiced Protein Bowl (₹85)",
      isCurrentUser: true,
      fistBumps: 46,
    },
  ]);

  // User state updates dynamically on action (no useEffect needed)

  // Handle Quest Claiming
  const handleClaimQuest = (questId: string, rewardXp: number) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, claimed: true } : q))
    );
    setUserXp((prev) => prev + rewardXp);
    setUserRank((prev) => Math.max(12, prev - 3));
    setActionNotice(`🎉 Claimed +${rewardXp} XP! You climbed to Rank #${Math.max(12, userRank - 3)}!`);
    triggerArenaConfetti(canvasRef.current);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Handle Quick XP Action
  const handleLogWorkoutXP = () => {
    setUserXp((prev) => prev + 150);
    setUserRank((prev) => Math.max(10, prev - 2));
    setActionNotice("⚡ Session Logged! +150 XP awarded to Arena Leaderboard.");
    triggerArenaConfetti(canvasRef.current);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleLogMealXP = () => {
    setUserXp((prev) => prev + 50);
    setUserRank((prev) => Math.max(10, prev - 1));
    setActionNotice("🥗 FitMeal Local Recipe Logged! +50 XP and Kirana Fuel points added.");
    triggerArenaConfetti(canvasRef.current);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleFistBump = (contenderId: string) => {
    setContenders((prev) =>
      prev.map((c) => {
        if (c.id === contenderId && !c.hasFistBumped) {
          return { ...c, fistBumps: c.fistBumps + 1, hasFistBumped: true };
        }
        return c;
      })
    );
    setActionNotice("👊 Fist bump sent! +5 Community Karma awarded.");
    setTimeout(() => setActionNotice(null), 2500);
  };

  // Dynamically map current user live score
  const dynamicContenders = contenders.map((c) =>
    c.isCurrentUser ? { ...c, xp: userXp, rank: userRank } : c
  );

  // Filter logic
  const filteredContenders = dynamicContenders
    .filter((c) => {
      if (searchQuery.trim() === "") return true;
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    })
    .filter((c) => {
      if (scope === "global") return true;
      if (scope === "regional") return c.location.toLowerCase().includes("delhi");
      if (scope === "local") return c.location.toLowerCase().includes("lajpat nagar");
      if (scope === "squad") return c.isCurrentUser || c.rank <= 5;
      return true;
    })
    .sort((a, b) => {
      if (metric === "xp") return b.xp - a.xp;
      if (metric === "volume") return b.volumeKg - a.volumeKg;
      if (metric === "nutrition") return b.nutritionScore - a.nutritionScore;
      if (metric === "streak") return b.streak - a.streak;
      return a.rank - b.rank;
    });

  const top3 = dynamicContenders.slice(0, 3);

  return (
    <ArenaToastProvider
      userXp={userXp}
      userRank={userRank}
      onOpenTiersModal={() => setIsRewardModalOpen(true)}
      onLogWorkout={() => handleLogWorkoutXP()}
      onUserClimb={(newRank) => {
        setUserRank(newRank);
        triggerArenaConfetti(canvasRef.current);
      }}
      onUserRankDrop={(newRank) => {
        setUserRank(newRank);
      }}
    >
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-28">
      {/* Confetti Overlay Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      />

      {/* Floating Action Notice */}
      {actionNotice && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1B4332] text-white px-5 py-2.5 rounded-full shadow-lg border border-emerald-500/30 text-xs font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Mark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-emerald-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
              <svg
                className="w-5 h-5 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
                viewBox="0 0 24 24"
              >
                <path d="M2 12h4l3-7 4 14 3-7h6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-wider text-slate-900 uppercase">
                FITMEAL <span className="text-emerald-700">{"//"}</span>{" "}
                <span className="text-xs font-semibold text-slate-500 tracking-normal">
                  GLOBAL ARENA
                </span>
              </span>
            </div>
          </Link>

          {/* Quick Route Switches */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-[#1B4332] bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-lg transition-colors shadow-2xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Personal </span>
              <span>Dashboard</span>
            </Link>

            <button
              onClick={() => setIsRewardModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-white bg-[#1B4332] hover:bg-[#153427] border border-[#2d5f47] rounded-lg transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Rewards</span>
            </button>

            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ARENA LIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* 2. Season 4 Apex Protocol Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-[#1B4332] text-white p-6 sm:p-8 lg:p-10 shadow-md border border-[#2d5f47]">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-600/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold tracking-wider">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-[#1B4332]">
                  ACTIVE TOURNAMENT
                </span>
                <span className="text-emerald-200">·</span>
                <span className="text-emerald-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Ends in {formatCountdown(secondsRemaining)}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Season 4: Apex Protocol
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                The world’s first hyper-local fitness &amp; nutrition arena. Compete with 14,820+ athletes
                globally and in South Delhi. Level up with verified Kirana fuel logging, progressive overload volume, and unbroken habit streaks.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  <span>Prize: ₹50,000 FitMeal Credits &amp; Apex Ring</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Active Hub: South Delhi / Lajpat Nagar</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsRewardModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#1B4332] font-black text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-[#1B4332]" />
                  <span>Inspect Reward Tiers &amp; Badges</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 lg:w-80">
              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  Active Contenders
                </span>
                <div className="text-2xl font-black font-mono text-white mt-0.5">
                  14,820
                </div>
                <span className="text-[11px] text-emerald-200/80">Worldwide</span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  Workouts Logged
                </span>
                <div className="text-2xl font-black font-mono text-white mt-0.5">
                  89,450
                </div>
                <span className="text-[11px] text-emerald-200/80">This Week</span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  Energy Burned
                </span>
                <div className="text-2xl font-black font-mono text-white mt-0.5">
                  42.8M
                </div>
                <span className="text-[11px] text-emerald-200/80">Total kcal</span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  Kirana Savings
                </span>
                <div className="text-2xl font-black font-mono text-white mt-0.5">
                  ₹1.2M
                </div>
                <span className="text-[11px] text-emerald-200/80">Saved vs Pre-packaged</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Weekly Arena Quests & Community Raids */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
                <Zap className="w-3.5 h-3.5" />
                <span>Live Arena Challenges</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Weekly Quests &amp; XP Multipliers
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Reset every Sunday 11:59 PM IST
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quests.map((q) => {
              const progressPct = Math.min(100, Math.round((q.current / q.target) * 100));
              const isReady = q.current >= q.target && !q.claimed;

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    q.claimed
                      ? "bg-slate-50 border-slate-200 opacity-80"
                      : isReady
                      ? "bg-emerald-50/60 border-emerald-300 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold font-mono text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded">
                        +{q.rewardXp} XP
                      </span>
                      {q.claimed && (
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Claimed
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{q.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{q.subtitle}</p>
                  </div>

                  <div className="pt-4 space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                        <span>Progress</span>
                        <span className="font-mono">
                          {q.current} / {q.target} {q.unit} ({progressPct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            q.claimed ? "bg-slate-400" : "bg-emerald-500"
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {isReady ? (
                      <button
                        onClick={() => handleClaimQuest(q.id, q.rewardXp)}
                        className="w-full py-2 px-3 rounded-xl bg-[#1B4332] hover:bg-[#153427] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Claim +{q.rewardXp} XP</span>
                      </button>
                    ) : q.claimed ? (
                      <div className="w-full py-2 text-center text-xs font-semibold text-slate-500 bg-slate-100 rounded-xl">
                        Completed &amp; Added to XP
                      </div>
                    ) : (
                      <div className="w-full py-2 text-center text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl">
                        In Progress ({q.target - q.current} remaining)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Top 3 Champions Podium */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
                Hall of Champions
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Current Podium Leaders
              </h2>
            </div>
            <div className="text-xs text-slate-500 hidden sm:block">
              Live updates synced every 60 seconds
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 items-end">
            {/* Rank 2 (Silver) */}
            <div className="order-2 md:order-1 bg-gradient-to-b from-white to-slate-50/90 rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col items-center text-center relative md:translate-y-4">
              <CanvasBadge
                tier="silver"
                emblem="trophy"
                size={62}
                className="mb-2"
              />
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full mb-1">
                <Medal className="w-3 h-3 text-slate-500" />
                Rank #2 · Silver Titan
              </span>
              <h3 className="text-base font-bold text-slate-900">{top3[1]?.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{top3[1]?.location}</p>

              <div className="w-full bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1 mb-4 text-left">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total Score:</span>
                  <span className="font-black font-mono text-slate-900">{top3[1]?.xp.toLocaleString()} XP</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Streak:</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-emerald-500 text-emerald-600" />
                    {top3[1]?.streak} Days
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 truncate">
                  Fuel: {top3[1]?.favDish}
                </div>
              </div>

              <button
                onClick={() => handleFistBump(top3[1].id)}
                disabled={top3[1].hasFistBumped}
                className="w-full py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>👊 Fist Bump ({top3[1]?.fistBumps})</span>
              </button>
            </div>

            {/* Rank 1 (Gold) */}
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50/40 via-emerald-50/30 to-white rounded-3xl p-6 sm:p-7 border-2 border-amber-400/80 shadow-md flex flex-col items-center text-center relative z-10">
              <div className="absolute -top-4 bg-gradient-to-r from-[#1B4332] to-[#0E281C] text-emerald-300 px-3.5 py-1 rounded-full text-xs font-black tracking-wide flex items-center gap-1.5 shadow-md border border-emerald-500/30">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>CHAMPION</span>
              </div>

              <CanvasBadge
                tier="gold"
                emblem="crown"
                size={74}
                className="mb-2 mt-1"
              />

              <span className="inline-flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-100/90 px-3 py-0.5 rounded-full mb-1 border border-amber-300/60">
                <Trophy className="w-3.5 h-3.5 text-amber-700" />
                Rank #1 · Apex Champion
              </span>

              <h3 className="text-lg font-black text-slate-900">{top3[0]?.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{top3[0]?.location}</p>

              <div className="w-full bg-white rounded-xl p-3.5 border border-emerald-200/80 space-y-1.5 mb-4 text-left shadow-2xs">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Arena Rating:</span>
                  <span className="font-black font-mono text-[#1B4332] text-sm">
                    {top3[0]?.xp.toLocaleString()} XP
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Unbroken Streak:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-emerald-500 text-emerald-600" />
                    {top3[0]?.streak} Days
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Volume Lifted:</span>
                  <span className="font-mono text-slate-700">{top3[0]?.volumeKg.toLocaleString()} kg</span>
                </div>
                <div className="text-[11px] text-slate-600 pt-1.5 border-t border-slate-100 truncate">
                  ⚡ Staple Fuel: <span className="font-semibold">{top3[0]?.favDish}</span>
                </div>
              </div>

              <button
                onClick={() => handleFistBump(top3[0].id)}
                disabled={top3[0].hasFistBumped}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-[#1B4332] to-[#123023] hover:from-[#153427] hover:to-[#0D2218] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <span>👊 Salute Champion ({top3[0]?.fistBumps})</span>
              </button>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className="order-3 bg-gradient-to-b from-white to-amber-50/30 rounded-3xl p-6 border border-amber-200/70 shadow-2xs hover:shadow-xs transition-shadow flex flex-col items-center text-center relative md:translate-y-4">
              <CanvasBadge
                tier="bronze"
                emblem="star"
                size={58}
                className="mb-2"
              />
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full mb-1 border border-amber-200">
                <Medal className="w-3 h-3 text-amber-700" />
                Rank #3 · Bronze Vanguard
              </span>
              <h3 className="text-base font-bold text-slate-900">{top3[2]?.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{top3[2]?.location}</p>

              <div className="w-full bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1 mb-4 text-left">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total Score:</span>
                  <span className="font-black font-mono text-slate-900">{top3[2]?.xp.toLocaleString()} XP</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Streak:</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-emerald-500 text-emerald-600" />
                    {top3[2]?.streak} Days
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 truncate">
                  Fuel: {top3[2]?.favDish}
                </div>
              </div>

              <button
                onClick={() => handleFistBump(top3[2].id)}
                disabled={top3[2].hasFistBumped}
                className="w-full py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>👊 Fist Bump ({top3[2]?.fistBumps})</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5. Live Leaderboard Table & Filters */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          
          {/* Header Controls & Filter Tabs */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Live Global &amp; Hyper-Local Standings
                </h3>
                <p className="text-xs text-slate-500">
                  Ranking computed dynamically based on XP, lifting tonnage, and Kirana meal compliance.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search athlete, handle or city..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Segmented Controls Cluster */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              
              {/* Geographic Scope Filter */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setScope("global")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    scope === "global"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Global
                </button>
                <button
                  onClick={() => setScope("squad")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    scope === "squad"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Squad / Friends
                </button>
                <button
                  onClick={() => setScope("regional")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    scope === "regional"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Delhi NCR
                </button>
                <button
                  onClick={() => setScope("local")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    scope === "local"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Local (&lt;5km)
                </button>
              </div>

              {/* Metric Selector */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setMetric("xp")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    metric === "xp"
                      ? "bg-[#1B4332] text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Arena XP
                </button>
                <button
                  onClick={() => setMetric("volume")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    metric === "volume"
                      ? "bg-[#1B4332] text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Volume (kg)
                </button>
                <button
                  onClick={() => setMetric("nutrition")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    metric === "nutrition"
                      ? "bg-[#1B4332] text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Kirana Diet %
                </button>
                <button
                  onClick={() => setMetric("streak")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    metric === "streak"
                      ? "bg-[#1B4332] text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Streak Days
                </button>
              </div>

              {/* Timeframe */}
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <span className="font-semibold">Timeframe:</span>
                <button
                  onClick={() => setTimeframe("weekly")}
                  className={`px-2 py-1 rounded transition-colors ${
                    timeframe === "weekly" ? "font-bold text-[#1B4332] underline" : "hover:text-slate-900"
                  }`}
                >
                  This Week
                </button>
                <span>·</span>
                <button
                  onClick={() => setTimeframe("season")}
                  className={`px-2 py-1 rounded transition-colors ${
                    timeframe === "season" ? "font-bold text-[#1B4332] underline" : "hover:text-slate-900"
                  }`}
                >
                  Season 4
                </button>
                <span>·</span>
                <button
                  onClick={() => setTimeframe("alltime")}
                  className={`px-2 py-1 rounded transition-colors ${
                    timeframe === "alltime" ? "font-bold text-[#1B4332] underline" : "hover:text-slate-900"
                  }`}
                >
                  All-Time
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-3">Athlete</th>
                  <th className="py-3 px-3">Division Tier</th>
                  <th className="py-3 px-3">Active Streak</th>
                  <th className="py-3 px-3">Volume Lifted</th>
                  <th className="py-3 px-3">Kirana Fuel</th>
                  <th className="py-3 px-3 text-right">Arena Score</th>
                  <th className="py-3 px-3 text-center">Fist Bump</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredContenders.map((contender) => {
                  const rankDiff = contender.prevRank - contender.rank;
                  const isUser = contender.isCurrentUser;

                  return (
                    <tr
                      key={contender.id}
                      className={`transition-colors ${
                        isUser
                          ? "bg-emerald-50/70 font-semibold"
                          : "hover:bg-slate-50/80"
                      }`}
                    >
                      {/* Rank & Movement */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-mono">
                          <span
                            className={`w-6 text-center font-black ${
                              contender.rank === 1
                                ? "text-yellow-600"
                                : contender.rank === 2
                                ? "text-slate-500"
                                : contender.rank === 3
                                ? "text-amber-700"
                                : "text-slate-900"
                            }`}
                          >
                            #{contender.rank}
                          </span>

                          {rankDiff > 0 ? (
                            <span className="text-[10px] text-emerald-600 flex items-center">
                              <ArrowUp className="w-3 h-3" />+{rankDiff}
                            </span>
                          ) : rankDiff < 0 ? (
                            <span className="text-[10px] text-rose-500 flex items-center">
                              <ArrowDown className="w-3 h-3" />
                              {rankDiff}
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">
                              <Minus className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Athlete Details */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                              isUser
                                ? "bg-[#1B4332] text-white border border-emerald-400"
                                : "bg-slate-900 text-white"
                            }`}
                          >
                            {contender.avatarText}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900">
                                {contender.name}
                              </span>
                              {isUser && (
                                <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded">
                                  YOU
                                </span>
                              )}
                              {isUser && equippedBadge && (
                                <button
                                  onClick={() => setIsRewardModalOpen(true)}
                                  className="text-[10px] bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5 cursor-pointer"
                                  title="Equipped Badge - Click to view Reward Tiers"
                                >
                                  <Award className="w-2.5 h-2.5 text-amber-700" />
                                  <span>{equippedBadge.name}</span>
                                </button>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1">
                              <span>{contender.handle}</span>
                              <span>·</span>
                              <span className="truncate max-w-[140px]">{contender.location}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Tier Badge */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <button
                          onClick={() => setIsRewardModalOpen(true)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B4332] bg-emerald-100/80 hover:bg-emerald-200/80 px-2 py-0.5 rounded transition-colors cursor-pointer"
                          title="View Reward Tiers & Unlockable Perks"
                        >
                          <Award className="w-3 h-3 text-emerald-700" />
                          <span>{contender.tier}</span>
                        </button>
                      </td>

                      {/* Streak */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                          <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
                          {contender.streak} days
                        </span>
                      </td>

                      {/* Volume Lifted */}
                      <td className="py-3.5 px-3 whitespace-nowrap font-mono text-slate-700">
                        {contender.volumeKg.toLocaleString()} kg
                      </td>

                      {/* Nutrition Compliance */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${contender.nutritionScore}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs font-semibold text-slate-700">
                            {contender.nutritionScore}%
                          </span>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-3.5 px-3 whitespace-nowrap text-right font-black font-mono text-slate-900 text-sm">
                        {contender.xp.toLocaleString()}{" "}
                        <span className="text-[11px] font-sans font-medium text-slate-400">XP</span>
                      </td>

                      {/* Interaction */}
                      <td className="py-3.5 px-3 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleFistBump(contender.id)}
                          disabled={contender.hasFistBumped || isUser}
                          title={isUser ? "You can't bump yourself!" : "Send a fist bump"}
                          className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                            contender.hasFistBumped
                              ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                              : isUser
                              ? "opacity-30 cursor-not-allowed border-slate-200"
                              : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
                          }`}
                        >
                          👊 {contender.fistBumps}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* 6. Current User Sticky Persistent Scorecard / HUD */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* User Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRewardModalOpen(true)}
              className="relative transition-transform hover:scale-105 cursor-pointer shrink-0"
              title="Click to view Reward Tiers & Badges"
            >
              <CanvasBadge tier="gold" emblem="trophy" size={42} className="shrink-0" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-slate-900">David Kim</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Rank #{userRank} Global
                </span>
                <button
                  onClick={() => setIsRewardModalOpen(true)}
                  className="text-xs font-bold text-amber-900 bg-gradient-to-r from-amber-100 to-amber-200/90 hover:from-amber-200 hover:to-amber-300 border border-amber-300/80 px-2.5 py-0.5 rounded flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                  title="View your Tier and unlockable perks"
                >
                  <Award className="w-3 h-3 text-amber-700" />
                  <span>Tier: Gold I</span>
                </button>
                <button
                  onClick={() => setIsRewardModalOpen(true)}
                  className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-900 bg-emerald-100/90 hover:bg-emerald-200 border border-emerald-300 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                  title="Equipped Arena Badge - Click to Change"
                >
                  <span>🛡️ {equippedBadge.name}</span>
                </button>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-0.5">
                <span className="font-mono font-bold text-slate-800">{userXp.toLocaleString()} XP</span>
                <span>·</span>
                <span>Need {Math.max(0, 10000 - userXp)} XP to reach Emerald Titan</span>
                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden md:block">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${Math.min(100, ((userXp - 5000) / 5000) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Real-Time Climb Triggers & Reward Tiers button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setIsRewardModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-[11px] sm:text-xs font-black transition-all active:scale-95 cursor-pointer shadow-sm"
              title="Open Reward Tiers & Unlockable Perks Modal"
            >
              <Award className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">Reward </span>
              <span>Tiers</span>
            </button>

            <button
              onClick={handleLogMealXP}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-[11px] sm:text-xs font-bold text-[#1B4332] transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <Utensils className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Log Kirana Fuel</span>
              <span className="sm:hidden">Fuel</span>
              <span> (+50)</span>
            </button>

            <button
              onClick={handleLogWorkoutXP}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#1B4332] hover:bg-[#153427] text-white text-[11px] sm:text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Log Session</span>
              <span className="sm:hidden">Workout</span>
              <span> (+150)</span>
            </button>

            <Link
              href="/dashboard"
              className="p-1.5 sm:p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
              title="Return to Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>

      {/* 7. Reward Tiers Modal */}
      <RewardTiersModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        currentXp={userXp}
        currentRank={userRank}
        equippedBadgeId={equippedBadge.id}
        onEquipBadge={(id, name) => {
          setEquippedBadge({ id, name });
          setActionNotice(`🛡️ Equipped Badge "${name}" on your public profile!`);
          setTimeout(() => setActionNotice(null), 3000);
        }}
        onTriggerConfetti={() => triggerArenaConfetti(canvasRef.current)}
      />
    </div>
  );
}
