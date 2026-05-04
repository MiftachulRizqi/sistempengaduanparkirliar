"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";
import Link from "next/link";
import FloatingAlert from "@/components/FloatingAlert";
import SubmitButton from "./SubmitButton";
import { createLaporanAction } from "./actions";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, } from "react-icons/fa";
import {
  initialLaporanActionState,
  type LaporanFieldErrors,
} from "./actionTypes";


const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
});

type FormState = {
  nama: string;
  lokasi: string;
  deskripsi: string;
  foto: File | null;
};

type AlertState = {
  open: boolean;
  type: "success" | "info" | "error";
  title: string;
  message: string;
};

const INITIAL_FORM_STATE: FormState = {
  nama: "",
  lokasi: "",
  deskripsi: "",
  foto: null,
};

const INITIAL_ALERT_STATE: AlertState = {
  open: false,
  type: "info",
  title: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);

  const [position, setPosition] = useState<LatLngExpression>([
    -7.2575,
    112.7521,
  ]);

  const [errors, setErrors] = useState<LaporanFieldErrors>({});
  const [loadingMap, setLoadingMap] = useState(false);
  const [alertState, setAlertState] =
    useState<AlertState>(INITIAL_ALERT_STATE);

  const [actionState, formAction, isPending] = useActionState(
    createLaporanAction,
    initialLaporanActionState
  );

const inputClass = (hasError?: boolean) =>
  `
    w-full rounded-2xl border bg-white px-4 py-3
    text-[15px] text-[#17332e]
    shadow-sm outline-none transition-all duration-200
    placeholder:text-[#8b9b97]
    focus:border-red-600 focus:ring-4 focus:ring-red-600/10
    disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70
    ${hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-300"}
  `;

  const labelClass =
  "mb-2 block text-[15px] font-bold text-[#17332e]";

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const closeAlertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHandledSubmission = useRef<number | undefined>(undefined);

  const showAlert = useCallback((payload: Omit<AlertState, "open">) => {
    setAlertState({
      open: true,
      ...payload,
    });
  }, []);

  const closeAlert = useCallback(() => {
    setAlertState((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  const clearCloseAlertTimer = useCallback(() => {
    if (closeAlertTimer.current) {
      clearTimeout(closeAlertTimer.current);
      closeAlertTimer.current = null;
    }
  }, []);

  const closeAlertAfter = useCallback(
    (duration: number) => {
      clearCloseAlertTimer();

      closeAlertTimer.current = setTimeout(() => {
        closeAlert();
      }, duration);
    },
    [clearCloseAlertTimer, closeAlert]
  );

  useEffect(() => {
    return () => {
      clearCloseAlertTimer();
    };
  }, [clearCloseAlertTimer]);

  useEffect(() => {
    if (isPending) {
      clearCloseAlertTimer();

      showAlert({
        type: "info",
        title: "Mengirim laporan...",
        message:
          "Mohon menunggu, laporan Anda segera dikirim. Jangan tutup halaman ini.",
      });
    }
  }, [isPending, clearCloseAlertTimer, showAlert]);

  useEffect(() => {
    if (!actionState.submittedAt) return;

    if (lastHandledSubmission.current === actionState.submittedAt) return;

    lastHandledSubmission.current = actionState.submittedAt;

    if (actionState.status === "success") {
      showAlert({
        type: "success",
        title: actionState.title,
        message: actionState.message,
      });

      setForm(INITIAL_FORM_STATE);
      setErrors({});

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      closeAlertAfter(2600);
      return;
    }

    if (actionState.status === "error") {
      showAlert({
        type: "error",
        title: actionState.title,
        message: actionState.message,
      });

      setErrors(actionState.fieldErrors || {});
      closeAlertAfter(3200);
    }
  }, [actionState, showAlert, closeAlertAfter]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      setForm((prev) => ({
        ...prev,
        foto: target.files?.[0] || null,
      }));
    } else {
      const { name, value } = target;

      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [target.name]: "",
    }));
  };

  const validateClient = () => {
    const newErrors: LaporanFieldErrors = {};

    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi";
    if (!form.lokasi.trim()) newErrors.lokasi = "Lokasi wajib diisi";
    if (!form.deskripsi.trim()) newErrors.deskripsi = "Deskripsi wajib diisi";
    if (!form.foto) newErrors.foto = "Foto wajib diupload";

    if (form.foto && form.foto.size > 5 * 1024 * 1024) {
      newErrors.foto = "Ukuran foto maksimal 5 MB";
    }

    if (form.foto && !form.foto.type.startsWith("image/")) {
      newErrors.foto = "File harus berupa gambar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isPending) {
      e.preventDefault();
      return;
    }

    if (!validateClient()) {
      e.preventDefault();

      showAlert({
        type: "error",
        title: "Data belum lengkap",
        message: "Lengkapi semua data laporan sebelum mengirim.",
      });

      closeAlertAfter(2800);
    }
  };

  const handleSearchLocation = async () => {
    if (isPending) return;

    if (!form.lokasi.trim()) {
      showAlert({
        type: "error",
        title: "Lokasi belum diisi",
        message:
          "Masukkan lokasi kejadian terlebih dahulu sebelum mencari di map.",
      });

      closeAlertAfter(2500);
      return;
    }

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
        showAlert({
          type: "error",
          title: "Lokasi tidak ditemukan",
          message:
            "Coba gunakan nama jalan, kecamatan, atau kota yang lebih spesifik.",
        });

        closeAlertAfter(3000);
      }
    } catch {
      showAlert({
        type: "error",
        title: "Gagal mencari lokasi",
        message: "Terjadi kendala saat mencari lokasi. Silakan coba lagi.",
      });

      closeAlertAfter(3000);
    } finally {
      setLoadingMap(false);
    }
  };

  const handleSelectMap = async (lat: number, lon: number) => {
    if (isPending) return;

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

      setForm((prev) => ({
        ...prev,
        lokasi: data.display_name || "Lokasi tidak ditemukan",
      }));

      setPosition([lat, lon]);
    } catch {
      showAlert({
        type: "error",
        title: "Gagal mengambil alamat",
        message:
          "Alamat dari titik map belum berhasil diambil. Silakan coba lagi.",
      });

      closeAlertAfter(3000);
    } finally {
      setLoadingMap(false);
    }
  };

  return (
    <>
      <FloatingAlert
        open={alertState.open}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
      />

      <section className="bg-[#f4f6f5] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl !font-bold tracking-tight text-[#111827] md:text-4xl">
              Hubungi & Laporkan
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[#6b7280]">
              Laporkan parkir liar dengan mudah, cepat, dan transparan.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.6fr]">
            <div>
              <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <div className="flex min-h-[190px] items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(255,0,4,0.16),transparent_35%),linear-gradient(135deg,#ffffff,rgba(255,0,4,0.08))] p-5 md:min-h-[220px] md:p-6">
                  <img
                    src="/image/CONTACT.png"
                    alt="Contact"
                    className="max-h-[170px] w-full object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.14)] md:max-h-[200px]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h4 className="mb-2 text-2xl font-extrabold text-red-600">
                    Hubungi Kami
                  </h4>

                  <p className="mb-5 text-sm leading-relaxed text-gray-500">
                    Jika mengalami kendala, hubungi kami melalui kontak berikut atau kirim
                    laporan melalui form.
                  </p>

                  <div className="mb-5 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <FaPhoneAlt className="text-sm" />
                      </div>

                      <div>
                        <h6 className="mb-1 text-sm font-bold text-gray-900">Telepon</h6>
                        <p className="mb-0 text-sm text-gray-500">0896-7754-3220</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <FaEnvelope className="text-sm" />
                      </div>

                      <div>
                        <h6 className="mb-1 text-sm font-bold text-gray-900">Email</h6>
                        <p className="mb-0 break-all text-sm text-gray-500">
                          info@pengaduanparkirliar.id
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <FaMapMarkerAlt className="text-sm" />
                      </div>

                      <div>
                        <h6 className="mb-1 text-sm font-bold text-gray-900">Lokasi</h6>
                        <p className="mb-0 text-sm text-gray-500">Surabaya</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 rounded-2xl border border-red-100 bg-red-50/60 px-4 py-3">
                    <p className="mb-1 text-sm font-bold text-red-600">
                      Jam Layanan
                    </p>
                    <p className="mb-0 text-sm leading-relaxed text-gray-600">
                      Senin - Jumat <br />
                      08.00 - 16.00 WIB
                    </p>
                  </div>

                  <div className="relative mb-5 overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white px-4 py-4">
                    <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-red-100/60"></div>

                    <div className="relative">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <FaShieldAlt className="text-base" />
                      </div>

                      <h5 className="mb-1 text-base font-bold text-gray-900">
                        Laporan Aman & Terverifikasi
                      </h5>

                      <p className="mb-4 text-sm leading-relaxed text-gray-500">
                        Setiap laporan akan diproses secara transparan dan diteruskan kepada
                        pihak terkait.
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-white px-3 py-2 shadow-sm">
                          <strong className="block text-sm font-bold text-red-600">
                            24 Jam
                          </strong>
                          <span className="text-xs text-gray-500">
                            Akses Form
                          </span>
                        </div>

                        <div className="rounded-xl bg-white px-3 py-2 shadow-sm">
                          <strong className="block text-sm font-bold text-red-600">
                            Cepat
                          </strong>
                          <span className="text-xs text-gray-500">
                            Diproses
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                <Link
                  href="/team"
                  className={`mt-auto inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white !no-underline hover:!no-underline shadow-[0_14px_30px_rgba(220,38,38,0.28)] transition hover:bg-red-700 hover:text-white hover:shadow-[0_18px_36px_rgba(220,38,38,0.34)] ${
                    isPending ? "pointer-events-none opacity-60" : ""
                  }`}
                  aria-disabled={isPending}
                  tabIndex={isPending ? -1 : 0}
                  onClick={(e) => {
                    if (isPending) e.preventDefault();
                  }}
                
                >
                  Lihat Tim Kami
                </Link>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-[28px] border border-black/5 bg-white px-5 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:px-7 md:py-5">
                <div className="mb-8 text-center">
                  <h4 className="mb-2 text-2xl !font-bold text-[#111827]">
                    Formulir Laporan
                  </h4>
                  <p className="text-sm leading-relaxed text-[#6b7280]">
                    Isi data laporan dengan lengkap agar mudah diverifikasi.
                  </p>
                </div>

                <form
                  action={formAction}
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    pointerEvents: isPending ? "none" : "auto",
                    opacity: isPending ? 0.72 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>Nama Pelapor</label>
                      <input
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        disabled={isPending}
                        className={inputClass(!!errors.nama)}
                        placeholder="Masukkan nama"
                      />
                      {errors.nama && <div className="mt-2 text-sm font-medium text-red-600">{errors.nama}</div>}
                    </div>

                    <div>
                      <label className={labelClass}>Lokasi Kejadian</label>
                      <input
                        type="text"
                        name="lokasi"
                        value={form.lokasi}
                        onChange={handleChange}
                        disabled={isPending}
                        className={inputClass(!!errors.lokasi)}
                        placeholder="Masukkan lokasi"
                      />
                      {errors.lokasi && <div className="mt-2 text-sm font-medium text-red-600">{errors.lokasi}</div>}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSearchLocation}
                    disabled={loadingMap || isPending}
                    className="
                      mt-4 mb-4 inline-flex w-full items-center justify-center gap-2
                      !rounded-xl border border-red-600 bg-white
                      px-5 py-3 text-sm font-bold text-red-600
                      shadow-sm transition-all duration-200

                      hover:-translate-y-0.5 
                      hover:!bg-red-600 hover:!text-white 
                      hover:shadow-[0_16px_30px_rgba(220,38,38,0.35)]

                      active:scale-[0.98]

                      disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0
                    "
                  >
                    {loadingMap && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                    )}

                    <span>{loadingMap ? "Mencari Lokasi..." : "Cari Lokasi di Map"}</span>
                  </button>

                  <div className="mt-2 mb-4 rounded-2xl overflow-hidden">
                    <MapPicker position={position} onSelect={handleSelectMap} />
                  </div>

                  <div className="mb-3">
                    <label className={labelClass}>Deskripsi Laporan</label>
                    <textarea
                      name="deskripsi"
                      value={form.deskripsi}
                      onChange={handleChange}
                      disabled={isPending}
                      className={`${inputClass(!!errors.deskripsi)} min-h-[150px] resize-y`}
                      rows={4}
                      placeholder="Tuliskan detail laporan"
                    />
                    {errors.deskripsi && (
                      <div className="mt-2 text-sm font-medium text-red-600">
                        {errors.deskripsi}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className={labelClass}>Upload Foto Bukti</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="foto"
                      onChange={handleChange}
                      disabled={isPending}
                      className={`
                        w-full cursor-pointer rounded-2xl border bg-white
                        text-[15px] text-[#17332e]
                        shadow-sm transition-all duration-200
                        file:mr-5 file:border-0 file:bg-gray-100 file:px-5 file:py-3.5
                        file:text-sm file:font-semibold file:text-[#17332e]
                        hover:file:bg-gray-200
                        focus:border-[#1b8f6b] focus:outline-none focus:ring-4 focus:ring-[#1b8f6b]/10
                        disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70
                        ${errors.foto ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-300"}
                      `}
                      accept="image/*"
                    />
                    {errors.foto && (
                      <div className="mt-2 text-sm font-medium text-red-600">
                        {errors.foto}
                      </div>
                    )}
                  </div>

                  <SubmitButton disabled={loadingMap} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
