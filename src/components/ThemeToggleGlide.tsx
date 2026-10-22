"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

interface ThemeToggleGlideProps {
  className?: string;
  size?: "sm" | "md";
}

export function ThemeToggleGlide({ className = "", size = "sm" }: ThemeToggleGlideProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure DOM is ready and state is hydrated
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme || "system" : "system";

  const options = [
    { id: "system", label: "System", icon: Monitor },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "light", label: "Light", icon: Sun },
  ] as const;

  const activeIndex = options.findIndex((opt) => opt.id === currentTheme);
  const safeIndex = activeIndex >= 0 ? activeIndex : 0;

  // Direct and deterministic theme switch handler
  const handleSelect = (selectedTheme: "system" | "dark" | "light") => {
    setTheme(selectedTheme);

    if (typeof document !== "undefined") {
      const root = document.documentElement;
      let isDark = false;

      if (selectedTheme === "dark") {
        isDark = true;
      } else if (selectedTheme === "light") {
        isDark = false;
      } else {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      if (isDark) {
        root.classList.add("dark");
        root.classList.remove("light");
        root.setAttribute("data-theme", "dark");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.setAttribute("data-theme", "light");
        root.style.colorScheme = "light";
      }

      try {
        localStorage.setItem("theme", selectedTheme);
      } catch {
        // ignore storage errors in restricted contexts
      }
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode selector"
      className={`relative inline-grid grid-cols-3 items-center p-1 rounded-full bg-[#EAEFEA] dark:bg-[#121815] border border-[#757761]/35 shadow-inner select-none transition-colors ${
        size === "sm" ? "w-52 sm:w-60 h-8" : "w-60 sm:w-68 h-9"
      } ${className}`}
    >
      {/* Smooth Sliding Glide Pill Indicator with Brand Theme Colors */}
      <div
        className="absolute top-1 bottom-1 rounded-full bg-[#9c67b5] dark:bg-gradient-to-r dark:from-[#9c67b5] dark:to-[#2D163D] shadow-md transition-transform duration-300 ease-out pointer-events-none"
        style={{
          width: "calc(33.333% - 2.66px)",
          left: "1.33px",
          transform: `translateX(${safeIndex * 100}%)`,
        }}
      />

      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = currentTheme === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${opt.label} theme`}
            title={`Switch to ${opt.label} theme`}
            onClick={() => handleSelect(opt.id)}
            className={`relative z-10 flex items-center justify-center gap-1.5 rounded-full font-bold transition-all cursor-pointer ${
              isActive
                ? "text-white dark:text-[#f7fe72] font-black drop-shadow-xs"
                : "text-[#505445] hover:text-[#9c67b5] dark:text-[#CBD2C7] dark:hover:text-[#f7fe72]"
            } ${size === "sm" ? "text-[11px] h-6" : "text-xs h-7"}`}
          >
            <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white dark:text-[#f7fe72]" : ""}`} />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggleGlide;
