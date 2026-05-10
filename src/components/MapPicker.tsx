"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import type { LatLngExpression, LeafletMouseEvent } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  position: LatLngExpression;
  onSelect: (lat: number, lon: number) => void;
};

function LocationMarker({ position, onSelect }: Props) {
  const [pos, setPos] = useState<LatLngExpression>(position);

  const markerIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "/leaflet/marker-icon.png",
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        shadowUrl: "/leaflet/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    []
  );

  useEffect(() => {
    setPos(position);
  }, [position]);

  useMapEvents({
    click(e: LeafletMouseEvent) {
      const { lat, lng } = e.latlng;
      setPos([lat, lng]);
      onSelect(lat, lng);
    },
  });

  return <Marker position={pos} icon={markerIcon} />;
}

function ChangeView({ position }: { position: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
}

export default function MapPicker({ position, onSelect }: Props) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker position={position} onSelect={onSelect} />
      <ChangeView position={position} />
    </MapContainer>
  );
}