"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <img src="/image/logo.png" className="me-2" width="45" />
          <span>PENGADUAN PARKIR LIAR</span>
        </Link>

        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">

            <li>
              <Link className={`nav-link ${isActive("/") ? "active" : ""}`} href="/">
                Home
              </Link>
            </li>

            <li>
              <Link className={`nav-link ${isActive("/about") ? "active" : ""}`} href="/about">
                About
              </Link>
            </li>

            <li>
              <Link className={`nav-link ${isActive("/services") ? "active" : ""}`} href="/services">
                Service
              </Link>
            </li>

            <li>
              <Link className={`nav-link ${isActive("/contact") ? "active" : ""}`} href="/contact">
                Contact
              </Link>
            </li>

          </ul>

          <div className="ms-3">
            <button className="btn btn-outline-danger me-2">Masuk</button>
            <button className="btn btn-daftar">Daftar</button>
          </div>
        </div>
      </div>
    </nav>
  );
}