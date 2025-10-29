export const API_URL =
  (import.meta.env.VITE_API_URL as string) ?? "http://localhost:4000";

export async function api<T>(
  path: string,
  init?: RequestInit & { authToken?: string | null }
) {
  const headers = new Headers(init?.headers);

  // Only set Content-Type when we actually send a non-FormData body.
  const method = (init?.method ?? "GET").toUpperCase();
  const hasBody = init?.body !== undefined && !(init?.body instanceof FormData);
  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (init?.authToken) headers.set("Authorization", `Bearer ${init.authToken}`);

  // Normalize URL join to avoid double slashes
  const base = API_URL.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;

  const res = await fetch(`${base}${suffix}`, { ...init, headers, method });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return (await res.json()) as T;
  return (await res.text()) as unknown as T;
}
