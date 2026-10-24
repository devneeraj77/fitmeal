"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const provider = searchParams.get("provider") || "strava";

  useEffect(() => {
    // Send postMessage to opener window
    if (window.opener) {
      window.opener.postMessage(
        {
          type: "OAUTH_AUTH_SUCCESS",
          provider,
          timestamp: Date.now(),
        },
        "*"
      );
      // Auto close after brief delay
      setTimeout(() => {
        try {
          window.close();
        } catch {
          // ignore
        }
      }, 800);
    }
  }, [provider]);

  return (
    <div className="min-h-screen bg-[#0B0E0C] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 animate-bounce">
        <CheckCircle2 className="w-9 h-9" />
      </div>
      <h1 className="text-xl font-black text-white">
        {provider.toUpperCase()} Connected Successfully!
      </h1>
      <p className="text-sm text-slate-300 mt-2 max-w-sm">
        Your biometric workout telemetry and daily activity data are now synchronized with FitMeal AI.
      </p>
      <p className="text-xs text-emerald-400 mt-4 font-mono">
        Closing this window and returning to FitMeal...
      </p>
      <button
        onClick={() => {
          if (window.opener) {
            window.close();
          } else {
            router.push("/");
          }
        }}
        className="mt-6 px-5 py-2 rounded-xl bg-[#f7fe72] text-[#0B0E0C] font-bold text-xs hover:brightness-110 cursor-pointer"
      >
        Return to FitMeal
      </button>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0E0C] text-white flex items-center justify-center">Connecting...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
