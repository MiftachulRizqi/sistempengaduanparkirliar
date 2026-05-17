import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseServer";
import AdminSidebar from "../../components/AdminSidebar";
import StatusBadge from "../../components/StatusBadge";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Laporan = {
  id: number;
  nama: string;
  user_id?: string | null;
  lokasi: string;
  deskripsi: string;
  foto: string | null;
  status: "Menunggu" | "Diproses" | "Selesai";
  created_at: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminDetailLaporanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !data) {
    notFound();
  }

  const laporan = data as Laporan;

  let pelaporEmail = "Email belum tersedia";

  if (laporan.user_id) {
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email")
      .eq("id", laporan.user_id)
      .maybeSingle();

    pelaporEmail = profile?.email || "Email belum tersedia";
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <AdminSidebar />

        <section className="w-full px-4 py-6 md:px-8 lg:px-10">
          <div className="mb-8 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative px-6 py-7">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-red-50"></div>

              <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
                    <i className="fa-solid fa-file-lines"></i>
                    Detail Laporan
                  </div>

                  <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                    Detail Laporan Parkir
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    Lihat informasi lengkap laporan yang dikirim oleh pelapor.
                  </p>
                </div>

                <Link
                  href="/admin"
                  className="
                    inline-flex items-center justify-center rounded-2xl border border-slate-200
                    bg-white px-5 py-3 text-sm font-bold text-slate-700 no-underline
                    transition hover:border-red-600 hover:bg-red-600 hover:text-white hover:no-underline
                  "
                >
                  <i className="fa-solid fa-arrow-left mr-2"></i>
                  Kembali
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative">
              <Image
                src={laporan.foto || "/image/default.png"}
                alt={laporan.lokasi}
                width={1200}
                height={800}
                className="h-[260px] w-full object-cover md:h-[360px]"
              />

              <div className="absolute left-5 top-5">
                <StatusBadge status={laporan.status} />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6">
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-red-600">
                  Lokasi Kejadian
                </p>

                <h2 className="text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl">
                  {laporan.lokasi}
                </h2>
              </div>

              <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                    ID Laporan
                  </p>
                  <p className="text-base font-extrabold text-slate-900">
                    #{laporan.id}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Nama Pelapor
                  </p>
                  <p className="text-base font-extrabold text-slate-900">
                    {laporan.nama || "User"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Email Pelapor
                  </p>
                  <p className="break-all text-base font-extrabold text-slate-900">
                    {pelaporEmail}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Tanggal Laporan
                  </p>
                  <p className="text-base font-extrabold text-slate-900">
                    {formatDate(laporan.created_at)}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="mb-3 text-sm font-bold text-slate-900">
                  Deskripsi Laporan
                </p>

                <p className="text-sm leading-relaxed text-slate-500">
                  {laporan.deskripsi}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}