"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { useRouter } from "next/navigation";

import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Laporan = {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  foto: string;

  status: "Menunggu" | "Diproses" | "Selesai";

  latitude?: number | null;
  longitude?: number | null;
};

type Props = {
  data: Laporan[];
};

export default function MapLaporan({
  data,
}: Props) {
  const router = useRouter();

  const validData = data.filter(
    (item) =>
      item.latitude !== null &&
      item.longitude !== null &&
      item.latitude !== undefined &&
      item.longitude !== undefined
  );

  return (
    <MapContainer
      center={[-7.2575, 112.7521]}
      zoom={12}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validData.map((item) => (
        <Marker
          key={item.id}
          position={[
            item.latitude as number,
            item.longitude as number,
          ]}
        >
          <Popup>
            <div className="min-w-[220px]">
              <img
                src={item.foto}
                alt={item.lokasi}
                className="mb-3 h-32 w-full rounded-lg object-cover"
              />

              <h3 className="text-sm font-bold">
                {item.nama}
              </h3>

              <p className="mb-2 text-xs text-gray-500">
                {item.lokasi}
              </p>

              <button
                className="mt-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700"
                onClick={() =>
                  router.push(`/laporan/${item.id}`)
                }
              >
                Lihat Detail
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}