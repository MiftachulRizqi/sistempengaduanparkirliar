"use client";


import { ChangeEvent, KeyboardEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


type AdminFilterBarProps = {
  search: string;
  status: string;
};


export default function AdminFilterBar({ search, status }: AdminFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const [searchValue, setSearchValue] = useState(search);
  const [statusValue, setStatusValue] = useState(status);


  const replaceUrl = (nextSearch: string, nextStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());


    if (nextSearch.trim()) {
      params.set("search", nextSearch.trim());
    } else {
      params.delete("search");
    }


    if (nextStatus) {
      params.set("status", nextStatus);
    } else {
      params.delete("status");
    }


    params.delete("page");


    const query = params.toString();


    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };


  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;


    setSearchValue(value);
    replaceUrl(value, statusValue);
  };


  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;


    setStatusValue(value);
    replaceUrl(searchValue, value);
  };


  const handleReset = () => {
    setSearchValue("");
    setStatusValue("");


    router.replace(pathname, {
      scroll: false,
    });
  };


  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      replaceUrl(searchValue, statusValue);
    }
  };


  return (
    <div className="mb-6 grid gap-3 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-[1fr_220px_auto]">
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>


        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Cari nama pelapor, lokasi, deskripsi, status, atau ID..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
        />
      </div>


      <div className="relative">
        <select
          value={statusValue}
          onChange={handleStatusChange}
          className="
            w-full appearance-none rounded-2xl
            border border-slate-200 bg-slate-50
            px-4 py-3 pr-11
            text-sm font-bold text-slate-700
            outline-none transition
            focus:border-red-500
            focus:ring-4 focus:ring-red-100
          "
        >
          <option value="">Semua Status</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Diproses">Diproses</option>
          <option value="Selesai">Selesai</option>
        </select>


        <i
          className="
            fa-solid fa-chevron-down
            pointer-events-none
            absolute right-4 top-1/2
            -translate-y-1/2
            text-sm text-slate-500
          "
        ></i>
      </div>


      <button
        type="button"
        onClick={handleReset}
        className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
      >
        Reset
      </button>
    </div>
  );
}