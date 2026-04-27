import MapLaporanClient from "@/components/MapLaporanClient";
import Link from "next/link";
import { headers } from "next/headers";

export default async function Services() {
  // 🔥 Ambil domain otomatis (Vercel-safe)
  const headersList = await headers();
  const host = headersList.get("host");

  const protocol =
    process.env.NODE_ENV === "production" ? "https" : "http";

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

        {/* MAP */}
        <div className="card border-0 shadow-sm p-4 mb-5">
          <h5 className="fw-bold mb-3">Peta Laporan Parkir</h5>

          {laporan.length === 0 ? (
            <p className="text-muted">Belum ada laporan</p>
          ) : (
            <MapLaporanClient data={laporan} />
          )}
        </div>

        {/* DATA */}
        <div className="card border-0 shadow-sm p-4">
          <h5 className="fw-bold mb-3">Data Laporan</h5>

          <div className="row g-3">
            {laporan.map((item: any) => (
              <div className="col-md-4" key={item.id}>
                <div className="card p-3 h-100">
                  <img
                    src={item.foto}
                    className="img-fluid rounded mb-2"
                    style={{ height: "150px", objectFit: "cover" }}
                  />

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
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
