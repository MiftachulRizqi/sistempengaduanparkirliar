"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";
import { supabaseAdmin } from "@/lib/supabaseServer";
import type {
  LaporanActionState,
  LaporanFieldErrors,
} from "./actionTypes";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function createActionResult(
  status: LaporanActionState["status"],
  title: string,
  message: string,
  fieldErrors: LaporanFieldErrors = {}
): LaporanActionState {
  return {
    status,
    title,
    message,
    fieldErrors,
    submittedAt: Date.now(),
  };
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

export async function createLaporanAction(
  _prevState: LaporanActionState,
  formData: FormData
): Promise<LaporanAonsstionState> {
  try {
    const nama = String(formData.get("nama") || "").trim();
    const lokasi = String(formData.get("lokasi") || "").trim();
    const deskripsi = String(formData.get("deskripsi") || "").trim();
    const foto = formData.get("foto");

    const fieldErrors: LaporanFieldErrors = {};

    if (!nama) {
      fieldErrors.nama = "Nama wajib diisi";
    }

    if (!lokasi) {
      fieldErrors.lokasi = "Lokasi wajib diisi";
    }

    if (!deskripsi) {
      fieldErrors.deskripsi = "Deskripsi wajib diisi";
    }

    if (!(foto instanceof File) || foto.size === 0) {
      fieldErrors.foto = "Foto wajib diupload";
    }

    if (foto instanceof File && foto.size > MAX_FILE_SIZE) {
      fieldErrors.foto = "Ukuran foto maksimal 5 MB";
    }

    if (foto instanceof File && foto.size > 0 && !foto.type.startsWith("image/")) {
      fieldErrors.foto = "File harus berupa gambar";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return createActionResult(
        "error",
        "Data belum lengkap",
        "Lengkapi semua data laporan sebelum mengirim.",
        fieldErrors
      );
    }

    const validFoto = foto as File;

    const bytes = await validFoto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = sanitizeFileName(validFoto.name);
    const fileName = `${Date.now()}-${randomUUID()}-${safeName}`;
    const filePath = `laporan/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("uploads")
      .upload(filePath, buffer, {
        contentType: validFoto.type || "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      return createActionResult(
        "error",
        "Gagal upload foto",
        uploadError.message || "Foto bukti belum berhasil diupload."
      );
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("uploads")
      .getPublicUrl(filePath);

    const fotoUrl = publicUrlData.publicUrl;

    const { data, error } = await supabaseAdmin
      .from("laporan")
      .insert({
        nama,
        lokasi,
        deskripsi,
        foto: fotoUrl,
        status: "Menunggu",
      })
      .select("id")
      .single();

    if (error) {
      await supabaseAdmin.storage.from("uploads").remove([filePath]);

      return createActionResult(
        "error",
        "Gagal menyimpan laporan",
        error.message || "Data laporan belum berhasil disimpan."
      );
    }

    revalidatePath("/services");

    if (data?.id) {
      revalidatePath(`/laporan/${data.id}`);
    }

    return createActionResult(
      "success",
      "Laporan berhasil dikirim",
      "Terima kasih. Laporan Anda sudah kami terima dan akan segera ditindaklanjuti."
    );
  } catch (error) {
    console.error("Server Action createLaporanAction error:", error);

    return createActionResult(
      "error",
      "Laporan gagal dikirim",
      "Terjadi error saat mengirim laporan. Silakan coba beberapa saat lagi."
    );
  }
}
