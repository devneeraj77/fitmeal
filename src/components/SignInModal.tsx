"use client";

import React, { useState } from "react";
import { X, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDashboard?: () => void;
}

export default function SignInModal({ isOpen, onClose, onOpenDashboard }: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials. Enter password (min 6 chars) or use demo login below.");
      } else {
        setAuthenticatedUser(email);
        setLoggedIn(true);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError("");
    const demoEmail = "david.kim@fitmeal.fit";
    const demoPassword = "fitmeal2026";
    setEmail(demoEmail);
    setPassword(demoPassword);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: demoEmail,
        password: demoPassword,
      });

      if (res?.error) {
        setError("Demo sign in failed. Please try again.");
      } else {
        setAuthenticatedUser(demoEmail);
        setLoggedIn(true);
      }
    } catch {
      setError("An error occurred during demo sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  const handleGoToDashboard = () => {
    handleClose();
    if (onOpenDashboard) {
      onOpenDashboard();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!loggedIn ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2 font-mono">
              <Lock className="w-4 h-4 text-emerald-700" />
              <span>NextAuth v5 Credentials Sign In</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Sign In to FitMeal
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Secure authentication powered by NextAuth. Access your personal training splits and biomarker logs.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="david.kim@fitmeal.fit"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">Demo: fitmeal2026</span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-[#1B4332] hover:bg-[#235841] disabled:opacity-75 text-white font-bold text-xs tracking-wide shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>NextAuth Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Option */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleDemoLogin}
                className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>⚡ Instant NextAuth Demo Login (David Kim)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#1B4332] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Authenticated via NextAuth!</h3>
            <p className="text-xs text-slate-600 mt-2 max-w-xs mx-auto">
              Session token created for <strong className="text-slate-900 font-mono">{authenticatedUser}</strong>. Your dashboard and biometrics are synchronized.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={handleGoToDashboard}
                className="w-full py-3 rounded-full bg-[#1B4332] hover:bg-[#245842] text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Open Personal Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Continue on Public Site
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
