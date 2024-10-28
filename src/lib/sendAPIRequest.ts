import { redirect } from "react-router-dom";

export async function sendAPIRequest<T>(path: string, method = "GET", body?: Record<string, unknown>) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
    credentials: "include",
    method,
    headers: body ? { "Content-Type": "applcation/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const status = res.status;

  if (status === 401) {
    redirect("/admin/login");
    return { status, data: undefined };
  }

  let data: T | null = null;

  try {
    data = await res.json();
  } catch (err) {
    /* empty */
  }

  return { status, data };
}
