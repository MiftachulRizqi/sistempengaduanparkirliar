"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseServer";

const allowedStatus = ["Menunggu", "Diproses", "Selesai"];

export async function updateStatusLaporan(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));

  if (!id || !allowedStatus.includes(status)) {
    return;
  }

  const { error } = await supabaseAdmin
    .from("laporan")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Gagal update status:", error.message);
    return;
  }

  revalidatePath("/admin");
  revalidatePath("/services");
}