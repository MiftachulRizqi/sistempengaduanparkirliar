"use client";

import Link from "next/link";
import Image from "next/image";

type LaporanSaya = {
  id: number | string;
  nama?: string | null;
  lokasi: string;
  deskripsi: string;
  foto: string | null;
  status: "Menunggu" | "Diproses" | "Selesai";
  created_at: string;
};

type Props = {
  laporan: LaporanSaya[];
};

function getStatusStyle(status: LaporanSaya["status"]) {
  if (status === "Selesai") return "bg-green-100 text-green-600";
  if (status === "Diproses") return "bg-blue-100 text-blue-600";
  return "bg-yellow-100 text-yellow-600";
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function UserReportHistory({ laporan }: Props) {
  if (laporan.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-red-600 shadow-sm">
          <i className="fa-regular fa-folder-open"></i>
        </div>

        <h4 className="mb-2 text-xl font-extrabold text-gray-900">
          Belum Ada Riwayat Laporan
        </h4>

        <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-gray-500">
          Kamu belum mengirim laporan menggunakan akun ini.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white !no-underline shadow-[0_14px_30px_rgba(220,38,38,0.28)] transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline"
        >
          Buat Laporan
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
        Total riwayat aktif: {laporan.length} laporan
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {laporan.map((item) => (
          <div
            key={item.id}
            className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white text-left shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.28)]"
          >
            <Image
              src={item.foto || "/image/default.png"}
              alt={item.lokasi}
              width={1200}
              height={800}
              className="h-44 w-full object-cover"
            />

            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>

                <span className="text-xs font-semibold text-gray-400">
                  {formatDate(item.created_at)}
                </span>
              </div>

              <h4 className="mb-2 line-clamp-2 text-base font-extrabold text-gray-900">
                {item.lokasi}
              </h4>

              <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-500">
                {item.deskripsi}
              </p>

              <div className="mt-auto">
                <Link
                  href={`/laporan/${item.id}?back=${encodeURIComponent(
                    "/services#riwayat-laporan"
                  )}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white !no-underline transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline"
                >
                  Lihat Detail
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}