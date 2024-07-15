import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useFetch<T>(path: string, method = "GET", body?: Record<string, unknown>) {
  const [status, setStatus] = useState(0);
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const apiUrl = import.meta.env.DEV ? "http://localhost:5000" : "https://api.uwpokerclub.com";

    const res = await fetch(`${apiUrl}/${path}`, {
      credentials: "include",
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });

    setStatus(res.status);

    if (res.status === 401) {
      navigate("/admin/login");
      return {};
    }

    try {
      setData(await res.json());
    } catch (err) {
      /* empty */
    }

    setIsLoading(false);
  }, [path, body, method, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { status, data, setData, isLoading };
}
