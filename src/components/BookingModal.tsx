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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#121815] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#757761]/40 overflow-hidden text-white">
        
        {/* Glow ambient background accents */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#757761]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-[#f7fe72]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A0A594] hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <form onSubmit={handleBook} className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 font-mono">
              <UserCheck className="w-4 h-4 text-[#f7fe72]" />
              <span className="text-[#f7fe72]">Direct Specialist Consultation</span>
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight">
              Book with {coach.name}
            </h3>
            <p className="text-xs text-[#A0A594] mt-0.5 mb-5 font-mono">
              {coach.credentials} • {coach.role}
            </p>

            {/* Date Selection */}
            <label className="block text-xs font-bold text-[#CBD2C7] uppercase tracking-wider mb-2 font-mono">
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
                      ? "border-[#f7fe72] bg-[#f7fe72]/15 text-white shadow-sm ring-1 ring-[#f7fe72]"
                      : "border-[#757761]/30 text-[#CBD2C7] hover:border-[#757761]/60 bg-[#0B0E0C]"
                  }`}
                >
                  <div className="text-white font-bold">{d.label}</div>
                  <div className={`text-[10px] font-normal mt-0.5 font-mono ${selectedDate === d.label ? "text-[#f7fe72]" : "text-[#A0A594]"}`}>
                    {d.slots} available
                  </div>
                </button>
              ))}
            </div>

            {/* Time Slot Selection */}
            <label className="block text-xs font-bold text-[#CBD2C7] uppercase tracking-wider mb-2 font-mono">
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
                      ? "border-[#f7fe72] bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] text-[#0B0E0C] font-black shadow-md"
                      : "border-[#757761]/30 text-[#CBD2C7] hover:border-[#757761]/60 bg-[#0B0E0C]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Notes Input */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#CBD2C7] uppercase tracking-wider mb-1.5 font-mono">
                Primary Goal or Clinical Concern (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="e.g., Hip pinching at bottom of squat, adjusting macros for marathon block..."
                className="w-full p-3 rounded-xl border border-[#757761]/35 bg-[#0B0E0C] text-xs text-white placeholder-[#757761] focus:outline-none focus:ring-2 focus:ring-[#f7fe72]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] font-black text-sm shadow-lg shadow-[#f7fe72]/20 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#0B0E0C]" />
              <span>Confirm 1-on-1 Consultation</span>
            </button>
          </form>
        ) : (
          <div className="text-center py-4 relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#757761]/20 border border-[#757761]/40 text-[#f7fe72] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#757761]/20">
              <Check className="w-8 h-8 text-[#f7fe72]" />
            </div>
            <h3 className="text-2xl font-black text-white">Consultation Confirmed!</h3>
            <p className="text-sm text-[#CBD2C7] mt-2 max-w-sm mx-auto">
              Your appointment with <strong className="text-[#f7fe72]">{coach.name}</strong> has been secured for <strong className="text-white">{selectedDate}</strong> at <strong className="text-white">{selectedTime}</strong>.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-[#0B0E0C] border border-[#757761]/35 text-left max-w-sm mx-auto text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#CBD2C7]">
                <Video className="w-4 h-4 text-[#f7fe72] shrink-0" />
                <span>HD Video Consultation Link sent to your email</span>
              </div>
              <div className="flex items-center gap-2 text-[#CBD2C7]">
                <ShieldCheck className="w-4 h-4 text-[#f7fe72] shrink-0" />
                <span>Encrypted medical &amp; fitness intake included</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] text-xs font-black shadow-lg shadow-[#f7fe72]/20 cursor-pointer transition-all active:scale-95"
            >
              Return to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
