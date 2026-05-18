"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { Buffer } from "node:buffer";
import { z } from "zod";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseServer";
import type { LaporanActionState, LaporanFieldErrors } from "./actionTypes";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const laporanSchema = z.object({
  nama: z
    .string()
    .trim()
    .min(1, "Nama wajib diisi")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'.-]+$/, "Nama tidak boleh mengandung angka"),
  lokasi: z.string().trim().min(1, "Lokasi wajib diisi"),
  deskripsi: z.string().trim().min(10, "Deskripsi minimal 10 karakter"),
  latitude: z.coerce
    .number({ message: "Latitude tidak valid" })
    .refine((value) => value >= -90 && value <= 90, "Latitude tidak valid"),
  longitude: z.coerce
    .number({ message: "Longitude tidak valid" })
    .refine((value) => value >= -180 && value <= 180, "Longitude tidak valid"),
  foto: z
    .instanceof(File, { message: "Foto wajib diupload" })
    .refine((file) => file.size > 0, "Foto wajib diupload")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Ukuran foto maksimal 5 MB")
    .refine(
      (file) => file.type.startsWith("image/"),
      "File harus berupa gambar"
    ),
});

type AuthenticatedUser = {
  email: string;
  role: string;
  userId: string;
};

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

function getFieldErrors(error: z.ZodError): LaporanFieldErrors {
  const errors: LaporanFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0] as keyof LaporanFieldErrors | undefined;

    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return errors;
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

async function getAuthenticatedUser(): Promise<
  | { user: AuthenticatedUser; error: null }
  | { user: null; error: LaporanActionState }
> {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth-token")?.value;
  const role = cookieStore.get("auth-role")?.value || "";
  const email =
    cookieStore.get("auth-email")?.value ||
    cookieStore.get("auth-username")?.value ||
    "";

  if (token !== "logged-in") {
    return {
      user: null,
      error: createActionResult(
        "error",
        "Login diperlukan",
        "Silakan masuk terlebih dahulu sebelum mengirim laporan."
      ),
    };
  }

  const normalizedRole = String(role).trim().toLowerCase();

  if (normalizedRole !== "user") {
    return {
      user: null,
      error: createActionResult(
        "error",
        "Akses ditolak",
        "Hanya user yang dapat mengirim laporan."
      ),
    };
  }

  if (!email) {
    return {
      user: null,
      error: createActionResult(
        "error",
        "Email tidak ditemukan",
        "Sesi login belum memiliki email. Silakan logout lalu login kembali."
      ),
    };
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("id, email")
    .eq("email", email)
    .maybeSingle();

  if (profileError || !profile?.id || !profile.email) {
    return {
      user: null,
      error: createActionResult(
        "error",
        "Profile tidak ditemukan",
        "Data profile akun belum tersedia. Silakan logout lalu login kembali."
      ),
    };
  }

  return {
    user: {
      email: profile.email,
      role: normalizedRole,
      userId: profile.id,
    },
    error: null,
  };
}

export async function createLaporanAction(
  _prevState: LaporanActionState,
  formData: FormData
): Promise<LaporanActionState> {
  try {
    const auth = await getAuthenticatedUser();

    if (auth.error) {
      return auth.error;
    }

    const parsed = laporanSchema.safeParse({
      nama: formData.get("nama"),
      lokasi: formData.get("lokasi"),
      deskripsi: formData.get("deskripsi"),
      latitude: formData.get("latitude"),
      longitude: formData.get("longitude"),
      foto: formData.get("foto"),
    });

    if (!parsed.success) {
      return createActionResult(
        "error",
        "Data belum valid",
        "Periksa kembali input laporan yang masih salah.",
        getFieldErrors(parsed.error)
      );
    }

    const { nama, lokasi, deskripsi, latitude, longitude, foto } = parsed.data;

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
        latitude,
        longitude,
        user_id: auth.user.userId,
        pelapor_email: auth.user.email,
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

    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/services");
    revalidatePath("/admin");
    revalidatePath("/admin/peta-laporan");

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