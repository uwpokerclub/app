const sendAPIRequest = async <T>(
  path: string,
  method = "GET",
  body?: any,
): Promise<{ status: number; data: T | null }> => {
  // Determine which API url to send requests to, default is local development
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "/api"
      : "https://api.uwpokerclub.com";

  const res = await fetch(`${apiUrl}/${path}`, {
    credentials: "include",
    method,
    headers:
      body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Save response status for later.
  const status = res.status;

  // Attempt to convert response body to JSON. If this fails that means there is no body.
  let data: T | null = null;
  try {
    data = await res.json();
  } catch (err) {}

  return { status, data };
};

export default sendAPIRequest;
