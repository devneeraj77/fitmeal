"use client";

import React from "react";
import { Star, ShieldCheck, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export interface Coach {
  id: string;
  name: string;
  credentials: string;
  role: string;
  experience: string;
  bio: string;
  specialtyTags: string[];
  rating: number;
  reviewsCount: number;
  availableSlot: string;
  accentColor: string;
  initials: string;
}

interface CoachesGridProps {
  onSelectCoach: (coach: Coach) => void;
}

export const coachesList: Coach[] = [
  {
    id: "marcus",
    name: "Marcus Vance",
    credentials: "CSCS, PES, USAW",
    role: "Head Strength & Conditioning Coach",
    experience: "12 years coaching Olympic lifters & high performers",
    bio: "Focuses on biomechanical bar path efficiency, velocity-based training, and fatigue management for long-term joint health.",
    specialtyTags: ["Strength & Hypertrophy", "Olympic Lifting", "Velocity Training"],
    rating: 4.98,
    reviewsCount: 284,
    availableSlot: "3 slots open this week",
    accentColor: "from-[#18201A] to-[#121815]",
    initials: "MV",
  },
  {
    id: "elena",
    name: "Elena Rostova",
    credentials: "MS, RD, CSSD",
    role: "Sports Nutritionist & Metabolic Specialist",
    experience: "9 years clinical nutrition for endurance & strength athletes",
    bio: "Engineers bio-individual nutrition frameworks, peri-workout glycogen timing, and gut microbiome optimization.",
    specialtyTags: ["Metabolic Health", "Endurance Fueling", "Body Recomposition"],
    rating: 4.96,
    reviewsCount: 312,
    availableSlot: "Next available tomorrow",
    accentColor: "from-[#18201A] to-[#0B0E0C]",
    initials: "ER",
  },
  {
    id: "kai",
    name: "Dr. Kai Tanaka",
    credentials: "PT, DPT, OCS",
    role: "Doctor of Physical Therapy & Mobility Specialist",
    experience: "10 years orthopedic rehabilitation & biomechanical assessment",
    bio: "Specializes in rotational spinal capacity, scapular stability, and active end-range tissue conditioning to prevent chronic injury.",
    specialtyTags: ["Mobility", "Spine Biomechanics", "Joint Longevity"],
    rating: 5.0,
    reviewsCount: 196,
    availableSlot: "2 slots open Friday",
    accentColor: "from-[#18201A] to-[#121815]",
    initials: "KT",
  },
];

export default function CoachesGrid({ onSelectCoach }: CoachesGridProps) {
  return (
    <section id="coaches" className="py-16 sm:py-24 bg-[#F4F6F5] dark:bg-[#0B0E0C] text-[#121815] dark:text-[#E2E7DE] border-t border-[#757761]/25 scroll-mt-20 sm:scroll-mt-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#757761]/15 border border-[#757761]/30 text-[#505445] dark:text-[#f7fe72] text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Verified Clinical &amp; Performance Specialists</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#121815] dark:text-white leading-tight">
              Certified Coaches &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#121815] via-[#505445] to-[#7A5A00] dark:from-[#FFFFFF] dark:via-[#f4e76e] dark:to-[#f7fe72]">Specialists</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#505445] dark:text-[#A0A493]">
              Work 1-on-1 with practitioners who review your biometric logs, adjust your training splits, and keep you pain-free.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#262A21] dark:text-[#CBD2C7] bg-white dark:bg-[#121815] px-4 py-2.5 rounded-2xl border border-[#757761]/35 self-start md:self-auto shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#7A5A00] dark:text-[#f7fe72] shrink-0" />
            <span>100% Board Certified &amp; Vetted Protocols</span>
          </div>
        </div>

        {/* 3-Column Coach Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coachesList.map((coach) => (
            <div
              key={coach.id}
              className="bg-white dark:bg-[#121815] rounded-3xl p-6 sm:p-7 border border-[#757761]/25 dark:border-[#757761]/30 shadow-xl dark:shadow-black/50 flex flex-col justify-between hover:shadow-2xl hover:border-[#f7fe72]/50 transition-all duration-200 group"
            >
              <div>
                {/* Trainer Portrait & Top Badge */}
                <div className="relative mb-5">
                  <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#EAEFEA] to-[#F4F6F5] dark:from-[#18201A] dark:to-[#121815] flex flex-col items-center justify-center text-[#121815] dark:text-white relative overflow-hidden shadow-inner border border-[#757761]/25">
                    {/* Background geometric pattern */}
                    <div className="absolute inset-0 opacity-15">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`pat-${coach.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="1" r="1" fill="#fff" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#pat-${coach.id})`} />
                      </svg>
                    </div>

                    {/* Trainer Portrait Badge Avatar */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-[#757761]/15 dark:bg-[#757761]/25 backdrop-blur-md border-2 border-[#757761]/40 dark:border-[#757761]/50 flex items-center justify-center text-2xl font-black tracking-wider text-[#121815] dark:text-[#f7fe72] shadow-lg mb-2">
                        {coach.initials}
                      </div>
                      <span className="text-xs font-semibold tracking-wide text-[#505445] dark:text-[#CBD2C7]">
                        {coach.experience}
                      </span>
                    </div>

                    {/* Verified Credential Checkmark Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#18201A] border border-[#757761]/40 backdrop-blur-sm text-[#f7fe72] text-xs font-bold shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#f7fe72] fill-[#f7fe72]" />
                      <span>Verified</span>
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/90 dark:bg-black/70 backdrop-blur-sm text-[#7A5A00] dark:text-[#f4e76e] text-[11px] font-semibold border border-[#757761]/30 shadow-xs">
                      <Star className="w-3 h-3 text-[#7A5A00] dark:text-[#f4e76e] fill-current" />
                      <span>{coach.rating} ({coach.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Name & Credentials */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#121815] dark:text-white group-hover:text-[#121815] dark:group-hover:text-[#f7fe72] transition-colors">
                      {coach.name}
                    </h3>
                  </div>
                  <p className="text-xs font-bold text-[#505445] dark:text-[#f7fe72] font-mono mt-0.5">
                    {coach.credentials} • {coach.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-sm text-[#505445] dark:text-[#A0A493] leading-relaxed mb-4">
                  {coach.bio}
                </p>

                {/* Specialty Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {coach.specialtyTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#F4F6F5] dark:bg-[#0B0E0C] border border-[#757761]/25 dark:border-[#757761]/35 text-[#262A21] dark:text-[#CBD2C7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action: Book Consultation */}
              <div className="pt-4 border-t border-[#757761]/20 dark:border-[#757761]/25">
                <div className="flex items-center justify-between text-xs text-[#505445] dark:text-[#A0A493] mb-3">
                  <span className="flex items-center gap-1 text-[#7A5A00] dark:text-[#f7fe72] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#7A5A00] dark:bg-[#f7fe72] inline-block shadow-[0_0_6px_#f7fe72]" />
                    {coach.availableSlot}
                  </span>
                  <span className="font-semibold text-[#262A21] dark:text-[#CBD2C7]">45 Min Video Call</span>
                </div>

                <button
                  onClick={() => onSelectCoach(coach)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#0B0E0C]" />
                  <span>Book 1-on-1 Consultation</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
