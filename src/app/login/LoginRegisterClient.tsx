"use client";


import { useActionState, useEffect, useMemo, useState } from "react";
import {
  FaArrowRight,
  FaCarSide,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";
import { loginAction, registerAction } from "./actions";
import { initialAuthActionState } from "./authTypes";
import Image from "next/image";


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
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60";


  const errorClass = "mt-2 text-sm font-semibold text-red-600";


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


            <div className="relative mx-auto w-full max-w-md">
              <div className="mb-7">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-red-600">
                  <FaShieldAlt />
                  Sistem Pengaduan Parkir
                </div>


                <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
                  {isRegister ? "Buat akun baru" : "Masuk ke akun Anda"}
                </h1>


                <p className="text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                  {isRegister
                    ? "Daftar untuk mulai mengirim laporan parkir liar dengan lokasi dan bukti yang jelas."
                    : "Masuk untuk mengirim laporan, melihat riwayat, dan memantau status laporan Anda."}
                </p>
              </div>


              <div className="mb-7 grid grid-cols-2 rounded-2xl border border-red-100 bg-red-50/70 p-1.5">
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  disabled={isPending}
                  className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                    !isRegister
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-slate-500 hover:text-red-600"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  Masuk
                </button>


                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  disabled={isPending}
                  className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                    isRegister
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-slate-500 hover:text-red-600"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  Daftar
                </button>
              </div>


              <div className="relative min-h-[385px] overflow-hidden">
                <form
                  action={loginFormAction}
                  className={`absolute inset-0 flex flex-col gap-4 transition-all duration-500 ease-in-out ${
                    isRegister
                      ? "-translate-x-8 opacity-0 pointer-events-none"
                      : "translate-x-0 opacity-100"
                  }`}
                >
                  <input type="hidden" name="next" value={next} />


                  <div>
                    <label className="mb-2 block text-sm font-extrabold text-slate-800">
                      Email
                    </label>


                    <div className="relative">
                      <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                      <input
                        className={`${inputClass} pl-11`}
                        type="email"
                        name="email"
                        placeholder="contoh@email.com"
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
                    <label className="mb-2 block text-sm font-extrabold text-slate-800">
                      Password
                    </label>


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
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold leading-relaxed text-red-700">
                      {activeError}
                    </div>
                  )}


                  <div className="mt-9 space-y-3">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_18px_38px_rgba(220,38,38,0.30)] transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loginPending ? "Memproses..." : "Masuk"}
                      {!loginPending && (
                        <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                      )}
                    </button>


                    <p className="text-center text-sm font-semibold text-slate-500">
                      Belum punya akun?{" "}
                      <button
                        type="button"
                        onClick={() => setIsRegister(true)}
                        disabled={isPending}
                        className="font-extrabold text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Daftar sekarang
                      </button>
                    </p>
                  </div>
                </form>


                <form
                  action={registerFormAction}
                  className={`absolute inset-0 space-y-4 transition-all duration-500 ease-in-out ${
                    isRegister
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0 pointer-events-none"
                  }`}
                >
                  <input type="hidden" name="next" value={next} />


                  <div>
                    <label className="mb-2 block text-sm font-extrabold text-slate-800">
                      Nama Lengkap
                    </label>


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
                    <label className="mb-2 block text-sm font-extrabold text-slate-800">
                      Email
                    </label>


                    <div className="relative">
                      <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                      <input
                        className={`${inputClass} pl-11`}
                        type="email"
                        name="email"
                        placeholder="contoh@email.com"
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
                    <label className="mb-2 block text-sm font-extrabold text-slate-800">
                      Password
                    </label>


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
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold leading-relaxed text-red-700">
                      {activeError}
                    </div>
                  )}


                  <button
                    type="submit"
                    disabled={isPending}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_18px_38px_rgba(220,38,38,0.30)] transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {registerPending ? "Mendaftarkan..." : "Daftar"}
                    {!registerPending && (
                      <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                    )}
                  </button>


                  <p className="text-center text-sm font-semibold text-slate-500">
                    Sudah punya akun?{" "}
                    <button
                      type="button"
                      onClick={() => setIsRegister(false)}
                      disabled={isPending}
                      className="font-extrabold text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Masuk
                    </button>
                  </p>
                </form>
              </div>
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
                  {isRegister ? (
                    <span className="block !text-white">
                      Buat akun dan mulai laporkan.
                    </span>
                  ) : (
                    <>
                      <span className="block whitespace-nowrap !text-white">
                        Masuk dan
                      </span>
                      <span className="block whitespace-nowrap !text-white">
                        laporkan.
                      </span>
                    </>
                  )}
                </h2>


                <p className="max-w-md text-sm font-semibold leading-relaxed text-white md:text-base">
                  {isRegister
                    ? "Akun digunakan untuk menyimpan riwayat laporan dan memudahkan proses verifikasi."
                    : "Pantau laporan pribadi, cek status, dan bantu wujudkan jalan yang lebih tertib."}
                </p>
              </div>


              <div
                className={`flex flex-1 items-start justify-center ${
                  isRegister
                    ? "pt-7 md:pt-8 lg:pt-10"
                    : "pt-4 md:pt-5 lg:pt-6"
                }`}
              >
                <div className="relative w-full max-w-[430px]">
                  <div className="absolute inset-x-8 bottom-2 h-20 rounded-full bg-black/20 blur-2xl" />


                  <div className="relative rounded-[32px] bg-white/12 p-4 ring-1 ring-white/20 backdrop-blur">
                    <Image
                      src="/image/Asset 1jukir 1.png"
                      alt="Ilustrasi Parkir"
                      width={1200}
                      height={1200}
                      className={`mx-auto w-full object-contain drop-shadow-[0_24px_35px_rgba(0,0,0,0.28)] ${
                        isRegister
                          ? "max-h-[335px]"
                          : "max-h-[285px] md:max-h-[300px]"
                      }`}
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

