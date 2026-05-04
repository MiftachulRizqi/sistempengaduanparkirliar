"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  disabled?: boolean;
};

export default function SubmitButton({ disabled = false }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const isDisabled = pending || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="
        mt-2 inline-flex w-full items-center justify-center gap-2
        !rounded-xl bg-gradient-to-r from-red-600 to-red-500
        px-6 py-3 text-sm font-bold text-white
        shadow-[0_12px_24px_rgba(220,38,38,0.28)]
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(220,38,38,0.35)]
        active:scale-[0.98]
        disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0
      "
    >
      {pending && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}

      <span>{pending ? "Mengirim Laporan..." : "Kirim Laporan"}</span>
    </button>
  );
}
