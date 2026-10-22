import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSupabaseProfile, saveDailyGoalsToSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const session = await auth();

    // Default email if no session (e.g. demo athlete)
    const email = session?.user?.email || "david.kim@fitmeal.fit";
    const profile = await getSupabaseProfile(email);

    return NextResponse.json({
      success: true,
      target_calories: profile?.target_calories || 850,
      target_water_liters: profile?.target_water_liters || 3.0,
      source: "supabase",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const email = session?.user?.email || "david.kim@fitmeal.fit";

    const body = await req.json();
    const targetCalories = Number(body.target_calories);
    const targetWater = Number(body.target_water_liters);

    if (isNaN(targetCalories) || isNaN(targetWater) || targetCalories <= 0 || targetWater <= 0) {
      return NextResponse.json(
        { error: "Target calories and water intake must be positive numbers." },
        { status: 400 }
      );
    }

    const updatedProfile = await saveDailyGoalsToSupabase(email, {
      target_calories: targetCalories,
      target_water_liters: targetWater,
    });

    return NextResponse.json({
      success: true,
      message: "Daily goals successfully saved to Supabase",
      target_calories: updatedProfile.target_calories,
      target_water_liters: updatedProfile.target_water_liters,
      source: "supabase",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
