import { updateStatusLaporan } from "../actions";

type Status = "Menunggu" | "Diproses" | "Selesai";

export default function UpdateStatusSelect({
  id,
  status,
}: {
  id: number;
  status: Status;
}) {
  return (
    <form action={updateStatusLaporan} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />

      <select
        name="status"
        defaultValue={status}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
      >
        <option value="Menunggu">Menunggu</option>
        <option value="Diproses">Diproses</option>
        <option value="Selesai">Selesai</option>
      </select>

      <button
        type="submit"
        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
      >
        Simpan
      </button>
    </form>
  );
}