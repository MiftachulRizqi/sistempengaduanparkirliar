"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";
import Link from "next/link";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
});

export default function Contact() {
  const [form, setForm] = useState({
    nama: "",
    lokasi: "",
    deskripsi: "",
    foto: null as File | null,
  });

  const [position, setPosition] = useState<LatLngExpression>([
    -7.2575,
    112.7521,
  ]);

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      setForm({ ...form, foto: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

  const handleSearchLocation = async () => {
    if (!form.lokasi) return;

    try {
      setLoadingMap(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          form.lokasi
        )}&format=json`,
        {
          headers: {
            "User-Agent": "pengaduan-parkir-app",
          },
        }
      );

      const data = await res.json();

      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);
      } else {
        alert("Lokasi tidak ditemukan");
      }
    } catch {
      alert("Gagal mencari lokasi");
    }

    setLoadingMap(false);
  };

  const handleSelectMap = async (lat: number, lon: number) => {
    try {
      setLoadingMap(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        {
          headers: {
            "User-Agent": "pengaduan-parkir-app",
          },
        }
      );

      const data = await res.json();

      setForm({
        ...form,
        lokasi: data.display_name || "Lokasi tidak ditemukan",
      });

      setPosition([lat, lon]);
    } catch {
      alert("Gagal mengambil alamat");
    }

    setLoadingMap(false);
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.nama) newErrors.nama = "Nama wajib diisi";
    if (!form.lokasi) newErrors.lokasi = "Lokasi wajib diisi";
    if (!form.deskripsi) newErrors.deskripsi = "Deskripsi wajib diisi";
    if (!form.foto) newErrors.foto = "Foto wajib diupload";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("nama", form.nama);
      formData.append("lokasi", form.lokasi);
      formData.append("deskripsi", form.deskripsi);
      formData.append("foto", form.foto as File);

      const res = await fetch("/api/laporan", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      setLoading(false);

      if (res.ok && result.success) {
        alert("✅ Laporan berhasil dikirim!");

        setForm({
          nama: "",
          lokasi: "",
          deskripsi: "",
          foto: null,
        });

        setErrors({});
      } else {
        alert("❌ " + (result.message || "Gagal mengirim laporan"));
      }
    } catch (error) {
      setLoading(false);
      alert("❌ Terjadi error saat mengirim!");
      console.error(error);
    }
  };

  return (
    <section className="contact-premium-section">
      <div className="container">
        <div className="contact-premium-header">
          <h2>Hubungi & Laporkan</h2>
          <p>Laporkan parkir liar dengan mudah, cepat, dan transparan.</p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* CARD HUBUNGI KAMI */}
          <div className="col-lg-4">
            <div className="contact-info-card">
              <div className="contact-image-wrapper">
                <img
                  src="/image/CONTACT.png"
                  alt="Contact"
                  className="contact-image"
                />
              </div>

              <div className="contact-info-body">
                <h4>Hubungi Kami</h4>

                <p className="contact-info-desc">
                  Jika mengalami kendala, hubungi kami melalui kontak berikut
                  atau kirim laporan melalui form.
                </p>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <span>Telepon</span>
                    <strong>0896-7754-3220</strong>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <span>Email</span>
                    <strong>info@pengaduanparkirliar.id</strong>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <span>Lokasi</span>
                    <strong>Surabaya</strong>
                  </div>
                </div>

                <div className="contact-service-box">
                  <strong>Jam Layanan</strong>
                  <p>
                    Senin - Jumat <br />
                    08.00 - 16.00 WIB
                  </p>
                </div>

                <div className="contact-premium-box">
                  <div className="premium-circle premium-circle-1"></div>
                  <div className="premium-circle premium-circle-2"></div>

                  <div className="premium-box-content">
                    <div className="premium-box-icon">
                      <i className="fa-solid fa-shield-halved"></i>
                    </div>

                    <h5>Laporan Aman & Terverifikasi</h5>

                    <p>
                      Setiap laporan akan diproses secara transparan dan
                      diteruskan kepada pihak terkait.
                    </p>

                    <div className="premium-feature-grid">
                      <div>
                        <strong>24 Jam</strong>
                        <span>Akses Form</span>
                      </div>

                      <div>
                        <strong>Cepat</strong>
                        <span>Diproses</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BUTTON DI DALAM BODY AGAR BISA TURUN KE BAWAH */}
                <div className="contact-team-button-wrapper">
                  <Link href="/team" className="btn-contact-team">
                    Lihat Tim Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FORM LAPORAN */}
          <div className="col-lg-8">
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h4>Formulir Laporan</h4>
                <p>Isi data laporan dengan lengkap agar mudah diverifikasi.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="contact-form-label">
                      Nama Pelapor
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      className={`form-control contact-input ${
                        errors.nama ? "is-invalid" : ""
                      }`}
                      placeholder="Masukkan nama"
                    />
                    {errors.nama && (
                      <div className="contact-error">{errors.nama}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="contact-form-label">
                      Lokasi Kejadian
                    </label>
                    <input
                      type="text"
                      name="lokasi"
                      value={form.lokasi}
                      onChange={handleChange}
                      className={`form-control contact-input ${
                        errors.lokasi ? "is-invalid" : ""
                      }`}
                      placeholder="Masukkan lokasi"
                    />
                    {errors.lokasi && (
                      <div className="contact-error">{errors.lokasi}</div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSearchLocation}
                  className="btn-contact-map"
                  disabled={loadingMap}
                >
                  {loadingMap ? "Mencari Lokasi..." : "Cari Lokasi di Map"}
                </button>

                <div className="contact-map-wrapper">
                  <MapPicker
                    position={position}
                    onSelect={handleSelectMap}
                  />
                </div>

                <div className="mb-3">
                  <label className="contact-form-label">
                    Deskripsi Laporan
                  </label>
                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    className={`form-control contact-input ${
                      errors.deskripsi ? "is-invalid" : ""
                    }`}
                    rows={4}
                    placeholder="Tuliskan detail laporan"
                  ></textarea>
                  {errors.deskripsi && (
                    <div className="contact-error">{errors.deskripsi}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="contact-form-label">
                    Upload Foto Bukti
                  </label>
                  <input
                    type="file"
                    name="foto"
                    onChange={handleChange}
                    className={`form-control contact-input ${
                      errors.foto ? "is-invalid" : ""
                    }`}
                    accept="image/*"
                  />
                  {errors.foto && (
                    <div className="contact-error">{errors.foto}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-contact-submit"
                  disabled={loading}
                >
                  {loading ? "Mengirim Laporan..." : "Kirim Laporan"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}