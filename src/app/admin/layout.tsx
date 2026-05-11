import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth-token")?.value;
  const role = cookieStore.get("auth-role")?.value;

  const isLoggedIn = token === "logged-in";
  const isAdmin = role === "admin";

  if (!isLoggedIn) {
    redirect("/login?next=/admin");
  }

  if (!isAdmin) {
    redirect("/contact");
  }

  return <>{children}</>;
}