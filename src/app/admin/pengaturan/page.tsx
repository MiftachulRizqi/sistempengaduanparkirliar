import AdminSidebar from "../components/AdminSidebar";

export default function AdminPengaturanPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <AdminSidebar />

        <section className="w-full px-4 py-6 md:px-8 lg:px-10">
          <div className="mb-8 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative px-6 py-7">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-red-50"></div>

              <div className="relative">
                <p className="text-sm font-semibold text-red-600">
                  Sistem
                </p>

                <h1 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">
                  Pengaturan Admin
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                  Kelola informasi dasar dashboard dan preferensi sistem admin.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <i className="fa-solid fa-user-shield text-xl"></i>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Profil Admin
                  </h3>
                  <p className="text-sm text-slate-500">
                    Informasi akun pengelola sistem.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Nama Admin
                  </p>
                  <p className="mt-1 font-bold text-slate-800">
                    Administrator
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Role
                  </p>
                  <p className="mt-1 font-bold text-slate-800">
                    Super Admin
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Status
                  </p>
                  <p className="mt-1 font-bold text-green-600">
                    Aktif
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Informasi Sistem
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Ringkasan konfigurasi sistem pengaduan parkir liar.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <i className="fa-solid fa-database"></i>
                  </div>

                  <p className="text-sm font-bold text-slate-500">
                    Database
                  </p>
                  <h4 className="mt-1 font-extrabold text-slate-900">
                    Supabase
                  </h4>
                </div>

                <div className="rounded-2xl border border-slate-100 p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </div>

                  <p className="text-sm font-bold text-slate-500">
                    Storage
                  </p>
                  <h4 className="mt-1 font-extrabold text-slate-900">
                    Supabase Storage
                  </h4>
                </div>

                <div className="rounded-2xl border border-slate-100 p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <i className="fa-solid fa-server"></i>
                  </div>

                  <p className="text-sm font-bold text-slate-500">
                    Backend
                  </p>
                  <h4 className="mt-1 font-extrabold text-slate-900">
                    Server Actions
                  </h4>
                </div>

                <div className="rounded-2xl border border-slate-100 p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                    <i className="fa-solid fa-code"></i>
                  </div>

                  <p className="text-sm font-bold text-slate-500">
                    Framework
                  </p>
                  <h4 className="mt-1 font-extrabold text-slate-900">
                    Next.js + Tailwind
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900">
              Catatan Pengembangan
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
              Halaman pengaturan ini masih bersifat informatif. Pada tahap
              pengembangan berikutnya, halaman ini dapat dikembangkan untuk
              mengatur profil admin, konfigurasi website, hak akses, serta
              autentikasi admin.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}