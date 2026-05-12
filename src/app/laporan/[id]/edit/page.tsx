import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseServer";
import EditLaporanForm from "./EditLaporanForm";

type EditPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    back?: string;
    error?: string;
  }>;
};

function getSafeBackHref(back?: string) {
  if (!back) return "/services";
  if (!back.startsWith("/")) return "/services";
  if (back.startsWith("//")) return "/services";

  return back;
}

async function getCurrentUserId() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth-token")?.value;
  const role = cookieStore.get("auth-role")?.value;
  const email = cookieStore.get("auth-email")?.value || "";

  if (token !== "logged-in" || role !== "user" || !email) {
    return null;
  }

  const { data } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  return data?.id || null;
}

export default async function EditLaporanPage({
  params,
  searchParams,
}: EditPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const backHref = getSafeBackHref(query?.back);
  const currentUserId = await getCurrentUserId();

  if (!currentUserId) {
    redirect(`/login?next=/laporan/${id}/edit`);
  }

  const { data: laporan, error } = await supabaseAdmin
    .from("laporan")
    .select("*")
    .eq("id", Number(id))
    .maybeSingle();

  if (error || !laporan) {
    redirect(backHref);
  }

  if (laporan.user_id !== currentUserId || laporan.status !== "Menunggu") {
    redirect(`/laporan/${id}?back=${encodeURIComponent(backHref)}`);
  }

  return (
    <section className="bg-slate-100 px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 overflow-hidden rounded-[32px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
          <div className="relative px-6 py-8 md:px-8">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-red-50" />

            <div className="relative">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red-600">
                <i className="fa-solid fa-pen-to-square"></i>
                Edit Laporan
              </span>

              <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                Perbarui Data Laporan
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
                Perbarui lokasi lewat map, ubah deskripsi, dan ganti foto bukti
                selama laporan masih berstatus Menunggu.
              </p>
            </div>
          </div>
        </div>

        {query?.error && (
          <div className="mb-6 rounded-3xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-bold text-red-600">
            {query.error}
          </div>
        )}

        <EditLaporanForm laporan={laporan} backHref={backHref} />
      </div>
    </section>
  );
}