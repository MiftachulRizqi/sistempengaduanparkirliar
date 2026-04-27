import MapLaporanClient from "@/components/MapLaporanClient";
import Link from "next/link";
import { headers } from "next/headers";

export default async function Services() {
<<<<<<< HEAD
  // 🔥 Ambil domain otomatis (Vercel-safe)
  const headersList = await headers();
  const host = headersList.get("host");

  const protocol =
    process.env.NODE_ENV === "production" ? "https" : "http";
=======
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
>>>>>>> a33d5e4 (fix services page for vercel)

  const res = await fetch(`${protocol}://${host}/api/laporan/list`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <h3>Gagal memuat data laporan</h3>
        </div>
      </section>
    );
  }

  const laporan = await res.json();

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">

        <h1 className="fw-bold mb-2">Layanan Kami</h1>
<<<<<<< HEAD
=======
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
>>>>>>> a33d5e4 (fix services page for vercel)

        <div className="card border-0 shadow-sm p-4 mb-5">
          <h5 className="fw-bold mb-3">Peta Laporan Parkir</h5>

          {laporan.length === 0 ? (
            <p className="text-muted">Belum ada laporan</p>
          ) : (
            <MapLaporanClient data={laporan} />
          )}
        </div>

<<<<<<< HEAD
        {/* DATA */}
        <div className="card border-0 shadow-sm p-4">
          <h5 className="fw-bold mb-3">Data Laporan</h5>

          <div className="row g-3">
            {laporan.map((item: any) => (
              <div className="col-md-4" key={item.id}>
                <div className="card p-3 h-100">
=======
        <div className="card border-0 shadow-sm p-4">
          <h5 className="fw-bold mb-3">Data Laporan</h5>

          <p className="text-muted">
            Total:{" "}
            <span className="fw-bold text-danger">
              {laporan.length}
            </span>
          </p>

          <div className="row g-3 mt-3">
            {laporan.map((item: any) => (
              <div className="col-md-4" key={item.id}>
                <div className="card h-100 border-0 shadow-sm p-3 text-start d-flex flex-column">
>>>>>>> a33d5e4 (fix services page for vercel)
                  <img
                    src={item.foto}
                    className="img-fluid rounded mb-2"
                    style={{ height: "150px", objectFit: "cover" }}
                    alt={item.lokasi}
                  />

<<<<<<< HEAD
                  <h6 className="text-danger">{item.lokasi}</h6>

                  <p className="small text-muted">
                    {item.deskripsi}
                  </p>

                  <Link
                    href={`/laporan/${item.id}`}
                    className="btn btn-danger btn-sm mt-auto"
                  >
                    Detail
                  </Link>
=======
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
>>>>>>> a33d5e4 (fix services page for vercel)
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
