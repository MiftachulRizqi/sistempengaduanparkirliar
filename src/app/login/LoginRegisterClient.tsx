"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import {
  FaCarSide,
  FaCheckCircle,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { loginAction, registerAction } from "./actions";
import { initialAuthActionState } from "./authTypes";

type LoginRegisterClientProps = {
  next: string;
  initialMode: "login" | "register";
};

export default function LoginRegisterClient({
  next,
  initialMode,
}: LoginRegisterClientProps) {
  const [isRegister, setIsRegister] = useState(initialMode === "register");

  const [loginState, loginFormAction, loginPending] = useActionState(
    loginAction,
    initialAuthActionState
  );

  const [registerState, registerFormAction, registerPending] = useActionState(
    registerAction,
    initialAuthActionState
  );

  const isPending = loginPending || registerPending;

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", isRegister ? "register" : "login");

    if (!url.searchParams.get("next")) {
      url.searchParams.set("next", next);
    }

    window.history.replaceState(null, "", url.toString());
  }, [isRegister, next]);

  const activeError = useMemo(() => {
    if (isRegister && registerState.status === "error") {
      return registerState.message;
    }

    if (!isRegister && loginState.status === "error") {
      return loginState.message;
    }

    return "";
  }, [isRegister, loginState, registerState]);

  const inputClass =
    "w-full rounded-2xl border border-red-100 bg-white/90 px-4 py-3 text-sm font-semibold text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-60";

  const errorClass = "mt-2 text-sm font-semibold text-red-600";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff7f7] px-4 py-10 md:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.18),transparent_36%),linear-gradient(135deg,#fffafa,#fff1f1,#ffffff)]" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-red-200/40 blur-3xl" />
      <div className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-red-300/30 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="relative grid min-h-[650px] w-full max-w-5xl overflow-hidden rounded-[38px] border border-white bg-white/70 shadow-[0_30px_80px_rgba(220,38,38,0.16)] backdrop-blur-xl md:grid-cols-2">
          <section
            className={`relative flex items-center justify-center px-6 py-10 transition-transform duration-500 ease-in-out md:px-12 ${
              isRegister ? "md:translate-x-full" : "md:translate-x-0"
            }`}
          >
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-600 shadow-[0_16px_35px_rgba(220,38,38,0.16)] ring-1 ring-red-100">
                  {isRegister ? (
                    <FaUserPlus className="text-3xl" />
                  ) : (
                    <FaLock className="text-3xl" />
                  )}
                </div>

                <h1 className="mb-3 text-3xl font-extrabold text-red-600 md:text-4xl">
                  {isRegister ? "Daftar Akun" : "Masuk Akun"}
                </h1>

                <p className="mx-auto max-w-sm text-sm font-medium leading-relaxed text-gray-500">
                  {isRegister
                    ? "Buat akun terlebih dahulu agar kamu bisa mengirim laporan parkir liar."
                    : "Masuk untuk melanjutkan pengaduan dan mengakses fitur laporan."}
                </p>
              </div>

              <div className="relative min-h-[360px] overflow-hidden">
                <form
                  action={loginFormAction}
                  className={`absolute inset-0 space-y-4 transition-all duration-500 ease-in-out ${
                    isRegister
                      ? "-translate-x-10 opacity-0 pointer-events-none"
                      : "translate-x-0 opacity-100"
                  }`}
                >
                  <input type="hidden" name="next" value={next} />

                  <div>
                    <div className="relative">
                      <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                      <input
                        className={`${inputClass} pl-11`}
                        type="email"
                        name="email"
                        placeholder="Masukkan email"
                        autoComplete="email"
                        disabled={isPending}
                      />
                    </div>

                    {loginState.fieldErrors?.email && (
                      <p className={errorClass}>
                        {loginState.fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                      <input
                        className={`${inputClass} pl-11`}
                        type="password"
                        name="password"
                        placeholder="Masukkan password"
                        autoComplete="current-password"
                        disabled={isPending}
                      />
                    </div>

                    {loginState.fieldErrors?.password && (
                      <p className={errorClass}>
                        {loginState.fieldErrors.password}
                      </p>
                    )}
                  </div>

                  {activeError && !isRegister && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                      {activeError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-2xl bg-red-600 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_18px_36px_rgba(220,38,38,0.28)] transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loginPending ? "Memproses..." : "Masuk"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className="w-full rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 md:hidden"
                  >
                    Belum punya akun? Daftar
                  </button>
                </form>

                <form
                  action={registerFormAction}
                  className={`absolute inset-0 space-y-4 transition-all duration-500 ease-in-out ${
                    isRegister
                      ? "translate-x-0 opacity-100"
                      : "translate-x-10 opacity-0 pointer-events-none"
                  }`}
                >
                  <input type="hidden" name="next" value={next} />

                  <div>
                    <div className="relative">
                      <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                      <input
                        className={`${inputClass} pl-11`}
                        name="nama"
                        placeholder="Masukkan nama lengkap"
                        autoComplete="name"
                        disabled={isPending}
                      />
                    </div>

                    {registerState.fieldErrors?.nama && (
                      <p className={errorClass}>
                        {registerState.fieldErrors.nama}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                      <input
                        className={`${inputClass} pl-11`}
                        type="email"
                        name="email"
                        placeholder="Masukkan email"
                        autoComplete="email"
                        disabled={isPending}
                      />
                    </div>

                    {registerState.fieldErrors?.email && (
                      <p className={errorClass}>
                        {registerState.fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                      <input
                        className={`${inputClass} pl-11`}
                        type="password"
                        name="password"
                        placeholder="Buat password"
                        autoComplete="new-password"
                        disabled={isPending}
                      />
                    </div>

                    {registerState.fieldErrors?.password && (
                      <p className={errorClass}>
                        {registerState.fieldErrors.password}
                      </p>
                    )}
                  </div>

                  {activeError && isRegister && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                      {activeError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-2xl bg-red-600 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_18px_36px_rgba(220,38,38,0.28)] transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {registerPending ? "Mendaftarkan..." : "Daftar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className="w-full rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 md:hidden"
                  >
                    Sudah punya akun? Masuk
                  </button>
                </form>
              </div>
            </div>
          </section>

          <aside
            className={`relative flex items-center justify-center overflow-hidden bg-red-600 px-8 py-12 text-white transition-transform duration-500 ease-in-out md:absolute md:inset-y-0 md:right-0 md:z-20 md:w-1/2 ${
              isRegister ? "md:-translate-x-full" : "md:translate-x-0"
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_34%),linear-gradient(135deg,rgba(239,68,68,0.94),rgba(185,28,28,0.95))]" />
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="relative z-10 max-w-sm text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/15 text-white ring-1 ring-white/25">
                <FaCarSide className="text-4xl" />
              </div>

              <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
                {isRegister ? "Selamat Datang Kembali!" : "Halo, Warga Peduli!"}
              </h2>

              <p className="mb-8 text-sm font-semibold leading-relaxed text-white/85 md:text-base">
                {isRegister
                  ? "Sudah punya akun? Masuk kembali dan lanjutkan pelaporan parkir liar."
                  : "Belum punya akun? Daftar sekarang agar bisa mengirim laporan dengan mudah."}
              </p>

              <div className="mb-8 grid gap-3 text-left">
                <div className="flex items-center gap-3 rounded-2xl bg-white/12 px-4 py-3 backdrop-blur">
                  <FaCheckCircle className="shrink-0 text-white" />
                  <span className="text-sm font-semibold text-white">
                    Laporan lebih mudah dipantau
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/12 px-4 py-3 backdrop-blur">
                  <FaMapMarkerAlt className="shrink-0 text-white" />
                  <span className="text-sm font-semibold text-white">
                    Lokasi kejadian lebih akurat
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsRegister((prev) => !prev)}
                className="hidden rounded-2xl border-2 border-white px-12 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-white hover:text-red-600 md:inline-flex"
              >
                {isRegister ? "Masuk" : "Daftar"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}