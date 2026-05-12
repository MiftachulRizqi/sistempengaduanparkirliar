"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseServer";

function getStoragePathFromPublicUrl(url: string | null) {
  if (!url) return null;

  const marker = "/storage/v1/object/public/uploads/";
  const index = url.indexOf(marker);

  if (index === -1) return null;

  return url.slice(index + marker.length);
}

async function getCurrentUserId() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth-token")?.value;
  const role = cookieStore.get("auth-role")?.value;
  const email = cookieStore.get("auth-email")?.value || "";

  if (token !== "logged-in" || role !== "user" || !email) {
    return null;
  }

  const { data } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  return data?.id || null;
}

export async function deleteLaporanAction(id: number | string) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      success: false,
      message: "Kamu harus login sebagai user untuk menghapus laporan.",
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
      message: "Kamu tidak memiliki akses untuk menghapus laporan ini.",
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

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin");
  revalidatePath("/admin/peta-laporan");

  return {
    success: true,
    message: "Laporan berhasil dihapus.",
  };
}