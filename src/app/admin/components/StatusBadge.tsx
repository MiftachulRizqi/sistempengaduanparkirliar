type Status = "Menunggu" | "Diproses" | "Selesai";

export default function StatusBadge({ status }: { status: Status }) {
  const style =
    status === "Selesai"
      ? "bg-green-50 text-green-600"
      : status === "Diproses"
      ? "bg-blue-50 text-blue-600"
      : "bg-yellow-50 text-yellow-600";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}