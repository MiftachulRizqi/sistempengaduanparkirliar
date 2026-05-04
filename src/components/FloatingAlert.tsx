"use client";

type AlertType = "success" | "info" | "error";

interface FloatingAlertProps {
  open: boolean;
  type: AlertType;
  title: string;
  message: string;
}

export default function FloatingAlert({
  open,
  type,
  title,
  message,
}: FloatingAlertProps) {
  if (!open) return null;

  const variant = {
    info: {
      glow: "bg-teal-600",
      iconBox: "from-teal-700 to-teal-500",
      progress: "from-teal-700 to-teal-400",
      icon: null,
    },
    success: {
      glow: "bg-emerald-600",
      iconBox: "from-emerald-700 to-emerald-400",
      progress: "from-emerald-700 to-emerald-400",
      icon: "✓",
    },
    error: {
      glow: "bg-red-500",
      iconBox: "from-red-600 to-red-400",
      progress: "from-red-600 to-red-400",
      icon: "!",
    },
  }[type];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(8,28,24,0.58)] px-6 backdrop-blur-[10px]"
      role="status"
      aria-live="polite"
    >
      <div className="relative w-full max-w-[430px] overflow-hidden rounded-[28px] border border-[rgba(24,83,72,0.14)] bg-gradient-to-b from-white to-[#f8fdfb] px-8 pb-8 pt-9 text-center shadow-[0_32px_80px_rgba(4,22,18,0.28),0_10px_28px_rgba(4,22,18,0.16)] animate-[scaleIn_0.28s_ease]">
        <div
          className={`pointer-events-none absolute -top-[90px] left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full opacity-20 blur-sm ${variant.glow}`}
        />

        <div
          className={`relative z-10 mx-auto mb-[18px] flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-gradient-to-br ${variant.iconBox} text-white shadow-[0_16px_30px_rgba(15,94,75,0.22)]`}
        >
          {type === "info" ? (
            <span className="h-[34px] w-[34px] animate-spin rounded-full border-4 border-white/35 border-t-white" />
          ) : (
            <span className="text-[38px] font-extrabold leading-none">
              {variant.icon}
            </span>
          )}
        </div>

        <h3 className="relative z-10 mb-2 text-[22px] font-extrabold tracking-[-0.02em] text-[#17332e]">
          {title}
        </h3>

        <p className="relative z-10 mx-auto max-w-[340px] text-[14.5px] leading-[1.65] text-[#58726c]">
          {message}
        </p>

        {type === "info" && (
          <div className="relative z-10 mt-6 h-[7px] w-full overflow-hidden rounded-full bg-teal-700/10">
            <div
              className={`h-full w-full rounded-full bg-gradient-to-r ${variant.progress} opacity-70 animate-pulse`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
