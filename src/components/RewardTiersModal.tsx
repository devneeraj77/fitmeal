"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Award,
  Trophy,
  Crown,
  Lock,
  Unlock,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Gift,
  Flame,
  Eye,
  Store,
  Dumbbell,
  Compass,
} from "lucide-react";

export interface RewardBadge {
  id: string;
  name: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  iconName: "ShieldCheck" | "Award" | "Zap" | "Flame" | "Crown" | "Dumbbell" | "Compass" | "Store";
  requirement: string;
  lore: string;
  isUnlocked: boolean;
  isEquipped?: boolean;
}

export interface DigitalReward {
  id: string;
  title: string;
  type: "voucher" | "aura" | "feature" | "perk";
  valueDescription: string;
  voucherCode?: string;
  isUnlocked: boolean;
  isClaimed: boolean;
}

export interface RewardTier {
  id: string;
  tierNumber: number;
  name: string;
  tierSlug: "bronze" | "silver" | "gold" | "emerald" | "apex";
  xpThreshold: number;
  rankThreshold: string;
  status: "unlocked" | "current" | "locked";
  accentColor: string;
  bgGrad: string;
  tagline: string;
  badges: RewardBadge[];
  rewards: DigitalReward[];
}

interface RewardTiersModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentXp: number;
  currentRank: number;
  equippedBadgeId?: string;
  onEquipBadge?: (badgeId: string, badgeName: string) => void;
  onTriggerConfetti?: () => void;
}

export default function RewardTiersModal({
  isOpen,
  onClose,
  currentXp,
  currentRank,
  equippedBadgeId = "apex_contender",
  onEquipBadge,
  onTriggerConfetti,
}: RewardTiersModalProps) {
  // Active Filter Tab: "all" | "unlocked" | "current" | "locked"
  const [filterTab, setFilterTab] = useState<"all" | "unlocked" | "current" | "locked">("all");
  
  // Selected Tier for deep inspection
  const [selectedTierId, setSelectedTierId] = useState<string>("gold");
  
  // Inspecting specific badge details
  const [inspectingBadge, setInspectingBadge] = useState<RewardBadge | null>(null);

  // Active equipped badge state
  const [activeBadge, setActiveBadge] = useState<string>(equippedBadgeId);

  // Claimed Rewards state tracking
  const [claimedRewardIds, setClaimedRewardIds] = useState<Record<string, string>>({
    "rew_kirana_50": "KIRANA-BRONZE-50",
    "rew_avatar_ring": "ACTIVATED",
  });

  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (inspectingBadge) {
          setInspectingBadge(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, inspectingBadge, onClose]);

  if (!isOpen) return null;

  // Build the dynamic Tiers dataset mapped to live user XP and rank
  const tiers: RewardTier[] = [
    {
      id: "bronze",
      tierNumber: 1,
      name: "Bronze Pioneer",
      tierSlug: "bronze",
      xpThreshold: 0,
      rankThreshold: "Open to All Athletes",
      status: currentXp >= 2500 ? "unlocked" : currentXp >= 0 ? "current" : "locked",
      accentColor: "border-amber-700 text-amber-800 bg-amber-50",
      bgGrad: "from-amber-700/10 to-amber-600/5",
      tagline: "Foundational mastery of hyper-local nutrition & introductory habits.",
      badges: [
        {
          id: "kirana_scout",
          name: "Kirana Scout",
          rarity: "Common",
          iconName: "Store",
          requirement: "Log 3 meals sourced directly from neighborhood vendors or street markets.",
          lore: "Awarded to athletes who discover clean fuel right in their local streets — unpasteurized sattu, fresh greens, and fresh curd.",
          isUnlocked: true,
        },
        {
          id: "pacer_novice",
          name: "Pacer Novice",
          rarity: "Common",
          iconName: "Compass",
          requirement: "Complete first 3 verified hypertrophy or mobility routines in FitMeal.",
          lore: "The journey begins with consistency. The first three sessions establish neuromuscular discipline.",
          isUnlocked: true,
        },
      ],
      rewards: [
        {
          id: "rew_radar_basic",
          title: "FitMeal Hyper-Local Macro Radar",
          type: "feature",
          valueDescription: "Unlocks real-time ingredient swap matrix & radius pricing within 5km.",
          isUnlocked: true,
          isClaimed: true,
        },
        {
          id: "rew_kirana_50",
          title: "₹50 Kirana Fuel Grocery Voucher",
          type: "voucher",
          valueDescription: "Redeemable at participating South Delhi grain merchants & fresh vendors.",
          voucherCode: "KIRANA-BRONZE-50",
          isUnlocked: true,
          isClaimed: true,
        },
      ],
    },
    {
      id: "silver",
      tierNumber: 2,
      name: "Silver Vanguard",
      tierSlug: "silver",
      xpThreshold: 2500,
      rankThreshold: "Top 200 Contenders",
      status: currentXp >= 5000 ? "unlocked" : currentXp >= 2500 ? "current" : "locked",
      accentColor: "border-slate-400 text-slate-800 bg-slate-100",
      bgGrad: "from-slate-200/50 to-slate-100/30",
      tagline: "Unbreakable habit adherence, compound overload, and precision tracking.",
      badges: [
        {
          id: "hypertrophy_grinder",
          name: "Hypertrophy Grinder",
          rarity: "Rare",
          iconName: "Dumbbell",
          requirement: "Accumulate 15,000kg of total mechanical work in compound squat, deadlift, and press.",
          lore: "Proven steel. You move serious weight with recorded progressive overload in your weekly logs.",
          isUnlocked: currentXp >= 2500,
        },
        {
          id: "hydration_disciplined",
          name: "Hydration Disciplined",
          rarity: "Rare",
          iconName: "Zap",
          requirement: "Hit 3.0L daily water intake for 10 consecutive logged days.",
          lore: "Cellular hydration is the foundation of protein synthesis and cognitive speed.",
          isUnlocked: currentXp >= 2500,
        },
      ],
      rewards: [
        {
          id: "rew_avatar_ring",
          title: "Silver Vanguard Avatar Ring",
          type: "aura",
          valueDescription: "Polished platinum and silver ring contour surrounding your leaderboard avatar.",
          isUnlocked: currentXp >= 2500,
          isClaimed: true,
        },
        {
          id: "rew_audio_breath",
          title: "Guided Box Breathing Soundscape Suite",
          type: "perk",
          valueDescription: "Unlocks 4 binaural recovery frequencies inside the 5-minute Box Breathing visualizer.",
          isUnlocked: currentXp >= 2500,
          isClaimed: !!claimedRewardIds["rew_audio_breath"],
        },
      ],
    },
    {
      id: "gold",
      tierNumber: 3,
      name: "Gold Champion",
      tierSlug: "gold",
      xpThreshold: 5000,
      rankThreshold: "Top 50 Contenders (Active)",
      status: currentXp >= 10000 ? "unlocked" : currentXp >= 5000 ? "current" : "locked",
      accentColor: "border-amber-500 text-amber-900 bg-amber-50",
      bgGrad: "from-amber-400/20 to-yellow-500/10",
      tagline: "Elite local athletes setting the benchmark in South Delhi and Global leaderboards.",
      badges: [
        {
          id: "apex_contender",
          name: "Apex Contender",
          rarity: "Epic",
          iconName: "Award",
          requirement: "Breach the Global Top 50 (#42 achieved) with 5,000+ verified Arena XP.",
          lore: "Reserved only for the apex 1% of athletes who master both kitchen precision and gym floor discipline.",
          isUnlocked: currentXp >= 5000,
        },
        {
          id: "sourcing_maestro",
          name: "Sourcing Maestro",
          rarity: "Epic",
          iconName: "Store",
          requirement: "Prepare 15 high-protein meals under ₹120 using seasonal greens and street pulses.",
          lore: "Proving that world-class muscle mass and vitality do not require expensive synthetic imports.",
          isUnlocked: currentXp >= 5000,
        },
        {
          id: "unbroken_steel",
          name: "Unbroken Steel",
          rarity: "Epic",
          iconName: "Flame",
          requirement: "Maintain a 14-day unbroken vitality streak with daily mobility & sleep logs.",
          lore: "Discipline triumphs over motivation. The streak burns steady regardless of circumstances.",
          isUnlocked: currentXp >= 5000,
        },
      ],
      rewards: [
        {
          id: "rew_kirana_250",
          title: "₹250 Local Kirana Fuel Voucher",
          type: "voucher",
          valueDescription: "Direct store credit for sattu, paneer, sprouts, and nuts at verified Delhi merchants.",
          voucherCode: "KIRANA-APEX-8420",
          isUnlocked: currentXp >= 5000,
          isClaimed: !!claimedRewardIds["rew_kirana_250"],
        },
        {
          id: "rew_arena_glow",
          title: "Gold Shimmer Arena Row Glow",
          type: "aura",
          valueDescription: "Highlights your position on live leaderboards with an animated golden shimmer halo.",
          isUnlocked: currentXp >= 5000,
          isClaimed: !!claimedRewardIds["rew_arena_glow"],
        },
        {
          id: "rew_coach_priority",
          title: "Coach Priority Video Queue",
          type: "perk",
          valueDescription: "Guaranteed same-day booking window with Coach Sarah Jenkins & Dr. Marcus Vance.",
          isUnlocked: currentXp >= 5000,
          isClaimed: !!claimedRewardIds["rew_coach_priority"],
        },
      ],
    },
    {
      id: "emerald",
      tierNumber: 4,
      name: "Emerald Titan",
      tierSlug: "emerald",
      xpThreshold: 10000,
      rankThreshold: "Top 25 Contenders",
      status: currentXp >= 20000 ? "unlocked" : currentXp >= 10000 ? "current" : "locked",
      accentColor: "border-emerald-600 text-[#1B4332] bg-emerald-50",
      bgGrad: "from-emerald-600/15 to-emerald-800/10",
      tagline: "Masters of physical resilience, sustainable clean eating, and communal leadership.",
      badges: [
        {
          id: "sub_25_elite",
          name: "Sub-25 Elite",
          rarity: "Epic",
          iconName: "ShieldCheck",
          requirement: "Reach and defend a Top 25 position on the Global Arena for at least 7 days.",
          lore: "You are not just participating; you are dictating the pace of the global tournament.",
          isUnlocked: currentXp >= 10000,
        },
        {
          id: "centurion_lifter",
          name: "Centurion Lifter",
          rarity: "Legendary",
          iconName: "Dumbbell",
          requirement: "Log over 50,000kg cumulative volume in compound movements.",
          lore: "Fifty tons of iron lifted with pristine form and logged micro-increments.",
          isUnlocked: currentXp >= 10000,
        },
      ],
      rewards: [
        {
          id: "rew_emerald_particles",
          title: "Emerald Particle Avatar Halo",
          type: "aura",
          valueDescription: "Continuous floating emerald embers orbiting your profile badge across the entire platform.",
          isUnlocked: currentXp >= 10000,
          isClaimed: !!claimedRewardIds["rew_emerald_particles"],
        },
        {
          id: "rew_farm_box",
          title: "₹500 Organic Farm Direct Credit",
          type: "voucher",
          valueDescription: "Covers cold-pressed oils, organic unpolished lentils, and artisanal tofu delivery.",
          voucherCode: "FARM-DIRECT-TITAN",
          isUnlocked: currentXp >= 10000,
          isClaimed: !!claimedRewardIds["rew_farm_box"],
        },
      ],
    },
    {
      id: "apex",
      tierNumber: 5,
      name: "Apex Legend",
      tierSlug: "apex",
      xpThreshold: 20000,
      rankThreshold: "Top 10 Grandmasters",
      status: currentXp >= 20000 ? "unlocked" : "locked",
      accentColor: "border-purple-600 text-purple-950 bg-purple-50",
      bgGrad: "from-purple-600/15 via-emerald-600/10 to-amber-500/10",
      tagline: "The immortal pantheon of FitMeal athletes. Absolute perfection of nutrition & power.",
      badges: [
        {
          id: "crown_of_olympus",
          name: "Crown of Olympus",
          rarity: "Legendary",
          iconName: "Crown",
          requirement: "Finish in the Top 3 of any official 30-day tournament season.",
          lore: "An immortalized achievement permanently etched into the FitMeal Hall of Champions.",
          isUnlocked: currentXp >= 20000,
        },
        {
          id: "omni_master",
          name: "Omni-Discipline Master",
          rarity: "Legendary",
          iconName: "Zap",
          requirement: "Score 95%+ simultaneously in Sleep, Nutrition Adherence, and Volume.",
          lore: "A bio-harmonized athlete functioning at maximum human output.",
          isUnlocked: currentXp >= 20000,
        },
      ],
      rewards: [
        {
          id: "rew_physical_trophy",
          title: "Custom Cast-Iron Apex Trophy",
          type: "perk",
          valueDescription: "Heavy laser-engraved steel crest with your name and season rank shipped to your home.",
          isUnlocked: currentXp >= 20000,
          isClaimed: !!claimedRewardIds["rew_physical_trophy"],
        },
        {
          id: "rew_hall_of_fame",
          title: "Permanent Hall of Fame Plaque",
          type: "aura",
          valueDescription: "Golden verified champion badge and permanently pinned banner in South Delhi arena.",
          isUnlocked: currentXp >= 20000,
          isClaimed: !!claimedRewardIds["rew_hall_of_fame"],
        },
        {
          id: "rew_grocery_stipend",
          title: "₹2,000 Monthly Kirana Stipend",
          type: "voucher",
          valueDescription: "Sponsored recurring monthly grocery credit for your optimal high-protein meal prep.",
          voucherCode: "APEX-STIPEND-LEGEND",
          isUnlocked: currentXp >= 20000,
          isClaimed: !!claimedRewardIds["rew_grocery_stipend"],
        },
      ],
    },
  ];

  // Current active tier computation
  const currentTier = tiers.find((t) => t.status === "current") || tiers[2];
  
  // Next tier to achieve
  const currentTierIndex = tiers.findIndex((t) => t.id === currentTier.id);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;

  // XP needed for next milestone
  const xpNeededForNext = nextTier ? Math.max(0, nextTier.xpThreshold - currentXp) : 0;
  const currentTierSpan = nextTier ? nextTier.xpThreshold - currentTier.xpThreshold : 10000;
  const currentTierProgress = nextTier
    ? Math.min(100, Math.max(0, ((currentXp - currentTier.xpThreshold) / currentTierSpan) * 100))
    : 100;

  // Filtered tiers list
  const filteredTiers = tiers.filter((t) => {
    if (filterTab === "all") return true;
    if (filterTab === "unlocked") return t.status === "unlocked";
    if (filterTab === "current") return t.status === "current";
    if (filterTab === "locked") return t.status === "locked";
    return true;
  });

  // Active selected tier object
  const activeSelectedTier = tiers.find((t) => t.id === selectedTierId) || currentTier;

  // Handle claiming digital reward
  const handleClaimReward = (reward: DigitalReward) => {
    if (!reward.isUnlocked) return;
    const code = reward.voucherCode || `KIRANA-${reward.id.replace("rew_", "").toUpperCase()}`;
    setClaimedRewardIds((prev) => ({ ...prev, [reward.id]: code }));
    setFeedbackNotice(`🎁 ${reward.title} successfully claimed!`);
    if (onTriggerConfetti) onTriggerConfetti();
    setTimeout(() => setFeedbackNotice(null), 3500);
  };

  // Handle equip badge
  const handleEquipBadge = (badge: RewardBadge) => {
    if (!badge.isUnlocked) return;
    setActiveBadge(badge.id);
    if (onEquipBadge) {
      onEquipBadge(badge.id, badge.name);
    }
    setFeedbackNotice(`🛡️ Equipped badge: "${badge.name}"!`);
    setTimeout(() => setFeedbackNotice(null), 3000);
  };

  // Copy code helper
  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  // Helper render for badge icon
  const renderBadgeIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "Crown":
        return <Crown className={className} />;
      case "Store":
        return <Store className={className} />;
      case "Dumbbell":
        return <Dumbbell className={className} />;
      case "Compass":
        return <Compass className={className} />;
      case "Zap":
        return <Zap className={className} />;
      case "Flame":
        return <Flame className={className} />;
      case "ShieldCheck":
        return <ShieldCheck className={className} />;
      case "Award":
      default:
        return <Award className={className} />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reward-tiers-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900 font-sans">
        
        {/* Floating Notification */}
        {feedbackNotice && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-[#1B4332] text-white px-5 py-2.5 rounded-full shadow-lg border border-emerald-500/40 text-xs font-bold flex items-center gap-2 animate-bounce">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{feedbackNotice}</span>
          </div>
        )}

        {/* 1. Modal Header */}
        <div className="relative px-6 py-5 bg-[#1B4332] text-white shrink-0 border-b border-[#2d5f47]">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-80 h-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-[#1B4332] font-mono text-[11px] font-bold tracking-wider uppercase">
                  SEASON 4 ARENA
                </span>
                <span className="text-emerald-300 text-xs font-medium">· Rank &amp; XP Milestones</span>
              </div>
              <h2
                id="reward-tiers-title"
                className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5"
              >
                <Trophy className="w-7 h-7 text-emerald-400 shrink-0" />
                <span>Arena Reward Tiers &amp; Badges</span>
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
                Climb the leaderboards through verified hypertrophy sessions, unbroken habit streaks, and hyper-local Kirana fuel logging to unlock real-world vouchers and digital badges.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 2. User Live Status & Next Milestone HUD */}
          <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            
            {/* Athlete profile */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-[#1B4332] font-black text-sm flex items-center justify-center shadow-md border-2 border-white/40 shrink-0">
                DK
                {/* Active Tier Marker */}
                <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-amber-400 text-[#1B4332]">
                  <Crown className="w-3 h-3" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">David Kim</span>
                  <span className="text-[11px] font-mono font-bold bg-amber-400/90 text-amber-950 px-2 py-0.2 rounded-full">
                    {currentTier.name}
                  </span>
                </div>
                <div className="text-xs text-emerald-200 flex items-center gap-2 mt-0.5">
                  <span className="font-bold">Rank #{currentRank} Global</span>
                  <span>·</span>
                  <span className="font-mono text-emerald-300 font-bold">{currentXp.toLocaleString()} XP</span>
                </div>
              </div>
            </div>

            {/* Next Milestone Progress Bar */}
            <div className="md:col-span-2 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-200">
                  {nextTier ? (
                    <>
                      Milestone to <strong className="text-white">{nextTier.name}</strong>:
                    </>
                  ) : (
                    <span>Max Tier Achieved</span>
                  )}
                </span>
                <span className="font-mono font-bold text-emerald-300">
                  {nextTier ? `${xpNeededForNext.toLocaleString()} XP Remaining (${Math.round(currentTierProgress)}%)` : "Apex Tier Unlocked"}
                </span>
              </div>
              <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-200 rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${currentTierProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-emerald-200/80 font-mono">
                <span>{currentTier.name} ({currentTier.xpThreshold.toLocaleString()} XP)</span>
                {nextTier && <span>{nextTier.name} ({nextTier.xpThreshold.toLocaleString()} XP)</span>}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Filter Navigation & Tier Quick Jump Tabs */}
        <div className="px-6 py-3 bg-[#F8FAFC] border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
            {(["all", "unlocked", "current", "locked"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                  filterTab === tab
                    ? "bg-[#1B4332] text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab === "current" ? "Active Tier" : tab}
              </button>
            ))}
          </div>

          {/* Quick Tier Jump Selector */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {tiers.map((t) => {
              const isSelected = selectedTierId === t.id;
              const isCurrent = t.status === "current";
              const isUnlocked = t.status === "unlocked" || isCurrent;

              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTierId(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-[#1B4332] text-white border-[#1B4332] shadow-2xs"
                      : isCurrent
                      ? "bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100"
                      : isUnlocked
                      ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      : "bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200/60"
                  }`}
                >
                  {isUnlocked ? (
                    <Unlock className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-400" : "text-emerald-700"}`} />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>{t.name}</span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Main Scrollable Content: Tier Inspection & Badges */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
          
          {/* Active Inspected Tier Hero Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
            {/* Background Accent Tone */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${activeSelectedTier.bgGrad} rounded-full blur-3xl pointer-events-none`} />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase">
                    Tier {activeSelectedTier.tierNumber} of 5
                  </span>
                  
                  {activeSelectedTier.status === "current" ? (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      YOUR ACTIVE TIER
                    </span>
                  ) : activeSelectedTier.status === "unlocked" ? (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      UNLOCKED &amp; ACHIEVED
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      LOCKED (Requires {activeSelectedTier.xpThreshold.toLocaleString()} XP)
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {activeSelectedTier.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  {activeSelectedTier.tagline}
                </p>
              </div>

              {/* Requirement badge */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-right shrink-0">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Qualification</div>
                <div className="text-sm font-black text-slate-900 font-mono">
                  {activeSelectedTier.xpThreshold.toLocaleString()} XP
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold">{activeSelectedTier.rankThreshold}</div>
              </div>
            </div>

            {/* Sub-Section A: Unlockable Badges */}
            <div className="pt-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                    Unlockable Badges ({activeSelectedTier.badges.length})
                  </h4>
                </div>
                <span className="text-[11px] text-slate-500">Click any badge to inspect or equip</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {activeSelectedTier.badges.map((badge) => {
                  const isEquipped = activeBadge === badge.id;
                  const isUnlocked = badge.isUnlocked;

                  return (
                    <div
                      key={badge.id}
                      onClick={() => setInspectingBadge(badge)}
                      className={`relative p-3.5 rounded-2xl border transition-all text-left group cursor-pointer ${
                        isEquipped
                          ? "bg-emerald-50/80 border-emerald-400 shadow-xs ring-2 ring-emerald-500/20"
                          : isUnlocked
                          ? "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 shadow-2xs"
                          : "bg-slate-50/60 border-slate-200 opacity-60 hover:opacity-85"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${
                            isEquipped
                              ? "bg-[#1B4332] text-emerald-300 border-[#1B4332]"
                              : isUnlocked
                              ? "bg-emerald-100/70 text-emerald-800 border-emerald-200"
                              : "bg-slate-200 text-slate-400 border-slate-300"
                          }`}
                        >
                          {renderBadgeIcon(badge.iconName, "w-5 h-5")}
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              badge.rarity === "Legendary"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : badge.rarity === "Epic"
                                ? "bg-purple-100 text-purple-800 border border-purple-200"
                                : badge.rarity === "Rare"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            {badge.rarity}
                          </span>

                          {isEquipped && (
                            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                              <Check className="w-3 h-3 stroke-[3]" /> Equipped
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="font-bold text-sm text-slate-900 group-hover:text-[#1B4332] transition-colors">
                        {badge.name}
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                        {badge.requirement}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1 group-hover:text-slate-600">
                          <Eye className="w-3 h-3" /> View Lore
                        </span>

                        {isUnlocked && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEquipBadge(badge);
                            }}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                              isEquipped
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900"
                            }`}
                          >
                            {isEquipped ? "Active" : "Equip"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sub-Section B: Digital Rewards & Real-World Vouchers */}
            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                  Digital Rewards &amp; Fuel Vouchers ({activeSelectedTier.rewards.length})
                </h4>
              </div>

              <div className="space-y-2.5">
                {activeSelectedTier.rewards.map((reward) => {
                  const isClaimed = !!claimedRewardIds[reward.id] || reward.isClaimed;
                  const voucherCode = claimedRewardIds[reward.id] || reward.voucherCode;
                  const isUnlocked = reward.isUnlocked;

                  return (
                    <div
                      key={reward.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isClaimed
                          ? "bg-slate-50 border-slate-200"
                          : isUnlocked
                          ? "bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50/80"
                          : "bg-slate-50/40 border-slate-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                            isUnlocked
                              ? "bg-white text-emerald-700 border-emerald-200 shadow-2xs"
                              : "bg-slate-200 text-slate-400 border-slate-300"
                          }`}
                        >
                          {reward.type === "voucher" ? (
                            <Store className="w-5 h-5 text-emerald-700" />
                          ) : reward.type === "aura" ? (
                            <Sparkles className="w-5 h-5 text-amber-600" />
                          ) : (
                            <ShieldCheck className="w-5 h-5 text-emerald-700" />
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{reward.title}</span>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.2 rounded bg-slate-200 text-slate-700">
                              {reward.type}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-snug">
                            {reward.valueDescription}
                          </p>
                        </div>
                      </div>

                      {/* Claim Action / Voucher code */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        {isClaimed && voucherCode ? (
                          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 shadow-2xs">
                            <span>{voucherCode}</span>
                            <button
                              onClick={() => handleCopyCode(reward.id, voucherCode)}
                              className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-800 cursor-pointer"
                              title="Copy Voucher Code"
                            >
                              {copiedCodeId === reward.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ) : isUnlocked ? (
                          <button
                            onClick={() => handleClaimReward(reward)}
                            className="px-4 py-2 rounded-xl bg-[#1B4332] hover:bg-[#153427] text-white text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs flex items-center gap-1.5"
                          >
                            <Gift className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Claim Reward</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Locked</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* All Tiers Overview Table & Milestone Map */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-black text-base text-slate-900">
                  Global Arena Tier Ladder
                </h4>
                <p className="text-xs text-slate-500">
                  Progression thresholds for Season 4: Apex Protocol
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {filteredTiers.map((tier) => {
                const isCurrent = tier.status === "current";
                const isUnlocked = tier.status === "unlocked" || isCurrent;

                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                      selectedTierId === tier.id
                        ? "border-[#1B4332] bg-[#1B4332]/5 ring-2 ring-[#1B4332]/20 shadow-xs"
                        : isCurrent
                        ? "border-emerald-400 bg-emerald-50/50"
                        : isUnlocked
                        ? "border-slate-200 bg-white hover:bg-slate-50"
                        : "border-slate-200 bg-slate-50/60 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                        T{tier.tierNumber}
                      </span>
                      {isUnlocked ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </div>

                    <div className="font-bold text-xs text-slate-900 truncate">
                      {tier.name}
                    </div>

                    <div className="text-[11px] font-mono font-bold text-emerald-800 mt-1">
                      {tier.xpThreshold.toLocaleString()} XP
                    </div>

                    <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                      {tier.rankThreshold}
                    </div>

                    {isCurrent && (
                      <div className="mt-2 pt-1 border-t border-emerald-200 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Current Rank
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Footer Summary Strip */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>
              All digital vouchers are instantly synced to your <strong>fitmeal</strong> wallet.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* 6. Deep Inspect Badge Lore Modal Drawer */}
      {inspectingBadge && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
            <button
              onClick={() => setInspectingBadge(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-emerald-400 flex items-center justify-center border border-[#2d5f47] shadow-md">
                {renderBadgeIcon(inspectingBadge.iconName, "w-6 h-6")}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {inspectingBadge.rarity} Badge
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {inspectingBadge.name}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Unlock Requirement
                </div>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {inspectingBadge.requirement}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  Lore &amp; Prestige
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed italic">
                  &ldquo;{inspectingBadge.lore}&rdquo;
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setInspectingBadge(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Dismiss
                </button>
                {inspectingBadge.isUnlocked ? (
                  <button
                    onClick={() => {
                      handleEquipBadge(inspectingBadge);
                      setInspectingBadge(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeBadge === inspectingBadge.id
                        ? "bg-slate-200 text-slate-700"
                        : "bg-[#1B4332] hover:bg-[#153427] text-white shadow-xs"
                    }`}
                  >
                    {activeBadge === inspectingBadge.id ? "Currently Equipped" : "Equip on Public Profile"}
                  </button>
                ) : (
                  <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-xl">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
