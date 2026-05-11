export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import MapLaporanClient from "@/components/MapLaporanClient";
import LaporanSearch from "@/components/LaporanSearch";
import { supabaseAdmin } from "@/lib/supabaseServer";

type Laporan = {
  id: string;
  nama?: string;
  lokasi: string;
  deskripsi: string;
  foto: string | null;
  status: "Menunggu" | "Diproses" | "Selesai";
  created_at: string;
  latitude?: number | null;
  longitude?: number | null;
};

function getStatusStyle(status: Laporan["status"]) {
  if (status === "Selesai") return "bg-green-100 text-green-600";
  if (status === "Diproses") return "bg-blue-100 text-blue-600";
  return "bg-yellow-100 text-yellow-600";
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = (params.query || "").trim();
  const safeSearchQuery = searchQuery.replace(/[,()%]/g, "");

  let laporanQuery = supabaseAdmin
    .from("laporan")
    .select("*")
    .order("created_at", { ascending: false });

  if (safeSearchQuery) {
    laporanQuery = laporanQuery.or(
      `lokasi.ilike.%${safeSearchQuery}%,deskripsi.ilike.%${safeSearchQuery}%,status.ilike.%${safeSearchQuery}%,nama.ilike.%${safeSearchQuery}%`
    );
  }

  const [{ data: laporan, error }, { data: allLaporan }] = await Promise.all([
    laporanQuery,
    supabaseAdmin
      .from("laporan")
      .select("id,nama,lokasi,deskripsi,status")
      .order("created_at", { ascending: false }),
  ]);

  if (error) {
    console.error("Supabase Error:", error);
  }

  const dataLaporan: Laporan[] = laporan || [];
  const suggestionData = allLaporan || [];

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
    <main>
      <section
        id="hero"
        className="relative overflow-hidden bg-white px-4 pt-10 pb-16 md:px-6 md:pt-14 md:pb-20 lg:px-8"
      >
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-red-100/60 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gray-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Laporkan Parkir Liar
              <br />
              dengan <span className="text-red-600">Mudah & Cepat</span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg">
              Bantu ciptakan jalan yang tertib dan nyaman untuk semua pengguna
              jalan.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/login?next=/contact"
                className="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white !no-underline shadow-[0_14px_30px_rgba(220,38,38,0.28)] transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline"
              >
                Laporkan Sekarang
              </Link>

              <Link
                href="/#laporan"
                className="inline-flex w-full items-center justify-center rounded-lg border border-red-600 px-6 py-3 text-sm font-bold text-red-600 !no-underline transition-colors duration-300 hover:bg-red-600 hover:text-white hover:!no-underline"
              >
                Lihat Laporan
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src="/image/Asset 1jukir 1.png"
              alt="Ilustrasi Parkir"
              className="max-h-[420px] w-full max-w-[520px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.12)]"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              Kenapa Harus Melapor?
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500 md:text-base">
              Setiap laporan membantu menciptakan lingkungan jalan yang lebih
              aman, tertib, dan nyaman.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_10px_30px_rgba(220,38,38,0.35)]">
              <img
                src="/image/MOBIL 1.png"
                alt="Mewujudkan Kota Tertib"
                className="mx-auto mb-5 h-28 w-auto object-contain"
              />

              <h5 className="text-lg font-bold text-gray-900">
                Mewujudkan Kota Tertib
              </h5>
            </div>

            <div className="rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_10px_30px_rgba(220,38,38,0.35)]">
              <img
                src="/image/ORANG JALAN 1.png"
                alt="Menjaga Kenyamanan"
                className="mx-auto mb-5 h-28 w-auto object-contain"
              />

              <h5 className="text-lg font-bold text-gray-900">
                Menjaga Kenyamanan
              </h5>
            </div>

            <div className="rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.35)]">
              <img
                src="/image/MONEY 1.png"
                alt="Mencegah Pungli"
                className="mx-auto mb-5 h-28 w-auto object-contain"
              />

              <h5 className="text-lg font-bold text-gray-900">
                Mencegah Pungli
              </h5>
            </div>
          </div>
        </div>
      </section>

      <section id="laporan" className="bg-white px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-red-600">
              <span className="h-2 w-2 rounded-full bg-red-600"></span>
              Live Data
            </span>

            <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              Dashboard <span className="text-red-600">Laporan Parkir</span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Pantau laporan parkir liar yang telah dikirim oleh masyarakat
              secara real-time dan transparan.
            </p>
          </div>

          <div className="mb-10 rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
            <h5 className="mb-4 text-lg font-bold text-gray-900">
              Peta Laporan Parkir
            </h5>

            {dataLaporan.length === 0 ? (
              <p className="mb-0 text-sm text-gray-500">Belum ada laporan</p>
            ) : (
              <MapLaporanClient data={dataLaporan} />
            )}
          </div>

          <div className="rounded-[28px] bg-white p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.07)] md:p-7">
            <div className="mb-6 grid gap-5 rounded-[24px] bg-gradient-to-br from-red-50 via-white to-red-100 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
              <div className="flex gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] border border-red-100 bg-red-50 text-3xl text-red-600 shadow-[0_14px_35px_rgba(220,38,38,0.16)]">
                  <i className="fa-regular fa-clipboard"></i>
                </div>

                <div>
                  <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold text-red-600">
                    <span className="h-2 w-2 rounded-full bg-red-600"></span>
                    DATA TERBARU
                  </span>

                  <h5 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
                    Data{" "}
                    <strong className="text-red-600">Laporan Parkir</strong>
                  </h5>

                  <p className="mb-5 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
                    Lihat perkembangan laporan masyarakat berdasarkan status
                    penanganan.
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

            <LaporanSearch suggestions={suggestionData} />

            {searchQuery && (
              <p className="mb-5 rounded-2xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-600">
                Menampilkan hasil pencarian untuk:
                <span className="text-red-600"> {searchQuery}</span>
              </p>
            )}

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
                      <span
                        className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>

                      <Link
                        href={`/laporan/${item.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white !no-underline transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline"
                      >
                        Lihat Detail{" "}
                        <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {dataLaporan.length === 0 && (
                <div className="md:col-span-3">
                  <p className="mb-0 text-center text-sm text-gray-500">
                    {searchQuery
                      ? "Tidak ada laporan yang cocok dengan kata kunci pencarian."
                      : "Belum ada data laporan."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}