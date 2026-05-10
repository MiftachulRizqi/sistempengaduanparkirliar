import { supabaseAdmin } from "@/lib/supabaseServer";
import AdminSidebar from "../components/AdminSidebar";
import MapLaporanClient from "@/components/MapLaporanClient";

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

export default async function AdminPetaLaporanPage() {
  const { data, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error.message);
  }

  const laporan = (data || []) as Laporan[];

  const menunggu = laporan.filter((item) => item.status === "Menunggu").length;
  const diproses = laporan.filter((item) => item.status === "Diproses").length;
  const selesai = laporan.filter((item) => item.status === "Selesai").length;

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
                  Monitoring Peta
                </p>

                <h1 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">
                  Peta Laporan Parkir
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                  Pantau sebaran lokasi laporan parkir liar yang masuk ke sistem.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                Total Titik
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-red-600">
                {laporan.length}
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                <i className="fa-regular fa-clock"></i>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                Menunggu
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-yellow-600">
                {menunggu}
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <i className="fa-solid fa-spinner"></i>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                Diproses
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-blue-600">
                {diproses}
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                Selesai
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-green-600">
                {selesai}
              </h2>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h3 className="text-lg font-extrabold text-slate-900">
                Sebaran Lokasi Laporan
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Marker menunjukkan titik laporan berdasarkan lokasi yang dikirim masyarakat.
              </p>
            </div>

            <div className="p-5">
              {laporan.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
                  Belum ada laporan untuk ditampilkan pada peta.
                </div>
              ) : (
                <div className="overflow-hidden rounded-3xl border border-slate-100">
                  <MapLaporanClient data={laporan} />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}