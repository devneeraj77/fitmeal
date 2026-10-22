import { createClient } from "@supabase/supabase-js";

// Retrieve Supabase environment credentials (or safe defaults for development)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock-fitmeal.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-anon-key-fitmeal-2026";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SupabaseAuthProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
  level?: string;
  streak_days?: number;
  target_calories: number;
  target_water_liters: number;
  last_sign_in_at?: string;
  created_at?: string;
}

// In-memory fallback cache when Supabase credentials are in development/mock mode
const inMemoryUserDb = new Map<string, SupabaseAuthProfile>([
  [
    "david.kim@fitmeal.fit",
    {
      id: "usr_david_kim_01",
      email: "david.kim@fitmeal.fit",
      full_name: "David Kim",
      level: "Level 4 Mover",
      streak_days: 14,
      target_calories: 850,
      target_water_liters: 3.0,
      last_sign_in_at: new Date().toISOString(),
      created_at: "2026-10-01T08:00:00.000Z",
    },
  ],
]);

/**
 * Synchronizes authenticated user record to the Supabase database.
 * Falls back gracefully to memory cache if external Supabase endpoint is offline or using mock keys.
 */
export async function syncAuthUserToSupabase(user: {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}): Promise<SupabaseAuthProfile> {
  const existing = inMemoryUserDb.get(user.email.toLowerCase());

  const profile: SupabaseAuthProfile = {
    id: user.id,
    email: user.email.toLowerCase(),
    full_name: user.name || user.email.split("@")[0],
    avatar_url: user.image || undefined,
    level: existing?.level || "Level 4 Mover",
    streak_days: existing?.streak_days || 14,
    target_calories: existing?.target_calories || 850,
    target_water_liters: existing?.target_water_liters || 3.0,
    last_sign_in_at: new Date().toISOString(),
  };

  // Always update in-memory cache for fast, reliable read-back
  inMemoryUserDb.set(profile.email, profile);

  // If real Supabase credentials are configured, execute the upsert
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://mock-fitmeal.supabase.co" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert(
          {
            id: profile.id,
            email: profile.email,
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
            target_calories: profile.target_calories,
            target_water_liters: profile.target_water_liters,
            last_sign_in_at: profile.last_sign_in_at,
          },
          { onConflict: "email" }
        )
        .select()
        .single();

      if (error) {
        console.warn("[Supabase] Notice on upsert, using local fallback:", error.message);
      } else if (data) {
        return data as SupabaseAuthProfile;
      }
    } catch (err) {
      console.warn("[Supabase] Outbound sync request caught:", err);
    }
  }

  return profile;
}

/**
 * Retrieves a user's auth profile from Supabase or cached session memory.
 */
export async function getSupabaseProfile(email: string): Promise<SupabaseAuthProfile | null> {
  const normalizedEmail = email.toLowerCase();

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://mock-fitmeal.supabase.co" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", normalizedEmail)
        .single();

      if (!error && data) {
        return data as SupabaseAuthProfile;
      }
    } catch {
      // Fall through to memory store
    }
  }

  return inMemoryUserDb.get(normalizedEmail) || null;
}

/**
 * Updates daily goals (target calories and water intake) in Supabase.
 */
export async function saveDailyGoalsToSupabase(
  email: string,
  goals: { target_calories: number; target_water_liters: number }
): Promise<SupabaseAuthProfile> {
  const normalizedEmail = email.toLowerCase();
  const existing = await getSupabaseProfile(normalizedEmail);

  const updatedProfile: SupabaseAuthProfile = {
    id: existing?.id || "usr_" + normalizedEmail.replace(/[^a-z0-9]/g, "_"),
    email: normalizedEmail,
    full_name: existing?.full_name || normalizedEmail.split("@")[0],
    avatar_url: existing?.avatar_url,
    level: existing?.level || "Level 4 Mover",
    streak_days: existing?.streak_days || 14,
    target_calories: Number(goals.target_calories),
    target_water_liters: Number(goals.target_water_liters),
    last_sign_in_at: existing?.last_sign_in_at || new Date().toISOString(),
  };

  // Update in-memory fallback cache
  inMemoryUserDb.set(normalizedEmail, updatedProfile);

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://mock-fitmeal.supabase.co" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert(
          {
            id: updatedProfile.id,
            email: normalizedEmail,
            target_calories: updatedProfile.target_calories,
            target_water_liters: updatedProfile.target_water_liters,
          },
          { onConflict: "email" }
        )
        .select()
        .single();

      if (error) {
        console.warn("[Supabase] Notice on goals update:", error.message);
      } else if (data) {
        return data as SupabaseAuthProfile;
      }
    } catch (err) {
      console.warn("[Supabase] Outbound goals update caught:", err);
    }
  }

  return updatedProfile;
}
