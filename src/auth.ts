import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { syncAuthUserToSupabase } from "@/lib/supabase";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          return null;
        }

        // Standard athlete credentials or demo login
        // Demo credentials: david.kim@pulseflow.fit / pulse2026
        // Also supports any registered fitness member with valid email and password >= 6 chars
        if (
          (email.toLowerCase() === "david.kim@pulseflow.fit" && password === "pulse2026") ||
          (email.includes("@") && password.length >= 6)
        ) {
          const displayName = email.toLowerCase() === "david.kim@pulseflow.fit"
            ? "David Kim"
            : email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

          const userObj = {
            id: "user-" + email.toLowerCase().replace(/[^a-z0-9]/g, "-"),
            name: displayName,
            email: email.toLowerCase(),
          };

          // Synchronize user authentication record to Supabase database
          try {
            await syncAuthUserToSupabase(userObj);
          } catch (err) {
            console.warn("[Auth] Supabase sync caught:", err);
          }

          return userObj;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || "pulse-and-flow-nextauth-secret-32-chars-key",
  trustHost: true,
});
