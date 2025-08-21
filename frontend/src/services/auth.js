import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const me = () =>
  api.get("/auth/me", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
