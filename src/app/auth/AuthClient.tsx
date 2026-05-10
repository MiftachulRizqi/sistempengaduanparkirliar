"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCarSide,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { supabaseClient } from "@/lib/supabaseClient";
import { daftarAction } from "./actions";

type Props = {
  initialMode: "login" | "daftar";
};

export default function AuthClient({ initialMode }: Props) {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(initialMode === "daftar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputClass =
    "h-[54px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100";

  const buttonClass =
    "h-[54px] w-full rounded-2xl bg-red-600 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage("Email atau password salah.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  const switchMode = (mode: "login" | "daftar") => {
    setIsRegister(mode === "daftar");
    setErrorMessage("");
    router.replace(mode === "daftar" ? "/daftar" : "/login");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-14">
      <div className="mx-auto grid min-h-[680px] max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-[0_28px_70px_rgba(15,23,42,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex items-center justify-center px-6 py-10 md:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                {isRegister ? (
                  <FaUserPlus className="text-2xl" />
                ) : (
                  <FaLock className="text-2xl" />
                )}
              </div>

              <p className="text-sm font-bold text-red-600">
                {isRegister ? "Daftar Akun" : "Login Akun"}
              </p>

              <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
                {isRegister ? "Mulai buat laporan" : "Selamat datang kembali"}
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {isRegister
                  ? "Buat akun agar laporan parkir liar dapat tersimpan dan dipantau dengan lebih rapi."
                  : "Masuk untuk mengirim laporan dan melihat perkembangan pengaduan parkir liar."}
              </p>
            </div>

            {!isRegister ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className={`${inputClass} pl-11`}
                    type="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className={`${inputClass} pl-11`}
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                {errorMessage && (
                  <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                    {errorMessage}
                  </div>
                )}

                <button type="submit" disabled={loading} className={buttonClass}>
                  {loading ? "Memproses..." : "Masuk"}
                </button>
              </form>
            ) : (
              <form action={daftarAction} className="space-y-4">
                <div className="relative">
                  <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className={`${inputClass} pl-11`}
                    name="nama"
                    placeholder="Nama lengkap"
                  />
                </div>

                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className={`${inputClass} pl-11`}
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>

                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className={`${inputClass} pl-11`}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" className={buttonClass}>
                  Daftar
                </button>
              </form>
            )}

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-center text-sm font-semibold text-slate-600">
              {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
              <button
                type="button"
                onClick={() => switchMode(isRegister ? "login" : "daftar")}
                className="font-extrabold text-red-600 hover:text-red-700"
              >
                {isRegister ? "Masuk sekarang" : "Daftar sekarang"}
              </button>
            </div>
          </div>
        </section>

        <aside className="relative hidden overflow-hidden bg-red-600 p-10 text-white lg:block">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 ring-1 ring-white/20">
                <FaCarSide className="text-3xl" />
              </div>

              <h2 className="max-w-md text-4xl font-extrabold leading-tight text-white">
                Sistem Pengaduan Parkir Liar
              </h2>

              <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-white/80">
                Laporkan kejadian parkir liar dengan lokasi yang akurat,
                bukti foto, dan status laporan yang dapat dipantau.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl bg-white/12 p-5 backdrop-blur">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                  <FaShieldAlt />
                </div>
                <h3 className="font-extrabold text-white">Data lebih tertata</h3>
                <p className="mt-1 text-sm text-white/75">
                  Setiap laporan dapat dikaitkan dengan akun pengguna.
                </p>
              </div>

              <div className="rounded-3xl bg-white/12 p-5 backdrop-blur">
                <h3 className="font-extrabold text-white">Status transparan</h3>
                <p className="mt-1 text-sm text-white/75">
                  Pantau laporan dari Menunggu, Diproses, hingga Selesai.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}