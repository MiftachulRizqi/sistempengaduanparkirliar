"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCarSide,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaShieldAlt,
  FaSpinner,
} from "react-icons/fa";
import { supabaseClient } from "@/lib/supabaseClient";

type ResetStatus = "checking" | "ready" | "success" | "error";

export default function ResetPasswordClient() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState<ResetStatus>("checking");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function prepareSession() {
      setStatus("checking");
      setMessage("");

      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabaseClient.auth.exchangeCodeForSession(
          window.location.href
        );

        if (error) {
          setStatus("error");
          setMessage(
            "Link reset password tidak valid atau sudah kedaluwarsa. Silakan minta link reset ulang."
          );
          return;
        }

        window.history.replaceState(null, "", "/reset-password");
      }

      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (!session) {
        setStatus("error");
        setMessage(
          "Link reset password tidak valid atau sudah kedaluwarsa. Silakan minta link reset ulang."
        );
        return;
      }

      setStatus("ready");
    }

    prepareSession();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (trimmedPassword.length < 6) {
      setStatus("ready");
      setMessage("Password minimal 6 karakter.");
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setStatus("ready");
      setMessage("Konfirmasi password belum sama.");
      return;
    }

    setPending(true);
    setMessage("");

    const { error } = await supabaseClient.auth.updateUser({
      password: trimmedPassword,
    });

    setPending(false);

    if (error) {
      setStatus("ready");
      setMessage(error.message || "Password belum berhasil diperbarui.");
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setStatus("success");
    setMessage("Password berhasil diperbarui. Silakan login kembali.");

    await supabaseClient.auth.signOut();
  };

  const isChecking = status === "checking";
  const isSuccess = status === "success";
  const isError = status === "error";
  const canSubmit = status === "ready" && !pending;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff5f5] px-4 py-8 md:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.18),transparent_34%),linear-gradient(135deg,#fffafa,#fff1f1,#ffffff)]" />

      <div className="absolute left-[-90px] top-24 h-72 w-72 rounded-full bg-red-200/40 blur-3xl" />
      <div className="absolute right-[-110px] bottom-14 h-80 w-80 rounded-full bg-red-300/30 blur-3xl" />
      <div className="absolute left-1/2 top-10 h-32 w-32 -translate-x-1/2 rounded-full bg-white/60 blur-2xl" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/80 bg-white/75 shadow-[0_35px_90px_rgba(127,29,29,0.18)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative order-2 px-5 py-8 md:px-10 md:py-10 lg:order-1 lg:px-12 lg:py-12">
            <div className="absolute left-8 top-8 hidden h-16 w-16 rounded-full bg-red-50 lg:block" />
            <div className="absolute bottom-8 right-8 hidden h-24 w-24 rounded-full border border-red-100 lg:block" />

            <div className="relative mx-auto flex min-h-[500px] w-full max-w-md flex-col justify-center">
              <div className="mb-6">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-red-600">
                  <FaShieldAlt />
                  Sistem Pengaduan Parkir
                </div>

                <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
                  Buat sandi baru
                </h1>

                <p className="text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                  Masukkan password baru untuk akun Anda. Gunakan password yang
                  mudah diingat namun tetap aman.
                </p>
              </div>

              {isChecking && (
                <div className="rounded-3xl border border-red-100 bg-red-50/70 px-5 py-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm">
                    <FaSpinner className="animate-spin" />
                  </div>

                  <h2 className="text-lg font-extrabold text-slate-950">
                    Memeriksa link reset
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                    Tunggu sebentar, sistem sedang memvalidasi link reset
                    password Anda.
                  </p>
                </div>
              )}

              {!isChecking && message && (
                <div
                  className={`mb-5 rounded-2xl px-4 py-3 text-sm font-semibold leading-relaxed ${
                    isSuccess
                      ? "border border-green-100 bg-green-50 text-green-700"
                      : "border border-red-100 bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              {status === "ready" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-extrabold text-slate-800">
                      Password Baru
                    </label>

                    <div className="relative">
                      <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />

                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pl-11 pr-12 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60"
                        placeholder="Masukkan password baru"
                        autoComplete="new-password"
                        disabled={pending}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={pending}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                        aria-label={
                          showPassword
                            ? "Sembunyikan password"
                            : "Tampilkan password"
                        }
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-extrabold text-slate-800">
                      Konfirmasi Password
                    </label>

                    <div className="relative">
                      <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />

                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pl-11 pr-12 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60"
                        placeholder="Ulangi password baru"
                        autoComplete="new-password"
                        disabled={pending}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                        disabled={pending}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                        aria-label={
                          showConfirmPassword
                            ? "Sembunyikan konfirmasi password"
                            : "Tampilkan konfirmasi password"
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <p className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs font-semibold leading-relaxed text-amber-700">
                    Password minimal 6 karakter. Setelah berhasil diperbarui,
                    Anda perlu login kembali menggunakan password baru.
                  </p>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_18px_38px_rgba(220,38,38,0.30)] transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {pending ? "Menyimpan..." : "Simpan Password Baru"}

                    {!pending && (
                      <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              )}

              {isSuccess && (
                <div className="rounded-3xl border border-green-100 bg-green-50 px-5 py-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-600 shadow-sm">
                    <FaCheckCircle />
                  </div>

                  <h2 className="text-lg font-extrabold text-slate-950">
                    Password berhasil diperbarui
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                    Silakan masuk kembali menggunakan password baru yang sudah
                    Anda buat.
                  </p>
                </div>
              )}

              {isError && (
                <div className="rounded-3xl border border-red-100 bg-red-50/70 px-5 py-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm">
                    <FaLock />
                  </div>

                  <h2 className="text-lg font-extrabold text-slate-950">
                    Link tidak valid
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                    Silakan kembali ke halaman login, lalu minta link reset
                    password yang baru.
                  </p>
                </div>
              )}

              {!isChecking && (
                <Link
                  href="/login"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 !no-underline transition hover:bg-red-50"
                >
                  <FaArrowLeft className="text-xs" />
                  Kembali ke Login
                </Link>
              )}
            </div>
          </section>

          <aside className="relative order-1 overflow-hidden bg-red-600 px-6 py-10 text-white md:px-10 lg:order-2 lg:px-12 lg:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.26),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(127,29,29,0.35),transparent_38%),linear-gradient(135deg,#ef4444,#dc2626,#991b1b)]" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute right-8 top-1/2 h-28 w-28 rounded-full border border-white/15" />
            <div className="absolute left-10 top-24 h-16 w-16 rounded-full bg-white/10" />

            <div className="relative z-10 flex h-full min-h-[360px] flex-col">
              <div>
                <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 ring-1 ring-white/20 backdrop-blur">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-red-600">
                    <FaCarSide className="text-[12px]" />
                  </div>

                  <p className="whitespace-nowrap text-xs font-extrabold uppercase tracking-wide text-white">
                    Sistem Pengaduan Parkir Liar
                  </p>
                </div>

                <h2 className="mb-3 max-w-none text-3xl font-extrabold leading-[1.08] !text-white md:text-4xl lg:text-[54px]">
                  <span className="block whitespace-nowrap !text-white">
                    Atur ulang
                  </span>
                  <span className="block whitespace-nowrap !text-white">
                    sandi Anda.
                  </span>
                </h2>

                <p className="max-w-md text-sm font-semibold leading-relaxed text-white md:text-base">
                  Gunakan password baru untuk masuk kembali dan melanjutkan
                  pengiriman laporan parkir liar.
                </p>
              </div>

              <div className="flex flex-1 items-start justify-center pt-4 md:pt-5 lg:pt-6">
                <div className="relative w-full max-w-[430px]">
                  <div className="absolute inset-x-8 bottom-2 h-20 rounded-full bg-black/20 blur-2xl" />

                  <div className="relative rounded-[32px] bg-white/12 p-4 ring-1 ring-white/20 backdrop-blur">
                    <Image
                      src="/image/Asset 1jukir 1.png"
                      alt="Ilustrasi Parkir"
                      width={1200}
                      height={1200}
                      className="mx-auto max-h-[285px] w-full object-contain drop-shadow-[0_24px_35px_rgba(0,0,0,0.28)] md:max-h-[300px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}