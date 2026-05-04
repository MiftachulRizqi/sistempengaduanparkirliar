export const dynamic = "force-dynamic";

import { supabaseAdmin } from "@/lib/supabaseServer";

type Laporan = {
  status: "Menunggu" | "Diproses" | "Selesai";
};

export default async function About() {
  const { data: laporan } = await supabaseAdmin
    .from("laporan")
    .select("status");

  const dataLaporan: Laporan[] = laporan || [];

  const totalLaporan = dataLaporan.length;
  const totalDiproses = dataLaporan.filter(
    (item) => item.status === "Diproses"
  ).length;
  const totalSelesai = dataLaporan.filter(
    (item) => item.status === "Selesai"
  ).length;

  return (
    <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* TEXT */}
          <div>
            <span className="text-sm font-semibold text-red-600">
              Tentang Kami
            </span>

            <h1 className="mt-3 mb-4 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              Bersama Wujudkan <br />
              Kota yang <span className="text-red-600">Tertib</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-gray-500">
              Pengaduan Parkir Liar adalah platform digital yang memudahkan
              masyarakat untuk melaporkan parkir liar secara cepat dan
              transparan. Kami berkomitmen untuk menciptakan lingkungan jalan
              yang tertib, aman, dan nyaman bagi semua.
            </p>

            {/* STAT MINI */}
            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <h5 className="mb-1 text-xl font-extrabold text-red-600">
                  {totalLaporan}+
                </h5>
                <small className="text-sm text-gray-500">
                  Laporan Masuk
                </small>
              </div>

              <div>
                <h5 className="mb-1 text-xl font-extrabold text-red-600">
                  {totalSelesai}+
                </h5>
                <small className="text-sm text-gray-500">
                  Sudah Ditindak
                </small>
              </div>

              <div>
                <h5 className="mb-1 text-xl font-extrabold text-red-600">
                  {totalDiproses}+
                </h5>
                <small className="text-sm text-gray-500">
                  Dalam Proses
                </small>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/image/ABOUT.png"
              alt="Tentang Pengaduan Parkir Liar"
              className="max-h-[420px] w-full max-w-[520px] object-contain"
            />
          </div>
        </div>

        {/* VISI MISI TUJUAN */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* VISI */}
          <div className="h-full rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.35)]">
            <i className="fa-solid fa-eye mb-4 text-3xl text-red-600"></i>
            <h5 className="mb-2 text-lg font-bold text-gray-900">Visi</h5>
            <p className="mb-0 text-sm leading-relaxed text-gray-500">
              Mewujudkan kota yang tertib, aman, nyaman, dan bebas dari parkir
              liar.
            </p>
          </div>

          {/* MISI */}
          <div className="h-full rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.35)]">
            <i className="fa-solid fa-bullseye mb-4 text-3xl text-red-600"></i>
            <h5 className="mb-2 text-lg font-bold text-gray-900">Misi</h5>
            <p className="mb-0 text-sm leading-relaxed text-gray-500">
              Memberikan kemudahan bagi masyarakat dalam melaporkan parkir
              liar.
            </p>
          </div>

          {/* TUJUAN (SUDAH FIX SHADOW) */}
          <div className="h-full rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.35)]">
            <i className="fa-solid fa-trophy mb-4 text-3xl text-yellow-500"></i>
            <h5 className="mb-2 text-lg font-bold text-gray-900">Tujuan</h5>
            <p className="mb-0 text-sm leading-relaxed text-gray-500">
              Menjadi solusi terpercaya dalam penanganan parkir liar di seluruh
              kota.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
