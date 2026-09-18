const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, { method = "GET", body, auth = "customer" } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth === "customer") {
    const token = localStorage.getItem("ss_token");
    if (token) headers.Authorization = `Bearer ${token}`;
  } else if (auth === "admin") {
    const token = localStorage.getItem("ss_admin_token");
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};