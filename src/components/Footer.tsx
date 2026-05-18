import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
          {/* KOLOM 1 */}
          <div>
            <h5 className="mb-3 text-lg font-extrabold text-red-600">
              Pengaduan Parkir Liar
            </h5>

            <p className="text-sm leading-relaxed text-gray-500">
              Platform untuk membantu masyarakat melaporkan parkir liar secara
              cepat, mudah, dan transparan.
            </p>
          </div>

          {/* KOLOM 2 */}
          <div>
            <h6 className="mb-3 text-sm font-semibold text-gray-900">
              Navigasi
            </h6>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-500 transition hover:text-red-600 !no-underline"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-500 transition hover:text-red-600 !no-underline"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-500 transition hover:text-red-600 !no-underline"
                >
                  Service
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-500 transition hover:text-red-600 !no-underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3 */}
          <div>
            <h6 className="mb-3 text-sm font-semibold text-gray-900">
              Pihak Terkait
            </h6>

            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/dishubsurabaya?igsh=MWphY2dsamEweXJpMg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition hover:text-red-600 !no-underline"
                >
                  Dinas Perhubungan (Dishub)
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/satpolppsurabaya?igsh=aTV0YTAwdmx1a2Jo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition hover:text-red-600 !no-underline"
                >
                  Satuan Polisi Pamong Praja (Satpol PP)
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/divisihumaspolri?igsh=Z2s5YWRnbnI5dXlk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition hover:text-red-600 !no-underline"
                >
                  Kepolisian (Polri)
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/ericahyadi_?igsh=cXIwam83dWFlcTNt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition hover:text-red-600 !no-underline"
                >
                  Pemerintah Kota Surabaya
                </a>
              </li>
            </ul>
          </div>

          {/* KOLOM 4 */}
          <div>
            <h6 className="mb-3 text-sm font-semibold text-gray-900">
              Ikuti Kami
            </h6>

            <div className="mb-4 flex justify-center gap-3 md:justify-start">
              <a
                href="https://www.instagram.com/ericahyadi_?igsh=cXIwam83dWFlcTNt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Pemerintah Kota Surabaya"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-600 hover:text-white !no-underline"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                href="https://tr.ee/frLS-mHlwa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Pengaduan Pemerintah Kota Surabaya"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-600 hover:text-white !no-underline"
              >
                <i className="fab fa-whatsapp"></i>
              </a>

              <a
                href="https://www.tiktok.com/@eri.cahyadi?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Eri Cahyadi"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-600 hover:text-white !no-underline"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </div>

            <p className="text-sm text-gray-500">
              📍 Surabaya, Indonesia <br />
              📧 mediacenter@surabaya.go.id
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
          &copy; 2026 Pengaduan Parkir Liar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}