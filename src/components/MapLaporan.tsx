"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";

export default function MapLaporan({ data }: any) {

  const router = useRouter();

  const getLatLng = (index: number) => ({
    lat: -7.25 + index * 0.01,
    lng: 112.75 + index * 0.01
  });

  return (
    <MapContainer
      center={[-7.25, 112.75]}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((item: any, index: number) => {
        const pos = getLatLng(index);

        return (
          <Marker key={item.id} position={[pos.lat, pos.lng]}>
            <Popup>
              <b>{item.nama}</b><br />
              {item.lokasi}<br />

              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => router.push(`/laporan/${item.id}`)}
              >
                Lihat Detail
              </button>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}