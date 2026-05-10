import Link from "next/link";
import StatusBadge from "./StatusBadge";
import UpdateStatusSelect from "./UpdateStatusSelect";

type Laporan = {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  foto: string;
  status: "Menunggu" | "Diproses" | "Selesai";
  created_at: string;
};

export default function AdminReportTable({ laporan }: { laporan: Laporan[] }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <h3 className="text-lg font-extrabold text-slate-900">
          Data Laporan Masuk
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Ubah status laporan sesuai proses penanganan.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left text-sm text-slate-500">
              <th className="px-6 py-4 font-bold">Foto</th>
              <th className="px-6 py-4 font-bold">Pelapor</th>
              <th className="px-6 py-4 font-bold">Lokasi</th>
              <th className="px-6 py-4 font-bold">Tanggal</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Ubah Status</th>
              <th className="px-6 py-4 font-bold">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {laporan.map((item) => (
              <tr key={item.id} className="text-sm transition hover:bg-slate-50/70">
                <td className="px-6 py-4">
                  <img
                    src={item.foto}
                    alt={item.lokasi}
                    className="h-16 w-24 rounded-2xl object-cover"
                  />
                </td>

                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{item.nama}</p>
                  <p className="mt-1 text-xs text-slate-500">ID #{item.id}</p>
                </td>

                <td className="max-w-[320px] px-6 py-4">
                  <p className="line-clamp-2 font-semibold text-slate-700">
                    {item.lokasi}
                  </p>
                </td>

                <td className="px-6 py-4 text-slate-500">
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={item.status} />
                </td>

                <td className="px-6 py-4">
                  <UpdateStatusSelect id={item.id} status={item.status} />
                </td>

                <td className="px-6 py-4">
                  <Link
                    href={`/laporan/${item.id}`}
                    className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 no-underline transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}

            {laporan.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-16 text-center text-sm text-slate-500"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                    <i className="fa-regular fa-folder-open text-2xl"></i>
                  </div>

                  Belum ada laporan yang sesuai dengan filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}