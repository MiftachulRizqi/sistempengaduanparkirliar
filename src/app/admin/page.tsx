import { supabaseAdmin } from "@/lib/supabaseServer";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import StatCard from "./components/StatCard";
import AdminFilterBar from "./components/AdminFilterBar";
import AdminReportTable from "./components/AdminReportTable";

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

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;

  const search = params.search || "";
  const status = params.status || "";

  const { data, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error.message);
  }

  const allData = (data || []) as Laporan[];

  const laporan = allData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status ? item.status === status : true;

    return matchSearch && matchStatus;
  });

  const total = allData.length;
  const menunggu = allData.filter((item) => item.status === "Menunggu").length;
  const diproses = allData.filter((item) => item.status === "Diproses").length;
  const selesai = allData.filter((item) => item.status === "Selesai").length;

  const statusConfig =
    status === "Menunggu"
      ? {
          label: "Laporan Menunggu",
          description:
            "Daftar laporan yang masuk dan belum masuk ke tahap penanganan.",
          badge: "Menunggu",
          icon: "fa-regular fa-clock",
          bg: "bg-yellow-50",
          text: "text-yellow-600",
          accent: "bg-yellow-500",
        }
      : status === "Diproses"
      ? {
          label: "Laporan Diproses",
          description:
            "Daftar laporan yang sedang dalam proses pengecekan dan penanganan.",
          badge: "Diproses",
          icon: "fa-solid fa-spinner",
          bg: "bg-blue-50",
          text: "text-blue-600",
          accent: "bg-blue-600",
        }
      : status === "Selesai"
      ? {
          label: "Laporan Selesai",
          description:
            "Daftar laporan yang sudah selesai diproses oleh admin.",
          badge: "Selesai",
          icon: "fa-solid fa-circle-check",
          bg: "bg-green-50",
          text: "text-green-600",
          accent: "bg-green-600",
        }
      : {
          label: "Kelola Data Laporan",
          description:
            "Pantau laporan masyarakat dan ubah status penanganan laporan.",
          badge: "Semua Laporan",
          icon: "fa-solid fa-clipboard-list",
          bg: "bg-red-50",
          text: "text-red-600",
          accent: "bg-red-600",
        };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <AdminSidebar />

        <section className="w-full px-4 py-6 md:px-8 lg:px-10">
          <div className="mb-8 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative px-6 py-7">
              <div
                className={`absolute right-0 top-0 h-32 w-32 rounded-bl-full ${statusConfig.bg}`}
              ></div>

              <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <div
                    className={`mb-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${statusConfig.bg} ${statusConfig.text}`}
                  >
                    <i className={statusConfig.icon}></i>
                    {statusConfig.badge}
                  </div>

                  <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                    {statusConfig.label}
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    {statusConfig.description}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Data Ditampilkan
                  </p>
                  <h3 className={`mt-1 text-2xl font-extrabold ${statusConfig.text}`}>
                    {laporan.length}
                  </h3>
                </div>
              </div>
            </div>
          </div>

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

          <AdminFilterBar search={search} status={status} />

          <AdminReportTable laporan={laporan} />
        </section>
      </div>
    </main>
  );
}