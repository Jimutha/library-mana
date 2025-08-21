import api from "./api";

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getProfile: () => api.get("/auth/me"),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
