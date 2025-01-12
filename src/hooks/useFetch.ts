import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useFetch<T>(path: string, method = "GET", body?: Record<string, unknown>) {
  const [status, setStatus] = useState(0);
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(
    async (controller: AbortController) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
        credentials: "include",
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
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
    },
    [path, body, method, navigate],
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchData(controller).catch((err) => {
      if (err.name === "AbortError") return;

      throw err;
    });

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  return { status, data, setData, isLoading };
}
