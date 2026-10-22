"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Flame,
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  User,
  Trophy,
  Award,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import PotatoFitLogo from "./PotatoFitLogo";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  onOpenStreak?: () => void;
  onOpenSignIn?: () => void;
  onOpenTrial?: () => void;
  onOpenDashboard?: () => void;
}

export default function Navbar({
  onOpenStreak,
  onOpenSignIn,
  onOpenTrial,
  onOpenDashboard,
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  // Mobile/Tablet expanded state & scroll tracking
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // Dynamic scroll state for fluid floating island morphing
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside the navbar container (clean zero-overlay behavior)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Clean keyboard navigation (Esc to close menu)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Standard direct section links
  const navLinks = [
    { label: "Programs", href: "#programs" },
    { label: "Nutrition", href: "#nutrition" },
    { label: "Recovery", href: "#recovery" },
    { label: "Coaches", href: "#coaches" },
  ];

  // Cross-page anchor resolver
  const getAnchorHref = (hash: string) => {
    return pathname === "/" ? hash : `/${hash}`;
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const targetId = hash.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Primary action handlers
  const handleSignIn = () => {
    setMenuOpen(false);
    if (onOpenSignIn) {
      onOpenSignIn();
    } else {
      router.push("/api/auth/signin");
    }
  };

  const handleTrial = () => {
    setMenuOpen(false);
    if (onOpenTrial) {
      onOpenTrial();
    } else if (pathname === "/") {
      const anchor = document.getElementById("trial-anchor");
      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/onboarding");
      }
    } else {
      router.push("/onboarding");
    }
  };

  const handleDashboard = () => {
    setMenuOpen(false);
    if (onOpenDashboard) {
      onOpenDashboard();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full px-2 sm:px-4 pt-2 transition-all duration-300">
      {/* 
        NO OVERLAY CONTAINER: 
        The floating island card expands dynamically with zero backdrop blackout
      */}
      <div
        ref={navContainerRef}
        className={cn(
          "mx-auto transition-all duration-300 rounded-2xl sm:rounded-3xl border shadow-xl backdrop-blur-xl",
          "bg-white/95 dark:bg-[#0B0E0C]/90 text-foreground border-[#757761]/25 dark:border-[#757761]/35",
          isScrolled
            ? "max-w-5xl shadow-2xl shadow-black/30 dark:shadow-black/50 py-1 sm:py-1.5 px-3 sm:px-5"
            : "max-w-7xl py-2 px-3 sm:px-6"
        )}
      >
        {/* Main Navbar Bar */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-14 sm:h-16">
          
          {/* 1. Left: Brand Mark & Home Link */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setMenuOpen(false);
              }}
              className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9c67b5] rounded-xl p-1"
              aria-label="PotatoFit Home"
            >
              <PotatoFitLogo size="sm" variant="dark" />
            </Link>

            {/* Streak Trigger Pill (If provided) */}
            {onOpenStreak && (
              <button
                type="button"
                onClick={onOpenStreak}
                title="View Active Streak Adherence"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f7fe72]/15 border border-[#f7fe72]/30 text-xs font-mono font-bold text-[#f7fe72] hover:bg-[#f7fe72]/25 transition-all cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 fill-[#f7fe72] text-[#f7fe72]" />
                <span>14D STREAK</span>
              </button>
            )}
          </div>

          {/* 2. Center: Direct Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={getAnchorHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-xs xl:text-sm font-semibold text-[#262A21] hover:text-[#9c67b5] dark:text-[#CBD2C7] dark:hover:text-[#f7fe72] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}

            {/* Arena / Leaderboards Link */}
            <Link
              href="/leaderboards"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-xs",
                pathname === "/leaderboards"
                  ? "bg-[#9c67b5]/20 text-[#6C2E85] border border-[#9c67b5] dark:bg-[#9c67b5]/30 dark:text-[#f7fe72] dark:border-[#9c67b5]"
                  : "bg-[#EAEFEA] hover:bg-[#DDE5DC] text-[#121815] border border-[#757761]/30 dark:bg-[#2D163D]/60 dark:hover:bg-[#3E1F55] dark:text-[#E2E7DE] dark:hover:text-[#f7fe72] dark:border-[#9c67b5]/40"
              )}
            >
              <Trophy className="w-3.5 h-3.5 text-[#6C2E85] dark:text-[#f7fe72]" />
              <span>Leaderboards</span>
            </Link>

            {/* Dedicated Rewards Link */}
            <Link
              href="/rewards"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                pathname === "/rewards"
                  ? "bg-[#f4e76e]/20 text-[#7A5A00] border border-[#f4e76e]/50 dark:bg-[#f4e76e]/20 dark:text-[#f4e76e] dark:border-[#f4e76e]/40"
                  : "text-[#262A21] hover:text-[#9c67b5] hover:bg-[#EAEFEA] border border-transparent hover:border-[#757761]/30 dark:text-[#CBD2C7] dark:hover:text-[#f7fe72] dark:hover:bg-white/5"
              )}
            >
              <Award className="w-3.5 h-3.5 text-[#7A5A00] dark:text-[#f4e76e]" />
              <span>Rewards</span>
            </Link>
          </nav>

          {/* 3. Right Utility Cluster: Auth + Primary Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* NextAuth Session Status (Desktop & Tablet) */}
            {session?.user ? (
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDashboard}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAEFEA] hover:bg-[#DDE5DC] dark:bg-white/5 dark:hover:bg-white/10 border border-[#757761]/30 text-xs font-bold text-[#121815] dark:text-[#E2E7DE] transition-all cursor-pointer"
                  title="Open Athlete Dashboard"
                >
                  <div className="w-5 h-5 rounded-full bg-[#9c67b5] text-[#f7fe72] flex items-center justify-center text-[10px] font-black">
                    {session.user.name?.[0]?.toUpperCase() || <User className="w-3 h-3" />}
                  </div>
                  <span className="max-w-[90px] truncate">
                    {session.user.name?.split(" ")[0] || "Athlete"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => signOut({ redirect: false })}
                  className="text-xs font-semibold text-[#757761] hover:text-[#121815] dark:text-[#A0A594] dark:hover:text-white p-1.5 rounded-lg hover:bg-[#EAEFEA] dark:hover:bg-white/5 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="hidden md:block text-xs font-bold text-[#262A21] hover:text-[#9c67b5] dark:text-[#CBD2C7] dark:hover:text-[#f7fe72] px-2.5 py-1.5 rounded-lg hover:bg-[#EAEFEA] dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Primary Action Button (10% High-Voltage Accent) */}
            <button
              type="button"
              onClick={session?.user ? handleDashboard : handleTrial}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] hover:brightness-110 text-[#0B0E0C] text-xs font-black tracking-wide shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{session?.user ? "Dashboard" : "Start Trial"}</span>
              <ArrowRight className="w-3 h-3 text-[#0B0E0C]" />
            </button>

            {/* Mobile / Tablet Menu Button (Zero overlay inline trigger) */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              className="lg:hidden p-2 rounded-xl text-[#262A21] dark:text-[#CBD2C7] hover:text-[#9c67b5] dark:hover:text-[#f7fe72] hover:bg-[#EAEFEA] dark:hover:bg-white/10 border border-[#757761]/30 transition-all cursor-pointer"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 
          =======================================================================
          INLINE EXPANDING MENU (RESPONSIVE FOR MOBILE & TABLET, ZERO OVERLAY)
          =======================================================================
        */}
        {menuOpen && (
          <div className="lg:hidden pt-3 pb-4 border-t border-[#757761]/25 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Navigation Links */}
            <nav className="grid grid-cols-2 gap-2 mb-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={getAnchorHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-3 py-2 rounded-xl bg-[#EAEFEA] dark:bg-white/5 hover:bg-[#DDE5DC] dark:hover:bg-white/10 text-xs font-semibold text-[#121815] dark:text-[#E2E7DE] hover:text-[#9c67b5] dark:hover:text-[#f7fe72] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Main Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <Link
                href="/leaderboards"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6EEFA] dark:bg-[#2D163D]/70 border border-[#9c67b5]/30 dark:border-[#9c67b5]/50 text-xs font-bold text-[#6C2E85] dark:text-[#f7fe72]"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#6C2E85] dark:text-[#f7fe72]" />
                  <span>Leaderboards &amp; Arena</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#6C2E85] dark:text-[#f7fe72]" />
              </Link>

              <Link
                href="/rewards"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#EAEFEA] dark:bg-white/5 hover:bg-[#DDE5DC] dark:hover:bg-white/10 border border-[#757761]/30 text-xs font-bold text-[#121815] dark:text-[#E2E7DE]"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#7A5A00] dark:text-[#f4e76e]" />
                  <span>Rewards &amp; Prestige</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#757761] dark:text-[#A0A594]" />
              </Link>
            </div>

            {/* User Session Row & Action CTA */}
            <div className="pt-2 border-t border-[#757761]/25 space-y-2">
              {session?.user ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#EAEFEA] dark:bg-white/5 border border-[#757761]/30">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#9c67b5] text-[#f7fe72] flex items-center justify-center text-xs font-black shrink-0">
                      {session.user.name?.[0]?.toUpperCase() || <User className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-bold text-[#121815] dark:text-[#E2E7DE] truncate">
                      {session.user.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleDashboard}
                      className="px-2.5 py-1 rounded-lg bg-[#9c67b5]/20 dark:bg-[#9c67b5]/30 hover:bg-[#9c67b5]/40 text-[11px] font-bold text-[#6C2E85] dark:text-[#f7fe72] transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        signOut({ redirect: false });
                      }}
                      className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10"
                      title="Sign Out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleSignIn}
                    className="py-2.5 text-center text-xs font-bold text-[#121815] dark:text-[#E2E7DE] bg-[#EAEFEA] hover:bg-[#DDE5DC] dark:bg-white/5 dark:hover:bg-white/10 border border-[#757761]/30 rounded-xl transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    onClick={handleTrial}
                    className="py-2.5 text-center text-xs font-black text-[#0B0E0C] bg-gradient-to-r from-[#f7fe72] to-[#f4e76e] rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    Start Free Trial
                  </button>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </header>
  );
}
