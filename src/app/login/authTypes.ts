export type AuthActionState = {
  status: "idle" | "success" | "error";
  title: string;
  message: string;
  fieldErrors?: {
    nama?: string;
    email?: string;
    password?: string;
  };
};

export const initialAuthActionState: AuthActionState = {
  status: "idle",
  title: "",
  message: "",
  fieldErrors: {},
};