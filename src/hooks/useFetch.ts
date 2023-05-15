import { useState, useEffect, useCallback } from "react";

export default function useFetch<T>(path: string, method = "GET", body?: any): {status: number, data: T | null, isLoading: boolean} {
  const [fetchedData, setFetchedData] = useState<{status: number, data: T | null, isLoading: boolean}>({
    status: 0,
    data: null,
    isLoading: true,
  });

  // Determine which API url to send requests to, default is local development
  const fetchData = useCallback(async () => {
    const apiUrl = process.env.NODE_ENV === "development" ? "/api" : "https://api.uwpokerclub.com"

    const res = await fetch(`${apiUrl}/${path}`, {
      credentials: "include",
      method,
      headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined
    });

    // Save response status for later.
    const status = res.status;

    // Attempt to convert response body to JSON. If this fails that means there is no body.
    let data: T | null = null;
    try {
      data = await res.json();
    } catch (err) {}

    setFetchedData({
      status,
      data,
      isLoading: false
    })
  }, [path, body, method]);

  useEffect(() => {
    fetchData();
  }, [path, method, body, fetchData]);

  return fetchedData;
};
