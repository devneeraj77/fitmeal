"use client";

import React, { useState } from "react";
import { Flame, ArrowRight, Menu, X, LayoutDashboard, LogOut, User, Trophy } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

interface NavbarProps {
  onOpenStreak: () => void;
  onOpenSignIn: () => void;
  onOpenTrial: () => void;
  onOpenDashboard?: () => void;
}

export default function Navbar({
  onOpenStreak,
  onOpenSignIn,
  onOpenTrial,
  onOpenDashboard,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { label: "Programs", href: "#programs" },
    { label: "Nutrition", href: "#nutrition" },
    { label: "Sleep & Recovery", href: "#recovery" },
    { label: "Coaches", href: "#coaches" },
    { label: "Community", href: "#community" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Dynamic logo featuring minimalist stylized pulse-wave icon next to bold sans-serif text */}
        <a
          href="#"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-emerald-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <svg
              className="w-6 h-6 stroke-current fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
              viewBox="0 0 24 24"
            >
              <path d="M2 12h4l3-7 4 14 3-7h6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-wider text-slate-900 uppercase font-sans">
              FITMEAL <span className="text-emerald-700 font-light">{"//"}</span> <span className="text-xs font-semibold text-slate-500 tracking-widest">NUTRITION &amp; FUEL</span>
            </span>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-[#1B4332] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/leaderboards"
            className="text-sm font-bold text-[#1B4332] hover:text-emerald-800 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-colors whitespace-nowrap"
          >
            <Trophy className="w-3.5 h-3.5 text-emerald-700" />
            <span>Leaderboards</span>
          </a>
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Athlete Dashboard</span>
            </button>
          )}
        </nav>

        {/* Right Utility Cluster */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4 shrink-0">
          {/* Streak Indicator Pill */}
          <button
            onClick={onOpenStreak}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-[#1B4332] text-xs font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
            title="View your active streak details"
          >
            <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
            <span>Day 12 Active</span>
          </button>

          {/* NextAuth Session Status or Sign In Link */}
          {session?.user ? (
            <div className="flex items-center gap-2 pl-1">
              <button
                onClick={onOpenDashboard}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-all cursor-pointer"
                title="Open Dashboard"
              >
                <div className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-[10px]">
                  {session.user.name?.[0] || <User className="w-3 h-3" />}
                </div>
                <span className="max-w-[100px] truncate">{session.user.name || "Member"}</span>
              </button>
              <button
                onClick={() => signOut({ redirect: false })}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                title="NextAuth Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="text-sm font-medium text-slate-700 hover:text-slate-950 px-2 py-1 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={session?.user && onOpenDashboard ? onOpenDashboard : onOpenTrial}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B4332] hover:bg-[#235841] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <span>{session?.user ? "Go to Dashboard" : "Start Free Trial"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold"
              title="Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onOpenStreak}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#1B4332] text-xs font-semibold"
          >
            <Flame className="w-3 h-3 text-emerald-600 fill-emerald-500" />
            <span>12d</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#E2E8F0] bg-[#FAF9F6] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2 pt-2">
            {onOpenDashboard && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-base font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-700" />
                <span>Personal Athlete Dashboard</span>
              </button>
            )}
            <a
              href="/leaderboards"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-3 py-2 rounded-lg text-base font-bold text-[#1B4332] bg-emerald-50/70 border border-emerald-200 flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-emerald-700" />
              <span>Arena &amp; Leaderboards</span>
            </a>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            {session?.user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>Logged in as {session.user.name}</span>
                  <button
                    onClick={() => signOut({ redirect: false })}
                    className="text-xs text-rose-600 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenDashboard) onOpenDashboard();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#18181B] rounded-xl shadow-sm"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignIn();
                  }}
                  className="w-full text-center py-2.5 text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-xl"
                >
                  Sign In (NextAuth)
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrial();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#18181B] rounded-xl shadow-sm"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
