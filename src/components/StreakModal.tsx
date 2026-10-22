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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Flame Header Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
            <Flame className="w-7 h-7 fill-emerald-500 text-emerald-600" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
              ACTIVE HABIT STREAK
            </span>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              12 Consecutive Days
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-5">
          You have recorded at least one biometric session, workout, or guided breathwork flow every day since October 11.
        </p>

        {/* Weekly Adherence Strip */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-3">
            <span>This Week&#39;s Protocol Adherence</span>
            <span className="text-emerald-700 font-bold font-mono">100% Target Met</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {daysOfWeek.map((d, i) => (
              <div
                key={i}
                className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 ${
                  d.status === "completed"
                    ? "bg-emerald-100/90 text-emerald-900 border border-emerald-300"
                    : d.status === "today"
                    ? "bg-emerald-50 text-[#1B4332] border border-emerald-400 ring-2 ring-emerald-400/40"
                    : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                <span className="text-[10px] font-bold">{d.day}</span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center">
                  {d.status === "completed" ? (
                    <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-700" />
                  ) : (
                    <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Card */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1B4332] flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1B4332]">Next Milestone: 14-Day Vanguard</span>
            <p className="text-[11px] text-emerald-900/80 mt-0.5">2 days remaining to unlock exclusive mobility masterclass.</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-[#1B4332] hover:bg-[#235841] text-white font-bold text-xs tracking-wide cursor-pointer transition-colors shadow-sm"
        >
          Keep Moving Today
        </button>

      </div>
    </div>
  );
}
