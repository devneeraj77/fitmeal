import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSupabaseProfile, syncAuthUserToSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await getSupabaseProfile(session.user.email);

    return NextResponse.json({
      success: true,
      provider: "supabase",
      profile: profile || {
        id: session.user.id || "usr_default",
        email: session.user.email,
        full_name: session.user.name || "Active Mover",
        level: "Level 4 Mover",
        streak_days: 14,
      },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const updated = await syncAuthUserToSupabase({
      id: session.user.id || "user-" + session.user.email,
      email: session.user.email,
      name: body.full_name || session.user.name,
    });

    return NextResponse.json({
      success: true,
      provider: "supabase",
      profile: updated,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
