import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0B0E0C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "FitMeal Pro // Athletic Longevity, Local Nutrition & Health Sync",
  description:
    "AI-driven fitness syncing with Google Fit, Apple Health, & Strava. Dynamic macro nutrition, recovery readiness, and global arena quests.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FitMeal",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "FitMeal Pro // Athletic Longevity, Local Nutrition & Health Sync",
    description:
      "AI-driven fitness syncing with Google Fit, Apple Health, & Strava. Dynamic macro nutrition, recovery readiness, and global arena quests.",
  },
};

import AuthProvider from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { OfflineIndicator } from "@/components/PWAInstallButton";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            {children}
            <OfflineIndicator />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
