export type LaporanFieldErrors = {
  nama?: string;
  lokasi?: string;
  deskripsi?: string;
  foto?: string;
};

export type LaporanActionStatus = "idle" | "success" | "error";

export type LaporanActionState = {
  status: LaporanActionStatus;
  title: string;
  message: string;
  fieldErrors?: LaporanFieldErrors;
  submittedAt?: number;
};

export const initialLaporanActionState: LaporanActionState = {
  status: "idle",
  title: "",
  message: "",
  fieldErrors: {},
  submittedAt: 0,
};
