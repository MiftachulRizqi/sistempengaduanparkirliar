import { supabaseAdmin } from "@/lib/supabaseServer";
import AdminSidebar from "../components/AdminSidebar";
import AdminUsersTable from "../components/AdminUsersTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type UserAccount = {
  id: number | string;
  nama?: string | null;
  name?: string | null;
  email?: string | null;
  username?: string | null;
  created_at?: string | null;
};

export default async function AdminPengaturanPage() {
  const { data, error } = await supabaseAdmin.from("users").select("*");

  if (error) {
    console.error("Supabase users error:", error.message);
  }

  const users = ((data || []) as UserAccount[])
    .filter((item) => item.email !== "admin@pengaduan.com")
    .sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;

      return dateB - dateA;
    });

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <AdminSidebar />

        <section className="w-full px-4 py-6 md:px-8 lg:px-10">
          <div className="mb-8 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative px-6 py-7">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-red-50"></div>

              <div className="relative">
                <p className="text-sm font-semibold text-red-600">Sistem</p>

                <h1 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">
                  Pengaturan Admin
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                  Kelola informasi admin dan akun user yang terdaftar pada
                  sistem.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.8fr_1.6fr]">
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
                    Email Admin
                  </p>
                  <p className="mt-1 break-all font-bold text-slate-800">
                    admin@pengaduan.com
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Role
                  </p>
                  <p className="mt-1 font-bold text-slate-800">Super Admin</p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Status
                  </p>
                  <p className="mt-1 font-bold text-green-600">Aktif</p>
                </div>
              </div>
            </div>

            <AdminUsersTable users={users} />
          </div>
        </section>
      </div>
    </main>
  );
}