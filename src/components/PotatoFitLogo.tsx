"use client";

import React from "react";

interface PotatoFitLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "dark" | "light" | string;
}

export default function PotatoFitLogo({
  className = "",
  size = "md",
  showText = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant = "dark",
}: PotatoFitLogoProps) {
  const sizeMap = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textMap = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Faceted Potato Icon with Embedded Pulse Lightning */}
      <div
        className={`relative ${sizeMap[size]} shrink-0 group flex items-center justify-center`}
      >
        {/* Ambient subtle glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#757761]/30 via-[#f7fe72]/20 to-[#757761]/30 blur-md group-hover:blur-lg transition-all duration-300 opacity-80" />

        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_4px_12px_rgba(247,254,114,0.25)] transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Gradients for faceted faces */}
            <linearGradient id="facetAmberLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7fe72" />
              <stop offset="100%" stopColor="#f4e76e" />
            </linearGradient>
            <linearGradient id="facetAmberMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4e76e" />
              <stop offset="100%" stopColor="#d4c448" />
            </linearGradient>
            <linearGradient id="facetAmberDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#757761" />
              <stop offset="100%" stopColor="#44493f" />
            </linearGradient>
            <linearGradient id="facetSlateDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2721" />
              <stop offset="100%" stopColor="#0B0E0C" />
            </linearGradient>
            <linearGradient id="facetSlateMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#757761" />
              <stop offset="100%" stopColor="#44493f" />
            </linearGradient>

            {/* Neon Pulse Line Gradient */}
            <linearGradient id="solarBoltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7fe72" />
              <stop offset="50%" stopColor="#f4e76e" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            {/* Electric Glow Filter */}
            <filter id="solarGlow" x="-20%" y="-20%" width="140%" height="140%">
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
              fill="#0E1210"
              stroke="#f7fe72"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />

            {/* Individual Facet Polygons (Low-Poly / Chiseled 3D Potato) */}
            <polygon points="40,16 78,18 64,36 38,34" fill="url(#facetAmberLight)" opacity="0.9" />
            <polygon points="78,18 104,38 88,44 64,36" fill="url(#facetAmberMid)" opacity="0.85" />
            <polygon points="20,28 40,16 38,34 18,46" fill="url(#facetAmberMid)" opacity="0.8" />

            <polygon points="18,46 38,34 52,50 28,62 8,50" fill="url(#facetSlateMid)" opacity="0.95" />
            <polygon points="88,44 104,38 112,66 94,68 76,52" fill="url(#facetAmberDark)" opacity="0.9" />
            <polygon points="64,36 88,44 76,52 52,50" fill="url(#facetAmberLight)" opacity="0.95" />

            <polygon points="28,62 52,50 62,72 38,82 12,80" fill="url(#facetSlateDark)" opacity="0.95" />
            <polygon points="76,52 94,68 84,90 62,72" fill="url(#facetAmberMid)" opacity="0.85" />
            <polygon points="94,68 112,66 96,96 84,90" fill="url(#facetAmberDark)" opacity="0.9" />

            <polygon points="12,80 38,82 34,102" fill="url(#facetSlateDark)" opacity="0.9" />
            <polygon points="38,82 62,72 66,108 34,102" fill="url(#facetAmberDark)" opacity="0.85" />
            <polygon points="62,72 84,90 96,96 66,108" fill="url(#facetAmberMid)" opacity="0.9" />

            {/* Facet Edge Creases */}
            <polyline
              points="40,16 38,34 52,50 62,72 66,108"
              stroke="#f7fe72"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
            <polyline
              points="78,18 64,36 76,52 84,90"
              stroke="#f4e76e"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
            <polyline
              points="18,46 52,50 88,44"
              stroke="#757761"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          </g>

          {/* EMBEDDED DYNAMIC LIGHTNING BOLT & PULSE LINE */}
          <path
            d="M 12,58 L 30,58 L 42,42 L 50,78 L 62,26 L 72,88 L 82,50 L 92,58 L 108,58"
            stroke="#f7fe72"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#solarGlow)"
            opacity="0.65"
          />

          <path
            d="M 12,58 L 30,58 L 42,42 L 50,78 L 62,26 L 72,88 L 82,50 L 92,58 L 108,58"
            stroke="url(#solarBoltGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Embedded Lightning Bolt Accent */}
          <path
            d="M 64,28 L 50,56 L 62,56 L 46,90 L 74,50 L 60,50 Z"
            fill="#f7fe72"
            stroke="#ffffff"
            strokeWidth="1.2"
            className="filter drop-shadow-[0_0_8px_rgba(247,254,114,0.9)]"
          />

          {/* Heartbeat Peak Node */}
          <circle cx="62" cy="26" r="3" fill="#ffffff" />
          <circle cx="72" cy="88" r="3" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight uppercase font-sans text-white ${textMap[size]}`}
            >
              POTATO<span className="text-[#f7fe72]">FIT</span>
            </span>
            <span
              className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase bg-[#EAEFEA] dark:bg-[#18201A] text-[#505445] dark:text-[#CBD2C7] border border-[#757761]/30 dark:border-[#757761]/50 shadow-2xs"
            >
              APEX v2.4
            </span>
          </div>
          <span
            className="hidden sm:block text-[10px] sm:text-xs font-semibold tracking-wider uppercase -mt-0.5 text-[#505445] dark:text-[#A0A594]"
          >
            Hyper-Local Athletic Fuel
          </span>
        </div>
      )}
    </div>
  );
}
