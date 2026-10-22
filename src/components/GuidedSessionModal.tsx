"use client";

import React, { useState, useEffect } from "react";
import { X, Play, Pause, RotateCcw, SkipForward, Activity } from "lucide-react";

interface GuidedSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: "Diaphragmatic Ribcage Expansion Breathing",
    duration: 60,
    target: "Parasympathetic Tone & Vagal Reset",
    cue: "Place one hand on your belly and one on your lower lateral ribs. Inhale for 4 seconds, feeling your ribs expand outward, then exhale softly through pursed lips.",
  },
  {
    title: "World's Greatest Stretch (Lunge with Thoracic Twist)",
    duration: 90,
    target: "Hip Flexors, Hamstrings & Thoracic Spine",
    cue: "Step right leg forward into a deep lunge. Place both hands inside your foot, reach your right arm straight up to the ceiling, rotating your chest, then switch sides at 45 seconds.",
  },
  {
    title: "Cat-Cow Segmented Spine Waves",
    duration: 60,
    target: "Intervertebral Hydration & Scapular Glide",
    cue: "On hands and knees, slowly articulate vertebra by vertebra from your tailbone up to your neck into extension, then reverse with a full exhale into flexion.",
  },
  {
    title: "90/90 Hip Internal & External Rotation Flow",
    duration: 90,
    target: "Femoral Head Articulation & Glute Capsule",
    cue: "Sit on the floor with both knees bent at 90-degree angles. Hinge forward over the front shin with a tall neutral spine, pause, then sweep both knees to the opposite side.",
  },
];

export default function GuidedSessionModal({ isOpen, onClose }: GuidedSessionModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  const currentStep = steps[currentStepIdx];

  // Timer runner
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev > 1) return prev - 1;
          // advance step
          if (currentStepIdx < steps.length - 1) {
            setCurrentStepIdx((s) => s + 1);
            return steps[currentStepIdx + 1].duration;
          } else {
            setIsPlaying(false);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, currentStepIdx]);

  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      setSecondsRemaining(steps[nextIdx].duration);
    }
  };

  const resetSession = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
    setSecondsRemaining(steps[0].duration);
  };

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={() => {
            setIsPlaying(false);
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2 font-mono">
          <Activity className="w-4 h-4 text-emerald-700" />
          <span>Daily 5-Min Guided Flow // Protocol 01</span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          Express Mobility &amp; Parasympathetic Reset
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Step {currentStepIdx + 1} of {steps.length} • Calibrated for desk decompression &amp; joint longevity
        </p>

        {/* Step Progress Dots */}
        <div className="flex gap-2 mb-6">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                idx < currentStepIdx
                  ? "bg-[#1B4332]"
                  : idx === currentStepIdx
                  ? "bg-emerald-500"
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Active Exercise Display Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded uppercase font-mono">
                {currentStep.target}
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1.5">{currentStep.title}</h4>
            </div>
            
            <div className="text-right shrink-0">
              <span className="text-3xl font-black text-slate-900 font-mono tabular-nums">
                {formatTime(secondsRemaining)}
              </span>
              <p className="text-[10px] text-slate-500">remaining</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/80 mt-3">
            <strong className="text-slate-800">Biomechanical Cue: </strong>
            {currentStep.cue}
          </p>
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={resetSession}
            className="p-3 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            title="Reset Session"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-8 py-3.5 rounded-full bg-[#1B4332] hover:bg-[#235841] text-white font-bold text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Interval</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white ml-0.5" />
                <span>{secondsRemaining === 0 ? "Restart" : "Start Guided Flow"}</span>
              </>
            )}
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepIdx >= steps.length - 1}
            className="p-3 text-slate-500 hover:text-slate-800 disabled:opacity-40 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            title="Next Step"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
