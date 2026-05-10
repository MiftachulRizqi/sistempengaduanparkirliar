type AdminFilterBarProps = {
  search: string;
  status: string;
};

export default function AdminFilterBar({ search, status }: AdminFilterBarProps) {
  return (
    <form
      method="GET"
      className="mb-6 grid gap-3 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-[1fr_220px_auto]"
    >
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Cari nama pelapor atau lokasi..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
        />
      </div>

      <div className="relative">
        <select
          name="status"
          defaultValue={status}
          className="
            w-full appearance-none rounded-2xl
            border border-slate-200 bg-slate-50
            px-4 py-3 pr-12
            text-sm font-bold text-slate-700
            outline-none transition
            focus:border-red-500
            focus:ring-4 focus:ring-red-100
          "
        >
          <option value="">Semua Status</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Diproses">Diproses</option>
          <option value="Selesai">Selesai</option>
        </select>

        <i
          className="
            fa-solid fa-chevron-down
            pointer-events-none
            absolute right-4 top-1/2
            -translate-y-1/2
            text-sm text-slate-500
          "
        ></i>
      </div>
      
      <button
        type="submit"
        className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
      >
        Filter
      </button>
    </form>
  );
}