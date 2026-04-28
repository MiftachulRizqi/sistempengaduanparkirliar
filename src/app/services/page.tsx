export const dynamic = "force-dynamic";
export const revalidate = 0;

import MapLaporanClient from "@/components/MapLaporanClient";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseServer";

type Laporan = {
  id: string;
  lokasi: string;
  deskripsi: string;
  foto: string | null;
  status: "Menunggu" | "Diproses" | "Selesai";
  created_at: string;
};

export default async function Services() {
  const { data: laporan, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
  }

  const dataLaporan: Laporan[] = laporan || [];

  const totalLaporan = dataLaporan.length;
  const totalMenunggu = dataLaporan.filter(
    (item) => item.status === "Menunggu"
  ).length;
  const totalDiproses = dataLaporan.filter(
    (item) => item.status === "Diproses"
  ).length;
  const totalSelesai = dataLaporan.filter(
    (item) => item.status === "Selesai"
  ).length;

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h1 className="fw-bold mb-2">Layanan Kami</h1>
        <p className="text-muted mb-5">
          Fitur lengkap untuk memudahkan pelaporan parkir liar
        </p>

        {/* FITUR */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 h-100 icon-box">
              <img
                src="/image/MAPS.png"
                className="mx-auto mb-3"
                width="80"
                alt="Maps"
              />
              <h5 className="fw-semibold">Lokasi Akurat</h5>
              <p className="text-muted small">
                Tentukan lokasi pelanggaran dengan pin map yang akurat.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 h-100 icon-box">
              <img
                src="/image/KAMERA.png"
                className="mx-auto mb-3"
                width="80"
                alt="Kamera"
              />
              <h5 className="fw-semibold">Upload Foto</h5>
              <p className="text-muted small">
                Lampirkan bukti foto kejadian di lokasi.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 h-100 icon-box">
              <img
                src="/image/PANTAU STATUS.png"
                className="mx-auto mb-3"
                width="80"
                alt="Status"
              />
              <h5 className="fw-semibold">Pantau Status</h5>
              <p className="text-muted small">
                Lihat perkembangan status laporan secara real-time.
              </p>
            </div>
          </div>
        </div>

        {/* CARA KERJA */}
        <h2 className="fw-bold mb-4">Cara Kerja</h2>

        <div className="row g-4 mb-5">
          {[
            [
              "1",
              "/image/NOTE.png",
              "Isi Laporan",
              "Tentukan lokasi dan detail pelanggaran parkir liar.",
            ],
            [
              "2",
              "/image/VERIFIKASI.png",
              "Proses Verifikasi",
              "Laporan diverifikasi oleh petugas terkait.",
            ],
            [
              "3",
              "/image/TINDAK LANJUT.png",
              "Tindak Lanjut",
              "Kami tindak lanjuti laporan hingga selesai.",
            ],
          ].map((item) => (
            <div className="col-md-4" key={item[0]}>
              <div className="card border-0 shadow-sm p-4 h-100 text-center icon-box">
                <span
                  className="badge bg-danger rounded-circle mb-3"
                  style={{ width: "35px", height: "35px" }}
                >
                  {item[0]}
                </span>

                <img
                  src={item[1]}
                  className="mx-auto mb-3"
                  width="70"
                  alt={item[2]}
                />

                <h6 className="fw-semibold">{item[2]}</h6>
                <p className="text-muted small">{item[3]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MAP */}
        <div className="card border-0 shadow-sm p-4 mb-5">
          <h5 className="fw-bold mb-3">Peta Laporan Parkir</h5>

          {dataLaporan.length === 0 ? (
            <p className="text-muted">Belum ada laporan</p>
          ) : (
            <MapLaporanClient data={dataLaporan} />
          )}
        </div>

        {/* DATA LAPORAN PREMIUM */}
        <div className="report-premium-wrapper">
          <div className="report-hero-panel">
            <div className="report-hero-left">
              <div className="report-main-icon">
                <i className="fa-regular fa-clipboard"></i>
              </div>

              <div>
                <span className="report-live-badge">
                  <span></span> LIVE DATA
                </span>

                <h5>
                  Data <strong>Laporan Parkir</strong>
                </h5>

                <p>
                  Pantau laporan parkir liar yang telah dikirim oleh masyarakat
                  secara real-time dan transparan.
                </p>

                <div className="report-red-line"></div>
              </div>
            </div>

            <div className="report-total-glass">
              <div className="report-total-icon">
                <i className="fa-solid fa-chart-pie"></i>
              </div>

              <div>
                <span>Total Laporan</span>
                <strong>{totalLaporan}</strong>
                <p>
                  <i className="fa-solid fa-arrow-trend-up"></i>
                  Update terbaru
                </p>
              </div>
            </div>
          </div>

          {/* MINI DASHBOARD */}
          <div className="report-mini-dashboard">
            <div className="report-stat-item">
              <div className="report-stat-icon red">
                <i className="fa-regular fa-clipboard"></i>
              </div>
              <div>
                <strong>{totalLaporan}</strong>
                <span>Total Laporan</span>
              </div>
            </div>

            <div className="report-stat-item">
              <div className="report-stat-icon yellow">
                <i className="fa-regular fa-clock"></i>
              </div>
              <div>
                <strong>{totalMenunggu}</strong>
                <span>Menunggu</span>
              </div>
            </div>

            <div className="report-stat-item">
              <div className="report-stat-icon blue">
                <i className="fa-solid fa-hourglass-half"></i>
              </div>
              <div>
                <strong>{totalDiproses}</strong>
                <span>Diproses</span>
              </div>
            </div>

            <div className="report-stat-item">
              <div className="report-stat-icon green">
                <i className="fa-regular fa-circle-check"></i>
              </div>
              <div>
                <strong>{totalSelesai}</strong>
                <span>Selesai</span>
              </div>
            </div>
          </div>

          {/* CARD LAPORAN */}
          <div className="row g-4">
            {dataLaporan.map((item) => (
              <div className="col-md-4" key={item.id}>
                <div className="report-premium-card h-100">
                  <img
                    src={item.foto || "/image/default.png"}
                    alt={item.lokasi}
                  />

                  <div className="report-premium-body">
                    <h6>
                      <i className="fa-solid fa-location-dot"></i>
                      {item.lokasi}
                    </h6>

                    <p>{item.deskripsi}</p>

                    <span className="report-status-pill">{item.status}</span>

                    <Link
                      href={`/laporan/${item.id}`}
                      className="report-premium-btn"
                    >
                      Lihat Detail <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {dataLaporan.length === 0 && (
              <div className="col-12">
                <p className="text-muted mb-0">Belum ada data laporan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}