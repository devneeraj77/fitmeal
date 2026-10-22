"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import CoachesGrid, { Coach } from "@/components/CoachesGrid";
import ConversionAnchor from "@/components/ConversionAnchor";
import Footer from "@/components/Footer";
import RoutineBuilderModal from "@/components/RoutineBuilderModal";
import GuidedSessionModal from "@/components/GuidedSessionModal";
import BookingModal from "@/components/BookingModal";
import StreakModal from "@/components/StreakModal";
import SignInModal from "@/components/SignInModal";
import DashboardView from "@/components/DashboardView";
import PulseAINutritionEngine from "@/components/PulseAINutritionEngine";

export default function Home() {
  const [viewMode, setViewMode] = useState<"landing" | "dashboard">("landing");

  // Modal states
  const [isRoutineBuilderOpen, setIsRoutineBuilderOpen] = useState(false);
  const [isGuidedSessionOpen, setIsGuidedSessionOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  const handleOpenTrial = () => {
    // Smooth scroll to conversion anchor or open routine builder
    const anchor = document.getElementById("trial-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsRoutineBuilderOpen(true);
    }
  };

  const handleSelectCoach = (coach: Coach) => {
    setSelectedCoach(coach);
  };

  if (viewMode === "dashboard") {
    return <DashboardView onBackToHome={() => setViewMode("landing")} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* 1. Top Sticky Navigation Bar */}
      <Navbar
        onOpenStreak={() => setIsStreakModalOpen(true)}
        onOpenSignIn={() => setIsSignInModalOpen(true)}
        onOpenTrial={handleOpenTrial}
        onOpenDashboard={() => setViewMode("dashboard")}
      />

      <main className="flex-1">
        {/* 2. Kinetic Hero Banner */}
        <Hero
          onOpenRoutineBuilder={() => setIsRoutineBuilderOpen(true)}
          onOpenGuidedSession={() => setIsGuidedSessionOpen(true)}
        />

        {/* PulseAI Hyper-Local Nutrition Engine */}
        <PulseAINutritionEngine />

        {/* 3. The 4-Pillar Wellness Bento Grid */}
        <BentoGrid />

        {/* 4. Certified Coaches & Specialists Grid */}
        <CoachesGrid onSelectCoach={handleSelectCoach} />

        {/* 5. Final Conversion Anchor */}
        <div id="trial-anchor" className="scroll-mt-20 sm:scroll-mt-24">
          <ConversionAnchor />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <RoutineBuilderModal
        isOpen={isRoutineBuilderOpen}
        onClose={() => setIsRoutineBuilderOpen(false)}
      />

      <GuidedSessionModal
        isOpen={isGuidedSessionOpen}
        onClose={() => setIsGuidedSessionOpen(false)}
      />

      <BookingModal
        coach={selectedCoach}
        isOpen={!!selectedCoach}
        onClose={() => setSelectedCoach(null)}
      />

      <StreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
      />

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onOpenDashboard={() => setViewMode("dashboard")}
      />
    </div>
  );
}
