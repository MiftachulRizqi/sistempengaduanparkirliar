import { cookies } from "next/headers";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseServer";
import DeleteLaporanButton from "./DeleteLaporanButton";

type Laporan = {
  id: number;
  nama: string;
  email?: string | null;
  lokasi: string;
  deskripsi: string;
  foto: string;
  status: string;
  created_at?: string;
  user_id?: string | null;
};

function getSafeBackHref(back?: string) {
  if (!back) return "/services";
  if (!back.startsWith("/")) return "/services";
  if (back.startsWith("//")) return "/services";

  return back;
}

async function getCurrentUserId() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth-token")?.value;
  const role = cookieStore.get("auth-role")?.value;
  const email = cookieStore.get("auth-email")?.value || "";

  if (token !== "logged-in" || role !== "user" || !email) {
    return null;
  }

  const { data } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  return data?.id || null;
}

export default async function DetailLaporan({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ back?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;

  const backHref = getSafeBackHref(query?.back);
  const backLabel = backHref === "/" ? "Kembali ke Home" : "Kembali";

  const currentUserId = await getCurrentUserId();

  const { data, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !data) {
    return (
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-3xl font-extrabold text-gray-900">
            Laporan tidak ditemukan
          </h1>

          <Link
            href={backHref}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white !no-underline transition-colors duration-300 hover:bg-red-700 hover:text-white"
          >
            {backLabel}
          </Link>
        </div>
      </section>
    );
  }

  const laporan = data as Laporan;

  const isOwner = !!currentUserId && laporan.user_id === currentUserId;
  const canModify = isOwner && laporan.status === "Menunggu";

  const statusStyle =
    laporan.status === "Selesai"
      ? "bg-green-100 text-green-600"
      : laporan.status === "Diproses"
      ? "bg-blue-100 text-blue-600"
      : "bg-yellow-100 text-yellow-600";

  return (
    <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
          <div>
            <div className="relative">
              <img
                src={laporan.foto}
                alt={laporan.lokasi}
                className="h-[280px] w-full object-cover md:h-[360px]"
              />

              <span
                className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-bold ${statusStyle}`}
              >
                {laporan.status}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <span className="mb-3 inline-block text-sm font-semibold text-red-600">
                Detail Laporan Parkir
              </span>

              <h1 className="mb-6 text-2xl font-extrabold text-gray-900 md:text-3xl">
                {laporan.lokasi}
              </h1>

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <span className="block text-sm text-gray-500">
                    Nama Pelapor
                  </span>
                  <strong className="text-base text-gray-900">
                    {laporan.nama}
                  </strong>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <span className="block text-sm text-gray-500">
                    Email Pelapor
                  </span>
                  <strong className="break-all text-base text-gray-900">
                    {laporan.email || "Email belum tersedia"}
                  </strong>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <span className="block text-sm text-gray-500">
                    Status Laporan
                  </span>
                  <strong className="text-base text-gray-900">
                    {laporan.status}
                  </strong>
                </div>
              </div>

              <div className="mb-8">
                <span className="mb-2 block text-sm font-semibold text-gray-700">
                  Deskripsi Laporan
                </span>
                <p className="text-sm leading-relaxed text-gray-500">
                  {laporan.deskripsi}
                </p>
              </div>

              {isOwner && laporan.status !== "Menunggu" && (
                <div className="mb-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-500">
                  Laporan sudah {laporan.status}, sehingga tidak bisa diedit
                  atau dihapus.
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href={backHref}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-red-600 px-5 py-2.5 text-sm font-semibold text-red-600 !no-underline transition-colors duration-300 hover:bg-red-600 hover:text-white hover:!no-underline sm:w-auto"
                >
                  {backLabel}
                </Link>

                <div className="flex flex-col gap-3 sm:ml-auto sm:flex-row">
                  {canModify && (
                    <>
                      <Link
                        href={`/laporan/${laporan.id}/edit?back=${encodeURIComponent(
                          backHref
                        )}`}
                        className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 !no-underline transition hover:border-red-600 hover:bg-red-600 hover:text-white hover:!no-underline sm:w-auto"
                      >
                        Edit Laporan
                      </Link>

                      <DeleteLaporanButton id={laporan.id} backHref={backHref} />
                    </>
                  )}

                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white !no-underline shadow-[0_14px_30px_rgba(220,38,38,0.28)] transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline sm:w-auto"
                  >
                    Buat Laporan Baru
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}