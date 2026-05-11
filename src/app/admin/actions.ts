"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseServer";

const allowedStatus = ["Menunggu", "Diproses", "Selesai"];

export type AdminActionResult = {
  success: boolean;
  message: string;
};

export async function updateStatusLaporan(formData: FormData): Promise<void> {
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

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/admin/laporan/${id}`);
  revalidatePath(`/laporan/${id}`);
}

export async function deleteLaporan(
  formData: FormData
): Promise<AdminActionResult> {
  const id = Number(formData.get("id"));

  if (!id) {
    return {
      success: false,
      message: "ID laporan tidak valid.",
    };
  }

  const { data: laporan } = await supabaseAdmin
    .from("laporan")
    .select("foto")
    .eq("id", id)
    .single();

  const { error } = await supabaseAdmin.from("laporan").delete().eq("id", id);

  if (error) {
    console.error("Gagal hapus laporan:", error.message);

    return {
      success: false,
      message: "Laporan gagal dihapus.",
    };
  }

  const fotoUrl = laporan?.foto as string | null | undefined;

  if (fotoUrl && fotoUrl.includes("/uploads/")) {
    const filePath = fotoUrl.split("/uploads/")[1];

    if (filePath) {
      await supabaseAdmin.storage.from("uploads").remove([filePath]);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/admin/laporan/${id}`);
  revalidatePath(`/laporan/${id}`);

  return {
    success: true,
    message: "Laporan berhasil dihapus.",
  };
}

export async function deleteUserAccount(
  formData: FormData
): Promise<AdminActionResult> {
  const id = String(formData.get("id") || "");
  const email = String(formData.get("email") || "");

  if (!id) {
    return {
      success: false,
      message: "ID user tidak valid.",
    };
  }

  if (email === "admin@pengaduan.com") {
    return {
      success: false,
      message: "Akun admin utama tidak boleh dihapus.",
    };
  }

  const { error } = await supabaseAdmin.from("users").delete().eq("id", id);

  if (error) {
    console.error("Gagal hapus akun user:", error.message);

    return {
      success: false,
      message: "Akun user gagal dihapus.",
    };
  }

  revalidatePath("/admin/pengaturan");

  return {
    success: true,
    message: "Akun user berhasil dihapus.",
  };
}