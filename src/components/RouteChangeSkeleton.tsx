"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import AdminPageSkeleton from "@/app/admin/components/AdminPageSkeleton";

type LoadingRoute =
  | "home"
  | "services"
  | "contact"
  | "login"
  | "admin-dashboard"
  | "admin-map"
  | "admin-stats"
  | "admin-pelapor"
  | "admin-lokasi"
  | "admin-settings"
  | "admin-detail";

function getRouteType(pathname: string): LoadingRoute {
  if (pathname.startsWith("/admin/peta-laporan")) return "admin-map";
  if (pathname.startsWith("/admin/statistik")) return "admin-stats";
  if (pathname.startsWith("/admin/pelapor")) return "admin-pelapor";
  if (pathname.startsWith("/admin/lokasi-rawan")) return "admin-lokasi";
  if (pathname.startsWith("/admin/pengaturan")) return "admin-settings";
  if (pathname.startsWith("/admin/laporan")) return "admin-detail";
  if (pathname.startsWith("/admin")) return "admin-dashboard";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/login")) return "login";
  return "home";
}

function ServicesSkeleton() {
  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-gray-50">
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse text-center">
          <div className="mx-auto mb-3 h-12 w-72 rounded-2xl bg-gray-200 md:h-14 md:w-96" />
          <div className="mx-auto mb-12 h-5 w-full max-w-lg rounded-full bg-gray-200" />

          <div className="mb-14 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-full rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
              >
                <div className="mx-auto mb-4 h-20 w-24 rounded-2xl bg-gray-200" />
                <div className="mx-auto mb-3 h-6 w-36 rounded-xl bg-gray-200" />
                <div className="mx-auto mb-2 h-4 w-full max-w-[220px] rounded-full bg-gray-200" />
                <div className="mx-auto h-4 w-4/5 max-w-[190px] rounded-full bg-gray-200" />
              </div>
            ))}
          </div>

          <div className="mx-auto mb-8 h-10 w-56 rounded-2xl bg-gray-200 md:w-72" />

          <div className="mb-14 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-full rounded-[24px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
              >
                <div className="mx-auto mb-4 h-9 w-9 rounded-full bg-gray-200" />
                <div className="mx-auto mb-4 h-[70px] w-24 rounded-2xl bg-gray-200" />
                <div className="mx-auto mb-3 h-5 w-36 rounded-xl bg-gray-200" />
                <div className="mx-auto mb-2 h-4 w-full max-w-[220px] rounded-full bg-gray-200" />
                <div className="mx-auto h-4 w-4/5 max-w-[190px] rounded-full bg-gray-200" />
              </div>
            ))}
          </div>

          <div className="rounded-[28px] bg-white p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.06)] md:p-8">
            <div className="mx-auto mb-4 h-8 w-36 rounded-full bg-gray-200" />
            <div className="mx-auto mb-3 h-8 w-full max-w-lg rounded-2xl bg-gray-200 md:h-10" />
            <div className="mx-auto mb-6 h-4 w-full max-w-2xl rounded-full bg-gray-200" />

            <div className="mx-auto grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="h-12 rounded-lg bg-gray-200" />
              <div className="h-12 rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactSkeleton() {
  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#f4f6f5]">
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-3 h-10 w-72 rounded-2xl bg-gray-200 md:h-12 md:w-96" />
            <div className="mx-auto h-5 w-full max-w-2xl rounded-full bg-gray-200" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.6fr]">
            <div>
              <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                <div className="flex min-h-[190px] items-center justify-center bg-gray-100 p-5 md:min-h-[220px] md:p-6">
                  <div className="h-[170px] w-full max-w-[260px] rounded-[24px] bg-gray-200 md:h-[200px]" />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="mb-3 h-8 w-44 rounded-2xl bg-gray-200" />

                  <div className="mb-5 space-y-2">
                    <div className="h-4 w-full rounded-full bg-gray-200" />
                    <div className="h-4 w-4/5 rounded-full bg-gray-200" />
                  </div>

                  <div className="mb-5 space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-start gap-4">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

                        <div className="flex-1">
                          <div className="mb-2 h-4 w-24 rounded-full bg-gray-200" />
                          <div className="h-4 w-40 rounded-full bg-gray-200" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4 rounded-2xl border border-red-100 bg-red-50/60 px-4 py-3">
                    <div className="mb-2 h-4 w-28 rounded-full bg-gray-200" />
                    <div className="mb-2 h-4 w-36 rounded-full bg-gray-200" />
                    <div className="h-4 w-32 rounded-full bg-gray-200" />
                  </div>

                  <div className="relative mb-5 overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white px-4 py-4">
                    <div className="mb-3 h-10 w-10 rounded-full bg-gray-200" />
                    <div className="mb-2 h-5 w-52 rounded-xl bg-gray-200" />

                    <div className="mb-4 space-y-2">
                      <div className="h-4 w-full rounded-full bg-gray-200" />
                      <div className="h-4 w-4/5 rounded-full bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white px-3 py-2 shadow-sm">
                        <div className="mb-2 h-4 w-14 rounded-full bg-gray-200" />
                        <div className="h-3 w-20 rounded-full bg-gray-200" />
                      </div>

                      <div className="rounded-xl bg-white px-3 py-2 shadow-sm">
                        <div className="mb-2 h-4 w-14 rounded-full bg-gray-200" />
                        <div className="h-3 w-20 rounded-full bg-gray-200" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto h-12 w-full rounded-xl bg-gray-200" />
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-[28px] border border-black/5 bg-white px-5 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:px-7 md:py-5">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-3 h-8 w-56 rounded-2xl bg-gray-200" />
                  <div className="mx-auto h-4 w-full max-w-md rounded-full bg-gray-200" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="mb-2 h-5 w-32 rounded-full bg-gray-200" />
                    <div className="h-12 rounded-2xl bg-gray-200" />
                  </div>

                  <div>
                    <div className="mb-2 h-5 w-36 rounded-full bg-gray-200" />
                    <div className="h-12 rounded-2xl bg-gray-200" />
                  </div>
                </div>

                <div className="mt-4 mb-4 h-12 w-full rounded-xl bg-gray-200" />

                <div className="mt-2 mb-4 h-[300px] overflow-hidden rounded-2xl bg-gray-200" />

                <div className="mb-3">
                  <div className="mb-2 h-5 w-40 rounded-full bg-gray-200" />
                  <div className="h-[150px] rounded-2xl bg-gray-200" />
                </div>

                <div className="mb-4">
                  <div className="mb-2 h-5 w-36 rounded-full bg-gray-200" />
                  <div className="h-12 rounded-2xl bg-gray-200" />
                </div>

                <div className="h-12 w-full rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#f4f6f5]">
      <div className="min-h-screen animate-pulse">
        <section className="bg-white px-4 pt-10 pb-16 md:px-6 md:pt-14 md:pb-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-5 h-12 w-full max-w-xl rounded-2xl bg-gray-200 md:h-16" />
              <div className="mb-4 h-12 w-full max-w-lg rounded-2xl bg-gray-200 md:h-16" />

              <div className="mb-8 space-y-3">
                <div className="h-4 w-full max-w-xl rounded-full bg-gray-200" />
                <div className="h-4 w-4/5 max-w-lg rounded-full bg-gray-200" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="h-12 rounded-lg bg-gray-200" />
                <div className="h-12 rounded-lg bg-gray-200" />
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="h-[320px] w-full max-w-[520px] rounded-[32px] bg-gray-200 md:h-[420px]" />
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="mx-auto mb-4 h-9 w-72 rounded-2xl bg-gray-200 md:w-96" />
              <div className="mx-auto h-4 w-full max-w-xl rounded-full bg-gray-200" />
            </div>

            <div className="mb-10 grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
                >
                  <div className="mx-auto mb-5 h-28 w-32 rounded-2xl bg-gray-200" />
                  <div className="mx-auto h-5 w-40 rounded-full bg-gray-200" />
                </div>
              ))}
            </div>

            <div className="rounded-[28px] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.07)] md:p-7">
              <div className="mb-6 h-10 w-72 rounded-2xl bg-gray-200" />

              <div className="grid gap-6 md:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
                  >
                    <div className="h-48 bg-gray-200" />

                    <div className="p-5">
                      <div className="mb-3 h-5 w-4/5 rounded-lg bg-gray-200" />
                      <div className="mb-2 h-4 w-full rounded-full bg-gray-200" />
                      <div className="mb-5 h-4 w-2/3 rounded-full bg-gray-200" />
                      <div className="mb-5 h-7 w-24 rounded-full bg-gray-200" />
                      <div className="h-11 w-full rounded-lg bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function getAdminSkeletonVariant(pathname: string) {
  if (pathname.startsWith("/admin/peta-laporan")) return "map";
  if (pathname.startsWith("/admin/statistik")) return "stats";
  if (pathname.startsWith("/admin/pelapor")) return "pelapor";
  if (pathname.startsWith("/admin/lokasi-rawan")) return "lokasi";
  if (pathname.startsWith("/admin/pengaturan")) return "settings";
  if (pathname.startsWith("/admin/laporan")) return "detail";
  return "dashboard";
}

export default function RouteChangeSkeleton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState<LoadingRoute>("home");
  const [targetPathname, setTargetPathname] = useState(pathname);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    const showLoading = (nextPathname: string) => {
      setTargetPathname(nextPathname);
      setLoadingRoute(getRouteType(nextPathname));
      setIsLoading(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 900);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      if (!href) return;
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:")) return;
      if (href.startsWith("tel:")) return;
      if (anchor.target === "_blank") return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const url = new URL(anchor.href);
      const currentUrl = new URL(window.location.href);

      if (url.origin !== currentUrl.origin) return;

      const isSamePath =
        url.pathname === currentUrl.pathname &&
        url.search === currentUrl.search &&
        url.hash === currentUrl.hash;

      if (isSamePath) return;

      showLoading(url.pathname);
    };

    const handlePopState = () => {
      showLoading(window.location.pathname);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  if (!isLoading) return null;

  if (loadingRoute === "services") return <ServicesSkeleton />;
  if (loadingRoute === "contact") return <ContactSkeleton />;

  if (
    loadingRoute === "admin-dashboard" ||
    loadingRoute === "admin-map" ||
    loadingRoute === "admin-stats" ||
    loadingRoute === "admin-pelapor" ||
    loadingRoute === "admin-lokasi" ||
    loadingRoute === "admin-settings" ||
    loadingRoute === "admin-detail"
  ) {
    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-100">
        <AdminPageSkeleton variant={getAdminSkeletonVariant(targetPathname)} />
      </div>
    );
  }

  return <HomeSkeleton />;
}