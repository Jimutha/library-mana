import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password, role) => {
    try {
      const res = await api.post("/auth/login", { email, password, role });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);
      setUser({ email, role });
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/user/home");
    } catch (err) {
      alert("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) setUser({ role });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
