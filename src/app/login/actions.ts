"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseServer";
import type { AuthActionState } from "./authTypes";
import { headers } from "next/headers";

type AuthRole = "user" | "admin";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().trim().min(1, "Password wajib diisi"),
  next: z.string().optional(),
});

const registerSchema = z.object({
  nama: z.string().trim().min(3, "Nama minimal 3 karakter"),
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().trim().min(6, "Password minimal 6 karakter"),
  next: z.string().optional(),
});

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
});

function normalizeNext(next?: string | null, role?: AuthRole) {
  if (role === "admin") return "/admin";

  if (!next) return "/contact";
  if (!next.startsWith("/")) return "/contact";
  if (next.startsWith("/admin")) return "/contact";
  if (next.startsWith("/login")) return "/contact";

  return next;
}

async function setAuthCookies(payload: {
  email: string;
  nama: string;
  role: AuthRole;
}) {
  const cookieStore = await cookies();

  cookieStore.set("auth-token", "logged-in", {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  cookieStore.set("auth-role", payload.role, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  cookieStore.set("auth-email", payload.email, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  cookieStore.set("auth-username", payload.email, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  cookieStore.set("auth-name", payload.nama, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      title: "Login gagal",
      message: "Periksa kembali data yang kamu masukkan.",
      fieldErrors: parsed.error.flatten()
        .fieldErrors as AuthActionState["fieldErrors"],
    };
  }

  const { email, password, next } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

  if (authError || !authData.user) {
    return {
      status: "error",
      title: "Login gagal",
      message: "Email atau password salah.",
    };
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("nama, email, role")
    .eq("id", authData.user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return {
      status: "error",
      title: "Login gagal",
      message: "Profile akun tidak ditemukan.",
    };
  }

  const role: AuthRole =
    String(profile.role).trim().toLowerCase() === "admin" ? "admin" : "user";

  await setAuthCookies({
    email: profile.email,
    nama: profile.nama,
    role,
  });

  redirect(normalizeNext(next, role));
}

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    nama: formData.get("nama"),
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      title: "Pendaftaran gagal",
      message: "Periksa kembali data yang kamu masukkan.",
      fieldErrors: parsed.error.flatten()
        .fieldErrors as AuthActionState["fieldErrors"],
    };
  }

  const { nama, email, password, next } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const { data: existingProfile } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (existingProfile) {
    return {
      status: "error",
      title: "Email tidak tersedia",
      message: "Email tersebut sudah digunakan. Silakan gunakan email lain.",
      fieldErrors: {
        email: "Email tersebut sudah digunakan.",
      },
    };
  }

  const { data: createdUser, error: createError } =
    await supabaseAdmin.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
    });

  if (createError || !createdUser.user) {
    return {
      status: "error",
      title: "Pendaftaran gagal",
      message: createError?.message || "Akun belum berhasil dibuat.",
    };
  }

  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .upsert(
      {
        id: createdUser.user.id,
        nama,
        email: normalizedEmail,
        role: "user",
      },
      {
        onConflict: "id",
      }
    );

  if (profileError) {
    console.error("Create profile error:", profileError);

    await supabaseAdmin.auth.admin.deleteUser(createdUser.user.id);

    return {
      status: "error",
      title: "Pendaftaran gagal",
      message: profileError.message || "Profile akun belum berhasil dibuat.",
    };
  }

  await setAuthCookies({
    email: normalizedEmail,
    nama,
    role: "user",
  });

  redirect(normalizeNext(next, "user"));
}

export async function forgotPasswordAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      title: "Reset password gagal",
      message: "Masukkan email yang valid.",
      fieldErrors: parsed.error.flatten()
        .fieldErrors as AuthActionState["fieldErrors"],
    };
  }

  const email = parsed.data.email.toLowerCase();

  const headersList = await headers();
  const origin = headersList.get("origin") || "http://localhost:3000";

  const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    return {
      status: "error",
      title: "Reset password gagal",
      message: error.message || "Email reset password belum berhasil dikirim.",
    };
  }

  return {
    status: "success",
    title: "Email reset terkirim",
    message:
      "Jika email terdaftar, link reset password telah dikirim. Silakan cek inbox atau folder spam.",
    fieldErrors: {},
  };
}