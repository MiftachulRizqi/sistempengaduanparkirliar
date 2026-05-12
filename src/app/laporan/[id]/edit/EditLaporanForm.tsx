"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import type { LatLngExpression } from "leaflet";
import { updateLaporanAction } from "./actions";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
});

type Props = {
  laporan: {
    id: number | string;
    nama: string;
    lokasi: string;
    deskripsi: string;
    foto: string | null;
    status: string;
    latitude?: number | null;
    longitude?: number | null;
  };
  backHref: string;
};

export default function EditLaporanForm({ laporan, backHref }: Props) {
  const [lokasi, setLokasi] = useState(laporan.lokasi || "");
  const [loadingMap, setLoadingMap] = useState(false);

  const [position, setPosition] = useState<LatLngExpression>([
    laporan.latitude ?? -7.2575,
    laporan.longitude ?? 112.7521,
  ]);

  const selectedLat = Array.isArray(position) ? position[0] : position.lat;
  const selectedLng = Array.isArray(position) ? position[1] : position.lng;

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100";

  const handleSearchLocation = async () => {
    if (!lokasi.trim()) return;

    try {
      setLoadingMap(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          lokasi
        )}&format=json`
      );

      const data = await res.json();

      if (data.length > 0) {
        setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } finally {
      setLoadingMap(false);
    }
  };

  const handleSelectMap = async (lat: number, lon: number) => {
    try {
      setLoadingMap(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );

      const data = await res.json();

      setLokasi(data.display_name || lokasi);
      setPosition([lat, lon]);
    } finally {
      setLoadingMap(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.3fr]">
      <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
        <div className="relative">
          <img
            src={laporan.foto || "/image/default.png"}
            alt={laporan.lokasi}
            className="h-72 w-full object-cover"
          />

          <span className="absolute left-4 top-4 rounded-full bg-yellow-100 px-4 py-1.5 text-xs font-extrabold text-yellow-600">
            {laporan.status}
          </span>
        </div>

        <div className="p-6">
          <h2 className="mb-2 text-xl font-extrabold text-slate-900">
            Foto Saat Ini
          </h2>

          <p className="text-sm leading-relaxed text-slate-500">
            Upload foto baru hanya jika ingin mengganti bukti laporan.
          </p>
        </div>
      </div>

      <form
        action={updateLaporanAction}
        className="rounded-[32px] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-8"
      >
        <input type="hidden" name="id" value={laporan.id} />
        <input type="hidden" name="back" value={backHref} />
        <input type="hidden" name="latitude" value={selectedLat} />
        <input type="hidden" name="longitude" value={selectedLng} />

        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Form Edit Laporan
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Pilih titik map untuk memperbarui lokasi kejadian.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Nama Pelapor
            </label>
            <input
              name="nama"
              defaultValue={laporan.nama}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Lokasi Kejadian
            </label>
            <input
              name="lokasi"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className={inputClass}
            />

            <button
              type="button"
              onClick={handleSearchLocation}
              disabled={loadingMap}
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-red-600 bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
            >
              {loadingMap ? "Mencari Lokasi..." : "Cari Lokasi di Map"}
            </button>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100">
              <MapPicker position={position} onSelect={handleSelectMap} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Deskripsi Laporan
            </label>
            <textarea
              name="deskripsi"
              defaultValue={laporan.deskripsi}
              rows={6}
              className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Ganti Foto Bukti
            </label>

            <input
              type="file"
              name="foto"
              accept="image/*"
              className="w-full cursor-pointer rounded-2xl border border-dashed border-red-200 bg-red-50/50 p-4 text-sm font-semibold text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-red-600 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-white hover:file:bg-red-700"
            />

            <p className="mt-2 text-xs font-semibold text-slate-500">
              Kosongkan jika tidak ingin mengganti foto. Maksimal 5 MB.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Link
            href={`/laporan/${laporan.id}?back=${encodeURIComponent(
              backHref
            )}`}
            className="inline-flex w-full items-center justify-center rounded-xl border border-red-600 px-5 py-3 text-sm font-bold text-red-600 !no-underline transition hover:bg-red-600 hover:text-white sm:w-auto"
          >
            Batal
          </Link>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(220,38,38,0.28)] transition hover:bg-red-700 sm:w-auto"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}