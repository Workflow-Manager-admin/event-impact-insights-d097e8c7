const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  (window && window._env_ && window._env_.REACT_APP_API_BASE_URL) ||
  "http://localhost:8000"; // fallback

function authToken() {
  return localStorage.getItem("auth_token");
}

async function request(path, method = "GET", body) {
  let url = API_BASE + path;
  let headers = { "Content-Type": "application/json" };
  const token = authToken();
  if (token) headers.Authorization = "Bearer " + token;
  let opt = { method, headers };
  if (body) opt.body = JSON.stringify(body);
  const res = await fetch(url, opt);
  if (!res.ok) {
    let text = "";
    try { text = await res.text(); } catch { /*ignore*/ }
    throw new Error("API error: " + (text || res.statusText));
  }
  if (res.status === 204) return {}; // No Content
  return res.json();
}

// PUBLIC_INTERFACE
const api = {
  get: (path) => request(path, "GET"),
  post: (path, data) => request(path, "POST", data),
  put: (path, data) => request(path, "PUT", data),
  delete: (path) => request(path, "DELETE"),
};
export default api;
