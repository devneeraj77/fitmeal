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
  title: "PotatoFit // From Couch Potato to Global Apex",
  description:
    "AI-driven nutrition mapped to your nearest vegetable vendors and local grocers. Fuel smart, track daily quests, and compete with athletes worldwide.",
  openGraph: {
    title: "PotatoFit // From Couch Potato to Global Apex",
    description:
      "AI-driven nutrition mapped to your nearest vegetable vendors and local grocers. Fuel smart, track daily quests, and compete with athletes worldwide.",
  },
};

import AuthProvider from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({ children }: LayoutProps<"/">) {
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
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
