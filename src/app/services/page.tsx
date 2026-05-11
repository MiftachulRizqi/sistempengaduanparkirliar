import { cookies } from "next/headers";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseServer";

type LaporanSaya = {
  id: number | string;
  nama?: string | null;
  email?: string | null;
  lokasi: string;
  deskripsi: string;
  foto: string | null;
  status: "Menunggu" | "Diproses" | "Selesai";
  created_at: string;
};

function getStatusStyle(status: LaporanSaya["status"]) {
  if (status === "Selesai") return "bg-green-100 text-green-600";
  if (status === "Diproses") return "bg-blue-100 text-blue-600";
  return "bg-yellow-100 text-yellow-600";
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Services() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const role = cookieStore.get("auth-role")?.value;
  const email = cookieStore.get("auth-email")?.value || "";

  const isUserLoggedIn = token === "logged-in" && role === "user" && !!email;

  let riwayatLaporan: LaporanSaya[] = [];

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (profileError) {
    console.error("Supabase profile error:", profileError.message);
  }

  if (profile?.id) {
    const { data, error } = await supabaseAdmin
      .from("laporan")
      .select("*")
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase riwayat laporan saya error:", error.message);
    }

    riwayatLaporan = (data || []) as LaporanSaya[];


    if (error) {
      console.error("Supabase riwayat laporan saya error:", error.message);
    }

    riwayatLaporan = (data || []) as LaporanSaya[];
  }

  return (
    <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-2 text-4xl font-extrabold text-gray-900 md:text-5xl">
          Layanan Kami
        </h1>

        <p className="mb-12 text-sm leading-relaxed text-gray-500 md:text-base">
          Fitur lengkap untuk memudahkan pelaporan parkir liar
        </p>

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

        <div
          id="riwayat-laporan"
          className="scroll-mt-24 rounded-[28px] bg-white p-6 text-left shadow-[0_18px_45px_rgba(0,0,0,0.06)] md:p-8"
        >
          <div className="mb-6 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-red-600">
              Riwayat Laporan Saya
            </span>

            <h3 className="mb-3 text-2xl font-extrabold text-gray-900 md:text-3xl">
              Pantau Laporan yang Pernah Kamu Kirim
            </h3>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              Riwayat ini hanya menampilkan laporan yang dikirim menggunakan
              akun yang sedang login.
            </p>
          </div>

          {!isUserLoggedIn ? (
            <div className="rounded-3xl border border-dashed border-red-200 bg-red-50/60 p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-red-600 shadow-sm">
                <i className="fa-solid fa-lock"></i>
              </div>

              <h4 className="mb-2 text-xl font-extrabold text-gray-900">
                Login untuk Melihat Riwayat
              </h4>

              <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-gray-500">
                Masuk menggunakan akun user agar riwayat laporan kamu dapat
                ditampilkan di halaman ini.
              </p>

              <Link
                href="/login?next=/services#riwayat-laporan"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white !no-underline shadow-[0_14px_30px_rgba(220,38,38,0.28)] transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline"
              >
                Login Sekarang
              </Link>
            </div>
          ) : riwayatLaporan.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-red-600 shadow-sm">
                <i className="fa-regular fa-folder-open"></i>
              </div>

              <h4 className="mb-2 text-xl font-extrabold text-gray-900">
                Belum Ada Riwayat Laporan
              </h4>

              <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-gray-500">
                Kamu belum mengirim laporan menggunakan akun ini.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white !no-underline shadow-[0_14px_30px_rgba(220,38,38,0.28)] transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline"
              >
                Buat Laporan
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {riwayatLaporan.map((item) => (
                <div
                  key={item.id}
                  className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white text-left shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.28)]"
                >
                  <img
                    src={item.foto || "/image/default.png"}
                    alt={item.lokasi}
                    className="h-44 w-full object-cover"
                  />

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>

                      <span className="text-xs font-semibold text-gray-400">
                        {formatDate(item.created_at)}
                      </span>
                    </div>

                    <h4 className="mb-2 line-clamp-2 text-base font-extrabold text-gray-900">
                      {item.lokasi}
                    </h4>

                    <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-500">
                      {item.deskripsi}
                    </p>

                    <Link
                      href={`/laporan/${item.id}`}
                      className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white !no-underline transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline"
                    >
                      Lihat Detail
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}