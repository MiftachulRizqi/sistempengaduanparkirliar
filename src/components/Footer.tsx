import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer pt-5 pb-3">
      <div className="container">
        <div className="row g-4">

          {/* KOLOM 1 */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3 text-danger">
              Pengaduan Parkir Liar
            </h5>
            <p className="text-muted">
              Platform untuk membantu masyarakat melaporkan parkir liar secara cepat, mudah, dan transparan.
            </p>
          </div>

          {/* KOLOM 2 */}
          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Navigasi</h6>
            <ul className="list-unstyled footer-link">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/services">Service</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* KOLOM 3 */}
          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Pihak Terkait</h6>
            <ul className="list-unstyled footer-link">
              <li><a href="#">Dinas Perhubungan (Dishub)</a></li>
              <li><a href="#">Satuan Polisi Pamong Praja (Satpol PP)</a></li>
              <li><a href="#">Kepolisian (Polri)</a></li>
              <li><a href="#">Pemerintah Kota Surabaya</a></li>
            </ul>
          </div>

          {/* KOLOM 4 */}
          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Ikuti Kami</h6>

            <div className="d-flex gap-3 social-icon">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
              <a href="#"><i className="fab fa-tiktok"></i></a>
            </div>

            <p className="small text-muted mt-3">
              📍 Surabaya, Indonesia <br />
              📧 support@parkirliar.id
            </p>
          </div>

        </div>

        <hr className="my-4" />

        <div className="text-center small text-muted">
          &copy; 2026 Pengaduan Parkir Liar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}