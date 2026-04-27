import MapLaporanClient from "@/components/MapLaporanClient";
import Link from "next/link";

export default async function Services() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/laporan/list`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data laporan");
  }

  const laporan = await res.json();

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">

        {/* TITLE */}
        <h1 className="fw-bold mb-2">Layanan Kami</h1>
        <p className="text-muted mb-5">
          Fitur lengkap untuk memudahkan pelaporan parkir liar
        </p>

        {/* FITUR */}
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
              <img
                src="/image/PANTAU STATUS.png"
                className="mx-auto mb-3"
                width="80"
                alt="Pantau Status"
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
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 h-100 text-center icon-box">
              <span
                className="badge bg-danger rounded-circle mb-3"
                style={{ width: "35px", height: "35px" }}
              >
                1
              </span>
              <img src="/image/NOTE.png" className="mx-auto mb-3" width="70" alt="Note" />
              <h6 className="fw-semibold">Isi Laporan</h6>
              <p className="text-muted small">
                Tentukan lokasi dan detail pelanggaran parkir liar.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 h-100 text-center icon-box">
              <span
                className="badge bg-danger rounded-circle mb-3"
                style={{ width: "35px", height: "35px" }}
              >
                2
              </span>
              <img
                src="/image/VERIFIKASI.png"
                className="mx-auto mb-3"
                width="70"
                alt="Verifikasi"
              />
              <h6 className="fw-semibold">Proses Verifikasi</h6>
              <p className="text-muted small">
                Laporan diverifikasi oleh petugas terkait.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 h-100 text-center icon-box">
              <span
                className="badge bg-danger rounded-circle mb-3"
                style={{ width: "35px", height: "35px" }}
              >
                3
              </span>
              <img
                src="/image/TINDAK LANJUT.png"
                className="mx-auto mb-3"
                width="70"
                alt="Tindak Lanjut"
              />
              <h6 className="fw-semibold">Tindak Lanjut</h6>
              <p className="text-muted small">
                Kami tindak lanjuti laporan hingga selesai.
              </p>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="card border-0 shadow-sm p-4 mb-5">
          <h5 className="fw-bold mb-3">Peta Laporan Parkir</h5>

          {laporan.length === 0 ? (
            <p className="text-muted">Belum ada laporan</p>
          ) : (
            <MapLaporanClient data={laporan} />
          )}
        </div>

        {/* DATA LAPORAN */}
        <div className="card border-0 shadow-sm p-4">
          <h5 className="fw-bold mb-3">Data Laporan</h5>

          <p className="text-muted">
            Total: <span className="fw-bold text-danger">{laporan.length}</span>
          </p>

          <div className="row g-3 mt-3">
            {laporan.map((item: any) => (
              <div className="col-md-4" key={item.id}>
                <div className="card h-100 border-0 shadow-sm p-3 text-start d-flex flex-column">
                  <img
                    src={item.foto}
                    className="img-fluid rounded mb-2"
                    style={{ height: "150px", objectFit: "cover" }}
                    alt={item.lokasi}
                  />

                  <h6 className="fw-semibold text-danger">
                    {item.lokasi}
                  </h6>

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
