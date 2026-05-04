import team from "@/data/team.json";
import Link from "next/link";

type Team = {
  id: string;
  name: string;
  role: string;
  image: string;
};

export default function TeamPage() {
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Tim Kami
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-500 md:text-base">
            Orang-orang di balik layanan pengaduan parkir liar yang siap membantu masyarakat.
          </p>
        </div>

        {/* TEAM GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {(team as Team[]).map((item) => (
            <div
              key={item.id}
              className="w-full max-w-sm overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.08),0_12px_35px_rgba(220,38,38,0.28)]"
            >
              {/* IMAGE */}
              <div className="h-[260px] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col p-5 text-center">
                <h5 className="mb-1 text-lg font-bold text-gray-900">
                  {item.name}
                </h5>

                <p className="mb-4 text-sm text-gray-500">
                  {item.role}
                </p>

                <Link
                  href={`/team/${item.id}`}
                  className="mt-auto inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white !no-underline transition-colors duration-300 hover:bg-red-700 hover:text-white hover:!no-underline"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}