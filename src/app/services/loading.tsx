export default function ServicesLoading() {
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mx-auto mb-12 h-12 w-72 rounded-2xl bg-gray-200"></div>

        <div className="mb-14 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-[24px] bg-white p-6 shadow-sm">
              <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-gray-200"></div>
              <div className="mx-auto mb-3 h-5 w-32 rounded-xl bg-gray-200"></div>
              <div className="mx-auto h-4 w-44 rounded-xl bg-gray-200"></div>
            </div>
          ))}
        </div>

        <div className="mb-14 h-[360px] rounded-[24px] bg-white p-6 shadow-sm">
          <div className="mb-5 h-6 w-48 rounded-xl bg-gray-200"></div>
          <div className="h-[280px] rounded-2xl bg-gray-100"></div>
        </div>

        <div className="rounded-[28px] bg-white p-7 shadow-sm">
          <div className="mb-6 h-10 w-72 rounded-2xl bg-gray-200"></div>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-80 rounded-[24px] bg-gray-100"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
