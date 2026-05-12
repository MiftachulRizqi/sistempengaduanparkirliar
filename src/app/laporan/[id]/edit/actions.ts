"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";
import { supabaseAdmin } from "@/lib/supabaseServer";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

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

function sanitizeFileName(fileName: string) {
  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const extension = fileName.split(".").pop()?.toLowerCase() || "jpg";

  const safeName =
    nameWithoutExtension
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "foto-laporan";

  return `${safeName}.${extension}`;
}

function getStoragePathFromPublicUrl(url: string | null) {
  if (!url) return null;

  const marker = "/storage/v1/object/public/uploads/";
  const index = url.indexOf(marker);

  if (index === -1) return null;

  return url.slice(index + marker.length);
}

export async function updateLaporanAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const back = String(formData.get("back") || "/services");
  const nama = String(formData.get("nama") || "").trim();
  const lokasi = String(formData.get("lokasi") || "").trim();
  const deskripsi = String(formData.get("deskripsi") || "").trim();
  const foto = formData.get("foto");

  const userId = await getCurrentUserId();

  if (!userId) {
    redirect(`/login?next=/laporan/${id}/edit`);
  }

  if (!id || !nama || !lokasi || !deskripsi) {
    redirect(
      `/laporan/${id}/edit?back=${encodeURIComponent(
        back
      )}&error=${encodeURIComponent("Data belum lengkap")}`
    );
  }

  if (/\d/.test(nama)) {
    redirect(
      `/laporan/${id}/edit?back=${encodeURIComponent(
        back
      )}&error=${encodeURIComponent("Nama tidak boleh mengandung angka")}`
    );
  }

  const { data: laporan } = await supabaseAdmin
    .from("laporan")
    .select("id, user_id, status, foto")
    .eq("id", Number(id))
    .maybeSingle();

  if (!laporan || laporan.user_id !== userId || laporan.status !== "Menunggu") {
    redirect(`/laporan/${id}?back=${encodeURIComponent(back)}`);
  }

  let fotoUrl = laporan.foto as string | null;
  let newStoragePath: string | null = null;
  let oldStoragePath: string | null = null;

  if (foto instanceof File && foto.size > 0) {
    if (!foto.type.startsWith("image/")) {
      redirect(
        `/laporan/${id}/edit?back=${encodeURIComponent(
          back
        )}&error=${encodeURIComponent("File harus berupa gambar")}`
      );
    }

    if (foto.size > MAX_FILE_SIZE) {
      redirect(
        `/laporan/${id}/edit?back=${encodeURIComponent(
          back
        )}&error=${encodeURIComponent("Ukuran foto maksimal 5 MB")}`
      );
    }

    const bytes = await foto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = sanitizeFileName(foto.name);
    const fileName = `${Date.now()}-${randomUUID()}-${safeName}`;
    const filePath = `laporan/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("uploads")
      .upload(filePath, buffer, {
        contentType: foto.type || "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      redirect(
        `/laporan/${id}/edit?back=${encodeURIComponent(
          back
        )}&error=${encodeURIComponent("Foto baru gagal diupload")}`
      );
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("uploads")
      .getPublicUrl(filePath);

    fotoUrl = publicUrlData.publicUrl;
    newStoragePath = filePath;
    oldStoragePath = getStoragePathFromPublicUrl(laporan.foto);
  }

  const { error } = await supabaseAdmin
    .from("laporan")
    .update({
      nama,
      lokasi,
      deskripsi,
      foto: fotoUrl,
    })
    .eq("id", Number(id))
    .eq("user_id", userId)
    .eq("status", "Menunggu");

  if (error) {
    if (newStoragePath) {
      await supabaseAdmin.storage.from("uploads").remove([newStoragePath]);
    }

    redirect(
      `/laporan/${id}/edit?back=${encodeURIComponent(
        back
      )}&error=${encodeURIComponent("Gagal memperbarui laporan")}`
    );
  }

  if (oldStoragePath) {
    await supabaseAdmin.storage.from("uploads").remove([oldStoragePath]);
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath(`/laporan/${id}`);
  revalidatePath("/admin");
  revalidatePath("/admin/peta-laporan");

  redirect(`/laporan/${id}?back=${encodeURIComponent(back)}`);
}