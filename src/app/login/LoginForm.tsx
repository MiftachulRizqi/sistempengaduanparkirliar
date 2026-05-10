"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabaseClient";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    setErrorMessage("");

    const { error } =
      await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

    setLoading(false);

    if (error) {
      setErrorMessage(
        "Email atau password salah."
      );

      return;
    }

    router.push("/");

    router.refresh();
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4"
    >
      {errorMessage && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
          {errorMessage}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading
          ? "Memproses..."
          : "Login"}
      </button>
    </form>
  );
}