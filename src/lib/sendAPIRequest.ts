import { redirect } from "react-router-dom";

export async function sendAPIRequest<T>(path: string, method = "GET", body?: Record<string, unknown>) {
  const apiUrl = import.meta.env.DEV ? "http://localhost:5000" : "https://api.uwpokerclub.com";

  const res = await fetch(`${apiUrl}/${path}`, {
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
