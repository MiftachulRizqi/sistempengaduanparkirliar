import Link from "next/link";

const reportMenus = [
  {
    label: "Semua Laporan",
    href: "/admin",
    icon: "fa-solid fa-folder-open",
  },
  {
    label: "Menunggu",
    href: "/admin?status=Menunggu",
    icon: "fa-regular fa-clock",
  },
  {
    label: "Diproses",
    href: "/admin?status=Diproses",
    icon: "fa-solid fa-spinner",
  },
  {
    label: "Selesai",
    href: "/admin?status=Selesai",
    icon: "fa-solid fa-circle-check",
  },
];

const monitoringMenus = [
  {
    label: "Peta Laporan",
    href: "/admin/peta-laporan",
    icon: "fa-solid fa-map-location-dot",
  },
  {
    label: "Statistik",
    href: "/admin/statistik",
    icon: "fa-solid fa-chart-pie",
  },
];

const managementMenus = [
  {
    label: "Data Pelapor",
    href: "/admin/pelapor",
    icon: "fa-solid fa-users",
  },
  {
    label: "Lokasi Rawan",
    href: "/admin/lokasi-rawan",
    icon: "fa-solid fa-location-dot",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-200 bg-white px-6 py-6 lg:block">
      {/* BRAND */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-200">
          <i className="fa-solid fa-shield-halved text-xl"></i>
        </div>

        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            Admin Panel
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Pengaduan Parkir
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="space-y-7">
        {/* MAIN */}
        <div>
          <p className="mb-3 px-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Utama
          </p>

          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 no-underline transition hover:bg-red-100"
          >
            <i className="fa-solid fa-chart-line w-5"></i>
            Dashboard
          </Link>
        </div>

        {/* REPORTS */}
        <div>
          <p className="mb-3 px-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Kelola Laporan
          </p>

          <div className="space-y-1">
            {reportMenus.map((menu) => (
              <Link
                key={menu.label}
                href={menu.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 no-underline transition hover:bg-slate-50 hover:text-red-600"
              >
                <i className={`${menu.icon} w-5`}></i>
                {menu.label}
              </Link>
            ))}
          </div>
        </div>

        {/* MONITORING */}
        <div>
          <p className="mb-3 px-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Monitoring
          </p>

          <div className="space-y-1">
            {monitoringMenus.map((menu) => (
              <Link
                key={menu.label}
                href={menu.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 no-underline transition hover:bg-slate-50 hover:text-red-600"
              >
                <i className={`${menu.icon} w-5`}></i>
                {menu.label}
              </Link>
            ))}
          </div>
        </div>

        {/* MANAGEMENT */}
        <div>
          <p className="mb-3 px-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Manajemen Data
          </p>

          <div className="space-y-1">
            {managementMenus.map((menu) => (
              <Link
                key={menu.label}
                href={menu.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 no-underline transition hover:bg-slate-50 hover:text-red-600"
              >
                <i className={`${menu.icon} w-5`}></i>
                {menu.label}
              </Link>
            ))}
          </div>
        </div>

        {/* SETTINGS */}
        <div>
          <p className="mb-3 px-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Sistem
          </p>

          <div className="space-y-1">
            <Link
              href="/admin/pengaturan"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 no-underline transition hover:bg-slate-50 hover:text-red-600"
            >
              <i className="fa-solid fa-gear w-5"></i>
              Pengaturan
            </Link>

            <Link
              href="/"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 no-underline transition hover:bg-slate-50 hover:text-red-600"
            >
              <i className="fa-solid fa-right-from-bracket w-5"></i>
              Keluar
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
}