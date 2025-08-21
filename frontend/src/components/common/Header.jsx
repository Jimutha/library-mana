import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { authAPI } from "../../services/auth";

const Header = () => {
  const { user, logout: contextLogout, isAdmin } = useAuth();

  const handleLogout = () => {
    authAPI.logout();
    contextLogout();
    window.location.href = "/";
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Library Management System</h1>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">
                Welcome, {user.name} ({user.role})
              </span>
              {isAdmin ? (
                <a
                  href="/admin"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm"
                >
                  Admin Panel
                </a>
              ) : (
                <a
                  href="/user"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm"
                >
                  User Panel
                </a>
              )}
              <button
                onClick={handleLogout}
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-x-2">
              <a
                href="/login"
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
