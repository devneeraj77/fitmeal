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
} from "lucide-react";
import PotatoFitLogo from "./PotatoFitLogo";

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

  // Mobile menu toggle & scroll tracking
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  // Dynamic scroll state for subtle glassmorphism elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll bleed when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileMenuOpen]);

  // Clean keyboard navigation (Esc to close mobile menu)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Standard direct section links
  const navLinks = [
    { label: "Programs", href: "#programs" },
    { label: "Nutrition", href: "#nutrition" },
    { label: "Sleep & Recovery", href: "#recovery" },
    { label: "Coaches", href: "#coaches" },
    { label: "Community", href: "#community" },
  ];

  // Cross-page anchor resolver
  const getAnchorHref = (hash: string) => {
    return pathname === "/" ? hash : `/${hash}`;
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
    if (onOpenSignIn) {
      onOpenSignIn();
    } else {
      router.push("/api/auth/signin");
    }
  };

  const handleTrial = () => {
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
    if (onOpenDashboard) {
      onOpenDashboard();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      {/* =========================================================================
          TOP TICKER BAR (Commented out: Enable if live announcement banner is needed)
          ========================================================================= */}
      {/*
      <div className="bg-[#1B4332] text-white text-[11px] font-semibold py-1 px-4 text-center">
        <span>⚡ Season 4 Protocol Active • 5,200+ Kirana &amp; Grocers Mapped</span>
      </div>
      */}

      {/* Main Sticky Navbar Container */}
      <header
        ref={navRef}
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-[#FAF9F6]/95 backdrop-blur-xl border-b border-slate-200/90 shadow-2xs"
            : "bg-[#FAF9F6]/85 backdrop-blur-md border-b border-slate-200/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* 1. Left: Brand Mark */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-xl p-1 shrink-0"
            aria-label="PotatoFit Home"
          >
            <PotatoFitLogo size="sm" variant="light" />
          </Link>

          {/* 2. Center: Direct Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={getAnchorHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm font-semibold text-slate-700 hover:text-[#1B4332] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}

            {/* Arena / Leaderboards Link */}
            <Link
              href="/leaderboards"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-bold text-[#1B4332] bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-colors whitespace-nowrap"
            >
              <Trophy className="w-3.5 h-3.5 text-emerald-700" />
              <span>Leaderboards</span>
            </Link>

            {/* Dedicated Rewards Link */}
            <Link
              href="/rewards"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-bold text-slate-700 hover:text-[#1B4332] hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Rewards</span>
            </Link>

            {/* =========================================================================
                ATHLETE DASHBOARD LINK (Commented out if not needed in center nav)
                ========================================================================= */}
            {/*
            {onOpenDashboard && (
              <button
                onClick={handleDashboard}
                className="text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            )}
            */}
          </nav>

          {/* 3. Right Utility Cluster (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            
            {/* =========================================================================
                STREAK PILL (Commented out if not wanted: Uncomment anytime to display)
                ========================================================================= */}
            {/*
            <button
              onClick={onOpenStreak}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-[#1B4332] text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
              title="View habit streak status"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Day 12 Active</span>
            </button>
            */}

            {/* NextAuth Session Status or Sign In Link */}
            {session?.user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDashboard}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-all cursor-pointer"
                  title="Open Athlete Dashboard"
                >
                  <div className="w-5 h-5 rounded-full bg-[#1B4332] text-emerald-300 flex items-center justify-center text-[10px]">
                    {session.user.name?.[0]?.toUpperCase() || <User className="w-3 h-3" />}
                  </div>
                  <span className="max-w-[100px] truncate">
                    {session.user.name?.split(" ")[0] || "Athlete"}
                  </span>
                </button>

                <button
                  onClick={() => signOut({ redirect: false })}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="text-sm font-semibold text-slate-700 hover:text-slate-950 px-2 py-1 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Primary CTA Button */}
            <button
              onClick={session?.user ? handleDashboard : handleTrial}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1B4332] hover:bg-[#153427] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer group"
            >
              <span>{session?.user ? "Go to Dashboard" : "Start Free Trial"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 4. Mobile Controls: Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            
            {/* =========================================================================
                MOBILE STREAK PILL (Commented out if not wanted)
                ========================================================================= */}
            {/*
            {onOpenStreak && (
              <button
                onClick={onOpenStreak}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1B4332] text-xs font-bold"
              >
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>12d</span>
              </button>
            )}
            */}

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE DRAWER SHEET (Properly full-width, no overlay bugs)
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Drawer Content */}
          <div className="relative z-10 w-full max-h-[85dvh] bg-[#FAF9F6] border-b border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-top duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-white border-b border-slate-200">
              <PotatoFitLogo size="sm" variant="light" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="overflow-y-auto px-4 py-5 space-y-4">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={getAnchorHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="px-3 py-2.5 rounded-xl text-base font-medium text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                <Link
                  href="/leaderboards"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-base font-bold text-[#1B4332] bg-emerald-50/70 border border-emerald-200 flex items-center gap-2 mt-2"
                >
                  <Trophy className="w-4 h-4 text-emerald-700" />
                  <span>Leaderboards &amp; Arena</span>
                </Link>

                <Link
                  href="/rewards"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Rewards &amp; Prestige</span>
                </Link>

                {onOpenDashboard && (
                  <button
                    onClick={handleDashboard}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-base font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 flex items-center gap-2 mt-1 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-700" />
                    <span>Personal Athlete Dashboard</span>
                  </button>
                )}
              </nav>

              {/* Drawer Auth & Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
                {session?.user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between">
                      <span className="truncate">Logged in as {session.user.name}</span>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          signOut({ redirect: false });
                        }}
                        className="text-xs text-rose-600 font-semibold cursor-pointer shrink-0 ml-2"
                      >
                        Sign Out
                      </button>
                    </div>

                    <button
                      onClick={handleDashboard}
                      className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-[#1B4332] rounded-xl shadow-sm cursor-pointer"
                    >
                      <span>Go to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleSignIn}
                      className="w-full text-center py-2.5 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl cursor-pointer"
                    >
                      Sign In
                    </button>

                    <button
                      onClick={handleTrial}
                      className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-[#1B4332] rounded-xl shadow-sm cursor-pointer"
                    >
                      <span>Start Free Trial</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
