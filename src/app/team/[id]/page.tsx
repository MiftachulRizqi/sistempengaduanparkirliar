import team from "@/data/team.json";
import Link from "next/link";

type Team = {
  id: string;
  name: string;
  role: string;
  image: string;
};

export default async function TeamDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = team as Team[];
  const member = data.find((t) => t.id === id);

  if (!member) {
    return (
      <section className="min-h-[75vh] bg-gradient-to-br from-white via-red-50/30 to-gray-50 px-4 py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-2xl shadow-gray-200">
          <h1 className="mb-3 text-3xl font-extrabold text-gray-900">
            Data Tidak Ditemukan
          </h1>

          <p className="mb-6 text-gray-500">ID: {id}</p>

          <Link
            href="/team"
            className="inline-flex items-center justify-center rounded-full border border-red-600 px-6 py-3 font-bold text-red-600 no-underline transition hover:bg-red-600 hover:text-white"
          >
            Kembali ke Tim
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[75vh] bg-gradient-to-br from-white via-red-50/30 to-gray-50 px-4 py-20">
      <div className="mx-auto flex max-w-5xl justify-center">
        <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-gray-100 bg-white p-10 text-center shadow-2xl shadow-gray-200">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-100/70"></div>
          <div className="absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-red-100/50"></div>

          <div className="relative z-10 mx-auto mb-6 h-40 w-40 rounded-full bg-gradient-to-br from-red-600 to-white p-2 shadow-xl shadow-red-100">
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full rounded-full border-4 border-white object-cover"
            />
          </div>

          <span className="relative z-10 mb-4 inline-flex rounded-full bg-red-50 px-5 py-2 text-sm font-bold text-red-600">
            Anggota Tim
          </span>

          <h1 className="relative z-10 mb-2 text-3xl font-extrabold text-gray-900">
            {member.name}
          </h1>

          <p className="relative z-10 mb-7 font-bold text-red-600">
            {member.role}
          </p>

          <div className="relative z-10 mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <i className="fa-solid fa-user-check mb-2 block text-xl text-red-600"></i>
              <span className="text-sm font-bold text-gray-700">Aktif</span>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <i className="fa-solid fa-shield-halved mb-2 block text-xl text-red-600"></i>
              <span className="text-sm font-bold text-gray-700">
                Terverifikasi
              </span>
            </div>
          </div>

          <Link
            href="/team"
            className="relative z-10 inline-flex w-full items-center justify-center rounded-xl border border-red-600 px-6 py-3 text-sm font-bold text-red-600 no-underline transition duration-300 hover:bg-red-600 hover:text-white hover:no-underline"
          >
            Kembali
          </Link>
        </div>
      </div>
    </section>
  );
}