"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Service", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-bold text-gray-900 !no-underline hover:!no-underline"
        >
          <img src="/image/logo.png" alt="Logo" className="h-11 w-11" />
          <span className="text-sm font-bold sm:text-base">
            PENGADUAN PARKIR LIAR
          </span>
        </Link>

        {/* TOGGLE MOBILE */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-2xl">{isOpen ? "×" : "☰"}</span>
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-6 lg:flex">

          {/* NAV LINKS */}
          <ul className="m-0 flex list-none items-center gap-4 p-0">
            {navLinks.map((link) => (
              <li key={link.href} className="group">
                <Link
                  href={link.href}
                  className={`relative px-2 py-2 text-sm font-semibold transition-all duration-300
                  ${
                    isActive(link.href)
                      ? "text-red-600"
                      : "text-gray-600 hover:text-red-600 hover:tracking-wide"
                  }`}
                >
                  {link.label}

                  {/* UNDERLINE */}
                  <span
                    className={`absolute left-1/2 -bottom-1 h-[2.5px] w-4 -translate-x-1/2 rounded-full bg-red-600 transition-all duration-300
                    ${
                      isActive(link.href)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* BUTTON */}
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white">
              Masuk
            </button>

            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700">
              Daftar
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 lg:hidden">
          <ul className="m-0 list-none space-y-1 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-300
                  ${
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

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="rounded-md border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 transition-colors duration-300 hover:bg-red-600 hover:text-white">
              Masuk
            </button>

            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-red-700">
              Daftar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}