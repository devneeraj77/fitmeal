"use client";

import React, { useState } from "react";
import PotatoFitOnboarding from "@/components/PotatoFitOnboarding";
import DashboardView from "@/components/DashboardView";

export default function OnboardingPage() {
  const [viewMode, setViewMode] = useState<"onboarding" | "dashboard">("onboarding");

  if (viewMode === "dashboard") {
    return <DashboardView onBackToHome={() => setViewMode("onboarding")} />;
  }

  return (
    <PotatoFitOnboarding
      onContinueToDashboard={() => setViewMode("dashboard")}
      onExploreFullPlatform={() => (window.location.href = "/")}
    />
  );
}
