import { redirect } from "react-router-dom";

type ErrorResponse = {
  code: number;
  type: string;
  message: string;
};

export async function sendRequest<T>(path: string, method = "GET", redirectOn401 = true): Promise<T> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
    credentials: "include",
    method,
  });

  if (res.ok) {
    const data: T = await res.json();
    return data;
  }

  const errorData: ErrorResponse = await res.json();

  if (res.status === 401 && redirectOn401) {
    redirect("/admin/login");
  }

  throw new Error(errorData.message);
}
