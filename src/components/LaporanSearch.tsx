"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type LaporanSuggestion = {
  id: string | number;
  nama?: string | null;
  lokasi: string;
  deskripsi: string;
  status: string;
};

type LaporanSearchProps = {
  suggestions: LaporanSuggestion[];
};

function normalizeText(value: unknown) {
  return String(value || "").toLowerCase().trim();
}

export default function LaporanSearch({ suggestions }: LaporanSearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isSelectingRef = useRef(false);

  const initialQuery = useMemo(
    () => searchParams.get("query") || "",
    [searchParams]
  );

  const [keyword, setKeyword] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  const filteredSuggestions = useMemo(() => {
    const cleanKeyword = normalizeText(keyword);

    if (!cleanKeyword) return [];

    return suggestions
      .filter((item) => {
        const searchableText = [
          item.lokasi,
          item.deskripsi,
          item.status,
          item.nama,
        ]
          .map(normalizeText)
          .join(" ");

        return searchableText.includes(cleanKeyword);
      })
      .slice(0, 5);
  }, [keyword, suggestions]);

  const showSuggestions =
    isFocused && keyword.trim().length > 0 && filteredSuggestions.length > 0;

  useEffect(() => {
    if (isSelectingRef.current) return;

    const timeout = setTimeout(() => {
      const cleanKeyword = keyword.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (cleanKeyword) {
        params.set("query", cleanKeyword);
      } else {
        params.delete("query");
      }

      const queryString = params.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [keyword, pathname, router, searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectSuggestion = (item: LaporanSuggestion) => {
    isSelectingRef.current = true;
    setIsFocused(false);
    router.push(`/laporan/${item.id}?back=${encodeURIComponent("/")}`);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative mb-6 rounded-[24px] border border-red-100 bg-red-50/60 p-4"
    >
      <label className="mb-2 block text-sm font-bold text-gray-900">
        Cari Laporan
      </label>

      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-sm text-red-600"></i>

        <input
          type="search"
          value={keyword}
          onFocus={() => setIsFocused(true)}
          onChange={(event) => {
            isSelectingRef.current = false;
            setKeyword(event.target.value);
            setIsFocused(true);
          }}
          placeholder="Cari lokasi, nama pelapor, deskripsi, atau status..."
          className="w-full rounded-2xl border border-red-100 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-red-600 focus:ring-4 focus:ring-red-600/10"
        />

        {showSuggestions && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-2xl border border-red-100 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.14)]">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-sm font-extrabold text-gray-900">
                Rekomendasi Laporan
              </p>
              <p className="text-xs font-medium text-gray-500">
                Berdasarkan data laporan yang tersedia
              </p>
            </div>

            <div className="p-2">
              {filteredSuggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left hover:bg-gray-50"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <i className="fa-solid fa-location-dot text-sm"></i>
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-sm font-extrabold text-gray-800">
                      {item.lokasi}
                    </span>

                    <span className="mt-1 line-clamp-1 text-xs font-medium text-gray-500">
                      {item.nama || "Pelapor"} • {item.status} •{" "}
                      {item.deskripsi}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Rekomendasi muncul dari data laporan yang masih tersedia di sistem.
      </p>
    </div>
  );
}