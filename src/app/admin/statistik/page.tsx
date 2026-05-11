import { supabaseAdmin } from "@/lib/supabaseServer";
import AdminSidebar from "../components/AdminSidebar";
import StatCard from "../components/StatCard";


export const dynamic = "force-dynamic";
export const revalidate = 0;

type Laporan = {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  foto: string;
  status: "Menunggu" | "Diproses" | "Selesai";
  created_at: string;
};

export default async function AdminStatistikPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
  }>;
}) {
  const params = await searchParams;
  const statusFilter = params.status || "Semua";

  const { data, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error.message);
  }

  const laporan = (data || []) as Laporan[];

  const total = laporan.length;

  const menunggu = laporan.filter(
    (item) => item.status === "Menunggu"
  ).length;

  const diproses = laporan.filter(
    (item) => item.status === "Diproses"
  ).length;

  const selesai = laporan.filter(
    (item) => item.status === "Selesai"
  ).length;

  const laporanTerbaru =
    statusFilter === "Semua"
      ? laporan
      : laporan.filter((item) => item.status === statusFilter);

  const persen = (value: number) =>
    total === 0 ? 0 : Math.round((value / total) * 100);

  const persenMenunggu = persen(menunggu);
  const persenDiproses = persen(diproses);
  const persenSelesai = persen(selesai);

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <AdminSidebar />

        <section className="w-full px-4 py-6 md:px-8 lg:px-10">
          {/* HEADER */}
          <div className="mb-8 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative px-6 py-7">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-red-50"></div>

              <div className="relative">
                <p className="text-sm font-semibold text-red-600">
                  Statistik Laporan
                </p>

                <h1 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">
                  Ringkasan Data Pengaduan
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                  Pantau performa laporan berdasarkan status penanganan secara
                  visual dan terstruktur.
                </p>
              </div>
            </div>
          </div>

          {/* STAT CARD */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Laporan"
              value={total}
              icon="fa-solid fa-clipboard-list"
              color="red"
            />

            <StatCard
              title="Menunggu"
              value={menunggu}
              icon="fa-regular fa-clock"
              color="yellow"
            />

            <StatCard
              title="Diproses"
              value={diproses}
              icon="fa-solid fa-spinner"
              color="blue"
            />

            <StatCard
              title="Selesai"
              value={selesai}
              icon="fa-solid fa-circle-check"
              color="green"
            />
          </div>

          {/* CHART */}
          <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
            {/* DONUT */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Diagram Status
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Persentase laporan berdasarkan status.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="relative flex h-56 w-56 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(
                      #f59e0b 0% ${persenMenunggu}%,
                      #2563eb ${persenMenunggu}% ${
                        persenMenunggu + persenDiproses
                      }%,
                      #16a34a ${persenMenunggu + persenDiproses}% 100%
                    )`,
                  }}
                >
                  <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                    <span className="text-sm font-semibold text-slate-500">
                      Total
                    </span>

                    <strong className="text-4xl font-extrabold text-slate-900">
                      {total}
                    </strong>
                  </div>
                </div>

                <div className="mt-8 grid w-full gap-3">
                  <div className="flex items-center justify-between rounded-2xl bg-yellow-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-yellow-500"></span>

                      <span className="text-sm font-bold text-slate-700">
                        Menunggu
                      </span>
                    </div>

                    <span className="text-sm font-extrabold text-yellow-600">
                      {persenMenunggu}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-blue-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-blue-600"></span>

                      <span className="text-sm font-bold text-slate-700">
                        Diproses
                      </span>
                    </div>

                    <span className="text-sm font-extrabold text-blue-600">
                      {persenDiproses}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-green-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-green-600"></span>

                      <span className="text-sm font-bold text-slate-700">
                        Selesai
                      </span>
                    </div>

                    <span className="text-sm font-extrabold text-green-600">
                      {persenSelesai}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* BAR CHART */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Grafik Distribusi Status
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Perbandingan jumlah laporan dari setiap status.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span className="text-slate-700">Menunggu</span>

                    <span className="text-yellow-600">
                      {menunggu} laporan
                    </span>
                  </div>

                  <div className="h-5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-yellow-500"
                      style={{ width: `${persenMenunggu}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span className="text-slate-700">Diproses</span>

                    <span className="text-blue-600">
                      {diproses} laporan
                    </span>
                  </div>

                  <div className="h-5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${persenDiproses}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span className="text-slate-700">Selesai</span>

                    <span className="text-green-600">
                      {selesai} laporan
                    </span>
                  </div>

                  <div className="h-5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-green-600"
                      style={{ width: `${persenSelesai}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* INSIGHT */}
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Dominan
                  </p>

                  <h4 className="mt-2 font-extrabold text-slate-900">
                    {menunggu >= diproses && menunggu >= selesai
                      ? "Menunggu"
                      : diproses >= selesai
                      ? "Diproses"
                      : "Selesai"}
                  </h4>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Penyelesaian
                  </p>

                  <h4 className="mt-2 font-extrabold text-green-600">
                    {persenSelesai}%
                  </h4>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Proses Aktif
                  </p>

                  <h4 className="mt-2 font-extrabold text-blue-600">
                    {diproses}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* LAPORAN TERBARU */}
          <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Laporan Terbaru
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Lima laporan terakhir yang masuk ke sistem.
                </p>
              </div>

              {/* FILTER */}
              <form method="GET" className="flex w-full gap-2 md:w-[380px]">
                <div className="relative w-full">
                    <select
                    name="status"
                    defaultValue={statusFilter}
                    className="
                        w-full appearance-none rounded-2xl
                        border border-slate-200 bg-slate-50
                        px-4 py-3 pr-12
                        text-sm font-bold text-slate-700
                        shadow-sm outline-none transition

                        hover:border-slate-300

                        focus:border-red-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-red-100
                    "
                    >
                    <option value="Semua">Semua Status</option>
                    <option value="Menunggu">Menunggu</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                    </select>

                    <i
                    className="
                        fa-solid fa-chevron-down
                        pointer-events-none
                        absolute right-4 top-1/2
                        -translate-y-1/2
                        text-sm text-slate-500
                    "
                    ></i>
                </div>

                <button
                    type="submit"
                    className="
                    rounded-2xl bg-red-600 px-6 py-3
                    text-sm font-bold text-white
                    transition hover:bg-red-700
                    "
                >
                    Terapkan
                </button>
            </form>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {laporanTerbaru.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="
                    flex items-center gap-4 rounded-2xl
                    border border-slate-100 bg-white p-4
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-red-100
                    hover:bg-red-50/30
                    hover:shadow-md
                  "
                >
                  <img
                    src={item.foto}
                    alt={item.lokasi}
                    className="h-16 w-24 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {item.nama}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {item.lokasi}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.status === "Selesai"
                        ? "bg-green-50 text-green-600"
                        : item.status === "Diproses"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}

              {laporanTerbaru.length === 0 && (
                <div
                  className="
                    rounded-2xl border border-dashed border-slate-200
                    p-8 text-center text-sm text-slate-500 lg:col-span-2
                  "
                >
                  Tidak ada laporan dengan status{" "}
                  <span className="font-bold text-slate-700">
                    {statusFilter}
                  </span>
                  .
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}