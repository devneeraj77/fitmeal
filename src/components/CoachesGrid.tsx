"use client";

import React from "react";
import { CheckCircle2, Calendar, Star, ShieldCheck, ArrowRight } from "lucide-react";

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
    credentials: "CSCS*D, USAW-L2",
    role: "Head Strength & Conditioning Coach",
    experience: "12 years coaching Olympic lifters & high performers",
    bio: "Focuses on biomechanical bar path efficiency, velocity-based training, and fatigue management for long-term joint health.",
    specialtyTags: ["Strength & Hypertrophy", "Olympic Lifting", "Velocity Training"],
    rating: 4.98,
    reviewsCount: 284,
    availableSlot: "3 slots open this week",
    accentColor: "from-[#1B4332] to-slate-900",
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
    accentColor: "from-[#143427] to-[#0D2218]",
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
    accentColor: "from-[#1B4332] to-[#0F291E]",
    initials: "KT",
  },
];

export default function CoachesGrid({ onSelectCoach }: CoachesGridProps) {
  return (
    <section id="coaches" className="py-16 sm:py-24 bg-white border-t border-slate-200/80 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Verified Clinical &amp; Performance Specialists</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Certified Coaches &amp; Specialists
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Work 1-on-1 with practitioners who review your biometric logs, adjust your training splits, and keep you pain-free.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>100% Board Certified &amp; Vetted Protocols</span>
          </div>
        </div>

        {/* 3-Column Coach Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coachesList.map((coach) => (
            <div
              key={coach.id}
              className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
            >
              <div>
                {/* Trainer Portrait & Top Badge */}
                <div className="relative mb-5">
                  <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${coach.accentColor} flex flex-col items-center justify-center text-white relative overflow-hidden shadow-inner`}>
                    {/* Background geometric pattern */}
                    <div className="absolute inset-0 opacity-15">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`pat-${coach.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="#fff" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#pat-${coach.id})`} />
                      </svg>
                    </div>

                    {/* Trainer Portrait Badge Avatar */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-2xl font-black tracking-wider text-white shadow-lg mb-2">
                        {coach.initials}
                      </div>
                      <span className="text-xs font-semibold tracking-wide text-slate-200">
                        {coach.experience}
                      </span>
                    </div>

                    {/* Verified Credential Checkmark Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#1B4332] text-xs font-bold shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 fill-emerald-100" />
                      <span>Verified</span>
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold">
                      <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                      <span>{coach.rating} ({coach.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Name & Credentials */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1B4332] transition-colors">
                      {coach.name}
                    </h3>
                  </div>
                  <p className="text-xs font-bold text-[#1B4332] font-mono mt-0.5">
                    {coach.credentials} • {coach.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {coach.bio}
                </p>

                {/* Specialty Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {coach.specialtyTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-slate-200 text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action: Book Consultation */}
              <div className="pt-4 border-t border-slate-200/70">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1 text-emerald-800 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                    {coach.availableSlot}
                  </span>
                  <span className="font-semibold text-slate-700">45 Min Video Call</span>
                </div>

                <button
                  onClick={() => onSelectCoach(coach)}
                  className="w-full py-3 px-4 rounded-xl bg-[#1B4332] hover:bg-[#235841] text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book 1-on-1 Consultation</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 opacity-80" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
