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
  title: "PotatoFit // From Couch Potato to Global Apex",
  description:
    "From Couch Potato to Global Apex. AI-driven nutrition mapped to your nearest vegetable vendors and local grocers. Fuel smart, track daily quests, and compete with athletes worldwide.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PotatoFit",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "PotatoFit // From Couch Potato to Global Apex",
    description:
      "From Couch Potato to Global Apex. AI-driven nutrition mapped to your nearest vegetable vendors and local grocers. Fuel smart, track daily quests, and compete with athletes worldwide.",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0E0C] text-[#E2E7DE]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
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
