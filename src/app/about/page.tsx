export default function About() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">

          {/* TEXT */}
          <div className="col-lg-6">
            <span className="text-danger fw-semibold">Tentang Kami</span>

            <h1 className="fw-bold mt-3 mb-4">
              Bersama Wujudkan <br />
              Kota yang <span className="text-danger">Tertib</span>
            </h1>

            <p className="text-muted">
              Pengaduan Parkir Liar adalah platform digital yang memudahkan
              masyarakat untuk melaporkan parkir liar secara cepat dan transparan.
              Kami berkomitmen untuk menciptakan lingkungan jalan yang tertib,
              aman, dan nyaman bagi semua.
            </p>

            {/* STAT MINI */}
            <div className="d-flex gap-4 mt-4">

              <div>
                <h5 className="fw-bold text-danger">120+</h5>
                <small className="text-muted">Laporan Masuk</small>
              </div>

              <div>
                <h5 className="fw-bold text-danger">80+</h5>
                <small className="text-muted">Sudah Ditindak</small>
              </div>

              <div>
                <h5 className="fw-bold text-danger">40+</h5>
                <small className="text-muted">Dalam Proses</small>
              </div>

            </div>
          </div>

          {/* IMAGE */}
          <div className="col-lg-6 text-center">
            <img
              src="/image/ABOUT.png"
              className="img-fluid"
              style={{ maxHeight: "420px" }}
            />
          </div>

        </div>

        {/* VISI MISI TUJUAN */}
        <div className="row mt-5 g-4">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100 icon-box">
              <i className="fa-solid fa-eye text-danger fs-2 mb-3"></i>
              <h5 className="fw-semibold">Visi</h5>
              <p className="text-muted small">
                Mewujudkan kota yang tertib, aman, nyaman, dan bebas dari parkir liar.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100 icon-box">
              <i className="fa-solid fa-bullseye text-danger fs-2 mb-3"></i>
              <h5 className="fw-semibold">Misi</h5>
              <p className="text-muted small">
                Memberikan kemudahan bagi masyarakat dalam melaporkan parkir liar.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 text-center h-100 icon-box">
              <i className="fa-solid fa-trophy text-warning fs-2 mb-3"></i>
              <h5 className="fw-semibold">Tujuan</h5>
              <p className="text-muted small">
                Menjadi solusi terpercaya dalam penanganan parkir liar di seluruh kota.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}