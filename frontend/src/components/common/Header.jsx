import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        📚 Library
      </Link>
      <nav className="space-x-4">
        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin">Dashboard</Link>}
            {user.role === "user" && <Link to="/user">Dashboard</Link>}
            <button
              onClick={logout}
              className="ml-2 bg-red-600 px-2 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
