export const dynamic = "force-dynamic";
export const revalidate = 0;

import MapLaporanClient from "@/components/MapLaporanClient";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseServer";

export default async function Services() {
  const { data: laporan, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .order("created_at", { ascending: false });

  const dataLaporan = laporan || [];

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h1 className="fw-bold mb-2">Layanan Kami</h1>
        <p className="text-muted mb-5">
          Fitur lengkap untuk memudahkan pelaporan parkir liar
        </p>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 h-100 icon-box">
              <img src="/image/MAPS.png" className="mx-auto mb-3" width="80" alt="Maps" />
              <h5 className="fw-semibold">Lokasi Akurat</h5>
              <p className="text-muted small">
                Tentukan lokasi pelanggaran dengan pin map yang akurat.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 h-100 icon-box">
              <img src="/image/KAMERA.png" className="mx-auto mb-3" width="80" alt="Kamera" />
              <h5 className="fw-semibold">Upload Foto</h5>
              <p className="text-muted small">
                Lampirkan bukti foto kejadian di lokasi.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 h-100 icon-box">
              <img src="/image/PANTAU STATUS.png" className="mx-auto mb-3" width="80" alt="Status" />
              <h5 className="fw-semibold">Pantau Status</h5>
              <p className="text-muted small">
                Lihat perkembangan status laporan secara real-time.
              </p>
            </div>
          </div>
        </div>

        <h2 className="fw-bold mb-4">Cara Kerja</h2>

        <div className="row g-4 mb-5">
          {[
            ["1", "/image/NOTE.png", "Isi Laporan", "Tentukan lokasi dan detail pelanggaran parkir liar."],
            ["2", "/image/VERIFIKASI.png", "Proses Verifikasi", "Laporan diverifikasi oleh petugas terkait."],
            ["3", "/image/TINDAK LANJUT.png", "Tindak Lanjut", "Kami tindak lanjuti laporan hingga selesai."],
          ].map((item) => (
            <div className="col-md-4" key={item[0]}>
              <div className="card border-0 shadow-sm p-4 h-100 text-center icon-box">
                <span
                  className="badge bg-danger rounded-circle mb-3"
                  style={{ width: "35px", height: "35px" }}
                >
                  {item[0]}
                </span>

                <img src={item[1]} className="mx-auto mb-3" width="70" alt={item[2]} />

                <h6 className="fw-semibold">{item[2]}</h6>
                <p className="text-muted small">{item[3]}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card border-0 shadow-sm p-4 mb-5">
          <h5 className="fw-bold mb-3">Peta Laporan Parkir</h5>

          {dataLaporan.length === 0 ? (
            <p className="text-muted">Belum ada laporan</p>
          ) : (
            <MapLaporanClient data={dataLaporan} />
          )}
        </div>

        <div className="card border-0 shadow-sm p-4">
          <h5 className="fw-bold mb-3">Data Laporan</h5>

          <p className="text-muted">
            Total:{" "}
            <span className="fw-bold text-danger">{dataLaporan.length}</span>
          </p>

          <div className="row g-3 mt-3">
            {dataLaporan.map((item: any) => (
              <div className="col-md-4" key={item.id}>
                <div className="card h-100 border-0 shadow-sm p-3 text-start d-flex flex-column">
                  <img
                    src={item.foto}
                    className="img-fluid rounded mb-2"
                    style={{ height: "150px", objectFit: "cover" }}
                    alt={item.lokasi}
                  />

                  <h6 className="fw-semibold text-danger">{item.lokasi}</h6>

                  <p
                    className="text-muted small"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "40px",
                    }}
                  >
                    {item.deskripsi}
                  </p>

                  <div className="mt-auto">
                    <span className="badge bg-secondary mb-2 d-block">
                      {item.status}
                    </span>

                    <Link
                      href={`/laporan/${item.id}`}
                      className="btn btn-danger btn-sm w-100"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}