"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteLaporanAction } from "./actions";

type DeleteLaporanButtonProps = {
  id: number | string;
  backHref: string;
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

function ConfirmDeleteAlert({
  isPending,
  onCancel,
  onConfirm,
}: {
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
          riwayat kamu dan tidak bisa dikembalikan.
        </p>

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

export default function DeleteLaporanButton({
  id,
  backHref,
}: DeleteLaporanButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [showConfirm, setShowConfirm] = useState(false);
  const [resultAlert, setResultAlert] =
    useState<ResultAlert>(INITIAL_RESULT_ALERT);

  const handleConfirmDelete = () => {
    startTransition(async () => {
      const result = await deleteLaporanAction(id);

      if (!result.success) {
        setShowConfirm(false);

        setResultAlert({
          open: true,
          type: "error",
          title: "Gagal menghapus",
          message: result.message,
        });

        return;
      }

      setShowConfirm(false);

      setResultAlert({
        open: true,
        type: "success",
        title: "Laporan terhapus",
        message: result.message,
      });
    });
  };

  const handleCloseResult = () => {
    const isSuccess = resultAlert.type === "success";

    setResultAlert(INITIAL_RESULT_ALERT);

    if (isSuccess) {
      router.replace(backHref || "/services#riwayat-laporan");
      router.refresh();
    }
  };

  return (
    <>
      {showConfirm && (
        <ConfirmDeleteAlert
          isPending={isPending}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <ResultFloatingAlert alert={resultAlert} onClose={handleCloseResult} />

      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-lg border border-red-200 px-5 py-2.5 text-sm font-bold text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        Hapus Laporan
      </button>
    </>
  );
}