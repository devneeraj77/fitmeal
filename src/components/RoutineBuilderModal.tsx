"use client";

import React, { useState } from "react";
import { X, Check, ChevronRight, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

interface RoutineBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RoutineBuilderModal({ isOpen, onClose }: RoutineBuilderModalProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("hypertrophy");
  const [days, setDays] = useState("4");
  const [equipment, setEquipment] = useState("gym");
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleFinish = () => {
    setSaved(true);
  };

  const resetAll = () => {
    setStep(1);
    setSaved(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121815] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#757761]/40 overflow-hidden text-white">
        
        {/* Glow backdrop accent */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#9c67b5]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#f7fe72]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={resetAll}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A0A594] hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!saved ? (
          <div className="relative z-10">
            {/* Modal Header */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#f7fe72] uppercase tracking-wider mb-2 font-mono">
              <Sparkles className="w-4 h-4 text-[#f7fe72]" />
              <span className="text-[#9c67b5]">Personalized Routine Architect // Step {step} of 3</span>
            </div>
            
            <h3 className="text-2xl font-black text-white tracking-tight">
              {step === 1 && "What is your primary physical objective?"}
              {step === 2 && "How many training days fit your schedule?"}
              {step === 3 && "What equipment do you have access to?"}
            </h3>
            
            <p className="text-sm text-[#A0A594] mt-1 mb-6">
              {step === 1 && "We calibrate load distribution and periodization to match your biological adaptation."}
              {step === 2 && "Consistent recovery days are just as important as high-intensity training days."}
              {step === 3 && "Every movement has biomechanical equivalents regardless of gym setup."}
            </p>

            {/* Step 1 Options */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "hypertrophy", title: "Strength & Hypertrophy", desc: "Build lean muscle mass, maximize force output & bone density." },
                  { id: "longevity", title: "Longevity & Healthspan", desc: "VO2 max conditioning, joint preservation & metabolic flexibility." },
                  { id: "mobility", title: "Movement & Mobility", desc: "Postural balance, thoracic decompression & athletic agility." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setGoal(opt.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      goal === opt.id
                        ? "border-[#9c67b5] bg-[#9c67b5]/20 ring-1 ring-[#9c67b5] shadow-lg shadow-[#9c67b5]/10"
                        : "border-[#757761]/30 hover:border-[#757761]/60 bg-[#0B0E0C]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white">{opt.title}</span>
                      {goal === opt.id && <Check className="w-4 h-4 text-[#f7fe72]" />}
                    </div>
                    <p className="text-xs text-[#A0A594] leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2 Options */}
            {step === 2 && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "3", title: "3 Days / Week", desc: "Full Body Density splits (Mon / Wed / Fri)" },
                  { id: "4", title: "4 Days / Week", desc: "Upper / Lower Hybrid splits (Mon / Tue / Thu / Fri)" },
                  { id: "5", title: "5 Days / Week", desc: "Push / Pull / Legs + Aerobic Capacity" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDays(opt.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      days === opt.id
                        ? "border-[#9c67b5] bg-[#9c67b5]/20 ring-1 ring-[#9c67b5] shadow-lg shadow-[#9c67b5]/10"
                        : "border-[#757761]/30 hover:border-[#757761]/60 bg-[#0B0E0C]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white">{opt.title}</span>
                      {days === opt.id && <Check className="w-4 h-4 text-[#f7fe72]" />}
                    </div>
                    <p className="text-xs text-[#A0A594] leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3 Options */}
            {step === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "gym", title: "Commercial Gym", desc: "Barbells, cables, racks, machines, and kettlebells." },
                  { id: "dumbbells", title: "Home Dumbbells", desc: "Adjustable DB pair, pull-up bar, and resistance bands." },
                  { id: "bodyweight", title: "Minimalist / Calisthenics", desc: "Bodyweight leverage, gymnastics rings, and floor mobility." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setEquipment(opt.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      equipment === opt.id
                        ? "border-[#9c67b5] bg-[#9c67b5]/20 ring-1 ring-[#9c67b5] shadow-lg shadow-[#9c67b5]/10"
                        : "border-[#757761]/30 hover:border-[#757761]/60 bg-[#0B0E0C]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white">{opt.title}</span>
                      {equipment === opt.id && <Check className="w-4 h-4 text-[#f7fe72]" />}
                    </div>
                    <p className="text-xs text-[#A0A594] leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-[#757761]/25 mt-8">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#A0A594] hover:text-white cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] text-xs font-black shadow-md cursor-pointer transition-all active:scale-95"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4 text-[#0B0E0C]" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] text-sm font-black shadow-lg shadow-[#f7fe72]/20 cursor-pointer transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#0B0E0C]" />
                  <span>Generate My Protocol</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#9c67b5]/20 border border-[#9c67b5]/40 text-[#f7fe72] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#9c67b5]/20">
              <ShieldCheck className="w-8 h-8 text-[#f7fe72]" />
            </div>
            <h3 className="text-2xl font-black text-white">Protocol Generated Successfully!</h3>
            <p className="text-sm text-[#CBD2C7] max-w-md mx-auto mt-2">
              Your customized <strong className="text-[#f7fe72] font-semibold">{days}-Day {goal.toUpperCase()}</strong> routine tailored for <strong className="text-white font-semibold">{equipment}</strong> is loaded into your dashboard.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-[#0B0E0C] border border-[#757761]/35 text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#A0A594]">Weekly Target Volume:</span>
                <span className="text-white font-mono">16 - 20 Work Sets / Muscle</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#A0A594]">Recovery Cadence:</span>
                <span className="text-white font-mono">{7 - parseInt(days)} Scheduled Rest &amp; Mob Days</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#A0A594]">Progressive Overload Scheme:</span>
                <span className="text-[#f7fe72] font-mono">+2.5% Auto-Increment / 10-day block</span>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] text-sm font-black shadow-lg shadow-[#f7fe72]/20 cursor-pointer transition-all active:scale-95"
            >
              Start First Workout Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
