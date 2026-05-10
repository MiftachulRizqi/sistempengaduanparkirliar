import Link from "next/link";

export default function AdminTopbar() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-white bg-white px-6 py-5 shadow-sm md:flex-row md:items-center">
      <div>
        <p className="text-sm font-semibold text-red-600">
          Dashboard Admin
        </p>

        <h2 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">
          Kelola Data Laporan
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Pantau laporan masyarakat dan ubah status penanganan laporan.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
          <i className="fa-regular fa-calendar me-2"></i>
          {today}
        </div>

        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white no-underline shadow-lg shadow-red-200 transition hover:bg-red-700 hover:text-white"
        >
          Lihat Website
        </Link>
      </div>
    </div>
  );
}