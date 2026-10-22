"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Shield, Sparkles, Mail, Lock } from "lucide-react";

export default function ConversionAnchor() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wide, rounded-3xl container card in deep forest green with vibrant emerald lighting accents */}
        <div className="relative overflow-hidden rounded-3xl bg-[#1B4332] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-emerald-900/60">
          
          {/* Vibrant Emerald Lighting Accents */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            {/* Top Micro-Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIMITED FOUNDING MEMBER COHORT</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to Reset Your Daily Rhythm?
            </h2>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
              Unlock adaptive resistance training splits, metabolic nutrition fuel blueprints, and restorative sleep hygiene protocols tailored specifically to your body.
            </p>

            {/* Quick Onboarding Email Input */}
            <div className="mt-8 max-w-xl mx-auto">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-full">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter your primary email..."
                      className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-lg"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-sm font-black tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>Start 7-Day Free Trial</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white animate-in zoom-in-95 duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Welcome to FitMeal!</h3>
                  <p className="text-sm text-emerald-100 mt-1">
                    Your 7-day full access pass and onboarding assessment link have been dispatched to{" "}
                    <strong className="text-white underline font-mono">{email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setEmail("");
                    }}
                    className="mt-4 text-xs text-emerald-300 hover:underline font-semibold"
                  >
                    Register another email
                  </button>
                </div>
              )}

              {error && <p className="text-emerald-200 bg-black/30 px-3 py-1.5 rounded-lg text-xs font-semibold mt-2 text-left">{error}</p>}
            </div>

            {/* Guarantee and Zero Credit Card Notice */}
            <div className="mt-8 pt-6 border-t border-emerald-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200/90 font-medium">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>7-day free trial guarantee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Zero credit card required</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Cancel anytime in 1 tap</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
