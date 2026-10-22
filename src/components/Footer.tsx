"use client";

import React from "react";
import PotatoFitLogo from "./PotatoFitLogo";

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] border-t border-[#E2E8F0] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <PotatoFitLogo size="sm" variant="light" />

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Science-backed longevity, hybrid strength protocols, and restorative recovery engineered for everyday human performance.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2 font-mono">
                Seamless Wearable Biomarker Sync
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                {["Apple Health", "WHOOP 4.0", "Garmin Connect", "Oura Ring Gen3", "Polar"].map((device) => (
                  <span
                    key={device}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px]"
                  >
                    {device}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links Column 1: Protocols */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-mono">
              Strength &amp; Protocols
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><a href="#programs" className="hover:text-slate-900 transition-colors">Adaptive Hypertrophy</a></li>
              <li><a href="#programs" className="hover:text-slate-900 transition-colors">Olympic Barbell Lifts</a></li>
              <li><a href="#programs" className="hover:text-slate-900 transition-colors">Home Dumbbell Circuits</a></li>
              <li><a href="#programs" className="hover:text-slate-900 transition-colors">Progressive Overload Scheme</a></li>
              <li><a href="#programs" className="hover:text-slate-900 transition-colors">Velocity-Based Training</a></li>
            </ul>
          </div>

          {/* Links Column 2: Recovery */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-mono">
              Sleep &amp; Recovery
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><a href="#recovery" className="hover:text-slate-900 transition-colors">Circadian Phase Tuning</a></li>
              <li><a href="#recovery" className="hover:text-slate-900 transition-colors">Box Breathwork Protocol</a></li>
              <li><a href="#recovery" className="hover:text-slate-900 transition-colors">Sauna &amp; Cold Plunge Logs</a></li>
              <li><a href="#nutrition" className="hover:text-slate-900 transition-colors">Metabolic Nutrient Timing</a></li>
              <li><a href="#nutrition" className="hover:text-slate-900 transition-colors">Electrolyte Partitioning</a></li>
            </ul>
          </div>

          {/* Links Column 3: Platform */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-mono">
              Specialists &amp; Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><a href="#coaches" className="hover:text-slate-900 transition-colors">Board Certified Coaches</a></li>
              <li><a href="#community" className="hover:text-slate-900 transition-colors">Member Leaderboard</a></li>
              <li><a href="#community" className="hover:text-slate-900 transition-colors">Monthly Sprint Challenges</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Peer Support Network</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Clinical Advisory Board</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FitMeal Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Biometric Security</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
