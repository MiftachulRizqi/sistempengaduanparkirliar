"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import StatusBadge from "./StatusBadge";
import UpdateStatusSelect from "./UpdateStatusSelect";
import { deleteLaporan } from "../actions";
import Image from "next/image";

type Laporan = {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  foto: string | null;
  status: "Menunggu" | "Diproses" | "Selesai";
  created_at: string;
};

type AdminReportTableProps = {
  laporan: Laporan[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  search?: string;
  status?: string;
};

type ResultAlert = {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
};

const INITIAL_RESULT_ALERT: ResultAlert = {
  open: false,
  type: "success",
  title: "",
  message: "",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getPaginationHref(page: number, search?: string, status?: string) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (status) params.set("status", status);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();

  return query ? `/admin?${query}` : "/admin";
}

function ConfirmDeleteAlert({
  laporan,
  isPending,
  onCancel,
  onConfirm,
}: {
  laporan: Laporan;
  isPending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(8,28,24,0.58)] px-6 backdrop-blur-[10px]">
      <div className="relative w-full max-w-[430px] overflow-hidden rounded-[28px] border border-[rgba(24,83,72,0.14)] bg-gradient-to-b from-white to-[#f8fdfb] px-8 pb-8 pt-9 text-center shadow-[0_32px_80px_rgba(4,22,18,0.28),0_10px_28px_rgba(4,22,18,0.16)] animate-[scaleIn_0.28s_ease]">
        <div className="pointer-events-none absolute -top-[90px] left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-red-500 opacity-20 blur-sm" />

        <div className="relative z-10 mx-auto mb-[18px] flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-gradient-to-br from-red-600 to-red-400 text-white shadow-[0_16px_30px_rgba(220,38,38,0.24)]">
          <i className="fa-solid fa-trash text-[30px]"></i>
        </div>

        <h3 className="relative z-10 mb-2 text-[22px] font-extrabold tracking-[-0.02em] text-[#17332e]">
          Hapus laporan?
        </h3>

        <p className="relative z-10 mx-auto max-w-[340px] text-[14.5px] leading-[1.65] text-[#58726c]">
          Pastikan data ini benar-benar ingin dihapus. Laporan akan hilang dari
          halaman admin dan halaman user.
        </p>

        <div className="relative z-10 mt-5 rounded-2xl border border-red-100 bg-red-50/70 px-4 py-3 text-left">
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-red-500">
            Lokasi laporan
          </p>

          <p className="line-clamp-2 text-sm font-extrabold text-[#17332e]">
            {laporan.lokasi}
          </p>

          <p className="mt-1 text-xs font-semibold text-[#58726c]">
            Pelapor: {laporan.nama || "User"}
          </p>
        </div>

        <div className="relative z-10 mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-extrabold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(220,38,38,0.25)] transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultFloatingAlert({
  alert,
  onClose,
}: {
  alert: ResultAlert;
  onClose: () => void;
}) {
  if (!alert.open) return null;

  const isSuccess = alert.type === "success";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(8,28,24,0.58)] px-6 backdrop-blur-[10px]"
      role="status"
      aria-live="polite"
    >
      <div className="relative w-full max-w-[430px] overflow-hidden rounded-[28px] border border-[rgba(24,83,72,0.14)] bg-gradient-to-b from-white to-[#f8fdfb] px-8 pb-8 pt-9 text-center shadow-[0_32px_80px_rgba(4,22,18,0.28),0_10px_28px_rgba(4,22,18,0.16)] animate-[scaleIn_0.28s_ease]">
        <div
          className={`pointer-events-none absolute -top-[90px] left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full opacity-20 blur-sm ${
            isSuccess ? "bg-emerald-600" : "bg-red-500"
          }`}
        />

        <div
          className={`relative z-10 mx-auto mb-[18px] flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-gradient-to-br text-white shadow-[0_16px_30px_rgba(15,94,75,0.22)] ${
            isSuccess
              ? "from-emerald-700 to-emerald-400"
              : "from-red-600 to-red-400"
          }`}
        >
          <span className="text-[38px] font-extrabold leading-none">
            {isSuccess ? "✓" : "!"}
          </span>
        </div>

        <h3 className="relative z-10 mb-2 text-[22px] font-extrabold tracking-[-0.02em] text-[#17332e]">
          {alert.title}
        </h3>

        <p className="relative z-10 mx-auto max-w-[340px] text-[14.5px] leading-[1.65] text-[#58726c]">
          {alert.message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className={`relative z-10 mt-6 w-full rounded-2xl px-5 py-3 text-sm font-extrabold text-white shadow-lg transition ${
            isSuccess
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}

export default function AdminReportTable({
  laporan,
  totalItems,
  currentPage,
  totalPages,
  search = "",
  status = "",
}: AdminReportTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Laporan | null>(null);
  const [resultAlert, setResultAlert] =
    useState<ResultAlert>(INITIAL_RESULT_ALERT);

  const rows = useMemo(() => {
    return laporan.filter((item) => !deletedIds.includes(item.id));
  }, [laporan, deletedIds]);

  const ITEMS_PER_PAGE = 5;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    const target = deleteTarget;
    const formData = new FormData();

    formData.set("id", String(target.id));

    startTransition(async () => {
      const result = await deleteLaporan(formData);

      if (result.success) {
        setDeletedIds((prev) => [...prev, target.id]);
        setDeleteTarget(null);

        setResultAlert({
          open: true,
          type: "success",
          title: "Laporan terhapus",
          message: result.message,
        });

        router.refresh();
        return;
      }

      setDeleteTarget(null);

      setResultAlert({
        open: true,
        type: "error",
        title: "Gagal menghapus",
        message: result.message,
      });
    });
  };

  return (
    <>
      {deleteTarget && (
        <ConfirmDeleteAlert
          laporan={deleteTarget}
          isPending={isPending}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <ResultFloatingAlert
        alert={resultAlert}
        onClose={() => setResultAlert(INITIAL_RESULT_ALERT)}
      />

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Data Laporan Masuk
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Ubah status laporan sesuai proses penanganan.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500">
            Menampilkan {startItem}-{endItem} dari {totalItems} laporan
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] table-fixed border-collapse">
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-slate-500">
                <th className="w-[10%] py-4 pl-5 pr-2 font-bold">Foto</th>
                <th className="w-[14%] px-2 py-4 font-bold">Pelapor</th>
                <th className="w-[19%] px-2 py-4 font-bold">Lokasi</th>
                <th className="w-[11%] px-2 py-4 font-bold">Tanggal</th>
                <th className="w-[10%] px-2 py-4 font-bold">Status</th>
                <th className="w-[23%] px-2 py-4 font-bold">Ubah Status</th>
                <th className="w-[13%] py-4 pl-2 pr-5 font-bold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {rows.map((item) => (
                <tr
                  key={item.id}
                  className="text-sm transition hover:bg-slate-50/70"
                >
                  <td className="py-4 pl-5 pr-2">
                    <Image
                      src={item.foto || "/image/default.png"}
                      alt={item.lokasi}
                      width={80}
                      height={56}
                      className="h-14 w-20 rounded-2xl object-cover"
                    />
                  </td>

                  <td className="px-2 py-4">
                    <p className="truncate font-bold text-slate-900">
                      {item.nama || "User"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">ID #{item.id}</p>
                  </td>

                  <td className="px-2 py-4">
                    <p className="line-clamp-2 text-xs font-semibold leading-relaxed text-slate-700">
                      {item.lokasi}
                    </p>
                  </td>

                  <td className="px-2 py-4 text-xs font-medium text-slate-500">
                    {formatDate(item.created_at)}
                  </td>

                  <td className="px-2 py-4">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-2 py-4">
                    <UpdateStatusSelect id={item.id} status={item.status} />
                  </td>

                  <td className="py-4 pl-2 pr-5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/laporan/${item.id}`}
                        className="
                          inline-flex h-9 items-center justify-center rounded-xl border border-slate-200
                          px-3 text-xs font-bold text-slate-700 no-underline transition
                          hover:border-red-600 hover:bg-red-600 hover:text-white hover:no-underline
                        "
                      >
                        Detail
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        disabled={isPending}
                        title="Hapus laporan"
                        aria-label="Hapus laporan"
                        className="
                          inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200
                          bg-white text-xs text-red-600 transition
                          hover:border-red-600 hover:bg-red-600 hover:text-white
                          disabled:cursor-not-allowed disabled:opacity-60
                        "
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {rows.length === 0 && (
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

        {totalPages > 1 && (
          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-slate-500">
              Halaman {currentPage} dari {totalPages}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={getPaginationHref(
                  Math.max(currentPage - 1, 1),
                  search,
                  status
                )}
                aria-disabled={currentPage === 1}
                className={`inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-bold no-underline transition ${
                  currentPage === 1
                    ? "pointer-events-none bg-slate-100 text-slate-400"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-red-600 hover:text-white hover:no-underline hover:ring-red-600"
                }`}
              >
                Sebelumnya
              </Link>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;

                return (
                  <Link
                    key={page}
                    href={getPaginationHref(page, search, status)}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold no-underline transition ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-red-600 hover:text-white hover:no-underline hover:ring-red-600"
                    }`}
                  >
                    {page}
                  </Link>
                );
              })}

              <Link
                href={getPaginationHref(
                  Math.min(currentPage + 1, totalPages),
                  search,
                  status
                )}
                aria-disabled={currentPage === totalPages}
                className={`inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-bold no-underline transition ${
                  currentPage === totalPages
                    ? "pointer-events-none bg-slate-100 text-slate-400"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-red-600 hover:text-white hover:no-underline hover:ring-red-600"
                }`}
              >
                Berikutnya
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}