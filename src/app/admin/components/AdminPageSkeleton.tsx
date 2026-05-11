"use client";

type AdminSkeletonVariant =
  | "dashboard"
  | "map"
  | "stats"
  | "pelapor"
  | "lokasi"
  | "settings"
  | "detail";

type AdminPageSkeletonProps = {
  variant?: AdminSkeletonVariant;
};

function AdminSidebarSkeleton() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-200 bg-white px-6 py-6 lg:block">
      <div className="mb-8 flex animate-pulse items-center gap-3">
        <div className="h-14 w-14 rounded-2xl bg-slate-200" />

        <div>
          <div className="mb-2 h-5 w-32 rounded-full bg-slate-200" />
          <div className="h-4 w-28 rounded-full bg-slate-100" />
        </div>
      </div>

      <nav className="space-y-7">
        <div className="animate-pulse">
          <div className="mb-3 h-3 w-16 rounded-full bg-slate-200" />
          <div className="h-12 rounded-2xl bg-red-100" />
        </div>

        <div className="animate-pulse">
          <div className="mb-3 h-3 w-28 rounded-full bg-slate-200" />

          <div className="space-y-2">
            <div className="h-12 rounded-2xl bg-slate-100" />
            <div className="h-12 rounded-2xl bg-slate-100" />
            <div className="h-12 rounded-2xl bg-slate-100" />
            <div className="h-12 rounded-2xl bg-slate-100" />
          </div>
        </div>

        <div className="animate-pulse">
          <div className="mb-3 h-3 w-24 rounded-full bg-slate-200" />

          <div className="space-y-2">
            <div className="h-12 rounded-2xl bg-slate-100" />
            <div className="h-12 rounded-2xl bg-slate-100" />
          </div>
        </div>

        <div className="animate-pulse">
          <div className="mb-3 h-3 w-32 rounded-full bg-slate-200" />

          <div className="space-y-2">
            <div className="h-12 rounded-2xl bg-slate-100" />
            <div className="h-12 rounded-2xl bg-slate-100" />
          </div>
        </div>

        <div className="animate-pulse">
          <div className="mb-3 h-3 w-16 rounded-full bg-slate-200" />

          <div className="space-y-2">
            <div className="h-12 rounded-2xl bg-slate-100" />
            <div className="h-12 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </nav>
    </aside>
  );
}

function MobileTopSkeleton() {
  return (
    <div className="mb-6 flex items-center justify-between gap-3 rounded-3xl bg-white px-5 py-4 shadow-sm lg:hidden">
      <div className="flex animate-pulse items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-slate-200" />

        <div>
          <div className="mb-2 h-4 w-24 rounded-full bg-slate-200" />
          <div className="h-3 w-28 rounded-full bg-slate-100" />
        </div>
      </div>

      <div className="h-11 w-11 animate-pulse rounded-2xl bg-slate-100" />
    </div>
  );
}

function HeaderSkeleton({
  shortLabel = false,
  withRightCounter = false,
}: {
  shortLabel?: boolean;
  withRightCounter?: boolean;
}) {
  return (
    <div className="mb-8 overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="relative px-6 py-7">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-red-50" />

        <div className="relative flex animate-pulse flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div
              className={`mb-3 rounded-full bg-red-100 ${
                shortLabel ? "h-4 w-32" : "h-9 w-40"
              }`}
            />
            <div className="mb-3 h-9 w-72 rounded-2xl bg-slate-200 md:w-96" />
            <div className="h-4 w-full max-w-2xl rounded-full bg-slate-100" />
          </div>

          {withRightCounter && (
            <div className="rounded-2xl bg-slate-50 px-5 py-4">
              <div className="mb-2 h-3 w-28 rounded-full bg-slate-200" />
              <div className="h-8 w-14 rounded-xl bg-red-100" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCardsSkeleton({ count = 4 }: { count?: 3 | 4 }) {
  return (
    <div
      className={`mb-8 grid gap-4 sm:grid-cols-2 ${
        count === 3 ? "xl:grid-cols-3" : "xl:grid-cols-4"
      }`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="animate-pulse">
            <div className="mb-4 h-12 w-12 rounded-2xl bg-slate-200" />
            <div className="mb-3 h-4 w-28 rounded-full bg-slate-100" />
            <div className="h-9 w-16 rounded-2xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardTableSkeleton() {
  return (
    <>
      <div className="mb-6 grid gap-3 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-[1fr_220px_auto]">
        <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-12 animate-pulse rounded-2xl bg-slate-100" />
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 md:flex-row md:items-center md:justify-between">
          <div className="animate-pulse">
            <div className="mb-2 h-6 w-48 rounded-xl bg-slate-200" />
            <div className="h-4 w-72 rounded-full bg-slate-100" />
          </div>

          <div className="h-9 w-52 animate-pulse rounded-2xl bg-slate-100" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] table-fixed border-collapse">
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-slate-500">
                <th className="w-[10%] py-4 pl-5 pr-2 font-bold">Foto</th>
                <th className="w-[14%] px-2 py-4 font-bold">Pelapor</th>
                <th className="w-[19%] px-2 py-4 font-bold">Lokasi</th>
                <th className="w-[11%] px-2 py-4 font-bold">Tanggal</th>
                <th className="w-[10%] px-2 py-4 font-bold">Status</th>
                <th className="w-[23%] px-2 py-4 font-bold">Ubah Status</th>
                <th className="w-[13%] py-4 pl-2 pr-5 font-bold">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <tr key={item}>
                  <td className="py-4 pl-5 pr-2">
                    <div className="h-14 w-20 animate-pulse rounded-2xl bg-slate-200" />
                  </td>

                  <td className="px-2 py-4">
                    <div className="mb-2 h-4 w-24 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-3 w-14 animate-pulse rounded-full bg-slate-100" />
                  </td>

                  <td className="px-2 py-4">
                    <div className="mb-2 h-3 w-full animate-pulse rounded-full bg-slate-200" />
                    <div className="h-3 w-3/4 animate-pulse rounded-full bg-slate-100" />
                  </td>

                  <td className="px-2 py-4">
                    <div className="h-4 w-20 animate-pulse rounded-full bg-slate-100" />
                  </td>

                  <td className="px-2 py-4">
                    <div className="h-7 w-20 animate-pulse rounded-full bg-slate-100" />
                  </td>

                  <td className="px-2 py-4">
                    <div className="flex gap-2">
                      <div className="h-9 w-[118px] animate-pulse rounded-xl bg-slate-100" />
                      <div className="h-9 w-16 animate-pulse rounded-xl bg-red-100" />
                    </div>
                  </td>

                  <td className="py-4 pl-2 pr-5">
                    <div className="flex gap-2">
                      <div className="h-9 w-14 animate-pulse rounded-xl bg-slate-100" />
                      <div className="h-9 w-9 animate-pulse rounded-xl bg-red-100" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-5 md:flex-row md:items-center md:justify-between">
          <div className="h-4 w-32 animate-pulse rounded-full bg-slate-100" />

          <div className="flex gap-2">
            <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-10 w-10 animate-pulse rounded-xl bg-red-100" />
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    </>
  );
}

function MapContentSkeleton() {
  return (
    <>
      <StatCardsSkeleton count={4} />

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="animate-pulse">
            <div className="mb-2 h-6 w-56 rounded-xl bg-slate-200" />
            <div className="h-4 w-full max-w-xl rounded-full bg-slate-100" />
          </div>
        </div>

        <div className="p-5">
          <div className="h-[400px] animate-pulse rounded-3xl border border-slate-100 bg-slate-200" />
        </div>
      </div>
    </>
  );
}

function StatsContentSkeleton() {
  return (
    <>
      <StatCardsSkeleton count={4} />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 animate-pulse">
            <div className="mb-2 h-6 w-40 rounded-xl bg-slate-200" />
            <div className="h-4 w-60 rounded-full bg-slate-100" />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex h-56 w-56 animate-pulse items-center justify-center rounded-full bg-slate-200">
              <div className="h-36 w-36 rounded-full bg-white" />
            </div>

            <div className="mt-8 grid w-full gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-12 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 animate-pulse">
            <div className="mb-2 h-6 w-56 rounded-xl bg-slate-200" />
            <div className="h-4 w-72 rounded-full bg-slate-100" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="mb-2 flex justify-between">
                  <div className="h-4 w-24 rounded-full bg-slate-200" />
                  <div className="h-4 w-20 rounded-full bg-slate-100" />
                </div>

                <div className="h-5 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl bg-slate-50"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="animate-pulse">
            <div className="mb-2 h-6 w-44 rounded-xl bg-slate-200" />
            <div className="h-4 w-72 rounded-full bg-slate-100" />
          </div>

          <div className="flex w-full gap-2 md:w-[380px]">
            <div className="h-12 flex-1 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-12 w-24 animate-pulse rounded-2xl bg-red-100" />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex animate-pulse items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4"
            >
              <div className="h-16 w-24 rounded-xl bg-slate-200" />
              <div className="min-w-0 flex-1">
                <div className="mb-2 h-4 w-28 rounded-full bg-slate-200" />
                <div className="h-3 w-40 rounded-full bg-slate-100" />
              </div>
              <div className="h-7 w-20 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function GroupedTableSkeleton({
  type,
}: {
  type: "pelapor" | "lokasi";
}) {
  return (
    <>
      <StatCardsSkeleton count={3} />

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="animate-pulse">
            <div className="mb-2 h-6 w-44 rounded-xl bg-slate-200" />
            <div className="h-4 w-72 rounded-full bg-slate-100" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="bg-slate-50 text-left text-sm text-slate-500">
                <th className="px-6 py-4 font-bold">
                  {type === "pelapor" ? "Pelapor" : "Peringkat"}
                </th>
                <th className="px-6 py-4 font-bold">
                  {type === "pelapor" ? "Total Laporan" : "Lokasi"}
                </th>
                <th className="px-6 py-4 font-bold">
                  {type === "pelapor" ? "Lokasi Terakhir" : "Total Laporan"}
                </th>
                <th className="px-6 py-4 font-bold">
                  {type === "pelapor" ? "Tanggal Terakhir" : "Laporan Terakhir"}
                </th>
                <th className="px-6 py-4 font-bold">
                  {type === "pelapor" ? "Status Terakhir" : "Status"}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <tr key={item}>
                  <td className="px-6 py-4">
                    <div className="flex animate-pulse items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-red-100" />
                      <div>
                        <div className="mb-2 h-4 w-28 rounded-full bg-slate-200" />
                        <div className="h-3 w-24 rounded-full bg-slate-100" />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-7 w-24 animate-pulse rounded-full bg-slate-100" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-56 animate-pulse rounded-full bg-slate-100" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-32 animate-pulse rounded-full bg-slate-100" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-7 w-24 animate-pulse rounded-full bg-slate-100" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function SettingsContentSkeleton() {
  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex animate-pulse items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-red-100" />

            <div>
              <div className="mb-2 h-6 w-36 rounded-xl bg-slate-200" />
              <div className="h-4 w-52 rounded-full bg-slate-100" />
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse rounded-2xl bg-slate-50"
              />
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 animate-pulse">
            <div className="mb-2 h-6 w-44 rounded-xl bg-slate-200" />
            <div className="h-4 w-72 rounded-full bg-slate-100" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl border border-slate-100 bg-white p-5"
              >
                <div className="mb-4 h-11 w-11 rounded-xl bg-slate-200" />
                <div className="mb-2 h-4 w-24 rounded-full bg-slate-100" />
                <div className="h-5 w-32 rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="mb-3 h-6 w-48 rounded-xl bg-slate-200" />
          <div className="mb-2 h-4 w-full max-w-3xl rounded-full bg-slate-100" />
          <div className="h-4 w-full max-w-2xl rounded-full bg-slate-100" />
        </div>
      </div>
    </>
  );
}

function DetailContentSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="h-[260px] animate-pulse bg-slate-200 md:h-[360px]" />

      <div className="p-6 md:p-8">
        <div className="mb-6 animate-pulse">
          <div className="mb-2 h-4 w-36 rounded-full bg-red-100" />
          <div className="h-9 w-full max-w-3xl rounded-2xl bg-slate-200" />
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-2xl bg-slate-50"
            />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-3 h-5 w-40 animate-pulse rounded-xl bg-slate-200" />
          <div className="mb-2 h-4 w-full animate-pulse rounded-full bg-slate-100" />
          <div className="mb-2 h-4 w-full animate-pulse rounded-full bg-slate-100" />
          <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export default function AdminPageSkeleton({
  variant = "dashboard",
}: AdminPageSkeletonProps) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <AdminSidebarSkeleton />

        <section className="w-full px-4 py-6 md:px-8 lg:px-10">
          <MobileTopSkeleton />

          <HeaderSkeleton
            shortLabel={variant !== "dashboard"}
            withRightCounter={variant === "dashboard"}
          />

          {variant === "dashboard" && (
            <>
              <StatCardsSkeleton count={4} />
              <DashboardTableSkeleton />
            </>
          )}

          {variant === "map" && <MapContentSkeleton />}

          {variant === "stats" && <StatsContentSkeleton />}

          {variant === "pelapor" && <GroupedTableSkeleton type="pelapor" />}

          {variant === "lokasi" && <GroupedTableSkeleton type="lokasi" />}

          {variant === "settings" && <SettingsContentSkeleton />}

          {variant === "detail" && <DetailContentSkeleton />}
        </section>
      </div>
    </main>
  );
}