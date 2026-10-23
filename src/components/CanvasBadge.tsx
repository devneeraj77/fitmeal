"use client";

import React, { useRef, useEffect } from "react";

export type BadgeTier = "bronze" | "silver" | "gold" | "emerald" | "apex";
export type BadgeRarity = "Common" | "Rare" | "Epic" | "Legendary";
export type EmblemType = "trophy" | "crown" | "shield" | "flame" | "lightning" | "dumbbell" | "star" | "leaf" | "compass";

interface CanvasBadgeProps {
  tier: BadgeTier;
  rarity?: BadgeRarity;
  emblem: EmblemType;
  size?: number; // width & height in px (e.g. 80, 120, 160)
  label?: string;
  isUnlocked?: boolean;
  interactive?: boolean;
  className?: string;
}

export default function CanvasBadge({
  tier,
  rarity = "Rare",
  emblem,
  size = 110,
  label,
  isUnlocked = true,
  interactive = true,
  className = "",
}: CanvasBadgeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI Retina scaling
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 2, 3) : 2;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.44;
    const innerR = size * 0.35;

    ctx.clearRect(0, 0, size, size);

    // Tier-specific metallic color ramps
    let rimGrad: CanvasGradient;
    let coreGrad: CanvasGradient;
    let accentColor = "#f7fe72";
    let emblemColor = "#FFFFFF";

    if (!isUnlocked) {
      // Locked state: subtle brushed steel / graphite
      rimGrad = ctx.createLinearGradient(0, 0, size, size);
      rimGrad.addColorStop(0, "#475569");
      rimGrad.addColorStop(0.5, "#1E293B");
      rimGrad.addColorStop(1, "#0F172A");

      coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, innerR);
      coreGrad.addColorStop(0, "#1E293B");
      coreGrad.addColorStop(1, "#0B111E");

      accentColor = "#64748B";
      emblemColor = "#94A3B8";
    } else {
      switch (tier) {
        case "bronze":
          rimGrad = ctx.createLinearGradient(0, 0, size, size);
          rimGrad.addColorStop(0, "#D97706");
          rimGrad.addColorStop(0.3, "#F59E0B");
          rimGrad.addColorStop(0.7, "#92400E");
          rimGrad.addColorStop(1, "#78350F");

          coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, innerR);
          coreGrad.addColorStop(0, "#451A03");
          coreGrad.addColorStop(0.85, "#291003");
          coreGrad.addColorStop(1, "#180902");

          accentColor = "#F59E0B";
          emblemColor = "#FDE68A";
          break;

        case "silver":
          rimGrad = ctx.createLinearGradient(0, 0, size, size);
          rimGrad.addColorStop(0, "#F8FAFC");
          rimGrad.addColorStop(0.35, "#CBD5E1");
          rimGrad.addColorStop(0.7, "#64748B");
          rimGrad.addColorStop(1, "#334155");

          coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, innerR);
          coreGrad.addColorStop(0, "#334155");
          coreGrad.addColorStop(0.85, "#1E293B");
          coreGrad.addColorStop(1, "#0F172A");

          accentColor = "#E2E8F0";
          emblemColor = "#FFFFFF";
          break;

        case "gold":
          rimGrad = ctx.createLinearGradient(0, 0, size, size);
          rimGrad.addColorStop(0, "#f7fe72"); // Electric solar highlight
          rimGrad.addColorStop(0.25, "#f4e76e"); // Solar gold
          rimGrad.addColorStop(0.5, "#CA8A04");
          rimGrad.addColorStop(0.8, "#A16207"); // Antique gold depth
          rimGrad.addColorStop(1, "#713F12");

          coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, innerR);
          coreGrad.addColorStop(0, "#3E2207");
          coreGrad.addColorStop(0.75, "#1C0F03");
          coreGrad.addColorStop(1, "#0A0501");

          accentColor = "#f7fe72";
          emblemColor = "#FEF9C3";
          break;

        case "emerald":
          rimGrad = ctx.createLinearGradient(0, 0, size, size);
          rimGrad.addColorStop(0, "#f7fe72"); // Bright solar sheen
          rimGrad.addColorStop(0.3, "#f4e76e"); // Solar gold
          rimGrad.addColorStop(0.7, "#757761"); // Smoked olive sage
          rimGrad.addColorStop(1, "#18201A");

          coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, innerR);
          coreGrad.addColorStop(0, "#18201A");
          coreGrad.addColorStop(0.8, "#121815");
          coreGrad.addColorStop(1, "#0B0E0C");

          accentColor = "#f7fe72";
          emblemColor = "#FFFFFF";
          break;

        case "apex":
        default:
          rimGrad = ctx.createLinearGradient(0, 0, size, size);
          rimGrad.addColorStop(0, "#FFFFFF"); // Diamond highlight
          rimGrad.addColorStop(0.35, "#f4e76e"); // Solar gold
          rimGrad.addColorStop(0.7, "#f7fe72"); // Electric lime accent
          rimGrad.addColorStop(1, "#18201A");

          coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, innerR);
          coreGrad.addColorStop(0, "#18201A");
          coreGrad.addColorStop(0.7, "#121815");
          coreGrad.addColorStop(1, "#0B0E0C");

          accentColor = "#f7fe72";
          emblemColor = "#f7fe72";
          break;
      }
    }

    // 1. Outer Glow Aura (soft radial gradient)
    if (isUnlocked) {
      const glowGrad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, size * 0.49);
      glowGrad.addColorStop(0, `${accentColor}28`);
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.49, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Outer Metallic Rim with Bevel
    ctx.shadowColor = "rgba(0,0,0,0.45)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.fillStyle = rimGrad;
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // 3. Faceted Rim Grooves (High-precision tick notches like luxury chronometers)
    const tickCount = 24;
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1;
    for (let i = 0; i < tickCount; i++) {
      const angle = (i * Math.PI * 2) / tickCount;
      const x1 = cx + Math.cos(angle) * (outerR - 1);
      const y1 = cy + Math.sin(angle) * (outerR - 1);
      const x2 = cx + Math.cos(angle) * (outerR - 3.5);
      const y2 = cy + Math.sin(angle) * (outerR - 3.5);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // 4. Inner Recessed Cavity (Medallion Core)
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = coreGrad;
    ctx.fill();

    // Inner rim stroke
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 5. Laurel Wreath / Heraldic Arc Accents
    ctx.strokeStyle = `${accentColor}44`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR * 0.82, Math.PI * 0.25, Math.PI * 0.75);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, innerR * 0.82, Math.PI * 1.25, Math.PI * 1.75);
    ctx.stroke();

    // 6. Draw Emblem Vectors onto Canvas
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = emblemColor;
    ctx.strokeStyle = emblemColor;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const s = innerR * 0.52; // emblem scale factor

    switch (emblem) {
      case "trophy":
        // Cup base
        ctx.beginPath();
        ctx.moveTo(-s * 0.5, -s * 0.6);
        ctx.lineTo(s * 0.5, -s * 0.6);
        ctx.bezierCurveTo(s * 0.5, s * 0.2, -s * 0.5, s * 0.2, -s * 0.5, -s * 0.6);
        ctx.fill();

        // Stem & Foot
        ctx.beginPath();
        ctx.moveTo(-s * 0.15, s * 0.15);
        ctx.lineTo(s * 0.15, s * 0.15);
        ctx.lineTo(s * 0.12, s * 0.5);
        ctx.lineTo(-s * 0.12, s * 0.5);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(0, s * 0.6, s * 0.45, s * 0.12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Handles
        ctx.beginPath();
        ctx.arc(-s * 0.55, -s * 0.3, s * 0.25, -Math.PI * 0.5, Math.PI * 0.5, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(s * 0.55, -s * 0.3, s * 0.25, -Math.PI * 0.5, Math.PI * 0.5, false);
        ctx.stroke();
        break;

      case "crown":
        ctx.beginPath();
        ctx.moveTo(-s * 0.7, s * 0.45);
        ctx.lineTo(-s * 0.8, -s * 0.35);
        ctx.lineTo(-s * 0.3, 0);
        ctx.lineTo(0, -s * 0.6);
        ctx.lineTo(s * 0.3, 0);
        ctx.lineTo(s * 0.8, -s * 0.35);
        ctx.lineTo(s * 0.7, s * 0.45);
        ctx.closePath();
        ctx.fill();

        // Crown jewels
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(-s * 0.8, -s * 0.35, 2.2, 0, Math.PI * 2);
        ctx.arc(0, -s * 0.6, 2.8, 0, Math.PI * 2);
        ctx.arc(s * 0.8, -s * 0.35, 2.2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "shield":
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.75);
        ctx.lineTo(s * 0.65, -s * 0.45);
        ctx.lineTo(s * 0.6, s * 0.15);
        ctx.bezierCurveTo(s * 0.5, s * 0.65, 0, s * 0.85, 0, s * 0.85);
        ctx.bezierCurveTo(0, s * 0.85, -s * 0.5, s * 0.65, -s * 0.6, s * 0.15);
        ctx.lineTo(-s * 0.65, -s * 0.45);
        ctx.closePath();
        ctx.fill();

        // Inner shield crest line
        ctx.strokeStyle = coreGrad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.5);
        ctx.lineTo(0, s * 0.55);
        ctx.stroke();
        break;

      case "flame":
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.8);
        ctx.bezierCurveTo(s * 0.45, -s * 0.3, s * 0.7, s * 0.3, s * 0.35, s * 0.65);
        ctx.bezierCurveTo(0, s * 0.85, -s * 0.35, s * 0.75, -s * 0.5, s * 0.4);
        ctx.bezierCurveTo(-s * 0.6, 0, -s * 0.3, -s * 0.2, 0, -s * 0.8);
        ctx.fill();

        // Inner flame heart
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.3);
        ctx.bezierCurveTo(s * 0.25, 0, s * 0.3, s * 0.4, 0, s * 0.6);
        ctx.bezierCurveTo(-s * 0.2, s * 0.4, -s * 0.1, 0, 0, -s * 0.3);
        ctx.fill();
        break;

      case "lightning":
        ctx.beginPath();
        ctx.moveTo(s * 0.15, -s * 0.8);
        ctx.lineTo(-s * 0.45, -s * 0.05);
        ctx.lineTo(-s * 0.05, -s * 0.05);
        ctx.lineTo(-s * 0.25, s * 0.8);
        ctx.lineTo(s * 0.45, 0.05);
        ctx.lineTo(s * 0.05, 0.05);
        ctx.closePath();
        ctx.fill();
        break;

      case "dumbbell":
        // Central bar
        ctx.fillRect(-s * 0.6, -s * 0.1, s * 1.2, s * 0.2);

        // Left plates
        ctx.beginPath();
        ctx.roundRect(-s * 0.75, -s * 0.45, s * 0.2, s * 0.9, 2);
        ctx.roundRect(-s * 0.5, -s * 0.35, s * 0.15, s * 0.7, 2);
        ctx.fill();

        // Right plates
        ctx.beginPath();
        ctx.roundRect(s * 0.55, -s * 0.45, s * 0.2, s * 0.9, 2);
        ctx.roundRect(s * 0.35, -s * 0.35, s * 0.15, s * 0.7, 2);
        ctx.fill();
        break;

      case "compass":
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.72, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.8);
        ctx.lineTo(s * 0.22, 0);
        ctx.lineTo(0, s * 0.8);
        ctx.lineTo(-s * 0.22, 0);
        ctx.closePath();
        ctx.fill();
        break;

      case "leaf":
      case "star":
      default:
        // 5-point radiant star
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const outerAngle = (i * Math.PI * 2) / 5 - Math.PI / 2;
          const innerAngle = outerAngle + Math.PI / 5;
          const xO = Math.cos(outerAngle) * s * 0.75;
          const yO = Math.sin(outerAngle) * s * 0.75;
          const xI = Math.cos(innerAngle) * s * 0.35;
          const yI = Math.sin(innerAngle) * s * 0.35;
          if (i === 0) ctx.moveTo(xO, yO);
          else ctx.lineTo(xO, yO);
          ctx.lineTo(xI, yI);
        }
        ctx.closePath();
        ctx.fill();
        break;
    }
    ctx.restore();

    // 7. Specular Top Glint / Arc Reflection (Giving authentic glass/metal depth)
    const glintGrad = ctx.createLinearGradient(0, cy - outerR, 0, cy);
    glintGrad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
    glintGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.08)");
    glintGrad.addColorStop(1, "transparent");

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, innerR * 0.96, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = glintGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy - innerR * 0.45, innerR * 0.9, innerR * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 8. Lock overlay if locked
    if (!isUnlocked) {
      ctx.save();
      ctx.fillStyle = "rgba(15, 23, 42, 0.65)";
      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.fill();

      // Lock glyph
      ctx.fillStyle = "#E2E8F0";
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 1.8;
      const ls = innerR * 0.28;
      // Shackle
      ctx.beginPath();
      ctx.arc(cx, cy - ls * 0.4, ls * 0.5, Math.PI, 0, false);
      ctx.stroke();
      // Body
      ctx.beginPath();
      ctx.roundRect(cx - ls * 0.6, cy - ls * 0.4, ls * 1.2, ls * 1.1, 2.5);
      ctx.fill();
      ctx.restore();
    }
  }, [tier, rarity, emblem, size, isUnlocked]);

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none ${className} ${
        interactive ? "transition-transform duration-300 hover:scale-105 active:scale-95" : ""
      }`}
    >
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="block drop-shadow-md"
      />
      {label && (
        <span className="text-[11px] font-bold text-center tracking-wide text-[#121815] dark:text-[#E2E7DE] mt-1 truncate max-w-[120px]">
          {label}
        </span>
      )}
    </div>
  );
}
