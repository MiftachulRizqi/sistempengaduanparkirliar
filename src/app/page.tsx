"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Home() {

  useEffect(() => {

    // INTERSECTION OBSERVER
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statistikSection = document.getElementById('statistik');
    if (statistikSection) observer.observe(statistikSection);

    function animateStats() {
      const stats = [
        { id: 'count1', target: 120, duration: 2000 },
        { id: 'count2', target: 80, duration: 2000 },
        { id: 'count3', target: 40, duration: 2000 }
      ];

      stats.forEach((stat, index) => {
        const element = document.getElementById(stat.id);
        const circles = document.querySelectorAll<SVGCircleElement>('.progress-circle');
        const progressCircle = circles[index];

        if (!element || !progressCircle) return;

        let start = 0;
        const increment = Math.ceil(stat.target / (stat.duration / 16));

        const counter = setInterval(() => {
          start += increment;
          if (start >= stat.target) {
            start = stat.target;
            clearInterval(counter);
          }
          element.textContent = String(start);
        }, 16);

        const max = 120;
        const percentage = (stat.target / max) * 100;
        const offset = 440 - (440 * percentage / 100);

        setTimeout(() => {
          progressCircle.style.strokeDashoffset = String(offset);
        }, 300);
      });
    }

    // TOGGLE ICON
    const btnIcon = document.getElementById('btnIcon');
    const formLaporan = document.getElementById('formLaporan');

    const showHandler = () => {
      btnIcon?.classList.replace('fa-chevron-down', 'fa-chevron-up');
    };

    const hideHandler = () => {
      btnIcon?.classList.replace('fa-chevron-up', 'fa-chevron-down');
    };

    formLaporan?.addEventListener('show.bs.collapse', showHandler);
    formLaporan?.addEventListener('hide.bs.collapse', hideHandler);

    // NAV ACTIVE
    const navLinks = document.querySelectorAll<HTMLElement>('.nav-link');

    const navHandler = (e: Event) => {
      navLinks.forEach(l => l.classList.remove('active'));
      (e.currentTarget as HTMLElement).classList.add('active');
    };

    navLinks.forEach(link => {
      link.addEventListener('click', navHandler);
    });

    // BUTTON SCROLL
    const btnLapor = document.getElementById('btn-lapor');

    const scrollHandler = () => {
      window.location.href = '#cta-section';
    };

    btnLapor?.addEventListener('click', scrollHandler);

    // CLEANUP (PENTING 🔥)
    return () => {
      observer.disconnect();

      formLaporan?.removeEventListener('show.bs.collapse', showHandler);
      formLaporan?.removeEventListener('hide.bs.collapse', hideHandler);

      navLinks.forEach(link => {
        link.removeEventListener('click', navHandler);
      });

      btnLapor?.removeEventListener('click', scrollHandler);
    };

  }, []);

  return (
    <main>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Laporkan Parkir Liar<br />dengan <span className="text-danger">Mudah & Cepat</span>
              </h1>

              <p className="lead mb-5 moto">
                Bantu ciptakan jalan yang tertib dan nyaman untuk semua pengguna jalan
              </p>

              <div className="d-flex gap-3">
                <Link href="/contact" className="btn btn-lapor btn-lg">
                  Laporkan Sekarang
                </Link>
                <Link href="/services" className="btn btn-outline-danger btn-lihat btn-lg">
                  Lihat Laporan
                </Link>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="/image/Asset 1jukir 1.png"
                className="img-fluid"
                style={{ maxHeight: "420px" }}
                alt="Ilustrasi Parkir"
              />
            </div>

          </div>
        </div>
      </section>

      {/* KENAPA */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 section-title fw-bold">
            Kenapa Harus Melapor?
          </h2>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="card h-100 text-center icon-box border-0 shadow-sm p-4">
                <img src="/image/MOBIL 1.png" className="mx-auto mb-3" alt="" />
                <h5 className="fw-semibold">Mewujudkan Kota Tertib</h5>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 text-center icon-box border-0 shadow-sm p-4">
                <img src="/image/ORANG JALAN 1.png" className="mx-auto mb-3" alt="" />
                <h5 className="fw-semibold">Menjaga Kenyamanan</h5>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 text-center icon-box border-0 shadow-sm p-4">
                <img src="/image/MONEY 1.png" className="mx-auto mb-3" alt="" />
                <h5 className="fw-semibold">Mencegah Pungli</h5>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}