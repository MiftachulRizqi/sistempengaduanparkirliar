"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseServer";

async function getCurrentUserId() {
  const cookieStore = await cookies();
  const email = cookieStore.get("auth-email")?.value || "";

  if (!email) return null;

  const { data } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  return data?.id || null;
}

function getStoragePathFromPublicUrl(url: string | null) {
  if (!url) return null;

  const marker = "/storage/v1/object/public/uploads/";
  const index = url.indexOf(marker);

  if (index === -1) return null;

  return url.slice(index + marker.length);
}

export async function deleteUserLaporan(id: number | string) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      success: false,
      message: "User belum login.",
    };
  }

  const { data: laporan, error: findError } = await supabaseAdmin
    .from("laporan")
    .select("id, user_id, status, foto")
    .eq("id", Number(id))
    .maybeSingle();

  if (findError || !laporan) {
    return {
      success: false,
      message: "Laporan tidak ditemukan.",
    };
  }

  if (laporan.user_id !== userId) {
    return {
      success: false,
      message: "Kamu tidak memiliki akses ke laporan ini.",
    };
  }

  if (laporan.status !== "Menunggu") {
    return {
      success: false,
      message: "Laporan yang sudah diproses tidak bisa dihapus.",
    };
  }

  const storagePath = getStoragePathFromPublicUrl(laporan.foto);

  const { error: deleteError } = await supabaseAdmin
    .from("laporan")
    .delete()
    .eq("id", Number(id))
    .eq("user_id", userId)
    .eq("status", "Menunggu");

  if (deleteError) {
    return {
      success: false,
      message: "Laporan gagal dihapus.",
    };
  }

  if (storagePath) {
    await supabaseAdmin.storage.from("uploads").remove([storagePath]);
  }

  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/peta-laporan");

  return {
    success: true,
    message: "Laporan berhasil dihapus.",
  };
}