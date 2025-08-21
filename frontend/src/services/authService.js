import api from "./api";

const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data.data;
};

const me = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};

export default { login, me };
