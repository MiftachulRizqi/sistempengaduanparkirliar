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

  const { data, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !data) {
    return (
      <section className="laporan-detail-section">
        <div className="container">
          <div className="laporan-not-found">
            <h1>Laporan tidak ditemukan</h1>
            <Link href="/services" className="btn-detail-primary">
              Kembali ke Services
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const laporan = data as Laporan;

  const statusClass =
    laporan.status === "Selesai"
      ? "status-success"
      : laporan.status === "Diproses"
      ? "status-process"
      : "status-waiting";

  return (
    <section className="laporan-detail-section">
      <div className="container">
        <div className="laporan-detail-card">

          <div className="laporan-image-box">
            <img src={laporan.foto} alt={laporan.lokasi} />

            <span className={`laporan-status ${statusClass}`}>
              {laporan.status}
            </span>
          </div>

          <div className="laporan-detail-content">
            <span className="laporan-label">Detail Laporan Parkir</span>

            <h1>{laporan.lokasi}</h1>

            <div className="laporan-info-grid">
              <div className="laporan-info-box">
                <span>Nama Pelapor</span>
                <strong>{laporan.nama}</strong>
              </div>

              <div className="laporan-info-box">
                <span>Status Laporan</span>
                <strong>{laporan.status}</strong>
              </div>
            </div>

            <div className="laporan-description-box">
              <span>Deskripsi Laporan</span>
              <p>{laporan.deskripsi}</p>
            </div>

            <div className="laporan-action">
              <Link href="/services" className="btn-detail-secondary">
                Kembali
              </Link>

              <Link href="/contact" className="btn-detail-primary">
                Buat Laporan Baru
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}