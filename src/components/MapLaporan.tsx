"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type LaporanMapItem = {
  id: number | string;
  nama?: string | null;
  lokasi?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
};

type MapLaporanProps = {
  data: LaporanMapItem[];
};

const markerIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function isValidCoordinate(lat: number, lng: number) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

export default function MapLaporan({ data }: MapLaporanProps) {
  const router = useRouter();

  const validMarkers = useMemo(() => {
    return data
      .map((item) => {
        const lat = Number(item.latitude);
        const lng = Number(item.longitude);

        return {
          ...item,
          lat,
          lng,
        };
      })
      .filter((item) => isValidCoordinate(item.lat, item.lng));
  }, [data]);

  const center: [number, number] =
    validMarkers.length > 0
      ? [validMarkers[0].lat, validMarkers[0].lng]
      : [-7.2575, 112.7521];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validMarkers.map((item) => {
        const namaPelapor = item.nama || "Pelapor";
        const lokasiLaporan = item.lokasi || "Lokasi belum tersedia";

        return (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={markerIcon}
          >
            <Popup>
              <div className="min-w-[180px]">
                <b>{namaPelapor}</b>
                <br />
                <span>{lokasiLaporan}</span>
                <br />

                <button
                  className="mt-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white"
                  type="button"
                  onClick={() => router.push(`/laporan/${item.id}`)}
                >
                  Lihat Detail
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}