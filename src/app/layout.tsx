import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "FitMeal // Personalized Meal Fuel, Strength & Longevity",
  description: "Personalized nutrition fuel, hybrid fitness training, and mindful recovery trackers engineered to fit your life.",
  openGraph: {
    title: "FitMeal // Personalized Meal Fuel, Strength & Longevity",
    description: "Personalized nutrition fuel, hybrid fitness training, and mindful recovery trackers engineered to fit your life.",
  },
};

import AuthProvider from "@/components/AuthProvider";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
