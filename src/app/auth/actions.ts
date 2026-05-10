"use server";

import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseServer";

export async function daftarAction(formData: FormData) {
  const nama = String(formData.get("nama") || "").trim();

  const email = String(formData.get("email") || "").trim();

  const password = String(formData.get("password") || "").trim();

  if (!nama || !email || !password) {
    return;
  }

  const { data, error } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (error || !data.user) {
    console.error("Gagal daftar:", error?.message);
    return;
  }

  const { error: profileError } =
    await supabaseAdmin.from("profiles").insert({
      id: data.user.id,
      nama,
      email,
      role: "user",
    });

  if (profileError) {
    console.error(
      "Gagal membuat profile:",
      profileError.message
    );

    return;
  }

  redirect("/login");
}