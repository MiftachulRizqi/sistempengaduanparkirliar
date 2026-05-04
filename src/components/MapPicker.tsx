'use client'

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import { useState } from 'react'
import type { LatLngExpression, LeafletMouseEvent } from 'leaflet'

type Props = {
  position: LatLngExpression
  onSelect: (lat: number, lon: number) => void
}

// 📍 Marker + klik map
function LocationMarker({ onSelect }: Props) {
  const [pos, setPos] = useState<LatLngExpression | null>(null)

  useMapEvents({
    click(e: LeafletMouseEvent) {
      const { lat, lng } = e.latlng
      setPos([lat, lng])
      onSelect(lat, lng)
    },
  })

  return pos ? <Marker position={pos} /> : null
}

// 🔄 Auto pindah map kalau position berubah
function ChangeView({ position }: { position: LatLngExpression }) {
  const map = useMap()
  map.setView(position)
  return null
}

export default function MapPicker({ position, onSelect }: Props) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} />
      <LocationMarker position={position} onSelect={onSelect} />
      <ChangeView position={position} />
    </MapContainer>
  )
}