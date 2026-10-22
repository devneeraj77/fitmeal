"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import {
  Bell,
  X,
  Sparkles,
  Trophy,
  Dumbbell,
  Award,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import CanvasBadge, { BadgeTier } from "./CanvasBadge";
import { fireBadgeEquipGlint } from "@/lib/confetti";

export type ArenaToastType = "tier_proximity" | "rank_surpassed" | "tier_unlocked" | "karma_bump";

export interface ArenaToast {
  id: string;
  type: ArenaToastType;
  title: string;
  message: string;
  timestamp: string;
  tierId?: BadgeTier;
  targetTierName?: string;
  xpRemaining?: number;
  rivalName?: string;
  rivalRank?: number;
  userOldRank?: number;
  userNewRank?: number;
  actionLabel?: string;
  actionType?: "open_tiers" | "retake_rank" | "claim_perk";
  duration?: number; // ms, default 6500
}

interface ArenaToastContextValue {
  toasts: ArenaToast[];
  history: ArenaToast[];
  addToast: (toast: Omit<ArenaToast, "id" | "timestamp">) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (open: boolean) => void;
  simulateRivalOvertake: () => void;
  simulateTierProximity: () => void;
  simulateTierUnlocked: () => void;
}

const ArenaToastContext = createContext<ArenaToastContextValue | null>(null);

export function useArenaToast() {
  const ctx = useContext(ArenaToastContext);
  if (!ctx) {
    throw new Error("useArenaToast must be used within an ArenaToastProvider");
  }
  return ctx;
}

interface ArenaToastProviderProps {
  children: ReactNode;
  userXp: number;
  userRank: number;
  onOpenTiersModal?: () => void;
  onLogWorkout?: () => void;
  onUserClimb?: (newRank: number) => void;
  onUserRankDrop?: (newRank: number) => void;
}

export function ArenaToastProvider({
  children,
  userXp,
  userRank,
  onOpenTiersModal,
  onLogWorkout,
  onUserClimb,
  onUserRankDrop,
}: ArenaToastProviderProps) {
  const [toasts, setToasts] = useState<ArenaToast[]>([]);
  const [history, setHistory] = useState<ArenaToast[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [hasShownInitialProximity, setHasShownInitialProximity] = useState(false);

  // Add a toast
  const addToast = useCallback((toastData: Omit<ArenaToast, "id" | "timestamp">) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newToast: ArenaToast = { ...toastData, id, timestamp };

    setToasts((prev) => [newToast, ...prev.slice(0, 3)]); // Keep up to 4 active onscreen
    setHistory((prev) => [newToast, ...prev.slice(0, 19)]); // Store 20 in notification drawer
    setUnreadCount((prev) => prev + 1);

    // Subtle audio/haptic feedback
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(50);
      } catch {
        // Ignore devices that block vibration
      }
    }
  }, []);

  // Remove toast
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
    setUnreadCount(0);
  }, []);

  // Simulation: Rival overtakes David Kim in the leaderboard
  const simulateRivalOvertake = useCallback(() => {
    const rivals = [
      { name: "Kabir Mehta", handle: "@kabir_lift", location: "Greater Kailash", volume: "3,800kg" },
      { name: "Vikram Malhotra", handle: "@vikram_iron", location: "Saket", volume: "4,200kg" },
      { name: "Ananya Iyer", handle: "@ananya_run", location: "South Delhi", volume: "2,950kg" },
    ];
    const rival = rivals[Math.floor(Math.random() * rivals.length)];
    const droppedRank = userRank + 1;

    if (onUserRankDrop) {
      onUserRankDrop(droppedRank);
    }

    addToast({
      type: "rank_surpassed",
      title: "Rival Passed You on the Leaderboard!",
      message: `${rival.name} just logged a massive session (+180 XP) and claimed Rank #${userRank}. You dropped to #${droppedRank}!`,
      rivalName: rival.name,
      rivalRank: userRank,
      userOldRank: userRank,
      userNewRank: droppedRank,
      actionLabel: "Counter Lift (+150 XP)",
      actionType: "retake_rank",
      duration: 8000,
    });
  }, [addToast, onUserRankDrop, userRank]);

  // Simulation: Proximity to next tier milestone
  const simulateTierProximity = useCallback(() => {
    // Distance to Emerald Titan (10,000 XP)
    const xpLeft = Math.max(80, 10000 - userXp);

    addToast({
      type: "tier_proximity",
      title: "Approaching Emerald Titan Tier!",
      message: `You are only ${xpLeft.toLocaleString()} XP away from unlocking Emerald Titan! Next perk: ₹500 Organic Farm Direct credit & Emerald Halo.`,
      tierId: "emerald",
      targetTierName: "Emerald Titan",
      xpRemaining: xpLeft,
      actionLabel: "Inspect Reward Tiers",
      actionType: "open_tiers",
      duration: 8000,
    });
  }, [addToast, userXp]);

  // Simulation: Unlocking new tier
  const simulateTierUnlocked = useCallback(() => {
    addToast({
      type: "tier_unlocked",
      title: "🎉 New Reward Tier Unlocked!",
      message: "Congratulations! You have officially breached the qualification threshold for Emerald Titan. Your digital voucher is ready to claim.",
      tierId: "emerald",
      targetTierName: "Emerald Titan",
      actionLabel: "Claim Digital Voucher",
      actionType: "claim_perk",
      duration: 9000,
    });
    fireBadgeEquipGlint();
  }, [addToast]);

  // Gentle initial proximity check on mount (after 3.5s delay so page loads gracefully)
  useEffect(() => {
    if (hasShownInitialProximity) return;
    const timer = setTimeout(() => {
      // If user is within 1,600 XP of 10,000 XP milestone
      if (userXp >= 8000 && userXp < 10000) {
        addToast({
          type: "tier_proximity",
          title: "Tier Milestone Within Reach",
          message: `You're within ${(10000 - userXp).toLocaleString()} XP of Emerald Titan. Keep up your Kirana meal logs & compound sets!`,
          tierId: "emerald",
          targetTierName: "Emerald Titan",
          xpRemaining: 10000 - userXp,
          actionLabel: "View Reward Tiers",
          actionType: "open_tiers",
          duration: 7000,
        });
        setHasShownInitialProximity(true);
      }
    }, 3800);

    return () => clearTimeout(timer);
  }, [addToast, hasShownInitialProximity, userXp]);

  // Handler for toast action click
  const handleAction = (toast: ArenaToast) => {
    removeToast(toast.id);
    if (toast.actionType === "open_tiers" || toast.actionType === "claim_perk") {
      if (onOpenTiersModal) onOpenTiersModal();
    } else if (toast.actionType === "retake_rank") {
      if (onLogWorkout) onLogWorkout();
      if (onUserClimb) {
        onUserClimb(Math.max(1, (toast.userOldRank || userRank) - 1));
      }
    }
  };

  return (
    <ArenaToastContext.Provider
      value={{
        toasts,
        history,
        addToast,
        removeToast,
        clearAll,
        unreadCount,
        isHistoryOpen,
        setIsHistoryOpen,
        simulateRivalOvertake,
        simulateTierProximity,
        simulateTierUnlocked,
      }}
    >
      {children}

      {/* Floating Active Toast Stack */}
      <aside
        aria-label="Arena Notifications"
        aria-live="polite"
        className="fixed top-20 right-3 sm:right-6 z-50 flex flex-col gap-3 w-[calc(100vw-1.5rem)] sm:w-[420px] max-w-full pointer-events-none"
      >
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onDismiss={() => removeToast(toast.id)}
            onAction={() => handleAction(toast)}
          />
        ))}
      </aside>

      {/* Notification Center Slide-over Drawer */}
      {isHistoryOpen && (
        <NotificationHistoryDrawer
          history={history}
          onClose={() => {
            setIsHistoryOpen(false);
            setUnreadCount(0);
          }}
          onOpenTiersModal={onOpenTiersModal}
          onSimulateRival={simulateRivalOvertake}
          onSimulateProximity={simulateTierProximity}
        />
      )}
    </ArenaToastContext.Provider>
  );
}

// -------------------------------------------------------------
// Individual Interactive Toast Card
// -------------------------------------------------------------
interface ToastCardProps {
  toast: ArenaToast;
  onDismiss: () => void;
  onAction: () => void;
}

function ToastCard({ toast, onDismiss, onAction }: ToastCardProps) {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const duration = toast.duration || 6500;

  // Trigger onDismiss cleanly in an effect when progress reaches 0
  useEffect(() => {
    if (progress <= 0) {
      onDismiss();
    }
  }, [progress, onDismiss]);

  // Progress countdown interval
  useEffect(() => {
    if (isPaused) return;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - step));
    }, interval);

    return () => clearInterval(timer);
  }, [duration, isPaused]);

  const isRival = toast.type === "rank_surpassed";
  const isTierProximity = toast.type === "tier_proximity";
  const isTierUnlock = toast.type === "tier_unlocked";

  return (
    <article
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`pointer-events-auto relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl transition-all duration-300 animate-in slide-in-from-top-4 sm:slide-in-from-right-4 overflow-hidden border backdrop-blur-xl ${
        isRival
          ? "bg-gradient-to-br from-[#1C0F0A] via-[#140B07] to-[#0A0503] border-amber-500/40 text-amber-50"
          : isTierUnlock
          ? "bg-gradient-to-br from-[#2D163D] via-[#1A0E24] to-[#121815] border-[#9c67b5]/50 text-white"
          : "bg-gradient-to-br from-[#121815] via-[#0B0E0C] to-[#121815] border-[#757761]/40 text-[#E2E7DE]"
      }`}
    >
      {/* Subtle ambient light sweep */}
      <div
        className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-40 ${
          isRival ? "bg-amber-500" : isTierUnlock ? "bg-[#9c67b5]" : "bg-[#f7fe72]"
        }`}
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        {/* Left Icon Badge */}
        <div className="shrink-0 pt-0.5">
          {isRival ? (
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-5 h-5 text-amber-400 animate-bounce" />
            </div>
          ) : isTierUnlock ? (
            <CanvasBadge tier="emerald" emblem="trophy" size={42} interactive={false} />
          ) : isTierProximity && toast.tierId ? (
            <CanvasBadge tier={toast.tierId} emblem="shield" size={42} interactive={false} />
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-[#9c67b5]/20 text-[#f7fe72] border border-[#9c67b5]/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#f7fe72]" />
            </div>
          )}
        </div>

        {/* Content body */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isRival
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : isTierUnlock
                  ? "bg-[#9c67b5]/30 text-[#f7fe72] border border-[#9c67b5]/50"
                  : "bg-[#9c67b5]/20 text-[#f7fe72] border border-[#9c67b5]/30"
              }`}
            >
              {isRival ? "RIVAL ALERT" : isTierUnlock ? "TIER PROMOTION" : "TIER PROXIMITY"}
            </span>
            <span className="text-[10px] text-[#A0A594] font-mono">{toast.timestamp}</span>
          </div>

          <h4 className="text-sm font-black text-white tracking-tight leading-snug">
            {toast.title}
          </h4>

          <p className="text-xs text-[#CBD2C7]/90 mt-1 leading-relaxed">
            {toast.message}
          </p>

          {/* Tier Proximity Mini Bar */}
          {isTierProximity && toast.xpRemaining !== undefined && (
            <div className="mt-2.5 p-2 rounded-xl bg-black/40 border border-[#757761]/25 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#A0A594]">Distance to {toast.targetTierName}</span>
                <span className="text-[#f7fe72] font-bold">{toast.xpRemaining.toLocaleString()} XP to go</span>
              </div>
              <div className="w-full h-1.5 bg-[#0B0E0C] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] rounded-full"
                  style={{ width: "85%" }}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          {toast.actionLabel && (
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={onAction}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-md ${
                  isRival
                    ? "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-300 text-[#0B0E0C] font-black"
                    : "bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] font-black shadow-lg shadow-[#f7fe72]/20"
                }`}
              >
                {isRival ? (
                  <Dumbbell className="w-3.5 h-3.5" />
                ) : (
                  <Award className="w-3.5 h-3.5 text-[#0B0E0C]" />
                )}
                <span>{toast.actionLabel}</span>
                <ChevronRight className="w-3 h-3 stroke-[3]" />
              </button>

              <button
                type="button"
                onClick={onDismiss}
                className="px-2.5 py-1.5 text-xs text-[#A0A594] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded-lg text-[#A0A594] hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Auto-dismiss countdown bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className={`h-full transition-all linear ${
            isRival
              ? "bg-gradient-to-r from-amber-500 to-yellow-400"
              : "bg-gradient-to-r from-[#f7fe72] to-[#f4e76e]"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </article>
  );
}

// -------------------------------------------------------------
// Notification History Slide-over Drawer
// -------------------------------------------------------------
interface NotificationHistoryDrawerProps {
  history: ArenaToast[];
  onClose: () => void;
  onOpenTiersModal?: () => void;
  onSimulateRival: () => void;
  onSimulateProximity: () => void;
}

function NotificationHistoryDrawer({
  history,
  onClose,
  onOpenTiersModal,
  onSimulateRival,
  onSimulateProximity,
}: NotificationHistoryDrawerProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Notification Center"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-md h-full bg-[#0B1510] text-white border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#9c67b5]/20 text-[#f7fe72] flex items-center justify-center border border-[#9c67b5]/30">
              <Bell className="w-4 h-4 text-[#f7fe72]" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">Arena Notification Center</h3>
              <p className="text-[11px] text-[#A0A594]">Rival alerts &amp; tier qualification log</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A0A594] hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Simulation Controls */}
        <div className="p-4 bg-black/30 border-b border-white/5 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A0A594] block font-bold">
            Simulate Arena Events (Testing)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onSimulateRival}
              className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Rival Overtake</span>
            </button>

            <button
              onClick={onSimulateProximity}
              className="px-3 py-2 rounded-xl bg-[#9c67b5]/20 hover:bg-[#9c67b5]/30 text-[#f7fe72] border border-[#9c67b5]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#f7fe72]" />
              <span>Tier Proximity</span>
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-[#757761] space-y-2">
              <Bell className="w-8 h-8 mx-auto text-[#757761] opacity-60" />
              <p className="text-xs">No notifications yet. You are holding your ground!</p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                  item.type === "rank_surpassed"
                    ? "bg-amber-950/20 border-amber-500/30 text-amber-100"
                    : "bg-white/[0.03] border-white/10 text-[#E2E7DE]"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-[#A0A594] font-mono">
                  <span
                    className={`font-bold uppercase ${
                      item.type === "rank_surpassed" ? "text-amber-400" : "text-[#f7fe72]"
                    }`}
                  >
                    {item.type.replace("_", " ")}
                  </span>
                  <span>{item.timestamp}</span>
                </div>
                <h5 className="font-bold text-white text-sm">{item.title}</h5>
                <p className="text-[#CBD2C7] leading-snug">{item.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => {
              if (onOpenTiersModal) onOpenTiersModal();
              onClose();
            }}
            className="text-xs font-bold text-[#f7fe72] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-[#f7fe72]" />
            <span>Open Reward Tiers</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Notification Bell Trigger Button (For Header navigation)
// -------------------------------------------------------------
interface ArenaNotificationBellProps {
  className?: string;
}

export function ArenaNotificationBell({ className = "" }: ArenaNotificationBellProps) {
  const { unreadCount, setIsHistoryOpen } = useArenaToast();

  return (
    <button
      type="button"
      onClick={() => setIsHistoryOpen(true)}
      className={`relative p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-[#CBD2C7] hover:text-white transition-colors cursor-pointer ${className}`}
      title="Open Arena Notifications"
      aria-label="Open notifications"
    >
      <Bell className="w-4 h-4 text-[#f7fe72]" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] text-[#0B0E0C] font-black text-[10px] flex items-center justify-center shadow-md animate-pulse">
          {unreadCount}
        </span>
      )}
    </button>
  );
}

// -------------------------------------------------------------
// Interactive Rival Watcher Widget (For placing in the Leaderboards)
// -------------------------------------------------------------
export function ArenaRivalWatchWidget() {
  const { simulateRivalOvertake, simulateTierProximity, simulateTierUnlocked } = useArenaToast();
  const [autoSimulate, setAutoSimulate] = useState(false);

  // Background recurring simulation every 45s when toggled on
  useEffect(() => {
    if (!autoSimulate) return;
    const interval = setInterval(() => {
      const actions = [simulateRivalOvertake, simulateTierProximity];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      randomAction();
    }, 45000);

    return () => clearInterval(interval);
  }, [autoSimulate, simulateRivalOvertake, simulateTierProximity]);

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-[#121815] border border-[#757761]/35 text-white shadow-md space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f7fe72] animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f7fe72]">
            Live Rival Watch &amp; Toast Simulator
          </span>
        </div>

        <button
          onClick={() => setAutoSimulate(!autoSimulate)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 w-fit ${
            autoSimulate
              ? "bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] text-[#0B0E0C] font-black shadow-xs"
              : "bg-white/10 text-[#CBD2C7] hover:bg-white/20"
          }`}
        >
          <RotateCcw className={`w-3 h-3 ${autoSimulate ? "animate-spin" : ""}`} />
          <span>{autoSimulate ? "Live Alerts Active (45s)" : "Auto-Simulate Off"}</span>
        </button>
      </div>

      <p className="text-xs text-[#A0A594] leading-relaxed">
        Test instant push toast notifications for when you are nearing a reward tier or when South Delhi contenders pass you in rank.
      </p>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={simulateRivalOvertake}
          className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Trigger &ldquo;Rival Passed You&rdquo;</span>
        </button>

        <button
          onClick={simulateTierProximity}
          className="px-3 py-1.5 rounded-xl bg-[#9c67b5]/20 hover:bg-[#9c67b5]/30 border border-[#9c67b5]/40 text-[#f7fe72] text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#f7fe72]" />
          <span>Trigger &ldquo;Tier Proximity&rdquo;</span>
        </button>

        <button
          onClick={simulateTierUnlocked}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#f7fe72]" />
          <span>Trigger &ldquo;Tier Unlocked&rdquo;</span>
        </button>
      </div>
    </div>
  );
}
