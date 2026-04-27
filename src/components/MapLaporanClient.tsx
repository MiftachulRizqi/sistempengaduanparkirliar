"use client";

import dynamic from "next/dynamic";

const MapLaporanClient = dynamic(() => import("@/components/MapLaporan"), {
  ssr: false,
});

export default MapLaporanClient;