"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUserAccount } from "../actions";

type UserAccount = {
  id: number | string;
  nama?: string | null;
  name?: string | null;
  email?: string | null;
  username?: string | null;
  created_at?: string | null;
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

const USERS_PER_PAGE = 3;

function getUserName(user: UserAccount) {
  return user.nama || user.name || user.username || "User";
}

function formatDate(date?: string | null) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ConfirmDeleteUserAlert({
  user,
  isPending,
  onCancel,
  onConfirm,
}: {
  user: UserAccount;
  isPending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(8,28,24,0.58)] px-6 backdrop-blur-[10px]">
      <div className="relative w-full max-w-[430px] overflow-hidden rounded-[28px] border border-[rgba(24,83,72,0.14)] bg-gradient-to-b from-white to-[#f8fdfb] px-8 pb-8 pt-9 text-center shadow-[0_32px_80px_rgba(4,22,18,0.28),0_10px_28px_rgba(4,22,18,0.16)] animate-[scaleIn_0.28s_ease]">
        <div className="pointer-events-none absolute -top-[90px] left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-red-500 opacity-20 blur-sm" />

        <div className="relative z-10 mx-auto mb-[18px] flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-gradient-to-br from-red-600 to-red-400 text-white shadow-[0_16px_30px_rgba(220,38,38,0.24)]">
          <i className="fa-solid fa-user-xmark text-[30px]"></i>
        </div>

        <h3 className="relative z-10 mb-2 text-[22px] font-extrabold tracking-[-0.02em] text-[#17332e]">
          Hapus akun user?
        </h3>

        <p className="relative z-10 mx-auto max-w-[340px] text-[14.5px] leading-[1.65] text-[#58726c]">
          Akun ini akan dihapus dari database user. Pastikan data yang dipilih
          sudah benar.
        </p>

        <div className="relative z-10 mt-5 rounded-2xl border border-red-100 bg-red-50/70 px-4 py-3 text-left">
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-red-500">
            Akun user
          </p>

          <p className="line-clamp-1 text-sm font-extrabold text-[#17332e]">
            {getUserName(user)}
          </p>

          <p className="mt-1 break-all text-xs font-semibold text-[#58726c]">
            {user.email || "Email tidak tersedia"}
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

export default function AdminUsersTable({
  users,
}: {
  users: UserAccount[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [currentPage, setCurrentPage] = useState(1);
  const [deletedIds, setDeletedIds] = useState<Array<number | string>>([]);
  const [deleteTarget, setDeleteTarget] = useState<UserAccount | null>(null);
  const [resultAlert, setResultAlert] =
    useState<ResultAlert>(INITIAL_RESULT_ALERT);

  const rows = useMemo(() => {
    return users.filter((item) => !deletedIds.includes(item.id));
  }, [users, deletedIds]);

  const totalPages = Math.max(Math.ceil(rows.length / USERS_PER_PAGE), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedRows = rows.slice(startIndex, endIndex);

  const startItem = rows.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(endIndex, rows.length);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    const target = deleteTarget;
    const formData = new FormData();

    formData.set("id", String(target.id));
    formData.set("email", String(target.email || ""));

    startTransition(async () => {
      const result = await deleteUserAccount(formData);

      if (result.success) {
        setDeletedIds((prev) => [...prev, target.id]);
        setDeleteTarget(null);

        setResultAlert({
          open: true,
          type: "success",
          title: "Akun terhapus",
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

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <>
      {deleteTarget && (
        <ConfirmDeleteUserAlert
          user={deleteTarget}
          isPending={isPending}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <ResultFloatingAlert
        alert={resultAlert}
        onClose={() => setResultAlert(INITIAL_RESULT_ALERT)}
      />

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Daftar Akun User
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Admin dapat melihat dan menghapus akun user yang sudah mendaftar.
            </p>
          </div>

          <div className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-extrabold text-red-600">
            {rows.length} user
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr className="bg-slate-50 text-left text-sm text-slate-500">
                <th className="px-5 py-4 font-bold">User</th>
                <th className="px-5 py-4 font-bold">Email</th>
                <th className="px-5 py-4 font-bold">Tanggal Daftar</th>
                <th className="px-5 py-4 font-bold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedRows.map((item) => (
                <tr key={String(item.id)} className="text-sm hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-extrabold text-red-600">
                        {getUserName(item).charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-extrabold text-slate-900">
                          {getUserName(item)}
                        </p>
                        <p className="text-xs text-slate-500">
                          ID #{String(item.id)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="break-all font-semibold text-slate-700">
                      {item.email || "-"}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {formatDate(item.created_at)}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      disabled={isPending}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-white text-sm text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                      title="Hapus user"
                      aria-label="Hapus user"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedRows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-14 text-center text-sm text-slate-500"
                  >
                    Belum ada akun user yang terdaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {rows.length > USERS_PER_PAGE && (
          <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-slate-500">
              Menampilkan {startItem}-{endItem} dari {rows.length} user
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className={`inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-bold transition ${
                  safeCurrentPage === 1
                    ? "cursor-not-allowed bg-slate-100 text-slate-400"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-red-600 hover:text-white hover:ring-red-600"
                }`}
              >
                Sebelumnya
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = page === safeCurrentPage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-red-600 hover:text-white hover:ring-red-600"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => goToPage(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className={`inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-bold transition ${
                  safeCurrentPage === totalPages
                    ? "cursor-not-allowed bg-slate-100 text-slate-400"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-red-600 hover:text-white hover:ring-red-600"
                }`}
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}