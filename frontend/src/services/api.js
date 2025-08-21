import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getBooks = (params) => api.get("/books", { params });
export const getBook = (id) => api.get(`/books/${id}`);
export const createBook = (data) => api.post("/books", data);
export const updateBook = (id, data) => api.put(`/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/books/${id}`);
export const getMembers = () => api.get("/members");
export const getLoans = (params) => api.get("/loans", { params });
export const borrowBook = (data) => api.post("/loans", data);
export const returnBook = (id) => api.put(`/loans/${id}/return`);
export const getAnalyticsOverview = () => api.get("/analytics/overview");
export const getDueSoon = (days) =>
  api.get("/analytics/due-soon", { params: { days } });
