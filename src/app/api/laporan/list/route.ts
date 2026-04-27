import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("laporan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json([]);
    }

    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json([]);
  }
}
