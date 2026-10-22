"use client";

import React from "react";

interface PotatoFitLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
  variant?: "dark" | "light";
}

export default function PotatoFitLogo({
  size = "md",
  className = "",
  showText = true,
  variant = "dark",
}: PotatoFitLogoProps) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const textMap = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl sm:text-4xl",
    xl: "text-4xl sm:text-5xl",
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Faceted Potato Icon with Embedded Pulse Lightning */}
      <div
        className={`relative ${sizeMap[size]} shrink-0 group flex items-center justify-center`}
      >
        {/* Ambient subtle glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-emerald-500/25 to-amber-400/20 blur-md group-hover:blur-lg transition-all duration-300 opacity-80" />

        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_4px_12px_rgba(245,158,11,0.25)] transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Gradients for faceted faces */}
            <linearGradient id="facetAmberLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="facetAmberMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="facetAmberDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
            <linearGradient id="facetSlateDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="facetSlateMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            {/* Neon Pulse Line Gradient */}
            <linearGradient id="emeraldBoltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Electric Glow Filter */}
            <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* FACETED GEOMETRIC POTATO BODY */}
          <g id="faceted-potato-facets">
            {/* Outer Silhouette / Base Foundation */}
            <polygon
              points="40,16 78,18 104,38 112,66 96,96 66,108 34,102 12,80 8,50 20,28"
              fill="#0F172A"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />

            {/* Individual Facet Polygons (Low-Poly / Chiseled 3D Potato) */}
            {/* Top facets */}
            <polygon points="40,16 78,18 64,36 38,34" fill="url(#facetAmberLight)" opacity="0.9" />
            <polygon points="78,18 104,38 88,44 64,36" fill="url(#facetAmberMid)" opacity="0.85" />
            <polygon points="20,28 40,16 38,34 18,46" fill="url(#facetAmberMid)" opacity="0.8" />

            {/* Upper-mid facets */}
            <polygon points="18,46 38,34 52,50 28,62 8,50" fill="url(#facetSlateMid)" opacity="0.95" />
            <polygon points="88,44 104,38 112,66 94,68 76,52" fill="url(#facetAmberDark)" opacity="0.9" />
            <polygon points="64,36 88,44 76,52 52,50" fill="url(#facetAmberLight)" opacity="0.95" />

            {/* Lower-mid facets */}
            <polygon points="28,62 52,50 62,72 38,82 12,80" fill="url(#facetSlateDark)" opacity="0.95" />
            <polygon points="76,52 94,68 84,90 62,72" fill="url(#facetAmberMid)" opacity="0.85" />
            <polygon points="94,68 112,66 96,96 84,90" fill="url(#facetAmberDark)" opacity="0.9" />

            {/* Bottom facets */}
            <polygon points="12,80 38,82 34,102" fill="url(#facetSlateDark)" opacity="0.9" />
            <polygon points="38,82 62,72 66,108 34,102" fill="url(#facetAmberDark)" opacity="0.85" />
            <polygon points="62,72 84,90 96,96 66,108" fill="url(#facetAmberMid)" opacity="0.9" />

            {/* Facet Edge Creases for Precision Wireframe Aesthetic */}
            <polyline
              points="40,16 38,34 52,50 62,72 66,108"
              stroke="#FBBF24"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            <polyline
              points="78,18 64,36 76,52 84,90"
              stroke="#F59E0B"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
            <polyline
              points="18,46 52,50 88,44"
              stroke="#FEF3C7"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
          </g>

          {/* EMBEDDED DYNAMIC LIGHTNING BOLT & PULSE LINE */}
          {/* Neon Underglow Pulse */}
          <path
            d="M 12,58 L 30,58 L 42,42 L 50,78 L 62,26 L 72,88 L 82,50 L 92,58 L 108,58"
            stroke="#10B981"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#emeraldGlow)"
            opacity="0.65"
          />

          {/* Precision Emerald Pulse Line */}
          <path
            d="M 12,58 L 30,58 L 42,42 L 50,78 L 62,26 L 72,88 L 82,50 L 92,58 L 108,58"
            stroke="url(#emeraldBoltGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Embedded Lightning Bolt Accent */}
          <path
            d="M 64,28 L 50,56 L 62,56 L 46,90 L 74,50 L 60,50 Z"
            fill="#FBBF24"
            stroke="#FEF3C7"
            strokeWidth="1.2"
            className="filter drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]"
          />

          {/* Heartbeat Peak Node */}
          <circle cx="62" cy="26" r="3" fill="#A7F3D0" />
          <circle cx="72" cy="88" r="3" fill="#A7F3D0" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight uppercase font-sans ${
                variant === "light" ? "text-slate-900" : "text-white"
              } ${textMap[size]}`}
            >
              POTATO<span className="text-[#F59E0B]">FIT</span>
            </span>
            <span
              className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${
                variant === "light"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              APEX v2.4
            </span>
          </div>
          <span
            className={`hidden sm:block text-[10px] sm:text-xs font-semibold tracking-wider uppercase -mt-0.5 ${
              variant === "light" ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Hyper-Local Athletic Fuel
          </span>
        </div>
      )}
    </div>
  );
}
