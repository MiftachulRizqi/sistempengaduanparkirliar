export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f4f6f5]">
      <section className="bg-white px-4 pt-10 pb-16 md:px-6 md:pt-14 md:pb-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="animate-pulse">
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
            <div className="h-[320px] w-full max-w-[520px] animate-pulse rounded-[32px] bg-gray-200 md:h-[420px]" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
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

          <div className="mb-10 rounded-[24px] bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
            <div className="mx-auto mb-5 h-6 w-56 rounded-full bg-gray-200" />
            <div className="h-[320px] rounded-[24px] bg-gray-200" />
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.07)] md:p-7">
            <div className="mb-6 h-10 w-72 rounded-2xl bg-gray-200" />

            <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-gray-100 p-5"
                >
                  <div className="mb-4 h-14 w-14 rounded-[20px] bg-gray-200" />
                  <div className="mb-2 h-8 w-20 rounded-xl bg-gray-200" />
                  <div className="h-4 w-28 rounded-full bg-gray-200" />
                </div>
              ))}
            </div>

            <div className="mb-6 h-12 rounded-2xl bg-gray-200" />

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
    </main>
  );
}