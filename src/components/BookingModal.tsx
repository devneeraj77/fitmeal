"use client";

import React, { useState } from "react";
import { X, Calendar, Check, ShieldCheck, UserCheck, Video } from "lucide-react";
import { Coach } from "./CoachesGrid";

interface BookingModalProps {
  coach: Coach | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ coach, isOpen, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState("Tomorrow, Oct 23");
  const [selectedTime, setSelectedTime] = useState("11:30 AM");
  const [note, setNote] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen || !coach) return null;

  const dates = [
    { label: "Tomorrow, Oct 23", slots: "4 slots" },
    { label: "Thursday, Oct 24", slots: "2 slots" },
    { label: "Friday, Oct 25", slots: "3 slots" },
    { label: "Monday, Oct 28", slots: "5 slots" },
  ];

  const times = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  const handleClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <form onSubmit={handleBook}>
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2 font-mono">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>Direct Specialist Consultation</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Book with {coach.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-5 font-mono">
              {coach.credentials} • {coach.role}
            </p>

            {/* Date Selection */}
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Select Date
            </label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {dates.map((d) => (
                <button
                  type="button"
                  key={d.label}
                  onClick={() => setSelectedDate(d.label)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                    selectedDate === d.label
                      ? "border-[#1B4332] bg-emerald-50 text-slate-900 shadow-xs"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div>{d.label}</div>
                  <div className="text-[10px] text-emerald-700 font-normal mt-0.5">{d.slots} available</div>
                </button>
              ))}
            </div>

            {/* Time Slot Selection */}
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Select Time (45-Min Secure Video Call)
            </label>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {times.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-2 px-1 rounded-xl border text-center text-xs font-bold font-mono transition-all cursor-pointer ${
                    selectedTime === t
                      ? "border-[#1B4332] bg-[#1B4332] text-white shadow-xs"
                      : "border-slate-200 text-slate-700 hover:border-slate-300 bg-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Notes Input */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Primary Goal or Clinical Concern (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="e.g., Hip pinching at bottom of squat, adjusting macros for marathon block..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-[#1B4332] text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm 1-on-1 Consultation</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#1B4332] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Consultation Confirmed!</h3>
            <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
              Your appointment with <strong className="text-slate-900">{coach.name}</strong> has been secured for <strong className="text-slate-900">{selectedDate}</strong> at <strong className="text-slate-900">{selectedTime}</strong>.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-sm mx-auto text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Video className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>HD Video Consultation Link sent to your email</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Encrypted medical &amp; fitness intake included</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
