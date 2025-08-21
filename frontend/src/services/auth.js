import api from "./api";

// Login
export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.data.token);
  return res.data.data;
};

// Register (for admin or seeding purposes)
export const register = async (formData) => {
  const res = await api.post("/auth/register", formData);
  localStorage.setItem("token", res.data.data.token);
  return res.data.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Get current user
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};
