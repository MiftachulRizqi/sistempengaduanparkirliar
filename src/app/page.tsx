"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section
        id="hero"
        className="relative overflow-hidden bg-white px-4 pt-10 pb-16 md:px-6 md:pt-14 md:pb-20 lg:px-8"
      >
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-red-100/60 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gray-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Laporkan Parkir Liar
              <br />
              dengan{" "}
              <span className="text-red-600">
                Mudah & Cepat
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg">
              Bantu ciptakan jalan yang tertib dan nyaman untuk semua pengguna
              jalan.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white !no-underline shadow-[0_14px_30px_rgba(220,38,38,0.28)] transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline"
              >
                Laporkan Sekarang
              </Link>

              <Link
                href="/services"
                className="w-full inline-flex items-center justify-center rounded-lg border border-red-600 px-6 py-3 text-sm font-bold text-red-600 !no-underline transition-colors duration-300 hover:bg-red-600 hover:text-white hover:!no-underline"
              >
                Lihat Laporan
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src="/image/Asset 1jukir 1.png"
              alt="Ilustrasi Parkir"
              className="max-h-[420px] w-full max-w-[520px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.12)]"
            />
          </div>
        </div>
      </section>

      {/* KENAPA */}
      <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              Kenapa Harus Melapor?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 md:text-base">
              Setiap laporan membantu menciptakan lingkungan jalan yang lebih
              aman, tertib, dan nyaman.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_10px_30px_rgba(220,38,38,0.35)]">
              <img
                src="/image/MOBIL 1.png"
                alt="Mewujudkan Kota Tertib"
                className="mx-auto mb-5 h-28 w-auto object-contain"
              />
              <h5 className="text-lg font-bold text-gray-900">
                Mewujudkan Kota Tertib
              </h5>
            </div>

            <div className="rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_10px_30px_rgba(220,38,38,0.35)]">
              <img
                src="/image/ORANG JALAN 1.png"
                alt="Menjaga Kenyamanan"
                className="mx-auto mb-5 h-28 w-auto object-contain"
              />
              <h5 className="text-lg font-bold text-gray-900">
                Menjaga Kenyamanan
              </h5>
            </div>

            <div className="rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.35)]">
              <img
                src="/image/MONEY 1.png"
                alt="Mencegah Pungli"
                className="mx-auto mb-5 h-28 w-auto object-contain"
              />
              <h5 className="text-lg font-bold text-gray-900">
                Mencegah Pungli
              </h5>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}