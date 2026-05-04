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

  const isSlider = dataLaporan.length > 6;

  return (
    <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-2 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Layanan Kami
        </h1>

        <p className="mb-12 text-sm leading-relaxed text-gray-500 md:text-base">
          Fitur lengkap untuk memudahkan pelaporan parkir liar
        </p>

        {/* FITUR */}
        <div className="mb-14 grid gap-6 md:grid-cols-3">
          <div className="h-full rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.35)]">
            <img
              src="/image/MAPS.png"
              className="mx-auto mb-4 h-20 w-auto object-contain"
              alt="Maps"
            />
            <h5 className="mb-2 text-lg font-bold text-gray-900">
              Lokasi Akurat
            </h5>
            <p className="mb-0 text-sm leading-relaxed text-gray-500">
              Tentukan lokasi pelanggaran dengan pin map yang akurat.
            </p>
          </div>

          <div className="h-full rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.35)]">
            <img
              src="/image/KAMERA.png"
              className="mx-auto mb-4 h-20 w-auto object-contain"
              alt="Kamera"
            />
            <h5 className="mb-2 text-lg font-bold text-gray-900">
              Upload Foto
            </h5>
            <p className="mb-0 text-sm leading-relaxed text-gray-500">
              Lampirkan bukti foto kejadian di lokasi.
            </p>
          </div>

          <div className="h-full rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.35)]">
            <img
              src="/image/PANTAU STATUS.png"
              className="mx-auto mb-4 h-20 w-auto object-contain"
              alt="Status"
            />
            <h5 className="mb-2 text-lg font-bold text-gray-900">
              Pantau Status
            </h5>
            <p className="mb-0 text-sm leading-relaxed text-gray-500">
              Lihat perkembangan status laporan secara real-time.
            </p>
          </div>
        </div>

        {/* CARA KERJA */}
        <h2 className="mb-8 text-3xl font-extrabold text-gray-900 md:text-4xl">
          Cara Kerja
        </h2>

        <div className="mb-14 grid gap-6 md:grid-cols-3">
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
            <div
              className="h-full rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.35)]"
              key={item[0]}
            >
              <span className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                {item[0]}
              </span>

              <img
                src={item[1]}
                className="mx-auto mb-4 h-[70px] w-auto object-contain"
                alt={item[2]}
              />

              <h6 className="mb-2 text-base font-bold text-gray-900">
                {item[2]}
              </h6>

              <p className="mb-0 text-sm leading-relaxed text-gray-500">
                {item[3]}
              </p>
            </div>
          ))}
        </div>

        {/* MAP */}
        <div className="mb-14 rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <h5 className="mb-4 text-lg font-bold text-gray-900">
            Peta Laporan Parkir
          </h5>

          {dataLaporan.length === 0 ? (
            <p className="mb-0 text-sm text-gray-500">Belum ada laporan</p>
          ) : (
            <MapLaporanClient data={dataLaporan} />
          )}
        </div>

        {/* DATA LAPORAN PREMIUM */}
        <div className="rounded-[28px] bg-white p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.07)] md:p-7">
          <div className="mb-6 grid gap-5 rounded-[24px] bg-gradient-to-br from-red-50 via-white to-red-100 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
            <div className="flex gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] border border-red-100 bg-red-50 text-3xl text-red-600 shadow-[0_14px_35px_rgba(220,38,38,0.16)]">
                <i className="fa-regular fa-clipboard"></i>
              </div>

              <div>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold text-red-600">
                  <span className="h-2 w-2 rounded-full bg-red-600"></span>
                  LIVE DATA
                </span>

                <h5 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
                  Data <strong className="text-red-600">Laporan Parkir</strong>
                </h5>

                <p className="mb-5 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
                  Pantau laporan parkir liar yang telah dikirim oleh masyarakat
                  secara real-time dan transparan.
                </p>

                <div className="h-1 w-20 rounded-full bg-red-600"></div>
              </div>
            </div>

            <div className="rounded-[24px] bg-white/80 p-5 shadow-[0_24px_60px_rgba(220,38,38,0.18)] backdrop-blur">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-red-600 shadow-[0_14px_35px_rgba(220,38,38,0.16)]">
                  <i className="fa-solid fa-chart-pie"></i>
                </div>

                <div>
                  <span className="text-sm font-bold text-gray-500">
                    Total Laporan
                  </span>
                  <strong className="block text-5xl font-extrabold text-red-600">
                    {totalLaporan}
                  </strong>
                  <p className="mb-0 text-sm text-gray-500">
                    <i className="fa-solid fa-arrow-trend-up mr-1 text-green-500"></i>
                    Update terbaru
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MINI DASHBOARD */}
          <div className="mb-6 grid overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.06)] sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center justify-center gap-4 border-b border-gray-100 p-5 sm:border-r lg:border-b-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-red-50 text-2xl text-red-600">
                <i className="fa-regular fa-clipboard"></i>
              </div>
              <div>
                <strong className="block text-3xl font-extrabold text-red-600">
                  {totalLaporan}
                </strong>
                <span className="text-sm font-semibold text-gray-500">
                  Total Laporan
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 border-b border-gray-100 p-5 lg:border-b-0 lg:border-r">
              <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-yellow-50 text-2xl text-yellow-500">
                <i className="fa-regular fa-clock"></i>
              </div>
              <div>
                <strong className="block text-3xl font-extrabold text-yellow-500">
                  {totalMenunggu}
                </strong>
                <span className="text-sm font-semibold text-gray-500">
                  Menunggu
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 border-b border-gray-100 p-5 sm:border-r sm:border-b-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-blue-50 text-2xl text-blue-500">
                <i className="fa-solid fa-hourglass-half"></i>
              </div>
              <div>
                <strong className="block text-3xl font-extrabold text-blue-500">
                  {totalDiproses}
                </strong>
                <span className="text-sm font-semibold text-gray-500">
                  Diproses
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 p-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-green-50 text-2xl text-green-500">
                <i className="fa-regular fa-circle-check"></i>
              </div>
              <div>
                <strong className="block text-3xl font-extrabold text-green-500">
                  {totalSelesai}
                </strong>
                <span className="text-sm font-semibold text-gray-500">
                  Selesai
                </span>
              </div>
            </div>
          </div>

          {/* CARD LAPORAN */}
          <div
            className={
              isSlider
                ? "flex gap-6 overflow-x-auto pb-4"
                : "grid gap-6 md:grid-cols-3"
            }
          >
            {dataLaporan.map((item) => (
              <div
                className={`flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.28)] ${
                  isSlider ? "min-w-[310px] md:min-w-[360px]" : ""
                }`}
                key={item.id}
              >
                <img
                  src={item.foto || "/image/default.png"}
                  alt={item.lokasi}
                  className="h-48 w-full object-cover"
                />

                <div className="flex flex-1 flex-col p-5">
                  <h6 className="mb-2 flex min-h-[48px] items-start gap-2 text-base font-bold leading-snug text-gray-900">
                    <i className="fa-solid fa-location-dot mt-1 shrink-0 text-red-600"></i>
                    <span className="line-clamp-2">{item.lokasi}</span>
                  </h6>

                  <p className="mb-4 min-h-[72px] line-clamp-3 text-sm leading-relaxed text-gray-500">
                    {item.deskripsi}
                  </p>

                  <div className="mt-auto">
                    <span className="mb-4 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                      {item.status}
                    </span>

                    <Link
                      href={`/laporan/${item.id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white !no-underline transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline"
                    >
                      Lihat Detail <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {dataLaporan.length === 0 && (
              <div className="md:col-span-3">
                <p className="mb-0 text-center text-sm text-gray-500">
                  Belum ada data laporan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
