import fs from "fs";
import path from "path";
import Link from "next/link";

type Laporan = {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  foto: string;
  status: string;
};

export default async function DetailLaporan({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const filePath = path.join(process.cwd(), "src/data/laporan.json");
  const data: Laporan[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const laporan = data.find((item) => item.id === Number(id));

  if (!laporan) {
    return (
      <div className="container py-5 text-center">
        <h1 className="fw-bold text-danger">Laporan tidak ditemukan</h1>
        <Link href="/services" className="btn btn-danger mt-3">
          Kembali ke Services
        </Link>
      </div>
    );
  }

  const statusClass =
    laporan.status === "Selesai"
      ? "bg-success"
      : laporan.status === "Diproses"
      ? "bg-warning text-dark"
      : "bg-secondary";

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="position-relative">
              <img
                src={laporan.foto}
                alt={laporan.lokasi}
                className="w-100"
                style={{
                  height: "420px",
                  objectFit: "cover",
                }}
              />

              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.65))",
                }}
              />

              <div className="position-absolute bottom-0 start-0 p-4 text-white">
                <span className={`badge ${statusClass} px-3 py-2 mb-3`}>
                  {laporan.status}
                </span>

                <h1 className="fw-bold mb-0">{laporan.lokasi}</h1>
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              <div className="mb-4">
                <p className="text-uppercase text-muted small fw-bold mb-1">
                  Nama Pelapor
                </p>
                <h5 className="fw-semibold">{laporan.nama}</h5>
              </div>

              <div className="mb-4">
                <p className="text-uppercase text-muted small fw-bold mb-2">
                  Deskripsi Laporan
                </p>
                <p className="fs-5 text-muted lh-lg">{laporan.deskripsi}</p>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
                <Link href="/services" className="btn btn-outline-secondary px-4">
                  ← Kembali
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}