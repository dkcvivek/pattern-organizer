const BASE_URL= process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
}