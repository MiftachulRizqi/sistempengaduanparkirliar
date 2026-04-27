"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Laporan = {
  id: number;
  lokasi: string;
  deskripsi: string;
  foto: string;
  status: string;
  lat: number;
  lng: number;
};

export default function MapComponent({ data }: { data: Laporan[] }) {
  return (
    <MapContainer
      center={[-7.2575, 112.7521]}
      zoom={12}
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((item) => (
        <Marker key={item.id} position={[item.lat, item.lng]}>
          <Popup>
            <strong>{item.lokasi}</strong>
            <br />
            {item.deskripsi}
            <br />
            <img
              src={item.foto}
              style={{ width: "100%", borderRadius: "8px", marginTop: "5px" }}
            />
            <br />
            <span className="text-danger">{item.status}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}