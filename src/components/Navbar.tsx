"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaClipboardList,
  FaPen,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { logoutAction } from "@/app/login/actions";
import Image from "next/image";


type AuthInfo = {
  isLoggedIn: boolean;
  nama: string;
  email: string;
  role: "user" | "admin" | "";
};

function getCookieValue(name: string) {
  if (typeof document === "undefined") return "";

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  }

  return "";
}

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement | null>(null);

  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    isLoggedIn: false,
    nama: "",
    email: "",
    role: "",
  });

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Service", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const readAuthCookieTimer = setTimeout(() => {
      const token = getCookieValue("auth-token");
      const role = getCookieValue("auth-role") as AuthInfo["role"];
      const email =
        getCookieValue("auth-email") || getCookieValue("auth-username");
      const nama = getCookieValue("auth-name");

      setAuthInfo({
        isLoggedIn: token === "logged-in",
        role,
        email,
        nama,
      });
    }, 0);

    return () => {
      clearTimeout(readAuthCookieTimer);
    };
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentPath = pathname || "/";
  const safeNext = currentPath.startsWith("/login") ? "/" : currentPath;

  const loginHref = `/login?next=${encodeURIComponent(safeNext)}`;
  const registerHref = `/login?mode=register&next=${encodeURIComponent(
    safeNext
  )}`;

  const reportHref = authInfo.role === "admin" ? "/admin" : "/contact";
  const historyHref = "/services#riwayat-laporan";

  return (
    <nav className="sticky top-0 z-[9999] bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-bold text-gray-900 !no-underline hover:!no-underline"
        >
          <Image
            src="/image/logo.png"
            alt="Logo"
            width={44}
            height={44}
            className="h-11 w-11"
          />

          <span className="text-sm font-bold sm:text-base">
            PENGADUAN PARKIR LIAR
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="text-2xl">{isOpen ? "×" : "☰"}</span>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          <ul className="m-0 flex list-none items-center gap-4 p-0">
            {navLinks.map((link) => (
              <li key={link.href} className="group">
                <Link
                  href={link.href}
                  className={`relative px-2 py-2 text-sm font-semibold !no-underline hover:!no-underline ${
                    isActive(link.href)
                      ? "text-red-600"
                      : "text-gray-600 hover:text-red-600 hover:tracking-wide"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute left-1/2 -bottom-1 h-[2.5px] w-4 -translate-x-1/2 rounded-full bg-red-600 ${
                      isActive(link.href)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {!authInfo.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href={loginHref}
                className="rounded-md border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 !no-underline hover:bg-red-600 hover:text-white hover:!no-underline"
              >
                Masuk
              </Link>

              <Link
                href={registerHref}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white !no-underline shadow-md hover:bg-red-700 hover:text-white hover:!no-underline"
              >
                Daftar
              </Link>
            </div>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white px-2 py-1.5 shadow-sm hover:bg-gray-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white">
                  <FaUserCircle className="text-lg" />
                </span>

                <span className="hidden max-w-[120px] truncate text-sm font-bold text-gray-900 xl:block">
                  {authInfo.nama || "Profil"}
                </span>

                <FaChevronDown
                  className={`mr-1 text-xs text-gray-500 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
                  <div className="border-b border-gray-100 px-5 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_12px_28px_rgba(220,38,38,0.25)]">
                        <FaUserCircle className="text-3xl" />
                      </div>

                      <div className="min-w-0">
                        <h4 className="truncate text-base font-extrabold text-gray-900">
                          {authInfo.nama || "Pengguna"}
                        </h4>

                        <p className="truncate text-sm font-medium text-gray-500">
                          {authInfo.email || "email belum tersedia"} ~{" "}
                          <span className="capitalize">
                            {authInfo.role || "user"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3">
                    <Link
                      href={reportHref}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 !no-underline hover:bg-gray-50 hover:text-gray-900 hover:!no-underline"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <FaPen />
                      </span>

                      <span>
                        {authInfo.role === "admin"
                          ? "Buka Dashboard"
                          : "Buat Laporan"}
                      </span>
                    </Link>

                    <Link
                      href={historyHref}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 !no-underline hover:bg-gray-50 hover:text-gray-900 hover:!no-underline"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <FaClipboardList />
                      </span>

                      <span>Lihat Riwayat Laporan</span>
                    </Link>

                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                          <FaSignOutAlt />
                        </span>

                        <span>Logout</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 lg:hidden">
          <ul className="m-0 list-none space-y-1 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium !no-underline hover:!no-underline ${
                    isActive(link.href)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {!authInfo.isLoggedIn ? (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href={loginHref}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-md border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 !no-underline hover:bg-red-600 hover:text-white hover:!no-underline"
              >
                Masuk
              </Link>

              <Link
                href={registerHref}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white !no-underline hover:bg-red-700 hover:text-white hover:!no-underline"
              >
                Daftar
              </Link>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                  <FaUserCircle className="text-2xl" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-gray-900">
                    {authInfo.nama || "Pengguna"}
                  </p>

                  <p className="truncate text-xs font-semibold text-gray-500">
                    {authInfo.email || "email belum tersedia"} ~ {authInfo.role}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href={reportHref}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white !no-underline hover:bg-red-700 hover:text-white hover:!no-underline"
                >
                  {authInfo.role === "admin" ? "Dashboard" : "Buat Laporan"}
                </Link>

                <Link
                  href={historyHref}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 !no-underline hover:bg-gray-50 hover:text-gray-900 hover:!no-underline"
                >
                  Riwayat Laporan
                </Link>

                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}