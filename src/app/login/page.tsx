import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginRegisterClient from "./LoginRegisterClient";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string;
    mode?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  const next = params?.next || "/contact";
  const mode = params?.mode === "register" ? "register" : "login";

  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("auth-token")?.value === "logged-in";
  const role = cookieStore.get("auth-role")?.value;

  if (isLoggedIn && role === "admin") {
    redirect("/admin");
  }

  if (isLoggedIn && role === "user") {
    redirect(next.startsWith("/") ? next : "/contact");
  }

  return <LoginRegisterClient next={next} initialMode={mode} />;
}