import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseServer";

type Laporan = {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  foto: string;
  status: string;
  created_at?: string;
};

export default async function DetailLaporan({
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
    return (
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-3xl font-extrabold text-gray-900">
            Laporan tidak ditemukan
          </h1>

          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white !no-underline transition-colors duration-300 hover:bg-red-700 hover:text-white"
          >
            Kembali ke Services
          </Link>
        </div>
      </section>
    );
  }

  const laporan = data as Laporan;

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
            {/* IMAGE */}
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

            {/* CONTENT */}
            <div className="p-6 md:p-8">
              <span className="mb-3 inline-block text-sm font-semibold text-red-600">
                Detail Laporan Parkir
              </span>

              <h1 className="mb-6 text-2xl font-extrabold text-gray-900 md:text-3xl">
                {laporan.lokasi}
              </h1>

              {/* INFO GRID */}
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
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
                    Status Laporan
                  </span>
                  <strong className="text-base text-gray-900">
                    {laporan.status}
                  </strong>
                </div>
              </div>

              {/* DESKRIPSI */}
              <div className="mb-8">
                <span className="mb-2 block text-sm font-semibold text-gray-700">
                  Deskripsi Laporan
                </span>
                <p className="text-sm leading-relaxed text-gray-500">
                  {laporan.deskripsi}
                </p>
              </div>

              {/* ACTION */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                <Link
                  href="/services"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-red-600 px-5 py-2.5 text-sm font-semibold text-red-600 !no-underline transition-colors duration-300 hover:bg-red-600 hover:text-white hover:!no-underline sm:w-auto"
                >
                  Kembali
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white !no-underline shadow-[0_14px_30px_rgba(220,38,38,0.28)] transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline sm:w-auto sm:ml-auto"
                >
                  Buat Laporan Baru
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}