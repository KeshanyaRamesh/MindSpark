const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export async function request(path, options = {}, token = "") {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
}
