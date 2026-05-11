import { supabaseAdmin } from "@/lib/supabaseServer";
import AdminSidebar from "../components/AdminSidebar";


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

export default async function AdminPelaporPage() {
  const { data, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error.message);
  }

  const laporan = (data || []) as Laporan[];

  const pelaporMap = new Map<string, Laporan[]>();

  laporan.forEach((item) => {
    if (!pelaporMap.has(item.nama)) {
      pelaporMap.set(item.nama, []);
    }

    pelaporMap.get(item.nama)?.push(item);
  });

  const pelapor = Array.from(pelaporMap.entries()).map(([nama, data]) => ({
    nama,
    total: data.length,
    terakhir: data[0]?.created_at,
    statusTerakhir: data[0]?.status,
    lokasiTerakhir: data[0]?.lokasi,
  }));

  const menunggu = laporan.filter((item) => item.status === "Menunggu").length;
  const diproses = laporan.filter((item) => item.status === "Diproses").length;
  const selesai = laporan.filter((item) => item.status === "Selesai").length;

  const statusDominan =
    menunggu >= diproses && menunggu >= selesai
      ? "Menunggu"
      : diproses >= selesai
      ? "Diproses"
      : "Selesai";

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
                  Manajemen Data
                </p>

                <h1 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">
                  Data Pelapor
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                  Ringkasan pelapor yang pernah mengirim laporan parkir liar ke sistem.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <i className="fa-solid fa-users"></i>
              </div>

              <p className="text-sm font-semibold text-slate-500">
                Total Pelapor
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-red-600">
                {pelapor.length}
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <i className="fa-solid fa-file-lines"></i>
              </div>

              <p className="text-sm font-semibold text-slate-500">
                Total Laporan
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-blue-600">
                {laporan.length}
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                <i className="fa-solid fa-chart-simple"></i>
              </div>

              <p className="text-sm font-semibold text-slate-500">
                Status Dominan
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-yellow-600">
                {laporan.length === 0 ? "-" : statusDominan}
              </h2>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
              <h3 className="text-lg font-extrabold text-slate-900">
                Daftar Pelapor
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Data dikelompokkan berdasarkan nama pelapor.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-left text-sm text-slate-500">
                    <th className="px-6 py-4 font-bold">Pelapor</th>
                    <th className="px-6 py-4 font-bold">Total Laporan</th>
                    <th className="px-6 py-4 font-bold">Lokasi Terakhir</th>
                    <th className="px-6 py-4 font-bold">Tanggal Terakhir</th>
                    <th className="px-6 py-4 font-bold">Status Terakhir</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {pelapor.map((item) => (
                    <tr key={item.nama} className="text-sm transition hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-sm font-extrabold text-red-600">
                            {item.nama.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-extrabold text-slate-900">
                              {item.nama}
                            </p>
                            <p className="text-xs text-slate-500">
                              Pelapor masyarakat
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                          {item.total} laporan
                        </span>
                      </td>

                      <td className="max-w-[280px] px-6 py-4">
                        <p className="truncate font-semibold text-slate-600">
                          {item.lokasiTerakhir || "-"}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.terakhir
                          ? new Date(item.terakhir).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            item.statusTerakhir === "Selesai"
                              ? "bg-green-50 text-green-600"
                              : item.statusTerakhir === "Diproses"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-yellow-50 text-yellow-600"
                          }`}
                        >
                          {item.statusTerakhir || "Menunggu"}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {pelapor.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-14 text-center text-sm text-slate-500"
                      >
                        Belum ada data pelapor.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}