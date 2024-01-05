import { useCallback, useEffect, useState } from "react";

export function useFetch<T>(path: string, method = "GET", body?: Record<string, unknown>) {
  const [fetchedData, setFetchedData] = useState<{
    status: number;
    data?: T;
    isLoading: boolean;
  }>({
    status: 0,
    data: undefined,
    isLoading: true,
  });

  const fetchData = useCallback(async () => {
    const apiUrl = import.meta.env.DEV ? "http://localhost:5000" : "https://api.uwpokerclub.com";

    const res = await fetch(`${apiUrl}/${path}`, {
      credentials: "include",
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });

    const status = res.status;

    let data = {} as T;
    try {
      data = await res.json();
    } catch (err) {
      /* empty */
    }

    setFetchedData({
      status,
      data,
      isLoading: false,
    });
  }, [path, body, method]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return fetchedData;
}
