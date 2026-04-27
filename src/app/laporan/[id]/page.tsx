import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseServer";

type Laporan = {
  id: number;
  nama: string;
  lokasi: string;
  deskripsi: string;
  foto: string;
  status: string;
  created_at?: string;
};

export default async function DetailLaporan({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: laporan, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !laporan) {
    return (
      <div className="container py-5 text-center">
        <h1 className="fw-bold text-danger mb-3">
          Laporan tidak ditemukan
        </h1>

        <Link href="/services" className="btn btn-danger">
          Kembali ke Services
        </Link>
      </div>
    );
  }

  const item = laporan as Laporan;

  const statusClass =
    item.status === "Selesai"
      ? "bg-success"
      : item.status === "Diproses"
      ? "bg-warning text-dark"
      : "bg-secondary";

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="position-relative">
              <img
                src={item.foto}
                alt={item.lokasi}
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
                  {item.status}
                </span>

                <h1 className="fw-bold mb-0">{item.lokasi}</h1>
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              <div className="mb-4">
                <p className="text-uppercase text-muted small fw-bold mb-1">
                  Nama Pelapor
                </p>
                <h5 className="fw-semibold">{item.nama}</h5>
              </div>

              <div className="mb-4">
                <p className="text-uppercase text-muted small fw-bold mb-2">
                  Deskripsi Laporan
                </p>
                <p className="fs-5 text-muted lh-lg">
                  {item.deskripsi}
                </p>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
                <Link href="/services" className="btn btn-outline-secondary px-4">
                  ← Kembali
                </Link>

                <Link href="/services" className="btn btn-danger px-4">
                  Kembali ke Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}