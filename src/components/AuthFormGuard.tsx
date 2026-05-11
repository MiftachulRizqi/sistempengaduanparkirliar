"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type AuthFormGuardProps = {
  children: ReactNode;
  next?: string;
};

function getCookieValue(name: string) {
  if (typeof document === "undefined") return "";

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  }

  return "";
}

export default function AuthFormGuard({
  children,
  next = "/contact",
}: AuthFormGuardProps) {
  const router = useRouter();

  const handleRequireLogin = () => {
    const token = getCookieValue("auth-token");
    const role = getCookieValue("auth-role");

    if (token !== "logged-in" || role !== "user") {
      router.push(`/login?next=${encodeURIComponent(next)}`);
    }
  };

  return (
    <div onFocusCapture={handleRequireLogin} onClickCapture={handleRequireLogin}>
      {children}
    </div>
  );
}