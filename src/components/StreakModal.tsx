"use client";

import React from "react";
import { X, Flame, Award, Check } from "lucide-react";

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StreakModal({ isOpen, onClose }: StreakModalProps) {
  if (!isOpen) return null;

  const daysOfWeek = [
    { day: "Mon", status: "completed", date: "Oct 16" },
    { day: "Tue", status: "completed", date: "Oct 17" },
    { day: "Wed", status: "completed", date: "Oct 18" },
    { day: "Thu", status: "completed", date: "Oct 19" },
    { day: "Fri", status: "completed", date: "Oct 20" },
    { day: "Sat", status: "completed", date: "Oct 21" },
    { day: "Sun", status: "today", date: "Oct 22" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#121815] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#757761]/40 overflow-hidden text-white">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A0A493] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Flame Header Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#757761]/20 text-[#f7fe72] flex items-center justify-center border border-[#757761]/40">
            <Flame className="w-7 h-7 fill-[#f7fe72] text-[#f7fe72]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#f7fe72] uppercase tracking-wider font-mono">
              ACTIVE HABIT STREAK
            </span>
            <h3 className="text-2xl font-black text-white leading-tight">
              12 Consecutive Days
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#A0A493] leading-relaxed mb-5">
          You have recorded at least one biometric session, workout, or guided breathwork flow every day since October 11.
        </p>

        {/* Weekly Adherence Strip */}
        <div className="p-4 rounded-2xl bg-[#0B0E0C] border border-[#757761]/30 mb-5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#CBD2C7] mb-3">
            <span>This Week&#39;s Protocol Adherence</span>
            <span className="text-[#f7fe72] font-bold font-mono">100% Target Met</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {daysOfWeek.map((d, i) => (
              <div
                key={i}
                className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 ${
                  d.status === "completed"
                    ? "bg-[#757761]/30 text-[#f7fe72] border border-[#757761]/50"
                    : d.status === "today"
                    ? "bg-[#f7fe72]/15 text-[#f7fe72] border border-[#f7fe72] ring-2 ring-[#f7fe72]/30"
                    : "bg-[#121815] text-[#757761] border border-[#757761]/30"
                }`}
              >
                <span className="text-[10px] font-bold">{d.day}</span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center">
                  {d.status === "completed" ? (
                    <Check className="w-3.5 h-3.5 stroke-[3] text-[#f7fe72]" />
                  ) : (
                    <Flame className="w-3.5 h-3.5 text-[#f7fe72] fill-[#f7fe72]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Card */}
        <div className="p-3.5 rounded-2xl bg-[#0B0E0C] border border-[#757761]/30 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#757761]/20 text-[#f7fe72] border border-[#757761]/40 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-[#f7fe72]" />
          </div>
          <div>
            <span className="text-xs font-bold text-white">Next Milestone: 14-Day Vanguard</span>
            <p className="text-[11px] text-[#A0A493] mt-0.5">2 days remaining to unlock exclusive mobility masterclass.</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] font-black text-xs tracking-wide cursor-pointer transition-all shadow-md active:scale-95"
        >
          Keep Moving Today
        </button>

      </div>
    </div>
  );
}
