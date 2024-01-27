import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(path: string, method = "GET", body?: Record<string, unknown>) {
  const [status, setStatus] = useState(0);
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const apiUrl = import.meta.env.DEV ? "http://localhost:5000" : "https://api.uwpokerclub.com";

    const res = await fetch(`${apiUrl}/${path}`, {
      credentials: "include",
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });

    setStatus(res.status);

    try {
      setData(await res.json());
    } catch (err) {
      /* empty */
    }

    setIsLoading(false);
  }, [path, body, method]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { status, data, setData, isLoading };
}
