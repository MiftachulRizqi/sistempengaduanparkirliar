type StatCardProps = {
  title: string;
  value: number;
  icon: string;
  color: "red" | "yellow" | "blue" | "green";
};

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorStyle = {
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
  };

  const textStyle = {
    red: "text-red-600",
    yellow: "text-yellow-600",
    blue: "text-blue-600",
    green: "text-green-600",
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${colorStyle[color]}`}
      >
        <i className={icon}></i>
      </div>

      <p className="text-sm font-semibold text-slate-500">{title}</p>

      <h3 className={`mt-2 text-3xl font-extrabold ${textStyle[color]}`}>
        {value}
      </h3>
    </div>
  );
}